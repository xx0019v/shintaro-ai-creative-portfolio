"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

const FINISHES = [
  { key: "matte", label: "MATTE", filter: "none", sheen: 0.0 },
  { key: "chrome", label: "CHROME", filter: "grayscale(0.3) contrast(1.12) brightness(1.06)", sheen: 0.9 },
  { key: "warm", label: "WARM", filter: "sepia(0.18) contrast(1.05) brightness(1.03)", sheen: 0.4 },
] as const;

/**
 * PlayableCharm — the site's one quiet Easter egg.
 *
 * Tap / click the charm and its finish cycles — matte → chrome → warm — with
 * a single silver light sweeping across the acrylic each time, as if you were
 * turning a real keyring under a gallery light. No score, no game UI; just a
 * small reward for the person who reaches out and touches it. A faint "TOUCH"
 * cursor label hints there's something to try.
 *
 * Pure state + CSS; the sweep is a one-shot transition, nothing loops, so it
 * costs nothing at rest. Honors reduced-motion (finish still changes, no
 * sweep). Keyboard-operable (Enter / Space).
 */
export default function PlayableCharm({ children }: { children: ReactNode }) {
  const [i, setI] = useState(0);
  const [sweep, setSweep] = useState(false);
  const [reduced, setReduced] = useState(false);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, []);

  const cycle = () => {
    setI((n) => (n + 1) % FINISHES.length);
    if (reduced) return;
    setSweep(false);
    // restart the sweep on the next frame
    requestAnimationFrame(() => {
      setSweep(true);
      if (tRef.current) clearTimeout(tRef.current);
      tRef.current = setTimeout(() => setSweep(false), 900);
    });
  };

  const f = FINISHES[i];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Charm finish: ${f.label}. Tap to change.`}
      data-cursor="TOUCH"
      onClick={cycle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          cycle();
        }
      }}
      className="relative block cursor-pointer select-none rounded-[14px]"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div
        style={{
          filter: f.filter,
          transition: "filter 900ms cubic-bezier(0.19,1,0.22,1)",
        }}
      >
        {children}
      </div>

      {/* one-shot silver sweep across the surface */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[14px]"
        style={{ mixBlendMode: "screen" }}
      >
        <span
          className="absolute inset-y-0 w-1/3"
          style={{
            left: sweep ? "120%" : "-40%",
            background:
              "linear-gradient(105deg, transparent, rgba(255,255,255,0.5) 50%, transparent)",
            opacity: sweep ? f.sheen : 0,
            transition: sweep
              ? "left 900ms cubic-bezier(0.19,1,0.22,1), opacity 900ms cubic-bezier(0.19,1,0.22,1)"
              : "none",
          }}
        />
      </span>

      {/* quiet finish label — the discovered detail */}
      <span
        aria-hidden
        className="absolute bottom-3 left-3 z-[2] text-[9px] tracking-[0.32em] uppercase text-silver-bright/90"
        style={{
          textShadow: "0 0 10px rgba(0,0,0,0.6)",
          transition: "color 500ms cubic-bezier(0.19,1,0.22,1)",
        }}
      >
        {f.label}
      </span>
    </div>
  );
}
