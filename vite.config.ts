import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// Single source of truth for the GitHub Pages path is package.json "homepage".
// `base` is derived from it so the two can never drift out of sync (a mismatch
// would cause assets to 404). e.g. "https://azyzex.github.io/AzyzPortfolio/"
// -> base "/AzyzPortfolio/". Strips the scheme+host, keeping the trailing slash.
const base = pkg.homepage.replace(/^https?:\/\/[^/]+/, "") || "/";

export default defineConfig({
  base,
  plugins: [react()],
});
