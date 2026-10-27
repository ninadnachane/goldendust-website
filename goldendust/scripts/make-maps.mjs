// Draws a route map for every sample safari into public/images/maps/<slug>.svg.
// Usage: node --import tsx scripts/make-maps.mjs
// The park outlines are simplified (approximate), drawn from rough coordinates, so the maps say "Map is approximate".
import { mkdirSync, writeFileSync } from "node:fs";
import { tours } from "../src/data/tours.ts";

const W = 800, H = 690, K = 220; // px per degree
const LON0 = 33.75, LAT0 = -1.35;
const xy = ([lon, lat]) => [Math.round((lon - LON0) * K * 10) / 10, Math.round((LAT0 - lat) * K * 10) / 10];
// closed smooth outline through the points (Catmull-Rom → Bézier), so parks don't look like polygons
const poly = (ll) => {
  const p = ll.map(xy), n = p.length, f = (v) => v.toFixed(1);
  let d = `M${p[0].join(" ")}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${p2.join(" ")}`;
  }
  return d + " Z";
};
const ellipse = (c, rx, ry, rot = 0) => { const [x, y] = xy(c); return `<ellipse cx="${x}" cy="${y}" rx="${rx * K}" ry="${ry * K}" transform="rotate(${rot} ${x} ${y})"/>`; };

// simplified outlines (lon, lat)
const parks = {
  serengeti: [[34.75, -1.5], [35.25, -1.55], [35.32, -2.1], [35.15, -2.6], [35.0, -2.95], [34.75, -3.25], [34.42, -3.1], [34.5, -2.7], [34.2, -2.42], [33.9, -2.28], [33.95, -2.05], [34.45, -2.03], [34.55, -1.8]],
  nca: [[35.2, -2.6], [35.75, -2.8], [35.95, -3.15], [35.75, -3.45], [35.4, -3.55], [35.0, -3.4], [34.8, -3.15], [34.95, -2.9]],
  manyara: [[35.72, -3.38], [35.86, -3.42], [35.9, -3.76], [35.8, -3.86], [35.74, -3.62]],
  tarangire: [[35.85, -3.85], [36.15, -3.8], [36.3, -4.1], [36.25, -4.5], [36.05, -4.6], [35.95, -4.3], [35.88, -4.05]],
};
const places = {
  "Arusha": [36.68, -3.37],
  "Tarangire": [36.02, -3.97],
  "Karatu": [35.67, -3.34],
  "Ngorongoro Crater": [35.58, -3.18],
  "Ngorongoro": [35.58, -3.18],
  "Serengeti": [34.83, -2.45],
  "Central Serengeti": [34.83, -2.45],
  "Western Serengeti": [34.25, -2.17],
};
const label = (t, p, dx = 0, dy = 0, cls = "pk") => { const [x, y] = xy(p); return `<text class="${cls}" x="${x + dx}" y="${y + dy}">${t}</text>`; };

function svg(t) {
  const stops = t.route.map((r) => places[r]).filter(Boolean);
  const pts = stops.map(xy);
  // smooth line through the stops (Catmull-Rom → Bézier)
  let d = `M${pts[0].join(" ")}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1.map((n) => n.toFixed(1)).join(" ")} ${c2.map((n) => n.toFixed(1)).join(" ")} ${p2.join(" ")}`;
  }
  const seen = new Map();
  const marks = t.route.slice(0, -1).map((r, i) => {
    const [x, y] = xy(places[r]); const key = `${x},${y}`;
    if (seen.has(key)) return ""; seen.set(key, i + 1);
    const left = x > 640;
    return `<g class="stop"><circle cx="${x}" cy="${y}" r="13"/><text class="num" x="${x}" y="${y + 4.5}">${i + 1}</text>
      <text class="sl" x="${x + (left ? -20 : 20)}" y="${y + 5}" text-anchor="${left ? "end" : "start"}">${r}</text></g>`;
  }).join("");
  const days = t.nights + 1;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Route map: ${t.route.join(" to ")}">
