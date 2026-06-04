import Reveal from "./Reveal";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: React.ReactNode;
  jpTitle?: string;
  kicker?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  index,
  label,
  title,
  jpTitle,
  kicker,
  align = "left",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <Reveal>
        <div
          className={`flex items-center gap-4 text-[10px] tracking-wider2 text-champagne uppercase ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="idx">{index}</span>
          <span className="h-px w-10 bg-champagne/40" />
          <span>{label}</span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ivory">
          {title}
        </h2>
      </Reveal>

      {jpTitle && (
        <Reveal delay={0.16}>
          <p className="mt-4 font-jpserif text-sm md:text-base text-muted tracking-wide">
            {jpTitle}
          </p>
        </Reveal>
      )}

      {kicker && (
        <Reveal delay={0.22}>
          <p className="mt-6 text-sm md:text-base text-muted/90 max-w-2xl leading-relaxed">
            {kicker}
          </p>
        </Reveal>
      )}
    </div>
  );
}
