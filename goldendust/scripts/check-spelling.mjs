// Spell check of the words visitors actually see: text from every built page (British + American English).
// Safari place names and other correct words go in cspell.json → "words".
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const DIST = "dist", TMP = ".spellcheck";
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(DIST);
rmSync(TMP, { recursive: true, force: true });
const ent = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', ndash: "–", mdash: "—", hellip: "…" };
for (const f of files.filter((x) => x.endsWith(".html"))) {
  const text = readFileSync(f, "utf8")
    .replace(/<(script|style|svg|noscript)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<meta\b[^>]*>/gi, (m) => /(name|property)="(description|og:title|og:description)"/i.test(m) ? " " + (m.match(/content="([^"]*)"/i)?.[1] ?? "") + " " : " ") // text shown in Google
    .replace(/<[^>]*\balt="([^"]*)"[^>]*>/gi, " $1 ")              // image alt text
    .replace(/<(br|p|div|li|h\d|tr|td|section|article|header|footer)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => e[0] === "#" ? String.fromCodePoint(e[1] === "x" ? parseInt(e.slice(2), 16) : +e.slice(1)) : ent[e] ?? " ")
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[ \t]+/g, " ");
  const out = join(TMP, relative(DIST, f).replace(/\.html$/, ".txt"));
  mkdirSync(join(out, ".."), { recursive: true });
  writeFileSync(out, text);
}
const r = spawnSync("npx", ["cspell", "--no-progress", "--no-summary", "--no-must-find-files", "--config", "cspell.json", `${TMP}/**/*.txt`], { encoding: "utf8" });
const out = (r.stdout || "") + (r.stderr || "");
rmSync(TMP, { recursive: true, force: true });
if (r.status !== 0) {
  const lines = out.trim().split("\n").filter(Boolean).map((l) => l.replace(TMP + "/", "/").replace(/\.txt:\d+:\d+/, ""));
  const words = [...new Set(lines.map((l) => l.match(/\(([^)]+)\)/)?.[1]).filter(Boolean))];
  console.error(`Possible spelling mistakes (${words.length}): ${words.join(", ")}\n` + lines.slice(0, 60).join("\n"));
  console.error('\nIf a word is spelled correctly (a place or brand name), add it to "words" in cspell.json.');
  process.exit(1);
}
console.log("Spelling check passed.");
