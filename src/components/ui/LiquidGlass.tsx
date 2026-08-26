"use client";

import { useEffect, useRef } from "react";

/**
 * LiquidGlass — wraps an element with a real refractive Apple-style
 * liquid glass lens via the `liquid-glass-js` library.
 *
 * The library renders an SVG filter that displaces pixels of a cloned
 * background — so we need to point it at the element BEHIND this lens.
 *
 * Used as a floating accent (the chat launcher) — the lens shows what's
 * behind it slightly magnified, with chromatic aberration and a
 * normal-based specular highlight.
 */
interface Props {
  /** Element id of the background to refract. Defaults to "main". */
  backgroundSelector?: string;
  width?: number;
  height?: number;
  radius?: number;
  scale?: number;
  chroma?: number;
  blur?: number;
  edge?: number;
  glow?: number;
  x?: number;
  y?: number;
  zIndex?: number;
  draggable?: boolean;
  /** Render only when this is true. Used to gate by visibility / device. */
  active?: boolean;
}

export default function LiquidGlass({
  backgroundSelector = "main",
  width = 160,
  height = 56,
  radius = 28,
  scale = 38,
  chroma = 0.06,
  blur = 0,
  edge = 0.75,
  glow = 0.22,
  x,
  y,
  zIndex = 60,
  draggable = false,
  active = true,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const glassRef = useRef<any>(null);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let cancelled = false;
    (async () => {
      const mod = await import("liquid-glass-js");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const LiquidGlassCls: any = (mod as any).default ?? mod;
      const bg = document.querySelector(backgroundSelector);
      if (!bg || cancelled) return;
      try {
        const inst = new LiquidGlassCls({
          background: bg,
          width,
          height,
          radius,
          scale,
          chroma,
          blur,
          edge,
          glow,
          draggable,
          zIndex,
          ...(typeof x === "number" ? { x } : {}),
          ...(typeof y === "number" ? { y } : {}),
        });
        glassRef.current = inst;
      } catch {
        /* fall through silently */
      }
    })();

    return () => {
      cancelled = true;
      try {
        glassRef.current?.destroy?.();
      } catch {
        /* noop */
      }
      glassRef.current = null;
    };
  }, [
    backgroundSelector,
    width,
    height,
    radius,
    scale,
    chroma,
    blur,
    edge,
    glow,
    x,
    y,
    zIndex,
    draggable,
    active,
  ]);

  return null;
}
