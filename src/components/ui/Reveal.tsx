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
}

export default function Reveal({
  children,
  delay = 0,
  y = 14,                  // subtler movement (was 20)
  duration = 1.4,          // slower, more refined (was 1.0)
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduced) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration, ease: LUX_EASE, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
