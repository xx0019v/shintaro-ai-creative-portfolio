"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Parallax — scroll-scrub drift for a single visual element.
 *
 * As the wrapper travels through the viewport, its child is translated on Y
 * (and optionally faded / lifted in scale) so imagery "rises from depth" like
 * a piece lit on a wall in a luxury exhibition — instead of snapping in with a
 * one-shot reveal. The motion is tied to scroll position, so scrolling up or
 * down runs it in reverse: the section reads as a scene the viewer moves
 * *through*, not a card that flips on.
 *
 * Cost: one Intersection-gated `useScroll` per instance, GPU transforms only,
 * spring-smoothed. Passes straight through (no motion, no listener) on
 * prefers-reduced-motion and on touch / coarse-pointer devices, so mobile
 * stays light.
 *
 *   distance  peak travel in px (default 40). Positive = child starts lower
 *             and rises as you scroll down.
 *   fade      also fade 0.6 → 1 across entry (default false).
 *   lift      also scale 0.985 → 1 across entry (default false).
 *
 * Split into two components on purpose. The motion hooks all live in
 * ParallaxMotion, which is only mounted when the effect is actually wanted.
 *
 * Previously everything sat in one component with an `if (!enabled) return`
 * after the hooks, because hooks cannot be called conditionally. That returned
 * a plain div, but `useSpring` had still been created and was still subscribed
 * to `useScroll`, so framer-motion kept a frame loop alive for a value nothing
 * rendered. Measured: one continuous 60/s rAF loop on desktop with
 * prefers-reduced-motion enabled, where the budget is zero. Mounting or not
 * mounting the hook-owning component is the fix; a guard after the hooks
 * cannot be.
 */
export default function Parallax({
  children,
  distance = 40,
  fade = false,
  lift = false,
  className,
}: {
  children: ReactNode;
  distance?: number;
  fade?: boolean;
  lift?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Coarse-pointer / narrow viewports get the static passthrough.
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setEnabled(!reduced && !coarse && !narrow);
  }, [reduced]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ParallaxMotion
      distance={distance}
      fade={fade}
      lift={lift}
      className={className}
    >
      {children}
    </ParallaxMotion>
  );
}

function ParallaxMotion({
  children,
  distance,
  fade,
  lift,
  className,
}: {
  children: ReactNode;
  distance: number;
  fade: boolean;
  lift: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // start when top of element hits bottom of viewport → end when it leaves top
    offset: ["start end", "end start"],
  });

  const ySpring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  // element enters from +distance (below), settles at 0 around mid-viewport,
  // then drifts slightly up (-distance*0.4) as it exits — a gentle float.
  const y = useTransform(ySpring, [0, 0.5, 1], [distance, 0, -distance * 0.4]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.28, 1],
    fade ? [0.55, 1, 1] : [1, 1, 1]
  );
  const scale = useTransform(
    ySpring,
    [0, 0.5, 1],
    lift ? [0.985, 1, 1] : [1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, opacity, scale, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
