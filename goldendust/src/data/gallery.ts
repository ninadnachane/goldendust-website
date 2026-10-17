// Homepage photo gallery. To add a photo:
// 1. put the file in public/images/gallery/ (e.g. elephants-tarangire.jpg)
// 2. add a line below with src "/images/gallery/elephants-tarangire.jpg" and a short description as alt.
// Photos from the old Wix site use their Wix media id (no leading slash).
export type Photo = { src: string; alt: string };

export const gallery: Photo[] = [
  { src: "7df076_f9426230a0e84400a48f65dcfbca9bc0~mv2.png", alt: "Lion resting on the Serengeti plains, Tanzania" },
  { src: "7df076_2388d60eb3d84d4bad382212a626b715~mv2.jpg", alt: "Giraffe in Serengeti National Park" },
];
