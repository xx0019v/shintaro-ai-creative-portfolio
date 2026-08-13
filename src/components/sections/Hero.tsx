"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useLaunch } from "@/context/LaunchContext";
import { tr } from "@/lib/translations";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Hero — one statement, centred in the film.
 *
 * Rebuilt from a two-column layout that carried a signature block, an
 * identity line, a three-line headline, a headshot inside orbit rings with a
 * specimen readout, a Japanese paragraph, a sub-paragraph, a role line, a
 * six-item tag list, a "currently" block and a scroll cue — eleven things
 * competing for the first three seconds. That is the shape of a CV, and no
 * amount of polish on the parts fixes it.
 *
 * Now the whole page runs inside a continuous film (ui/FilmBackdrop), so the
 * Hero does not need to supply its own imagery: the world is already moving
 * behind it. What it needs to supply is one sentence, said at full size and
 * held. Everything cut from here still exists further down — the portrait
 * opens About, the disciplines are the Skills section — so nothing is lost,
 * it is just no longer shouted at the door.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const { launched } = useLaunch();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Opening wash — as the loader hands over, one sweep of silver light
          crosses the Hero and binds it to the film underneath. Plays once. */}
      {launched && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5]"
          initial={{ opacity: 0.9, backgroundPosition: "50% -80%" }}
          animate={{ opacity: 0, backgroundPosition: "50% 160%" }}
          transition={{ duration: 2.4, ease: EASE }}
          style={{
            background:
              "linear-gradient(180deg, transparent 20%, rgba(229,229,229,0.16) 42%, rgba(255,255,255,0.30) 50%, rgba(229,229,229,0.16) 58%, transparent 80%)",
            backgroundSize: "100% 220%",
            mixBlendMode: "screen",
          }}
        />
      )}

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        {/* Name and role on one line — an attribution, not a header block. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.42em] text-silver"
        >
          <span>{tr("hero_name", lang)}</span>
          <span aria-hidden className="h-px w-8 bg-silver/35" />
          <span className="text-silver-muted">{tr("hero_role", lang)}</span>
        </motion.p>

        {/* The statement. Set as large as the column allows and left to hold
            the frame on its own — the one thing the first screen has to do. */}
        <h1 className="mt-8 font-serif text-[clamp(2.6rem,8.2vw,8.25rem)] leading-[0.88] tracking-[-0.035em]">
          {[tr("hero_h1_a", lang), null, tr("hero_h1_c", lang)].map((line, i) =>
            line === null ? (
              <Line key="mid" delay={0.36} reduced={!!reduced}>
                <span className="font-light italic text-offwhite/80">into</span>{" "}
                <span className="metallic">Systems,</span>
              </Line>
            ) : (
              <Line key={line} delay={0.24 + i * 0.12} reduced={!!reduced}>
                <span className="metallic-still">{line}</span>
              </Line>
            )
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.72 }}
          className="mt-8 max-w-xl font-jpserif text-base leading-loose text-offwhite/80 md:text-lg"
        >
          {tr("hero_jp_main", lang)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.88 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            <a
              href="#projects"
              data-prox
              className="lg-btn lg-btn--primary group text-[11px] uppercase tracking-wider2"
            >
              {tr("hero_cta_projects", lang)}
              <ArrowUpRight
                size={14}
                strokeWidth={1.25}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              data-prox
              className="lg-btn group text-[11px] uppercase tracking-wider2"
            >
              {tr("hero_cta_contact", lang)}
              <ArrowUpRight size={14} strokeWidth={1.25} />
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 1.2 }}
        className="group absolute bottom-10 z-10 flex flex-col items-center gap-3 text-[9px] uppercase tracking-[0.42em] text-silver-muted transition-colors hover:text-offwhite"
      >
        {tr("hero_scroll", lang)}
        <ArrowDown
          size={13}
          strokeWidth={1.25}
          className="transition-transform duration-700 group-hover:translate-y-1"
        />
      </motion.a>
    </section>
  );
}

/**
 * One headline line, rising out of its own clipping mask.
 *
 * The mask is what makes it read as film rather than a fade: the line is
 * revealed by moving, not by changing opacity, so it arrives the way a title
 * card slides into frame. overflow-hidden on a block wrapper, never on the
 * text itself, so descenders are not clipped once it settles.
 */
function Line({
  children,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  reduced: boolean;
}) {
  if (reduced) return <span className="block">{children}</span>;
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
