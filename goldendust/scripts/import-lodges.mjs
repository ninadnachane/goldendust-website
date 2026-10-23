// Regenerates src/planner/lodges.data.json from the lodge Excel (Rates tab).
// Usage: node --import tsx scripts/import-lodges.mjs "List of Lodges and Camps.xlsx"
import { readSheet } from "read-excel-file/node";
import { writeFileSync } from "node:fs";
import { importLodges } from "../src/planner/lodgeImport.ts";
import { areas } from "../src/planner/defaults.ts";

const file = process.argv[2];
if (!file) { console.error("Give the path to the .xlsx file."); process.exit(1); }
const rows = await readSheet(file, "Rates");
const cfg = { areas, lodges: [], feeZones: [], settings: {}, arrival: { name: "Arusha", lodges: {} } };
const { lodges, report } = importLodges(cfg, rows);
writeFileSync(new URL("../src/planner/lodges.data.json", import.meta.url), JSON.stringify(lodges, null, 1) + "\n");
console.log(JSON.stringify({ ...report, added: report.added.length }, null, 1));
