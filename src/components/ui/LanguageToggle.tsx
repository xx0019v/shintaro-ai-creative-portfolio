"use client";

import { useLang } from "@/context/LanguageContext";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language toggle"
      className={`inline-flex items-center text-[10px] tracking-wider2 uppercase hairline-silver overflow-hidden ${className}`}
    >
      <button
        onClick={() => setLang("jp")}
        aria-pressed={lang === "jp"}
        className={`px-3 py-1.5 transition-colors duration-300 ${
          lang === "jp" ? "bg-silver-bright text-base" : "text-silver hover:text-offwhite"
        }`}
      >
        JP
      </button>
      <span className="h-3 w-px bg-silver/30" />
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1.5 transition-colors duration-300 ${
          lang === "en" ? "bg-silver-bright text-base" : "text-silver hover:text-offwhite"
        }`}
      >
        EN
      </button>
    </div>
  );
}
