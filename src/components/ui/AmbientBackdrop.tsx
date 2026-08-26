"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackdrop — quiet silver dust drifting site-wide.
 * Subtle parallax: dust slowly leans toward the cursor.
 * Canvas-based, capped pixel ratio, pauses when tab is hidden.
 *
 * Sits behind all content but above the bg-base background.
 */
export default function AmbientBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // particle count scales with viewport area but is capped
    const targetCount = Math.min(
      70,
      Math.max(28, Math.floor((W * H) / 36000))
    );
    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;       // radius
      a: number;       // alpha
      tw: number;      // twinkle phase
    }
    const ps: P[] = Array.from({ length: targetCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      r: 0.6 + Math.random() * 1.4,
      a: 0.25 + Math.random() * 0.45,
      tw: Math.random() * Math.PI * 2,
    }));

    let mx = W / 2;
    let my = H / 2;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    let raf = 0;
    let paused = false;
    const onVis = () => {
      paused = document.hidden;
      if (!paused) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      raf = 0;
      ctx.clearRect(0, 0, W, H);
      // subtle parallax toward cursor (very small)
      const px = (mx - W / 2) * 0.005;
      const py = (my - H / 2) * 0.005;

      for (const p of ps) {
        p.x += p.vx + px;
        p.y += p.vy + py;
        p.tw += 0.012;

        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        const twinkle = 0.7 + Math.sin(p.tw) * 0.3;
        const alpha = p.a * twinkle;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `rgba(245,245,245,${alpha})`);
        grad.addColorStop(0.4, `rgba(229,229,229,${alpha * 0.5})`);
        grad.addColorStop(1, "rgba(192,192,192,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!paused) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
      style={{ background: "transparent" }}
    />
  );
}
