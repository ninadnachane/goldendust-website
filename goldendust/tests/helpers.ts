// Test helpers: an in-memory D1 database (SQLite via sql.js) and a ready-made Worker env.
import initSqlJs from "sql.js";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SQL = await initSqlJs();

const val = (v: unknown) => (v === undefined ? null : typeof v === "boolean" ? Number(v) : v instanceof ArrayBuffer ? new Uint8Array(v) : v) as any;

export function fakeD1() {
  const db = new SQL.Database();
  for (const f of readdirSync("migrations").filter((x) => x.endsWith(".sql")).sort()) db.exec(readFileSync(join("migrations", f), "utf8"));
  const statement = (sql: string, params: unknown[] = []) => ({
    bind: (...args: unknown[]) => statement(sql, args),
    async first<T = any>(): Promise<T | null> {
      const st = db.prepare(sql); st.bind(params.map(val));
      const row = st.step() ? (st.getAsObject() as T) : null; st.free(); return row;
    },
    async all<T = any>() {
      const st = db.prepare(sql); st.bind(params.map(val));
      const results: T[] = []; while (st.step()) results.push(st.getAsObject() as T); st.free();
      return { results };
    },
    async run() {
      const st = db.prepare(sql); st.bind(params.map(val)); st.step(); st.free();
      const id = db.exec("SELECT last_insert_rowid() AS id")[0]?.values[0][0] ?? 0;
      return { meta: { last_row_id: Number(id), changes: db.getRowsModified() } };
    },
  });
  return { prepare: (sql: string) => statement(sql), _db: db };
}

export function testEnv(extra: Record<string, unknown> = {}) {
  return {
    DB: fakeD1() as any,
    ASSETS: { fetch: async (r: Request) => new Response(`asset:${new URL(r.url).pathname}`, { headers: { "content-type": "text/html" } }) } as any,
    ADMIN_EMAILS: "hello@goldendustsafaris.com",
    ADMIN_PASSWORD: "correct-horse-battery",
    DEV_EMAIL_LOG: "1",
    ...extra,
  };
}

export const ORIGIN = "https://goldendust.example";
export const daysFromNow = (n: number) => { const d = new Date(); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

export function req(path: string, init: RequestInit & { json?: unknown; cookie?: string; origin?: string | null } = {}) {
  const headers = new Headers(init.headers);
  if (init.json !== undefined) headers.set("content-type", "application/json");
  if (init.cookie) headers.set("cookie", init.cookie);
  if (init.origin !== null && (init.method && init.method !== "GET")) headers.set("origin", init.origin ?? ORIGIN);
  headers.set("cf-connecting-ip", (init as any).ip || "203.0.113.7");
  return new Request(ORIGIN + path, { ...init, headers, body: init.json !== undefined ? JSON.stringify(init.json) : init.body });
}
