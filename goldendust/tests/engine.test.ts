// Pricing engine: the numbers guests see must always follow the agreed rules.
import { test } from "node:test";
import assert from "node:assert/strict";
import { quote, roomPlan, periodFor, checkConfig, publicOptions, upgradeConfig, type QuoteRequest, type Config } from "../src/planner/engine";
import { sampleConfig as cfg } from "./fixture";
import { defaultConfig } from "../src/planner/defaults";

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
  const acc = (2 * 96 + 54) + (416 + 117) * 5;         // fixed Arusha rate + 5 lodge nights (high season)
  const transport = 180 * 6 + 40 * 6 + 80;             // vehicle + guide + airport transfer
  const meals = 2 * 15 + 10;
  assert.equal(q.totals.park, round(park));
  assert.equal(q.totals.others, round(acc + transport + meals));
  const crater = 295; // a Ngorongoro night always includes the crater game drive (park fee: no admin fee, no margin)
  assert.equal(q.totals.extras, crater);
  assert.equal(q.totals.total, round(round((park + (acc + transport + meals) * 1.1) * 1.07) + crater));
});

test("guest categories always add up exactly to the total", () => {
  for (const t of [trip(), trip({ adults: 5, childAges: [3, 9, 15] }), trip({ crater: true, addons: ["balloon"] })]) {
    const p = quote(cfg, t, TODAY).priced;
    assert.equal(round(p.park + p.transport + p.accommodation + p.meals + p.extras + p.margin), p.total);
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

test("Budget camps pay the public campsite fee, not the concession fee", () => {
  const t = trip(); t.stops.forEach((s) => (s.lodgeId = s.lodgeId.replace("comfort", "budget")));
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
  // Ndutu also counts as beyond the crater highlands: there and back on different days = 2
  const ndutu = trip({ totalNights: 4, stops: [{ areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" }, { areaId: "ndutu", nights: 2, lodgeId: "ndutu-comfort" }] });
  assert.equal(sumOf(quote(cfg, ndutu, TODAY), /transit/), round(nca * 2));
  // Tarangire and Manyara only: never crosses = 0
  const east = trip({ totalNights: 3, stops: [{ areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" }, { areaId: "manyara", nights: 1, lodgeId: "manyara-comfort" }] });
  assert.equal(line(quote(cfg, east, TODAY), /transit/).length, 0);
});

test("Ngorongoro Crater: crater fee per vehicle, plus an NCA day only if needed", () => {
  assert.equal(line(quote(cfg, trip(), TODAY), /Crater game drive/).length, 1, "included with the Ngorongoro night");
  assert.equal(sumOf(quote(cfg, trip({ crater: true }), TODAY), /Crater game drive/), 295);
  assert.equal(sumOf(quote(cfg, trip({ crater: true, adults: 8, childAges: [] }), TODAY), /Crater game drive/), 590);
  // east-only trip + crater → one extra NCA entry day
  const east = trip({ totalNights: 3, crater: true, stops: [{ areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" }, { areaId: "manyara", nights: 1, lodgeId: "manyara-comfort" }] });
  assert.equal(line(quote(cfg, east, TODAY), /entry for the crater day/).length, 1);
  // already crossing the NCA → no extra day
  assert.equal(line(quote(cfg, trip({ crater: true }), TODAY), /entry for the crater day/).length, 0);
});

test("add-ons: priced per person (children at child rate), per vehicle or per booking, with the add-on admin fee", () => {
  const base = quote(cfg, trip(), TODAY);
  const q = quote(cfg, trip({ addons: ["balloon", "bush-breakfast"] }), TODAY);
  assert.equal(sumOf(q, /Balloon/), round(2 * 599 + 1 * 599));
  assert.equal(sumOf(q, /Bush breakfast/), round(2 * 45 + 1 * 25));
  assert.equal(q.totals.extras, round(3 * 599 + 115 + 295), "balloon + breakfast + the crater drive that comes with the Ngorongoro night");
  assert.equal(q.totals.park, base.totals.park, "extras are not park fees");
  assert.equal(q.priced.extras, round((q.totals.extras - 295) * 1.02 + 295), "2% add-on admin fee (none on the crater park fee), no margin");
  // crater chosen through the add-on list works like the old yes/no
  assert.equal(quote(cfg, trip({ addons: ["crater"] }), TODAY).totals.total, quote(cfg, trip({ crater: true }), TODAY).totals.total);
  // unknown or switched-off add-ons are ignored
  assert.equal(quote(cfg, trip({ addons: ["made-up"] }), TODAY).totals.total, base.totals.total);
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

test("lodge rates are per person per night: single alone, double/triple per person sharing", () => {
  const c: Config = JSON.parse(JSON.stringify(cfg));
  const l = c.lodges.find((x) => x.id === "tarangire-comfort")!;
  l.periods = [{ season: "All year", from: "01-01", to: "12-31", single: 200, double: 150, triple: 120, child: 60 }];
  const acc = (adults: number, childAges: number[] = []) => line(quote(c, trip({ adults, childAges }), TODAY), /Night 2 Tarangire/)[0].cost;
  assert.equal(acc(1), 200);
  assert.equal(acc(2), 300);
  assert.equal(acc(3), 360);
  assert.equal(acc(2, [8]), 360);
});

test("rate periods ignore the year and can cross the new year", () => {
  const l = { periods: [{ season: "High", from: "12-10", to: "03-31", single: 1, double: 1, triple: 1, child: 1 }, { season: "Low", from: "04-01", to: "12-09", single: 1, double: 1, triple: 1, child: 1 }] };
  assert.equal(periodFor(l, "2026-12-25")!.season, "High");
  assert.equal(periodFor(l, "2031-01-15")!.season, "High");
  assert.equal(periodFor(l, "2027-04-01")!.season, "Low");
  assert.equal(periodFor({ periods: [] }, "2027-04-01"), undefined);
});

test("a lodge without a rate for a night isn't bookable for those dates", () => {
  const c: Config = JSON.parse(JSON.stringify(cfg));
  c.lodges.find((x) => x.id === "tarangire-comfort")!.periods = [{ season: "High", from: "06-01", to: "10-31", single: 1, double: 1, triple: 1, child: 1 }];
  const q = quote(c, trip(), TODAY); // Tarangire night is 9 Nov
  assert.equal(q.ok, false);
  assert.match(q.errors.join(" "), /Sample comfort lodge \(Tarangire\) has no rate for the night of 2026-11-09/);
});

test("lodges with a minimum child age are still offered to everyone", () => {
  const c: Config = JSON.parse(JSON.stringify(cfg));
  c.lodges.find((x) => x.id === "tarangire-comfort")!.minChildAge = 6;
  assert.equal(quote(c, trip({ childAges: [4] }), TODAY).ok, true);
  assert.equal(quote(c, trip({ childAges: [6] }), TODAY).ok, true);
  assert.equal(quote(c, trip({ childAges: [] }), TODAY).ok, true);
});

test("real lodge data: valid, Arusha night at the fixed rate, Karatu has no park fees", () => {
  assert.deepEqual(checkConfig(defaultConfig), []);
  assert.ok(defaultConfig.lodges.length >= 10);
  assert.ok(defaultConfig.lodges.every((l) => l.areaId !== "arusha" && l.periods.length));
  const q = quote(defaultConfig, trip({ childAges: [], stops: [
    { areaId: "tarangire", nights: 1, lodgeId: "angata-tarangire-camp" },
    { areaId: "central-serengeti", nights: 3, lodgeId: "out-in-africa-serengeti-camp" },
    { areaId: "karatu", nights: 1, lodgeId: "karatu-simba-lodge" },
  ] }), TODAY);
  assert.equal(q.ok, true, q.errors.join("; "));
  assert.equal(line(q, /Night 1/).length, 1, "the Arusha night is always a line, at the fixed rate");
  assert.equal(line(q, /Karatu/).filter((l) => l.group === "park").length, 0);
  const opts = publicOptions(defaultConfig);
  assert.equal(opts.arrivalPriced, true);
  const withLodges = new Set(defaultConfig.lodges.filter((l) => l.active !== false).map((l) => l.areaId));
  assert.ok(opts.areas.every((a) => withLodges.has(a.id)), "areas without lodges are hidden");
  assert.ok(opts.areas.some((a) => a.id === "north-serengeti"), "North Serengeti has camps now");
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

test("guests can mix lodge tags per area; a lodge from another area is rejected", () => {
  const mixed = trip(); mixed.stops[0].lodgeId = "tarangire-budget"; mixed.stops[1].lodgeId = "central-serengeti-luxury";
  assert.equal(quote(cfg, mixed, TODAY).ok, true);
  const wrong = trip(); wrong.stops[0].lodgeId = "ngorongoro-comfort";
  assert.equal(quote(cfg, wrong, TODAY).ok, false);
});

test("Budget camp pays campsite fee and other lodges pay concession, in the same trip", () => {
  const t = trip(); t.stops[0].lodgeId = "tarangire-budget";
  const q = quote(cfg, t, TODAY);
  assert.equal(line(q, /Tarangire.*campsite/).length, 1);
  assert.equal(line(q, /Tarangire.*concession/).length, 0);
  assert.equal(line(q, /Serengeti.*concession/).length, 1);
});

test("Arusha night is a fixed rate per person, whichever hotel", () => {
  const n1 = (t: QuoteRequest) => line(quote(cfg, t, TODAY), /Night 1/)[0];
  assert.equal(n1(trip()).cost, 2 * 96 + 54);
  const lux = trip(); lux.stops.forEach((s) => (s.lodgeId = s.lodgeId.replace("comfort", "luxury")));
  assert.equal(n1(lux).cost, 2 * 96 + 54);
});

test("Arusha arrival hotel (shown) follows the tag with the most safari nights", () => {
  const t = trip(); t.stops[1].lodgeId = "central-serengeti-premium"; // 3 of 5 nights premium
  assert.match(line(quote(cfg, t, TODAY), /Night 1/)[0].label, /premium hotel/);
  const tie = trip({ totalNights: 3, stops: [{ areaId: "tarangire", nights: 1, lodgeId: "tarangire-budget" }, { areaId: "manyara", nights: 1, lodgeId: "manyara-luxury" }] });
  assert.match(line(quote(cfg, tie, TODAY), /Night 1/)[0].label, /luxury hotel/);
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
  for (const word of ["rates", "double", "adultDay", "concession", "vehicleDay", "guideDay", "marginPct", "adminPct", "craterFee", "price", "childPrice"]) assert.equal(s.includes(word), false, word);
});

test("public add-on rates include only the add-on admin fee, no margin", () => {
  const a = publicOptions(cfg).addons!;
  const k = 1 + cfg.settings.addonAdminPct / 100;
  const crater = cfg.addons!.find((x) => x.id === "crater")!, bf = cfg.addons!.find((x) => x.id === "bush-breakfast")!;
  assert.equal(a.find((x) => x.id === "crater")!.rate, Math.round(crater.price));
  assert.equal(a.find((x) => x.id === "bush-breakfast")!.rate, Math.round(bf.price * k));
  assert.equal(a.find((x) => x.id === "bush-breakfast")!.rateChild, Math.round(bf.childPrice * k));
});

test("add-ons get no margin and only the add-on admin fee", () => {
  const base = quote(cfg, trip(), TODAY);
  const withBf = quote(cfg, { ...trip(), addons: ["bush-breakfast"] }, TODAY);
  const cost = withBf.totals.extras - base.totals.extras;
  assert.equal(withBf.totals.margin, base.totals.margin);
  assert.equal(withBf.totals.addonFee, Math.round(cost * cfg.settings.addonAdminPct) / 100);
  assert.equal(Math.round((withBf.totals.total - base.totals.total) * 100), Math.round(cost * (1 + cfg.settings.addonAdminPct / 100) * 100));
  assert.equal(withBf.priced.extras, withBf.totals.extrasTotal);
});

test("lodge photos from the Accommodations folder are matched by name; admin photos win", async () => {
  const { lodgeImages } = await import("../src/planner/engine");
  for (const l of defaultConfig.lodges.filter((x) => x.category !== "budget")) assert.ok(lodgeImages(l).length > 0, l.name);
  assert.deepEqual(lodgeImages({ name: "Ngorongoro Crater Camp (A&K Sanctuary)", images: ["abc"] }), ["abc"]);
  assert.match(lodgeImages({ name: "Ang'ata Tarangire Camp" })[0], /^lodges\/ang-ata-tarangire-camp\/01\.webp$/);
});

test("a night at Ngorongoro always includes the crater game drive", () => {
  const withRim = quote(cfg, trip(), TODAY); // trip() has a Ngorongoro night
  assert.ok(withRim.lines.some((l) => /Crater game drive/.test(l.label)));
  const noRim = trip({ totalNights: 5, stops: [{ areaId: "tarangire", nights: 1, lodgeId: "tarangire-comfort" }, { areaId: "central-serengeti", nights: 3, lodgeId: "central-serengeti-comfort" }] });
  assert.ok(!quote(cfg, noRim, TODAY).lines.some((l) => /Crater game drive/.test(l.label)));
});
