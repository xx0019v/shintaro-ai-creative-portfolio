"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const ROLE = [
  "Executive Director",
  "Planning Support",
  "Event Preparation",
  "Team Communication",
  "Progress Management",
  "Problem Solving",
];

const STRENGTHS = [
  { en: "Leadership", jp: "リーダーシップ" },
  { en: "Trust from teachers", jp: "先生からの信頼" },
  { en: "Responsibility", jp: "責任感" },
  { en: "Communication", jp: "周囲との連携" },
  { en: "Project management", jp: "進行管理" },
  { en: "Event direction", jp: "企画力" },
  { en: "Proactive action", jp: "主体性" },
];

export default function Leadership() {
  const { lang } = useLang();

  return (
    <section className="relative py-32 md:py-48 bg-soft/40">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="06"
          labelKey="ld_label"
          titleEn={
            <>
              School Children's Program{" "}
              <span className="italic font-light">Event Director</span>
            </>
          }
          jpTitleKey="ld_jp_title"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-7">
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
              {tr("ld_overview", lang)}
            </p>

            <div className="mt-10">
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
                {tr("ld_statement", lang)}
              </p>
              <p className="font-serif text-xl md:text-2xl text-offwhite tracking-tight leading-snug max-w-2xl">
                Trusted with responsibility —{" "}
                <span className="italic font-light">beyond design or technology.</span>
              </p>
              <p className="mt-3 font-jpserif text-sm text-silver-muted leading-loose max-w-2xl">
                {tr("ld_statement_body", lang)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <div className="hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-4">
                {tr("ld_role", lang)}
              </p>
              <ul className="space-y-3 text-sm text-offwhite/85">
                {ROLE.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-3 bg-silver/60" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hairline p-6 mt-6">
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-4">
                {tr("ld_appointment", lang)}
              </p>
              <p className="font-jpserif text-sm text-offwhite/85 leading-loose">
                {tr("ld_appointment_body", lang)}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-20">
          <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-6">
            Strengths shown
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {STRENGTHS.map((s) => (
              <li
                key={s.en}
                className="hairline px-4 py-3 hover:hairline-silver transition-colors"
              >
                <p className="text-sm text-offwhite/85">{s.en}</p>
                <p className="font-jpserif text-[11px] text-silver-muted mt-1">{s.jp}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
