// Words used in many places: menu links, safari styles, place names.
import type { Lang } from "./index";

type Dict = Record<Lang, string>;
const d = <K extends string>(o: Record<K, Dict>) => o;

export const WORDS = d({
  home: { en: "Home", nl: "Home", de: "Startseite", fr: "Accueil" },
  about: { en: "About us", nl: "Over ons", de: "Über uns", fr: "À propos" },
  how: { en: "How it works", nl: "Zo werkt het", de: "So funktioniert's", fr: "Comment ça marche" },
  blogs: { en: "Blogs", nl: "Blog", de: "Blog", fr: "Blog" },
  planner: { en: "Itinerary planner", nl: "Reisplanner", de: "Reiseplaner", fr: "Planificateur" },
  plannerShort: { en: "Planner", nl: "Reisplanner", de: "Reiseplaner", fr: "Planificateur" },
  whatsapp: { en: "WhatsApp", nl: "WhatsApp", de: "WhatsApp", fr: "WhatsApp" },
  parks: { en: "Parks", nl: "Parken", de: "Parks", fr: "Parcs" },
  lodges: { en: "Lodges", nl: "Lodges", de: "Lodges", fr: "Lodges" },
  safaris: { en: "Safaris", nl: "Safari's", de: "Safaris", fr: "Safaris" },
  guides: { en: "Guides", nl: "Gidsen", de: "Ratgeber", fr: "Guides" },
  samples: { en: "Sample safaris", nl: "Voorbeeldsafari's", de: "Beispielsafaris", fr: "Exemples de safaris" },
  meetGuide: { en: "Meet your guide", nl: "Maak kennis met je gids", de: "Lernen Sie Ihren Guide kennen", fr: "Votre guide" },
  faq: { en: "Frequently asked questions", nl: "Veelgestelde vragen", de: "Häufige Fragen", fr: "Questions fréquentes" },
  askWa: { en: "Ask us on WhatsApp", nl: "Vraag het ons via WhatsApp", de: "Fragen Sie uns per WhatsApp", fr: "Écrivez-nous sur WhatsApp" },
  msgWa: { en: "Message us on WhatsApp", nl: "Stuur ons een WhatsApp", de: "Schreiben Sie uns per WhatsApp", fr: "Écrivez-nous sur WhatsApp" },
  perPerson: { en: "per person", nl: "per persoon", de: "pro Person", fr: "par personne" },
  from: { en: "From", nl: "Vanaf", de: "Ab", fr: "À partir de" },
  days: { en: "days", nl: "dagen", de: "Tage", fr: "jours" },
  nights: { en: "nights", nl: "nachten", de: "Nächte", fr: "nuits" },
  day: { en: "Day", nl: "Dag", de: "Tag", fr: "Jour" },
});

export const w = (lang: Lang, k: keyof typeof WORDS) => WORDS[k][lang];

export const TIER_NAME: Record<string, Dict> = {
  Budget: { en: "Budget", nl: "Budget", de: "Budget", fr: "Économique" },
  Comfort: { en: "Comfort", nl: "Comfort", de: "Komfort", fr: "Confort" },
  Premium: { en: "Premium", nl: "Premium", de: "Premium", fr: "Premium" },
  Luxury: { en: "Luxury", nl: "Luxe", de: "Luxus", fr: "Luxe" },
};
export const tierName = (lang: Lang, tier: string) => TIER_NAME[tier]?.[lang] ?? tier;

// Place names as visitors read them. Proper names (Serengeti, Tarangire, Karatu…) stay as they are.
const PLACE: Record<string, Partial<Dict>> = {
  "Central Serengeti": { nl: "Centrale Serengeti", de: "Zentrale Serengeti", fr: "Serengeti central" },
  "Western Serengeti": { nl: "Westelijke Serengeti", de: "Westliche Serengeti", fr: "Serengeti occidental" },
  "Northern Serengeti": { nl: "Noordelijke Serengeti", de: "Nördliche Serengeti", fr: "Serengeti nord" },
  "Southern Serengeti": { nl: "Zuidelijke Serengeti", de: "Südliche Serengeti", fr: "Serengeti sud" },
  "North Serengeti": { nl: "Noordelijke Serengeti", de: "Nördliche Serengeti", fr: "Serengeti nord" },
  "South Serengeti": { nl: "Zuidelijke Serengeti", de: "Südliche Serengeti", fr: "Serengeti sud" },
  "Ngorongoro Crater": { nl: "Ngorongorokrater", de: "Ngorongoro-Krater", fr: "Cratère du Ngorongoro" },
  "Ngorongoro (crater rim)": { nl: "Ngorongoro (kraterrand)", de: "Ngorongoro (Kraterrand)", fr: "Ngorongoro (bord du cratère)" },
  "Lake Manyara": { nl: "Lake Manyara", de: "Lake Manyara", fr: "Lac Manyara" },
  "Kilimanjaro Airport": { nl: "Kilimanjaro Airport", de: "Flughafen Kilimanjaro", fr: "Aéroport du Kilimandjaro" },
  "Serengeti National Park": { nl: "Nationaal Park Serengeti", de: "Serengeti-Nationalpark", fr: "Parc national du Serengeti" },
  "Tarangire National Park": { nl: "Nationaal Park Tarangire", de: "Tarangire-Nationalpark", fr: "Parc national de Tarangire" },
  "Lake Manyara National Park": { nl: "Nationaal Park Lake Manyara", de: "Lake-Manyara-Nationalpark", fr: "Parc national du lac Manyara" },
  "Ngorongoro Conservation Area": { nl: "Ngorongoro Conservation Area", de: "Ngorongoro-Schutzgebiet", fr: "Aire de conservation du Ngorongoro" },
};
export const place = (lang: Lang, name: string) => (lang === "en" ? name : PLACE[name]?.[lang] ?? name);
