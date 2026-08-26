"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

const EASE = [0.19, 1, 0.22, 1] as const;

interface Props {
  index: string;
  labelKey: keyof typeof t;
  titleEn: React.ReactNode;
  jpTitleKey?: keyof typeof t;
  align?: "left" | "center";
  /**
   * How the scene opens. Ten sections that all began with the same
   * index-rule-title stack was the single biggest reason the page read as one
   * long run of similar cards — it was not the cards, it was that every
   * ENTRANCE was identical. Sections alternate variants so no two in a row
   * open the same way.
   *
   *  stack — index above, rule, title. The original.
   *  hang  — index and label hang in a narrow left margin, title beside them.
   *  wide  — a full-width rule ABOVE, label left and index right along it,
   *          title dropped underneath. Reads as a chapter rule in a book.
   */
  variant?: "stack" | "hang" | "wide";
}

/**
 * SectionHeader — each scene opens like a film title.
 *
 * The label appears first; then a hairline of light draws across; then the
 * headline develops in — tracking settles as it lands, the way a title card
 * locks into place. JP subtitle follows a beat later. Word-wrapping is never
 * touched (the whole node animates, not per-character), so EN/JP line breaks
 * stay perfect.
 */
export default function SectionHeader({
  index,
  labelKey,
  titleEn,
  jpTitleKey,
  align = "left",
  variant = "stack",
}: Props) {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  // One tree in both motion modes. This used to return a bare <h2> under
  // reduced motion and a motion.h2 otherwise, which mismatched hydration on
  // every section heading for anyone with the OS setting on.
  const title = (
    <motion.h2
      initial={{ opacity: 0, y: 26, letterSpacing: "0.05em" }}
      whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.03em" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={
        reduced ? { duration: 0 } : { duration: 1.5, ease: EASE, delay: 0.16 }
      }
      className="metallic-still font-serif text-[clamp(2.5rem,7vw,6.25rem)] leading-[0.9]"
      // letter-spacing is not a compositable property, so naming it here
      // bought a layer and still forced layout on every frame.
      style={{ willChange: "transform, opacity" }}
    >
      {titleEn}
    </motion.h2>
  );

  const jp = jpTitleKey ? (
    <Reveal delay={0.3}>
      {/* Spacing and value both scaled to the headline: against a 100px
          mercury cut, a mt-4 silver-muted line sits under the descenders
          and reads as noise rather than a second voice. */}
      <p className="mt-7 max-w-xl font-jpserif text-base leading-relaxed tracking-wide text-silver md:text-lg">
        {tr(jpTitleKey, lang)}
      </p>
    </Reveal>
  ) : null;

  if (variant === "hang") {
    return (
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-3">
            <div className="flex items-baseline gap-4 text-[10px] uppercase tracking-wider2 text-silver md:flex-col md:items-start md:gap-3">
              <span className="idx text-silver-bright">{index}</span>
              <span aria-hidden className="h-px w-10 bg-silver/40 md:w-full" />
              <span>{tr(labelKey, lang)}</span>
            </div>
          </Reveal>
          <div className="md:col-span-9">
            {title}
            {jp}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "wide") {
    return (
      <div className="w-full">
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduced ? { duration: 0 } : { duration: 1.4, ease: EASE }}
          className="h-px w-full origin-left rule-silver"
        />
        <Reveal>
          <div className="mt-5 flex items-baseline justify-between text-[10px] uppercase tracking-wider2 text-silver">
            <span>{tr(labelKey, lang)}</span>
            <span className="idx text-silver-bright">{index}</span>
          </div>
        </Reveal>
        <div className="mt-8 max-w-5xl">
          {title}
          {jp}
        </div>
      </div>
    );
  }

  return (
    // Wider than the body measure: display type at this scale needs room to
    // break where the phrase wants to, not where a 3xl column forces it.
    <div className={`max-w-5xl ${alignment}`}>
      <Reveal>
        <div
          className={`flex items-center gap-4 text-[10px] tracking-wider2 text-silver uppercase ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="idx">{index}</span>
          <span className="h-px w-10 bg-silver/40" />
          <span>{tr(labelKey, lang)}</span>
        </div>
      </Reveal>

      {/* film-title hairline — light draws across before the title lands */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={
          reduced ? { duration: 0 } : { duration: 1.1, ease: EASE, delay: 0.05 }
        }
        className={`mt-6 h-px w-24 ${align === "center" ? "mx-auto" : "origin-left"}`}
        style={{
          background:
            "linear-gradient(90deg, rgba(229,229,229,0.75), transparent)",
          transformOrigin: align === "center" ? "center" : "left",
        }}
      />

      {/* Headline — editorial scale, cut in mercury. See the shared `title`
          above for why clamp() and why no blur on entry. */}
      <div className="mt-6">{title}</div>
      {jp}
    </div>
  );
}
