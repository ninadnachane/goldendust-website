// Admin login: password, then a 6-digit one-time code sent by email (Resend).
//
// Secrets (Cloudflare → Worker → Settings → Variables and Secrets):
//   ADMIN_PASSWORD  - at least 12 characters
//   RESEND_API_KEY  - from resend.com (account created with the admin email)
// Plain vars (wrangler.jsonc): ADMIN_EMAILS, MAIL_FROM
//
// Protections: generic error messages, rate limits per IP and per account, codes expire
// after 10 minutes and allow 5 tries, sessions are random 256-bit tokens stored hashed,
// cookie is __Host-, HttpOnly, Secure, SameSite=Strict, sessions last 12 hours.

export interface AuthEnv {
  DB: D1Database;
  ADMIN_EMAILS?: string;
  ADMIN_PASSWORD?: string;
  RESEND_API_KEY?: string;
  MAIL_FROM?: string;
  DEV_ADMIN_BYPASS?: string; // local development only (localhost)
  DEV_EMAIL_LOG?: string; // local development only: print the code instead of emailing it
}

const COOKIE = "__Host-gd_admin";
const SESSION_HOURS = 12;
const CODE_MINUTES = 10;
const CODE_TRIES = 5;
const PW_FAILS_PER_IP = 5; // per 15 minutes
const PW_FAILS_TOTAL = 20; // per hour, all IPs (slows down spread-out attacks)
const MIN_PASSWORD = 12;

const enc = new TextEncoder();
const hex = (b: ArrayBuffer) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
const sha256 = async (s: string) => hex(await crypto.subtle.digest("SHA-256", enc.encode(s)));
const randomHex = (bytes = 32) => hex(crypto.getRandomValues(new Uint8Array(bytes)).buffer);
const now = () => Math.floor(Date.now() / 1000);

async function sameSecret(a: string, b: string) {
  const [x, y] = await Promise.all([sha256("cmp:" + a), sha256("cmp:" + b)]);
  let d = 0;
  for (let i = 0; i < x.length; i++) d |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return d === 0 && x.length === y.length;
}

function sixDigits() {
  const max = 4_294_000_000; // multiple of 1e6, avoids modulo bias
  for (;;) {
    const n = crypto.getRandomValues(new Uint32Array(1))[0];
    if (n < max) return String(n % 1_000_000).padStart(6, "0");
  }
}

async function pepper(env: AuthEnv) {
  const row = await env.DB.prepare("SELECT value FROM app_secrets WHERE name = 'pepper'").first<{ value: string }>();
  if (row) return row.value;
  const v = randomHex();
  await env.DB.prepare("INSERT OR IGNORE INTO app_secrets (name, value) VALUES ('pepper', ?)").bind(v).run();
  return (await env.DB.prepare("SELECT value FROM app_secrets WHERE name = 'pepper'").first<{ value: string }>())!.value;
}

const ipOf = (req: Request) => req.headers.get("cf-connecting-ip") || "local";
const isLocal = (req: Request) => /^(localhost|127\.0\.0\.1)$/.test(new URL(req.url).hostname);
const allowedEmails = (env: AuthEnv) => (env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

function cookie(req: Request, name: string) {
  const m = (req.headers.get("cookie") || "").match(new RegExp(`(?:^|;\\s*)${name.replace(/[-_]/g, "\\$&")}=([^;]+)`));
  return m ? m[1] : "";
}

const jsonRes = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });

export function configured(env: AuthEnv) {
  return !!(env.ADMIN_PASSWORD && env.ADMIN_PASSWORD.length >= MIN_PASSWORD && allowedEmails(env).length && (env.RESEND_API_KEY || env.DEV_EMAIL_LOG === "1"));
}

/** Returns the signed-in admin email, or null. */
export async function sessionEmail(req: Request, env: AuthEnv): Promise<string | null> {
  if (env.DEV_ADMIN_BYPASS === "1" && isLocal(req)) return "dev@localhost";
  const token = cookie(req, COOKIE);
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const row = await env.DB.prepare("SELECT email, expires_at FROM sessions WHERE token_hash = ?").bind(await sha256("s:" + token)).first<{ email: string; expires_at: number }>();
  if (!row || row.expires_at <= now()) return null;
  return allowedEmails(env).includes(row.email) ? row.email : null;
}

async function tooManyFailures(env: AuthEnv, ip: string) {
  const t = now();
  const r = await env.DB.prepare(
    "SELECT SUM(CASE WHEN ip = ?1 AND at > ?2 THEN 1 ELSE 0 END) AS mine, SUM(CASE WHEN at > ?3 THEN 1 ELSE 0 END) AS total FROM login_attempts WHERE ok = 0 AND at > ?3",
  ).bind(ip, t - 15 * 60, t - 60 * 60).first<{ mine: number | null; total: number | null }>();
  return (r?.mine || 0) >= PW_FAILS_PER_IP || (r?.total || 0) >= PW_FAILS_TOTAL;
}

const record = (env: AuthEnv, ip: string, kind: string, ok: boolean) =>
  env.DB.prepare("INSERT INTO login_attempts (ip, kind, ok, at) VALUES (?, ?, ?, ?)").bind(ip, kind, ok ? 1 : 0, now()).run();

async function sendCode(env: AuthEnv, to: string, code: string, ip: string) {
  if (env.DEV_EMAIL_LOG === "1") { console.log(`[dev] login code for ${to}: ${code}`); return true; }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM || "Golden Dust admin <onboarding@resend.dev>",
      to: [to],
      subject: `${code} is your Golden Dust admin code`,
      text: `Your sign-in code for the Golden Dust Safaris planner admin is:\n\n${code}\n\nIt expires in ${CODE_MINUTES} minutes. Sign-in attempt from IP ${ip}.\n\nIf this wasn't you, someone knows your admin password: change the ADMIN_PASSWORD secret in Cloudflare straight away.`,
    }),
  });
  if (!r.ok) console.log("resend failed", r.status, await r.text());
  return r.ok;
}

