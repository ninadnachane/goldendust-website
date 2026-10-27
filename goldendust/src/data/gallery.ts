// Homepage photo gallery (shown full width, behind the headline panel on the left).
// To add a photo:
// 1. put the file in public/images/gallery/ (landscape, ideally 2000px+ wide, left third fairly empty)
// 2. add a line below. `focus` picks which part of the photo stays visible when it's cropped to fit
//    (e.g. "50% 60%" = centre, slightly low). `flip: true` mirrors the photo so the subject sits on the right.
// Photos are never stretched: they're scaled up evenly and cropped to fill the frame.
// altNl/altDe/altFr: the same description in Dutch, German and French.
export type Photo = { src: string; alt: string; altNl?: string; altDe?: string; altFr?: string; focus?: string; flip?: boolean };

export const gallery: Photo[] = [
  { src: "/images/gallery/zebras-walking-grassland.webp", alt: "Zebras walking through golden grass on a Tanzania safari", altNl: "Zebra's lopen door goudkleurig gras tijdens een safari in Tanzania", altDe: "Zebras laufen durch goldenes Gras auf einer Safari in Tansania", altFr: "Des zèbres marchent dans les herbes dorées lors d'un safari en Tanzanie", focus: "42% 62%", flip: true },
  { src: "/images/gallery/white-rhino-ngorongoro.webp", alt: "White rhino grazing in golden grass", altNl: "Witte neushoorn die graast in goudkleurig gras", altDe: "Breitmaulnashorn grast im goldenen Gras", altFr: "Rhinocéros blanc broutant dans les herbes dorées", focus: "35% 50%", flip: true },
  { src: "/images/gallery/elephants-serengeti-plains.webp", alt: "Two elephants walking across the open Serengeti plains", altNl: "Twee olifanten lopen over de open vlaktes van de Serengeti", altDe: "Zwei Elefanten durchqueren die offenen Ebenen der Serengeti", altFr: "Deux éléphants traversent les grandes plaines du Serengeti", focus: "55% 55%" },
  { src: "/images/gallery/guide-view-gazelles-serengeti.webp", alt: "Our guide watching a herd of gazelles from the safari vehicle", altNl: "Onze gids kijkt vanuit het safarivoertuig naar een kudde gazellen", altDe: "Unser Guide beobachtet vom Safarifahrzeug aus eine Gazellenherde", altFr: "Notre guide observe un troupeau de gazelles depuis le véhicule de safari", focus: "50% 50%" },
  { src: "/images/gallery/cheetah-termite-mound.webp", alt: "Cheetah sitting on a termite mound, scanning the plains", altNl: "Cheeta op een termietenheuvel die de vlakte afspeurt", altDe: "Gepard auf einem Termitenhügel, der die Ebene absucht", altFr: "Un guépard assis sur une termitière scrute la plaine", focus: "50% 50%" },
  { src: "/images/gallery/giraffe-acacia-serengeti.webp", alt: "Giraffe feeding from an acacia tree on the Serengeti", altNl: "Giraffe die eet van een acacia in de Serengeti", altDe: "Giraffe frisst an einer Akazie in der Serengeti", altFr: "Une girafe se nourrit d'un acacia dans le Serengeti", focus: "55% 40%" },
];
