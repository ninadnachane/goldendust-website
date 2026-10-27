// Golden Dust Safaris — itinerary planner pricing engine.
// Shared by the Cloudflare Worker (guest quotes, admin test calculator).
// All money is in USD. Costs in the config are YOUR costs; the engine adds
// the admin markup (to everything except park fees) and then the margin.
//
// Park fee rules (all fees entered incl. VAT, peak-season rates):
//  1. Entry fee per person for each day (= night) in a park area.
//  2. Overnight: Budget camp → public campsite fee; other lodge inside the park → concession fee; outside → nothing.
//  3. NCA transit: each drive between east (Arusha, Tarangire, Manyara) and west (Serengeti) without a night in
//     the Ngorongoro Conservation Area = one NCA entry day (going and coming back on different days = 2).
//  4. Add-ons (crater drive, bush breakfast, balloon …): price per person / vehicle / booking from Costs & rules.
//     The crater add-on also adds one NCA day if the trip isn't in the NCA anyway.
//  5. Vehicle entry fee per vehicle for each park day.

// Every lodge/camp carries one of these tags. Guests don't pick a style: they see all options with their tag.
export type Category = "budget" | "comfort" | "premium" | "luxury";
export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "budget", name: "Budget", blurb: "Tents in public campsites, shared washrooms" },
  { id: "comfort", name: "Comfort", blurb: "Comfortable lodges and tented camps" },
  { id: "premium", name: "Premium", blurb: "Upmarket lodges and camps in the best spots" },
  { id: "luxury", name: "Luxury", blurb: "The finest lodges and camps" },
];
const RANK: Record<Category, number> = { budget: 0, comfort: 1, premium: 2, luxury: 3 };

// The trip's overall style = the tag with the most safari nights (a tie goes to the higher tag).
// Used for the Arusha arrival hotel and the "Style" line on the PDF.
export function tripCategory(lodges: { id: string; category: Category }[], stops: { lodgeId: string; nights: number }[]): Category {
  const nights: Partial<Record<Category, number>> = {};
  for (const st of stops) { const l = lodges.find((x) => x.id === st.lodgeId); if (l) nights[l.category] = (nights[l.category] || 0) + (st.nights || 0); }
  const best = (Object.keys(nights) as Category[]).sort((a, b) => (nights[b]! - nights[a]!) || RANK[b] - RANK[a])[0];
  return best ?? "comfort";
}
export function tripCategories(lodges: { id: string; category: Category }[], stops: { lodgeId: string }[]): Category[] {
  const set = new Set<Category>();
  for (const st of stops) { const l = lodges.find((x) => x.id === st.lodgeId); if (l) set.add(l.category); }
  return [...set].sort((a, b) => RANK[a] - RANK[b]);
}

export type Settings = {
  guideDay: number; // per guide per day
  vehicleDay: number; // per vehicle per day
  maxPerVehicle: number; // guests per vehicle (incl. children)
  vehicleDaysExtra: number; // vehicle/guide days = safari nights + this
  firstLunchAdult: number; // first-day lunch, per adult
  firstLunchChild: number; // first-day lunch, per child (5-15)
  adminPct: number; // added to everything except park fees
  marginPct: number; // added to the total after admin fees
  leadDays: number; // guests cannot start within this many days
  childMinAge: number; // under this age = infant (free)
  childMaxAge: number; // above this age = adult
  minTotalNights: number;
  maxTotalNights: number;
  maxGuests: number;
  craterFee: number; // Ngorongoro Crater descent, per vehicle, incl. VAT
  airportTransfer: number; // airport pick-up and drop-off, per booking
  arushaNightAdult: number; // Arusha arrival night: fixed rate per adult (whatever the hotel)
  arushaNightChild: number; // … and per child (5–15)
  addonAdminPct: number; // admin fee % on add-ons (park-fee add-ons excluded); add-ons get no margin
  ncaZoneId: string; // which park fee zone is the Ngorongoro Conservation Area (for transit days)
};

export type SeasonRange = { from: string; to: string }; // "MM-DD", inclusive; may wrap the year end
export type Season = { id: string; name: string; ranges: SeasonRange[] }; // old global seasons, upgraded into lodge periods

