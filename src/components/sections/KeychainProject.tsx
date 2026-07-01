"use client";

import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import IntentScan from "@/components/ui/IntentScan";
import SectionHeader from "@/components/ui/SectionHeader";
import SilverRule from "@/components/ui/SilverRule";
import EditorialFrame from "@/components/ui/EditorialFrame";
import PlayableCharm from "@/components/ui/PlayableCharm";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const PROCESS = [
  { no: "01", en: "Observe each teacher's personality and features", jpKey: "kc_p01_jp" },
  { no: "02", en: "Decide the visual direction", jpKey: "kc_p02_jp" },
  { no: "03", en: "Generate and compare AI-assisted ideas", jpKey: "kc_p03_jp" },
  { no: "04", en: "Refine expression, pose, color, texture", jpKey: "kc_p04_jp" },
  { no: "05", en: "Prepare design for keychain production", jpKey: "kc_p05_jp" },
] as const;

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
    <section id="keychain" className="relative py-32 md:py-48">
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
              {/* Signature exhibit + Playable Easter egg — the reading line
                  surfaces the intent (hover / static on touch), while the charm
                  itself is tap-to-turn under the light. */}
              <Parallax distance={48} lift fade>
                <IntentScan
                  exhibit="04"
                  medium={tr("kc_medium", lang)}
                  year="2026"
                  intent={tr("kc_intent", lang)}
                  eyebrow={tr("intent_eyebrow", lang)}
                  staticOnTouch
                >
                  <PlayableCharm>
                    <EditorialFrame
                      src="/images/keychain/keychain-uchiike-collection.jpg"
                      alt="Teacher Editorial Charm Collection — 7 round acrylic keychains"
                      ratio="portrait"
                      desaturate
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </PlayableCharm>
                </IntentScan>
              </Parallax>
            </div>
            <div className="md:col-span-5 space-y-6">
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  {tr("kc_w01_eyebrow", lang)}
                </p>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl text-offwhite tracking-tight">
                  {tr("kc_w01_title", lang)}
                </h3>
                <p className="mt-4 font-jpserif text-sm text-offwhite/80 leading-loose">
                  {tr("kc_w01_body", lang)}
                </p>
              </div>
              <SilverRule />
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Material
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">{tr("kc_w01_material", lang)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Attachment
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">{tr("kc_w01_attach", lang)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Series
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">{tr("kc_w01_series", lang)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Tone
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">{tr("kc_w01_tone", lang)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Two supporting concepts side by side */}
        <Reveal className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <Parallax distance={40} lift>
                <EditorialFrame
                  src="/images/keychain/keychain-arisu.jpg"
                  alt="Keychain concept — Energetic edition"
                  ratio="square"
                  caption={tr("kc_w02_caption", lang)}
                  desaturate
                />
              </Parallax>
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  {tr("kc_w02_eyebrow", lang)}
                </p>
                <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
                  {tr("kc_w02_body", lang)}
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <Parallax distance={28} lift>
                <EditorialFrame
                  src="/images/keychain/keychain-fukukocho.jpg"
                  alt="Keychain concept — anime-style portrait at desk"
                  ratio="square"
                  caption="Concept · Anime Portrait"
                  desaturate
                />
              </Parallax>
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  {tr("kc_w03_eyebrow", lang)}
                </p>
                <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
                  {tr("kc_w03_body", lang)}
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
          <p className="mt-2 font-jpserif text-xs text-silver-muted">{tr("kc_process_jp", lang)}</p>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-3">
          {PROCESS.map((p, i) => (
            <Reveal key={p.no} delay={0.05 * i} as="li" className="relative hairline p-6">
              <span className="text-silver-bright idx text-[11px] tracking-wider2">{p.no}</span>
              <p className="mt-4 text-sm text-offwhite/85 leading-relaxed">{p.en}</p>
              <p className="mt-2 font-jpserif text-xs text-silver-muted leading-relaxed">{tr(p.jpKey, lang)}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-12">
          <p className="text-[10px] tracking-wider2 uppercase text-silver-muted">{tr("kc_note_label", lang)}</p>
          <p className="mt-2 font-jpserif text-sm text-silver-muted max-w-3xl leading-loose">
            {tr("kc_privacy", lang)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
