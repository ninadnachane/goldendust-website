// Words used in many places: menu links, safari styles, place names.
import type { Lang } from "./index";

type Dict = Record<Lang, string>;
const d = <K extends string>(o: Record<K, Dict>) => o;

export const WORDS = d({
  home: { en: "Home", nl: "Home", de: "Startseite", fr: "Accueil", it: "Home", es: "Inicio" },
  about: { en: "About us", nl: "Over ons", de: "Über uns", fr: "À propos", it: "Chi siamo", es: "Quiénes somos" },
  how: { en: "How it works", nl: "Zo werkt het", de: "So funktioniert's", fr: "Comment ça marche", it: "Come funziona", es: "Cómo funciona" },
  blogs: { en: "Blogs", nl: "Blog", de: "Blog", fr: "Blog", it: "Blog", es: "Blog" },
  planner: { en: "Itinerary planner", nl: "Reisplanner", de: "Reiseplaner", fr: "Planificateur", it: "Planner di viaggio", es: "Planificador de viajes" },
  plannerShort: { en: "Planner", nl: "Reisplanner", de: "Reiseplaner", fr: "Planificateur", it: "Planner", es: "Planificador" },
  whatsapp: { en: "WhatsApp", nl: "WhatsApp", de: "WhatsApp", fr: "WhatsApp", it: "WhatsApp", es: "WhatsApp" },
  parks: { en: "Parks", nl: "Parken", de: "Parks", fr: "Parcs", it: "Parchi", es: "Parques" },
  lodges: { en: "Lodges", nl: "Lodges", de: "Lodges", fr: "Lodges", it: "Lodge", es: "Lodges" },
  safaris: { en: "Safaris", nl: "Safari's", de: "Safaris", fr: "Safaris", it: "Safari", es: "Safaris" },
  guides: { en: "Guides", nl: "Gidsen", de: "Ratgeber", fr: "Guides", it: "Guide pratiche", es: "Guías" },
  samples: { en: "Sample safaris", nl: "Voorbeeldsafari's", de: "Beispielsafaris", fr: "Exemples de safaris", it: "Safari di esempio", es: "Safaris de ejemplo" },
  meetGuide: { en: "Meet your guide", nl: "Maak kennis met je gids", de: "Lernen Sie Ihren Guide kennen", fr: "Votre guide", it: "Conosci la tua guida", es: "Conoce a tu guía" },
  faq: { en: "Frequently asked questions", nl: "Veelgestelde vragen", de: "Häufige Fragen", fr: "Questions fréquentes", it: "Domande frequenti", es: "Preguntas frecuentes" },
  askWa: { en: "Ask us on WhatsApp", nl: "Vraag het ons via WhatsApp", de: "Fragen Sie uns per WhatsApp", fr: "Écrivez-nous sur WhatsApp", it: "Scrivici su WhatsApp", es: "Pregúntanos por WhatsApp" },
  msgWa: { en: "Message us on WhatsApp", nl: "Stuur ons een WhatsApp", de: "Schreiben Sie uns per WhatsApp", fr: "Écrivez-nous sur WhatsApp", it: "Scrivici su WhatsApp", es: "Escríbenos por WhatsApp" },
  perPerson: { en: "per person", nl: "per persoon", de: "pro Person", fr: "par personne", it: "a persona", es: "por persona" },
  from: { en: "From", nl: "Vanaf", de: "Ab", fr: "À partir de", it: "Da", es: "Desde" },
  days: { en: "days", nl: "dagen", de: "Tage", fr: "jours", it: "giorni", es: "días" },
  nights: { en: "nights", nl: "nachten", de: "Nächte", fr: "nuits", it: "notti", es: "noches" },
  day: { en: "Day", nl: "Dag", de: "Tag", fr: "Jour", it: "Giorno", es: "Día" },
});

export const w = (lang: Lang, k: keyof typeof WORDS) => WORDS[k][lang];

