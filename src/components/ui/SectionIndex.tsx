"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "AI Camera" },
  { id: "fragrance", label: "Fragrance" },
  { id: "client", label: "Client Work" },
  { id: "keychain", label: "Keychain" },
  { id: "leadership", label: "Leadership" },
  { id: "skills", label: "Skills" },
  { id: "strengths", label: "Strengths" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const TOTAL = SECTIONS.length;

/**
 * Floating section indicator — bottom right corner.
 * Tracks the section currently in view via IntersectionObserver,
 * displays "02 / 11 · About" style chip. Hidden on small screens.
 */
export default function SectionIndex() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ratios = new Array(TOTAL).fill(0);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = SECTIONS.findIndex((s) => s.id === e.target.id);
          if (i >= 0) ratios[i] = e.intersectionRatio;
        }
        const top = ratios.indexOf(Math.max(...ratios));
        if (top >= 0) setIdx(top);
      },
      { threshold: [0, 0.25, 0.5, 0.75] }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const current = SECTIONS[idx];
  const display = `${String(idx + 1).padStart(2, "0")}`;
  const total = String(TOTAL).padStart(2, "0");

  return (
    <div
      className="fixed bottom-6 right-6 z-[55] hidden md:flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-silver-bright pointer-events-none select-none"
      aria-hidden
    >
      <span
        className="idx"
        style={{ fontFeatureSettings: '"tnum", "lnum"' }}
      >
        {display}
      </span>
      <span className="h-px w-6 bg-silver/40" />
      <span className="text-silver-muted">{total}</span>
      <span className="hidden lg:inline ml-3 text-silver/70">
        · {current?.label}
      </span>
    </div>
  );
}
