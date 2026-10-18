// Pricing engine: the numbers guests see must always follow the agreed rules.
import { test } from "node:test";
import assert from "node:assert/strict";
import { quote, roomPlan, seasonFor, checkConfig, publicOptions, upgradeConfig, type QuoteRequest, type Config } from "../src/planner/engine";
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
const line = (q: ReturnType<typeof quote>, re: RegExp) => q.lines.filter((l) => re.test(l.label));
const sumOf = (q: ReturnType<typeof quote>, re: RegExp) => round(line(q, re).reduce((a, l) => a + l.cost, 0));

test("sample config is valid", () => assert.deepEqual(checkConfig(cfg), []));

test("total = (park fees + others × 1.10) × 1.07, matches a hand calculation", () => {
  const q = quote(cfg, trip(), TODAY);
  assert.equal(q.ok, true, q.errors.join("; "));
  const park =
    (2 * 59 + 17.7) + (2 * 47.2 + 11.8) +              // Tarangire entry + concession (lodge inside), 1 night
    (2 * 82.6 + 23.6) * 3 + (2 * 70.8 + 11.8) * 3 +    // Serengeti entry + concession, 3 nights
    (2 * 71.8 + 23.6) +                                 // Ngorongoro area entry, 1 night (rim stay)
    (2 * 71.8 + 23.6);                                  // NCA transit: Tarangire → Serengeti in one day
  const acc = (160 + 45) + (320 + 90) * 5;
  const transport = 180 * 6 + 40 * 6 + 80;             // vehicle + guide + airport transfer
  const meals = 2 * 15 + 10;
  assert.equal(q.totals.park, round(park));
  assert.equal(q.totals.others, round(acc + transport + meals));
  assert.equal(q.totals.total, round((park + (acc + transport + meals) * 1.1) * 1.07));
});

test("guest categories always add up exactly to the total", () => {
  for (const t of [trip(), trip({ adults: 5, childAges: [3, 9, 15] }), trip({ category: "luxury", crater: true })]) {
    const p = quote(cfg, t, TODAY).priced;
    assert.equal(round(p.park + p.transport + p.accommodation + p.meals + p.margin), p.total);
  }
});

test("margin is shown separately and equals 7% of the subtotal", () => {
  const q = quote(cfg, trip(), TODAY);
  assert.equal(q.priced.margin, round(q.totals.subtotal * 0.07));
});

test("airport pick-up and drop-off is $80 per booking, whatever the group size", () => {
  assert.equal(sumOf(quote(cfg, trip(), TODAY), /Airport/), 80);
  assert.equal(sumOf(quote(cfg, trip({ adults: 9, childAges: [] }), TODAY), /Airport/), 80);
});

test("Budget pays the public campsite fee, not the concession fee", () => {
  const t = trip({ category: "budget" }); t.stops.forEach((s) => (s.lodgeId = s.lodgeId.replace("comfort", "budget")));
  const q = quote(cfg, t, TODAY);
  assert.equal(line(q, /concession/).length, 0);
  assert.equal(sumOf(q, /Serengeti.*campsite/), round((2 * 35.4 + 5.9) * 3));
});

test("concession only for lodges inside the park", () => {
  const c: Config = JSON.parse(JSON.stringify(cfg));
  c.lodges.find((l) => l.id === "central-serengeti-comfort")!.insidePark = false;
  assert.equal(line(quote(c, trip(), TODAY), /Serengeti.*concession/).length, 0);
  assert.equal(sumOf(quote(cfg, trip(), TODAY), /Serengeti.*concession/), round((2 * 70.8 + 11.8) * 3));
});

