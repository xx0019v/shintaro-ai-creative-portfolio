import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const STRENGTHS = [
  {
    no: "01",
    title: "Observation",
    en: "I notice small changes in people, space, and workflow, then turn them into better decisions.",
    jp: "人・空間・流れの小さな変化に気づき、より良い判断につなげます。",
  },
  {
    no: "02",
    title: "Communication",
    en: "I can work with different types of people and keep the project atmosphere positive.",
    jp: "さまざまなタイプの人と関わりながら、前向きに進める雰囲気を作ります。",
  },
  {
    no: "03",
    title: "Problem Solving",
    en: "When something does not work, I look for the cause and propose a practical solution.",
    jp: "うまくいかない時に原因を考え、現実的な改善策を提案します。",
  },
  {
    no: "04",
    title: "Creative Direction",
    en: "I think about visual mood, message, user impression, and final output quality.",
    jp: "見た目だけでなく、雰囲気・伝わり方・印象・仕上がりまで考えて制作します。",
  },
  {
    no: "05",
    title: "Execution",
    en: "I do not stop at ideas. I turn ideas into visuals, documents, systems, websites, and presentations.",
    jp: "アイデアで終わらせず、ビジュアル・資料・システム・Webサイト・発表まで形にします。",
  },
  {
    no: "06",
    title: "Adaptability",
    en: "I adjust my approach depending on the project, people, and situation.",
    jp: "プロジェクトや相手、状況に合わせて動き方を調整できます。",
  },
];

export default function Strengths() {
  return (
    <section className="relative py-32 md:py-48 bg-subbase/40">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="08"
          label="Strengths"
          title={
            <>
              I move projects{" "}
              <span className="italic font-light text-champagne">forward.</span>
            </>
          }
          jpTitle="状況を読み、必要なことを実行に変える。"
        />

        <Reveal delay={0.1} className="mt-10 max-w-3xl">
          <p className="text-base md:text-lg text-ivory/85 leading-relaxed">
            I observe the situation, understand what needs to be done, and take
            action. In school projects, creative production, AI-assisted design,
            web development, and event work, I focus on communication,
            improvement, and execution.
          </p>
          <p className="mt-4 font-jpserif text-sm text-muted leading-loose">
            状況を見て、必要なことを考え、周囲と連携しながらプロジェクトを前に進めることを大切にしています。学校プロジェクト、AIを使った制作、Web制作、イベント運営の中で、伝わり方・改善・実行力を意識して行動しています。
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/[0.06]">
          {STRENGTHS.map((s, i) => (
            <Reveal
              as="li"
              key={s.no}
              delay={i * 0.05}
              className="bg-base p-8 md:p-10 group hover:bg-subbase transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="idx text-champagne text-[11px] tracking-wider2">
                  {s.no}
                </span>
                <span className="h-px w-10 bg-champagne/30 mt-2 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-tight">
                {s.title}
              </h3>
              <p className="mt-4 text-sm text-ivory/80 leading-relaxed">
                {s.en}
              </p>
              <p className="mt-3 font-jpserif text-xs text-muted leading-loose">
                {s.jp}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
