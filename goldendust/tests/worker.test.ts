// Website API: admin login security, leads, private PDF links and the public planner endpoints.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/index";
import { testEnv, req, daysFromNow, ORIGIN } from "./helpers";

let env: ReturnType<typeof testEnv>;
beforeEach(() => { env = testEnv(); });
const call = (r: Request, e = env) => worker.fetch(r, e as any);

const trip = () => ({
  startDate: daysFromNow(60), adults: 2, childAges: [], category: "comfort", totalNights: 4,
  stops: [{ areaId: "central-serengeti", nights: 2, lodgeId: "out-in-africa-serengeti-camp" }, { areaId: "ngorongoro", nights: 1, lodgeId: "embalakai-ngorongoro" }],
});

// capture the emailed login code (DEV_EMAIL_LOG prints it instead of sending)
async function login(e = env, password = "correct-horse-battery") {
  const logs: string[] = [];
  const orig = console.log; console.log = (...a: unknown[]) => { logs.push(a.join(" ")); };
  try {
    const r1 = await call(req("/api/auth/login", { method: "POST", json: { email: "hello@goldendustsafaris.com", password } }), e);
    if (r1.status !== 200) return { status: r1.status, cookie: "" };
    const { challenge } = await r1.json() as any;
    const code = logs.map((l) => l.match(/login code for [^:]+: (\d{6})/)?.[1]).find(Boolean)!;
    const r2 = await call(req("/api/auth/verify", { method: "POST", json: { challenge, code } }), e);
    const cookie = (r2.headers.get("set-cookie") || "").split(";")[0];
    return { status: r2.status, cookie, setCookie: r2.headers.get("set-cookie") || "" };
  } finally { console.log = orig; }
}

test("public site pages are served from static assets", async () => {
  const r = await call(req("/about"));
  assert.equal(await r.text(), "asset:/about");
});

test("planner options load and contain no rates", async () => {
  const r = await call(req("/api/planner/options"));
  assert.equal(r.status, 200);
  const s = await r.text();
  assert.ok(s.includes("central-serengeti"));
  assert.equal(s.includes("adultDay"), false);
});

test("planner quote returns a priced total for a valid trip", async () => {
  const r = await call(req("/api/planner/quote", { method: "POST", json: trip() }));
  const d = await r.json() as any;
  assert.equal(d.ok, true, (d.errors || []).join("; "));
  assert.ok(d.priced.total > 0);
  assert.equal(d.totals, undefined, "internal cost totals must not be sent to guests");
});

test("the crater choice is passed through and adds to the price", async () => {
  const noRim = { ...trip(), stops: [{ areaId: "central-serengeti", nights: 3, lodgeId: "out-in-africa-serengeti-camp" }] };
  const base = (await (await call(req("/api/planner/quote", { method: "POST", json: noRim }))).json() as any).priced.total;
  const withCrater = (await (await call(req("/api/planner/quote", { method: "POST", json: { ...noRim, crater: true } }))).json() as any).priced;
  assert.equal(Math.round((withCrater.total - base) * 100) / 100, 295, "crater: park fee, no admin fee, no margin");
  assert.equal(withCrater.extras, 295);
});

test("admin page and API are locked when signed out", async () => {
  const page = await call(req("/admin"));
  assert.equal(page.status, 302);
  assert.match(page.headers.get("location") || "", /\/admin\/login$/);
  assert.equal((await call(req("/api/admin/config"))).status, 401);
  assert.equal((await call(req("/api/admin/leads"))).status, 401);
});

test("admin stays locked if the password secret is missing or too short", async () => {
  for (const pw of [undefined, "short"]) {
    const e = testEnv({ ADMIN_PASSWORD: pw });
    const r = await call(req("/api/auth/login", { method: "POST", json: { email: "hello@goldendustsafaris.com", password: pw || "" } }), e);
    assert.equal(r.status, 503);
  }
});

test("wrong email or password is refused with the same message", async () => {
  const a = await call(req("/api/auth/login", { method: "POST", json: { email: "someone@gmail.com", password: "correct-horse-battery" } }));
  const b = await call(req("/api/auth/login", { method: "POST", json: { email: "hello@goldendustsafaris.com", password: "nope-nope-nope" } }));
  assert.equal(a.status, 401); assert.equal(b.status, 401);
  assert.deepEqual(await a.json(), await b.json());
});

test("password + emailed code signs in with a secure cookie; sign-out ends it", async () => {
  const s = await login();
  assert.equal(s.status, 200);
  assert.match(s.setCookie!, /^__Host-gd_admin=[a-f0-9]{64}; Path=\/; Max-Age=43200; HttpOnly; Secure; SameSite=Strict$/);
  assert.equal((await call(req("/api/admin/config", { cookie: s.cookie }))).status, 200);
  const page = await call(req("/admin", { cookie: s.cookie }));
  assert.equal(page.status, 200);
  assert.match(page.headers.get("content-security-policy") || "", /frame-ancestors 'none'/);
  await call(req("/api/auth/logout", { method: "POST", cookie: s.cookie }));
  assert.equal((await call(req("/api/admin/config", { cookie: s.cookie }))).status, 401);
});