// All park fees are entered INCLUDING VAT, at peak-season rates (no park-fee seasons).
export type FeeZone = {
  id: string; name: string;
  adultDay: number; childDay: number; // entry / conservation fee, per person per day
  concessionAdult: number; concessionChild: number; // per person per night, only for lodges/camps INSIDE the park
  campAdult: number; campChild: number; // public campsite fee per person per night (Budget trips)
  vehicleDay: number; // vehicle entry, per vehicle per day in the park
  adultNight?: number; childNight?: number; // old field names, upgraded automatically
};

// Where an area sits on the road from Arusha: driving between "east" and "west" crosses the Ngorongoro Conservation Area.
export type Side = "east" | "nca" | "west";

export type Area = {
  id: string; name: string; feeZoneId: string;
  side: Side;
  minNights: number;
  active: boolean;
  vehicleFee?: number; vehicleFeeLabel?: string; // old fields (crater fee now lives in settings), ignored
  blurb?: string; // one line for the itinerary PDF, e.g. "Game drives in Tarangire, known for elephants and baobabs"
};

// Text printed on the itinerary PDF (edited in /admin → Costs & rules).
export type DocText = { included: string[]; excluded: string[]; payment: string; notes: string[] };

export type RoomRates = { single: number; double: number; triple: number; child: number }; // old shape: per room / per child, per night
// A lodge's rate for a stretch of the year (from the Excel "Rates" tab). The year is ignored: "MM-DD" to "MM-DD",
// inclusive, may wrap the year end. USD per person per night, full board; double/triple = per person sharing.
export type RatePeriod = { season: string; from: string; to: string; single: number; double: number; triple: number; child: number };
export type Lodge = {
  id: string; name: string; areaId: string; category: Category; active: boolean;
  periods: RatePeriod[]; // dates without a period → the lodge isn't offered for those dates
  minChildAge?: number; // e.g. 6 → not offered when a child under 6 travels
  rates?: Record<string, RoomRates>; // old shape (per room, keyed by season id), upgraded into periods
  insidePark?: boolean; // true → park concession fee per person per night (Comfort/Luxury)
  description?: string; // one or two lines shown to guests
  images?: string[]; // image ids uploaded in /admin, served from /media/<id>
};

export type Config = {
  settings: Settings;
  seasons?: Season[]; // old, upgraded into lodge periods
  defaultSeasonId?: string;
  feeZones: FeeZone[];
  areas: Area[]; // in route order
  lodges: Lodge[];
  arrival: { name: string; lodges: Record<Category, string> }; // Arusha arrival night, hotel per category ("" = not priced yet)
  doc?: DocText;
  addons?: Addon[];
};

// Optional extras guests can tick (Costs & rules → Add-ons). Prices incl. VAT.
// per: "person" (adults + children 5–15; under-5s free), "vehicle" or "booking".
// parkFee: true → counted as a park fee (no admin fee), e.g. the crater descent; false → extra with the 10% admin fee.
// id "crater" is special: it also adds one Ngorongoro area day if the trip isn't in the NCA anyway.
export type Addon = { id: string; name: string; blurb: string; per: "person" | "vehicle" | "booking"; price: number; childPrice: number; parkFee: boolean; active: boolean };

export type QuoteRequest = {
  startDate: string; // YYYY-MM-DD, arrival day in Arusha
  adults: number;
  childAges: number[];
  category?: Category; // old requests only; the style now comes from the chosen lodges
  totalNights: number; // incl. the Arusha arrival night
  stops: { areaId: string; nights: number; lodgeId: string }[];
  crater?: boolean; // old requests: Ngorongoro Crater as a yes/no (now the "crater" add-on)
  addons?: string[]; // ids of chosen add-ons (Costs & rules → Add-ons)
};

export type Group = "park" | "transport" | "accommodation" | "meals" | "extras";
export type Line = { group: Group; label: string; calc: string; cost: number };
export type Quote = {
  ok: boolean;
  errors: string[];
  lines: Line[];
  people: { adults: number; children: number; infants: number; total: number; vehicles: number; guides: number };
  totals: {
    park: number; transport: number; accommodation: number; meals: number; extras: number; addonFee: number; extrasTotal: number;
    others: number; adminFee: number; subtotal: number; margin: number; total: number; perPerson: number;
  };
  // What a guest sees: each category with admin fees baked in, margin shown separately.
  priced: { park: number; transport: number; accommodation: number; meals: number; extras: number; margin: number; total: number };
};

