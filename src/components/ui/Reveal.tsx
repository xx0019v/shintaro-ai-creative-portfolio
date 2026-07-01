"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

// Single luxurious deceleration curve used across the site — same as the loader.
// Slow, controlled, no bounce, no overshoot.
const LUX_EASE = [0.19, 1, 0.22, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?:
    | "div"
    | "section"
    | "h2"
    | "h3"
    | "p"
    | "span"
    | "li"
    | "article"
    | "ol"
    | "ul"
    | "header"
    | "footer"
    | "nav";
  once?: boolean;
  /**
   * Cinematic "develop" — the element resolves from a soft blur (and a hair of
   * scale) as it settles, like a shot coming into focus. Opt-in so existing
   * calls are untouched. Auto-disabled on touch to keep mobile cheap.
   */
  cinematic?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  y = 14,                  // subtler movement (was 20)
  duration = 1.4,          // slower, more refined (was 1.0)
  className,
  as = "div",
  once = true,
  cinematic = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [rich, setRich] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    // Blur filters are the expensive part — only run them on precise pointers
    // with a roomy viewport (desktop). Touch / narrow stays on plain y-fade.
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setRich(!coarse && !narrow);
  }, []);

  if (!mounted || reduced) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  const Component = motion[as] as typeof motion.div;
  const useCinema = cinematic && rich;

  return (
    <Component
      initial={
        useCinema
          ? { opacity: 0, y, filter: "blur(10px)", scale: 0.992 }
          : { opacity: 0, y }
      }
      whileInView={
        useCinema
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once, amount: 0.18 }}
      transition={{ duration, ease: LUX_EASE, delay }}
      className={className}
      style={useCinema ? { willChange: "transform, opacity, filter" } : undefined}
    >
      {children}
    </Component>
  );
}
