"use client";

import { useEffect } from "react";

/**
 * WarpInView — makes the works feel alive on scroll, no hover required.
 *
 * While a work image is on screen it carries the liquid-metal displacement
 * filter, so its surface visibly undulates as you scroll past — the molten
 * chrome language extended to the works themselves. When it leaves the
 * viewport the filter is dropped, so only what you're actually looking at
 * pays the cost.
 *
 * One IntersectionObserver, class toggling only. Skipped entirely on touch /
 * coarse pointer and prefers-reduced-motion (filters are expensive there and
 * the reveal/parallax already carries those devices).
 */
export default function WarpInView() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          (e.target as HTMLElement).classList.toggle("in-view", e.isIntersecting);
        }
      },
      { threshold: 0.15 }
    );

    const seen = new WeakSet<Element>();
    const collect = () => {
      document.querySelectorAll<HTMLElement>(".warp-target").forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    };
    collect();
    const t = window.setTimeout(collect, 1600); // catch anything mounted late

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return null;
}
