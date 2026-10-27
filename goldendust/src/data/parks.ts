// Park and area guides (/parks/<slug>). Linked from the footer only, not the main menu.
// Keep to facts we're sure of; fees come from the planner's admin settings (Oct 2026).
import type { AreaId } from "./lodges";

export type Section = { h: string; p: string[] };
export type Park = {
  slug: string;
  name: string;
  seoTitle: string;
  description: string;
  h1: string;
  lede: string;
  hero: string;       // image path under /images
  heroAlt: string;
  facts: [string, string][];
  sections: Section[];
  areas: AreaId[];    // lodges to show
  tourRoute: string[]; // show sample safaris whose route includes any of these
  faqs: { q: string; a: string }[];
};

export const parks: Park[] = [
  {
    slug: "serengeti-national-park",
    name: "Serengeti National Park",
    seoTitle: "Serengeti National Park Safari Guide: Best Time, Wildlife & Lodges",
    description: "A local guide's view of the Serengeti: where to stay, when to go for the Great Migration and big cats, park fees, and how many nights you need. Private safaris from Arusha.",
    h1: "Serengeti National Park",
    lede: "Endless plains, the Great Migration and more lions than almost anywhere in Africa. The Serengeti is the park most of our guests come for, and it rarely disappoints.",
    hero: "/images/gallery/elephants-serengeti-plains.webp",
    heroAlt: "Elephants crossing the open plains of the Serengeti",
    facts: [
      ["Size", "About 14,750 km²"],
      ["From Arusha", "A full day's drive via Ngorongoro, or a short flight"],
      ["Best for", "The Great Migration, lions, cheetahs, leopards"],
      ["Nights we suggest", "2 to 3, more if you follow the herds"],
      ["Park fee", "$82.60 per adult per 24 hours"],
    ],
    sections: [
      { h: "Why the Serengeti is special", p: [
        "The Serengeti is a UNESCO World Heritage Site in northern Tanzania, and together with Kenya's Maasai Mara it forms one ecosystem. Well over a million wildebeest, with hundreds of thousands of zebras and gazelles, move around it all year following the rain and the fresh grass. The predators follow them.",
        "What surprises most guests is the space. You can drive for an hour across open grassland, then reach a cluster of granite kopjes with a pride of lions asleep on top. It feels very different from a fenced reserve.",
      ] },
      { h: "Which part of the Serengeti?", p: [
        "Central Serengeti (Seronera) has resident wildlife all year, with the Seronera River valley one of the best places in Africa for big cats. If you have two nights and no fixed month, this is where we'd usually stay.",
        "The southern plains and Ndutu are where the herds gather to give birth from roughly January to March. Ndutu sits just inside the Ngorongoro Conservation Area, on the edge of the Serengeti.",
        "The western corridor follows the Grumeti River, which the herds usually cross around June. The northern Serengeti, near the Kenyan border, is where the Mara River crossings happen from about July to October. It's a long way from Arusha, so we plan at least two nights there.",
      ] },
      { h: "When to go", p: [
        "There's no bad month in the Serengeti, only different ones. June to October is dry, the animals are easy to find, and it's the busiest and most expensive time. January to March brings the calving season in the south. April and May are the long rains: some camps close, but the park is green, quiet and cheaper.",
        "Our month-by-month guide to the <a href=\"/great-migration-serengeti\">Great Migration</a> explains where the herds usually are, and the <a href=\"/post/best-time-to-visit-tanzania-for-a-safari-month-by-month-guide\">best time to visit Tanzania</a> covers the other parks too.",
      ] },
      { h: "Getting there", p: [
        "Most of our guests drive. The road from Arusha passes Lake Manyara and climbs over the Ngorongoro highlands, so the trip there is part of the safari. It takes most of a day with game viewing on the way. You can also fly from Arusha to one of the Serengeti airstrips and meet your guide there.",
      ] },
      { h: "Where to stay", p: [
        "You can camp in a public campsite, stay in a comfortable tented camp, or choose one of the luxury camps. Below are the camps and lodges we work with. The prices in our planner include them, so you can compare them for your dates.",
      ] },
    ],
    areas: ["central-serengeti", "western-serengeti", "ndutu"],
    tourRoute: ["Serengeti", "Central Serengeti", "Western Serengeti"],
    faqs: [
      { q: "How many days do you need in the Serengeti?", a: "Two full days, so three nights, is a good minimum. One night means you arrive in the afternoon and leave the next morning, and you spend most of your time driving." },
      { q: "Can you see the Big Five in the Serengeti?", a: "Lions, leopards, elephants and buffaloes are seen regularly. Rhinos are rare in the Serengeti, so we usually combine it with Ngorongoro Crater, which is one of the best places in Tanzania to see black rhino." },
      { q: "Is the Serengeti worth it on a short safari?", a: "With fewer than four days, often not. The drive from Arusha takes most of a day each way. On a three-day trip, Tarangire and Ngorongoro Crater usually give you more time watching animals." },
    ],
  },
  {
    slug: "ngorongoro-crater",
    name: "Ngorongoro Crater",
    seoTitle: "Ngorongoro Crater Safari Guide: Wildlife, Crater Fees & Where to Stay",
    description: "Everything you need to plan a day in Ngorongoro Crater: what you can see, the crater service fee, rim lodges vs Karatu, and the best time to go. From a local Arusha guide.",
    h1: "Ngorongoro Crater",
    lede: "A collapsed volcano with a floor full of animals. A day in Ngorongoro Crater is one of the best chances in Tanzania to see black rhino, and it fits into almost any safari.",
    hero: "/images/blog/safari-vehicle-ngorongoro-crater.webp",
    heroAlt: "A safari vehicle on the floor of Ngorongoro Crater",
    facts: [
      ["Crater floor", "About 260 km², around 600 m below the rim"],
      ["From Arusha", "About 3 to 4 hours by road"],
      ["Best for", "Black rhino, lions, hyenas, flamingos"],
      ["Time we suggest", "A half or full day on the crater floor"],
      ["Fees", "$71.80 per adult per 24 hours, plus $295 per vehicle to drive into the crater"],
    ],
    sections: [
      { h: "What makes the crater different", p: [
        "Ngorongoro Crater is one of the largest unbroken volcanic calderas in the world. It lies inside the Ngorongoro Conservation Area, a UNESCO World Heritage Site. Steep walls surround a floor of grassland, swamp, forest and a soda lake, and plenty of animals live there all year.",
        "Because the area is small and open, you see a lot in a few hours: wildebeest, zebras, buffaloes, lions, spotted hyenas, elephants and, with patience, black rhino. Flamingos often feed in Lake Magadi on the crater floor. Unlike most national parks, Maasai families live in the Conservation Area and graze their cattle there.",
      ] },
      { h: "How a crater day works", p: [
        "We drive down the crater road early, spend the day on the floor and climb back out in the afternoon. Many guests do the crater on the last day of their safari, on the way back to Arusha.",
        "Every vehicle pays a crater service fee to drive onto the floor, on top of the Conservation Area fee per person. When a trip in our planner includes a night at Ngorongoro, the crater game drive is always included.",
      ] },
      { h: "Rim or Karatu?", p: [
        "You can sleep on the crater rim, high above the floor, or in <a href=\"/parks/karatu\">Karatu</a>, about half an hour from the Conservation Area gate. The rim puts you closer to the crater, the views are spectacular and you get down early. Karatu is cheaper and warmer, and there are no Conservation Area fees for the night.",
        "The rim is over 2,000 m high, so nights are cold all year. Bring a warm jacket.",
      ] },
      { h: "When to go", p: [
        "The crater is good all year, because the animals don't migrate out. June to October is dry and busy. The rainy months are quieter and very green. Whatever the month, arriving early beats the crowds.",
      ] },
      { h: "Where to stay", p: [
        "These are the rim camps and lodges we work with. The Simba public campsite on the rim is the budget choice.",
      ] },
    ],
    areas: ["ngorongoro"],
    tourRoute: ["Ngorongoro Crater", "Ngorongoro"],
    faqs: [
      { q: "Can you see rhinos in Ngorongoro Crater?", a: "Yes. The crater has a small population of black rhinos, and it's one of the most reliable places in Tanzania to see them, though they're often at a distance and a sighting is never guaranteed." },
      { q: "Is one day enough for Ngorongoro Crater?", a: "Yes. A half or full day on the crater floor is enough for most guests. Stay a night on the rim or in Karatu so you can drive down early." },
      { q: "How much does it cost to visit Ngorongoro Crater?", a: "The Conservation Area fee is $71.80 per adult per 24 hours and every vehicle pays $295 to drive into the crater. Our prices always include both." },
    ],
  },
  {
    slug: "tarangire-national-park",
    name: "Tarangire National Park",
    seoTitle: "Tarangire National Park Safari Guide: Elephants, Best Time & Lodges",
    description: "Tarangire is two hours from Arusha and famous for elephants and baobab trees. A local guide's tips on when to go, how long to stay and where to sleep.",
    h1: "Tarangire National Park",
    lede: "Big elephant herds, giant baobab trees and a river that draws in wildlife all through the dry season. Tarangire is close to Arusha and often the first park on our safaris.",
    hero: "/images/gallery/zebras-walking-grassland.webp",
    heroAlt: "Zebras walking through grassland in northern Tanzania",
    facts: [
      ["Size", "About 2,850 km²"],
      ["From Arusha", "About 2 hours by road"],
      ["Best for", "Elephants, baobabs, birds"],
      ["Nights we suggest", "1 to 2"],
      ["Park fee", "$53.10 per adult per 24 hours"],
    ],
    sections: [
      { h: "Why go to Tarangire", p: [
        "Tarangire National Park is named after the Tarangire River, which runs through it. In the dry season, when water elsewhere runs out, the river becomes a magnet: elephants, zebras, wildebeest, buffaloes and the lions that hunt them all come to drink.",
        "It's one of the best places in Tanzania to see big herds of elephants, and the ancient baobab trees make it look unlike any other park. It's also a great park for birds, with hundreds of species recorded.",
      ] },
      { h: "When to go", p: [
        "Tarangire is at its best from about June to October, when the animals gather along the river. In the wet season many of them spread out of the park, but it's still lovely and green, and there are far fewer vehicles.",
      ] },
      { h: "How long to stay", p: [
        "Tarangire is close enough to Arusha for a day trip, but one night lets you be out for the early morning and late afternoon, when the light and the animals are best. On longer trips we often give it two.",
        "It's an easy first stop: you land, rest in Arusha, and you're watching elephants by lunchtime the next day.",
      ] },
      { h: "Where to stay", p: [
        "There's a public campsite inside the park, plus lodges and tented camps inside it and on its edge. These are the ones we work with.",
      ] },
    ],
    areas: ["tarangire"],
    tourRoute: ["Tarangire"],
    faqs: [
      { q: "Is Tarangire worth visiting?", a: "Yes, especially from June to October. It's two hours from Arusha and one of the best parks in Tanzania for elephants, so it's a great first stop on a safari." },
      { q: "How many days do you need in Tarangire?", a: "One night is enough for most trips. Two nights let you explore further from the river and see the quieter parts of the park." },
      { q: "Tarangire or Lake Manyara?", a: "If you only have time for one, we usually suggest Tarangire: it's bigger, has more wildlife and the elephant herds are hard to beat. Lake Manyara suits a half day on the way to Ngorongoro." },
    ],
  },
  {
    slug: "lake-manyara-national-park",
    name: "Lake Manyara National Park",
    seoTitle: "Lake Manyara National Park Safari Guide: Wildlife, Best Time & Lodges",
    description: "A small, green park under the Rift Valley wall, on the way to Ngorongoro. What you can see in Lake Manyara, when to go, and where to stay, from a local guide.",
    h1: "Lake Manyara National Park",
    lede: "A narrow strip of forest, grassland and lake beneath the Great Rift Valley escarpment. Lake Manyara is small, but it packs a lot into a half day.",
    hero: "/images/lodges/and-beyond-lake-manyara/01.webp",
    heroAlt: "&Beyond Lake Manyara Tree Lodge",
    facts: [
      ["Setting", "Between the Rift Valley wall and Lake Manyara"],
      ["From Arusha", "About 2 hours by road"],
      ["Best for", "Forest, baboons, elephants, birds, the Rift Valley views"],
      ["Time we suggest", "A half or full day"],
      ["Park fee", "$59 per adult per 24 hours"],
    ],
    sections: [
      { h: "What Lake Manyara is like", p: [
        "You enter through a groundwater forest of tall fig and mahogany trees, fed by springs from the escarpment. Troops of baboons and blue monkeys move through it, and elephants feed in the shade.",
        "Further in, the forest opens into grassland and the shore of the lake, where hippos, buffaloes, giraffes and many water birds live. In some years flamingos gather on the lake in large numbers. The park is known for lions that climb trees, but they're seen far less often than the stories suggest.",
      ] },
      { h: "Is it worth it?", p: [
        "Lake Manyara is on the road from Arusha to Ngorongoro and the Serengeti, so it's easy to add as a half day. It works well if you've seen Tarangire already, love birds, or want something different from the open plains. On a short trip, Tarangire usually gives you more wildlife.",
      ] },
      { h: "When to go", p: [
        "The dry season, June to October, is best for larger animals. The wet season is great for birds and the park is at its greenest.",
      ] },
      { h: "Where to stay", p: [
        "Most lodges are on the escarpment above the park or in Mto wa Mbu village, with great views over the lake. Many guests stay in <a href=\"/parks/karatu\">Karatu</a> instead and visit Manyara on the way.",
      ] },
    ],
    areas: ["lake-manyara"],
    tourRoute: ["Lake Manyara"],
    faqs: [
      { q: "Do the lions in Lake Manyara really climb trees?", a: "Sometimes, but sightings are rare. Tree-climbing lions are seen in a few parks in East Africa, and Manyara is one of them. Don't plan your trip around it." },
      { q: "How long do you need in Lake Manyara?", a: "A half day is enough for most guests. It fits well into the drive from Arusha to Karatu or Ngorongoro." },
    ],
  },
  {
    slug: "karatu",
    name: "Karatu",
    seoTitle: "Karatu Lodges: Where to Stay Near Ngorongoro Crater",
    description: "Karatu is a highland town close to the Ngorongoro Conservation Area gate. Why many guests stay here instead of the crater rim, and the Karatu lodges we work with.",
    h1: "Karatu, the base for Ngorongoro",
    lede: "Green hills, coffee farms and cool evenings, close to the Ngorongoro gate. Karatu is where many of our guests sleep before or after their day in the crater.",
    hero: "/images/lodges/gibb-s-farm/01.webp",
    heroAlt: "Gibb's Farm in the Karatu highlands",
    facts: [
      ["Where", "Between Lake Manyara and the Ngorongoro Conservation Area"],
      ["From Arusha", "About 2.5 to 3 hours by road"],
      ["To the crater", "About 30 minutes to the gate, then the drive up to the rim"],
      ["Best for", "A comfortable night near the crater, at a lower cost"],
    ],
    sections: [
      { h: "Why stay in Karatu", p: [
        "Karatu sits in the highlands just outside the Ngorongoro Conservation Area. Because it's outside the Conservation Area, there are no park fees for the night, and the lodges are usually cheaper than on the crater rim. It's also a little lower and warmer.",
        "Many of the lodges are set on coffee farms and in gardens, with good food and room to relax. After a long day of game drives, that's welcome.",
      ] },
      { h: "Karatu or the crater rim?", p: [
        "If you want the view and the earliest start into <a href=\"/parks/ngorongoro-crater\">Ngorongoro Crater</a>, stay on the rim. If you want to save money, or you're travelling with children who'd enjoy a garden and a pool, Karatu is a great choice. We'll tell you honestly which fits your trip.",
      ] },
      { h: "Where to stay in Karatu", p: [
        "These are the Karatu lodges we work with, from comfortable family-run places to some of the best lodges in northern Tanzania.",
      ] },
    ],
    areas: ["karatu"],
    tourRoute: ["Karatu"],
    faqs: [
      { q: "How far is Karatu from Ngorongoro Crater?", a: "About 30 minutes to the Conservation Area gate, then roughly another 30 to 45 minutes up to the rim and down the crater road." },
      { q: "Is it better to stay in Karatu or on the Ngorongoro rim?", a: "The rim is closer and the views are better. Karatu is cheaper, warmer and has no Conservation Area fees for the night. Both work well." },
    ],
  },
];

export const parkUrl = (p: Park | string) => `/parks/${typeof p === "string" ? p : p.slug}`;
