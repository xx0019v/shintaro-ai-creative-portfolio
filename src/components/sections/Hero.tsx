"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const easeLuxe = [0.19, 1, 0.22, 1] as const;
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";
import PortraitFrame from "@/components/ui/PortraitFrame";
import Parallax from "@/components/ui/Parallax";
import MagneticButton from "@/components/ui/MagneticButton";
import ShatterText from "@/components/ui/ShatterText";

const TAGS = [
  "AI",
  "Web Design",
  "Branding",
  "Visual Design",
  "Project Direction",
  "AI-Assisted Creation",
];

export default function Hero() {
  const reduced = useReducedMotion();
  const { lang } = useLang();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-32 md:pt-40 pb-12"
    >
      <Ambient reduced={!!reduced} />

      {/* Editorial side hairlines — quiet luxury framing */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 md:left-10 lg:left-16 top-32 bottom-32 w-px hidden md:block"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(229,229,229,0.18) 30%, rgba(229,229,229,0.18) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 md:right-10 lg:right-16 top-32 bottom-32 w-px hidden md:block"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(229,229,229,0.18) 30%, rgba(229,229,229,0.18) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-editorial mx-auto px-6 md:px-10 lg:px-16 w-full">
        {/* meta row */}
        <div className="flex items-center justify-between text-[10px] tracking-wider2 uppercase text-silver-muted">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-silver animate-glow" />
            <span>{tr("hero_kicker", lang)}</span>
          </div>
          <span className="hidden sm:block">2024 — 2026</span>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Title block */}
          <div className="lg:col-span-8">
            {/* Signature name — the reading line scans it once on load, the
                ñ is the chrome "signal", the identity develops beneath. */}
            <div className="relative inline-block">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: easeLuxe, delay: 0.1 }}
                className="text-[11px] md:text-xs tracking-wider2 uppercase text-silver-bright"
              >
                <SignatureName name={tr("hero_name", lang)} />
              </motion.p>

              {!reduced && (
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.3, ease: easeLuxe, delay: 0.5, times: [0, 0.5, 1] }}
                  className="pointer-events-none absolute left-0 right-0 -bottom-1 h-px origin-left"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(229,229,229,0.9), transparent)",
                    boxShadow: "0 0 10px rgba(229,229,229,0.5)",
                  }}
                />
              )}

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeLuxe, delay: 1.0 }}
                className="mt-3 text-[9px] md:text-[10px] tracking-[0.34em] uppercase text-silver-muted"
              >
                {tr("hero_identity", lang)}
              </motion.p>
            </div>

            <h1 className="mt-6 font-serif tracking-tight leading-[0.92] text-offwhite text-[clamp(2.75rem,9vw,9rem)]">
              <RevealLine delay={0.2}>
                <ShatterText text={tr("hero_h1_a", lang)} as="span" />
              </RevealLine>
              <RevealLine delay={0.32}>
                <span className="italic font-light text-offwhite/85">into</span>{" "}
                <span className="metallic">Systems,</span>
              </RevealLine>
              <RevealLine delay={0.44}>
                <ShatterText text={tr("hero_h1_c", lang)} as="span" />
              </RevealLine>
            </h1>
          </div>

          {/* Portrait silhouette — appears on lg+ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: easeLuxe, delay: 0.6 }}
            className="hidden lg:block lg:col-span-4"
          >
            <Parallax distance={38}>
              <PortraitFrame
                src="/images/portrait/portrait-headshot.png"
                alt="Avendano Shintaro"
                variant="headshot"
                priority
              />
            </Parallax>
          </motion.div>
        </div>

        {/* sub copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLuxe, delay: 0.7 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-end"
        >
          <div className="md:col-span-7">
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-relaxed max-w-xl">
              {tr("hero_jp_main", lang)}
            </p>
            <p className="mt-4 text-sm text-silver-muted leading-relaxed max-w-xl">
              {tr("hero_sub", lang)}
            </p>
            <p className="mt-3 text-[11px] tracking-wider2 uppercase text-silver-bright">
              {tr("hero_role", lang)}
            </p>
          </div>

          <div className="md:col-span-5 md:justify-self-end flex flex-wrap gap-3">
            <MagneticButton>
              <a
                href="#projects"
                data-prox
                className="group relative inline-flex items-center gap-3 px-6 py-3 hairline-silver text-[11px] tracking-wider2 uppercase text-offwhite hover:bg-offwhite hover:text-base transition-colors duration-500"
              >
                {tr("hero_cta_projects", lang)}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.25}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-6 py-3 hairline text-[11px] tracking-wider2 uppercase text-offwhite/85 hover:text-offwhite hover:border-silver/60 transition-colors duration-500"
              >
                {tr("hero_cta_contact", lang)}
                <ArrowUpRight size={14} strokeWidth={1.25} />
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: easeLuxe, delay: 0.9 }}
          className="origin-left mt-16 rule-silver"
        />

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeLuxe, delay: 1.0 }}
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-wider2 uppercase text-silver-muted"
        >
          {TAGS.map((tg, i) => (
            <li key={tg} className="flex items-center gap-3">
              <span className="idx text-silver-bright">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{tg}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="relative z-10 max-w-editorial mx-auto px-6 md:px-10 lg:px-16 w-full mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-md">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
              {tr("hero_currently", lang)}
            </p>
            <p className="text-sm text-offwhite/80 leading-relaxed">
              {tr("hero_currently_desc", lang)}
            </p>
          </div>
          <a
            href="#about"
            className="group inline-flex items-center gap-2 text-[10px] tracking-wider2 uppercase text-offwhite/70 hover:text-offwhite transition-colors"
          >
            <ArrowDown
              size={14}
              strokeWidth={1.25}
              className="transition-transform duration-700 group-hover:translate-y-1"
            />
            {tr("hero_scroll", lang)}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Renders the name with the ñ as a chrome "signal" accent. */
function SignatureName({ name }: { name: string }) {
  const idx = name.search(/ñ/i);
  if (idx === -1) return <>{name}</>;
  return (
    <>
      {name.slice(0, idx)}
      <span className="metallic">{name[idx]}</span>
      {name.slice(idx + 1)}
    </>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, ease: easeLuxe, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Ambient({ reduced }: { reduced: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #E5E5E5 0%, rgba(229,229,229,0.18) 38%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full opacity-[0.06] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #C0C0C0 0%, rgba(192,192,192,0.06) 50%, transparent 80%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E5E5E5" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ x: "-30%" }}
          animate={{ x: "30%" }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/30 to-transparent"
        />
      )}
    </div>
  );
}
