"use client";

import PortraitFrame from "./PortraitFrame";

/**
 * ModelFallback — Mode A, the "Premium 2.5D Portrait" (upgraded).
 *
 * Until (or unless) avatar.glb exists, the portrait must already read as a
 * piece in a lit case rather than a flat photo:
 *  - a chrome rim-light hugs the frame's edges
 *  - a diagonal glass sheen sits over the surface like a vitrine
 *  - a real mirrored reflection fades away beneath it (display-stand)
 *  - a soft pool of light grounds it on the floor
 * Pure CSS layers, zero JS; identical markup slot as the 3D scene, so the
 * GLB upgrade later is seamless.
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
      {/* chrome rim-light — the case edge catches the key light */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[2px] z-[2]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.35), transparent 24%, transparent 72%, rgba(192,192,192,0.28))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />

      <PortraitFrame src={poster} alt={alt} variant={variant} priority />

      {/* vitrine sheen — a diagonal pane of glass light over the surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(118deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 18%, transparent 34%, transparent 78%, rgba(229,229,229,0.05) 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* true reflection — the portrait mirrored, fading fast (display stand) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-full h-24 overflow-hidden opacity-[0.16]"
        style={{
          transform: "scaleY(-1)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          className="w-full object-cover object-top grayscale"
          style={{ filter: "blur(2px) grayscale(1) brightness(0.9)" }}
        />
      </div>

      {/* floor pool — soft light grounds the piece */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-8 h-8 w-3/4 blur-lg opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(229,229,229,0.28), transparent 72%)",
        }}
      />
    </div>
  );
}
