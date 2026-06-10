"use client";

import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
}

/**
 * MagneticButton — wraps any interactive child and translates it
 * toward the cursor within a proximity radius. Smooth lerp via rAF,
 * GPU transforms only, no React re-renders.
 */
export default function MagneticButton({
  children,
  className,
  radius = 80,
  strength = 0.25,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05 && !active) {
        cx = tx;
        cy = ty;
        inner.style.transform = `translate3d(0,0,0)`;
        raf = 0;
        return;
      }
      inner.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = e.clientX - (r.left + r.width / 2);
      const py = e.clientY - (r.top + r.height / 2);
      const dist = Math.sqrt(px * px + py * py);
      if (dist < radius) {
        active = true;
        tx = px * strength;
        ty = py * strength;
      } else if (active) {
        active = false;
        tx = 0;
        ty = 0;
      } else {
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      active = false;
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [radius, strength]);

  return (
    <div ref={wrapRef} className={`inline-block ${className ?? ""}`}>
      <div
        ref={innerRef}
        style={{ willChange: "transform", transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {children}
      </div>
    </div>
  );
}
