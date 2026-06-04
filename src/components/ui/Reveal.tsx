"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { easeLuxe } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "h2" | "h3" | "p" | "span" | "li" | "article" | "ol" | "ul" | "header" | "footer" | "nav";
  once?: boolean;
}

/**
 * Reveal — SSR-resilient fade-up.
 *
 * Content renders fully visible by default (no FOUC, no broken screenshots,
 * no-JS friendly). After mount, framer-motion takes over and adds the
 * subtle entrance animation on the first time the element enters the viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  duration = 1.0,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR / pre-hydration / reduced-motion: plain element, fully visible.
  if (!mounted || reduced) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, ease: easeLuxe, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