// Lodge photos from the Accommodations folder (public/images/lodges, see scripts/import-photos.py),
// keyed by normalised lodge name. Photos uploaded in /admin take priority.
import lodgePhotos from "./lodgePhotos.json";
export const nameKey = (s: string) => s.toLowerCase().normalize("NFKD").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
export const lodgeImages = (l: { name: string; images?: string[] }): string[] =>
  l.images?.length ? l.images : ((lodgePhotos as Record<string, string[]>)[nameKey(l.name)] ?? []);
// Image id → URL: uploaded photos live in /media, folder photos are static files under /images.
export const imageUrl = (id: string) => (id.includes("/") ? `/images/${id}` : `/media/${id}`);

const r2 = (n: number) => Math.round(n * 100) / 100;
export const money = (n: number) => "$" + r2(n).toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });

export function addDays(iso: string, days: number) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// Brings older saved rate data up to the current shape (new fields get safe defaults).
export function upgradeConfig(cfg: Config): Config {
  const c: Config = JSON.parse(JSON.stringify(cfg));
  c.feeZones = c.feeZones.map((z) => ({
    ...z,
    concessionAdult: z.concessionAdult ?? z.adultNight ?? 0, concessionChild: z.concessionChild ?? z.childNight ?? 0,
    campAdult: z.campAdult ?? 0, campChild: z.campChild ?? 0, vehicleDay: z.vehicleDay ?? 0,
  }));
  c.areas = c.areas.map((a) => ({ ...a, side: a.side ?? (/seren/i.test(a.feeZoneId) ? "west" : /nca|ngoro/i.test(a.feeZoneId) ? "nca" : "east") }));
  // old global seasons + per-room rates → per-lodge periods, per person
  const seasons = c.seasons ?? [];
  c.lodges = c.lodges.map((l) => {
    const periods = l.periods ?? seasons.flatMap((se) => {
      const rt = l.rates?.[se.id];
      if (!rt) return [];
      const ranges = se.ranges.length ? se.ranges : se.id === c.defaultSeasonId ? [{ from: "01-01", to: "12-31" }] : [];
      return ranges.map((r) => ({ season: se.name, from: r.from, to: r.to, single: rt.single, double: rt.double / 2, triple: rt.triple / 3, child: rt.child }));
    });
    const { rates: _old, ...rest } = l;
    return { ...rest, periods, insidePark: l.insidePark ?? l.areaId !== "arusha" };
  });
  delete c.seasons; delete c.defaultSeasonId;
  for (const [after, area] of [["ngorongoro", { id: "karatu", side: "east", blurb: "A night in Karatu, in the highlands just outside the Ngorongoro Conservation Area.", name: "Karatu", feeZoneId: "", minNights: 1, active: true }],
    ["central-serengeti", { id: "west-serengeti", side: "west", blurb: "Game drives in the western Serengeti.", name: "Western Serengeti", feeZoneId: c.feeZones.find((z) => /seren/i.test(z.id))?.id ?? "", minNights: 1, active: true }]] as [string, Area][]) {
    if (c.areas.some((a) => a.id === area.id)) continue;
    const i = c.areas.findIndex((a) => a.id === after);
    c.areas.splice(i < 0 ? c.areas.length : i + 1, 0, area);
  }
  c.arrival = { ...c.arrival, lodges: { ...c.arrival.lodges, premium: c.arrival.lodges.premium ?? c.arrival.lodges.luxury ?? c.arrival.lodges.comfort } };
  const legacyCrater = Math.max(0, ...c.areas.map((a) => a.vehicleFee || 0));
  c.addons = c.addons ?? [
    { id: "crater", name: "Ngorongoro Crater game drive", blurb: "A half day on the crater floor, usually on the way back to Arusha. One of the best places in Tanzania to see rhino.", per: "vehicle", price: c.settings.craterFee || legacyCrater || 295, childPrice: 0, parkFee: true, active: true },
  ];
  c.settings = { ...c.settings, craterFee: c.settings.craterFee ?? legacyCrater, airportTransfer: c.settings.airportTransfer ?? 80, addonAdminPct: c.settings.addonAdminPct ?? 2, arushaNightAdult: c.settings.arushaNightAdult ?? 0, arushaNightChild: c.settings.arushaNightChild ?? 0, ncaZoneId: c.settings.ncaZoneId ?? (c.feeZones.find((z) => /nca|ngoro/i.test(z.id))?.id || "") };
  return c;
}

