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


// ---- languages: every English page has a Dutch, German and French copy that is really in that language ----
const LANGS = ["nl", "de", "fr"];
const walkHtml = (d, out = []) => { for (const f of readdirSync(d, { withFileTypes: true })) { const p = `${d}/${f.name}`; if (f.isDirectory()) { if (!(d === "dist" && LANGS.includes(f.name))) walkHtml(p, out); } else if (f.name.endsWith(".html")) out.push(p); } return out; };
const english = walkHtml("dist").map((f) => f.slice(5, -5)).filter((p) => !/^(admin|404|sitemap)/.test(p) && !LANGS.includes(p));
const langOfHtml = (html) => html.match(/<html[^>]*\blang="([a-z-]+)"/)?.[1];
for (const p of english) {
  const en = read(`dist/${p}.html`);
  must(langOfHtml(en) === "en", `/${p} should say lang="en"`);
  for (const l of LANGS) {
    const file = p === "index" ? `dist/${l}.html` : `dist/${l}/${p}.html`;
    if (!existsSync(file)) { must(false, `missing ${l} copy of /${p}`); continue; }
    const html = read(file);
    must(langOfHtml(html) === l, `/${l}/${p} should say lang="${l}"`);
    // links to other pages of the site must stay in the same language
    // (fine: the language menu, which carries hreflang, and images, files, the API and the admin)
    const real = [...html.matchAll(/href="(\/[^"]*)"(\s+hreflang=)?/g)].filter((m) => !m[2]).map((m) => m[1])
      .filter((h) => !h.startsWith(`/${l}/`) && h !== `/${l}` && !h.startsWith(`/${l}#`) && !/^\/(images|media|api|_astro|admin)\b/.test(h));
    must(real.length === 0, `/${l}/${p} links to English pages: ${[...new Set(real)].slice(0, 3).join(", ")}`);
    if (!/(planner|itinerary)$/.test(p)) {
      for (const x of ["en", ...LANGS]) must(html.includes(`hreflang="${x}"`), `/${l}/${p} has no hreflang link for ${x}`);
    }
  }
  if (!/(planner|itinerary)$/.test(p)) must(en.includes('hreflang="x-default"'), `/${p} has no x-default hreflang link`);
}
for (const l of LANGS) for (const t of ["Golden Dust Safaris"]) must(read(`dist/${l}.html`).includes(t), `/${l} home page looks empty`);
must(read("dist/nl.html").includes("Privésafari") || read("dist/nl.html").includes("privésafari"), "/nl home page isn't in Dutch");
must(read("dist/de.html").includes("Privatsafari"), "/de home page isn't in German");
must(read("dist/fr.html").includes("Safaris privés"), "/fr home page isn't in French");
for (const l of LANGS) for (const page of ["planner", "itinerary"]) must(!sitemap.includes(`goldendustsafaris.com/${l}/${page}<`), `sitemap must not list /${l}/${page}`);
must(/hreflang="nl"/.test(sitemap), "sitemap has no language links");

if (fails.length) { console.error("Build checks failed:\n- " + fails.join("\n- ")); process.exit(1); }
console.log("Build checks passed.");
