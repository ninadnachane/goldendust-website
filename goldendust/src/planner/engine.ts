// Golden Dust Safaris — itinerary planner pricing engine.
// Shared by the Cloudflare Worker (guest quotes, admin test calculator).
// All money is in USD. Costs in the config are YOUR costs; the engine adds
// the admin markup (to everything except park fees) and then the margin.

export type Category = "budget" | "comfort" | "luxury";
export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "budget", name: "Budget", blurb: "Camping in the parks" },
  { id: "comfort", name: "Comfort", blurb: "Comfortable lodges and tented camps" },
  { id: "luxury", name: "Luxury", blurb: "Premium lodges and camps" },
];

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
};

export type SeasonRange = { from: string; to: string }; // "MM-DD", inclusive; may wrap the year end
export type Season = { id: string; name: string; ranges: SeasonRange[] };

export type FeeZone = {
  id: string; name: string;
  adultDay: number; childDay: number; // per person per day
  adultNight: number; childNight: number; // per person per night (concession/camping fee), 0 if none
};

export type Area = {
  id: string; name: string; feeZoneId: string;
  minNights: number;
  vehicleFee: number; vehicleFeeLabel: string; // once per visit, per vehicle (e.g. crater descent)
  active: boolean;
};

export type RoomRates = { single: number; double: number; triple: number; child: number }; // per room / per child, per night
export type Lodge = {
  id: string; name: string; areaId: string; category: Category; active: boolean;
  rates: Record<string, RoomRates>; // keyed by season id
};

export type Config = {
  settings: Settings;
  seasons: Season[];
  defaultSeasonId: string; // used for dates outside every range
  feeZones: FeeZone[];
  areas: Area[]; // in route order
  lodges: Lodge[];
  arrival: { name: string; lodges: Record<Category, string> }; // Arusha arrival night, lodge per category
};

export type QuoteRequest = {
  startDate: string; // YYYY-MM-DD, arrival day in Arusha
  adults: number;
  childAges: number[];
  category: Category;
  totalNights: number; // incl. the Arusha arrival night
  stops: { areaId: string; nights: number; lodgeId: string }[];
};

export type Group = "park" | "transport" | "accommodation" | "meals";
export type Line = { group: Group; label: string; calc: string; cost: number };
export type Quote = {
  ok: boolean;
  errors: string[];
  lines: Line[];
  people: { adults: number; children: number; infants: number; total: number; vehicles: number; guides: number };
  totals: {
    park: number; transport: number; accommodation: number; meals: number;
    others: number; adminFee: number; subtotal: number; margin: number; total: number; perPerson: number;
  };
  // What a guest sees: each category with admin fees baked in, margin shown separately.
  priced: { park: number; transport: number; accommodation: number; meals: number; margin: number; total: number };
};

const r2 = (n: number) => Math.round(n * 100) / 100;
export const money = (n: number) => "$" + r2(n).toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });

export function addDays(iso: string, days: number) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
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

