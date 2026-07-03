"use client";

import { useEffect, useRef, useState } from "react";
import { useLaunch } from "@/context/LaunchContext";

/**
 * AtelierFrame — the signature experience. The whole site sits inside a
 * black-silver DIGITAL ATELIER: an ultra-thin instrument frame around the
 * viewport that makes scrolling feel like operating a space, not reading
 * a page.
 *
 *  - hairline frame + corner ticks around the viewport
 *  - top-centre: the current CHAPTER readout (updates as scenes change)
 *  - right edge: a fine ruler with a live position marker
 *  - bottom-left: atelier signature + live scroll coordinate
 *
 * Desktop only (hidden < md). One IntersectionObserver for the chapter,
 * one rAF-throttled scroll listener writing textContent + a transform —
 * no React re-renders after mount. Appears only after the loader hands
 * over, so the opening ritual stays clean.
 */
const CHAPTERS: Record<string, string> = {
  top: "01 · INTRO",
  about: "02 · PROFILE",
  projects: "03 · AI CAMERA",
  fragrance: "04 · FRAGRANCE",
  client: "05 · CLIENT",
  keychain: "06 · KEYCHAIN",
  leadership: "07 · LEADERSHIP",
  skills: "08 · SKILLS",
  strengths: "09 · STRENGTHS",
  education: "10 · RECORD",
  contact: "11 · CONTACT",
};

export default function AtelierFrame() {
  const { launched } = useLaunch();
  const [chapter, setChapter] = useState("01 · INTRO");
  const coordRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  // chapter readout — follows the scene currently in view
  useEffect(() => {
    if (typeof window === "undefined" || !launched) return;
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (id) ratios.set(id, e.intersectionRatio);
        }
        let best = "";
        let r = 0;
        ratios.forEach((v, k) => {
          if (v > r) {
            r = v;
            best = k;
          }
        });
        if (best && CHAPTERS[best]) setChapter(CHAPTERS[best]);
      },
      { threshold: [0, 0.3, 0.6] }
    );
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [launched]);

  // live coordinate + ruler marker — direct DOM writes, no re-render
  useEffect(() => {
    if (typeof window === "undefined" || !launched) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (coordRef.current)
          coordRef.current.textContent = `Y ${(p * 100).toFixed(1).padStart(5, "0")}`;
        if (markerRef.current)
          markerRef.current.style.top = `${(p * 100).toFixed(2)}%`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [launched]);

  if (!launched) return null;

  return (
    <div
      className="atelier-frame pointer-events-none fixed inset-0 z-[75] hidden md:block"
      aria-hidden
    >
      {/* hairline frame */}
      <div className="af-line af-top" />
      <div className="af-line af-bottom" />
      <div className="af-line af-left" />
      <div className="af-line af-right" />
      {/* corner ticks */}
      <span className="af-tick af-tl" />
      <span className="af-tick af-tr" />
      <span className="af-tick af-bl" />
      <span className="af-tick af-br" />

      {/* chapter readout */}
      <div className="af-chapter">
        <span className="af-chapter-dot" />
        <span key={chapter} className="af-chapter-text">
          {chapter}
        </span>
      </div>

      {/* right ruler + live marker */}
      <div className="af-ruler">
        <span ref={markerRef} className="af-marker" />
      </div>

      {/* atelier signature + live coordinate */}
      <div className="af-sig">
        <span>AVENDAÑO — DIGITAL ATELIER</span>
        <span className="af-sig-sep" />
        <span ref={coordRef} className="idx">
          Y 000.0
        </span>
      </div>
    </div>
  );
}
