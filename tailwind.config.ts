import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0B0B",
        subbase: "#141414",
        ivory: "#F5F1EA",
        champagne: "#C8A96A",
        muted: "#A8A29A",
        softwhite: "#F7F4EF",
        fragrance: {
          pink: "#E8C9C2",
          beige: "#D8C4A8",
          lavender: "#C6BFD0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "var(--font-cormorant)", "serif"],
        display: ["var(--font-dm-serif)", "serif"],
        sans: ["var(--font-inter)", "var(--font-noto-sans-jp)", "system-ui", "sans-serif"],
        jpserif: ["var(--font-noto-serif-jp)", "var(--font-shippori)", "serif"],
        jpsans: ["var(--font-noto-sans-jp)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.22em",
        wider2: "0.32em",
      },
      maxWidth: {
        editorial: "1440px",
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.94 0 0 0 0 0.91 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        "gold-line":
          "linear-gradient(90deg, transparent 0%, rgba(200,169,106,0) 0%, rgba(200,169,106,0.7) 50%, rgba(200,169,106,0) 100%)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.55" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        glow: "glow 8s ease-in-out infinite",
        marquee: "marquee 60s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
