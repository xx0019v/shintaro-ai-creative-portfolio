"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";
import { onScroll } from "@/lib/scrollBus";

/**
 * FilmScrub — a chapter leader cut from AVÉRIEL "THE WALK".
 *
 * A tall section creates scroll distance; a sticky child pins a canvas while
 * that distance is consumed; scroll position picks the frame. The footage is
 * this portfolio's own AI film work, so the dividers are not decoration —
 * they are the work, playing at the speed the reader chooses.
 *
 * No video element and no WebGL: a <video> cannot be seeked frame-accurately
 * while scrolling (Safari especially drops the seek entirely under load), and
 * a JPG sequence on a canvas is both exact and cheap.
 *
 * Cost control — these are dividers, not the subject:
 *   - 33 frames per band at 1440px wide, ~1.2MB, fetched only when the band is
 *     roughly a viewport away rather than on page load
 *   - one shared rAF for the whole page (see lib/scrollBus)
 *   - redraw is skipped when the frame index has not changed
 *   - reduced-motion gets a single held frame and no scrub
 */
export default function FilmScrub({
  band,
  frames = 33,
  /** Translation key for the chapter name laid over the band. */
  labelKey,
  /** Roman numeral / index shown above the name. */
  index,
}: {
  band: string;
  frames?: number;
  labelKey: string;
  index: string;
}) {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);

  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Arm about a viewport early, off the same ticker the scrub uses.
  useEffect(() => {
    if (armed) return;
    const el = sectionRef.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      const lead = window.innerHeight;
      if (r.top < window.innerHeight + lead && r.bottom > -lead) setArmed(true);
    };
    check();
    return onScroll(check);
  }, [armed]);

  // Load the band.
  useEffect(() => {
    if (!armed || ready) return;
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(frames);
    const settled = new Array<boolean>(frames).fill(false);
    let n = 0;

    const done = (i: number) => () => {
      if (cancelled || settled[i]) return;
      settled[i] = true;
      if (++n >= frames) {
        imagesRef.current = imgs;
        setReady(true);
      }
    };

    for (let i = 0; i < frames; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = done(i);
      img.onerror = done(i); // a hole must not stall the band
      imgs[i] = img;
      img.src = `/film/${band}/f_${String(i + 1).padStart(4, "0")}.jpg`;
    }
    return () => {
      cancelled = true;
    };
  }, [armed, ready, band, frames]);

  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    // The bands are the portfolio's own film — resampling artefacts on them
    // would undercut the work they are showing.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const draw = (i: number) => {
      const img = imagesRef.current[i];
      if (!img?.naturalWidth) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      let dw: number;
      let dh: number;
      if (cw / ch > ir) {
        dw = cw;
        dh = cw / ir;
      } else {
        dh = ch;
        dw = ch * ir;
      }
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      lastFrameRef.current = -1;
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const p = scrollable > 0
        ? Math.min(1, Math.max(0, -rect.top / scrollable))
        : 0;
      const f = Math.min(frames - 1, Math.floor(p * frames));
      if (f !== lastFrameRef.current) {
        lastFrameRef.current = f;
        draw(f);
      }
      // The name rises through the first third and clears before the cut.
      if (capRef.current) {
        const o =
          Math.min(1, Math.max(0, p / 0.14)) *
          Math.min(1, Math.max(0, 1 - (p - 0.62) / 0.16));
        capRef.current.style.opacity = String(o);
      }
    };

    resize();
    if (reduced) {
      draw(Math.floor(frames / 2));
      if (capRef.current) capRef.current.style.opacity = "1";
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    update();
    const off = onScroll(update);
    window.addEventListener("resize", resize);
    return () => {
      off();
      window.removeEventListener("resize", resize);
    };
  }, [ready, frames, reduced]);

  return (
    <section
      ref={sectionRef}
      className="film-scrub relative"
      aria-label={tr(labelKey, lang)}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-base">
        {/* The band is letterboxed rather than full-bleed: the source is
            2.393:1, and cropping it to fill a 16:9 viewport would throw away
            the composition it was framed for. */}
        <div className="relative w-full" style={{ height: "62vh" }}>
          <canvas ref={canvasRef} className="block h-full w-full" />

          <div
            ref={capRef}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: 0 }}
          >
            <span className="idx text-[10px] tracking-[0.5em] uppercase text-silver-bright/70">
              {index}
            </span>
            <span className="metallic mt-3 font-serif text-[9vw] leading-none md:text-[4.6vw]">
              {tr(labelKey, lang)}
            </span>
            <span className="mt-4 h-px w-16 bg-silver-bright/35" />
          </div>
        </div>
      </div>
    </section>
  );
}