test("a wrong code is refused, a code works only once", async () => {
  const logs: string[] = []; const orig = console.log; console.log = (...a: unknown[]) => { logs.push(a.join(" ")); };
  try {
    const r1 = await call(req("/api/auth/login", { method: "POST", json: { email: "hello@goldendustsafaris.com", password: "correct-horse-battery" } }));
    const { challenge } = await r1.json() as any;
    const code = logs.map((l) => l.match(/: (\d{6})$/)?.[1]).find(Boolean)!;
    assert.equal((await call(req("/api/auth/verify", { method: "POST", json: { challenge, code: code === "000000" ? "111111" : "000000" } }))).status, 401);
    assert.equal((await call(req("/api/auth/verify", { method: "POST", json: { challenge, code } }))).status, 200);
    assert.equal((await call(req("/api/auth/verify", { method: "POST", json: { challenge, code } }))).status, 401);
  } finally { console.log = orig; }
});

test("too many wrong passwords lock the login", async () => {
  for (let i = 0; i < 5; i++) await call(req("/api/auth/login", { method: "POST", json: { email: "hello@goldendustsafaris.com", password: "wrong-wrong-wrong" } }));
  const r = await call(req("/api/auth/login", { method: "POST", json: { email: "hello@goldendustsafaris.com", password: "correct-horse-battery" } }));
  assert.equal(r.status, 429);
});

test("a forged session cookie doesn't work", async () => {
  const r = await call(req("/api/admin/config", { cookie: "__Host-gd_admin=" + "a".repeat(64) }));
  assert.equal(r.status, 401);
});

test("requests from other websites can't change data", async () => {
  const s = await login();
  const r = await call(req("/api/admin/config", { method: "PUT", cookie: s.cookie, origin: "https://evil.example", json: {} }));
  assert.equal(r.status, 403);
  const l = await call(req("/api/planner/lead", { method: "POST", origin: "https://evil.example", json: {} }));
  assert.equal(l.status, 403);
});

test("lead needs a name and a valid mobile number", async () => {
  const bad = await call(req("/api/planner/lead", { method: "POST", json: { name: "A", phone: "0612", trip: trip() } }));
  assert.equal(bad.status, 400);
  const noCode = await call(req("/api/planner/lead", { method: "POST", json: { name: "Ann", phone: "0612345678", trip: trip() } }));
  assert.equal(noCode.status, 400);
});

test("PDF lead is saved, opens with its private link, and nothing else opens it", async () => {
  const r = await call(req("/api/planner/lead", { method: "POST", json: { name: "Ann Guest", phone: "+31 6 1234 5678", trip: trip(), source: "pdf" } }));
  const d = await r.json() as any;
  assert.equal(r.status, 200);
  assert.match(d.ref, /^GD-\d+$/);
  assert.match(d.token, /^[a-f0-9]{32}$/);
  const ok = await call(req(`/api/planner/itinerary?ref=${d.ref}&k=${d.token}`));
  assert.equal(ok.status, 200);
  const doc = await ok.json() as any;
  assert.equal(doc.guest.name, "Ann Guest");
  assert.equal(doc.guest.phone, undefined, "guest link must not return the phone number");
  assert.equal((await call(req(`/api/planner/itinerary?ref=${d.ref}&k=${"0".repeat(32)}`))).status, 404);
  assert.equal((await call(req(`/api/planner/itinerary?ref=${d.ref}`))).status, 404);
  // admin sees it, with source
  const s = await login();
  const leads = (await (await call(req("/api/admin/leads", { cookie: s.cookie }))).json() as any).leads;
  assert.equal(leads[0].phone, "+31612345678");
  assert.equal(leads[0].source, "pdf");
});

test("honeypot field silently drops spam", async () => {
  const r = await call(req("/api/planner/lead", { method: "POST", json: { name: "Bot", phone: "+15555555555", website: "spam.com", trip: trip() } }));
  assert.equal(r.status, 200);
  const s = await login();
  const leads = (await (await call(req("/api/admin/leads", { cookie: s.cookie }))).json() as any).leads;
  assert.equal(leads.length, 0);
});

test("saving rates creates a new version and the planner uses it", async () => {
  const s = await login();
  const cur = await (await call(req("/api/admin/config", { cookie: s.cookie }))).json() as any;
  const before = (await (await call(req("/api/planner/quote", { method: "POST", json: trip() }))).json() as any).priced.total;
  cur.config.settings.vehicleDay += 100;
  const put = await call(req("/api/admin/config", { method: "PUT", cookie: s.cookie, json: { config: cur.config, note: "test" } }));
  assert.equal(put.status, 200);
  const after = (await (await call(req("/api/planner/quote", { method: "POST", json: trip() }))).json() as any).priced.total;
  assert.ok(after > before);
});

test("broken rate data is refused instead of saved", async () => {
  const s = await login();
  const cur = await (await call(req("/api/admin/config", { cookie: s.cookie }))).json() as any;
  cur.config.areas[0].feeZoneId = "does-not-exist";
  const put = await call(req("/api/admin/config", { method: "PUT", cookie: s.cookie, json: { config: cur.config } }));
  assert.equal(put.status, 400);
});

void ORIGIN;
