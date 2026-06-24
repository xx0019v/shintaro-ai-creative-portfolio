"use client";

import { useEffect, useRef } from "react";

/**
 * Luxury silver cursor.
 *
 * - A small chrome dot follows the pointer 1:1.
 * - A larger ring trails with a soft, liquid lag (lerp 0.16).
 * - Over interactive elements the ring expands and dims the dot.
 * - When the hovered element (or an ancestor) carries a `data-cursor`
 *   attribute, that short label (VIEW / OPEN / PLAY …) fades into the
 *   ring — the cursor itself tells you what the thing does.
 * - Hidden on touch / coarse pointers and when prefers-reduced-motion.
 *
 * rAF-driven, never re-renders React. All motion uses the site's single
 * easing language: cubic-bezier(0.19, 1, 0.22, 1).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let hidden = true;
    let mode: "idle" | "link" | "label" = "idle";

    const dot = () => dotRef.current;
    const ring = () => ringRef.current;
    const label = () => labelRef.current;

    const setHidden = (h: boolean) => {
      if (hidden === h) return;
      hidden = h;
      const o = h ? "0" : "1";
      if (dot()) dot()!.style.opacity = mode === "label" ? "0" : o;
      if (ring()) ring()!.style.opacity = o;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (hidden) setHidden(false);
      const d = dot();
      if (d) d.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const onLeave = () => setHidden(true);

    const animate = () => {
      // liquid lag — ring eases toward the pointer
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const r = ring();
      if (r) r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    const toIdle = () => {
      mode = "idle";
      const r = ring();
      const d = dot();
      const l = label();
      if (!r || !d || !l) return;
      r.style.width = "28px";
      r.style.height = "28px";
      r.style.marginLeft = "-14px";
      r.style.marginTop = "-14px";
      r.style.borderColor = "rgba(229,229,229,0.55)";
      r.style.background = "transparent";
      d.style.opacity = "1";
      l.style.opacity = "0";
    };

    const toLink = () => {
      mode = "link";
      const r = ring();
      const d = dot();
      const l = label();
      if (!r || !d || !l) return;
      r.style.width = "44px";
      r.style.height = "44px";
      r.style.marginLeft = "-22px";
      r.style.marginTop = "-22px";
      r.style.borderColor = "rgba(229,229,229,0.85)";
      r.style.background = "transparent";
      d.style.opacity = "0";
      l.style.opacity = "0";
    };

    const toLabel = (text: string) => {
      mode = "label";
      const r = ring();
      const d = dot();
      const l = label();
      if (!r || !d || !l) return;
      l.textContent = text;
      const w = 56 + text.length * 4;
      r.style.width = `${w}px`;
      r.style.height = "56px";
      r.style.marginLeft = `${-w / 2}px`;
      r.style.marginTop = "-28px";
      r.style.borderColor = "rgba(229,229,229,0.9)";
      r.style.background = "rgba(245,245,245,0.06)";
      d.style.opacity = "0";
      l.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        toLabel(labelled.dataset.cursor || "VIEW");
        return;
      }
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, [contenteditable]'
      );
      if (interactive) toLink();
      else toIdle();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const EASE = "cubic-bezier(0.19, 1, 0.22, 1)";

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[90] pointer-events-none hidden md:block"
        style={{
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          borderRadius: "50%",
          background: "#F5F5F5",
          opacity: 0,
          transition: `opacity 300ms ${EASE}`,
          willChange: "transform, opacity",
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[90] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderRadius: 9999,
          border: "1px solid rgba(229,229,229,0.55)",
          background: "transparent",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          opacity: 0,
          transition: `width 600ms ${EASE}, height 600ms ${EASE}, margin 600ms ${EASE}, border-color 500ms ${EASE}, background-color 500ms ${EASE}, opacity 300ms ${EASE}`,
          willChange: "transform, opacity",
        }}
        aria-hidden
      >
        <div
          ref={labelRef}
          style={{
            opacity: 0,
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#F5F5F5",
            transition: `opacity 320ms ${EASE}`,
            paddingLeft: "0.28em",
          }}
        />
      </div>
    </>
  );
}
