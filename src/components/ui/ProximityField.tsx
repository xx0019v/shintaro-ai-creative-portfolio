"use client";

import { useEffect } from "react";

/**
 * ProximityField — the single brain behind proximity-reactive elements.
 *
 * Any element tagged `data-prox` gathers a faint silver glow (and, for bento
 * cells, a hair of lift) as the cursor nears it, then settles when it leaves.
 * Instead of per-element listeners, ONE pointer-driven rAF loop measures the
 * handful of `data-prox` elements currently on screen and writes three CSS
 * vars to each: `--prox` (0..1 nearness) and `--px/--py` (cursor position in
 * the element's local space, for the glow's origin). All paint is CSS.
 *
 * Cheap by construction:
 *  - Only in-view elements are measured (IntersectionObserver).
 *  - Work runs only in the frame after a pointer move, then stops.
 *  - Skipped entirely on touch / coarse pointer and prefers-reduced-motion.
 *  - Fully self-cleans; nothing runs once unmounted.
 */
const RADIUS = 260; // px from element edge where the glow begins

export default function ProximityField() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const inView = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) inView.add(el);
          else {
            inView.delete(el);
            el.style.setProperty("--prox", "0");
          }
        }
      },
      { threshold: 0 }
    );

    // Observe existing + any added later (sections mount after loader).
    const seen = new WeakSet<HTMLElement>();
    const collect = () => {
      document.querySelectorAll<HTMLElement>("[data-prox]").forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    };
    collect();
    const mo = new MutationObserver(collect);
    mo.observe(document.body, { childList: true, subtree: true });

    let mx = -9999;
    let my = -9999;
    let raf = 0;

    const tick = () => {
      raf = 0;
      for (const el of inView) {
        const r = el.getBoundingClientRect();
        // distance from cursor to the element's rectangle (0 when inside)
        const dx = Math.max(r.left - mx, 0, mx - r.right);
        const dy = Math.max(r.top - my, 0, my - r.bottom);
        const dist = Math.hypot(dx, dy);
        const prox = dist >= RADIUS ? 0 : 1 - dist / RADIUS;
        if (prox <= 0) {
          el.style.setProperty("--prox", "0");
          continue;
        }
        // eased so the glow blooms late, near the element
        const eased = prox * prox;
        el.style.setProperty("--prox", eased.toFixed(3));
        const px = ((mx - r.left) / r.width) * 100;
        const py = ((my - r.top) / r.height) * 100;
        el.style.setProperty("--px", `${Math.max(-20, Math.min(120, px)).toFixed(1)}%`);
        el.style.setProperty("--py", `${Math.max(-20, Math.min(120, py)).toFixed(1)}%`);
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
