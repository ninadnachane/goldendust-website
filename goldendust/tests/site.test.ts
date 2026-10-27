// Website content and languages: catches missing translations, broken links inside the text,
// and translations that have drifted from the English they were made from.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { langOf, basePath, lp, localizeLinks, usdFor, OTHER_LANGS, LANGS } from "../src/i18n";
import { PLANNER_TEXT, ITIN_TEXT, AREA_TEXT, CATEGORY_TEXT, ADDON_TEXT, DOC_TEXT } from "../src/i18n/planner";
import { TIER_NAME } from "../src/i18n/common";
import { tours, toursFor, fromPrice, tourUrl } from "../src/data/tours";
import { TOURS_I18N } from "../src/data/i18n/tours";
import { parks, parksFor } from "../src/data/parks";
import { PARKS_I18N } from "../src/data/i18n/parks";
import { themes, themesFor } from "../src/data/themes";
import { THEMES_I18N } from "../src/data/i18n/themes";
import { lodges, lodgesWithPages, AREAS } from "../src/data/lodges";
import { faqs, faqsFor } from "../src/data/faqs";
import { defaultConfig } from "../src/planner/defaults";
import { CATEGORIES } from "../src/planner/engine";

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const asList = (v: unknown) => (Array.isArray(v) ? v : [v]) as string[];

// ---------- language helpers ----------
test("the language is read from the address, including the .html files Astro builds", () => {
  assert.equal(langOf("/"), "en");
  assert.equal(langOf("/about"), "en");
  assert.equal(langOf("/nl"), "nl");
  assert.equal(langOf("/nl.html"), "nl");
  assert.equal(langOf("/de/parks/karatu"), "de");
  assert.equal(langOf("/fr/post/x.html"), "fr");
  assert.equal(langOf("/nlx/about"), "en");
});

test("basePath strips the language and .html", () => {
  assert.equal(basePath("/nl.html"), "/");
  assert.equal(basePath("/nl/about.html"), "/about");
  assert.equal(basePath("/about"), "/about");
  assert.equal(basePath("/"), "/");
});

test("lp adds the language prefix to site links only", () => {
  assert.equal(lp("en", "/about"), "/about");
  assert.equal(lp("nl", "/"), "/nl");
  assert.equal(lp("nl", "/about"), "/nl/about");
  assert.equal(lp("de", "/#rv-h"), "/de#rv-h");
  for (const keep of ["/api/planner/quote", "/images/x.webp", "/media/abc", "https://wa.me/1", "#top"]) assert.equal(lp("fr", keep), keep);
});

test("localizeLinks rewrites links inside HTML", () => {
  assert.equal(localizeLinks("nl", '<a href="/planner">x</a> <a href="https://x.com">y</a>'), '<a href="/nl/planner">x</a> <a href="https://x.com">y</a>');
  assert.equal(localizeLinks("en", '<a href="/planner">x</a>'), '<a href="/planner">x</a>');
});

test("prices use each language's thousands separator", () => {
  assert.equal(usdFor("en", 1456), "$1,456");
  assert.equal(usdFor("nl", 1456), "$1.456");
  assert.equal(usdFor("de", 1456), "$1.456");
  assert.match(usdFor("fr", 1456), /^\$1\s1456$|^\$1 456$|^\$1 456$/);
});

// ---------- sample safaris ----------
test("every sample safari is translated, with the same days in the same order", () => {
  for (const lang of OTHER_LANGS) for (const t of tours) {
    const x = TOURS_I18N[lang][t.slug];
    assert.ok(x, `${lang}: ${t.slug} has no translation`);
    assert.equal(x.days.length, t.days.length, `${lang}: ${t.slug} has ${x.days.length} days, English has ${t.days.length}`);
    x.days.forEach((d, i) => {
      assert.ok(d.title && d.text, `${lang}: ${t.slug} day ${i + 1} is empty`);
      assert.equal(!!d.overnight, !!t.days[i].overnight, `${lang}: ${t.slug} day ${i + 1} overnight differs from English`);
    });
    assert.ok(x.description.includes("{from}"), `${lang}: ${t.slug} description should use {from} for the price`);
  }
});

test("translated safaris show the current lowest price, not a stale one", () => {
  for (const lang of OTHER_LANGS) for (const t of toursFor(lang)) {
    assert.ok(!t.description.includes("{from}"), `${lang}: ${t.slug} price placeholder not filled`);
    assert.ok(t.description.includes(usdFor(lang, fromPrice(t))), `${lang}: ${t.slug} description doesn't show ${usdFor(lang, fromPrice(t))}`);
  }
});

