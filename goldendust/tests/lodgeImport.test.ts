// Excel import: only verified rows, no Arusha, year ignored, child age, keeps admin-only fields.
import { test } from "node:test";
import assert from "node:assert/strict";
import { importLodges, monthDay } from "../src/planner/lodgeImport";
import { sampleConfig } from "./fixture";

const head = ["Lodge", "Area", "Category", "Season", "Start Date", "End Date", "Single", "Double", "Triple", "Child", "Rate Type", "Updated", "Rates Verified", "Images in Folder", "Min. Child Age"];
const d = (s: string) => new Date(s + "T00:00:00Z");
const rows = [
  ["Lodge & Camp Rates"], [], head,
  ["Camp A", "Central Serengeti", "Comfort", "Green Season", d("2027-01-01"), d("2027-05-31"), 140, 110, 110, 55, "STO", null, "Yes", "No", null],
  ["Camp A", "Central Serengeti", "Comfort", "High Season", d("2027-06-01"), d("2027-12-31"), 160, 125, 125, 60, "STO", null, "Yes", "No", null],
  ["Lodge B", "Tarangire", "Luxury", "High Season", d("2026-12-10"), d("2027-03-31"), 400, 300, 280, 150, "STO", null, "Yes", "No", "6+"],
  ["Unverified C", "Tarangire", "Comfort", "High Season", d("2026-06-01"), d("2026-10-31"), 90, 60, 60, 40, "Unverified", null, "No", "No", null],
  ["Hotel D", "Arusha", "Comfort", "High Season", d("2026-06-01"), d("2026-10-31"), 90, 60, 60, 40, "STO", null, "Yes", "No", null],
  ["Camp E", "Mars", "Comfort", "High Season", d("2026-06-01"), d("2026-10-31"), 90, 60, 60, 40, "STO", null, "Yes", "No", null],
];

test("imports verified rows only, skips Arusha and unknown areas, ignores the year", () => {
  const cfg = JSON.parse(JSON.stringify(sampleConfig));
  const { lodges, report } = importLodges(cfg, rows);
  assert.equal(report.lodges, 2);
  assert.equal(report.skippedUnverified, 1);
  assert.equal(report.skippedArusha, 1);
  assert.deepEqual(report.unknownAreas, ["Mars"]);
  const a = lodges.find((l) => l.name === "Camp A")!;
  assert.deepEqual(a.periods.map((p) => [p.from, p.to]), [["01-01", "05-31"], ["06-01", "12-31"]]);
  assert.equal(a.insidePark, true, "Serengeti lodges default to inside the park");
  const b = lodges.find((l) => l.name === "Lodge B")!;
  assert.equal(b.minChildAge, 6);
  assert.deepEqual([b.periods[0].from, b.periods[0].to], ["12-10", "03-31"]);
  assert.match(report.warnings.join(" "), /Lodge B: no rate for 04-01 to 12-09/);
  // sample lodges (no photos/text) are removed, Arusha hotels kept
  assert.ok(lodges.some((l) => l.areaId === "arusha"));
  assert.ok(!lodges.some((l) => l.id === "tarangire-comfort"));
});

test("re-importing keeps id, photos, text and the inside-park tick", () => {
  const cfg = JSON.parse(JSON.stringify(sampleConfig));
  const first = importLodges(cfg, rows).lodges;
  const a = first.find((l) => l.name === "Camp A")!;
  a.images = ["img1"]; a.description = "Lovely"; a.insidePark = false;
  cfg.lodges = first;
  const again = importLodges(cfg, rows.filter((r) => r[0] !== "Lodge B")).lodges;
  const a2 = again.find((l) => l.name === "Camp A")!;
  assert.equal(a2.id, a.id); assert.deepEqual(a2.images, ["img1"]); assert.equal(a2.description, "Lovely"); assert.equal(a2.insidePark, false);
  assert.ok(!again.some((l) => l.name === "Lodge B"), "a lodge with no photos that's gone from the Excel is removed");
});

test("dates: Date, ISO text, dd/mm/yyyy and Excel serial numbers", () => {
  assert.equal(monthDay(d("2027-12-16")), "12-16");
  assert.equal(monthDay("2027-03-01"), "03-01");
  assert.equal(monthDay("15/06/2027"), "06-15");
  assert.equal(monthDay(46388), "01-01"); // 2027-01-01
});
