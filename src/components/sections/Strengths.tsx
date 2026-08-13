"use client";

import Reveal from "@/components/ui/Reveal";
import KineticText from "@/components/ui/KineticText";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

const STRENGTHS: {
  no: string;
  tKey: keyof typeof t;
  bKey: keyof typeof t;
  big?: boolean;
}[] = [
  { no: "01", tKey: "strength_obs_t", bKey: "strength_obs_b", big: true },
  { no: "02", tKey: "strength_comm_t", bKey: "strength_comm_b" },
  { no: "03", tKey: "strength_solve_t", bKey: "strength_solve_b" },
  { no: "04", tKey: "strength_direction_t", bKey: "strength_direction_b" },
  { no: "05", tKey: "strength_exec_t", bKey: "strength_exec_b" },
  { no: "06", tKey: "strength_adapt_t", bKey: "strength_adapt_b" },
];

export default function Strengths() {
  const { lang } = useLang();

  return (
    <section id="strengths" className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          variant="wide"
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

        {/* No bento here any more.
            Three sections ran a bento grid — this one, Skills and ClientWork —
            so the device stopped being a choice and became the page's default
            texture. Skills keeps it, because a matrix of disciplines is what a
            bento is actually for. Six qualities are not a matrix; they are a
            list that wants air.

            So: full measure, no boxes, one hairline between entries, the index
            hung out in the left margin. The first entry is set large and the
            rest settle under it, which gives the run a shape without needing
            six frames drawn around it. */}
        <ul className="mt-20">
          {STRENGTHS.map((s, i) => (
            <Reveal
              as="li"
              key={s.no}
              delay={i * 0.05}
              className={`grid grid-cols-1 gap-x-10 gap-y-4 py-12 md:grid-cols-12 ${
                i === 0 ? "" : "border-t border-offwhite/[0.07]"
              }`}
            >
              <div className="flex items-baseline gap-4 md:col-span-2 md:block">
                <span className="idx text-[11px] tracking-wider2 text-silver-bright">
                  {s.no}
                </span>
                <span
                  aria-hidden
                  className="h-px w-10 bg-silver/25 md:mt-4 md:block md:w-12"
                />
              </div>

              <div className="md:col-span-10">
                {s.big ? (
                  <KineticText
                    as="h3"
                    metallic
                    text={tr(s.tKey, lang)}
                    className="font-serif text-3xl leading-[1.02] tracking-tight md:text-5xl lg:text-6xl"
                  />
                ) : (
                  <h3 className="font-serif text-2xl tracking-tight text-offwhite md:text-4xl">
                    {tr(s.tKey, lang)}
                  </h3>
                )}
                <p
                  className={`mt-5 font-jpserif leading-loose text-offwhite/80 ${
                    s.big ? "max-w-2xl text-base md:text-lg" : "max-w-xl text-sm md:text-base"
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
