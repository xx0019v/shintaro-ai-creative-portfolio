"use client";

import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import IntentScan from "@/components/ui/IntentScan";
import SectionHeader from "@/components/ui/SectionHeader";
import { CheckCircle2, ExternalLink, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const LIVE_URL = "https://xx0019v.github.io/TSC/";

const SECTIONS = [
  "Hero",
  "Difference",
  "Features",
  "Approach",
  "Voices",
  "Pricing",
  "FAQ",
  "Apply",
];

export default function ClientWork() {
  const { lang } = useLang();

  return (
    <section id="client" className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
        variant="hang"
          index="04"
          labelKey="cw_label"
          titleEn={
            <>
              TSC English <br className="hidden md:block" />
              <span className="italic font-light">Academy</span>
            </>
          }
          jpTitleKey="cw_jp_title"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
              {tr("cw_overview", lang)}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-offwhite text-base text-[11px] tracking-wider2 uppercase hover:bg-silver transition-colors duration-500"
              >
                <ExternalLink size={14} strokeWidth={1.5} />
                Visit Live Site
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.25}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wider2 uppercase text-silver-bright hover:text-offwhite transition-colors"
              >
                xx0019v.github.io/TSC
              </a>
            </div>

            <div className="mt-10 hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-4">
                {tr("cw_status", lang)}
              </p>
              <ul className="space-y-3 text-sm">
                <StatusRow done labelKey="cw_status_done" />
                <StatusRow done labelKey="cw_status_domain" />
                <StatusRow labelKey="cw_status_launch" />
              </ul>
            </div>
          </Reveal>

          {/* Exhibit spec plate — bento: the differentiator (USP) and the
              craft (Stack) read large; the rest settle quietly around them. */}
          <Reveal delay={0.1} className="md:col-span-5">
            <ul className="bento bento-spec">
              <SpecCell label="USP" value={tr("cw_meta_usp", lang)} span="bento-col-12" big />
              <SpecCell label="Role" value="Web Direction · Build" span="bento-col-6" />
              <SpecCell label="Service" value="Online English" span="bento-col-6" />
              <SpecCell label="Stack" value="React · R3F · GSAP" span="bento-col-12" />
              <SpecCell label="Pages" value="One-page · 8 sections" span="bento-col-6" />
              <SpecCell label="Stage" value="Live · Public" span="bento-col-6" />
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-16 md:mt-20">
          <Parallax distance={44} lift fade>
            <IntentScan
              exhibit="03"
              medium={tr("cw_medium", lang)}
              year="2026"
              intent={tr("cw_intent", lang)}
              eyebrow={tr("intent_eyebrow", lang)}
            >
              <BrowserMock />
            </IntentScan>
          </Parallax>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-6">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
              Design Goal
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-offwhite tracking-tight leading-snug">
              Cinematic, trustworthy,{" "}
              <span className="italic font-light">cinematic.</span>
              <br />
              From service idea to live site.
            </h3>
            <p className="mt-4 font-jpserif text-sm text-silver-muted leading-loose">
              {tr("cw_value", lang)}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
              Page Sections
            </p>
            <ul className="flex flex-wrap gap-2 text-[11px] text-offwhite/80">
              {SECTIONS.map((s) => (
                <li key={s} className="px-2.5 py-1 hairline tracking-wider uppercase">
                  {s}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
              Tech Highlights
            </p>
            <ul className="flex flex-wrap gap-2 text-[11px] text-offwhite/80">
              {[
                "React 19",
                "Vite",
                "Tailwind",
                "Framer Motion",
                "GSAP",
                "Lenis",
                "React Three Fiber",
                "Bilingual JA / EN",
                "PWA",
              ].map((s) => (
                <li
                  key={s}
                  className="px-2.5 py-1 hairline-silver tracking-wider uppercase"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatusRow({
  labelKey,
  done,
}: {
  labelKey: Parameters<typeof tr>[0];
  done?: boolean;
}) {
  const { lang } = useLang();
  return (
    <li className="flex items-start gap-4">
      {done ? (
        <CheckCircle2 size={16} strokeWidth={1.25} className="text-silver-bright mt-0.5" />
      ) : (
        <span className="mt-2 h-1.5 w-1.5 rounded-full border border-silver/50" />
      )}
      <p className="text-offwhite/90 font-jpserif">{tr(labelKey, lang)}</p>
    </li>
  );
}

function SpecCell({
  label,
  value,
  span,
  big = false,
}: {
  label: string;
  value: string;
  span: string;
  big?: boolean;
}) {
  return (
    <li className={`bento-cell ${span}`} data-prox>
      <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-2">
        {label}
      </p>
      <p
        className={`font-jpserif text-offwhite/90 ${
          big ? "text-base md:text-lg leading-snug" : "text-sm"
        }`}
      >
        {value}
      </p>
    </li>
  );
}

/* ---------- Live iframe embed of the real TSC English Academy site ---------- */
function BrowserMock() {
  return (
    <div className="hairline-silver overflow-hidden" data-cursor="OPEN">
      {/* browser chrome */}
      <div className="bg-base/80 px-5 py-3 border-b border-offwhite/[0.08] flex items-center gap-4 text-[10px] tracking-wider2 uppercase text-silver-muted">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-offwhite/15" />
          <span className="h-2 w-2 rounded-full bg-offwhite/15" />
          <span className="h-2 w-2 rounded-full bg-offwhite/15" />
        </div>
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <span className="text-offwhite/70">xx0019v.github.io/TSC</span>
          <span className="text-silver-bright">· live</span>
        </div>
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 hover:text-offwhite transition-colors"
          aria-label="Open TSC English Academy in a new tab"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-silver-bright animate-glow" />
          Public
          <ArrowUpRight size={11} strokeWidth={1.25} />
        </a>
      </div>

      {/* Presentational panel — links out, not embedded */}
      <a
        href={LIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open TSC English Academy in a new tab"
        className="group relative block w-full aspect-[16/10] overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(229,229,229,0.08) 0%, transparent 55%), linear-gradient(160deg, #11100f 0%, #0a0807 100%)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
            海外講師 × 日本人通訳者
          </p>
          <h4 className="mt-4 font-serif text-3xl md:text-5xl tracking-tight text-offwhite leading-[1.05]">
            TSC English Academy
          </h4>
          <p className="mt-4 text-sm text-silver-muted">
            React · Three.js · GSAP — Live
          </p>
          <span className="mt-8 inline-flex items-center gap-3 px-6 py-3 hairline-silver text-[11px] tracking-wider2 uppercase text-offwhite group-hover:bg-offwhite group-hover:text-base transition-colors duration-500">
            Open live site
            <ArrowUpRight
              size={14}
              strokeWidth={1.25}
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </a>

      {/* footer ribbon */}
      <div className="bg-base/80 px-5 py-3 border-t border-offwhite/[0.08] flex items-center justify-between text-[10px] tracking-wider2 uppercase text-silver-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-silver-bright animate-glow" />
          Live · xx0019v.github.io/TSC
        </span>
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-silver-bright hover:text-offwhite transition-colors inline-flex items-center gap-1.5"
        >
          Open full site
          <ArrowUpRight size={11} strokeWidth={1.25} />
        </a>
      </div>
    </div>
  );
}
