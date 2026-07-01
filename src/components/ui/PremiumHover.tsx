"use client";

import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (default 2.5). */
  tilt?: number;
  /** Extra glass shimmer for the fragrance section. */
  glare?: boolean;
  /** data-cursor passthrough so the contextual label still works. */
  cursor?: "VIEW" | "PLAY" | "OPEN";
  /** Render as a focusable element for keyboard users. */
  focusable?: boolean;
}

/**
 * PremiumHover — wraps any media card and adds:
 *  - a subtle cursor-tracked tilt (≤ tilt°, JS, transform only)
 *  - a thin chrome edge-light (CSS, on hover/focus)
 *  - a single diagonal sheen sweep (CSS, on hover/focus)
 *  - optional glass glare for fragrance
 *
 * Tilt is disabled on touch / coarse pointer and prefers-reduced-motion;
 * the edge-light + sweep still play via CSS :hover / :focus-within so the
 * effect degrades gracefully. All motion uses cubic-bezier(0.19,1,0.22,1).
 */
export default function PremiumHover({
  children,
  className = "",
  tilt = 2.5,
  glare = false,
  cursor,
  focusable = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = wrapRef.current;
    const el = tiltRef.current;
    if (!wrap || !el) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      ty = px * tilt * 2; // rotateY follows horizontal
      tx = -py * tilt * 2; // rotateX follows vertical
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.transform = `perspective(1100px) rotateX(${tx.toFixed(
            2
          )}deg) rotateY(${ty.toFixed(2)}deg) translateZ(0)`;
        });
      }
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      // transition handles the eased return to flat
      el.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [tilt]);

  return (
    <div
      ref={wrapRef}
      className={`premium-hover ${className}`}
      data-cursor={cursor}
      data-prox
      tabIndex={focusable ? 0 : undefined}
    >
      <div ref={tiltRef} className="ph-tilt">
        {children}
      </div>
      <span className="ph-sweep" aria-hidden />
      <span className="ph-edge" aria-hidden />
      {glare && (
        <span
          className="ph-sweep"
          aria-hidden
          style={{ opacity: undefined, mixBlendMode: "screen" }}
        />
      )}
    </div>
  );
}