test("NCA transit: one day per crossing between east and Serengeti without an NCA night", () => {
  const nca = 2 * 71.8 + 23.6;
  // Tarangire → Serengeti → Arusha: out and back on different days = 2
  const twoWay = trip({ totalNights: 5, stops: [{ areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" }, { areaId: "central-serengeti", nights: 3, lodgeId: "central-serengeti-comfort" }] });
  assert.equal(sumOf(quote(cfg, twoWay, TODAY), /transit/), round(nca * 2));
  // a night on the crater rim on the way back replaces the return transit = 1
  assert.equal(sumOf(quote(cfg, trip(), TODAY), /transit/), round(nca));
  // Tarangire and Manyara only: never crosses = 0
  const east = trip({ totalNights: 3, stops: [{ areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" }, { areaId: "manyara", nights: 1, lodgeId: "manyara-comfort" }] });
  assert.equal(line(quote(cfg, east, TODAY), /transit/).length, 0);
});

test("Ngorongoro Crater is a separate choice: crater fee per vehicle, plus an NCA day only if needed", () => {
  assert.equal(line(quote(cfg, trip(), TODAY), /Crater descent/).length, 0);
  assert.equal(sumOf(quote(cfg, trip({ crater: true }), TODAY), /Crater descent/), 295);
  assert.equal(sumOf(quote(cfg, trip({ crater: true, adults: 8, childAges: [] }), TODAY), /Crater descent/), 590);
  // east-only trip + crater → one extra NCA entry day
  const east = trip({ totalNights: 3, crater: true, stops: [{ areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" }, { areaId: "manyara", nights: 1, lodgeId: "manyara-comfort" }] });
  assert.equal(line(quote(cfg, east, TODAY), /entry for the crater day/).length, 1);
  // already crossing the NCA → no extra day
  assert.equal(line(quote(cfg, trip({ crater: true }), TODAY), /entry for the crater day/).length, 0);
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
  assert.equal(q.totals.total, quote(cfg, trip({ childAges: [] }), TODAY).totals.total);
});

test("cheapest mix of rooms, a single traveller pays a room", () => {
  const rt = { single: 100, double: 120, triple: 150, child: 0 };
  assert.equal(roomPlan(1, rt).cost, 100);
  assert.equal(roomPlan(3, rt).cost, 150);
  assert.equal(roomPlan(4, rt).cost, 240);
});

test("lodge seasons follow the calendar, including ranges across new year", () => {
  assert.equal(seasonFor(cfg, "2026-07-15").id, "high");
  assert.equal(seasonFor(cfg, "2026-12-31").id, "high");
  assert.equal(seasonFor(cfg, "2027-01-03").id, "high");
  assert.equal(seasonFor(cfg, "2027-04-20").id, "green");
  assert.equal(seasonFor(cfg, "2027-02-10").id, "low");
});

test("park fees are the same in every season", () => {
  const park = (d: string) => quote(cfg, trip({ startDate: d }), TODAY).totals.park;
  assert.equal(park("2027-07-10"), park("2027-04-10"));
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

test("older saved rates are upgraded to the new park fee fields", () => {
  const old: any = JSON.parse(JSON.stringify(cfg));
  old.feeZones = old.feeZones.map((z: any) => ({ id: z.id, name: z.name, adultDay: z.adultDay, childDay: z.childDay, adultNight: 59, childNight: 11.8 }));
  old.areas = old.areas.map((a: any) => { const { side, ...rest } = a; return { ...rest, vehicleFee: a.id === "ngorongoro" ? 295 : 0 }; });
  delete old.settings.craterFee; delete old.settings.ncaZoneId; delete old.settings.airportTransfer;
  const up = upgradeConfig(old);
  assert.deepEqual(checkConfig(up), []);
  assert.equal(up.settings.craterFee, 295);
  assert.equal(up.areas.find((a) => a.id === "central-serengeti")!.side, "west");
  assert.equal(quote(up, trip(), TODAY).ok, true);
});

test("public options never expose rates or fees", () => {
  const s = JSON.stringify(publicOptions(cfg));
  for (const word of ["rates", "double", "adultDay", "concession", "vehicleDay", "guideDay", "marginPct", "adminPct", "craterFee"]) assert.equal(s.includes(word), false, word);
});