test("English sample safari descriptions match their prices", () => {
  for (const t of tours) assert.ok(t.description.includes(usdFor("en", fromPrice(t))), `${t.slug}: description says a different "from" price than ${usdFor("en", fromPrice(t))}`);
});

test("sample safari prices add up: total ≈ price per person × paying guests", () => {
  for (const t of tours) for (const s of ["high", "green"] as const) {
    const { pp, total } = t.prices[s];
    assert.ok(Math.abs(pp * t.paying - total) <= t.paying, `${t.slug} ${s}: ${pp} × ${t.paying} ≠ ${total}`);
  }
});

test("every sample safari has a route map in all four languages", () => {
  for (const t of tours) {
    assert.ok(existsSync(`public/images/maps/${t.slug}.svg`), `missing map ${t.slug}`);
    for (const lang of OTHER_LANGS) assert.ok(existsSync(`public/images/maps/${lang}/${t.slug}.svg`), `missing ${lang} map ${t.slug} (run scripts/make-maps.mjs)`);
  }
});

// ---------- park and safari-style pages ----------
test("every park and safari-style page is translated with the same structure", () => {
  for (const lang of OTHER_LANGS) {
    for (const p of parks) {
      const x = PARKS_I18N[lang][p.slug];
      assert.ok(x, `${lang}: park ${p.slug} missing`);
      assert.equal(x.sections.length, p.sections.length, `${lang}: ${p.slug} sections`);
      assert.equal(x.facts.length, p.facts.length, `${lang}: ${p.slug} facts`);
      assert.equal(x.faqs.length, p.faqs.length, `${lang}: ${p.slug} FAQs`);
    }
    for (const t of themes) {
      const x = THEMES_I18N[lang][t.slug];
      assert.ok(x, `${lang}: theme ${t.slug} missing`);
      assert.equal(x.sections.length, t.sections.length, `${lang}: ${t.slug} sections`);
      assert.equal(x.faqs.length, t.faqs.length, `${lang}: ${t.slug} FAQs`);
    }
  }
});

