"use client";

import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * ShaderBackdrop — section-aware monochrome shader gradient.
 *
 * The shader itself is constant — what changes is the WRAPPER OPACITY,
 * smoothly tweened via CSS as the user scrolls between sections. So the
 * site breathes silver light in the cinematic openings (Hero, Contact)
 * and quiets to charcoal during reading sections (About, Education).
 *
 * Layering map (luxury 3-stack):
 *   Layer 1 — bg-base + grain        (always on, in CSS)
 *   Layer 2 — ShaderBackdrop          (this component, opacity 0.32..0.85)
 *   Layer 3 — AmbientBackdrop dust    (canvas particles, always-on dust)
 *
 *  Opacity per active section ID:
 *    top         0.85    Hero (loader handoff, strongest)
 *    about       0.42
 *    projects    0.68    AI CAMERA — diagrams welcome reflection
 *    fragrance   0.78    Liquid energy
 *    client      0.40    Quiet for the embedded TSC iframe
 *    keychain    0.55    Product display lighting
 *    leadership  0.36    Human warmth, low chrome
 *    skills      0.60    Card reflection
 *    strengths   0.36
 *    education   0.32    Calm record
 *    contact     0.86    Final cinematic crescendo
 *
 * Skipped entirely on prefers-reduced-motion or touch / coarse pointer.
 * Lazy-loaded via IntersectionObserver. Pauses on tab hidden.
 */

const SECTION_INTENSITY: Record<string, number> = {
  top: 0.85,
  about: 0.42,
  projects: 0.68,
  fragrance: 0.78,
  client: 0.4,
  keychain: 0.55,
  leadership: 0.36,
  skills: 0.6,
  strengths: 0.36,
  education: 0.32,
  contact: 0.86,
};

const DEFAULT_OPACITY = 0.55;

export default function ShaderBackdrop() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(false);
      return;
    }
    // On touch / coarse pointer devices, fall back to a quiet CSS-only
    // radial silver glow (no shader). Set 'active' false and we render the
    // CSS fallback below.
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setActive(false);
      return;
    }
  }, []);

  // Section-aware opacity — set per the section currently in view
  useEffect(() => {
    if (!mounted || !active) return;
    if (typeof window === "undefined") return;

    const ratios = new Map<string, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (!id) continue;
          ratios.set(id, e.intersectionRatio);
        }
        // pick the section with the highest visibility ratio
        let bestId = "";
        let bestRatio = 0;
        for (const [id, r] of ratios) {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestId && SECTION_INTENSITY[bestId] !== undefined) {
          setOpacity(SECTION_INTENSITY[bestId]);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );

    // Observe every section that has an ID
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => obs.observe(s));

    return () => obs.disconnect();
  }, [mounted, active]);

  if (!mounted) return null;

  // Mobile / reduced-motion fallback — quiet CSS radial silver gradient
  // that mimics the breathing without WebGL. Still feels intentional, not cheap.
  if (!active) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(229,229,229,0.10) 0%, rgba(192,192,192,0.04) 35%, transparent 75%)",
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
      style={{
        opacity,
        mixBlendMode: "screen",
        transition: "opacity 1.6s cubic-bezier(0.19, 1, 0.22, 1)",
        willChange: "opacity",
      }}
    >
      <ShaderGradientCanvas
        pointerEvents="none"
        pixelDensity={1}
        fov={45}
        lazyLoad
        rootMargin="0px"
        threshold={0}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          uTime={0}
          uSpeed={0.12}
          uStrength={1.4}
          uDensity={1.0}
          uFrequency={0}
          uAmplitude={0}
          color1="#0a0a0a"
          color2="#1a1a1a"
          color3="#3a3a3a"
          reflection={0.05}
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={3.6}
          cameraZoom={1.0}
          lightType="3d"
          brightness={1.1}
          envPreset="city"
          grain="off"
          urlString=""
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