// "MM-DD" inside an inclusive range that may wrap the year end (e.g. 12-10 to 03-31).
export const inRange = (md: string, r: { from: string; to: string }) => (r.from <= r.to ? md >= r.from && md <= r.to : md >= r.from || md <= r.to);
export function periodFor(lodge: { periods?: RatePeriod[] }, iso: string): RatePeriod | undefined {
  const md = iso.slice(5);
  return (lodge.periods || []).find((p) => inRange(md, p));
}
// Night dates of each stop (night 1 = arrival in Arusha, so the first stop starts on the second night).
export function stopNights(startDate: string, stops: { nights: number }[]): string[][] {
  let n = 1;
  return stops.map((s) => Array.from({ length: Math.max(0, s.nights || 0) }, () => addDays(startDate, n++)));
}
// Why a lodge can't be offered for these nights and children ("" = fine). Shared with the planner page,
// which only knows the open date ranges (no rates).
export function lodgeProblem(lodge: { name: string; minChildAge?: number; periods?: { from: string; to: string }[]; open?: { from: string; to: string }[] }, nights: string[], childAges: number[]): string {
  // minChildAge is kept from the Excel for reference only: every lodge is offered to every group (agreed 25 Oct 2026).
  const ranges = lodge.periods ?? lodge.open ?? [];
  const miss = nights.find((d) => !ranges.some((r) => inRange(d.slice(5), r)));
  return miss ? `${lodge.name} has no rate for the night of ${miss}.` : "";
}

// Cheapest mix of single / double / triple rooms for n adults (rates here are per room: see perRoom).
export function roomPlan(n: number, rt: RoomRates) {
  const opts = [
    { size: 1, rate: rt.single, name: "single" },
    { size: 2, rate: rt.double, name: "double" },
    { size: 3, rate: rt.triple, name: "triple" },
  ].filter((o) => o.rate > 0);
  const best: { cost: number; rooms: Record<string, number> }[] = [{ cost: 0, rooms: {} }];
  for (let i = 1; i <= n; i++) {
    let pick: { cost: number; rooms: Record<string, number> } | null = null;
    for (const o of opts) {
      // a room can hold fewer people than its size (e.g. 1 adult in a double)
      const prev = best[Math.max(0, i - o.size)];
      if (!prev) continue;
      const cost = prev.cost + o.rate;
      if (!pick || cost < pick.cost) pick = { cost, rooms: { ...prev.rooms, [o.name]: (prev.rooms[o.name] ?? 0) + 1 } };
    }
    best[i] = pick ?? { cost: NaN, rooms: {} };
  }
  return best[n];
}

const perRoom = (p: RatePeriod): RoomRates => ({ single: p.single, double: p.double * 2, triple: p.triple * 3, child: p.child });
const SIZE: Record<string, number> = { single: 1, double: 2, triple: 3 };
const describeRooms = (rooms: Record<string, number>, p: RatePeriod) =>
  Object.entries(rooms).map(([k, v]) => `${v} ${k} (${v * SIZE[k]} × ${money(p[k as "single" | "double" | "triple"])} pp)`).join(" + ");

// A stay in the Ngorongoro (crater rim) area always includes the crater game drive.
export const CRATER_AREA = "ngorongoro";
export const craterIncluded = (stops: { areaId: string }[]) => stops.some((s) => s.areaId === CRATER_AREA);
export function chosenAddons(cfg: Config, q: QuoteRequest): Addon[] {
  const ids = new Set([...(q.addons || []), ...(q.crater || craterIncluded(q.stops || []) ? ["crater"] : [])]);
  return (cfg.addons || []).filter((a) => a.active && ids.has(a.id));
}

