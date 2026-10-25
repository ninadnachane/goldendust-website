// Turns the "Rates" tab of the lodge Excel (List of Lodges and Camps.xlsx) into planner lodges.
// Used by /admin → Lodges & camps → Import Excel, and by scripts/import-lodges.mjs for the built-in defaults.
//
// Rules agreed with Ninad:
//  - only rows with "Rates Verified" = Yes are used;
//  - Arusha is left out for now (the arrival night isn't priced until its hotels are verified);
//  - the year in Start/End Date is ignored: a period is a stretch of the year that repeats every year;
//  - "Min. Child Age" is kept for reference only (every lodge is offered to every group).
import { CATEGORIES, inRange, type Category, type Config, type Lodge, type RatePeriod } from "./engine";

export type ImportReport = {
  lodges: number; periods: number;
  skippedUnverified: number; skippedArusha: number;
  unknownAreas: string[]; removed: string[]; deactivated: string[]; added: string[];
  warnings: string[];
};

const AREA_ALIASES: Record<string, string> = {
  tarangire: "tarangire", manyara: "manyara", "lake manyara": "manyara", karatu: "karatu", ngorongoro: "ngorongoro",
  "central serengeti": "central-serengeti", "western serengeti": "west-serengeti", "west serengeti": "west-serengeti",
  "northern serengeti": "north-serengeti", "north serengeti": "north-serengeti",
  "southern serengeti": "south-serengeti", "south serengeti": "south-serengeti", ndutu: "ndutu", arusha: "arusha",
};

const norm = (v: unknown) => String(v ?? "").trim().toLowerCase().replace(/\s+/g, " ");
export const slug = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-");
const r4 = (n: number) => Math.round(n * 10000) / 10000;
const pad = (n: number) => String(n).padStart(2, "0");

// Excel cell → "MM-DD" (year ignored). Accepts Date objects, ISO-like strings and Excel serial numbers.
export function monthDay(v: unknown): string | null {
  if (v instanceof Date && !isNaN(+v)) return `${pad(v.getUTCMonth() + 1)}-${pad(v.getUTCDate())}`;
  if (typeof v === "number" && v > 59) { const d = new Date(Math.round((v - 25569) * 86400000)); return `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`; }
  const m = String(v ?? "").trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})/) ?? String(v ?? "").trim().match(/^(\d{1,2})[/.](\d{1,2})[/.](\d{2,4})$/);
  if (!m) return null;
  return m[1].length === 4 ? `${pad(+m[2])}-${pad(+m[3])}` : `${pad(+m[2])}-${pad(+m[1])}`; // dd/mm/yyyy
}
const num = (v: unknown) => { const n = typeof v === "number" ? v : Number(String(v ?? "").replace(/[$,\s]/g, "")); return isFinite(n) ? n : NaN; };

