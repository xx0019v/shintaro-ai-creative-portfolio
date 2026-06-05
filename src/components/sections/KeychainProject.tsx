"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SilverRule from "@/components/ui/SilverRule";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const PROCESS = [
  { no: "01", en: "Observe each teacher's personality and features", jp: "先生ごとの特徴や雰囲気を観察" },
  { no: "02", en: "Decide the visual direction", jp: "ビジュアル方向性を決定" },
  { no: "03", en: "Generate and compare AI-assisted ideas", jp: "AIを活用して複数案を作成" },
  { no: "04", en: "Refine expression, pose, color, texture", jp: "表情・ポーズ・色・質感を調整" },
  { no: "05", en: "Prepare design for keychain production", jp: "キーホルダー制作に向けてデータを整える" },
];

const ROLES = [
  "Visual Design",
  "AI-assisted Creation",
  "Character Direction",
  "Concept Development",
  "Design Refinement",
  "Print Data Preparation",
];

export default function KeychainProject() {
  const { lang } = useLang();

  return (
    <section className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="05"
          labelKey="kc_label"
          titleEn={
            <>
              Teacher Character{" "}
              <span className="italic font-light">Keychain</span> Project
            </>
          }
          jpTitleKey="kc_jp_title"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
              {tr("kc_overview", lang)}
            </p>

            <div className="mt-10 hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
                {tr("kc_ai_label", lang)}
              </p>
              <p className="font-jpserif text-sm text-offwhite/85 leading-loose">
                {tr("kc_ai_body", lang)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-4">
              {tr("kc_role", lang)}
            </p>
            <ul className="grid grid-cols-1 gap-3 text-sm text-offwhite/85">
              {ROLES.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-3 hairline px-4 py-3 hover:hairline-silver transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-silver-bright" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-16">
          <KeychainGallery />
        </Reveal>

        <SilverRule className="mt-24" />

        <Reveal className="mt-20">
          <h3 className="font-serif text-2xl md:text-3xl text-offwhite tracking-tight">
            {tr("kc_process", lang)}
          </h3>
          <p className="mt-2 font-jpserif text-xs text-silver-muted">制作プロセス</p>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-3">
          {PROCESS.map((p, i) => (
            <Reveal key={p.no} delay={0.05 * i} as="li" className="relative hairline p-6">
              <span className="text-silver-bright idx text-[11px] tracking-wider2">{p.no}</span>
              <p className="mt-4 text-sm text-offwhite/85 leading-relaxed">{p.en}</p>
              <p className="mt-2 font-jpserif text-xs text-silver-muted leading-relaxed">{p.jp}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-12">
          <p className="text-[10px] tracking-wider2 uppercase text-silver-muted">Note · 注記</p>
          <p className="mt-2 font-jpserif text-sm text-silver-muted max-w-3xl leading-loose">
            {tr("kc_privacy", lang)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function KeychainGallery() {
  // 3 abstract concept cards — privacy-safe, monochrome
  const concepts = [
    { label: "Concept A", sub: "Quiet" },
    { label: "Concept B", sub: "Bright" },
    { label: "Concept C", sub: "Steady" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {concepts.map((c, i) => (
        <div
          key={i}
          className="relative aspect-[3/4] hairline overflow-hidden group hover:hairline-silver transition-colors"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                i === 0
                  ? "linear-gradient(180deg, #1A1A1A 0%, #050505 100%)"
                  : i === 1
                  ? "radial-gradient(ellipse at 35% 30%, rgba(229,229,229,0.16) 0%, transparent 60%), linear-gradient(180deg, #141414, #050505)"
                  : "linear-gradient(180deg, #0E0E0E, #050505)",
            }}
          />
          <svg
            className="absolute top-4 left-1/2 -translate-x-1/2"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <circle cx="17" cy="17" r="6" stroke="#C0C0C0" strokeOpacity="0.6" />
            <line x1="17" y1="23" x2="17" y2="34" stroke="#C0C0C0" strokeOpacity="0.6" />
          </svg>
          <div className="absolute inset-x-6 top-16 bottom-16 hairline-silver flex items-end justify-center pb-6">
            <div className="w-12 h-12 rounded-full bg-offwhite/15 mb-3" />
          </div>
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] tracking-wider2 uppercase">
            <span className="text-offwhite/80">{c.label}</span>
            <span className="text-silver-bright">{c.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
