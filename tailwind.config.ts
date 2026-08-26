import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#050505",
        soft: "#111111",
        charcoal: "#1A1A1A",
        silver: "#C0C0C0",
        "silver-bright": "#E5E5E5",
        "silver-muted": "#8E8E8E",
        offwhite: "#F5F5F5",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "var(--font-cormorant)", "serif"],
        display: ["var(--font-dm-serif)", "serif"],
        sans: ["var(--font-inter)", "var(--font-noto-sans-jp)", "system-ui", "sans-serif"],
        jpserif: ["var(--font-noto-serif-jp)", "var(--font-shippori)", "serif"],
        jpsans: ["var(--font-noto-sans-jp)", "system-ui", "sans-serif"],
      },
      letterSpacing: { editorial: "0.22em", wider2: "0.32em" },
      maxWidth: { editorial: "1440px" },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        shine: "shine 8s linear infinite",
        glow: "glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
