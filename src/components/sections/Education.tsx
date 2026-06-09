"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

export default function Education() {
  const { lang } = useLang();

  const timeline: {
    periodKey: Parameters<typeof tr>[0];
    titleKey: Parameters<typeof tr>[0];
    deptKey: Parameters<typeof tr>[0];
    noteKey?: Parameters<typeof tr>[0];
  }[] = [
    {
      periodKey: "ed_school_a_period",
      titleKey: "ed_school_a",
      deptKey: "ed_school_a_dept",
      noteKey: "ed_school_a_note",
    },
    {
      periodKey: "ed_school_b_period",
      titleKey: "ed_school_b",
      deptKey: "ed_school_b_dept",
    },
  ];

  const certs = [
    { enKey: "ed_cert_1_en", jpKey: "ed_cert_1_jp" },
    { enKey: "ed_cert_2_en", jpKey: "ed_cert_2_jp" },
    { enKey: "ed_cert_3_en", jpKey: "ed_cert_3_jp" },
  ] as const;

  return (
    <section className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="09"
          labelKey="ed_label"
          titleEn={
            <>
              {tr("ed_title_a", lang)}{" "}
              <span className="italic font-light">{tr("ed_title_b", lang)}</span>{" "}
              {tr("ed_title_c", lang)}{" "}
              <span className="metallic">{tr("ed_title_d", lang)}</span>
            </>
          }
          jpTitleKey="ed_jp_title"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-6">
              {tr("ed_education", lang)}
            </p>
            <ol className="space-y-12">
              {timeline.map((t, i) => (
                <Reveal as="li" key={t.titleKey} delay={i * 0.08}>
                  <div className="grid grid-cols-12 gap-6 items-start">
                    <div className="col-span-12 md:col-span-4">
                      <p className="font-serif text-xl md:text-2xl text-silver-bright tracking-tight">
                        {tr(t.periodKey, lang)}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-8 border-t border-offwhite/[0.08] pt-4">
                      <h3 className="font-serif text-2xl md:text-3xl text-offwhite tracking-tight">
                        {tr(t.titleKey, lang)}
                      </h3>
                      <p className="mt-4 font-jpserif text-sm text-offwhite/80">
                        {tr(t.deptKey, lang)}
                      </p>
                      {t.noteKey && (
                        <p className="mt-4 text-[10px] tracking-wider2 uppercase text-silver-bright">
                          {tr(t.noteKey, lang)}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="md:col-span-5">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-6">
              {tr("ed_certs", lang)}
            </p>
            <ul className="space-y-5">
              {certs.map((c, i) => (
                <Reveal as="li" key={c.enKey} delay={i * 0.06} className="hairline p-5">
                  <p className="text-sm text-offwhite/90">{tr(c.enKey, lang)}</p>
                  {tr(c.jpKey, lang) && (
                    <p className="mt-2 font-jpserif text-xs text-silver-muted">
                      {tr(c.jpKey, lang)}
                    </p>
                  )}
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2} className="mt-10 hairline-silver p-5">
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                {tr("ed_now", lang)}
              </p>
              <p className="mt-2 font-jpserif text-sm text-offwhite/85 leading-loose">
                {tr("ed_now_body", lang)}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
