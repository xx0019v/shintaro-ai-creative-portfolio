interface PlaceholderProps {
  label: string;
  subLabel?: string;
  ratio?: "video" | "portrait" | "square" | "wide";
  tone?: "dark" | "fragrance" | "warm" | "tech";
  className?: string;
}

const ratioClass = {
  video: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

const tones = {
  dark:
    "from-[#101010] via-[#181818] to-[#0B0B0B]",
  fragrance:
    "from-[#1a1413] via-[#2a1f1d] to-[#0f0c0c]",
  warm:
    "from-[#1a1612] via-[#241a13] to-[#0e0b09]",
  tech:
    "from-[#0c1014] via-[#101820] to-[#0a0d10]",
};

export default function Placeholder({
  label,
  subLabel,
  ratio = "video",
  tone = "dark",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden hairline ${ratioClass[ratio]} ${className}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tones[tone]}`}
        aria-hidden
      />
      {/* glow orb */}
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-champagne/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-ivory/[0.04] blur-3xl"
        aria-hidden
      />
      {/* gold crosshair frame */}
      <div className="absolute inset-6 hairline-gold opacity-40" aria-hidden />
      {/* corner marks */}
      <CornerMark className="top-3 left-3" />
      <CornerMark className="top-3 right-3" flipX />
      <CornerMark className="bottom-3 left-3" flipY />
      <CornerMark className="bottom-3 right-3" flipX flipY />

      <div className="absolute inset-0 grid place-items-center text-center px-6">
        <div>
          <p className="font-serif text-2xl md:text-3xl text-ivory/85 tracking-tight">
            {label}
          </p>
          {subLabel && (
            <p className="mt-3 text-[11px] tracking-wider2 text-champagne/80 uppercase">
              {subLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CornerMark({
  className = "",
  flipX,
  flipY,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const transform = `${flipX ? "scaleX(-1) " : ""}${flipY ? "scaleY(-1)" : ""}`;
  return (
    <div className={`absolute ${className}`} style={{ transform }}>
      <div className="h-3 w-3 border-t border-l border-champagne/60" />
    </div>
  );
}
