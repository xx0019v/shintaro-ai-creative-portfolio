"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
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

const POP_TAGS = ["fr_w02_t1", "fr_w02_t2", "fr_w02_t3", "fr_w02_t4"] as const;

export default function FragranceBranding() {
  const { lang } = useLang();

  return (
    <section id="fragrance" className="relative py-32 md:py-48">
      {/* ---- intro: header, overview, category labels (contained) ---- */}
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

        <div className="mt-14 max-w-2xl">
          <Reveal>
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
              {tr("fr_overview", lang)}
            </p>
          </Reveal>
        </div>

        {/* categories — margin labels, not a card grid */}
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          {CATEGORIES.map((c, i) => (
            <span
              key={c}
              className="flex items-baseline gap-2 text-[10px] tracking-wider2 uppercase text-silver-muted"
            >
              <span className="idx text-silver-bright">{String(i + 1).padStart(2, "0")}</span>
              <span>{tr(c as keyof typeof t, lang)}</span>
            </span>
          ))}
        </Reveal>
      </div>

      {/* ---- Work 01 — full-bleed plate, the section's strongest imagery ---- */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 mt-20 md:mt-28">
        <Reveal>
          <Parallax distance={30} fade>
            <div className="relative h-[62vh] min-h-[440px] md:h-[90vh] md:min-h-[640px] overflow-hidden bg-charcoal">
              <Image
                src="/images/fragrance/key-visual-dark.jpg"
                alt="Fragrance Spot — main key visual panel"
                fill
                priority
                sizes="100vw"
                className="object-cover grayscale-[0.15] contrast-[1.02]"
              />
              {/* scrim — legibility for the title resting on the plate */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 38%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.92) 100%)",
                }}
              />
              {/* title — bottom-left, aligned to the page gutter */}
              <div className="absolute inset-x-0 bottom-0 pb-8 md:pb-14">
                <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
                  <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                    Work 01 · {tr("intent_eyebrow", lang)}
                  </p>
                  <h3 className="metallic-still mt-3 font-serif text-3xl md:text-5xl tracking-tight">
                    Fragrance Spot Key Visual
                  </h3>
                  <p className="mt-3 max-w-xl font-jpserif text-sm md:text-base text-offwhite/85 leading-relaxed">
                    {tr("fr_intent", lang)}
                  </p>
                </div>
              </div>
            </div>
          </Parallax>
        </Reveal>
      </div>

      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        {/* supporting detail for Work 01 — margin captions, not a card */}
        <Reveal className="mt-10">
          <p className="max-w-2xl font-jpserif text-sm md:text-base text-offwhite/80 leading-loose">
            {tr("fr_w01_jp", lang)}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                Role
              </p>
              <p className="text-sm text-offwhite/85 font-jpserif">{tr("fr_w01_role", lang)}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                Output
              </p>
              <p className="text-sm text-offwhite/85 font-jpserif">{tr("fr_w01_output", lang)}</p>
            </div>
          </div>
        </Reveal>

        <SilverRule className="mt-24" />

        {/* ---- Work 02 — POP, text at full width, plate inset ~62% offset right ---- */}
        <Reveal className="mt-20">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">Work 02</p>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl text-offwhite tracking-tight">
              Fragrance Menu POP
            </h3>
            <p className="mt-4 font-jpserif text-sm text-offwhite/80 leading-loose">
              {tr("fr_w02_body", lang)}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            {POP_TAGS.map((k) => (
              <span
                key={k}
                className="text-[10px] tracking-wider2 uppercase text-silver-muted"
              >
                {tr(k, lang)}
              </span>
            ))}
          </div>
          <div className="mt-12 md:w-[62%] md:ml-auto">
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
        </Reveal>

        {/* ---- Work 03 / 04 — installation + how-to, stacked at differing widths ---- */}
        <Reveal className="mt-24">
          <div className="w-full">
            <Parallax distance={30} lift>
              <EditorialFrame
                src="/images/fragrance/installation-panel.png"
                alt="Fragrance Spot — installation announcement panel"
                ratio="portrait"
                caption="Installation Panel"
                desaturate
              />
            </Parallax>
          </div>
          <div className="mt-5 max-w-xl">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
              {tr("fr_w03_label", lang)}
            </p>
            <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
              {tr("fr_w03_body", lang)}
            </p>
          </div>

          <div className="mt-16 md:w-[62%] md:ml-auto">
            <Parallax distance={30} lift>
              <EditorialFrame
                src="/images/fragrance/how-to-select.png"
                alt="SNS How-to carousel — how to use the machine"
                ratio="portrait"
                caption="SNS How-to Carousel"
                desaturate
              />
            </Parallax>
          </div>
          <div className="mt-5 md:w-[62%] md:ml-auto max-w-xl">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
              {tr("fr_w04_label", lang)}
            </p>
            <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
              {tr("fr_w04_body", lang)}
            </p>
          </div>
        </Reveal>

        {/* ---- Digital Signage — 3-up gallery, a curated set rather than a template split ---- */}
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
