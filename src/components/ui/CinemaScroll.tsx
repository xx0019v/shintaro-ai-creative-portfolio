"use client";

import { useEffect, useRef } from "react";

/**
 * CinemaScroll — turns the whole page into one continuous lit space.
 *
 * A single rAF-throttled scroll listener drives a moving silver "key light":
 * a large radial glow whose vertical position, intensity and softness are
 * mapped from scroll progress. The result is that Hero hands its light down
 * to About, the middle sections stay quiet, and Contact re-gathers the glow
 * before the Footer lets it fade — all as ONE motion, not section toggles.
 *
 * Implementation notes
 * - No React re-renders: we mutate the glow element's style directly.
 * - No new dependency (no GSAP): native scroll + requestAnimationFrame.
 * - Writes --scroll (0..1) to :root so other CSS can react if needed.
 * - Skips entirely on touch / coarse pointer and prefers-reduced-motion;
 *   on those, a calm static glow remains (set once).
 */
export default function CinemaScroll() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const glow = glowRef.current;
    if (!glow) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    // Intensity curve across the page: bright at the very top (Hero),
    // dipping through the middle, rising again near the end (Contact),
    // then easing off at the very bottom (Footer).
    const intensityAt = (p: number) => {
      // p in 0..1
      const hero = Math.max(0, 1 - p / 0.16) * 0.9; // strong 0..16%
      const contact = Math.max(0, (p - 0.78) / 0.16) * 0.95; // rises 78..94%
      const footerFade = p > 0.96 ? (1 - (p - 0.96) / 0.04) : 1; // fade last 4%
      const base = 0.28; // quiet ambient floor for reading sections
      return Math.min(1, Math.max(base, base + hero + contact) * footerFade);
    };

    const apply = (p: number) => {
      // vertical drift: light travels from upper third down past centre
      const cy = 26 + p * 48; // 26% → 74%
      const intensity = intensityAt(p);
      // softness grows slightly as it descends (more depth, less focus)
      const inner = 26 + p * 10; // %
      const outer = 64 + p * 8;
      glow.style.background = `radial-gradient(60% 50% at 50% ${cy.toFixed(
        1
      )}%, rgba(229,229,229,${(0.16 * intensity).toFixed(
        3
      )}) 0%, rgba(192,192,192,${(0.06 * intensity).toFixed(
        3
      )}) ${inner.toFixed(0)}%, transparent ${outer.toFixed(0)}%)`;
      glow.style.opacity = String(0.55 + 0.45 * intensity);
    };

    if (reduced || coarse) {
      // static calm glow centred high
      apply(0.05);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        document.documentElement.style.setProperty("--scroll", p.toFixed(4));
        apply(p);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
      style={{
        mixBlendMode: "screen",
        transition: "opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1)",
        willChange: "opacity, background",
      }}
    />
  );
}
