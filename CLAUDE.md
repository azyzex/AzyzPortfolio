# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal portfolio website for **Mohamed Aziz Guenni** ("Aziz") — a Tunisian
Full-Stack Web & Mobile Developer (Computer Engineering grad, currently doing a
Professional Master's in Networks Engineering). A single-page marketing site
(plus a hash-routed project archive) presenting his bio, tech stack, projects,
certificates, LinkedIn recommendations, contact options, and his Udemy course.

- `package.json` name: `aziz-portfolio` (v1.0.0)
- Live URL / GitHub Pages base: `https://azyzex.github.io/AzyzPortfolio/`
- Git remote: `https://github.com/azyzex/AzyzPortfolio.git`
- Deployed by `.github/workflows/deploy.yml` on every push to `main`.
- This folder is a **rewrite** of an older portfolio (vanilla HTML/Bootstrap).
  The old one is **not** a portfolio project and must not be listed as one.

## Stack

- **React 19** + **TypeScript** (`~5.7`), built with **Vite 6**
- **framer-motion** for all animation (entrance reveals, hover, marquees)
- **lucide-react** for icons
- **Tailwind CSS 3** is installed but the UI is styled **entirely by hand-written
  CSS** in `src/styles.css` (BEM-ish class names like `.work-piece`,
  `.archive-card__media`, `.course-cover`). **No Tailwind utility classes are
  used**; it is kept solely for its base reset (preflight), which the layout
  depends on. Treat `src/styles.css` as the real stylesheet.
- **sharp** (dev) powers the two asset scripts below.
- ESLint 9 (flat config) with typescript-eslint + react-hooks + react-refresh

## Commands

```bash
npm run dev              # Vite dev server
npm run build            # tsc -b && vite build  -> dist/
npm run preview          # serve dist/ (at /AzyzPortfolio/)
npm run lint             # eslint .
npm run optimize:images  # convert new PNG/JPG/JFIF under public/assets to WebP
npm run generate:og      # re-render public/assets/og/og-card.png
```

No test runner is wired up. `@playwright/test` is installed and is handy for
ad-hoc browser checks against `npm run preview`; its bundled browser is not
downloaded, so launch with `chromium.launch({ channel: "chrome" })`.

## Architecture

Entry: `index.html` -> `src/main.tsx` -> `src/App.tsx`.

`App.tsx` switches between two views with a tiny hash router
(`src/utils/router.ts`): `#/projects` is a route (leading slash), anything else
(`#about`, `#contact`…) is a normal in-page anchor on the home view.

```
<Header />
<main>
  home (#/ or any anchor):          archive (#/projects):
    <Hero />        #top              <AllProjects />
    <About />       #about
    <SkillsTimeline /> #skills
    <Projects />    #projects
    <Course />      #course
    <Proof />       #certificates
    <Contact />     #contact
</main>
<Footer />
```

### Single source of truth: `src/data/portfolio.ts`

**The most important file in the repo.** Almost all content lives here as typed
exports; components are presentational and map over it. To change site
content, edit this file, not the components. Key exports:

- `profile` — name, title, location, email, phone, bio, photo, availability.
  `profile.email` (`azizguenni0@gmail.com`) is correct — don't "fix" it.
- `navItems` — header navigation (Header imports it).
- `techItems` — the flat tech list in the Skills marquee (devicon CDN logos,
  per-item `accent` colour).
- `projects: Project[]` — 17 projects, newest first. All have a 16:10 WebP
  `image`. `featured: true` ones surface on the home page (**only the first 4
  featured** are shown). Optional `video` — see "Project videos" below.
- `certificates` (29), `recommendations` (6), `socialLinks`. A certificate's
  `file` is what the card links to; when that's a PDF, `image` supplies the card
  preview (e.g. the 20 Anthropic Academy certificates are ONE entry: a 5×4
  collage image linking to the combined PDF — Aziz wants them kept as one).
- `cv` — a single `LinkItem`. The one PDF contains both the English and the
  French CV, so there is one download everywhere (Header, Hero, Contact).
- `course` — the Udemy course shown in the `Course` section.
- `experience` / `education` (`TimelineItem[]`), `skillGroups`, `services`,
  `focusAreas` — exported but **not currently rendered** (kept for a future
  timeline / services section). There is no experience timeline on the site.

Types (`LinkItem`, `Project`, `TimelineItem`, `Certificate`, `Recommendation`,
`TechItem`) are defined in the same file.

### Components (`src/components/`)

- `Header.tsx` — sticky pill nav + Resume link; mobile hamburger toggles
  `.nav--open`.
- `Hero.tsx` — "Hi, I'm Aziz." headline, role, intro, View work / Resume.
- `About.tsx` — bio copy beside a tilted polaroid photo with a
  "currently doing master's" sticky note.
- `SkillsTimeline.tsx` — despite the name, renders only the 5-row tech marquee
  (`techItems`). The timeline it once had was removed.
- `Projects.tsx` — first 4 featured projects as alternating large "work
  pieces", then a "See all N projects" button to `#/projects`.
- `AllProjects.tsx` — the archive: a grid of every project as cards, each
  opening a two-note detail dialog (Escape/backdrop closes, body scroll locked,
  focus restored). The grid is flex-wrap + `justify-content: center`, so an
  incomplete last row is always centred; `--archive-cols` (3/2/1 at >1060 /
  ≤1060 / ≤700px) sets the card width. Cards with a `video` play it on hover, and their dialog
  pages between image and video (see below).
- `Proof.tsx` — two infinite marquees: certificates and recommendations.
  Durations are computed from item count × per-card travel constants
  (`certificateTravelPx` / `recommendationTravelPx`) to hold a constant px/s —
  **if card widths change in CSS, update the matching constant**. Certificate
  cards load the small copy from `certificates/thumbs/`; the link opens the
  full-size file.
- `Contact.tsx` — contact details + "Email me" modal. The modal opens on a
  chooser (Write a message / Gmail / Outlook) and **morphs** into a form by
  tweening the measured content height (`ResizeObserver` → animated
  `.email-modal__viewport` height) while `AnimatePresence mode="popLayout"`
  crossfades — do NOT use framer's `layout` prop here, it scale-distorts the
  children. Escape closes it and page scroll is locked while open. The form
  POSTs to `VITE_FORMSPREE_ENDPOINT`; unset, it falls back to `mailto:`.
- `Course.tsx` — sits between Projects and Proof: tilted, taped course cover + copy +
  topic chips + "Check out the course" button, from `course` in portfolio.ts.
- `Footer.tsx`, `SectionHeader.tsx` — small presentational helpers.

### Project videos (hover-to-play)

`Project.video` is a path **without extension**; both `<path>.webm` (VP9) and
`<path>.mp4` (H.264) must exist. WebM is listed first because some systems —
notably Windows "N" editions, which Aziz's machine is — cannot decode H.264 at
all; the MP4 covers older Safari. On archive cards the `image` stays as the
poster and the clip fades in once it is actually playing; nothing is fetched
until the first hover (`preload="none"`, sources attached on demand). Hover
playback is deliberately **not** gated on `prefers-reduced-motion` — it only
starts because the visitor pointed at the card, and Aziz's own Windows has
animations turned off (which browsers report as reduce-motion). In the detail dialog, a project with a
video gets `MediaGallery`: two pages (Image, then Video) on a sliding track
with arrows + Image/Video tabs + ←/→ keys; the video plays (with sound) when
paged to and pauses when paged away.

Check frame 0 first: exported promo videos often carry a title-card "poster"
as their very first frame, which flashes on hover (and on every loop). The
Rehearsal source did; it's dropped with `trim=start_frame=1` in the `-vf` chain
(plus `-af "atrim=start=0.0334,asetpts=PTS-STARTPTS"` at 30fps).

The hover reveal (fade + blur-to-sharp + slight zoom) is exempted from the
global reduced-motion rule for opacity/filter only — see the end of styles.css.

Recipe (keep clips short; ~2–3 MB each at 1280px):

```bash
ffmpeg -i in.mp4 -vf scale=1280:-2 -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart <slug>-preview.mp4
ffmpeg -i in.mp4 -vf scale=1280:-2 -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 \
  -c:a libopus -b:a 80k <slug>-preview.webm
```

### Utilities (`src/utils/`)

- `assets.ts` — `assetPath(path)` prefixes Vite's `BASE_URL` (`/AzyzPortfolio/`).
  **Always route public-asset URLs through `assetPath()`**; external URLs and
  `mailto:`/`tel:` pass through. Leading slashes are stripped.
- `motion.ts` — shared framer-motion variants: `spring`, `fadeUp`, `softScale`,
  `staggerContainer`, `viewportOnce`. Reuse these instead of inlining.
- `router.ts` — the two-view hash router and post-navigation scroll fix.

Note: framer writes an inline `transform` on anything it animates, which
overrides a CSS `transform: rotate(...)`. For a tilted motion element, put the
tilt in framer (`style={{ rotate: -2.2 }}`), not in CSS (see `Course.tsx`).

## Assets (`public/assets/`)

Copied verbatim into `dist/`. **Everything raster is WebP** (except the OG
card, which stays PNG because some link-preview crawlers don't read WebP).

- `profile/aziz.webp` — profile photo (also used by the OG script)
- `cv/cv guenni mohamed aziz.pdf` — CV, English + French in one file
- `certificates/<slug>.webp` (full, ≤1800px) + `certificates/thumbs/<slug>.webp`
  (720px, used by the marquee)
- `recommendations/<person>/avatar.webp` (192px square).
- `projects/<slug>/<slug>-hero.webp` — 16:10 thumbnails, plus
  `<slug>-preview.{webm,mp4}` for every project (made with /brag; sources
  in each project repo's `brag-output/`)
- `course/sftp-course.webp`, `og/og-card.png`

To add an image: drop the PNG/JPG into the right folder, run
`npm run optimize:images` (converts to WebP with per-folder sizing, makes
certificate thumbs, deletes the original, prints the new path), then reference
the `.webp` in `portfolio.ts`.

Git-ignored local staging folders (never shipped): `_intake/`, `thumbnails/`.

## Conventions & gotchas

- Content changes go in `src/data/portfolio.ts`; styling in `src/styles.css`.
- `vite.config.ts` derives `base` from `package.json` `homepage`, and fills
  `%SITE_URL%` in `index.html` (OG/Twitter tags). To move the site, change
  **only** `homepage`.
- Responsive CSS breakpoints: 1060px, 820px (mobile nav, stacked layouts),
  560px. `prefers-reduced-motion` is respected.
- Several source files use CRLF line endings and some use LF — preserve each
  file's own.
- Design language: light "paper" theme, teal (`--teal #0699a8`) + warm yellow
  accents, serif (Georgia) italic flourishes via `--serif`, monospace accents
  via `--mono`, dotted-grid background, tactile decoration (tilted cards,
  sticky notes, tape strips) — laid out with grid/flex, never free-floating
  absolute positioning.
