"use client";

import { useEffect, useRef } from "react";

/**
 * Luxury silver cursor — small filled dot follows the pointer 1:1,
 * a larger ring trails with smooth lerp. Both expand/dim over
 * interactive elements (a, button, role="button"). Hidden on touch
 * devices. RequestAnimationFrame-driven, never re-renders React.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // skip on touch / coarse pointer
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let hidden = true;

    const setHidden = (h: boolean) => {
      if (hidden === h) return;
      hidden = h;
      if (dotRef.current) dotRef.current.style.opacity = h ? "0" : "1";
      if (ringRef.current) ringRef.current.style.opacity = h ? "0" : "1";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (hidden) setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    };

    const onLeave = () => setHidden(true);

    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, [contenteditable]'
      );
      if (!ringRef.current || !dotRef.current) return;
      if (interactive) {
        ringRef.current.style.width = "44px";
        ringRef.current.style.height = "44px";
        ringRef.current.style.marginLeft = "-22px";
        ringRef.current.style.marginTop = "-22px";
        ringRef.current.style.borderColor = "rgba(229,229,229,0.85)";
        dotRef.current.style.opacity = "0";
      } else {
        ringRef.current.style.width = "28px";
        ringRef.current.style.height = "28px";
        ringRef.current.style.marginLeft = "-14px";
        ringRef.current.style.marginTop = "-14px";
        ringRef.current.style.borderColor = "rgba(229,229,229,0.55)";
        dotRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

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
          transition: "opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform, opacity",
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[90] pointer-events-none hidden md:block"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderRadius: "50%",
          border: "1px solid rgba(229,229,229,0.55)",
          opacity: 0,
          transition:
            "width 500ms cubic-bezier(0.22, 1, 0.36, 1), height 500ms cubic-bezier(0.22, 1, 0.36, 1), margin 500ms cubic-bezier(0.22, 1, 0.36, 1), border-color 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform, opacity",
        }}
        aria-hidden
      />
    </>
  );
}
