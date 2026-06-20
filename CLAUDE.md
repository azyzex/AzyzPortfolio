# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal portfolio website for **Mohamed Aziz Guenni** ("Aziz") — a Tunisian
Full-Stack Web & Mobile Developer (Computer Engineering grad, currently doing a
Professional Master's in Networks Engineering). It is a single-page marketing
site that presents his bio, skills, projects, experience/education timeline,
certificates, LinkedIn recommendations, and contact options.

- `package.json` name: `aziz-portfolio` (v1.0.0)
- Live URL / GitHub Pages base: `https://azyzex.github.io/AzyzPortfolio/`
- Git remote: `https://github.com/azyzex/AzyzPortfolio.git`
- This folder (`NewPortfolio`) is a **rewrite** of an older portfolio. The older
  one (vanilla HTML/CSS/Bootstrap/Typed.js) is itself listed as a project entry
  ("Personal Portfolio Website").

## Stack

- **React 19** + **TypeScript** (`~5.7`), built with **Vite 6**
- **framer-motion** for all animation (entrance reveals, hover, marquees)
- **lucide-react** for icons
- **Tailwind CSS 3** is installed but the UI is styled **entirely by hand-written
  CSS** in `src/styles.css` (BEM-ish class names like `.work-piece`,
  `.collage-id-card`, `.tech-float`). **No Tailwind utility classes are used**; it
  is kept solely for its base reset (preflight), which the layout depends on (e.g.
  zeroed `<p>` margins in About). Treat `src/styles.css` as the real stylesheet.
- ESLint 9 (flat config) with typescript-eslint + react-hooks + react-refresh

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build  -> dist/
npm run preview  # preview the production build
npm run lint     # eslint .
```

There is no test runner wired up despite `@playwright/test` being a devDependency.

## Architecture

Entry: `index.html` -> `src/main.tsx` -> `src/App.tsx`.

`App.tsx` is a flat composition of section components, in render order:

```
<Header />
<main>
  <Hero />            #top
  <About />           #about
  <SkillsTimeline />  #skills (+ #experience timeline, same component)
  <Projects />        #projects
  <Proof />           #certificates (certs + recommendations)
  <Contact />         #contact
</main>
<Footer />
```

### Single source of truth: `src/data/portfolio.ts`

**This is the most important file in the repo.** Almost all content lives here as
typed exports — components are mostly presentational and map over this data. To
change site content, edit this file, not the components. Key exports:

- `profile` — name, title, location, email, phone, bio, photo path, availability
- `navItems` — header navigation (single source of truth; `Header.tsx` imports
  it), plus `focusAreas`, `services`
- `skillGroups` — categorized skills (Frontend / Mobile / Backend / AI / IoT /
  Tools / Languages). `techItems` — the flat tech-stack list rendered by the
  Skills marquee (logos via devicon CDN, per-item `accent` color)
- `projects: Project[]` — 10 projects; `featured: true` ones surface in the
  Projects section (it shows the first 4 featured). Each has `links` with a
  `status` of `available` | `coming-soon` | `needs-file`, plus an `assetHint`
  pointing to where a screenshot should go.
- `experience` / `education` (`TimelineItem[]`) — combined and sliced to 5 in the
  Skills/path timeline
- `certificates: Certificate[]` — 25 entries, each pointing to a file in
  `public/assets/certificates/`
- `recommendations: Recommendation[]` — 5 LinkedIn recommendations with avatars
- `socialLinks`, `cvDownloads`, `proofStats`, `manualAssetChecklist`

Types (`LinkItem`, `Project`, `TimelineItem`, `Certificate`, `Recommendation`)
are defined at the top of the same file.

### Components (`src/components/`)

- `Header.tsx` — sticky pill nav (Work/About/Skills/Proof/Contact); mobile
  hamburger toggles `.nav--open`. Imports `navItems` from `portfolio.ts`.
- `Hero.tsx` — big "Hi, I'm [photo] Aziz." headline with the profile photo
  inlined as a word, plus View work / Resume CTAs.
- `About.tsx` — bio copy + the "about board": a structured CSS-grid composition
  (torn Design/Build/Ship strip → 3 tilted cards: ID badge / terminal `whoami` /
  signed yellow note → folder chips row → stats row with dashed teal divider).
  Cards straighten on hover (`whileHover={{ y: -6, rotate: 0 }}`). It was
  previously an absolutely-positioned collage that overlapped at many widths —
  do not reintroduce absolute positioning here.
- `SkillsTimeline.tsx` — renders **two** sections: an animated marquee
  "tech cloud" (the `techItems` list imported from `portfolio.ts`, devicon CDN
  SVGs, distinct from `skillGroups`) and the experience/education timeline.
- `Projects.tsx` — featured projects as alternating large-media "work pieces".
  When a project has no `image`, it shows an honest placeholder artboard with the
  `assetHint` path. (No project currently has a screenshot — see Assets.)
- `Proof.tsx` — two infinite horizontal marquees: certificates and
  recommendations. Animation durations are computed from item counts ×
  per-card travel constants (`certificateTravelPx` / `recommendationTravelPx`)
  to hold a constant px/s speed — **if card widths change in CSS, update the
  matching travel constant** or the marquee speed visibly changes.
- `Contact.tsx` — contact details + an "Email me" modal. The modal opens on a
  chooser (a primary **Write a message** option plus Gmail/Outlook compose
  links) and **morphs** into a contact form. The morph tweens the card's
  measured content height (`ResizeObserver` → animated `.email-modal__viewport`
  height) while `AnimatePresence mode="popLayout"` crossfades the views — do
  NOT use framer's `layout` prop here, it scale-distorts the children. The
  viewport clips overflow with padding/negative-margin compensation so button
  shadows aren't cut off; the paper tilt lives on the `.email-modal-tilt`
  wrapper. The form POSTs to
  `VITE_FORMSPREE_ENDPOINT` (Formspree); when that env var is unset it falls back
  to a `mailto:` compose so it still works.
- `Footer.tsx`, `SectionHeader.tsx` — small presentational helpers.

### Utilities (`src/utils/`)

- `assets.ts` — `assetPath(path)` prefixes asset paths with Vite's `BASE_URL`
  (`/AzyzPortfolio/`) so they resolve correctly under the GitHub Pages subpath.
  **Always route public-asset URLs through `assetPath()`**; passing through
  external URLs and `mailto:`/`tel:` is handled. Leading slashes are stripped.
- `motion.ts` — shared framer-motion variants: `spring`, `fadeUp`, `softScale`,
  `staggerContainer`, and `viewportOnce` (reveal once on scroll). Reuse these
  instead of inlining transitions.

## Assets (`public/assets/`)

Copied verbatim into `dist/` on build. Current state:

- `profile/1770583574950.jfif` — profile photo ✓ present
- `cv/cv guenni mohamed aziz.pdf` — English CV ✓ present (French CV is
  `needs-file`, intentionally missing)
- `certificates/` — 25 cert images ✓ present (match the 25 data entries)
- `recommendations/<person>/*.png` — 5 avatars ✓ present
- `projects/<slug>/` — **only README placeholders; no real screenshots.** Every
  project therefore renders the placeholder artboard by design. Adding an
  `image` to a project entry + the file here replaces the artboard.

`manualAssetChecklist` in `portfolio.ts` tracks remaining manual asset TODOs.

To enable real contact-form delivery, create a `.env` with
`VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<id>` (see `.env.example`).
Without it the form falls back to opening the visitor's mail client.

## Conventions & gotchas

- Content changes go in `src/data/portfolio.ts`; styling goes in
  `src/styles.css`. Components rarely need editing for content/style tweaks.
- `navItems` (header) and `techItems` (skills marquee) both live in
  `portfolio.ts` and are imported by their components. `skillGroups`, `services`,
  `utilityIcons`, and `manualAssetChecklist` are currently exported but not
  rendered (kept for future sections / as scaffolding).
- `vite.config.ts` derives `base` from `package.json` `homepage` (it strips the
  scheme + host). To move the site (rename repo, custom domain, user-root Pages),
  change **only** `homepage` — `base` follows automatically. Assets resolve via
  `assetPath()` using this base.
- Responsive CSS breakpoints: 1060px, 820px (mobile nav + collage stacking),
  560px. `prefers-reduced-motion` is respected.
- Design language: light "paper" theme, teal (`--teal #0699a8`) + warm yellow
  accents, serif (Georgia) italic flourishes via `--serif`, monospace terminal
  accents via `--mono`, dotted-grid background, tactile decoration (tilted
  cards, sticky notes, torn paper) — but laid out with grid/flex, never
  free-floating absolute positioning.
