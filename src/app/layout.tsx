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
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CinemaScroll from "@/components/ui/CinemaScroll";
import FilmBackdrop from "@/components/ui/FilmBackdrop";
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
        <LanguageProvider>
          <LaunchProvider>
            <ScrollToTop />
            <EntrySphere />
            <LiquidLoader />
            <FilmBackdrop />
            <CinemaScroll />
            <ProximityField />
            {/* AmbientBackdrop removed: the drifting dust read as dirt on
                the lens rather than atmosphere. ShaderBackdrop removed too —
                it was WebGL running behind an opaque film canvas. */}
            <ScrollProgress />
            <CustomCursor />
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
