"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  variant?: "headshot" | "full";
  className?: string;
  desaturate?: boolean;
  priority?: boolean;
}

/**
 * PortraitFrame — silver-edged frame for the personal portrait/character image.
 * Falls back to an empty silver outline if the file is missing, so the site
 * still renders cleanly before assets are dropped in.
 */
export default function PortraitFrame({
  src,
  alt,
  variant = "headshot",
  className = "",
  desaturate = true,
  priority,
}: Props) {
  const [errored, setErrored] = useState(false);
  const aspect = variant === "headshot" ? "aspect-square" : "aspect-[3/4]";

  return (
    <div className={`premium-hover relative ${aspect} ${className} group`}>
      {/* silver frame ring */}
      <div className="absolute -inset-px hairline-silver pointer-events-none" aria-hidden />
      {/* faint silver glow */}
      <div
        aria-hidden
        className="absolute -inset-2 opacity-30 blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(229,229,229,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full h-full overflow-hidden bg-charcoal">
        {!errored ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 80vw, 480px"
            onError={() => setErrored(true)}
            className={`object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
              desaturate ? "grayscale contrast-[1.05]" : ""
            }`}
          />
        ) : (
          // placeholder when file missing
          <div className="absolute inset-0 grid place-items-center text-center px-6">
            <div>
              <p className="font-serif text-silver-muted text-sm">
                Portrait
              </p>
              <p className="mt-1 text-[10px] tracking-wider2 uppercase text-silver-muted/70">
                /images/portrait/
              </p>
            </div>
          </div>
        )}

        {/* monochrome wash to keep tone consistent */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-luminosity"
          style={{ background: "rgba(245,245,245,0.04)" }}
        />
      </div>

      {/* premium hover — silver edge + sheen sweep (no tilt, keeps ticks stable) */}
      <span className="ph-sweep" aria-hidden />
      <span className="ph-edge" aria-hidden />

      {/* corner ticks */}
      <CornerTick className="-top-2 -left-2" />
      <CornerTick className="-top-2 -right-2" flipX />
      <CornerTick className="-bottom-2 -left-2" flipY />
      <CornerTick className="-bottom-2 -right-2" flipX flipY />
    </div>
  );
}

function CornerTick({
  className = "",
  flipX,
  flipY,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <div
      className={`absolute ${className} pointer-events-none`}
      style={{ transform: `${flipX ? "scaleX(-1) " : ""}${flipY ? "scaleY(-1)" : ""}` }}
      aria-hidden
    >
      <div className="h-3 w-3 border-t border-l border-silver/70" />
    </div>
  );
}
