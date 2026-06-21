// Honest enhancement pass for the before/after case photos.
// Sources are only 1080×1080, so we cannot invent detail — but we CAN make
// them read sharper and more vivid when zoomed: a clean upscale (Lanczos),
// a measured unsharp pass, and a gentle saturation/contrast lift. No
// generative AI, no fabricated texture — the nail shown stays the real one.
//
//   node scripts/enhance-images.mjs
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const DIR = "client/public/cases";
const TARGET_W = 1728; // 1.6× of 1080 — crisper on zoom, still light as WebP
const isBeforeAfter = (n) => /_(before|after)\.png$/i.test(n);

let before = 0;
let after = 0;
const files = (await readdir(DIR)).filter(isBeforeAfter).sort();

for (const file of files) {
  const src = path.join(DIR, file);
  const out = path.join(DIR, file.replace(/\.png$/i, ".webp"));
  before += (await stat(src)).size;

  await sharp(src)
    .resize({ width: TARGET_W, kernel: "lanczos3", withoutEnlargement: false })
    .median(1) // knock back phone-camera speckle before sharpening
    .sharpen({ sigma: 0.9, m1: 0.5, m2: 2.2 }) // unsharp: crisp edges, calm flats
    .modulate({ saturation: 1.07, brightness: 1.01 }) // a touch more life
    .linear(1.04, -4) // gentle contrast
    .webp({ quality: 86, effort: 5 })
    .toFile(out);

  after += (await stat(out)).size;
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log(`Enhanced ${files.length} before/after photos`);
console.log(`Source PNGs:    ${mb(before)} MB`);
console.log(`Enhanced WebP:  ${mb(after)} MB  (still far under the PNG weight)`);
