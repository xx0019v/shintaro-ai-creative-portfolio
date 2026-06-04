import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldRule from "@/components/ui/GoldRule";

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
  return (
    <section className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="05"
          label="School Project"
          title={
            <>
              Teacher Character{" "}
              <span className="italic font-light">Keychain</span> Project
            </>
          }
          jpTitle="先生方をモデルにした、AI活用型キャラクターキーホルダー制作プロジェクト。"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="text-base md:text-lg text-ivory/85 leading-relaxed">
              I participate in a school project that creates original keychain
              designs based on teachers. My role is visual design — capturing
              each teacher's atmosphere, personality, expression, and memorable
              features, then turning them into appealing character visuals.
            </p>
            <p className="mt-4 font-jpserif text-sm text-muted leading-loose">
              現在、学校内で先生方をモデルにしたキーホルダー制作プロジェクトに参加し、主にデザイン面を担当しています。先生ごとの雰囲気・表情・特徴・仕草が伝わるように、ビジュアル方向性や仕上がりを意識して制作中です。
            </p>

            <div className="mt-10 hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-3">
                AI as a creative partner
              </p>
              <p className="text-sm text-ivory/85 leading-relaxed">
                I use AI tools not as a shortcut, but as a creative partner for
                idea exploration, character direction, visual variation, texture
                study, and design refinement.
              </p>
              <p className="mt-3 font-jpserif text-xs text-muted leading-loose">
                AIを単なる自動生成ツールではなく、案出し・キャラクター表現・方向性確認・質感検討・仕上がり改善のための制作パートナーとして活用しています。
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-4">
              Role
            </p>
            <ul className="grid grid-cols-1 gap-3 text-sm text-ivory/85">
              {ROLES.map((r) => (
                <li key={r} className="flex items-center gap-3 hairline px-4 py-3 hover:hairline-gold transition-colors">
                  <span className="h-1 w-1 rounded-full bg-champagne" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-16">
          <KeychainGallery />
        </Reveal>

        <GoldRule className="mt-24" />

        {/* Process timeline */}
        <Reveal className="mt-20">
          <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-tight">
            Creative Process
          </h3>
          <p className="mt-2 font-jpserif text-xs text-muted">制作プロセス</p>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-3">
          {PROCESS.map((p, i) => (
            <Reveal key={p.no} delay={0.05 * i} as="li" className="relative hairline p-6">
              <span className="text-champagne idx text-[11px] tracking-wider2">
                {p.no}
              </span>
              <p className="mt-4 text-sm text-ivory/85 leading-relaxed">
                {p.en}
              </p>
              <p className="mt-2 font-jpserif text-xs text-muted leading-relaxed">
                {p.jp}
              </p>
            </Reveal>
          ))}
        </ol>

        {/* Note */}
        <Reveal delay={0.1} className="mt-12">
          <p className="text-[10px] tracking-wider2 uppercase text-muted">
            Note · 注記
          </p>
          <p className="mt-2 text-sm text-ivory/75 max-w-2xl leading-relaxed">
            Real photographs and names of teachers are not displayed in this
            portfolio without permission. Illustrated, abstracted, or sample
            visuals are used to respect personal privacy.
          </p>
          <p className="mt-2 font-jpserif text-xs text-muted max-w-2xl leading-loose">
            先生の顔写真や実名は許可なく公開せず、本ポートフォリオでは抽象化・サンプル表示で取り扱っています。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function KeychainGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {[
        { tone: "warm", label: "Concept A", sub: "Quiet" },
        { tone: "fragrance", label: "Concept B", sub: "Bright" },
        { tone: "dark", label: "Concept C", sub: "Serious" },
        { tone: "tech", label: "Concept D", sub: "Playful" },
      ].map((c, i) => (
        <div key={i} className="relative aspect-[3/4] hairline overflow-hidden group hover:hairline-gold transition-colors">
          <div
            className="absolute inset-0"
            style={{
              background:
                c.tone === "warm"
                  ? "radial-gradient(ellipse at 30% 30%, rgba(216,196,168,0.32) 0%, transparent 55%), linear-gradient(180deg,#1a1612,#0a0807)"
                  : c.tone === "fragrance"
                  ? "radial-gradient(ellipse at 35% 35%, rgba(232,201,194,0.32) 0%, transparent 55%), linear-gradient(180deg,#1a1413,#0d0908)"
                  : c.tone === "tech"
                  ? "radial-gradient(ellipse at 35% 35%, rgba(198,191,208,0.22) 0%, transparent 55%), linear-gradient(180deg,#0e1014,#08090c)"
                  : "linear-gradient(180deg,#161616,#0a0a0a)",
            }}
          />
          {/* keychain ring */}
          <svg
            className="absolute top-4 left-1/2 -translate-x-1/2"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <circle cx="17" cy="17" r="6" stroke="#C8A96A" strokeOpacity="0.6" />
            <line x1="17" y1="23" x2="17" y2="34" stroke="#C8A96A" strokeOpacity="0.6" />
          </svg>
          {/* abstract character */}
          <div className="absolute inset-x-6 top-16 bottom-16 hairline-gold flex items-end justify-center pb-6">
            <div className="w-12 h-12 rounded-full bg-ivory/15 mb-3" />
          </div>
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] tracking-wider2 uppercase">
            <span className="text-ivory/80">{c.label}</span>
            <span className="text-champagne">{c.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
