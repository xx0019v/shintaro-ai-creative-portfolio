"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SilverRule from "@/components/ui/SilverRule";
import PortraitFrame from "@/components/ui/PortraitFrame";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

const PRINCIPLES = [
  { no: "01", tKey: "principle_observation_t", bKey: "principle_observation_b" },
  { no: "02", tKey: "principle_persistence_t", bKey: "principle_persistence_b" },
  { no: "03", tKey: "principle_adaptability_t", bKey: "principle_adaptability_b" },
  { no: "04", tKey: "principle_execution_t", bKey: "principle_execution_b" },
] as const;

export default function About() {
  const { lang } = useLang();

  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="01"
          labelKey="about_label"
          titleEn={
            <>
              {tr("about_title_a", lang)}{" "}
              <span className="italic font-light text-offwhite/80">{tr("about_title_b", lang)}</span>{" "}
              {tr("about_title_c", lang)}{" "}
              <span className="metallic">{tr("about_title_d", lang)}</span>
            </>
          }
          jpTitleKey="about_jp_title"
        />

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          {/* portrait (editorial) */}
          <Reveal delay={0.08} className="lg:col-span-4">
            <PortraitFrame
              src="/images/portrait/portrait-full-01.png"
              alt="Avendano Shintaro — editorial portrait"
              variant="full"
            />
            <p className="mt-4 text-[10px] tracking-wider2 uppercase text-silver-muted">
              Portrait · 2026 Edition
            </p>
          </Reveal>

          {/* body + meta */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-6">
              <Reveal>
                <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
                  {tr("about_body_1", lang)}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 text-sm">
                {(
                  [
                    ["about_meta_role", "about_meta_role_v"],
                    ["about_meta_based", "about_meta_based_v"],
                    ["about_meta_focus", "about_meta_focus_v"],
                    ["about_meta_school", "about_meta_school_v"],
                    ["about_meta_dept", "about_meta_dept_v"],
                    ["about_meta_avail", "about_meta_avail_v"],
                  ] as const
                ).map(([k, v]) => (
                  <Meta key={k} labelKey={k} valueKey={v} />
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <SilverRule className="mt-24" />

        {/* principle cards */}
        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-offwhite/[0.08]">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              as="li"
              key={p.no}
              delay={i * 0.08}
              className="px-0 md:px-8 py-10 md:py-0 first:md:pl-0 last:md:pr-0"
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="idx text-silver-bright text-[11px] tracking-wider2">{p.no}</span>
                <span className="h-px w-8 bg-silver/40 mt-2.5" />
              </div>
              <h3 className="font-serif text-2xl text-offwhite tracking-tight">
                {tr(p.tKey, lang)}
              </h3>
              <p className="mt-4 font-jpserif text-sm text-offwhite/75 leading-relaxed">
                {tr(p.bKey, lang)}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Meta({
  labelKey,
  valueKey,
}: {
  labelKey: keyof typeof t;
  valueKey: keyof typeof t;
}) {
  const { lang } = useLang();
  return (
    <div>
      <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-2">
        {tr(labelKey, lang)}
      </dt>
      <dd className="text-offwhite/85 font-jpserif">{tr(valueKey, lang)}</dd>
    </div>
  );
}
