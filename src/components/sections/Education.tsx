import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const TIMELINE = [
  {
    year: "2024 — Present",
    title: "Chuo Information College",
    jp: "専門学校 中央情報大学校",
    sub: "Advanced ICT Design Department",
    subjp: "高度ICTデザイン学科",
    note: "Expected graduation · 2028",
  },
  {
    year: "2021 — 2024",
    title: "Maebashi Technical High School",
    jp: "群馬県立前橋工業高等学校",
    sub: "Foundations in engineering and design",
    subjp: "工学・設計の基礎",
  },
];

const CERTS = [
  {
    en: "Second-Class Electrician",
    jp: "第二種電気工事士",
  },
  {
    en: "Information Processing Engineer Ability Certification (Grade 2 · Part 1)",
    jp: "情報処理技術者能力認定試験 2級1部",
  },
  {
    en: "Business Manners Certification (Grade 3)",
    jp: "社会人常識マナー検定試験 3級",
  },
];

export default function Education() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="09"
          label="Education & Certifications"
          title={
            <>
              A quiet record of{" "}
              <span className="italic font-light">learning,</span> proof, and{" "}
              <span className="text-champagne">practice.</span>
            </>
          }
          jpTitle="学びと、その証明。"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Education timeline */}
          <div className="md:col-span-7">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-6">
              Education
            </p>
            <ol className="space-y-12">
              {TIMELINE.map((t, i) => (
                <Reveal as="li" key={t.title} delay={i * 0.08}>
                  <div className="grid grid-cols-12 gap-6 items-start">
                    <div className="col-span-12 md:col-span-4">
                      <p className="font-serif text-xl md:text-2xl text-champagne tracking-tight">
                        {t.year}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-8 border-t border-ivory/[0.08] pt-4">
                      <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-tight">
                        {t.title}
                      </h3>
                      <p className="mt-2 font-jpserif text-sm text-muted">
                        {t.jp}
                      </p>
                      <p className="mt-4 text-sm text-ivory/80">{t.sub}</p>
                      <p className="font-jpserif text-xs text-muted mt-1">
                        {t.subjp}
                      </p>
                      {t.note && (
                        <p className="mt-4 text-[10px] tracking-wider2 uppercase text-champagne">
                          {t.note}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Certifications */}
          <div className="md:col-span-5">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-6">
              Certifications
            </p>
            <ul className="space-y-5">
              {CERTS.map((c, i) => (
                <Reveal as="li" key={c.en} delay={i * 0.06} className="hairline p-5">
                  <p className="text-sm text-ivory/90">{c.en}</p>
                  <p className="mt-2 font-jpserif text-xs text-muted">
                    {c.jp}
                  </p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2} className="mt-10 hairline-gold p-5">
              <p className="text-[10px] tracking-wider2 uppercase text-champagne">
                Now studying
              </p>
              <p className="mt-2 text-sm text-ivory/85">
                AI camera systems, web production at production-grade quality,
                visual direction for brand experiences.
              </p>
              <p className="mt-2 font-jpserif text-xs text-muted leading-loose">
                AIカメラ、実務水準のWeb制作、ブランド体験のビジュアル設計。
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
