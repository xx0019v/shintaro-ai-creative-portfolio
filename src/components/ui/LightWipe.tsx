"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LightWipe — a cinematic cut between scenes.
 *
 * When the marker scrolls into view (once), a thin silver light sweeps across
 * the full viewport width like a film cut — a single horizontal filament with
 * a soft trailing sheen, gone in under a second. Used sparingly at the most
 * important scene changes only (into About, into Contact); the paper tear
 * owns the Works threshold.
 *
 * IntersectionObserver fires it once, pure CSS animation, zero cost at rest.
 * Disabled on prefers-reduced-motion.
 */
export default function LightWipe() {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setFired(true);
          io.disconnect();
        }
      },
      { threshold: 0.9 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="light-wipe" aria-hidden>
      {fired && !reduced && <span className="light-wipe__beam" />}
    </div>
  );
}
