import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// Single source of truth for the GitHub Pages path is package.json "homepage".
// `base` is derived from it so the two can never drift out of sync (a mismatch
// would cause assets to 404). e.g. "https://azyzex.github.io/AzyzPortfolio/"
// -> base "/AzyzPortfolio/". Strips the scheme+host, keeping the trailing slash.
const base = pkg.homepage.replace(/^https?:\/\/[^/]+/, "") || "/";

// Open Graph tags need absolute URLs, and index.html can't read package.json on
// its own. Rather than hardcoding the domain a second time, `%SITE_URL%` in the
// HTML is substituted here so "homepage" stays the single source of truth.
const siteUrl = pkg.homepage.replace(/\/?$/, "/");

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: "inject-site-url",
      transformIndexHtml(html) {
        return html.replaceAll("%SITE_URL%", siteUrl);
      },
    },
  ],
});
