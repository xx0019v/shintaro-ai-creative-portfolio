import Image from "next/image";
import PremiumHover from "./PremiumHover";

interface Props {
  src: string;
  alt: string;
  ratio?: "portrait" | "video" | "square" | "wide";
  caption?: string;
  desaturate?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Adds extra glass shimmer (fragrance section). */
  glare?: boolean;
}

const ratioClass = {
  portrait: "aspect-[3/4]",
  video: "aspect-[16/9]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

/**
 * EditorialFrame — wraps any image in a silver/black luxury frame so even
 * colorful assets read as monochrome editorial. Optional desaturate filter.
 */
export default function EditorialFrame({
  src,
  alt,
  ratio = "portrait",
  caption,
  desaturate = false,
  className = "",
  priority,
  sizes,
  glare = false,
}: Props) {
  return (
    <PremiumHover cursor="VIEW" glare={glare} focusable className="block">
    <figure className={`editorial-frame group/ef ${className}`}>
      <div className={`relative overflow-hidden ${ratioClass[ratio]} bg-charcoal`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className={`object-cover ${desaturate ? "grayscale-[0.15] contrast-[1.02]" : ""}`}
        />
        {/* subtle vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 px-2 flex items-center justify-between text-[10px] tracking-wider2 uppercase text-silver-muted">
          <span>{caption}</span>
          <span className="text-silver/60">— Archive</span>
        </figcaption>
      )}
    </figure>
    </PremiumHover>
  );
}
