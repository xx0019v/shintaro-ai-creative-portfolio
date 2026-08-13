"use client";

import { useEffect, useRef, useState } from "react";
import { onScroll } from "@/lib/scrollBus";

/**
 * FilmBackdrop — the whole page sits inside one continuous film.
 *
 * Not a divider between sections: a single fixed canvas behind everything,
 * whose frame is driven by scroll progress across the ENTIRE document. The
 * reader scrolls and the world moves through backstage → entrance → the seven
 * looks → finale → the empty water, with the content floating over it. That
 * continuity is the whole point — cut it into per-section players and it goes
 * back to being decoration between paragraphs.
 *
 * Loading is chunked, not all-at-once. 182 frames would be 8MB before the
 * first paint; instead the sequence is fetched in blocks of 26 as the reader
 * approaches them, and until a block lands the canvas holds the nearest frame
 * it already has, so the picture never blanks — it just stops moving briefly.
 *
 * One shared rAF (lib/scrollBus). Redraw is skipped when the frame index has
 * not changed. Reduced-motion holds a single frame and never scrubs.
 */
const FRAMES = 182;
const CHUNK = 26;
const CHUNKS = Math.ceil(FRAMES / CHUNK);

export default function FilmBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>(
    new Array(FRAMES).fill(undefined)
  );
  const loadedRef = useRef<boolean[]>(new Array(FRAMES).fill(false));
  const requestedRef = useRef<boolean[]>(new Array(CHUNKS).fill(false));
  const lastDrawnRef = useRef(-1);
  const [firstReady, setFirstReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const loadChunk = (c: number) => {
      if (c < 0 || c >= CHUNKS || requestedRef.current[c]) return;
      requestedRef.current[c] = true;
      const start = c * CHUNK;
      const end = Math.min(FRAMES, start + CHUNK);
      for (let i = start; i < end; i++) {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          loadedRef.current[i] = true;
          if (i === 0) setFirstReady(true);
          // If the reader is already sitting on this frame, paint it now —
          // otherwise the canvas holds a stale neighbour until the next scroll.
          if (i === lastDrawnRef.current) {
            lastDrawnRef.current = -1;
            update();
          }
        };
        img.src = `/world/f_${String(i + 1).padStart(4, "0")}.jpg`;
        imagesRef.current[i] = img;
      }
    };

    /** Nearest already-decoded frame, so the picture never goes black. */
    const nearestLoaded = (i: number) => {
      if (loadedRef.current[i]) return i;
      for (let d = 1; d < FRAMES; d++) {
        if (i - d >= 0 && loadedRef.current[i - d]) return i - d;
        if (i + d < FRAMES && loadedRef.current[i + d]) return i + d;
      }
      return -1;
    };

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
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      lastDrawnRef.current = -1;
    };

    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const want = Math.min(FRAMES - 1, Math.floor(p * FRAMES));

      const c = Math.floor(want / CHUNK);
      loadChunk(c);
      loadChunk(c + 1); // stay a block ahead of the reader

      const use = nearestLoaded(want);
      if (use >= 0 && use !== lastDrawnRef.current) {
        lastDrawnRef.current = use;
        draw(use);
      }
    };

    resize();
    loadChunk(0);
    window.addEventListener("resize", resize);

    if (reduced) {
      const hold = () => {
        if (loadedRef.current[0]) draw(0);
        else window.setTimeout(hold, 200);
      };
      hold();
      return () => window.removeEventListener("resize", resize);
    }

    update();
    const off = onScroll(update);
    return () => {
      off();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <canvas
        ref={canvasRef}
        className="block h-full w-full transition-opacity duration-1000"
        style={{ opacity: firstReady ? 1 : 0 }}
      />
      {/* Scrim — deliberately heavy.
          The reference this is modelled on floats almost nothing but type over
          its world, so the world can be bright. This portfolio puts its own
          photographs and interface panels on top, and at a light scrim the two
          pictures fight: the reader sees a busy plate rather than a scene with
          work on it. Held down here the film is felt as depth and motion
          rather than read as a competing image — which is what it should be
          doing behind content. The gaps between sections are where it opens
          up, because there is nothing there to compete with.

          The blur is the other half of it: out-of-focus movement behind
          sharp content is how a real depth-of-field frame separates fore and
          background, and it stops fine footage detail from vibrating against
          body text. */}
      <div
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.93) 0%, rgba(5,5,5,0.8) 20%, rgba(5,5,5,0.74) 50%, rgba(5,5,5,0.82) 80%, rgba(5,5,5,0.95) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 75% at 50% 48%, transparent 22%, rgba(5,5,5,0.6) 100%)",
        }}
      />
    </div>
  );
}