export function validate(cfg: Config, q: QuoteRequest, today = new Date().toISOString().slice(0, 10)): string[] {
  const s = cfg.settings;
  const e: string[] = [];
  const earliest = addDays(today, s.leadDays + 1);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(q.startDate || "")) e.push("Choose your arrival date.");
  else if (q.startDate < earliest) e.push(`The earliest arrival date is ${earliest} (we need at least ${s.leadDays} days to arrange your safari).`);
  if (!(q.adults >= 1)) e.push("At least one adult must travel.");
  if (q.adults + q.childAges.length > s.maxGuests) e.push(`For more than ${s.maxGuests} guests, please message us directly.`);
  if (q.childAges.some((a) => !(a >= 0 && a <= s.childMaxAge))) e.push(`Children's ages must be between 0 and ${s.childMaxAge}.`);
  if (!(q.totalNights >= s.minTotalNights && q.totalNights <= s.maxTotalNights))
    e.push(`Choose between ${s.minTotalNights} and ${s.maxTotalNights} nights.`);
  if (!q.stops.length) e.push("Choose at least one area to visit.");
  const safariNights = q.totalNights - 1;
  const used = q.stops.reduce((a, st) => a + (st.nights || 0), 0);
  const seen = new Set<string>();
  const nightsOf = /^\d{4}-\d{2}-\d{2}$/.test(q.startDate || "") ? stopNights(q.startDate, q.stops) : q.stops.map(() => []);
  for (const [si, st] of q.stops.entries()) {
    const area = cfg.areas.find((a) => a.id === st.areaId && a.active);
    if (!area) { e.push("One of the chosen areas is no longer available."); continue; }
    if (seen.has(area.id)) e.push(`${area.name} is listed twice.`);
    seen.add(area.id);
    if (!(st.nights >= area.minNights)) e.push(`${area.name} needs at least ${area.minNights} night${area.minNights > 1 ? "s" : ""}.`);
    const lodge = cfg.lodges.find((l) => l.id === st.lodgeId && l.active);
    if (!lodge) e.push(`Choose where to stay in ${area.name}.`);
    else if (lodge.areaId !== area.id) e.push(`${lodge.name} isn't in ${area.name}.`);
    else { const why = lodgeProblem(lodge, nightsOf[si], q.childAges); if (why) e.push(`${why} Choose another place to stay in ${area.name}.`); }
  }
  const minNeeded = q.stops.reduce((a, st) => a + (cfg.areas.find((x) => x.id === st.areaId)?.minNights ?? 1), 0);
  if (q.stops.length && minNeeded > safariNights)
    e.push(`These areas need at least ${minNeeded + 1} nights in total (${minNeeded} on safari + 1 in Arusha). Add nights or remove an area.`);
  else if (q.stops.length && used !== safariNights)
    e.push(`You have ${safariNights} safari night${safariNights === 1 ? "" : "s"} to share out (plus your first night in Arusha) and ${used} assigned.`);
  if (chosenAddons(cfg, q).some((a) => a.id === "crater") && !cfg.feeZones.some((z) => z.id === cfg.settings.ncaZoneId)) e.push("The Ngorongoro Crater isn't available right now.");
  return e;
}

