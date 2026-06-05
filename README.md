# Mohamed Aziz Guenni Portfolio

Light, minimal, personal portfolio built with React, Vite, TypeScript, and Tailwind.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The app is configured for GitHub Pages under `/AzyzPortfolio/`.

## Deploy To GitHub Pages

This repo includes `.github/workflows/deploy.yml`.

Manual GitHub setup:

1. Push this project to the `azyzex/AzyzPortfolio` repository on the `main` branch.
2. In GitHub, open repository Settings -> Pages.
3. Set the Pages source to GitHub Actions.
4. Push to `main` or run the workflow manually.

## Manual Content To Add

- Add your profile photo in `public/assets/profile/` and set `profile.photo` in `src/data/portfolio.ts`.
- Add project screenshots inside the matching `public/assets/projects/<project>/` folders and set each project's `image`.
- Add certificate image/PDF files in `public/assets/certificates/` and set each certificate's `file`.
- Add English and French CV PDFs in `public/assets/cv/`, then update `cvDownloads` status from `needs-file`.
- Paste exact recommendation quotes in `recommendations` inside `src/data/portfolio.ts`.
- Create a Formspree form endpoint and set `VITE_FORMSPREE_ENDPOINT` in a local `.env` file.
