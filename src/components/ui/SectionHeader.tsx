"use client";

import Reveal from "./Reveal";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

interface Props {
  index: string;
  labelKey: keyof typeof t;
  titleEn: React.ReactNode;
  jpTitleKey?: keyof typeof t;
  align?: "left" | "center";
}

export default function SectionHeader({
  index,
  labelKey,
  titleEn,
  jpTitleKey,
  align = "left",
}: Props) {
  const { lang } = useLang();
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <Reveal>
        <div
          className={`flex items-center gap-4 text-[10px] tracking-wider2 text-silver uppercase ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="idx">{index}</span>
          <span className="h-px w-10 bg-silver/40" />
          <span>{tr(labelKey, lang)}</span>
        </div>
      </Reveal>

      {/* English headline stays for editorial impact in BOTH modes.
          Cinematic develop + a slightly longer beat so the title arrives a
          touch after the label — each section reads as its own scene opening. */}
      <Reveal delay={0.14} duration={1.5} cinematic>
        <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-offwhite">
          {titleEn}
        </h2>
      </Reveal>

      {jpTitleKey && (
        <Reveal delay={0.26}>
          <p className="mt-4 font-jpserif text-sm md:text-base text-silver-muted tracking-wide">
            {tr(jpTitleKey, lang)}
          </p>
        </Reveal>
      )}
    </div>
  );
}