export function quote(cfg: Config, q: QuoteRequest, today?: string): Quote {
  const s = cfg.settings;
  const errors = validate(cfg, q, today);
  const children = q.childAges.filter((a) => a >= s.childMinAge && a <= s.childMaxAge).length;
  const infants = q.childAges.filter((a) => a < s.childMinAge).length;
  const adults = q.adults;
  const total = adults + children + infants;
  const vehicles = Math.max(1, Math.ceil(total / s.maxPerVehicle));
  const people = { adults, children, infants, total, vehicles, guides: vehicles };
  const lines: Line[] = [];
  const blank = { park: 0, transport: 0, accommodation: 0, meals: 0, extras: 0, addonFee: 0, extrasTotal: 0, others: 0, adminFee: 0, subtotal: 0, margin: 0, total: 0, perPerson: 0 };
  if (errors.length) return { ok: false, errors, lines, people, totals: blank, priced: { park: 0, transport: 0, accommodation: 0, meals: 0, extras: 0, margin: 0, total: 0 } };

  // Accommodation, night by night
  const stayAt = (lodgeId: string, nightIndex: number, label: string) => {
    const lodge = cfg.lodges.find((l) => l.id === lodgeId)!;
    const date = addDays(q.startDate, nightIndex);
    const p = periodFor(lodge, date);
    if (!p) { errors.push(`${lodge.name} has no rate for the night of ${date}.`); return; }
    const plan = roomPlan(adults, perRoom(p));
    const cost = plan.cost + children * p.child;
    const parts = [describeRooms(plan.rooms, p) || "no rate set"];
    if (children) parts.push(`${children} child × ${money(p.child)}`);
    lines.push({ group: "accommodation", label: `${label}: ${lodge.name} (${date}, ${p.season})`, calc: parts.join(" + "), cost: r2(cost) });
    if (!(plan.cost > 0)) errors.push(`${lodge.name} has no ${p.season} rate.`);
  };
  // Arusha arrival night: a fixed rate per person (Costs & rules), whichever hotel is used.
  const arrivalLodge = cfg.lodges.find((l) => l.id === cfg.arrival.lodges[tripCategory(cfg.lodges, q.stops)] && l.active);
  const aA = s.arushaNightAdult ?? 0, aC = s.arushaNightChild ?? 0;
  lines.push({ group: "accommodation", label: `Night 1 ${cfg.arrival.name}: ${arrivalLodge?.name ?? "hotel"} (fixed rate)`, calc: `${adults} × ${money(aA)}${children ? ` + ${children} × ${money(aC)}` : ""}`, cost: r2(adults * aA + children * aC) });

  // ---- park fees (all incl. VAT, peak-season rates)
  const pp = (adult: number, child: number) => adults * adult + children * child;
  const ppCalc = (adult: number, child: number) => `${adults} × ${money(adult)}${children ? ` + ${children} × ${money(child)}` : ""}`;
  const times = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;
  const nca = cfg.feeZones.find((z) => z.id === s.ncaZoneId);
  let night = 1;
  for (const st of q.stops) {
    const area = cfg.areas.find((a) => a.id === st.areaId)!;
    const zone = cfg.feeZones.find((z) => z.id === area.feeZoneId);
    const lodge = cfg.lodges.find((l) => l.id === st.lodgeId);
    for (let k = 0; k < st.nights; k++) { stayAt(st.lodgeId, night, `Night ${night + 1} ${area.name}`); night++; }
    if (!zone) { if (area.feeZoneId) errors.push(`${area.name} has no park fee zone.`); continue; } // "" = outside the parks (e.g. Karatu)
    const n = st.nights;
    // Rule 1: entry fee for each day in the park
    lines.push({ group: "park", label: `${zone.name} entry: ${area.name}, ${times(n, "day")}`, calc: `(${ppCalc(zone.adultDay, zone.childDay)}) × ${times(n, "day")}`, cost: r2(pp(zone.adultDay, zone.childDay) * n) });
    // Rule 2: overnight fee — Budget → public campsite; lodge inside the park → concession; otherwise none
    if (lodge?.category === "budget") {
      if (pp(zone.campAdult, zone.campChild) > 0) lines.push({ group: "park", label: `${zone.name} public campsite: ${area.name}, ${times(n, "night")}`, calc: `(${ppCalc(zone.campAdult, zone.campChild)}) × ${times(n, "night")}`, cost: r2(pp(zone.campAdult, zone.campChild) * n) });
    } else if (lodge?.insidePark) {
      if (pp(zone.concessionAdult, zone.concessionChild) > 0) lines.push({ group: "park", label: `${zone.name} concession (lodge inside the park): ${area.name}, ${times(n, "night")}`, calc: `(${ppCalc(zone.concessionAdult, zone.concessionChild)}) × ${times(n, "night")}`, cost: r2(pp(zone.concessionAdult, zone.concessionChild) * n) });
    }
    // Rule 5: vehicle entry for each day in the park
    if (zone.vehicleDay > 0) lines.push({ group: "park", label: `${zone.name} vehicle entry: ${area.name}, ${times(n, "day")}`, calc: `${vehicles} vehicle${vehicles > 1 ? "s" : ""} × ${money(zone.vehicleDay)} × ${times(n, "day")}`, cost: r2(vehicles * zone.vehicleDay * n) });
  }
  // Rule 3: Ngorongoro Conservation Area transit — one NCA day for each drive between east and west without a night in the NCA
  const sides: Side[] = ["east", ...q.stops.map((st) => cfg.areas.find((a) => a.id === st.areaId)?.side ?? "east"), "east"];
  let crossings = 0;
  for (let i = 1; i < sides.length; i++) if ((sides[i - 1] === "east" && sides[i] === "west") || (sides[i - 1] === "west" && sides[i] === "east")) crossings++;
  const ncaDay = (label: string, days: number, group: Group = "park") => {
    if (!nca || days < 1) return;
    lines.push({ group, label: `${nca.name} ${label}, ${times(days, "day")}`, calc: `(${ppCalc(nca.adultDay, nca.childDay)}) × ${times(days, "day")}`, cost: r2(pp(nca.adultDay, nca.childDay) * days) });
    if (nca.vehicleDay > 0) lines.push({ group, label: `${nca.name} vehicle entry (${label}), ${times(days, "day")}`, calc: `${vehicles} vehicle${vehicles > 1 ? "s" : ""} × ${money(nca.vehicleDay)} × ${times(days, "day")}`, cost: r2(vehicles * nca.vehicleDay * days) });
  };
  ncaDay("transit", crossings);
  // Rule 4: add-ons. No margin; the add-on admin fee applies unless the add-on is a park fee.
  // The crater also needs an NCA entry day if the trip isn't in the NCA anyway (counted with the add-on).
  let addonFeeBase = 0;
  for (const ad of chosenAddons(cfg, q)) {
    if (ad.id === "crater" && !(crossings > 0 || sides.includes("nca"))) ncaDay("entry for the crater day", 1, "extras");
    const group: Group = "extras";
    const n0 = lines.length;
    if (ad.per === "person") lines.push({ group, label: ad.name, calc: ppCalc(ad.price, ad.childPrice), cost: r2(pp(ad.price, ad.childPrice)) });
    else if (ad.per === "vehicle") lines.push({ group, label: ad.name, calc: `${vehicles} vehicle${vehicles > 1 ? "s" : ""} × ${money(ad.price)}`, cost: r2(vehicles * ad.price) });
    else lines.push({ group, label: ad.name, calc: `${money(ad.price)} per booking`, cost: r2(ad.price) });
    if (!ad.parkFee) addonFeeBase += lines.slice(n0).reduce((a, l) => a + l.cost, 0);
  }

  const safariNights = q.totalNights - 1;
  const days = safariNights + s.vehicleDaysExtra;
  lines.push({ group: "transport", label: `Safari vehicle, ${days} days`, calc: `${vehicles} × ${money(s.vehicleDay)} × ${days} days (${safariNights} safari nights + ${s.vehicleDaysExtra})`, cost: r2(vehicles * s.vehicleDay * days) });
  lines.push({ group: "transport", label: `Guide, ${days} days`, calc: `${vehicles} × ${money(s.guideDay)} × ${days} days`, cost: r2(vehicles * s.guideDay * days) });
  if ((s.airportTransfer ?? 0) > 0) lines.push({ group: "transport", label: "Airport pick-up and drop-off", calc: `${money(s.airportTransfer)} per booking`, cost: r2(s.airportTransfer) });
  lines.push({ group: "meals", label: "First-day lunch", calc: `${adults} × ${money(s.firstLunchAdult)}${children ? ` + ${children} × ${money(s.firstLunchChild)}` : ""}`, cost: r2(adults * s.firstLunchAdult + children * s.firstLunchChild) });

  const sum = (g: Group) => r2(lines.filter((l) => l.group === g).reduce((a, l) => a + l.cost, 0));
  const park = sum("park"), transport = sum("transport"), accommodation = sum("accommodation"), meals = sum("meals"), extras = sum("extras");
  const others = r2(transport + accommodation + meals);
  const adminFee = r2(others * s.adminPct / 100);
  const subtotal = r2(park + others + adminFee);
  const margin = r2(subtotal * s.marginPct / 100);
  const addonFee = r2(addonFeeBase * (s.addonAdminPct ?? 2) / 100);
  const extrasTotal = r2(extras + addonFee);
  const grand = r2(subtotal + margin + extrasTotal);
  const k = 1 + s.adminPct / 100;
  const priced = { park, transport: r2(transport * k), accommodation: r2(accommodation * k), meals: r2(meals * k), extras: extrasTotal, margin, total: grand };
  // keep the guest categories adding up exactly to the total
  priced.accommodation = r2(grand - priced.park - priced.transport - priced.meals - priced.extras - priced.margin);
  return {
    ok: errors.length === 0, errors, lines, people,
    totals: { park, transport, accommodation, meals, extras, addonFee, extrasTotal, others, adminFee, subtotal, margin, total: grand, perPerson: r2(grand / Math.max(1, adults + children)) },
    priced,
  };
}