export function validate(cfg: Config, q: QuoteRequest, today = new Date().toISOString().slice(0, 10)): string[] {
  const s = cfg.settings;
  const e: string[] = [];
  const earliest = addDays(today, s.leadDays + 1);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(q.startDate || "")) e.push("Choose your arrival date.");
  else if (q.startDate < earliest) e.push(`The earliest arrival date is ${earliest} (we need at least ${s.leadDays} days to arrange your safari).`);
  if (!(q.adults >= 1)) e.push("At least one adult must travel.");
  if (q.adults + q.childAges.length > s.maxGuests) e.push(`For more than ${s.maxGuests} guests, please message us directly.`);
  if (q.childAges.some((a) => !(a >= 0 && a <= s.childMaxAge))) e.push(`Children's ages must be between 0 and ${s.childMaxAge}.`);
  if (!CATEGORIES.some((c) => c.id === q.category)) e.push("Choose Budget, Comfort or Luxury.");
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
    else if (lodge.areaId !== area.id || lodge.category !== q.category) e.push(`${lodge.name} isn't a ${q.category} option in ${area.name}.`);
  }
  const minNeeded = q.stops.reduce((a, st) => a + (cfg.areas.find((x) => x.id === st.areaId)?.minNights ?? 1), 0);
  if (q.stops.length && minNeeded > safariNights)
    e.push(`These areas need at least ${minNeeded + 1} nights in total (${minNeeded} on safari + 1 in Arusha). Add nights or remove an area.`);
  else if (q.stops.length && used !== safariNights)
    e.push(`You have ${safariNights} safari night${safariNights === 1 ? "" : "s"} to share out (plus your first night in Arusha) and ${used} assigned.`);
  if (!cfg.lodges.find((l) => l.id === cfg.arrival.lodges[q.category] && l.active)) e.push("The Arusha arrival hotel isn't set up for this category.");
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
  const blank = { park: 0, transport: 0, accommodation: 0, meals: 0, others: 0, adminFee: 0, subtotal: 0, margin: 0, total: 0, perPerson: 0 };
  if (errors.length) return { ok: false, errors, lines, people, totals: blank, priced: { park: 0, transport: 0, accommodation: 0, meals: 0, margin: 0, total: 0 } };

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
  stayAt(cfg.arrival.lodges[q.category], 0, `Night 1 ${cfg.arrival.name}`);

  let night = 1;
  for (const st of q.stops) {
    const area = cfg.areas.find((a) => a.id === st.areaId)!;
    const zone = cfg.feeZones.find((z) => z.id === area.feeZoneId);
    for (let k = 0; k < st.nights; k++) { stayAt(st.lodgeId, night, `Night ${night + 1} ${area.name}`); night++; }
    if (zone) {
      const dayCost = adults * zone.adultDay + children * zone.childDay;
      lines.push({ group: "park", label: `${zone.name} entry: ${area.name}, ${st.nights} day${st.nights > 1 ? "s" : ""}`,
        calc: `(${adults} × ${money(zone.adultDay)}${children ? ` + ${children} × ${money(zone.childDay)}` : ""}) × ${st.nights} day${st.nights > 1 ? "s" : ""}`, cost: r2(dayCost * st.nights) });
      const nightCost = adults * zone.adultNight + children * zone.childNight;
      if (nightCost > 0) lines.push({ group: "park", label: `${zone.name} night fee: ${area.name}, ${st.nights} night${st.nights > 1 ? "s" : ""}`,
        calc: `(${adults} × ${money(zone.adultNight)}${children ? ` + ${children} × ${money(zone.childNight)}` : ""}) × ${st.nights} night${st.nights > 1 ? "s" : ""}`, cost: r2(nightCost * st.nights) });
    } else errors.push(`${area.name} has no park fee zone.`);
    if (area.vehicleFee > 0) lines.push({ group: "park", label: `${area.vehicleFeeLabel || "Vehicle fee"}: ${area.name}`,
      calc: `${vehicles} vehicle${vehicles > 1 ? "s" : ""} × ${money(area.vehicleFee)}`, cost: r2(vehicles * area.vehicleFee) });
  }

  const safariNights = q.totalNights - 1;
  const days = safariNights + s.vehicleDaysExtra;
  lines.push({ group: "transport", label: `Safari vehicle, ${days} days`, calc: `${vehicles} × ${money(s.vehicleDay)} × ${days} days (${safariNights} safari nights + ${s.vehicleDaysExtra})`, cost: r2(vehicles * s.vehicleDay * days) });
  lines.push({ group: "transport", label: `Guide, ${days} days`, calc: `${vehicles} × ${money(s.guideDay)} × ${days} days`, cost: r2(vehicles * s.guideDay * days) });
  lines.push({ group: "meals", label: "First-day lunch", calc: `${adults} × ${money(s.firstLunchAdult)}${children ? ` + ${children} × ${money(s.firstLunchChild)}` : ""}`, cost: r2(adults * s.firstLunchAdult + children * s.firstLunchChild) });

  const sum = (g: Group) => r2(lines.filter((l) => l.group === g).reduce((a, l) => a + l.cost, 0));
  const park = sum("park"), transport = sum("transport"), accommodation = sum("accommodation"), meals = sum("meals");
  const others = r2(transport + accommodation + meals);
  const adminFee = r2(others * s.adminPct / 100);
  const subtotal = r2(park + others + adminFee);
  const margin = r2(subtotal * s.marginPct / 100);
  const grand = r2(subtotal + margin);
  const k = 1 + s.adminPct / 100;
  const priced = { park, transport: r2(transport * k), accommodation: r2(accommodation * k), meals: r2(meals * k), margin, total: grand };
  // keep the guest categories adding up exactly to the total
  priced.accommodation = r2(grand - priced.park - priced.transport - priced.meals - priced.margin);
  return {
    ok: errors.length === 0, errors, lines, people,
    totals: { park, transport, accommodation, meals, others, adminFee, subtotal, margin, total: grand, perPerson: r2(grand / Math.max(1, adults + children)) },
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
    areas: cfg.areas.filter((a) => a.active).map((a) => ({ id: a.id, name: a.name, minNights: a.minNights })),
    lodges: cfg.lodges.filter((l) => l.active && cfg.areas.some((a) => a.id === l.areaId)).map((l) => ({ id: l.id, name: l.name, areaId: l.areaId, category: l.category })),
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
  cfg.areas.forEach((a) => { if (!cfg.feeZones.some((z) => z.id === a.feeZoneId)) e.push(`Area "${a.name}" points to a missing fee zone.`); });
  cfg.lodges.forEach((l) => {
    if (l.areaId !== "arusha" && !cfg.areas.some((a) => a.id === l.areaId)) e.push(`Lodge "${l.name}" points to a missing area.`);
    if (!CATEGORIES.some((c) => c.id === l.category)) e.push(`Lodge "${l.name}" has an unknown category.`);
  });
  CATEGORIES.forEach((c) => { if (!cfg.lodges.some((l) => l.id === cfg.arrival.lodges[c.id])) e.push(`No Arusha arrival hotel set for ${c.name}.`); });
  return e;
}
