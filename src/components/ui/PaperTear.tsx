"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

/**
 * PaperTear — the one editorial "page tears to the next chapter" moment.
 *
 * Used a single time, at the threshold into the Works. As it scrolls into
 * view a torn deckle seam draws across the page and two faint paper shadows
 * part, as if the editorial page were being torn open to reveal the next
 * chapter beneath — a quiet, cinematic hinge between reading and viewing.
 *
 * One IntersectionObserver, pure CSS reveal (stroke-dashoffset + transform),
 * fires once and then does nothing. Reduced-motion shows the seam already
 * drawn. Deterministic jagged edge — no rAF, no randomness at runtime.
 */
export default function PaperTear({
  chapter,
  labelKey,
}: {
  chapter: string;
  labelKey: keyof typeof t;
}) {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [torn, setTorn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTorn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTorn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // deterministic torn edge across a 1200-wide viewBox
  const pts: string[] = [];
  let s = 41;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let x = 0; x <= 1200; x += 30) {
    const y = 20 + (rand() - 0.5) * 14;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  const d = `M ${pts.join(" L ")}`;

  return (
    <div
      ref={ref}
      className={`paper-tear ${torn ? "is-torn" : ""}`}
      aria-hidden
    >
      <span className="paper-tear__above" />
      <span className="paper-tear__below" />
      <svg
        className="paper-tear__seam"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
      >
        <path d={d} />
      </svg>
      <span className="paper-tear__label">
        <span className="paper-tear__no">{chapter}</span>
        <span className="paper-tear__sep" />
        <span>{tr(labelKey, lang)}</span>
      </span>
    </div>
  );
}