// What guests may see: names, areas, categories and rules. No rates.
export function publicOptions(cfg: Config) {
  return {
    settings: {
      leadDays: cfg.settings.leadDays, childMinAge: cfg.settings.childMinAge, childMaxAge: cfg.settings.childMaxAge,
      minTotalNights: cfg.settings.minTotalNights, maxTotalNights: cfg.settings.maxTotalNights, maxGuests: cfg.settings.maxGuests,
    },
    categories: CATEGORIES,
    arrivalName: cfg.arrival.name,
    arrivalLodges: Object.fromEntries(CATEGORIES.map((c) => {
      const l = cfg.lodges.find((x) => x.id === cfg.arrival.lodges[c.id]);
      return [c.id, l ? { name: l.name, description: l.description || "", images: lodgeImages(l).slice(0, 6) } : null];
    })),
    arrivalPriced: true, // the arrival night is always in the price (fixed Arusha rate)
    areas: cfg.areas.filter((a) => a.active && cfg.lodges.some((l) => l.active && l.areaId === a.id)).map((a) => ({ id: a.id, name: a.name, minNights: a.minNights, blurb: a.blurb || "" })),
    addons: (cfg.addons || []).filter((a) => a.active && (a.id !== "crater" || cfg.feeZones.some((z) => z.id === cfg.settings.ncaZoneId))).map((a) => {
      // guest-facing rate: incl. admin fee (unless a park fee) and margin, rounded to the dollar
      const k = a.parkFee ? 1 : 1 + (cfg.settings.addonAdminPct ?? 2) / 100;
      return { id: a.id, name: a.name, blurb: a.blurb, per: a.per, rate: Math.round(a.price * k), rateChild: Math.round(a.childPrice * k) };
    }),
    doc: cfg.doc ?? null,
    lodges: cfg.lodges.filter((l) => l.active && cfg.areas.some((a) => a.id === l.areaId)).map((l) => ({ id: l.id, name: l.name, areaId: l.areaId, category: l.category, description: l.description || "", images: lodgeImages(l).slice(0, 12), minChildAge: l.minChildAge || 0, open: (l.periods || []).map((p) => ({ from: p.from, to: p.to })) })),
  };
}