export const TIER_NAME: Record<string, Dict> = {
  Budget: { en: "Budget", nl: "Budget", de: "Budget", fr: "Économique", it: "Economico", es: "Económico" },
  Comfort: { en: "Comfort", nl: "Comfort", de: "Komfort", fr: "Confort", it: "Comfort", es: "Confort" },
  Premium: { en: "Premium", nl: "Premium", de: "Premium", fr: "Premium", it: "Premium", es: "Premium" },
  Luxury: { en: "Luxury", nl: "Luxe", de: "Luxus", fr: "Luxe", it: "Lusso", es: "Lujo" },
};
export const tierName = (lang: Lang, tier: string) => TIER_NAME[tier]?.[lang] ?? tier;

// Place names as visitors read them. Proper names (Serengeti, Tarangire, Karatu…) stay as they are.
const PLACE: Record<string, Partial<Dict>> = {
  "Central Serengeti": { nl: "Centrale Serengeti", de: "Zentrale Serengeti", fr: "Serengeti central", it: "Serengeti centrale", es: "Serengeti central" },
  "Western Serengeti": { nl: "Westelijke Serengeti", de: "Westliche Serengeti", fr: "Serengeti occidental", it: "Serengeti occidentale", es: "Serengeti occidental" },
  "Northern Serengeti": { nl: "Noordelijke Serengeti", de: "Nördliche Serengeti", fr: "Serengeti nord", it: "Serengeti settentrionale", es: "Serengeti norte" },
  "Southern Serengeti": { nl: "Zuidelijke Serengeti", de: "Südliche Serengeti", fr: "Serengeti sud", it: "Serengeti meridionale", es: "Serengeti sur" },
  "North Serengeti": { nl: "Noordelijke Serengeti", de: "Nördliche Serengeti", fr: "Serengeti nord", it: "Serengeti settentrionale", es: "Serengeti norte" },
  "Ndutu & South Serengeti": { nl: "Ndutu & zuidelijke Serengeti", de: "Ndutu & südliche Serengeti", fr: "Ndutu et sud du Serengeti", it: "Ndutu e Serengeti meridionale", es: "Ndutu y sur del Serengeti" },
  "South Serengeti": { nl: "Zuidelijke Serengeti", de: "Südliche Serengeti", fr: "Serengeti sud", it: "Serengeti meridionale", es: "Serengeti sur" },
  "Ngorongoro Crater": { nl: "Ngorongorokrater", de: "Ngorongoro-Krater", fr: "Cratère du Ngorongoro", it: "Cratere di Ngorongoro", es: "Cráter del Ngorongoro" },
  "Ngorongoro (crater rim)": { nl: "Ngorongoro (kraterrand)", de: "Ngorongoro (Kraterrand)", fr: "Ngorongoro (bord du cratère)", it: "Ngorongoro (bordo del cratere)", es: "Ngorongoro (borde del cráter)" },
  "Lake Manyara": { nl: "Lake Manyara", de: "Lake Manyara", fr: "Lac Manyara", it: "Lago Manyara", es: "Lago Manyara" },
  "Kilimanjaro Airport": { nl: "Kilimanjaro Airport", de: "Flughafen Kilimanjaro", fr: "Aéroport du Kilimandjaro", it: "Aeroporto del Kilimangiaro", es: "Aeropuerto del Kilimanjaro" },
  "Serengeti National Park": { nl: "Nationaal Park Serengeti", de: "Serengeti-Nationalpark", fr: "Parc national du Serengeti", it: "Parco nazionale del Serengeti", es: "Parque Nacional del Serengeti" },
  "Tarangire National Park": { nl: "Nationaal Park Tarangire", de: "Tarangire-Nationalpark", fr: "Parc national de Tarangire", it: "Parco nazionale del Tarangire", es: "Parque Nacional de Tarangire" },
  "Lake Manyara National Park": { nl: "Nationaal Park Lake Manyara", de: "Lake-Manyara-Nationalpark", fr: "Parc national du lac Manyara", it: "Parco nazionale del Lago Manyara", es: "Parque Nacional del Lago Manyara" },
  "Ngorongoro Conservation Area": { nl: "Ngorongoro Conservation Area", de: "Ngorongoro-Schutzgebiet", fr: "Aire de conservation du Ngorongoro", it: "Area di conservazione di Ngorongoro", es: "Área de Conservación del Ngorongoro" },
};
export const place = (lang: Lang, name: string) => (lang === "en" ? name : PLACE[name]?.[lang] ?? name);
