import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const CATEGORIES = [
  {
    no: "01",
    title: "AI / System",
    jp: "AI・システム",
    items: [
      "AI Camera Concept",
      "Computer Vision Basics",
      "Raspberry Pi",
      "Edge Processing",
      "API Structure",
      "Data Analytics",
      "Dashboard Planning",
      "Privacy-aware Design",
      "AI-assisted Workflow",
    ],
  },
  {
    no: "02",
    title: "Web / Development",
    jp: "Web・開発",
    items: [
      "Web Design",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Design",
      "Information Architecture",
      "SEO Basics",
      "Launch Preparation",
      "Domain / Deploy Awareness",
    ],
  },
  {
    no: "03",
    title: "Creative / Design",
    jp: "クリエイティブ・デザイン",
    items: [
      "Branding",
      "POP Design",
      "SNS Visual Design",
      "Poster / Flyer Design",
      "Presentation Design",
      "Character Design",
      "Copywriting",
      "Luxury Visual Direction",
      "AI-assisted Visual Production",
    ],
  },
  {
    no: "04",
    title: "Planning / Direction",
    jp: "企画・ディレクション",
    items: [
      "Project Planning",
      "Event Direction",
      "Team Communication",
      "Problem Solving",
      "Presentation",
      "User Experience Thinking",
      "Marketing Ideas",
      "Leadership Support",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="07"
          label="Skills"
          title={
            <>
              A working{" "}
              <span className="italic font-light">vocabulary</span> across AI,
              web, and design.
            </>
          }
          jpTitle="AI・Web・デザイン・企画を横断する実務スキルセット。"
        />

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.no} as="li" delay={i * 0.06}>
              <div className="flex items-center gap-3 mb-6">
                <span className="idx text-champagne text-[11px] tracking-wider2">
                  {cat.no}
                </span>
                <span className="h-px w-8 bg-champagne/40" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-ivory tracking-tight">
                {cat.title}
              </h3>
              <p className="mt-1 font-jpserif text-[11px] text-muted">
                {cat.jp}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <li
                    key={s}
                    className="group px-3 py-1.5 text-[11px] tracking-wider uppercase text-ivory/80 hairline hover:hairline-gold hover:text-ivory transition-colors duration-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
