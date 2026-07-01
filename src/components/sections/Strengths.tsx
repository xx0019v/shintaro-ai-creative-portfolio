"use client";

import Reveal from "@/components/ui/Reveal";
import KineticText from "@/components/ui/KineticText";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

// span = desktop bento footprint; the first piece reads large, the rest
// settle asymmetrically around it (never a uniform card wall).
const STRENGTHS: {
  no: string;
  tKey: keyof typeof t;
  bKey: keyof typeof t;
  span: string;
  big?: boolean;
}[] = [
  { no: "01", tKey: "strength_obs_t", bKey: "strength_obs_b", span: "bento-col-6 bento-row-2", big: true },
  { no: "02", tKey: "strength_comm_t", bKey: "strength_comm_b", span: "bento-col-6" },
  { no: "03", tKey: "strength_solve_t", bKey: "strength_solve_b", span: "bento-col-6" },
  { no: "04", tKey: "strength_direction_t", bKey: "strength_direction_b", span: "bento-col-4" },
  { no: "05", tKey: "strength_exec_t", bKey: "strength_exec_b", span: "bento-col-4" },
  { no: "06", tKey: "strength_adapt_t", bKey: "strength_adapt_b", span: "bento-col-4" },
];

export default function Strengths() {
  const { lang } = useLang();

  return (
    <section id="strengths" className="relative py-32 md:py-48 bg-soft/40">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="08"
          labelKey="st_label"
          titleEn={
            <>
              {tr("st_title_a", lang)}{" "}
              <span className="italic font-light">{tr("st_title_b", lang)}</span>{" "}
              <span className="metallic">{tr("st_title_c", lang)}</span>
            </>
          }
          jpTitleKey="st_jp_title"
        />

        <Reveal delay={0.1} className="mt-10 max-w-3xl">
          <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
            {tr("st_body", lang)}
          </p>
        </Reveal>

        {/* Bento — asymmetric, glass-edged, proximity-reactive */}
        <ul className="bento mt-16">
          {STRENGTHS.map((s, i) => (
            <Reveal
              as="li"
              key={s.no}
              delay={i * 0.05}
              proximity
              className={`bento-cell group flex flex-col ${s.span} ${
                s.big ? "justify-between" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="idx text-silver-bright text-[11px] tracking-wider2">{s.no}</span>
                <span className="h-px w-10 bg-silver/30 mt-2 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
              <div>
                {s.big ? (
                  <KineticText
                    as="h3"
                    text={tr(s.tKey, lang)}
                    className="font-serif text-3xl md:text-4xl lg:text-5xl text-offwhite tracking-tight"
                  />
                ) : (
                  <h3 className="font-serif text-2xl md:text-3xl text-offwhite tracking-tight">
                    {tr(s.tKey, lang)}
                  </h3>
                )}
                <p
                  className={`mt-4 font-jpserif text-offwhite/80 leading-loose ${
                    s.big ? "text-base md:text-lg max-w-md" : "text-sm"
                  }`}
                >
                  {tr(s.bKey, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
