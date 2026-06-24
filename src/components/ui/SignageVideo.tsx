"use client";

import { useState } from "react";

interface Props {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
}

/**
 * SignageVideo — muted autoplay loop framed in monochrome editorial style.
 * Falls back gracefully if the file is missing.
 */
export default function SignageVideo({ src, poster, caption, className = "" }: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <figure className={`editorial-frame ${className}`} data-cursor="PLAY">
      <div className="relative aspect-[9/16] overflow-hidden bg-charcoal max-h-[640px] mx-auto">
        {!errored ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setErrored(true)}
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] contrast-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-center px-6">
            <div>
              <p className="font-serif text-silver-muted text-sm">Digital Signage</p>
              <p className="mt-1 text-[10px] tracking-wider2 uppercase text-silver-muted/70">
                video unavailable
              </p>
            </div>
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        {/* Live tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2 text-[9px] tracking-wider2 uppercase text-silver-bright">
          <span className="h-1.5 w-1.5 rounded-full bg-silver-bright animate-glow" />
          On-site signage
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 px-2 flex items-center justify-between text-[10px] tracking-wider2 uppercase text-silver-muted">
          <span>{caption}</span>
          <span className="text-silver/60">— Loop · Muted</span>
        </figcaption>
      )}
    </figure>
  );
}
