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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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

const SITE_URL = "https://shintaro-avendano.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shintaro Avendano | AI Creative Developer Portfolio",
    template: "%s | Shintaro Avendano",
  },
  description:
    "Portfolio of Shintaro Avendano, an ICT Design student creating AI camera analytics, web production, branding, visual design, school projects, and AI-assisted creative work.",
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
    "Shintaro Avendano",
  ],
  authors: [{ name: "Shintaro Avendano" }],
  creator: "Shintaro Avendano",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ja_JP",
    title: "Shintaro Avendano | AI Creative Developer Portfolio",
    description:
      "AI camera analytics, web production, branding, and visual design — by Shintaro Avendano, ICT Design student and AI Creative Developer.",
    siteName: "Shintaro Avendano Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shintaro Avendano | AI Creative Developer Portfolio",
    description:
      "AI camera analytics, web production, branding, visual design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${dmSerif.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${shippori.variable}`}
    >
      <body className="bg-base text-ivory font-sans antialiased grain relative">
        {children}
      </body>
    </html>
  );
}
