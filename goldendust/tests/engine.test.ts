// Pricing engine: the numbers guests see must always follow the agreed formula.
import { test } from "node:test";
import assert from "node:assert/strict";
import { quote, roomPlan, seasonFor, checkConfig, publicOptions, type QuoteRequest } from "../src/planner/engine";
import { defaultConfig as cfg } from "../src/planner/defaults";

const TODAY = "2026-10-18";
const trip = (over: Partial<QuoteRequest> = {}): QuoteRequest => ({
  startDate: "2026-11-08", adults: 2, childAges: [8], category: "comfort", totalNights: 6,
  stops: [
    { areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" },
    { areaId: "central-serengeti", nights: 3, lodgeId: "central-serengeti-comfort" },
    { areaId: "ngorongoro", nights: 1, lodgeId: "ngorongoro-comfort" },
  ],
  ...over,
});
const round = (n: number) => Math.round(n * 100) / 100;

test("sample config is valid", () => assert.deepEqual(checkConfig(cfg), []));

test("total = (park fees + others × 1.10) × 1.07, matches a hand calculation", () => {
  const q = quote(cfg, trip(), TODAY);
  assert.equal(q.ok, true, q.errors.join("; "));
  const park = (2 * 53.1 + 17.7) + (2 * 82.6 + 23.6) * 3 + (2 * 59 + 11.8) * 3 + (2 * 71.8 + 23.6) + 295;
  const acc = (160 + 45) + (320 + 90) * 5; // Arusha low season + 5 lodge nights low season
  const transport = 180 * 6 + 40 * 6;
  const meals = 2 * 15 + 10;
  assert.equal(q.totals.park, round(park));
  assert.equal(q.totals.others, round(acc + transport + meals));
  assert.equal(q.totals.total, round((park + (acc + transport + meals) * 1.1) * 1.07));
});

test("guest categories always add up exactly to the total", () => {
  for (const t of [trip(), trip({ adults: 5, childAges: [3, 9, 15] }), trip({ category: "luxury" })]) {
    const p = quote(cfg, t, TODAY).priced;
    assert.equal(round(p.park + p.transport + p.accommodation + p.meals + p.margin), p.total);
  }
});

test("margin is shown separately and equals 7% of the subtotal", () => {
  const q = quote(cfg, trip(), TODAY);
  assert.equal(q.priced.margin, round(q.totals.subtotal * 0.07));
});

test("8 or more guests get a second vehicle and guide", () => {
  assert.equal(quote(cfg, trip({ adults: 7, childAges: [] }), TODAY).people.vehicles, 1);
  const q = quote(cfg, trip({ adults: 8, childAges: [] }), TODAY);
  assert.equal(q.people.vehicles, 2);
  assert.equal(q.people.guides, 2);
});

test("under-5s are free, 5–15 pay child rates", () => {
  const q = quote(cfg, trip({ childAges: [2, 4] }), TODAY);
  assert.equal(q.people.infants, 2);
  assert.equal(q.people.children, 0);
  const q2 = quote(cfg, trip({ childAges: [] }), TODAY);
  assert.equal(q.totals.total, q2.totals.total);
});

test("cheapest mix of rooms, a single traveller pays a room", () => {
  const rt = { single: 100, double: 120, triple: 150, child: 0 };
  assert.equal(roomPlan(1, rt).cost, 100);
  assert.equal(roomPlan(3, rt).cost, 150);
  assert.equal(roomPlan(4, rt).cost, 240);
});

test("seasons follow the calendar, including ranges across new year", () => {
  assert.equal(seasonFor(cfg, "2026-07-15").id, "high");
  assert.equal(seasonFor(cfg, "2026-12-31").id, "high");
  assert.equal(seasonFor(cfg, "2027-01-03").id, "high");
  assert.equal(seasonFor(cfg, "2027-04-20").id, "green");
  assert.equal(seasonFor(cfg, "2027-02-10").id, "low");
});

test("guests can't book within the 20-day notice period", () => {
  const q = quote(cfg, trip({ startDate: "2026-10-30" }), TODAY);
  assert.equal(q.ok, false);
  assert.match(q.errors.join(" "), /earliest arrival/i);
});

test("nights must add up and respect minimum nights per area", () => {
  assert.match(quote(cfg, trip({ totalNights: 8 }), TODAY).errors.join(" "), /to share out/);
  const north = trip({ totalNights: 3, stops: [{ areaId: "north-serengeti", nights: 1, lodgeId: "north-serengeti-comfort" }, { areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" }] });
  assert.match(quote(cfg, north, TODAY).errors.join(" "), /North Serengeti needs at least 2 nights/);
});

test("a lodge from another category or area is rejected", () => {
  const t = trip(); t.stops[0].lodgeId = "tarangire-luxury";
  assert.equal(quote(cfg, t, TODAY).ok, false);
});

test("public options never expose rates or fees", () => {
  const s = JSON.stringify(publicOptions(cfg));
  for (const word of ["rates", "double", "adultDay", "vehicleDay", "guideDay", "marginPct", "adminPct"]) assert.equal(s.includes(word), false, word);
});
