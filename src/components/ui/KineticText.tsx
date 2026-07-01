"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * KineticText — per-letter cinematic reveal for headings.
 *
 * As the line scrolls into view each character resolves in turn: it rises a
 * little, un-blurs, and settles (blur only on desktop). The stagger makes the
 * words assemble like type being set — the moment where the text becomes the
 * subject — then it holds, perfectly still and readable. Pairs naturally with
 * ShatterText (same easing, same restraint).
 *
 * Reuses the site's single easing language. Renders plain, static text on
 * prefers-reduced-motion. Mobile keeps the y-stagger but drops the blur to
 * stay light. One-shot (once) so there's no ongoing work after reveal.
 */
export default function KineticText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.028,
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [rich, setRich] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setRich(!coarse && !narrow);
  }, []);

  if (!mounted || reduced) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{text}</Plain>;
  }

  const Container = motion[as] as typeof motion.span;
  const chars = Array.from(text);

  return (
    <Container
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="kinetic-char"
          data-space={ch === " " ? "1" : undefined}
          variants={{
            hidden: {
              opacity: 0,
              y: "0.42em",
              filter: rich ? "blur(7px)" : "blur(0px)",
            },
            show: {
              opacity: 1,
              y: "0em",
              filter: "blur(0px)",
              transition: { duration: 0.9, ease: EASE },
            },
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </Container>
  );
}