export function checkConfig(cfg: Config): string[] {
  const e: string[] = [];
  const ids = (xs: { id: string }[], what: string) => {
    const seen = new Set<string>();
    xs.forEach((x) => { if (!x.id) e.push(`A ${what} has no id.`); if (seen.has(x.id)) e.push(`Duplicate ${what} id "${x.id}".`); seen.add(x.id); });
  };
  if (!cfg || !cfg.settings) return ["Config is missing settings."];
  ids(cfg.feeZones, "fee zone"); ids(cfg.areas, "area"); ids(cfg.lodges, "lodge");
  cfg.areas.forEach((a) => {
    if (a.feeZoneId && !cfg.feeZones.some((z) => z.id === a.feeZoneId)) e.push(`Area "${a.name}" points to a missing fee zone.`);
    if (!["east", "nca", "west"].includes(a.side)) e.push(`Area "${a.name}" needs a side (east, NCA or west).`);
  });
  if (cfg.settings.ncaZoneId && !cfg.feeZones.some((z) => z.id === cfg.settings.ncaZoneId)) e.push("The Ngorongoro (NCA) fee zone in Costs & rules doesn't exist.");
  cfg.lodges.forEach((l) => {
    if (l.areaId !== "arusha" && !cfg.areas.some((a) => a.id === l.areaId)) e.push(`Lodge "${l.name}" points to a missing area.`);
    if (!CATEGORIES.some((c) => c.id === l.category)) e.push(`Lodge "${l.name}" has an unknown category.`);
    (l.periods || []).forEach((p) => { if (!/^\d{2}-\d{2}$/.test(p.from) || !/^\d{2}-\d{2}$/.test(p.to)) e.push(`Lodge "${l.name}" has a rate period that isn't MM-DD.`); });
  });
  return e;
}
