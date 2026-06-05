import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18201d",
        muted: "#5f6f68",
        line: "#dfe8e3",
        accent: "#1f8a70",
        accentSoft: "#e8f5f1",
        skySoft: "#eaf4fb",
      },
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
