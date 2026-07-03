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
    <div className={`max-w-3xl ${alignment}`}>
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

      {/* headline — tracking settles + un-blurs like a title card locking in */}
      {reduced ? (
        <h2 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-offwhite">
          {titleEn}
        </h2>
      ) : (
        <motion.h2
          initial={{
            opacity: 0,
            y: 22,
            letterSpacing: "0.06em",
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            letterSpacing: "-0.01em",
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.16 }}
          className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-offwhite"
          style={{ willChange: "transform, opacity, filter, letter-spacing" }}
        >
          {titleEn}
        </motion.h2>
      )}

      {jpTitleKey && (
        <Reveal delay={0.3}>
          <p className="mt-4 font-jpserif text-sm md:text-base text-silver-muted tracking-wide">
            {tr(jpTitleKey, lang)}
          </p>
        </Reveal>
      )}
    </div>
  );
}
