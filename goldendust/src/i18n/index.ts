// Languages: English lives at the root (/about), the others under a prefix (/nl/about, /de/about, /fr/about).
// Every component works out the language from the page URL, so nothing needs to be passed down.
export const LANGS = ["en", "nl", "de", "fr"] as const;
export type Lang = (typeof LANGS)[number];
export const OTHER_LANGS = LANGS.filter((l) => l !== "en") as Exclude<Lang, "en">[];
export const LANG_NAMES: Record<Lang, string> = { en: "English", nl: "Nederlands", de: "Deutsch", fr: "Français" };
export const LOCALE: Record<Lang, string> = { en: "en-GB", nl: "nl-NL", de: "de-DE", fr: "fr-FR" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_GB", nl: "nl_NL", de: "de_DE", fr: "fr_FR" };

const isLang = (s: string): s is Lang => (LANGS as readonly string[]).includes(s);

export function langOf(url: URL | string): Lang {
  const p = (typeof url === "string" ? url : url.pathname).replace(/\.html$/, "");
  const seg = p.split("/")[1] ?? "";
  return isLang(seg) ? seg : "en";
}
/** Path without the language prefix and without ".html": "/nl/about.html" → "/about". */
export function basePath(url: URL | string): string {
  const p = (typeof url === "string" ? url : url.pathname).replace(/\.html$/, "").replace(/\/index$/, "/");
  const seg = p.split("/")[1] ?? "";
  const rest = isLang(seg) && seg !== "en" ? p.slice(seg.length + 1) : p;
  return rest === "" ? "/" : rest;
}
/** Path for a language: lp("nl", "/about") → "/nl/about", lp("nl", "/") → "/nl". Anchors and queries are kept. */
export function lp(lang: Lang, path: string): string {
  if (lang === "en" || !path.startsWith("/") || path.startsWith("/api/") || path.startsWith("/images/") || path.startsWith("/media/")) return path;
  return path === "/" ? `/${lang}` : path.startsWith("/#") ? `/${lang}${path.slice(1)}` : `/${lang}${path}`;
}
/** getStaticPaths helper for the /nl, /de and /fr copies of a page. */
export const langPaths = () => OTHER_LANGS.map((lang) => ({ params: { lang } }));

/** Pick the text for a language from { en, nl, de, fr } (falls back to English). */
export const pick = <T>(lang: Lang, v: Partial<Record<Lang, T>> & { en: T }): T => v[lang] ?? v.en;

export function usdFor(lang: Lang, n: number) {
  return "$" + Math.round(n).toLocaleString(lang === "en" ? "en-US" : LOCALE[lang]);
}

/** Adds the language prefix to the site links inside a piece of HTML (href="/..."). */
export const localizeLinks = (lang: Lang, html: string) =>
  lang === "en" ? html : html.replace(/href="(\/[^"]*)"/g, (_, p) => `href="${lp(lang, p)}"`);
