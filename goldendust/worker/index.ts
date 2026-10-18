// Cloudflare Worker: serves the static site and the itinerary planner API.
// Public:  GET /api/planner/options, POST /api/planner/quote, GET /media/<id> (lodge photos)
// Admin:   /admin (page) and /api/admin/*
//
// Admin security: password + one-time email code, see worker/auth.ts.
// Login page: /admin/login. Local development only: DEV_ADMIN_BYPASS="1" in .dev.vars.
import { authApi, sessionEmail, logoutEverywhere, type AuthEnv } from "./auth";
import { quote, publicOptions, checkConfig, type Config, type QuoteRequest } from "../src/planner/engine";
import { defaultConfig } from "../src/planner/defaults";

interface Env extends AuthEnv {
  ASSETS: Fetcher;
}

const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra } });

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

function withAdminHeaders(res: Response) {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(ADMIN_HEADERS)) out.headers.set(k, v);
  return out;
}

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
    if (p === "/api/planner/lead" && req.method === "POST") return saveLead(req, env);
    const media = p.match(/^\/media\/([a-f0-9-]{36}\.(?:webp|jpg|png))$/);
    if (media && req.method === "GET") {
      const row = await env.DB.prepare("SELECT content_type, data FROM images WHERE id = ?").bind(media[1]).first<{ content_type: string; data: ArrayBuffer }>();
      if (!row) return new Response("Not found", { status: 404 });
      return new Response(new Uint8Array(row.data as ArrayBuffer), {
        headers: { "content-type": row.content_type, "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" },
      });
    }

    // ---- admin login (public)
    const auth = await authApi(req, env, p);
    if (auth) return auth;
    if (p === "/admin/login" || p === "/admin/login.html") {
      if (await sessionEmail(req, env)) return Response.redirect(new URL("/admin", url).href, 302);
      return withAdminHeaders(await env.ASSETS.fetch(new Request(new URL("/admin/login", url), req)));
    }

    // ---- admin (signed in only)
    if (p === "/admin" || p.startsWith("/admin.") || p.startsWith("/admin/") || p.startsWith("/api/admin/")) {
      const email = await sessionEmail(req, env);
      if (!email) {
        if (p.startsWith("/api/")) return json({ error: "Signed out. Sign in again." }, 401);
        return Response.redirect(new URL("/admin/login", url).href, 302);
      }
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
      return withAdminHeaders(await env.ASSETS.fetch(new Request(new URL("/admin", url), req)));
    }

    if (p.startsWith("/api/")) return json({ error: "Not found" }, 404);
    return env.ASSETS.fetch(req);
  },
};

// ---------- leads (guests sending their itinerary on WhatsApp)
function tripSummary(cfg: Config, r: QuoteRequest) {
  const cat = r.category ? r.category[0].toUpperCase() + r.category.slice(1) : "";
  const stops = r.stops.map((s) => {
    const a = cfg.areas.find((x) => x.id === s.areaId)?.name || s.areaId;
    const l = cfg.lodges.find((x) => x.id === s.lodgeId)?.name || "";
    return `${s.nights}n ${a}${l ? ` (${l})` : ""}`;
  });
  const kids = r.childAges.length ? `, kids ${r.childAges.join("/")}` : "";
  return `${r.startDate} · ${r.totalNights} nights · ${r.adults} adult${r.adults === 1 ? "" : "s"}${kids} · ${cat} · ${stops.join(", ")}`;
}

async function saveLead(req: Request, env: Env) {
  const origin = req.headers.get("origin");
  if (!origin || origin !== new URL(req.url).origin) return json({ error: "Bad origin" }, 403);
  const b = await req.json<any>().catch(() => null);
  if (!b || b.website) return json({ ok: true, ref: "" }); // honeypot: pretend it worked
  const name = String(b.name || "").trim().replace(/\s+/g, " ").slice(0, 100);
  const phone = String(b.phone || "").replace(/[^\d+]/g, "").replace(/^00/, "+");
  const email = String(b.email || "").trim().slice(0, 200);
  if (name.length < 2) return json({ error: "Please add your name." }, 400);
  if (!/^\+\d{8,15}$/.test(phone)) return json({ error: "Please add your WhatsApp number with the country code, e.g. +31 6 1234 5678." }, 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "That email doesn't look right." }, 400);
  const ip = req.headers.get("cf-connecting-ip") || "local";
  const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM leads WHERE ip = ? AND created_at > datetime('now', '-1 hour')").bind(ip).first<{ n: number }>();
  if ((recent?.n || 0) >= 10) return json({ error: "Too many requests. Please message us on WhatsApp directly." }, 429);
  const { config } = await loadConfig(env);
  const r = toRequest(b.trip);
  const q = quote(config, r);
  const ins = await env.DB.prepare("INSERT INTO leads (name, phone, email, summary, total, request, ip) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(name, phone, email || null, tripSummary(config, r), q.ok ? q.totals.total : null, JSON.stringify(r), ip).run();
  const id = Number(ins.meta.last_row_id);
  const ref = `GD-${1000 + id}`;
  await env.DB.prepare("UPDATE leads SET ref = ? WHERE id = ?").bind(ref, id).run();
  return json({ ok: true, ref });
}

const IMAGE_TYPES: Record<string, string> = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" };
const MAX_IMAGE = 1_500_000;

async function adminApi(req: Request, env: Env, p: string, email: string): Promise<Response> {
  if (p === "/api/admin/me") return json({ email });
  if (p === "/api/admin/logout-everywhere" && req.method === "POST") return logoutEverywhere(env);
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
  if (p === "/api/admin/leads" && req.method === "GET") {
    const { results } = await env.DB.prepare("SELECT id, ref, created_at, name, phone, email, summary, total, status, notes FROM leads ORDER BY id DESC LIMIT 1000").all();
    return json({ leads: results });
  }
  const lm = p.match(/^\/api\/admin\/leads\/(\d+)$/);
  if (lm && req.method === "PATCH") {
    const b = await req.json<any>().catch(() => ({}));
    const status = ["new", "contacted", "booked", "lost"].includes(b?.status) ? b.status : null;
    if (status) await env.DB.prepare("UPDATE leads SET status = ? WHERE id = ?").bind(status, Number(lm[1])).run();
    if (typeof b?.notes === "string") await env.DB.prepare("UPDATE leads SET notes = ? WHERE id = ?").bind(b.notes.slice(0, 2000), Number(lm[1])).run();
    return json({ ok: true });
  }
  const ld = p.match(/^\/api\/admin\/leads\/(\d+)\/doc$/);
  if (ld && req.method === "GET") {
    const row = await env.DB.prepare("SELECT id, ref, created_at, name, phone, email, total, request FROM leads WHERE id = ?").bind(Number(ld[1])).first<any>();
    if (!row) return json({ error: "Not found" }, 404);
    const { config } = await loadConfig(env);
    const trip = toRequest(JSON.parse(row.request));
    const q = quote(config, trip, "1970-01-01");
    return json({ guest: { name: row.name, phone: row.phone, email: row.email, ref: row.ref, created_at: row.created_at, total: row.total }, trip, options: publicOptions(config), ok: q.ok, errors: q.errors, priced: q.priced, perPerson: q.totals.perPerson, people: q.people });
  }
  if (lm && req.method === "DELETE") {
    await env.DB.prepare("DELETE FROM leads WHERE id = ?").bind(Number(lm[1])).run();
    return json({ ok: true });
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
