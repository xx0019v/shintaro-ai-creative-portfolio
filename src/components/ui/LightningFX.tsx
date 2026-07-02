"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LightningFX — a rare silver arc across the dark (evolved).
 *
 * Not a neon game bolt. Each strike is a thin chrome-white filament with a
 * couple of secondary forks, a soft ionization afterglow that lingers a beat
 * longer, and a whisper of ambient bloom that briefly lifts the whole dark
 * frame — as if static electricity crawled over the liquid metal and lit the
 * room for an instant. Sometimes it stutters into a quick double-strike.
 *
 * Monochrome, low peak opacity, rare (6–13s). One self-scheduling timer,
 * paused when the tab is hidden; disabled on prefers-reduced-motion.
 */
const BOLTS: { main: string; forks: string[] }[] = [
  {
    main: "M 300 -20 L 340 180 L 300 210 L 360 430 L 320 470 L 380 760",
    forks: ["M 300 210 L 244 306 L 272 356", "M 360 430 L 436 512 L 410 560"],
  },
  {
    main: "M 900 -20 L 860 160 L 910 200 L 850 410 L 900 450 L 840 760",
    forks: ["M 910 200 L 968 292 L 940 342", "M 850 410 L 782 500 L 806 548"],
  },
  {
    main: "M 620 -20 L 660 150 L 610 210 L 672 384 L 622 440 L 690 760",
    forks: ["M 610 210 L 552 300 L 580 350", "M 672 384 L 742 470 L 716 520"],
  },
];

export default function LightningFX() {
  const [bolt, setBolt] = useState<number | null>(null);
  const [key, setKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    const push = (t: ReturnType<typeof setTimeout>) => timers.current.push(t);

    const strike = () => {
      if (!alive || document.hidden) return;
      const b = Math.floor(Math.random() * BOLTS.length);
      setBolt(b);
      setKey((k) => k + 1);
      push(setTimeout(() => setBolt(null), 360));
      // occasional quick double-strike for realism
      if (Math.random() < 0.35) {
        push(
          setTimeout(() => {
            if (!alive || document.hidden) return;
            setBolt(b);
            setKey((k) => k + 1);
            push(setTimeout(() => setBolt(null), 300));
          }, 460)
        );
      }
    };

    const schedule = () => {
      const gap = 6000 + Math.random() * 7000; // 6–13s
      push(
        setTimeout(() => {
          strike();
          schedule();
        }, gap)
      );
    };
    schedule();

    return () => {
      alive = false;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  return (
    <>
      {/* ambient bloom — briefly lifts the dark when it strikes */}
      <div
        className={`lightning-bloom ${bolt !== null ? "is-lit" : ""}`}
        key={`bloom-${key}`}
        aria-hidden
      />
      <svg
        className="lightning-fx"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden
      >
        {bolt !== null && (
          <g key={key}>
            {/* afterglow (blurred, lingers) */}
            <path className="lightning-glow" d={BOLTS[bolt].main} />
            {/* sharp core */}
            <path className="lightning-bolt" d={BOLTS[bolt].main} />
            {BOLTS[bolt].forks.map((f, i) => (
              <path key={i} className="lightning-branch" d={f} />
            ))}
          </g>
        )}
      </svg>
    </>
  );
}
