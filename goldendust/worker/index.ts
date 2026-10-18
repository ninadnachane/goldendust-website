// Cloudflare Worker: serves the static site and the itinerary planner API.
// Public:  GET /api/planner/options, POST /api/planner/quote, GET /media/<id> (lodge photos)
// Admin:   /admin (page) and /api/admin/*
//
// Admin security (two locks):
//  1. Cloudflare Access sits in front of /admin and /api/admin/* and only lets in
//     the emails in its policy (one-time code sent to the inbox, no password).
//  2. This Worker independently verifies Access's signed login token (JWT): signature
//     against the team's public keys, audience, issuer, expiry, and the email against
//     ADMIN_EMAILS. If Access is missing or misconfigured, the admin stays locked.
// Local development only: DEV_ADMIN_BYPASS="1" in .dev.vars skips the check.
import { quote, publicOptions, checkConfig, type Config, type QuoteRequest } from "../src/planner/engine";
import { defaultConfig } from "../src/planner/defaults";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  ACCESS_TEAM_DOMAIN?: string; // e.g. "goldendust.cloudflareaccess.com"
  ACCESS_AUD?: string; // Application Audience (AUD) tag from the Access application
  ADMIN_EMAILS?: string; // comma separated
  DEV_ADMIN_BYPASS?: string;
}

const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra } });

// ---------- Cloudflare Access JWT verification
type Jwk = JsonWebKey & { kid: string };
let certCache: { at: number; keys: Jwk[] } | null = null;

async function accessKeys(team: string, force = false): Promise<Jwk[]> {
  if (!force && certCache && Date.now() - certCache.at < 10 * 60 * 1000) return certCache.keys;
  const r = await fetch(`https://${team}/cdn-cgi/access/certs`);
  if (!r.ok) throw new Error("certs " + r.status);
  const d = await r.json<{ keys: Jwk[] }>();
  certCache = { at: Date.now(), keys: d.keys || [] };
  return certCache.keys;
}

const b64urlBytes = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), (c) => c.charCodeAt(0));
const b64urlJson = (s: string) => JSON.parse(new TextDecoder().decode(b64urlBytes(s)));

function cookie(req: Request, name: string) {
  const m = (req.headers.get("cookie") || "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? m[1] : "";
}

export async function adminEmail(req: Request, env: Env): Promise<string | null> {
  if (env.DEV_ADMIN_BYPASS === "1" && new URL(req.url).hostname.match(/^(localhost|127\.0\.0\.1)$/)) return "dev@localhost";
  const team = (env.ACCESS_TEAM_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const aud = env.ACCESS_AUD || "";
  const allowed = (env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (!team || !aud || !allowed.length) return null;
  const token = req.headers.get("cf-access-jwt-assertion") || cookie(req, "CF_Authorization");
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const header = b64urlJson(parts[0]);
    const payload = b64urlJson(parts[1]);
    if (header.alg !== "RS256") return null;
    let keys = await accessKeys(team);
    let jwk = keys.find((k) => k.kid === header.kid);
    if (!jwk) { keys = await accessKeys(team, true); jwk = keys.find((k) => k.kid === header.kid); }
    if (!jwk) return null;
    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
    if (!ok) return null;
    const now = Math.floor(Date.now() / 1000);
    const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!auds.includes(aud)) return null;
    if (payload.iss !== `https://${team}`) return null;
    if (!(payload.exp > now) || (payload.nbf && payload.nbf > now + 60)) return null;
    const email = String(payload.email || "").toLowerCase();
    return allowed.includes(email) ? email : null;
  } catch (e) {
    console.log("access verify failed", String(e));
    return null;
  }
}

const denied = (env: Env) =>
  new Response(
    env.ACCESS_TEAM_DOMAIN && env.ACCESS_AUD
      ? "Not signed in, or this email isn't allowed to use the admin."
      : "The admin is locked: Cloudflare Access isn't set up for this Worker yet.",
    { status: 403, headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } },
  );

const ADMIN_HEADERS: Record<string, string> = {
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow",
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "content-security-policy":
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
};

// ---------- config
function normalise(cfg: Config): Config {
  return { ...defaultConfig, ...cfg, settings: { ...defaultConfig.settings, ...(cfg.settings || {}) } };
}

async function loadConfig(env: Env): Promise<{ config: Config; version: number | null; savedAt: string | null; note: string }> {
  try {
    const row = await env.DB.prepare("SELECT id, created_at, note, data FROM config_versions ORDER BY id DESC LIMIT 1").first<{ id: number; created_at: string; note: string; data: string }>();
    if (row) return { config: normalise(JSON.parse(row.data)), version: row.id, savedAt: row.created_at, note: row.note };
  } catch (e) {
    console.log("loadConfig failed, using defaults", String(e));
  }
  return { config: defaultConfig, version: null, savedAt: null, note: "Sample data (nothing saved yet)" };
}

