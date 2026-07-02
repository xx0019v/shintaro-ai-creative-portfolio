"use client";

import PortraitFrame from "./PortraitFrame";

/**
 * ModelFallback — Mode A, the "Premium 2.5D Portrait".
 *
 * The graceful default whenever the 3D avatar isn't shown (no avatar.glb,
 * touch/mobile, reduced motion, or a load error). It's the existing silver-
 * framed portrait plus a soft floor reflection, so the fallback still reads as
 * a lit exhibit rather than a flat image — and never shifts the layout.
 */
export default function ModelFallback({
  poster,
  alt,
  variant = "full",
}: {
  poster: string;
  alt: string;
  variant?: "headshot" | "full";
}) {
  return (
    <div className="relative">
      <PortraitFrame src={poster} alt={alt} variant={variant} priority />
      {/* soft chrome floor reflection */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-6 h-6 w-2/3 blur-md opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(229,229,229,0.22), transparent 72%)",
        }}
      />
    </div>
  );
}
