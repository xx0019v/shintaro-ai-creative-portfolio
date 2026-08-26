import type { Metadata, Viewport } from "next";
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  DM_Serif_Display,
  Noto_Sans_JP,
  Noto_Serif_JP,
  Shippori_Mincho,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { LaunchProvider } from "@/context/LaunchContext";
import EntrySphere from "@/components/ui/EntrySphere";
import LiquidLoader from "@/components/ui/LiquidLoader";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CinemaScroll from "@/components/ui/CinemaScroll";
import ProximityField from "@/components/ui/ProximityField";
import GestureControl from "@/components/ui/GestureControl";
import SoundToggle from "@/components/ui/SoundToggle";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});
const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-shippori",
  display: "swap",
});

const SITE_URL = "https://shintaro-ai-creative-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Avendano Shintaro | AI Creative Developer Portfolio",
    template: "%s | Avendano Shintaro",
  },
  description:
    "Portfolio of Avendano Shintaro — AI Creative Developer. AI camera analytics, web production, branding, visual design, and project direction.",
  keywords: [
    "AI Creative Developer",
    "ICT Design Student",
    "Web Design",
    "AI Camera",
    "Portfolio",
    "Branding",
    "Visual Design",
    "Fragrance Vending Machine",
    "Online English Website",
    "Character Design",
    "Avendano Shintaro",
  ],
  authors: [{ name: "Avendano Shintaro" }],
  creator: "Avendano Shintaro",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    title: "Avendano Shintaro | AI Creative Developer Portfolio",
    description:
      "AI camera analytics, web production, branding, and visual design — by Avendano Shintaro.",
    siteName: "Avendano Shintaro Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avendano Shintaro | AI Creative Developer Portfolio",
    description: "AI · Web · Branding · Visual Design",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${dmSerif.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${shippori.variable}`}
    >
      <body className="bg-base text-offwhite font-sans antialiased">
        {/* Skip link. The page is a single ~29,000px document behind a fixed
            header, so without this a keyboard visitor tabs the whole nav on
            every arrival before reaching a word of content. Visible only when
            focused, which is the one moment it is useful. */}
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[200] inline-flex min-h-[44px] items-center bg-offwhite px-4 text-[11px] uppercase tracking-wider2 text-base"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <LaunchProvider>
            <ScrollToTop />
            <EntrySphere />
            <LiquidLoader />
            <CinemaScroll />
            <ProximityField />
            {/* AmbientBackdrop removed: the drifting dust read as dirt on
                the lens rather than atmosphere. ShaderBackdrop removed too:
                it was WebGL running behind an opaque film canvas.

                FilmBackdrop is now retired as well, and it is worth writing
                down why, because it looked like the most expensive thing on
                the page and it was.

                Measured, not guessed: the canvas sat under a scrim of
                rgba(5,5,5,0.74..0.95) plus a radial vignette to
                rgba(5,5,5,0.6) plus a 2px backdrop-blur across the full
                viewport. Sampling the composited result at five points across
                several scroll positions returned rgb(1,1,1) to rgb(16,18,15).
                So 477 frames and 30MB of footage were being knocked back to
                something a reader cannot distinguish from the #050505 ground
                the body already paints — while holding open a permanent rAF
                loop and a full-viewport blur layer.

                It was also borrowed: a fashion film of a model on a runway,
                which is not the fragrance vending machine, the AI camera, the
                keychain or the children's event. The world the page moved
                through belonged to someone else.

                The ground is now CinemaScroll's silver key light over the base
                colour: one designed surface instead of three stacked ones. */}
            <ScrollProgress />
            {children}
            {/* AtelierFrame and SectionIndex are gone.
                Between them they drew a border, four corner ticks, a ruler, a
                marker, a chapter label and a signature ticker over every
                screen, plus a column of nav dots — all decoration, all
                permanent. A 100px mercury headline surrounded by instruments
                reads as a dashboard, not as work. The reference this site is
                aimed at puts NOTHING in the corners. ScrollProgress already
                reports position, so the dots were saying it twice. */}
            <GestureControl />
            <SoundToggle />
            <ChatWidget />
          </LaunchProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
