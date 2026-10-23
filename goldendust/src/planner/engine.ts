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
  addonAdminPct: number; // admin fee % on add-ons (park-fee add-ons excluded); add-ons get no margin
  ncaZoneId: string; // which park fee zone is the Ngorongoro Conservation Area (for transit days)
};

export type SeasonRange = { from: string; to: string }; // "MM-DD", inclusive; may wrap the year end
export type Season = { id: string; name: string; ranges: SeasonRange[] };

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

export type RoomRates = { single: number; double: number; triple: number; child: number }; // per room / per child, per night
export type Lodge = {
  id: string; name: string; areaId: string; category: Category; active: boolean;
  rates: Record<string, RoomRates>; // keyed by season id
  insidePark?: boolean; // true → park concession fee per person per night (Comfort/Luxury)
  description?: string; // one or two lines shown to guests
  images?: string[]; // image ids uploaded in /admin, served from /media/<id>
};

export type Config = {
  settings: Settings;
  seasons: Season[];
  defaultSeasonId: string; // used for dates outside every range
  feeZones: FeeZone[];
  areas: Area[]; // in route order
  lodges: Lodge[];
  arrival: { name: string; lodges: Record<Category, string> }; // Arusha arrival night, lodge per category
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
  c.lodges = c.lodges.map((l) => ({ ...l, insidePark: l.insidePark ?? l.areaId !== "arusha" }));
  c.arrival = { ...c.arrival, lodges: { ...c.arrival.lodges, premium: c.arrival.lodges.premium ?? c.arrival.lodges.luxury ?? c.arrival.lodges.comfort } };
  const legacyCrater = Math.max(0, ...c.areas.map((a) => a.vehicleFee || 0));
  c.addons = c.addons ?? [
    { id: "crater", name: "Ngorongoro Crater game drive", blurb: "A half day on the crater floor, usually on the way back to Arusha. One of the best places in Tanzania to see rhino.", per: "vehicle", price: c.settings.craterFee || legacyCrater || 295, childPrice: 0, parkFee: true, active: true },
  ];
  c.settings = { ...c.settings, craterFee: c.settings.craterFee ?? legacyCrater, airportTransfer: c.settings.airportTransfer ?? 80, addonAdminPct: c.settings.addonAdminPct ?? 2, ncaZoneId: c.settings.ncaZoneId ?? (c.feeZones.find((z) => /nca|ngoro/i.test(z.id))?.id || "") };
  return c;
}

export function seasonFor(cfg: Config, iso: string): Season {
  const md = iso.slice(5);
  for (const s of cfg.seasons) {
    for (const r of s.ranges) {
      const hit = r.from <= r.to ? md >= r.from && md <= r.to : md >= r.from || md <= r.to;
      if (hit) return s;
    }
  }
  return cfg.seasons.find((s) => s.id === cfg.defaultSeasonId) ?? cfg.seasons[0];
}

// Cheapest mix of single / double / triple rooms for n adults (rates are per room).
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

const describeRooms = (rooms: Record<string, number>, rt: RoomRates) =>
  Object.entries(rooms).map(([k, v]) => `${v} ${k} × ${money(rt[k as keyof RoomRates])}`).join(" + ");

