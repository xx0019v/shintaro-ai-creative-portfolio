import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F3F0E8",
        ink: "#171713",
        cobalt: "#3157FF",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "var(--font-noto-sans-jp)", "sans-serif"],
        sans: ["var(--font-noto-sans-jp)", "var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      maxWidth: { studio: "1440px" },
    },
  },
  plugins: [],
};

export default config;
