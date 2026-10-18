// Checks the built site before it can be deployed: key pages exist, private pages stay out of the sitemap,
// admin pages keep their scripts in files (needed for the strict security policy).
import { existsSync, readFileSync, readdirSync } from "node:fs";

const fails = [];
const must = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (f) => (existsSync(f) ? readFileSync(f, "utf8") : "");

for (const page of ["index", "about", "how-it-works", "blog", "planner", "admin", "admin/login", "itinerary", "404", "tanzania-safari-packages"])
  must(existsSync(`dist/${page}.html`), `missing page: /${page}`);
for (const f of readdirSync("src/content/blog").filter((x) => x.endsWith(".md")))
  must(existsSync(`dist/post/${f.replace(/\.md$/, "")}.html`), `missing blog post: ${f}`);

const home = read("dist/index.html");
must(home.includes("<h1"), "homepage has no headline");
must(home.includes("/planner"), "homepage doesn't link to the planner");

const sitemap = readdirSync("dist").filter((f) => f.startsWith("sitemap")).map((f) => read(`dist/${f}`)).join("");
must(sitemap.includes("goldendustsafaris.com"), "sitemap missing");
for (const p of ["/admin", "/planner", "/itinerary"]) must(!sitemap.includes(`goldendustsafaris.com${p}<`) && !sitemap.includes(`goldendustsafaris.com${p}.html`), `sitemap must not list ${p}`);

for (const p of ["admin", "admin/login"]) {
  const html = read(`dist/${p}.html`);
  must(!/<script(?![^>]*\bsrc=)[^>]*>/.test(html), `/${p} has an inline script (blocked by the admin security policy)`);
  must(html.includes('name="robots" content="noindex'), `/${p} must be noindex`);
}
must(existsSync("dist/_redirects"), "missing _redirects (old Wix links would break)");

if (fails.length) { console.error("Build checks failed:\n- " + fails.join("\n- ")); process.exit(1); }
console.log("Build checks passed.");
