"use client";

import { useEffect, useRef } from "react";

/**
 * Thin silver progress meter pinned to the top of the viewport.
 * Tracks page scroll percentage via rAF-throttled handler.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const scrolled = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${pct})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[55] h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, rgba(229,229,229,0.85) 0%, rgba(192,192,192,0.55) 100%)",
        transform: "scaleX(0)",
        transformOrigin: "left center",
        willChange: "transform",
      }}
      ref={ref}
      aria-hidden
    />
  );
}