<style>
  text { font-family: Montserrat, "Helvetica Neue", Arial, sans-serif; }
  .pk { font-size: 15px; font-weight: 600; fill: #5f6b33; letter-spacing: 0.04em; text-anchor: middle; }
  .wt { font-size: 14px; font-style: italic; fill: #5b7f92; text-anchor: middle; }
  .ct { font-size: 13px; fill: #8a7b66; letter-spacing: 0.25em; text-anchor: middle; }
  .town { font-size: 13px; fill: #6b5d4b; }
  .sl { font-size: 17px; font-weight: 700; fill: #2e241b; paint-order: stroke; stroke: #faf7f0; stroke-width: 5px; stroke-linejoin: round; }
  .num { font-size: 13px; font-weight: 700; fill: #fff; text-anchor: middle; }
  .stop circle { fill: #c89a4b; stroke: #fff; stroke-width: 3; }
  .note { font-size: 12px; fill: #8a7b66; }
</style>
<rect width="${W}" height="${H}" fill="#faf7f0"/>
<path d="${poly([[33.0, -0.6], [33.95, -0.9], [33.88, -1.35], [33.98, -1.75], [33.82, -2.05], [33.86, -2.45], [33.72, -2.85], [33.55, -3.3], [33.0, -3.6]])}" fill="#d6e6ee"/>
<g fill="#d6e6ee">${ellipse([35.12, -3.62], 0.06, 0.22, 35)}${ellipse([36.02, -2.38], 0.07, 0.22, 10)}${ellipse([35.85, -3.62], 0.05, 0.19, 8)}</g>
<path d="M${xy([33.92, -1.0]).join(" ")} L${xy([37.6, -3.0]).join(" ")}" stroke="#b8a98f" stroke-width="2" stroke-dasharray="7 6" fill="none"/>
<g stroke-width="2" stroke-linejoin="round">
  <path d="${poly(parks.serengeti)}" fill="#e3e8cc" stroke="#b7c08a"/>
  <path d="${poly(parks.nca)}" fill="#ebeed8" stroke="#c4cba0"/>
  <path d="${poly(parks.tarangire)}" fill="#e3e8cc" stroke="#b7c08a"/>
  <path d="${poly(parks.manyara)}" fill="#e3e8cc" stroke="#b7c08a"/>
</g>
${(() => { const [x, y] = xy([35.58, -3.18]); return `<circle cx="${x}" cy="${y}" r="${0.1 * K}" fill="#dfe6c2" stroke="#a9b479" stroke-width="2"/>`; })()}
${label("SERENGETI", [34.62, -1.95])}${label("NATIONAL PARK", [34.62, -1.95], 0, 18)}
${label("NGORONGORO", [35.12, -3.27])}${label("CONSERVATION AREA", [35.12, -3.27], 0, 18)}
${label("TARANGIRE", [36.12, -4.3])}${label("LAKE MANYARA", [35.42, -3.8])}
${label("Lake Victoria", [33.85, -2.6], 20, 0, "wt")}${label("Lake Eyasi", [35.12, -3.62], -60, 30, "wt")}${label("Lake Natron", [36.02, -2.38], 60, 0, "wt")}
${label("K E N Y A", [36.4, -1.85], 0, 0, "ct")}${label("T A N Z A N I A", [36.75, -4.1], 0, 0, "ct")}
${(() => { const [x, y] = xy([37.07, -3.43]); return `<circle cx="${x}" cy="${y}" r="5" fill="#8a7b66"/><text class="town" x="${x - 8}" y="${y + 20}" text-anchor="middle">Kilimanjaro Airport</text>`; })()}
<path d="${d}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
<path d="${d}" fill="none" stroke="#c89a4b" stroke-width="4" stroke-dasharray="10 7" stroke-linecap="round" stroke-linejoin="round"/>
${marks}
<g transform="translate(24 24)">
  <rect width="170" height="40" rx="20" fill="#fff" stroke="#e5dccb"/>
  <text x="85" y="26" font-size="16" font-weight="600" fill="#2e241b" text-anchor="middle">${days} days · ${t.nights} nights</text>
</g>
<text class="note" x="${W - 16}" y="${H - 14}" text-anchor="end">Map is approximate · Golden Dust Safaris</text>
</svg>`;
}

const out = new URL("../public/images/maps/", import.meta.url);
mkdirSync(out, { recursive: true });
for (const t of tours) writeFileSync(new URL(`${t.slug}.svg`, out), svg(t));
console.log(`Wrote ${tours.length} maps.`);