/** POST /api/auth/login  {email, password}  → {ok, challenge} and emails a code */
async function login(req: Request, env: AuthEnv) {
  if (!configured(env)) return jsonRes({ error: "The admin login isn't set up yet." }, 503);
  const ip = ipOf(req);
  if (await tooManyFailures(env, ip)) return jsonRes({ error: "Too many attempts. Try again in 15 minutes." }, 429);
  const b = await req.json<any>().catch(() => ({}));
  const email = String(b?.email || "").trim().toLowerCase().slice(0, 200);
  const password = String(b?.password || "").slice(0, 500);
  const okEmail = allowedEmails(env).includes(email);
  const okPass = await sameSecret(password, env.ADMIN_PASSWORD!);
  if (!okEmail || !okPass) {
    await record(env, ip, "password", false);
    await new Promise((r) => setTimeout(r, 400));
    return jsonRes({ error: "Email or password is wrong." }, 401);
  }
  await record(env, ip, "password", true);
  const id = randomHex(16);
  const code = sixDigits();
  const p = await pepper(env);
  await env.DB.prepare("DELETE FROM login_challenges WHERE expires_at < ? OR used = 1").bind(now()).run();
  await env.DB.prepare("INSERT INTO login_challenges (id, email, code_hash, expires_at) VALUES (?, ?, ?, ?)")
    .bind(id, email, await sha256(`c:${p}:${id}:${code}`), now() + CODE_MINUTES * 60).run();
  if (!(await sendCode(env, email, code, ip))) return jsonRes({ error: "Couldn't send the code email. Try again in a minute." }, 502);
  return jsonRes({ ok: true, challenge: id, minutes: CODE_MINUTES });
}

/** POST /api/auth/verify  {challenge, code}  → sets the session cookie */
async function verify(req: Request, env: AuthEnv) {
  const ip = ipOf(req);
  if (await tooManyFailures(env, ip)) return jsonRes({ error: "Too many attempts. Try again in 15 minutes." }, 429);
  const b = await req.json<any>().catch(() => ({}));
  const id = String(b?.challenge || "");
  const code = String(b?.code || "").replace(/\D/g, "");
  if (!/^[a-f0-9]{32}$/.test(id) || code.length !== 6) return jsonRes({ error: "Enter the 6-digit code from the email." }, 400);
  const ch = await env.DB.prepare("SELECT email, code_hash, expires_at, attempts, used FROM login_challenges WHERE id = ?").bind(id)
    .first<{ email: string; code_hash: string; expires_at: number; attempts: number; used: number }>();
  if (!ch || ch.used || ch.expires_at <= now() || ch.attempts >= CODE_TRIES) return jsonRes({ error: "This code has expired. Sign in again to get a new one.", restart: true }, 401);
  const p = await pepper(env);
  const ok = await sameSecret(await sha256(`c:${p}:${id}:${code}`), ch.code_hash);
  if (!ok) {
    await env.DB.prepare("UPDATE login_challenges SET attempts = attempts + 1 WHERE id = ?").bind(id).run();
    await record(env, ip, "code", false);
    const left = CODE_TRIES - ch.attempts - 1;
    return jsonRes({ error: left > 0 ? `That code isn't right. ${left} tr${left === 1 ? "y" : "ies"} left.` : "Too many wrong codes. Sign in again.", restart: left <= 0 }, 401);
  }
  await env.DB.prepare("UPDATE login_challenges SET used = 1 WHERE id = ?").bind(id).run();
  await record(env, ip, "code", true);
  const token = randomHex(32);
  const t = now();
  await env.DB.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(t).run();
  await env.DB.prepare("INSERT INTO sessions (token_hash, email, created_at, expires_at, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(await sha256("s:" + token), ch.email, t, t + SESSION_HOURS * 3600, ip, (req.headers.get("user-agent") || "").slice(0, 300)).run();
  await env.DB.prepare("DELETE FROM login_attempts WHERE at < ?").bind(t - 7 * 86400).run();
  return jsonRes({ ok: true }, 200, { "set-cookie": `${COOKIE}=${token}; Path=/; Max-Age=${SESSION_HOURS * 3600}; HttpOnly; Secure; SameSite=Strict` });
}

/** POST /api/auth/logout */
async function logout(req: Request, env: AuthEnv) {
  const token = cookie(req, COOKIE);
  if (/^[a-f0-9]{64}$/.test(token)) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256("s:" + token)).run();
  return jsonRes({ ok: true }, 200, { "set-cookie": `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict` });
}

/** POST /api/admin/logout-everywhere (signed in) */
export async function logoutEverywhere(env: AuthEnv) {
  await env.DB.prepare("DELETE FROM sessions").run();
  return jsonRes({ ok: true }, 200, { "set-cookie": `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict` });
}

export async function authApi(req: Request, env: AuthEnv, p: string): Promise<Response | null> {
  if (!p.startsWith("/api/auth/")) return null;
  if (req.method !== "POST") return jsonRes({ error: "Method not allowed" }, 405);
  const origin = req.headers.get("origin");
  if (!origin || origin !== new URL(req.url).origin) return jsonRes({ error: "Bad origin" }, 403);
  if (p === "/api/auth/login") return login(req, env);
  if (p === "/api/auth/verify") return verify(req, env);
  if (p === "/api/auth/logout") return logout(req, env);
  return jsonRes({ error: "Not found" }, 404);
}
