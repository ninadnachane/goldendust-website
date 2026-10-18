// Cloudflare Worker: serves the static site and the itinerary planner API.
// Public:  GET /api/planner/options, POST /api/planner/quote
// Admin:   /admin (page), /api/admin/* (password protected, ADMIN_PASSWORD secret)
import { quote, publicOptions, checkConfig, type Config, type QuoteRequest } from "../src/planner/engine";
import { defaultConfig } from "../src/planner/defaults";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra } });

async function sameText(a: string, b: string) {
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  const ua = new Uint8Array(x), ub = new Uint8Array(y);
  let diff = 0;
  for (let i = 0; i < ua.length; i++) diff |= ua[i] ^ ub[i];
  return diff === 0;
}

async function isAdmin(req: Request, env: Env) {
  if (!env.ADMIN_PASSWORD) return false;
  const h = req.headers.get("authorization") || "";
  if (!h.startsWith("Basic ")) return false;
  let decoded = "";
  try { decoded = atob(h.slice(6)); } catch { return false; }
  const pass = decoded.slice(decoded.indexOf(":") + 1);
  return sameText(pass, env.ADMIN_PASSWORD);
}

const challenge = (env: Env) =>
  env.ADMIN_PASSWORD
    ? new Response("Login required", { status: 401, headers: { "www-authenticate": 'Basic realm="Golden Dust admin", charset="UTF-8"', "cache-control": "no-store" } })
    : new Response("Admin is not set up yet: add an ADMIN_PASSWORD secret to the Worker.", { status: 503 });

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

    // ---- public planner API
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

    // ---- admin
    if (p === "/admin" || p.startsWith("/admin.") || p.startsWith("/admin/") || p.startsWith("/api/admin/")) {
      if (!(await isAdmin(req, env))) return challenge(env);
      if (p.startsWith("/api/admin/")) return adminApi(req, env, p);
      const res = await env.ASSETS.fetch(new Request(new URL("/admin", url), req));
      const out = new Response(res.body, res);
      out.headers.set("cache-control", "no-store");
      out.headers.set("x-robots-tag", "noindex, nofollow");
      return out;
    }

    if (p.startsWith("/api/")) return json({ error: "Not found" }, 404);
    return env.ASSETS.fetch(req);
  },
};

async function adminApi(req: Request, env: Env, p: string): Promise<Response> {
  if (p === "/api/admin/config" && req.method === "GET") {
    const cur = await loadConfig(env);
    return json({ ...cur, issues: checkConfig(cur.config) });
  }
  if (p === "/api/admin/config" && req.method === "PUT") {
    const body = await req.json<any>().catch(() => null);
    const cfg = body?.config as Config;
    const issues = cfg ? checkConfig(cfg) : ["No config sent."];
    if (issues.length) return json({ ok: false, issues }, 400);
    const note = String(body?.note || "").slice(0, 200);
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
  return json({ error: "Not found" }, 404);
}
