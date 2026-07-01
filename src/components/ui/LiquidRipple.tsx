"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * LiquidRipple — touch a piece and it ripples like chrome on water.
 *
 * On tap / click (the "touch"), the wrapped element gives a small liquid
 * wobble — a scale-and-skew swell that settles back in under a second — and a
 * single specular line slides across it. Tiny amplitude (skew ≤ 0.5°, scale
 * ±1.4%), the site's easing, and it returns to rest with a little follow-
 * through. Quiet, expensive-feeling, never jittery.
 *
 * Pure CSS animation toggled by a class (no library, no rAF). Fires only on
 * the touched element. Disabled on prefers-reduced-motion. Composes cleanly
 * with the Parallax / PremiumHover transforms on neighbouring elements since
 * each lives on its own node.
 */
export default function LiquidRipple({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const ripple = () => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-rippling");
    void el.offsetWidth; // restart the animation cleanly
    el.classList.add("is-rippling");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => el.classList.remove("is-rippling"), 1000);
  };

  return (
    <div ref={ref} className={`liquid-ripple ${className}`} onPointerDown={ripple}>
      {children}
    </div>
  );
}