function toRequest(b: any): QuoteRequest {
  return {
    startDate: String(b?.startDate || ""),
    adults: Number(b?.adults) || 0,
    childAges: Array.isArray(b?.childAges) ? b.childAges.map(Number).slice(0, 30) : [],
    category: b?.category,
    totalNights: Number(b?.totalNights) || 0,
    stops: Array.isArray(b?.stops) ? b.stops.slice(0, 20).map((s: any) => ({ areaId: String(s?.areaId || ""), nights: Number(s?.nights) || 0, lodgeId: String(s?.lodgeId || "") })) : [],
  };
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const p = url.pathname;

    // ---- public
    if (p === "/api/planner/options" && req.method === "GET") {
      const { config } = await loadConfig(env);
      return json(publicOptions(config), 200, { "cache-control": "public, max-age=60" });
    }
    if (p === "/api/planner/quote" && req.method === "POST") {
      const body = await req.json().catch(() => null);
      const { config } = await loadConfig(env);
      const q = quote(config, toRequest(body));
      return json({ ok: q.ok, errors: q.errors, people: q.people, priced: q.priced, perPerson: q.totals.perPerson });
    }
    const media = p.match(/^\/media\/([a-f0-9-]{36}\.(?:webp|jpg|png))$/);
    if (media && req.method === "GET") {
      const row = await env.DB.prepare("SELECT content_type, data FROM images WHERE id = ?").bind(media[1]).first<{ content_type: string; data: ArrayBuffer }>();
      if (!row) return new Response("Not found", { status: 404 });
      return new Response(new Uint8Array(row.data as ArrayBuffer), {
        headers: { "content-type": row.content_type, "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" },
      });
    }

    // ---- admin
    if (p === "/admin" || p.startsWith("/admin.") || p.startsWith("/admin/") || p.startsWith("/api/admin/")) {
      const email = await adminEmail(req, env);
      if (!email) return denied(env);
      if (p.startsWith("/api/admin/")) {
        // block cross-site requests that change data
        if (req.method !== "GET") {
          const origin = req.headers.get("origin");
          if (!origin || origin !== url.origin) return json({ error: "Bad origin" }, 403);
        }
        const res = await adminApi(req, env, p, email);
        res.headers.set("x-content-type-options", "nosniff");
        return res;
      }
      const res = await env.ASSETS.fetch(new Request(new URL("/admin", url), req));
      const out = new Response(res.body, res);
      for (const [k, v] of Object.entries(ADMIN_HEADERS)) out.headers.set(k, v);
      return out;
    }

    if (p.startsWith("/api/")) return json({ error: "Not found" }, 404);
    return env.ASSETS.fetch(req);
  },
};

const IMAGE_TYPES: Record<string, string> = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" };
const MAX_IMAGE = 1_500_000;

async function adminApi(req: Request, env: Env, p: string, email: string): Promise<Response> {
  if (p === "/api/admin/me") return json({ email });
  if (p === "/api/admin/config" && req.method === "GET") {
    const cur = await loadConfig(env);
    return json({ ...cur, email, issues: checkConfig(cur.config) });
  }
  if (p === "/api/admin/config" && req.method === "PUT") {
    const body = await req.json<any>().catch(() => null);
    const cfg = body?.config as Config;
    const issues = cfg ? checkConfig(cfg) : ["No config sent."];
    if (issues.length) return json({ ok: false, issues }, 400);
    const note = `${String(body?.note || "").slice(0, 200)}${body?.note ? " " : ""}(${email})`;
    const r = await env.DB.prepare("INSERT INTO config_versions (note, data) VALUES (?, ?)").bind(note, JSON.stringify(cfg)).run();
    return json({ ok: true, version: r.meta.last_row_id });
  }
  if (p === "/api/admin/versions" && req.method === "GET") {
    const { results } = await env.DB.prepare("SELECT id, created_at, note FROM config_versions ORDER BY id DESC LIMIT 50").all();
    return json({ versions: results });
  }
  const m = p.match(/^\/api\/admin\/versions\/(\d+)$/);
  if (m && req.method === "GET") {
    const row = await env.DB.prepare("SELECT id, created_at, note, data FROM config_versions WHERE id = ?").bind(Number(m[1])).first<{ id: number; created_at: string; note: string; data: string }>();
    if (!row) return json({ error: "Not found" }, 404);
    return json({ version: row.id, savedAt: row.created_at, note: row.note, config: normalise(JSON.parse(row.data)) });
  }
  if (p === "/api/admin/defaults" && req.method === "GET") return json({ config: defaultConfig });
  if (p === "/api/admin/quote" && req.method === "POST") {
    const body = await req.json<any>().catch(() => null);
    const cfg = body?.config ? normalise(body.config) : (await loadConfig(env)).config;
    return json(quote(cfg, toRequest(body?.request)));
  }
  if (p === "/api/admin/images" && req.method === "POST") {
    const type = (req.headers.get("content-type") || "").split(";")[0].trim();
    const ext = IMAGE_TYPES[type];
    if (!ext) return json({ error: "Use a WebP, JPEG or PNG image." }, 415);
    const buf = await req.arrayBuffer();
    if (!buf.byteLength || buf.byteLength > MAX_IMAGE) return json({ error: "Image must be under 1.5 MB." }, 413);
    const id = `${crypto.randomUUID()}.${ext}`;
    await env.DB.prepare("INSERT INTO images (id, content_type, bytes, data) VALUES (?, ?, ?, ?)").bind(id, type, buf.byteLength, buf).run();
    return json({ ok: true, id, url: `/media/${id}` });
  }
  return json({ error: "Not found" }, 404);
}
