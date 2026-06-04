"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { easeLuxe } from "@/lib/motion";

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

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-32 md:pt-40 pb-12"
    >
      {/* Ambient glow */}
      <Ambient reduced={!!reduced} />

      <div className="relative z-10 max-w-editorial mx-auto px-6 md:px-10 lg:px-16 w-full">
        {/* Top meta row */}
        <div className="flex items-center justify-between text-[10px] tracking-wider2 uppercase text-muted">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne animate-glow" />
            <span>Portfolio — Volume 01</span>
          </div>
          <span className="hidden sm:block">2024 — 2026</span>
        </div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easeLuxe, delay: 0.1 }}
          className="mt-16 md:mt-24"
        >
          <p className="text-[11px] md:text-xs tracking-wider2 uppercase text-champagne">
            Shintaro Avendano
          </p>
        </motion.div>

        {/* Big editorial headline */}
        <h1 className="mt-6 font-serif tracking-tight leading-[0.92] text-ivory text-[clamp(2.75rem,9vw,9rem)]">
          <RevealLine delay={0.2}>Turning&nbsp;Ideas</RevealLine>
          <RevealLine delay={0.32}>
            <span className="italic font-light text-ivory/85">into</span>{" "}
            <span className="text-champagne">Systems,</span>
          </RevealLine>
          <RevealLine delay={0.44}>Visuals,&nbsp;&amp;&nbsp;Experiences.</RevealLine>
        </h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLuxe, delay: 0.7 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end"
        >
          <div className="md:col-span-7">
            <p className="text-sm md:text-base text-ivory/80 leading-relaxed max-w-xl">
              AI Creative Developer · Visual Designer · Project Director.
              <br className="hidden sm:block" />
              I create projects that connect AI, web production, branding,
              visual design, and human behavior.
            </p>
            <p className="mt-4 font-jpserif text-sm text-muted leading-relaxed max-w-xl">
              AI、Web制作、ブランディング、ビジュアルデザインを横断し、アイデアを実際に使える体験として形にします。
            </p>
          </div>

          <div className="md:col-span-5 md:justify-self-end flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-6 py-3 hairline-gold text-[11px] tracking-wider2 uppercase text-ivory hover:bg-ivory hover:text-base transition-colors duration-500"
            >
              View Projects
              <ArrowUpRight
                size={14}
                strokeWidth={1.25}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-6 py-3 hairline text-[11px] tracking-wider2 uppercase text-ivory/85 hover:text-ivory hover:border-champagne/60 transition-colors duration-500"
            >
              Contact Me
              <ArrowUpRight size={14} strokeWidth={1.25} />
            </a>
          </div>
        </motion.div>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: easeLuxe, delay: 0.9 }}
          className="origin-left mt-16 gold-rule"
        />

        {/* Tag row */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeLuxe, delay: 1.0 }}
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-wider2 uppercase text-muted"
        >
          {TAGS.map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              <span className="idx text-champagne">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Bottom meta */}
      <div className="relative z-10 max-w-editorial mx-auto px-6 md:px-10 lg:px-16 w-full mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-md">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-3">
              Currently building
            </p>
            <p className="text-sm text-ivory/85 leading-relaxed">
              AI camera analytics · fragrance branding · client websites ·
              school creative projects.
            </p>
          </div>
          <a
            href="#about"
            className="group inline-flex items-center gap-2 text-[10px] tracking-wider2 uppercase text-ivory/70 hover:text-ivory transition-colors"
          >
            <ArrowDown
              size={14}
              strokeWidth={1.25}
              className="transition-transform duration-700 group-hover:translate-y-1"
            />
            Scroll to read
          </a>
        </div>
      </div>
    </section>
  );
}

function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
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
      {/* radial glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #C8A96A 0%, rgba(200,169,106,0.18) 38%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #F5F1EA 0%, rgba(245,241,234,0.06) 50%, transparent 80%)",
        }}
      />
      {/* faint grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#F5F1EA"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* data line drift */}
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ x: "-30%" }}
          animate={{ x: "30%" }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent"
        />
      )}
    </div>
  );
}
