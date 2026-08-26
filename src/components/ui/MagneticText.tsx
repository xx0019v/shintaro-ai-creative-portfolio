"use client";

import { useEffect, useRef } from "react";

/**
 * useMagneticText — attaches a quiet "pull toward cursor" to the INNER
 * content of an element while the hit area and layout stay fixed.
 *
 * The wrapper element keeps its exact box (so click targets and column
 * widths never shift); only a child marked with the returned ref moves,
 * capped at a few px. Eased return via CSS transition. Disabled on touch
 * and prefers-reduced-motion.
 *
 * Shares the site easing: cubic-bezier(0.19, 1, 0.22, 1).
 *
 * Usage:
 *   const { hostRef, innerRef } = useMagneticText(4);
 *   <a ref={hostRef}><span ref={innerRef} className="inline-block">…</span></a>
 */
export function useMagneticText(strengthPx = 4, radius = 56) {
  const hostRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const host = hostRef.current;
    const inner = innerRef.current;
    if (!host || !inner) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      inner.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(
        2
      )}px, 0)`;
      if (Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05 && !active) {
        inner.style.transform = "translate3d(0,0,0)";
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) / 2 + radius;
      if (dist < reach) {
        active = true;
        const f = 1 - dist / reach; // 0..1 closer = stronger
        tx = (dx / (dist || 1)) * strengthPx * f;
        ty = (dy / (dist || 1)) * strengthPx * f * 0.7; // gentler vertical
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

    // listen on window so the pull begins slightly before the pointer
    // actually enters the small text box (feels magnetic, not snappy)
    window.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strengthPx, radius]);

  return { hostRef, innerRef };
}

const EASE = "cubic-bezier(0.19, 1, 0.22, 1)";

/**
 * MagneticLink — a nav anchor whose label text pulls toward the cursor
 * while the anchor's own box (and underline span) stay put.
 */
export function MagneticLink({
  href,
  children,
  className = "",
  onClick,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const { hostRef, innerRef } = useMagneticText(4, 40);
  return (
    <a
      ref={hostRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      className={`group relative ${className}`}
      aria-current={active ? "true" : undefined}
    >
      <span
        ref={innerRef as React.RefObject<HTMLSpanElement>}
        className="inline-block"
        style={{ transition: `transform 600ms ${EASE}`, willChange: "transform" }}
      >
        {children}
      </span>
      {/* current-section / hover underline */}
      <span
        className={`absolute -bottom-1.5 left-0 right-0 h-px bg-silver origin-left transition-transform duration-500 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
        aria-hidden
      />
    </a>
  );
}
