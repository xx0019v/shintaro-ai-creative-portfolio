"use client";

import { useEffect, useRef } from "react";

interface ShatterTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3";
  radius?: number;          // px proximity that triggers shatter
  strength?: number;        // px max displacement at the closest point
  recoverMs?: number;       // ms to fall back to origin
}

/**
 * ShatterText — each character drifts away from the pointer when it
 * comes close, then gracefully returns. No particle decoration — the
 * letterforms themselves are the medium.
 *
 * RAF-throttled, single global mousemove listener, IntersectionObserver
 * gates work when the element is offscreen.
 */
export default function ShatterText({
  text,
  className,
  as = "span",
  radius = 110,
  strength = 36,
  recoverMs = 5000,
}: ShatterTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const root = ref.current;
    const spans = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-shatter-char]")
    );

    // Per-char state — origin offset (always 0) and current applied delta
    const last = new WeakMap<HTMLSpanElement, number>();
    let mx = -9999;
    let my = -9999;
    let visible = false;
    let raf = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(root);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      raf = 0;
      if (!visible) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const now = performance.now();
      const r2 = radius * radius;

      for (const span of spans) {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const d2 = dx * dx + dy * dy;

        if (d2 < r2) {
          const d = Math.sqrt(d2);
          const force = 1 - d / radius;
          const tx = (dx / (d || 1)) * force * strength;
          const ty = (dy / (d || 1)) * force * strength;
          const rot = (dx / radius) * force * 18;
          const op = 0.6 + (1 - force) * 0.4;
          span.style.transition = "transform 120ms cubic-bezier(0.22,1,0.36,1), opacity 200ms cubic-bezier(0.22,1,0.36,1)";
          span.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
          span.style.opacity = String(op);
          last.set(span, now);
        } else {
          const t = last.get(span);
          if (t !== undefined && now - t > 60) {
            // start recovery
            span.style.transition = `transform ${recoverMs}ms cubic-bezier(0.16,1,0.3,1), opacity ${Math.min(
              recoverMs,
              1800
            )}ms cubic-bezier(0.22,1,0.36,1)`;
            span.style.transform = "translate3d(0,0,0) rotate(0deg)";
            span.style.opacity = "1";
            last.delete(span);
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [radius, strength, recoverMs]);

  const Component = (as as unknown) as React.ElementType;

  return (
    <Component ref={ref} className={className}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          data-shatter-char
          style={{
            display: "inline-block",
            willChange: "transform, opacity",
            transformOrigin: "center",
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </Component>
  );
}