export function chosenAddons(cfg: Config, q: QuoteRequest): Addon[] {
  const ids = new Set([...(q.addons || []), ...(q.crater ? ["crater"] : [])]);
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
  for (const st of q.stops) {
    const area = cfg.areas.find((a) => a.id === st.areaId && a.active);
    if (!area) { e.push("One of the chosen areas is no longer available."); continue; }
    if (seen.has(area.id)) e.push(`${area.name} is listed twice.`);
    seen.add(area.id);
    if (!(st.nights >= area.minNights)) e.push(`${area.name} needs at least ${area.minNights} night${area.minNights > 1 ? "s" : ""}.`);
    const lodge = cfg.lodges.find((l) => l.id === st.lodgeId && l.active);
    if (!lodge) e.push(`Choose where to stay in ${area.name}.`);
    else if (lodge.areaId !== area.id) e.push(`${lodge.name} isn't in ${area.name}.`);
  }
  const minNeeded = q.stops.reduce((a, st) => a + (cfg.areas.find((x) => x.id === st.areaId)?.minNights ?? 1), 0);
  if (q.stops.length && minNeeded > safariNights)
    e.push(`These areas need at least ${minNeeded + 1} nights in total (${minNeeded} on safari + 1 in Arusha). Add nights or remove an area.`);
  else if (q.stops.length && used !== safariNights)
    e.push(`You have ${safariNights} safari night${safariNights === 1 ? "" : "s"} to share out (plus your first night in Arusha) and ${used} assigned.`);
  if (q.stops.length && !cfg.lodges.find((l) => l.id === cfg.arrival.lodges[tripCategory(cfg.lodges, q.stops)] && l.active)) e.push("The Arusha arrival hotel isn't set up for this style.");
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
    const season = seasonFor(cfg, date);
    const rt = lodge.rates[season.id] ?? { single: 0, double: 0, triple: 0, child: 0 };
    const plan = roomPlan(adults, rt);
    const childCost = children * rt.child;
    const cost = plan.cost + childCost;
    const parts = [describeRooms(plan.rooms, rt) || "no room rate set"];
    if (children) parts.push(`${children} child × ${money(rt.child)}`);
    lines.push({ group: "accommodation", label: `${label}: ${lodge.name} (${date}, ${season.name})`, calc: parts.join(" + "), cost: r2(cost) });
    if (!(plan.cost > 0)) errors.push(`${lodge.name} has no ${season.name} room rates.`);
  };
  stayAt(cfg.arrival.lodges[tripCategory(cfg.lodges, q.stops)], 0, `Night 1 ${cfg.arrival.name}`);

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
    if (!zone) { errors.push(`${area.name} has no park fee zone.`); continue; }
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
      return [c.id, l ? { name: l.name, description: l.description || "", images: (l.images || []).slice(0, 6) } : null];
    })),
    areas: cfg.areas.filter((a) => a.active).map((a) => ({ id: a.id, name: a.name, minNights: a.minNights, blurb: a.blurb || "" })),
    addons: (cfg.addons || []).filter((a) => a.active && (a.id !== "crater" || cfg.feeZones.some((z) => z.id === cfg.settings.ncaZoneId))).map((a) => {
      // guest-facing rate: incl. admin fee (unless a park fee) and margin, rounded to the dollar
      const k = a.parkFee ? 1 : 1 + (cfg.settings.addonAdminPct ?? 2) / 100;
      return { id: a.id, name: a.name, blurb: a.blurb, per: a.per, rate: Math.round(a.price * k), rateChild: Math.round(a.childPrice * k) };
    }),
    doc: cfg.doc ?? null,
    lodges: cfg.lodges.filter((l) => l.active && cfg.areas.some((a) => a.id === l.areaId)).map((l) => ({ id: l.id, name: l.name, areaId: l.areaId, category: l.category, description: l.description || "", images: (l.images || []).slice(0, 6) })),
  };
}

export function checkConfig(cfg: Config): string[] {
  const e: string[] = [];
  const ids = (xs: { id: string }[], what: string) => {
    const seen = new Set<string>();
    xs.forEach((x) => { if (!x.id) e.push(`A ${what} has no id.`); if (seen.has(x.id)) e.push(`Duplicate ${what} id "${x.id}".`); seen.add(x.id); });
  };
  if (!cfg || !cfg.settings) return ["Config is missing settings."];
  ids(cfg.seasons, "season"); ids(cfg.feeZones, "fee zone"); ids(cfg.areas, "area"); ids(cfg.lodges, "lodge");
  if (!cfg.seasons.some((s) => s.id === cfg.defaultSeasonId)) e.push("Default season doesn't exist.");
  cfg.seasons.forEach((s) => s.ranges.forEach((r) => { if (!/^\d{2}-\d{2}$/.test(r.from) || !/^\d{2}-\d{2}$/.test(r.to)) e.push(`Season "${s.name}" has a range that isn't MM-DD.`); }));
  cfg.areas.forEach((a) => {
    if (!cfg.feeZones.some((z) => z.id === a.feeZoneId)) e.push(`Area "${a.name}" points to a missing fee zone.`);
    if (!["east", "nca", "west"].includes(a.side)) e.push(`Area "${a.name}" needs a side (east, NCA or west).`);
  });
  if (cfg.settings.ncaZoneId && !cfg.feeZones.some((z) => z.id === cfg.settings.ncaZoneId)) e.push("The Ngorongoro (NCA) fee zone in Costs & rules doesn't exist.");
  cfg.lodges.forEach((l) => {
    if (l.areaId !== "arusha" && !cfg.areas.some((a) => a.id === l.areaId)) e.push(`Lodge "${l.name}" points to a missing area.`);
    if (!CATEGORIES.some((c) => c.id === l.category)) e.push(`Lodge "${l.name}" has an unknown category.`);
  });
  CATEGORIES.forEach((c) => { if (!cfg.lodges.some((l) => l.id === cfg.arrival.lodges[c.id])) e.push(`No Arusha arrival hotel set for ${c.name}.`); });
  return e;
}
