import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Noto_Sans_JP, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const SITE_URL = "https://shintaro-ai-creative-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Avendaño Shintaro — Creative Technologist",
  description:
    "AIカメラ、Web、ブランド表現を横断し、企画から実装まで手を動かすICTデザイン学生 Avendaño Shintaro のポートフォリオ。",
  authors: [{ name: "Avendaño Shintaro" }],
  creator: "Avendaño Shintaro",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    title: "Avendaño Shintaro — Creative Technologist",
    description: "AIで考え、Webで動かす。体験までつくるICTデザイン学生。",
    siteName: "Avendaño Shintaro Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avendaño Shintaro — Creative Technologist",
    description: "AI · Web · Visual Direction",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${plexMono.variable} ${notoSansJP.variable}`}
    >
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
