/**
 * Converts raster images under public/assets to WebP and deletes the originals.
 * WebP is typically 60-90% smaller than the PNG/JPG it replaces at the same
 * visual quality, which matters most in the Proof marquee: it renders every
 * certificate twice, all at once.
 *
 *   npm run optimize:images
 *
 * Safe to re-run: only .png/.jpg/.jpeg/.jfif files are touched, so anything
 * already converted is skipped. Drop a new certificate or avatar into its
 * folder, run this, then point src/data/portfolio.ts at the printed .webp path.
 *
 * public/assets/og is left alone on purpose: some link-preview crawlers still
 * don't read WebP, so the share card stays a PNG.
 */
import { readdirSync, statSync, unlinkSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join("public", "assets");
const RASTER = /\.(png|jpe?g|jfif)$/i;

// Per-folder output rules. `thumb` adds a second, smaller copy in ./thumbs/ —
// the marquee card is at most 350 CSS px wide, so it never needs the full file.
const rules = {
  certificates: { width: 1800, quality: 80, thumb: { width: 720, quality: 74 } },
  recommendations: { square: 192, quality: 80 },
  profile: { width: 800, quality: 85 },
  course: { width: 1200, quality: 80 },
  projects: { width: 1600, quality: 80 },
};

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-1$/, "");

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
let before = 0;
let after = 0;

for (const [folder, rule] of Object.entries(rules)) {
  const dir = path.join(ROOT, folder);
  let exists = true;
  try {
    statSync(dir);
  } catch {
    exists = false;
  }
  if (!exists) continue;

  for (const file of walk(dir)) {
    if (!RASTER.test(file)) continue;

    const outName = `${slugify(path.parse(file).name)}.webp`;
    const out = path.join(path.dirname(file), outName);
    const input = sharp(file).rotate();

    const pipeline = rule.square
      ? input.resize(rule.square, rule.square, { fit: "cover", position: "top" })
      : input.resize({ width: rule.width, withoutEnlargement: true });
    await pipeline.webp({ quality: rule.quality, effort: 6 }).toFile(out);

    if (rule.thumb) {
      const thumbDir = path.join(path.dirname(file), "thumbs");
      mkdirSync(thumbDir, { recursive: true });
      await sharp(file)
        .rotate()
        .resize({ width: rule.thumb.width, withoutEnlargement: true })
        .webp({ quality: rule.thumb.quality, effort: 6 })
        .toFile(path.join(thumbDir, outName));
    }

    const oldSize = statSync(file).size;
    const newSize = statSync(out).size;
    before += oldSize;
    after += newSize;
    unlinkSync(file);
    console.log(`${kb(oldSize).padStart(8)} -> ${kb(newSize).padStart(7)}  ${out.replaceAll("\\", "/")}`);
  }
}

if (before) {
  console.log(`\n${kb(before)} -> ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`);
} else {
  console.log("Nothing to convert.");
}
