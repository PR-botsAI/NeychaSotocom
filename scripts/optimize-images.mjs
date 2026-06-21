// One-time image optimizer: shrinks the heavy case PNGs that blew past the
// Firebase free bandwidth quota. Produces WebP for on-site display and JPG
// copies of the collages for social-share scrapers that still dislike WebP.
//
//   node scripts/optimize-images.mjs
//
// Safe to re-run — it overwrites the generated files and leaves PNGs in place.
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const DIRS = ["client/public/cases", "client/public/assets/cases"];
const MAX_W = 1600; // nothing on the site renders wider than this
const isCollage = (name) => /collage/i.test(name);

let before = 0;
let after = 0;

for (const dir of DIRS) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    console.log(`skip (missing): ${dir}`);
    continue;
  }

  for (const file of files) {
    if (!/\.png$/i.test(file)) continue;
    const src = path.join(dir, file);
    const base = file.replace(/\.png$/i, "");
    before += (await stat(src)).size;

    // WebP — the on-site format
    const webpPath = path.join(dir, `${base}.webp`);
    await sharp(src)
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpPath);
    after += (await stat(webpPath)).size;

    // JPG — only for collages (used in OG/Twitter/schema share cards)
    if (isCollage(base)) {
      const jpgPath = path.join(dir, `${base}.jpg`);
      await sharp(src)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(jpgPath);
    }
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(`Source PNGs:     ${mb(before)} MB`);
console.log(`Optimized WebP:  ${mb(after)} MB`);
console.log(`Reduction:       ${(100 - (after / before) * 100).toFixed(0)}%`);
