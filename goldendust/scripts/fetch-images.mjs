// Downloads every image the site uses from the Wix media CDN into public/images,
// so the site no longer depends on Wix. Runs automatically before every build;
// failures never stop the build (the site falls back to the Wix URL for that image).
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ids = new Set();
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|ts|json|md)$/.test(f)) {
      for (const m of readFileSync(p, "utf8").matchAll(/[0-9a-f]{6}_[0-9a-f]{32}~mv2\.(png|jpe?g|webp)/g)) ids.add(m[0]);
    }
  }
};
walk("src");
mkdirSync("public/images", { recursive: true });
for (const id of ids) {
  const out = join("public/images", id);
  if (existsSync(out)) continue;
  try {
    const res = await fetch(`https://static.wixstatic.com/media/${id}`);
    if (!res.ok) { console.warn("could not fetch", id, res.status); continue; }
    writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    console.log("saved", id);
  } catch (e) {
    console.warn("could not fetch", id, e.message);
  }
}
