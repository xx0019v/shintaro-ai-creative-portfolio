"use client";

import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * ShaderBackdrop — a slow, breathing shader-driven gradient locked to
 * the site's monochrome palette (deep black, charcoal, soft silver).
 * Lives behind all content as a luxury cinema backdrop.
 *
 * - Pauses while the tab is hidden
 * - Lazy-loaded with IntersectionObserver
 * - Honours prefers-reduced-motion (falls back to a single still frame)
 * - Skips on touch / coarse pointer for perf
 */
export default function ShaderBackdrop() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(false);
    }
    // Skip the heavy shader on phones / low-end touch devices
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setActive(false);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
      style={{
        // 65% opacity so the existing dark grain and section backgrounds
        // dominate; the shader is a quiet undercurrent.
        opacity: 0.65,
        mixBlendMode: "screen",
      }}
    >
      {active && (
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
            uSpeed={0.12}     // very slow — luxury cinema tempo
            uStrength={1.4}
            uDensity={1.0}
            uFrequency={0}
            uAmplitude={0}
            // Monochrome palette — chrome silver gradient on black
            color1="#0a0a0a"
            color2="#1a1a1a"
            color3="#3a3a3a"
            reflection={0.05}
            // Camera + light
            cAzimuthAngle={180}
            cPolarAngle={90}
            cDistance={3.6}
            cameraZoom={1.0}
            lightType="3d"
            brightness={1.1}
            envPreset="city"
            grain="off"
            // Disable URL hash sync
            urlString=""
            // Position
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
          />
        </ShaderGradientCanvas>
      )}
    </div>
  );
}
