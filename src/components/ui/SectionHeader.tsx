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
}

/**
 * SectionHeader — each scene opens like a film title.
 *
 * The label appears first; then a hairline of light draws across; then the
 * headline develops in — tracking settles from slightly-spread to normal
 * while it un-blurs, the way a title card locks into place. JP subtitle
 * follows a beat later. Word-wrapping is never touched (whole node animates,
 * not per-character), so EN/JP line breaks stay perfect.
 */
export default function SectionHeader({
  index,
  labelKey,
  titleEn,
  jpTitleKey,
  align = "left",
}: Props) {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

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
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
          className={`mt-6 h-px w-24 ${align === "center" ? "mx-auto" : "origin-left"}`}
          style={{
            background:
              "linear-gradient(90deg, rgba(229,229,229,0.75), transparent)",
            transformOrigin: align === "center" ? "center" : "left",
          }}
        />
      )}

      {/* Headline — editorial scale, cut in mercury.
          clamp() rather than breakpoint steps so the title grows with the
          column instead of jumping at 768 and 1024; negative tracking and
          0.9 leading because display sizes need both or they just read as
          enlarged body copy.

          No blur on entry any more: `filter` on a background-clip:text
          element spawns its own rendering context and browsers routinely
          drop the clipped fill for the duration. The tracking settle alone
          carries the "title card locking in" read. */}
      {reduced ? (
        <h2 className="metallic-still mt-6 font-serif text-[clamp(2.5rem,7vw,6.25rem)] leading-[0.9] tracking-[-0.03em]">
          {titleEn}
        </h2>
      ) : (
        <motion.h2
          initial={{ opacity: 0, y: 26, letterSpacing: "0.05em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.03em" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.16 }}
          className="metallic-still mt-6 font-serif text-[clamp(2.5rem,7vw,6.25rem)] leading-[0.9]"
          style={{ willChange: "transform, opacity, letter-spacing" }}
        >
          {titleEn}
        </motion.h2>
      )}

      {jpTitleKey && (
        <Reveal delay={0.3}>
          // Spacing and value both scaled to the headline: against a 100px
          // mercury cut, the old mt-4 / silver-muted subtitle was crowded
          // under the descenders and read as noise rather than a second voice.
          <p className="mt-7 max-w-xl font-jpserif text-base md:text-lg leading-relaxed text-silver tracking-wide">
            {tr(jpTitleKey, lang)}
          </p>
        </Reveal>
      )}
    </div>
  );
}
