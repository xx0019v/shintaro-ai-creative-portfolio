"use client";

import dynamic from "next/dynamic";
import {
  Component,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import ModelFallback from "./ModelFallback";

/**
 * ModelViewer — the drop-in slot for the Avendano 3D avatar.
 *
 * Behaviour (per spec):
 *  - If `/models/avatar.glb` exists (HEAD 200) AND the device is capable
 *    (desktop, fine pointer, not reduced-motion), it lazy-mounts the WebGL
 *    scene — but only while on screen (IntersectionObserver), so nothing runs
 *    off-screen or before the model is confirmed present.
 *  - Otherwise it renders the Premium 2.5D portrait (ModelFallback).
 *  - Any runtime error in the 3D scene is caught and falls back to 2.5D.
 *
 * Today (no avatar.glb) this is visually identical to the current portrait and
 * loads zero 3D code. Drop the file in and it upgrades itself.
 *
 * Set LIQUID_METAL to true to render the model as a chrome monochrome avatar
 * (Mode B) instead of realistic skin.
 */

const LIQUID_METAL = false;

const Model3DScene = dynamic(() => import("./Model3DScene"), { ssr: false });

class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function ModelViewer({
  src = "/models/avatar.glb",
  poster,
  alt,
  variant = "full",
}: {
  src?: string;
  poster: string;
  alt: string;
  variant?: "headshot" | "full";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false);
  const [spin, setSpin] = useState(true);
  const [hasModel, setHasModel] = useState(false);
  const [inView, setInView] = useState(false);

  // capability + reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCapable(!coarse && !narrow);
    setSpin(!reduced);
  }, []);

  // only probe for the model on capable devices (no wasted request/chunk)
  useEffect(() => {
    if (!capable) return;
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => {
        if (alive) setHasModel(r.ok);
      })
      .catch(() => {
        if (alive) setHasModel(false);
      });
    return () => {
      alive = false;
    };
  }, [capable, src]);

  // mount the canvas only while on screen
  useEffect(() => {
    const el = ref.current;
    if (!el || !capable) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [capable]);

  const fallback = (
    <ModelFallback poster={poster} alt={alt} variant={variant} />
  );

  const show3D = capable && hasModel;

  return (
    <div ref={ref} className="relative">
      {show3D ? (
        <div className={variant === "headshot" ? "aspect-square" : "aspect-[3/4]"}>
          <SceneBoundary fallback={fallback}>
            {inView ? (
              <Model3DScene src={src} spin={spin} liquidMetal={LIQUID_METAL} />
            ) : (
              fallback
            )}
          </SceneBoundary>
        </div>
      ) : (
        fallback
      )}
    </div>
  );
}
