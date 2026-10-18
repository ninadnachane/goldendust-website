// Broken link check on the built site.
// Internal links (pages, images, files) must exist — a missing one stops the deploy.
// External links are fetched; a definite "not found" (404/410) or a dead domain stops the deploy.
// Sites that block robots or time out are reported as warnings only, so they don't block updates by accident.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(DIST);
const html = files.filter((f) => f.endsWith(".html"));

const redirects = existsSync("public/_redirects")
  ? readFileSync("public/_redirects", "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).map((l) => l.split(/\s+/)[0])
  : [];
const isRedirect = (p) => redirects.some((r) => (r.endsWith("*") ? p.startsWith(r.slice(0, -1)) : p === r));
const DYNAMIC = ["/api/", "/media/", "/cdn-cgi/"];
function exists(path) {
  const p = decodeURI(path.split(/[?#]/)[0]);
  if (DYNAMIC.some((d) => p.startsWith(d))) return true;
  if (p === "/" || p === "") return existsSync(join(DIST, "index.html"));
  const base = join(DIST, p);
  return existsSync(base) && statSync(base).isFile() || existsSync(base + ".html") || existsSync(join(base, "index.html")) || isRedirect(p);
}

const internal = new Map(); // link -> pages
const external = new Map();
for (const f of html) {
  const page = "/" + relative(DIST, f).replace(/\\/g, "/").replace(/(index)?\.html$/, "");
  const src = readFileSync(f, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const tags = src.match(/<(a|link|img|script|source|iframe)\b[^>]*>/gi) || [];
  for (const tag of tags) {
    if (/rel="(preconnect|dns-prefetch)"/i.test(tag)) continue;
    const urls = [];
    for (const m of tag.matchAll(/\b(?:href|src)="([^"]+)"/gi)) urls.push(m[1]);
    const ss = tag.match(/\bsrcset="([^"]+)"/i);
    if (ss) ss[1].split(",").forEach((x) => urls.push(x.trim().split(/\s+/)[0]));
    for (const raw of urls) {
      const u = raw.replace(/&amp;/g, "&");
      if (/^(mailto:|tel:|javascript:|data:|#)/i.test(u) || u.includes("${")) continue;
      if (/^https?:\/\//i.test(u) || u.startsWith("//")) {
        const full = u.startsWith("//") ? "https:" + u : u;
        if (/goldendustsafaris\.com/i.test(new URL(full).hostname)) { const p = new URL(full).pathname; (internal.get(p) || internal.set(p, new Set()).get(p)).add(page); continue; }
        (external.get(full) || external.set(full, new Set()).get(full)).add(page);
      } else {
        const p = u.startsWith("/") ? u : new URL(u, "https://x" + page).pathname;
        (internal.get(p) || internal.set(p, new Set()).get(p)).add(page);
      }
    }
  }
}

const fails = [], warns = [];
for (const [link, pages] of internal) if (!exists(link)) fails.push(`${link}  (on ${[...pages].slice(0, 3).join(", ")})`);

async function check(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const r = await fetch(url, { redirect: "follow", signal: ctrl.signal, headers: { "user-agent": "Mozilla/5.0 (link check; goldendustsafaris.com)" } });
    return { status: r.status };
  } catch (e) {
    const code = e?.cause?.code || e?.name || String(e);
    return { error: code };
  } finally { clearTimeout(t); }
}
const SKIP = [/^https:\/\/fonts\.(googleapis|gstatic)\.com\/?$/];
const ext = [...external.keys()].filter((u) => !SKIP.some((r) => r.test(u)));
let reachable = 0;
const results = await Promise.all(ext.map(async (u) => [u, await check(u)]));
const offline = results.length > 0 && results.every(([, r]) => r.error);
if (offline) warns.push("No internet access during this check, so external links weren't tested.");
for (const [u, r] of offline ? [] : results) {
  const on = [...external.get(u)].slice(0, 2).join(", ");
  if (r.status && r.status < 400) reachable++;
  if (r.status === 404 || r.status === 410) fails.push(`${u}  → ${r.status} not found  (on ${on})`);
  else if (r.error === "ENOTFOUND") fails.push(`${u}  → domain doesn't exist  (on ${on})`);
  else if (r.error || r.status >= 400) warns.push(`${u}  → ${r.error || r.status} (couldn't confirm; not blocking)`);
}

console.log(`Checked ${internal.size} internal and ${ext.length} external links (${reachable} external reachable).`);
if (warns.length) console.log("Warnings:\n- " + warns.join("\n- "));
if (fails.length) { console.error("Broken links:\n- " + fails.join("\n- ")); process.exit(1); }
console.log("No broken links.");
