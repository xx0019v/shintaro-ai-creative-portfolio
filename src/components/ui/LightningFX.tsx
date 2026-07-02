"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LightningFX — a rare silver arc across the dark.
 *
 * Not a neon game bolt: a thin chrome-white filament that flickers across the
 * Hero backdrop once every several seconds, draws in, flashes, and is gone —
 * like static electricity crawling over liquid metal. Monochrome, low peak
 * opacity, soft glow. Rare by design so it reads as a luxury flourish, never
 * decoration.
 *
 * One self-scheduling timer (randomised 6–13s gaps), paused when the tab is
 * hidden. Pure CSS flash. Disabled entirely on prefers-reduced-motion.
 */
const BOLTS = [
  "M 300 -20 L 340 180 L 300 210 L 360 430 L 320 470 L 380 760",
  "M 900 -20 L 860 160 L 910 200 L 850 410 L 900 450 L 840 760",
  "M 620 -20 L 660 150 L 610 210 L 670 380 L 620 440 L 690 760",
];

export default function LightningFX() {
  const [bolt, setBolt] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const off = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    const schedule = () => {
      const gap = 6000 + Math.random() * 7000; // 6–13s
      timer.current = setTimeout(() => {
        if (!alive) return;
        if (!document.hidden) {
          setBolt(Math.floor(Math.random() * BOLTS.length));
          off.current = setTimeout(() => setBolt(null), 320);
        }
        schedule();
      }, gap);
    };
    schedule();

    return () => {
      alive = false;
      if (timer.current) clearTimeout(timer.current);
      if (off.current) clearTimeout(off.current);
    };
  }, []);

  return (
    <svg
      className="lightning-fx"
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden
    >
      {bolt !== null && (
        <path key={bolt} className="lightning-bolt" d={BOLTS[bolt]} />
      )}
    </svg>
  );
}
