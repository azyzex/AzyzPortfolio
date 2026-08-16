/**
 * Renders the 1200x630 social share card used by the Open Graph / Twitter meta
 * tags in index.html. Without one, sharing the portfolio link on Discord,
 * LinkedIn or WhatsApp shows a bare title with no image.
 *
 *   npm run generate:og
 */
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const OUT_DIR = path.join("public", "assets", "og");
const OUT_FILE = path.join(OUT_DIR, "og-card.png");
const PHOTO = path.join("public", "assets", "profile", "1770583574950.jfif");

const INK = "#15191d";
const MUTED = "#66737b";
const TEAL = "#0699a8";
const TEAL_DARK = "#057584";
const WARM = "#f3bd55";

const SANS = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif";
const SERIF = "Georgia, Times New Roman, serif";

const PHOTO_SIZE = 268;
const PHOTO_X = 862;
const PHOTO_Y = 168;
const PHOTO_R = PHOTO_SIZE / 2;
const PHOTO_CX = PHOTO_X + PHOTO_R;
const PHOTO_CY = PHOTO_Y + PHOTO_R;

const background = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="tealGlow" cx="12%" cy="6%" r="52%">
      <stop offset="0%" stop-color="${TEAL}" stop-opacity="0.16" />
      <stop offset="100%" stop-color="${TEAL}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="warmGlow" cx="88%" cy="4%" r="46%">
      <stop offset="0%" stop-color="${WARM}" stop-opacity="0.28" />
      <stop offset="100%" stop-color="${WARM}" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="${INK}" stroke-opacity="0.05" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#ffffff" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#tealGlow)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#warmGlow)" />

  <!-- Warm sticky note, echoing the tilted paper on the site -->
  <g transform="rotate(-6 1075 545)">
    <rect x="1010" y="500" width="130" height="92" rx="6" fill="${WARM}" fill-opacity="0.42" />
  </g>

  <path d="M 690 596 A 150 96 0 0 1 940 552" fill="none"
        stroke="${TEAL}" stroke-opacity="0.28" stroke-width="2" />

  <text x="80" y="176" font-family="${SANS}" font-size="23" font-weight="700"
        letter-spacing="4.6" fill="${TEAL_DARK}">FULL-STACK WEB &amp; MOBILE DEVELOPER</text>

  <text x="76" y="282" font-family="${SANS}" font-size="67" font-weight="800"
        letter-spacing="-2.6" fill="${INK}">Mohamed Aziz Guenni</text>

  <text x="80" y="360" font-family="${SERIF}" font-size="37" font-style="italic"
        fill="${TEAL_DARK}">clear, useful, easy to trust</text>

  <text x="80" y="428" font-family="${SANS}" font-size="27" fill="${MUTED}">Web, mobile, and AI products —</text>
  <text x="80" y="468" font-family="${SANS}" font-size="27" fill="${MUTED}">from queue platforms to AI assistants.</text>

  <rect x="80" y="530" width="54" height="3" rx="1.5" fill="${TEAL}" />
  <text x="80" y="578" font-family="${SANS}" font-size="23" font-weight="700"
        fill="${INK}">azyzex.github.io/AzyzPortfolio</text>

  <circle cx="${PHOTO_CX}" cy="${PHOTO_CY}" r="${PHOTO_R + 11}" fill="#ffffff" />
  <circle cx="${PHOTO_CX}" cy="${PHOTO_CY}" r="${PHOTO_R + 11}" fill="none"
          stroke="${TEAL}" stroke-opacity="0.22" stroke-width="2" />
</svg>`;

const circleMask = `
<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO_SIZE}" height="${PHOTO_SIZE}">
  <circle cx="${PHOTO_R}" cy="${PHOTO_R}" r="${PHOTO_R}" fill="#fff" />
</svg>`;

mkdirSync(OUT_DIR, { recursive: true });

const portrait = await sharp(PHOTO)
  .resize(PHOTO_SIZE, PHOTO_SIZE, { fit: "cover", position: "top" })
  .composite([{ input: Buffer.from(circleMask), blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(Buffer.from(background))
  .composite([{ input: portrait, left: PHOTO_X, top: PHOTO_Y }])
  .png()
  .toFile(OUT_FILE);

console.log(`Wrote ${OUT_FILE} (${WIDTH}x${HEIGHT}, ${Math.round(statSync(OUT_FILE).size / 1024)} KB)`);
