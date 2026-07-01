"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * KineticText — per-letter cinematic reveal for headings only.
 *
 * As the line scrolls into view each character resolves in turn: it rises a
 * little, un-blurs, and settles (blur only on desktop). The stagger makes the
 * words assemble like type being set — the moment where the text becomes the
 * subject — then it holds, perfectly still and readable. Pairs with
 * ShatterText (same easing, same restraint) and is kept off body copy.
 *
 * Words stay whole: each word is an inline-block that never breaks internally,
 * so lines wrap between words like normal type (no letter-by-letter wrapping).
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
  stagger = 0.026,
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

  // Split into words, then characters — words stay whole (each word is an
  // inline-block that never breaks internally), so lines wrap between words
  // like normal type. Only the per-character stagger is kinetic.
  const words = text.split(" ");
  let charIndex = 0;

  const charVariants = {
    hidden: {
      opacity: 0,
      y: "0.32em",
      filter: rich ? "blur(5px)" : "blur(0px)",
    },
    show: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: EASE },
    },
  };

  return (
    <Container
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi}>
          <span
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
            aria-hidden
          >
            {Array.from(word).map((ch) => (
              <motion.span
                key={charIndex++}
                className="kinetic-char"
                variants={charVariants}
              >
                {ch}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </Container>
  );
}
