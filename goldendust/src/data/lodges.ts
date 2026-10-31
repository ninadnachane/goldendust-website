// Partner lodges and camps for the SEO lodge pages (/lodges/<slug>).
// lodgeList.json comes from the "Lodges" tab of List of Lodges and Camps.xlsx (Arusha left out).
// A lodge gets its own page only when we have its photos (src/planner/lodgePhotos.json).
import list from "./lodgeList.json";
import planner from "../planner/lodges.data.json";
import { lodgeImages, imageUrl, nameKey } from "../planner/engine";
import type { Tier } from "./tours";

export type AreaId = "lake-manyara" | "tarangire" | "karatu" | "ngorongoro" | "central-serengeti" | "western-serengeti" | "north-serengeti" | "ndutu";
export const AREAS: Record<AreaId, { name: string; park: string }> = {
  tarangire: { name: "Tarangire", park: "tarangire-national-park" },
  "lake-manyara": { name: "Lake Manyara", park: "lake-manyara-national-park" },
  karatu: { name: "Karatu", park: "karatu" },
  ngorongoro: { name: "Ngorongoro", park: "ngorongoro-crater" },
  "central-serengeti": { name: "Central Serengeti", park: "serengeti-national-park" },
  "western-serengeti": { name: "Western Serengeti", park: "serengeti-national-park" },
  "north-serengeti": { name: "North Serengeti", park: "serengeti-national-park" },
  ndutu: { name: "Ndutu", park: "serengeti-national-park" },
};
export const AREA_ORDER: AreaId[] = ["tarangire", "lake-manyara", "karatu", "ngorongoro", "ndutu", "central-serengeti", "western-serengeti", "north-serengeti"];

export type PartnerLodge = { slug: string; name: string; area: AreaId; tier: Tier; photos: string[]; inPlanner: boolean };

const slugify = (s: string) => nameKey(s).replace(/ /g, "-");
const plannerKeys = new Set((planner as { name: string }[]).map((l) => nameKey(l.name)));

export const lodges: PartnerLodge[] = (list as { name: string; area: AreaId; tier: Tier }[]).map((l) => ({
  ...l,
  slug: slugify(l.name),
  photos: lodgeImages({ name: l.name }).map(imageUrl),
  inPlanner: plannerKeys.has(nameKey(l.name)),
}));
export const lodgesWithPages = lodges.filter((l) => l.photos.length > 0);
export const lodgeUrl = (l: PartnerLodge) => `/lodges/${l.slug}`;
export const lodgesIn = (...areas: AreaId[]) => lodges.filter((l) => areas.includes(l.area));
export const TIER_TEXT: Record<Tier, Record<"en" | "nl" | "de" | "fr", string>> = {
  Budget: { en: "tents in a public campsite with shared washrooms", nl: "tenten op een openbare camping met gedeeld sanitair", de: "Zelte auf einem öffentlichen Campingplatz mit gemeinsamen Waschräumen", fr: "des tentes dans un camping public, avec sanitaires partagés" },
  Comfort: { en: "a comfortable lodge or tented camp", nl: "een comfortabele lodge of tentenkamp", de: "eine komfortable Lodge oder ein komfortables Zeltcamp", fr: "un lodge ou un camp de tentes confortable" },
  Premium: { en: "an upmarket lodge or camp in a good spot", nl: "een luxere lodge of kamp op een mooie plek", de: "eine gehobene Lodge oder ein Camp in guter Lage", fr: "un lodge ou un camp haut de gamme, bien situé" },
  Luxury: { en: "one of the finest lodges and camps in the area", nl: "een van de mooiste lodges en kampen in de omgeving", de: "eine der besten Lodges und Camps der Gegend", fr: "l'un des plus beaux lodges et camps de la région" },
};
