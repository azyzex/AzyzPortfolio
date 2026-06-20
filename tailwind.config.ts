import type { Config } from "tailwindcss";

// Tailwind is intentionally minimal here: the site is styled by hand-written CSS
// in src/styles.css, not utility classes. Tailwind is kept for its base reset
// (preflight) — the layout depends on it (e.g. zeroed paragraph margins) — and
// stays available if utility classes are ever needed. The previous `theme`
// color tokens were unused and did not match the real palette, so they were
// removed to avoid implying a design system that isn't wired up.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
