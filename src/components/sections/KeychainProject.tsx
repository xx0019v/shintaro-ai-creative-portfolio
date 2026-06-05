"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SilverRule from "@/components/ui/SilverRule";
import EditorialFrame from "@/components/ui/EditorialFrame";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const PROCESS = [
  { no: "01", en: "Observe each teacher's personality and features", jp: "先生ごとの特徴や雰囲気を観察" },
  { no: "02", en: "Decide the visual direction", jp: "ビジュアル方向性を決定" },
  { no: "03", en: "Generate and compare AI-assisted ideas", jp: "AIを活用して複数案を作成" },
  { no: "04", en: "Refine expression, pose, color, texture", jp: "表情・ポーズ・色・質感を調整" },
  { no: "05", en: "Prepare design for keychain production", jp: "キーホルダー制作に向けてデータを整える" },
];

const ROLES = [
  "Visual Design",
  "AI-assisted Creation",
  "Character Direction",
  "Concept Development",
  "Design Refinement",
  "Print Data Preparation",
];

export default function KeychainProject() {
  const { lang } = useLang();

  return (
    <section className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="05"
          labelKey="kc_label"
          titleEn={
            <>
              Teacher Character{" "}
              <span className="italic font-light">Keychain</span> Project
            </>
          }
          jpTitleKey="kc_jp_title"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
              {tr("kc_overview", lang)}
            </p>

            <div className="mt-10 hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
                {tr("kc_ai_label", lang)}
              </p>
              <p className="font-jpserif text-sm text-offwhite/85 leading-loose">
                {tr("kc_ai_body", lang)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-4">
              {tr("kc_role", lang)}
            </p>
            <ul className="grid grid-cols-1 gap-3 text-sm text-offwhite/85">
              {ROLES.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-3 hairline px-4 py-3 hover:hairline-silver transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-silver-bright" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Hero — strongest piece: Teacher Editorial Charm Collection */}
        <Reveal delay={0.15} className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <EditorialFrame
                src="/images/keychain/keychain-uchiike-collection.jpg"
                alt="Teacher Editorial Charm Collection — 7 round acrylic keychains"
                ratio="portrait"
                caption="Teacher Editorial Charm Collection"
                desaturate
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <div className="md:col-span-5 space-y-6">
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 01 · Charm Collection
                </p>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl text-offwhite tracking-tight">
                  7 Daily Moments
                </h3>
                <p className="mt-4 font-jpserif text-sm text-offwhite/80 leading-loose">
                  「日常の7つの瞬間を、いつでも、もう一度に。」FOCUS / WORK MODE / OK / CHECKING / BREAK / CHARGE / CALL ─ ひとりの先生の7表情を、コレクションとしてデザインしました。
                </p>
              </div>
              <SilverRule />
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Material
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">アクリル / 70mm Round</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Attachment
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">メタルリング</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Series
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">7 表情 / コレクション</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Tone
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">エディトリアル写真</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Two supporting concepts side by side */}
        <Reveal className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <EditorialFrame
                src="/images/keychain/keychain-arisu.jpg"
                alt="Keychain concept — A-sensei, 'やる気MAX!' edition"
                ratio="square"
                caption="Concept · Energetic Edition"
                desaturate
              />
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 02 · Energetic
                </p>
                <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
                  「やる気MAX！」手描きタイポと吹き出しで先生のキャラクターを増幅。元気・前向き・親しみやすさを軸にした明快な一枚。
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <EditorialFrame
                src="/images/keychain/keychain-fukukocho.jpg"
                alt="Keychain concept — anime-style portrait at desk"
                ratio="square"
                caption="Concept · Anime Portrait"
                desaturate
              />
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 03 · Anime Portrait
                </p>
                <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
                  「今日どうしたん？」ですわる先生のひと時を、アニメ調イラストで温かく描写。素材感とブラシのリズムで「日常らしさ」を残す。
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <SilverRule className="mt-24" />

        {/* Process timeline */}
        <Reveal className="mt-20">
          <h3 className="font-serif text-2xl md:text-3xl text-offwhite tracking-tight">
            {tr("kc_process", lang)}
          </h3>
          <p className="mt-2 font-jpserif text-xs text-silver-muted">制作プロセス</p>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-3">
          {PROCESS.map((p, i) => (
            <Reveal key={p.no} delay={0.05 * i} as="li" className="relative hairline p-6">
              <span className="text-silver-bright idx text-[11px] tracking-wider2">{p.no}</span>
              <p className="mt-4 text-sm text-offwhite/85 leading-relaxed">{p.en}</p>
              <p className="mt-2 font-jpserif text-xs text-silver-muted leading-relaxed">{p.jp}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-12">
          <p className="text-[10px] tracking-wider2 uppercase text-silver-muted">Note · 注記</p>
          <p className="mt-2 font-jpserif text-sm text-silver-muted max-w-3xl leading-loose">
            {tr("kc_privacy", lang)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
