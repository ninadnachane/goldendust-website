// Homepage photo gallery (shown full width, behind the headline panel on the left).
// To add a photo:
// 1. put the file in public/images/gallery/ (landscape, ideally 2000px+ wide, left third fairly empty)
// 2. add a line below. `focus` picks which part of the photo stays visible when it's cropped to fit
//    (e.g. "50% 60%" = centre, slightly low). `flip: true` mirrors the photo so the subject sits on the right.
// Photos are never stretched: they're scaled up evenly and cropped to fill the frame.
export type Photo = { src: string; alt: string; focus?: string; flip?: boolean };

export const gallery: Photo[] = [
  { src: "/images/gallery/zebras-serengeti.webp", alt: "Plains zebras grazing with an impala in the background", focus: "62% 45%" },
  { src: "/images/gallery/elephants-serengeti-plains.webp", alt: "Two elephants walking across the open Serengeti plains", focus: "55% 55%" },
  { src: "/images/gallery/cheetah-termite-mound.webp", alt: "Cheetah sitting on a termite mound, scanning the plains", focus: "50% 50%" },
  { src: "/images/gallery/giraffe-acacia-serengeti.webp", alt: "Giraffe feeding from an acacia tree on the Serengeti", focus: "55% 40%" },
  { src: "/images/gallery/white-rhino-ngorongoro.webp", alt: "White rhino grazing in golden grass", focus: "35% 50%", flip: true },
];
