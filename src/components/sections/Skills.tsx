"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

const CATEGORIES: {
  no: string;
  titleKey: keyof typeof t;
  jpKey: keyof typeof t;
  items: string[];
}[] = [
  {
    no: "01",
    titleKey: "sk_cat_ai",
    jpKey: "sk_cat_ai_jp",
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
    titleKey: "sk_cat_web",
    jpKey: "sk_cat_web_jp",
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
    titleKey: "sk_cat_creative",
    jpKey: "sk_cat_creative_jp",
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
    titleKey: "sk_cat_plan",
    jpKey: "sk_cat_plan_jp",
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
  const { lang } = useLang();

  return (
    <section id="skills" className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="07"
          labelKey="sk_label"
          titleEn={
            <>
              {tr("sk_title_a", lang)}{" "}
              <span className="italic font-light">{tr("sk_title_b", lang)}</span>{" "}
              {tr("sk_title_c", lang)}
            </>
          }
          jpTitleKey="sk_jp_title"
        />

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.no} as="li" delay={i * 0.06}>
              <div className="flex items-center gap-3 mb-6">
                <span className="idx text-silver-bright text-[11px] tracking-wider2">{cat.no}</span>
                <span className="h-px w-8 bg-silver/40" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-offwhite tracking-tight">
                {tr(cat.titleKey, lang)}
              </h3>
              <p className="mt-1 font-jpserif text-[11px] text-silver-muted">
                {tr(cat.jpKey, lang)}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <li
                    key={s}
                    className="px-3 py-1.5 text-[11px] tracking-wider uppercase text-offwhite/80 hairline hover:hairline-silver hover:text-offwhite transition-colors duration-300"
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
