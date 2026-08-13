"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { onScroll } from "@/lib/scrollBus";

/**
 * FilmStage — puts a section INSIDE the film instead of after it.
 *
 * FilmScrub is a leader: you watch it, it ends, then you read — "clip, then
 * content, then clip". A stage pins the footage behind a section for that
 * section's whole height, so the world keeps moving while you read and the
 * page never leaves it.
 *
 * Only for SPARSE sections. The first attempt at this wrapped a data console
 * and the scrim needed to keep a dense grid legible hid the footage
 * completely — 4MB of frames for nothing. A stage earns its weight only
 * where the content is a headline and a couple of lines.
 *
 * Legibility is the real constraint. The scrim is a vertical wash plus a
 * centred pool rather than a flat dim: the corners stay open so the frame is
 * visible as a frame, and the middle — where the words are — gets enough
 * black to hold contrast against the brightest part of the sequence.
 */
export default function FilmStage({
  band,
  frames = 33,
  children,
  /** 0..1 — how present the footage is behind the words. */
  intensity = 0.6,
}: {
  band: string;
  frames?: number;
  children: ReactNode;
  intensity?: number;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  useEffect(() => {
    if (armed) return;
    const el = stageRef.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      const lead = window.innerHeight;
      if (r.top < window.innerHeight + lead && r.bottom > -lead) setArmed(true);
    };
    check();
    return onScroll(check);
  }, [armed]);

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
      img.onerror = done(i);
      imgs[i] = img;
      img.src = `/film/${band}/f_${String(i + 1).padStart(4, "0")}.jpg`;
    }
    return () => {
      cancelled = true;
    };
  }, [armed, ready, band, frames]);

  useEffect(() => {
    if (!ready) return;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
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
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      lastFrameRef.current = -1;
    };

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const span = stage.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const f = Math.min(frames - 1, Math.floor(p * frames));
      if (f !== lastFrameRef.current) {
        lastFrameRef.current = f;
        draw(f);
      }
    };

    resize();
    if (reduced) {
      draw(Math.floor(frames / 2));
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
    <div ref={stageRef} className="relative">
      <div
        aria-hidden
        className="pointer-events-none sticky top-0 h-screen w-full overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          style={{ opacity: intensity, filter: "saturate(0.7) contrast(1.05)" }}
        />
        {/* Vertical wash — the section has to hand off to black at both ends
            or the film looks pasted in rather than continuous. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.55) 22%, rgba(5,5,5,0.35) 50%, rgba(5,5,5,0.62) 80%, #050505 100%)",
          }}
        />
        {/* Reading pool — a soft ellipse of extra black under the words only,
            so the corners of the frame stay open. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(62% 46% at 50% 50%, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.4) 55%, rgba(5,5,5,0) 100%)",
          }}
        />
      </div>

      <div className="relative -mt-[100vh]" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
