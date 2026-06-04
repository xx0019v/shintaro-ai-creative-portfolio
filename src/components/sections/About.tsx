import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldRule from "@/components/ui/GoldRule";

const PRINCIPLES = [
  {
    no: "01",
    title: "Observation",
    en: "I observe people, situations, and small details to understand what is needed.",
    jp: "人や状況、小さな変化を観察し、必要な行動を考えることを意識しています。",
  },
  {
    no: "02",
    title: "Persistence",
    en: "I keep improving even when things do not work at first.",
    jp: "うまくいかない時も改善を重ね、最後まで粘り強く取り組みます。",
  },
  {
    no: "03",
    title: "Adaptability",
    en: "I adjust my approach depending on the environment, people, and project needs.",
    jp: "環境や相手、目的に合わせて動き方を調整しながら行動できます。",
  },
  {
    no: "04",
    title: "Execution",
    en: "I do not stop at ideas. I turn them into visuals, websites, systems, documents, and presentations.",
    jp: "アイデアで終わらせず、ビジュアル・Webサイト・システム・資料・発表まで形にします。",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="01"
          label="About"
          title={
            <>
              I design with{" "}
              <span className="italic font-light text-ivory/80">technology,</span>{" "}
              observation,{" "}
              <span className="text-champagne">and intention.</span>
            </>
          }
          jpTitle="技術と観察、そして意図でデザインする。"
        />

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7 space-y-6">
            <Reveal>
              <p className="text-base md:text-lg text-ivory/85 leading-relaxed">
                I am an ICT Design student at Chuo Information College, learning
                and creating across AI, web production, visual design, branding,
                and project planning. My goal is not only to make things look
                good, but to design meaningful experiences that solve problems,
                communicate clearly, and move people to action.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-jpserif text-sm md:text-base text-muted leading-loose">
                中央情報大学校 高度ICTデザイン学科で、AI・Web制作・デザイン・ブランディング・企画を横断して学んでいます。見た目だけでなく、目的・伝わり方・使う人の行動まで考えながら、実際に使える形へ落とし込むことを大切にしています。
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.15}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8 text-sm">
                <Meta label="Role" value="AI Creative Developer" />
                <Meta label="Based" value="Gunma · Tokyo, JP" />
                <Meta label="Focus" value="AI · Web · Branding" />
                <Meta label="School" value="Chuo Information College" />
                <Meta label="Department" value="Advanced ICT Design" />
                <Meta label="Available" value="Internship / Project" />
              </dl>
            </Reveal>
          </div>
        </div>

        <GoldRule className="mt-24" />

        {/* Principle cards */}
        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ivory/[0.08]">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.no} delay={i * 0.08} className="px-0 md:px-8 py-10 md:py-0 first:md:pl-0 last:md:pr-0">
              <div className="flex items-start gap-4 mb-6">
                <span className="idx text-champagne text-[11px] tracking-wider2">
                  {p.no}
                </span>
                <span className="h-px w-8 bg-champagne/40 mt-2.5" />
              </div>
              <h3 className="font-serif text-2xl text-ivory tracking-tight">
                {p.title}
              </h3>
              <p className="mt-4 text-sm text-ivory/75 leading-relaxed">
                {p.en}
              </p>
              <p className="mt-3 font-jpserif text-xs text-muted leading-relaxed">
                {p.jp}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-wider2 uppercase text-champagne mb-2">
        {label}
      </dt>
      <dd className="text-ivory/85">{value}</dd>
    </div>
  );
}
