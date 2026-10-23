// A fixed sample config for the pricing tests, so they don't change when the real lodge Excel is re-imported.
// Same park fees, settings and add-ons as the defaults, with sample lodges in every area (incl. Arusha hotels),
// rated per person per night in two periods: Green (04-01 to 05-31) and High (06-01 to 03-31).
import type { Category, Config, Lodge } from "../src/planner/engine";
import { defaultConfig } from "../src/planner/defaults";

type R = { single: number; double: number; triple: number; child: number }; // per room, as the old samples were
const base: Record<Category, R> = {
  budget: { single: 60, double: 80, triple: 110, child: 25 },
  comfort: { single: 250, double: 320, triple: 430, child: 90 },
  premium: { single: 450, double: 580, triple: 800, child: 160 },
  luxury: { single: 700, double: 900, triple: 1250, child: 250 },
};
const scale = (r: R, k: number): R => ({ single: Math.round(r.single * k), double: Math.round(r.double * k), triple: Math.round(r.triple * k), child: Math.round(r.child * k) });
const pp = (season: string, from: string, to: string, r: R) => ({ season, from, to, single: r.single, double: r.double / 2, triple: r.triple / 3, child: r.child });
const periods = (r: R, hi: number, lo: number) => [pp("Green season", "04-01", "05-31", scale(r, lo)), pp("High season", "06-01", "03-31", scale(r, hi))];
const cats: Category[] = ["budget", "comfort", "premium", "luxury"];
const catName: Record<Category, string> = { budget: "camp", comfort: "comfort lodge", premium: "premium lodge", luxury: "luxury lodge" };

const lodges: Lodge[] = [];
for (const a of defaultConfig.areas) for (const c of cats)
  lodges.push({ id: `${a.id}-${c}`, name: `Sample ${catName[c]} (${a.name})`, areaId: a.id, category: c, active: true, insidePark: c !== "budget" && a.feeZoneId !== "", periods: periods(base[c], 1.3, 0.75) });
for (const c of cats)
  lodges.push({ id: `arusha-${c}`, name: `Sample ${c} hotel (Arusha)`, areaId: "arusha", category: c, active: true, insidePark: false, periods: periods(base[c], 0.6, 0.45) });

export const sampleConfig: Config = {
  ...JSON.parse(JSON.stringify(defaultConfig)),
  lodges,
  settings: { ...defaultConfig.settings, arushaNightAdult: 96, arushaNightChild: 54 }, // = the old sample comfort hotel, high season
  arrival: { name: "Arusha", lodges: { budget: "arusha-budget", comfort: "arusha-comfort", premium: "arusha-premium", luxury: "arusha-luxury" } },
};
