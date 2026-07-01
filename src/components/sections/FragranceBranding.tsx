"use client";

import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import IntentScan from "@/components/ui/IntentScan";
import SectionHeader from "@/components/ui/SectionHeader";
import SilverRule from "@/components/ui/SilverRule";
import EditorialFrame from "@/components/ui/EditorialFrame";
import SignageVideo from "@/components/ui/SignageVideo";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

const CATEGORIES = [
  "fr_cat_pop",
  "fr_cat_sns",
  "fr_cat_poster",
  "fr_cat_event",
  "fr_cat_direction",
  "fr_cat_copy",
] as const;

export default function FragranceBranding() {
  const { lang } = useLang();

  return (
    <section id="fragrance" className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="03"
          labelKey="fr_label"
          titleEn={
            <>
              Fragrance Vending Machine{" "}
              <span className="italic font-light text-silver">Branding</span>
            </>
          }
          jpTitleKey="fr_jp_title"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
              {tr("fr_overview", lang)}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-offwhite/85">
              {CATEGORIES.map((c, i) => (
                <li key={c} className="flex items-baseline gap-3">
                  <span className="idx text-silver-bright text-[10px] tracking-wider2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{tr(c as keyof typeof t, lang)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Single hero visual — the dark-luxe key visual */}
        <Reveal delay={0.15} className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <Parallax distance={52} lift fade>
                <IntentScan
                  exhibit="02"
                  medium={tr("fr_medium", lang)}
                  year="2025"
                  intent={tr("fr_intent", lang)}
                  eyebrow={tr("intent_eyebrow", lang)}
                >
                  <EditorialFrame
                    src="/images/fragrance/key-visual-dark.jpg"
                    alt="Fragrance Spot — main key visual panel"
                    ratio="portrait"
                    desaturate
                    glare
                    priority
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </IntentScan>
              </Parallax>
            </div>
            <div className="md:col-span-5 space-y-6">
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 01
                </p>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl text-offwhite tracking-tight">
                  Fragrance Spot Key Visual
                </h3>
                <p className="mt-4 font-jpserif text-sm text-offwhite/80 leading-loose">
                  {tr("fr_w01_jp", lang)}
                </p>
              </div>
              <SilverRule />
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Role
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">{tr("fr_w01_role", lang)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Output
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">{tr("fr_w01_output", lang)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        <SilverRule className="mt-24" />

        {/* Two supporting visuals — POP + installation */}
        <Reveal className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 md:order-2">
              <Parallax distance={40} lift>
                <EditorialFrame
                  src="/images/fragrance/pop-final.png"
                  alt="Fragrance Menu POP — final layout"
                  ratio="portrait"
                  caption="Fragrance Menu · POP"
                  desaturate
                />
              </Parallax>
            </div>
            <div className="md:col-span-7 md:order-1 space-y-6">
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 02
                </p>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl text-offwhite tracking-tight">
                  Fragrance Menu POP
                </h3>
                <p className="mt-4 font-jpserif text-sm text-offwhite/80 leading-loose">
                  {tr("fr_w02_body", lang)}
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                {(["fr_w02_t1","fr_w02_t2","fr_w02_t3","fr_w02_t4"] as const).map((k)=>(
                  <li key={k} className="hairline px-4 py-3 font-jpserif text-offwhite/80">
                    {tr(k, lang)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Installation + How-to (back to 2-col, signage gets its own block) */}
        <Reveal className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <EditorialFrame
                src="/images/fragrance/installation-panel.png"
                alt="Fragrance Spot — installation announcement panel"
                ratio="portrait"
                caption="Installation Panel"
                desaturate
              />
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  {tr("fr_w03_label", lang)}
                </p>
                <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
                  {tr("fr_w03_body", lang)}
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <EditorialFrame
                src="/images/fragrance/how-to-select.png"
                alt="SNS How-to carousel — how to use the machine"
                ratio="portrait"
                caption="SNS How-to Carousel"
                desaturate
              />
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  {tr("fr_w04_label", lang)}
                </p>
                <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
                  {tr("fr_w04_body", lang)}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Digital Signage — dedicated 3-up gallery */}
        <Reveal className="mt-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                {tr("fr_signage_title", lang)}
              </p>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl text-offwhite tracking-tight">
                {tr("fr_signage_eyebrow", lang)}
              </h3>
              <p className="mt-2 font-jpserif text-xs text-silver-muted">
                {tr("fr_signage_body", lang)}
              </p>
            </div>
            <p className="text-[10px] tracking-wider2 uppercase text-silver-muted">
              {tr("fr_signage_meta", lang)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-4">
              <SignageVideo
                src="/images/fragrance/signage-kaori.mp4"
                caption={tr("fr_signage_01_caption", lang)}
              />
              <p className="font-jpserif text-xs text-offwhite/75 leading-relaxed">
                {tr("fr_signage_01_body", lang)}
              </p>
            </div>
            <div className="space-y-4">
              <SignageVideo
                src="/images/fragrance/signage-red.mp4"
                caption={tr("fr_signage_02_caption", lang)}
              />
              <p className="font-jpserif text-xs text-offwhite/75 leading-relaxed">
                {tr("fr_signage_02_body", lang)}
              </p>
            </div>
            <div className="space-y-4">
              <SignageVideo
                src="/images/fragrance/signage-unisex.mp4"
                caption={tr("fr_signage_03_caption", lang)}
              />
              <p className="font-jpserif text-xs text-offwhite/75 leading-relaxed">
                {tr("fr_signage_03_body", lang)}
              </p>
            </div>
          </div>
        </Reveal>

        {/* value statement */}
        <Reveal delay={0.15} className="mt-20">
          <div className="hairline-silver p-8 md:p-12">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-6">
              Project Value
            </p>
            <p className="font-serif text-2xl md:text-3xl text-offwhite tracking-tight leading-snug max-w-3xl">
              From physical product to{" "}
              <span className="italic font-light">a shareable experience</span> —
              brand, visuals, and customer flow as one system.
            </p>
            <p className="mt-4 font-jpserif text-sm text-silver-muted leading-loose max-w-3xl">
              {tr("fr_value", lang)}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
