# Resize lodge photos (one folder per lodge) into public/images/lodges/<slug>/NN.webp and write src/planner/lodgePhotos.json.
# Usage: python3 scripts/import-photos.py "<Accommodations folder>" "<List of Lodges and Camps.xlsx>"
import os, re, json, sys, unicodedata, openpyxl
from PIL import Image, ImageOps
SRC = sys.argv[1]  # the Accommodations folder (one folder per lodge)
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = f"{SITE}/public/images/lodges"
MAX, PER = 1200, 12
wb = openpyxl.load_workbook(sys.argv[2], data_only=True)  # the lodge Excel
names = [r[2] for r in wb["Lodges"].iter_rows(min_row=5, values_only=True) if r[2]]
def norm(s): return re.sub(r"[^a-z0-9]+", " ", unicodedata.normalize("NFKD", s.lower()).replace("&", " and ")).strip()
def slug(s): return norm(s).replace(" ", "-")
STOP = {"camp","lodge","tented","the","at","safari","serengeti","central","western","ngorongoro","tarangire","karatu","manyara","ndutu","arusha","lake","hotel","and"}
def toks(s): return set(norm(s).split())
OVERRIDE = {
  "Serengeti Classic View Migration Camp - Ndutu": "Serengeti Classic View (Ndutu)",
  "Serengeti Serena Safari Lodge - Central Serengeti": "Serengeti Serena",
  "Karatu Villas Lodge - Karatu": "Karatu Villa",
  "Kubu Kubu Tented Lodge - Central Serengeti": "Kubukubu Tented Lodge",
  "andBeyond Lake Manyara Tree Lodge - Manyara": "&Beyond Lake Manyara",
  "Rhotia Valley Tented Lodge - Karatu": None,      # not sure it's the same as Rhotia Valley Simba Lodge
  "Nasikia Mobile Migration Camp - Ndutu": None,    # not sure it's "Nasikia Ndutu"
}
def match(folder):
    if folder in OVERRIDE: return OVERRIDE[folder]
    base = re.sub(r"\s+-\s+[^-]+$", "", folder).strip()   # drop " - Area"
    nb = norm(base).replace("inafrica", "in africa")
    for n in names:
        if norm(n) == nb: return n
    best, score = None, 0
    for n in names:
        a, b = toks(n) - STOP, set(nb.split()) - STOP
        if not a or not b: continue
        s = len(a & b) / len(a | b)
        if s > score: best, score = n, s
    return best if score >= 0.5 else None
manifest, report = {}, []
for folder in sorted(os.listdir(SRC)):
    p = os.path.join(SRC, folder)
    if not os.path.isdir(p) or folder.startswith("_"): continue
    files = sorted(os.path.join(r, f) for r, _, fs in os.walk(p) for f in fs if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")))
    seen, uniq = set(), []
    for f in files:
        k = os.path.basename(f).lower()
        if k in seen: continue
        seen.add(k); uniq.append(f)
    if not uniq: report.append(f"  no photos: {folder}"); continue
    pick = uniq if len(uniq) <= PER else [uniq[round(i * (len(uniq) - 1) / (PER - 1))] for i in range(PER)]
    name = match(folder)
    if not name: report.append(f"  NO MATCH: {folder}"); continue
    s = slug(name); os.makedirs(f"{OUT}/{s}", exist_ok=True)
    out = []
    for i, f in enumerate(pick, 1):
        try:
            im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
        except Exception as e:
            report.append(f"  skip {f}: {e}"); continue
        if min(im.size) < 300: report.append(f"  tiny, skipped: {os.path.basename(f)} {im.size}"); continue
        im.thumbnail((MAX, MAX))
        dst = f"{OUT}/{s}/{i:02d}.webp"; im.save(dst, "WEBP", quality=72, method=6)
        out.append(f"lodges/{s}/{i:02d}.webp")
    if out: manifest[norm(name)] = out
    report.append(f"{len(out):2d}  {folder}  ->  {name}")
json.dump(manifest, open(f"{SITE}/src/planner/lodgePhotos.json", "w"), indent=1, sort_keys=True)
print("\n".join(report))
