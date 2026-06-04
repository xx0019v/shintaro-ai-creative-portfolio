import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

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
  return (
    <section className="relative py-32 md:py-48 bg-subbase/40">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="06"
          label="Leadership"
          title={
            <>
              School Children's Program{" "}
              <span className="italic font-light">Event Director</span>
            </>
          }
          jpTitle="学校主催の学童イベントにおいて、担当教員から直接任命された実行委員長。"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-7">
            <p className="text-base md:text-lg text-ivory/85 leading-relaxed">
              I was appointed directly by a teacher as the executive director
              for a school-hosted children's program event. In this role, I
              support planning, preparation, communication, and overall project
              progress — taking responsibility, organizing people, and moving
              the project forward.
            </p>
            <p className="mt-4 font-jpserif text-sm text-muted leading-loose">
              担当の先生から直接任命され、実行委員長として企画・準備・進行に関わっています。責任を持って周囲と連携し、プロジェクトを前に進めることに取り組んでいます。
            </p>

            <div className="mt-10">
              <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-3">
                Portfolio Statement
              </p>
              <p className="font-serif text-xl md:text-2xl text-ivory tracking-tight leading-snug max-w-2xl">
                Trusted with responsibility — to support a project{" "}
                <span className="italic font-light">beyond design or technology.</span>
              </p>
              <p className="mt-3 font-jpserif text-sm text-muted leading-loose max-w-2xl">
                デザインや技術だけでなく、責任ある立場で人や企画を動かす力を示す経験です。
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <div className="hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-4">
                Role
              </p>
              <ul className="space-y-3 text-sm text-ivory/85">
                {ROLE.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-3 bg-champagne/60" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hairline p-6 mt-6">
              <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-4">
                Appointment
              </p>
              <p className="text-sm text-ivory/85 leading-relaxed">
                Directly appointed by a teacher — a signal of trust in
                responsibility, communication, and execution.
              </p>
              <p className="mt-2 font-jpserif text-xs text-muted leading-loose">
                担当教員より直接任命。責任感・連携・実行力への信頼を意味する任命です。
              </p>
            </div>
          </Reveal>
        </div>

        {/* Strengths shown */}
        <Reveal delay={0.15} className="mt-20">
          <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-6">
            Strengths shown
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {STRENGTHS.map((s) => (
              <li
                key={s.en}
                className="hairline px-4 py-3 hover:hairline-gold transition-colors"
              >
                <p className="text-sm text-ivory/85">{s.en}</p>
                <p className="font-jpserif text-[11px] text-muted mt-1">{s.jp}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