export function importLodges(cfg: Config, rows: unknown[][]): { lodges: Lodge[]; report: ImportReport } {
  const report: ImportReport = { lodges: 0, periods: 0, skippedUnverified: 0, skippedArusha: 0, unknownAreas: [], removed: [], deactivated: [], added: [], warnings: [] };
  const hi = rows.findIndex((r) => r.some((c) => norm(c) === "lodge") && r.some((c) => norm(c) === "start date"));
  if (hi < 0) throw new Error('Couldn\'t find the header row (with "Lodge" and "Start Date") in the Rates tab.');
  const head = rows[hi].map(norm);
  const col = (...names: string[]) => { const i = head.findIndex((h) => names.includes(h)); return i; };
  const C = {
    lodge: col("lodge"), area: col("area"), category: col("category"), season: col("season"),
    from: col("start date"), to: col("end date"), single: col("single"), double: col("double"), triple: col("triple"), child: col("child"),
    verified: col("rates verified", "verified"), minAge: col("min. child age", "min child age"),
  };
  for (const [k, i] of Object.entries(C)) if (i < 0 && k !== "minAge" && k !== "season") throw new Error(`The Rates tab has no "${k}" column.`);

  type Draft = { name: string; areaId: string; category: Category; periods: RatePeriod[]; minChildAge?: number };
  const drafts = new Map<string, Draft>();
  const unknown = new Set<string>();
  for (const r of rows.slice(hi + 1)) {
    const name = String(r[C.lodge] ?? "").trim();
    if (!name) continue;
    if (norm(r[C.verified]) !== "yes") { report.skippedUnverified++; continue; }
    const areaTxt = norm(r[C.area]);
    const areaId = AREA_ALIASES[areaTxt] ?? cfg.areas.find((a) => norm(a.name) === areaTxt || a.id === areaTxt)?.id;
    if (areaId === "arusha") { report.skippedArusha++; continue; }
    if (!areaId || !cfg.areas.some((a) => a.id === areaId)) { unknown.add(String(r[C.area] ?? "(empty)")); continue; }
    const cat = norm(r[C.category]) as Category;
    if (!CATEGORIES.some((c) => c.id === cat)) { report.warnings.push(`${name}: unknown category "${r[C.category]}", row skipped.`); continue; }
    const from = monthDay(r[C.from]);
    let to = monthDay(r[C.to]);
    if (to === "02-28") to = "02-29"; // a period ending 28 Feb also covers 29 Feb in leap years
    if (!from || !to) { report.warnings.push(`${name}: a row has no valid start/end date, skipped.`); continue; }
    const single = num(r[C.single]), double = num(r[C.double]), triple = num(r[C.triple]), child = num(r[C.child]);
    if (!(single > 0) || !(double > 0)) { report.warnings.push(`${name} (${from} to ${to}): single/double rate missing, row skipped.`); continue; }
    const key = norm(name);
    const d = drafts.get(key) ?? { name, areaId, category: cat, periods: [] };
    if (d.areaId !== areaId) report.warnings.push(`${name} is listed in two areas; using ${d.areaId}.`);
    d.periods.push({ season: String(C.season >= 0 ? r[C.season] ?? "" : "").trim() || "Rate", from, to, single: r4(single), double: r4(double), triple: r4(triple > 0 ? triple : 0), child: r4(child > 0 ? child : 0) });
    const age = C.minAge >= 0 ? parseInt(String(r[C.minAge] ?? ""), 10) : NaN;
    if (age > 0) d.minChildAge = Math.max(d.minChildAge ?? 0, age);
    drafts.set(key, d);
  }
  report.unknownAreas = [...unknown];

  // merge with what's already in admin: keep id, photos, description, inside-park and on/off
  const byName = new Map(cfg.lodges.map((l) => [norm(l.name), l]));
  const used = new Set(cfg.lodges.map((l) => l.id));
  const out: Lodge[] = [];
  for (const d of drafts.values()) {
    const old = byName.get(norm(d.name));
    const side = cfg.areas.find((a) => a.id === d.areaId)?.side;
    let id = old?.id;
    if (!id) { id = slug(d.name) || "lodge"; let k = 2; const base = id; while (used.has(id)) id = `${base}-${k++}`; used.add(id); report.added.push(d.name); }
    out.push({
      id, name: d.name, areaId: d.areaId, category: d.category, active: old?.active ?? true,
      periods: d.periods, ...(d.minChildAge ? { minChildAge: d.minChildAge } : {}),
      insidePark: old?.insidePark ?? true, // agreed: assume inside the park unless ticked off in admin
      ...(old?.description ? { description: old.description } : {}), ...(old?.images?.length ? { images: old.images } : {}),
    });
    report.periods += d.periods.length;
    // overlaps and gaps (year ignored)
    const days: string[] = [];
    for (let t = Date.UTC(2028, 0, 1); t < Date.UTC(2029, 0, 1); t += 86400000) { const x = new Date(t); days.push(`${pad(x.getUTCMonth() + 1)}-${pad(x.getUTCDate())}`); }
    const hits = days.map((md) => d.periods.filter((p) => inRange(md, p)).length);
    if (hits.some((h) => h > 1)) report.warnings.push(`${d.name}: some periods overlap; the first matching row is used.`);
    const gaps: string[] = [];
    for (let i = 0; i < days.length; i++) if (!hits[i] && (i === 0 || hits[i - 1])) { let j = i; while (j + 1 < days.length && !hits[j + 1]) j++; gaps.push(`${days[i]} to ${days[j]}`); }
    if (gaps.length) report.warnings.push(`${d.name}: no rate for ${gaps.join(", ")} (MM-DD), so it isn't offered on those dates.`);
  }
  // lodges no longer in the Excel: Arusha hotels stay; others with photos or text are switched off, the rest removed
  for (const l of cfg.lodges) {
    if (out.some((o) => o.id === l.id)) continue;
    if (l.areaId === "arusha") { out.push(l); continue; }
    if (l.images?.length || l.description) { out.push({ ...l, active: false }); report.deactivated.push(l.name); }
    else report.removed.push(l.name);
  }
  report.lodges = drafts.size;
  return { lodges: out, report };
}
