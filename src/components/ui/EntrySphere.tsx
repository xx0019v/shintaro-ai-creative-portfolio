"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLaunch } from "@/context/LaunchContext";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * EntrySphere — the threshold before the LiquidLoader.
 *
 * A black-silver liquid-metal sphere breathes at screen centre. Touch /
 * click / Enter / Space collapses it as molten silver and calls launch(),
 * which starts the existing LiquidLoader. Because both backdrops are pure
 * black, the handoff reads as one continuous sequence:
 *   Entry Sphere → LiquidLoader → Hero.
 *
 * Pure CSS / SVG — no WebGL, no new dependency. Unmounts entirely once
 * the collapse finishes. Forces scroll to top while shown.
 */
export default function EntrySphere() {
  const { launched, launch } = useLaunch();
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "collapsing">("idle");
  const [gone, setGone] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const begin = () => {
    if (firedRef.current) return; // no double-launch
    firedRef.current = true;
    window.scrollTo(0, 0);
    if (reduced) {
      // minimal: skip the collapse, hand straight to the loader
      setGone(true);
      launch();
      return;
    }
    setPhase("collapsing");
    // let the molten collapse play, then start the loader beneath
    window.setTimeout(() => launch(), 520);
    window.setTimeout(() => setGone(true), 900);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      begin();
    }
  };

  if (!mounted || gone || launched) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="entry"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "collapsing" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: phase === "collapsing" ? 0.3 : 0 }}
        className="fixed inset-0 z-[110] bg-base flex flex-col items-center justify-center"
        role="button"
        tabIndex={0}
        aria-label={tr("entry_aria", lang)}
        onClick={begin}
        onKeyDown={onKey}
        style={{ cursor: "pointer" }}
      >
        {/* faint ambient silver — keeps tone with the ShaderGradient behind */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 46%, rgba(229,229,229,0.08) 0%, rgba(192,192,192,0.03) 30%, transparent 66%)",
          }}
        />

        {/* the sphere */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={
            phase === "collapsing"
              ? { scale: 1.5, opacity: 0 }
              : reduced
              ? { scale: 1, opacity: 1 }
              : { scale: [1, 1.035, 1], opacity: 1 }
          }
          transition={
            phase === "collapsing"
              ? { duration: 0.7, ease: EASE }
              : reduced
              ? { duration: 0.6, ease: EASE }
              : {
                  scale: { duration: 6, ease: "easeInOut", repeat: Infinity },
                  opacity: { duration: 1.2, ease: EASE },
                }
          }
          whileHover={reduced ? undefined : { scale: 1.06 }}
          className="relative"
          style={{
            width: "clamp(120px, 18vw, 210px)",
            height: "clamp(120px, 18vw, 210px)",
            willChange: "transform, opacity",
          }}
        >
          {/* liquid metal body — chrome radial with a slight squash via border-radius */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "48% 52% 50% 50% / 52% 48% 52% 48%",
              background:
                "radial-gradient(circle at 36% 30%, #ffffff 0%, #e5e5e5 14%, #9a9a9a 44%, #3a3a3a 72%, #0c0c0c 100%)",
              boxShadow:
                "inset 0 -16px 36px rgba(0,0,0,0.7), inset 0 10px 22px rgba(255,255,255,0.18), 0 30px 80px -24px rgba(0,0,0,0.85), 0 0 60px -10px rgba(229,229,229,0.22)",
            }}
          />
          {/* chrome reflection band that drifts over the surface */}
          <motion.div
            aria-hidden
            className="absolute inset-0 overflow-hidden"
            style={{ borderRadius: "48% 52% 50% 50% / 52% 48% 52% 48%" }}
          >
            <motion.div
              initial={{ y: "-120%" }}
              animate={reduced ? { y: "10%" } : { y: ["-120%", "120%"] }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 5.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }
              }
              className="absolute left-0 right-0 h-1/2"
              style={{
                top: 0,
                background:
                  "linear-gradient(180deg, transparent, rgba(245,245,245,0.42), transparent)",
                mixBlendMode: "screen",
                filter: "blur(2px)",
              }}
            />
          </motion.div>
          {/* top catch-light */}
          <div
            aria-hidden
            className="absolute"
            style={{
              top: "14%",
              left: "26%",
              width: "30%",
              height: "20%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)",
              filter: "blur(3px)",
            }}
          />
        </motion.div>

        {/* copy */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: phase === "collapsing" ? 0 : 0.85, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="mt-12 text-[11px] tracking-[0.42em] uppercase text-silver-bright"
        >
          {tr("entry_copy", lang)}
        </motion.p>

        {/* skip — quiet, bottom */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            begin();
          }}
          aria-label={tr("entry_skip", lang)}
          className="absolute bottom-8 text-[10px] tracking-[0.32em] uppercase text-silver-muted/70 hover:text-silver-bright transition-colors"
        >
          {tr("entry_skip", lang)}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