// every address the site builds, without a language prefix
const routes = new Set<string>([
  "/", "/about", "/how-it-works", "/meet-your-guide", "/blog", "/tanzania-safari-packages", "/parks", "/lodges", "/great-migration-serengeti", "/planner",
  ...tours.map(tourUrl), ...parks.map((p) => `/parks/${p.slug}`), ...themes.map((t) => `/safaris/${t.slug}`), ...lodgesWithPages.map((l) => `/lodges/${l.slug}`),
  ...readdirSync("src/content/blog").filter((f) => f.endsWith(".md")).map((f) => `/post/${f.replace(/\.md$/, "")}`),
]);
const linksIn = (html: string) => [...html.matchAll(/href="(\/[^"#]*)/g)].map((m) => m[1]);

test("links inside park and safari-style text point to real pages", () => {
  for (const lang of LANGS) {
    for (const p of [...parksFor(lang), ...themesFor(lang)])
      for (const s of p.sections) for (const para of s.p) for (const href of linksIn(para)) assert.ok(routes.has(href), `${lang} ${p.slug}: broken link ${href}`);
  }
});

test("safari-style pages each show at least one sample safari", () => {
  for (const t of themes) assert.ok(tours.some(t.tours), `${t.slug} matches no sample safari`);
});

// ---------- lodges ----------
test("lodge pages have unique addresses, a known area and photos", () => {
  const seen = new Set<string>();
  for (const l of lodgesWithPages) {
    assert.ok(!seen.has(l.slug), `duplicate lodge address ${l.slug}`); seen.add(l.slug);
    assert.ok(AREAS[l.area], `${l.name}: unknown area ${l.area}`);
    assert.ok(parks.some((p) => p.slug === AREAS[l.area].park), `${l.name}: area ${l.area} links to a missing park page`);
    assert.ok(TIER_NAME[l.tier], `${l.name}: unknown style ${l.tier}`);
    for (const ph of l.photos) assert.ok(existsSync(`public${ph}`), `${l.name}: missing photo ${ph}`);
  }
  assert.ok(lodgesWithPages.length >= 30, `only ${lodgesWithPages.length} lodge pages`);
  assert.ok(lodges.every((l) => l.area !== ("arusha" as never)), "Arusha hotels shouldn't get lodge pages");
});

// ---------- planner and PDF text ----------
for (const [name, table] of [["planner", PLANNER_TEXT], ["itinerary", ITIN_TEXT]] as const) {
  test(`${name} text exists in every language with the same placeholders`, () => {
    const en = table.en as Record<string, unknown>;
    for (const lang of OTHER_LANGS) {
      const t = table[lang] as Record<string, unknown>;
      for (const k of Object.keys(en)) {
        assert.ok(k in t, `${name} ${lang}: missing "${k}"`);
        const a = asList(en[k]), b = asList(t[k]);
        assert.equal(b.length, a.length, `${name} ${lang} "${k}": ${b.length} forms, English has ${a.length}`);
        a.forEach((s, i) => assert.equal(placeholders(b[i]), placeholders(s), `${name} ${lang} "${k}": placeholders differ`));
      }
    }
  });
}

test("planner translations of admin text still match the English in the default settings", () => {
  for (const a of defaultConfig.areas) {
    const tr = AREA_TEXT[a.id];
    assert.ok(tr, `area ${a.id} has no translation`);
    assert.equal(tr.name.en, a.name, `area ${a.id}: name changed, update AREA_TEXT`);
    if (tr.blurb) assert.equal(tr.blurb.en, a.blurb, `area ${a.id}: description changed, update AREA_TEXT`);
  }
  for (const c of CATEGORIES) {
    assert.equal(CATEGORY_TEXT[c.id]?.name.en, c.name, `style ${c.id}: name changed`);
    assert.equal(CATEGORY_TEXT[c.id]?.blurb.en, c.blurb, `style ${c.id}: description changed`);
  }
  for (const a of defaultConfig.addons ?? []) {
    const tr = ADDON_TEXT[a.id];
    assert.ok(tr, `add-on ${a.id} has no translation`);
    assert.equal(tr.name.en, a.name, `add-on ${a.id}: name changed, update ADDON_TEXT`);
  }
});

test("the PDF's included / not included text is translated for the default settings", () => {
  const doc = defaultConfig.doc;
  if (!doc) return;
  for (const line of [...doc.included, ...doc.excluded, doc.payment, ...doc.notes].filter(Boolean))
    assert.ok(DOC_TEXT[line], `no translation for PDF line: "${line.slice(0, 60)}…"`);
});

// ---------- blog ----------
const fm = (file: string) => {
  const s = readFileSync(file, "utf8");
  const head = s.split("---")[1];
  const get = (k: string) => head.match(new RegExp(`^${k}: (.*)$`, "m"))?.[1]?.trim() ?? "";
  const faqsN = (head.match(/"q":/g) ?? []).length;
  return { s, get, faqsN, body: s.split("---").slice(2).join("---") };
};

test("every blog post exists in Dutch, German and French with matching details", () => {
  for (const f of readdirSync("src/content/blog").filter((x) => x.endsWith(".md"))) {
    const en = fm(`src/content/blog/${f}`);
    for (const lang of OTHER_LANGS) {
      const path = `src/content/blog/${lang}/${f}`;
      assert.ok(existsSync(path), `missing ${lang} version of ${f}`);
      const x = fm(path);
      for (const k of ["pubDate", "image", "minutes"]) assert.equal(x.get(k), en.get(k), `${lang}/${f}: ${k} differs from English`);
      assert.equal(x.faqsN, en.faqsN, `${lang}/${f}: ${x.faqsN} FAQs, English has ${en.faqsN}`);
      assert.ok(x.get("title") !== en.get("title"), `${lang}/${f}: title not translated`);
    }
  }
});

test("translated blog posts link to pages in their own language, and those pages exist", () => {
  for (const lang of OTHER_LANGS) for (const f of readdirSync(`src/content/blog/${lang}`)) {
    const { body } = fm(`src/content/blog/${lang}/${f}`);
    for (const [, href] of body.matchAll(/\]\((\/[^)#\s]*)/g)) {
      assert.ok(href.startsWith(`/${lang}/`) || href === `/${lang}`, `${lang}/${f}: link ${href} goes to the English site`);
      const base = href.slice(lang.length + 1) || "/";
      assert.ok(routes.has(base), `${lang}/${f}: broken link ${href}`);
    }
  }
});

test("English blog posts only link to pages that exist", () => {
  for (const f of readdirSync("src/content/blog").filter((x) => x.endsWith(".md"))) {
    const { body } = fm(`src/content/blog/${f}`);
    for (const [, href] of body.matchAll(/\]\((\/[^)#\s]*)/g)) assert.ok(routes.has(href), `${f}: broken link ${href}`);
  }
});

test("general FAQs are translated", () => {
  for (const lang of OTHER_LANGS) assert.equal(faqsFor(lang).length, faqs.length, `${lang}: FAQ count`);
});
