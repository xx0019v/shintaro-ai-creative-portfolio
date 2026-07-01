"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLaunch } from "@/context/LaunchContext";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const EASE = [0.19, 1, 0.22, 1] as const;

type Phase = "idle" | "hovering" | "activating" | "gone";

/**
 * EntrySphere — the ritual threshold before the LiquidLoader.
 *
 * A liquid-metal sphere floats in black space, breathing. Faint orbiting
 * dust drifts toward it; on hover the gravity tightens and a light gathers;
 * on activate the sphere sinks, then the metal unfurls outward as the
 * existing LiquidLoader takes over beneath. Both backdrops are pure black,
 * so Entry Sphere → LiquidLoader → Hero reads as one film.
 *
 * State machine: idle → hovering → activating → gone (unmounts).
 * Pure CSS/SVG (no WebGL). One rAF for the dust only while shown; it stops
 * the moment the sphere unmounts. Honors reduced-motion + touch.
 */
export default function EntrySphere() {
  const { launched, launch } = useLaunch();
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const firedRef = useRef(false);
  const dustLayerRef = useRef<HTMLDivElement>(null);

  // deterministic dust ring around the sphere (PC — rAF driven)
  const dust = useMemo(() => {
    let s = 23;
    const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: 22 }, (_, i) => {
      const ang = (i / 22) * Math.PI * 2 + rand() * 0.4;
      const rad = 120 + rand() * 160;
      return {
        id: i,
        ang,
        rad,
        size: 1 + rand() * 2.2,
        speed: 0.0009 + rand() * 0.0014,
        depth: rand(),
      };
    });
  }, []);

  // Chapter labels — small uppercase signage that floats around the sphere
  // and is drawn into the core on activation. Desktop = 7, mobile = 4.
  // Text comes from translations.ts; positions are angular around the sphere
  // centre, with per-label drift offsets fed to a CSS keyframe (no rAF).
  const labels = useMemo(() => {
    const desktop = [
      "entry_chapter_ai",
      "entry_chapter_fragrance",
      "entry_chapter_client",
      "entry_chapter_keychain",
      "entry_chapter_leadership",
      "entry_chapter_skills",
      "entry_chapter_contact",
    ] as const;
    const mobile = [
      "entry_chapter_m_ai",
      "entry_chapter_m_brand",
      "entry_chapter_m_work",
      "entry_chapter_m_contact",
    ] as const;
    const keys = isTouch ? mobile : desktop;
    const radius = isTouch ? 132 : 254;
    let s = 113;
    const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return keys.map((key, i) => {
      const ang = -Math.PI / 2 + (i / keys.length) * Math.PI * 2;
      // proximity to sphere shapes brightness slightly — outer labels dimmer.
      // Here all share one radius, so use angular position to vary instead.
      const tx = Math.cos(ang) * radius;
      const ty = Math.sin(ang) * radius * 0.92;
      return {
        key,
        tx,
        ty,
        // independent drift parameters per label so they don't sync
        fx: (rand() - 0.5) * 8,
        fy: -2 - rand() * 5,
        dur: 8 + rand() * 4,
        delay: rand() * 4,
        op: 0.34 + rand() * 0.12,
      };
    });
  }, [isTouch]);

  // lightweight CSS motes around the sphere (mobile — no rAF, 8 dots)
  const motes = useMemo(() => {
    let s = 71;
    const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: 8 }, (_, i) => {
      const ang = (i / 8) * Math.PI * 2 + rand() * 0.3;
      const rad = 92 + rand() * 54; // tight ring around the sphere
      return {
        id: i,
        tx: Math.cos(ang) * rad,
        ty: Math.sin(ang) * rad * 0.92,
        size: 2 + rand() * 2,
        fx: (rand() - 0.5) * 14,
        fy: (rand() - 0.5) * 14,
        op: 0.3 + rand() * 0.25,
        dur: 6 + rand() * 4,
        delay: rand() * 3,
      };
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    // Treat coarse-pointer OR narrow viewport as "mobile": both get the
    // lightweight CSS motes instead of the rAF dust.
    setIsTouch(
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
        window.matchMedia("(max-width: 768px)").matches
    );
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // dust animation — orbits, leans toward centre, and is sucked in while activating
  useEffect(() => {
    if (!mounted || phase === "gone") return;
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const layer = dustLayerRef.current;
    if (!layer) return;
    const nodes = Array.from(
      layer.querySelectorAll<HTMLSpanElement>("[data-dust]")
    );
    let raf = 0;
    let t = 0;
    let pull = 0; // 0 idle → 1 sucked into the core

    const tick = () => {
      t += 1;
      // ease pull toward target based on phase
      const target = phase === "activating" ? 1 : phase === "hovering" ? 0.18 : 0;
      pull += (target - pull) * 0.06;
      nodes.forEach((n, i) => {
        const d = dust[i];
        if (!d) return;
        const a = d.ang + t * d.speed * (1 - pull * 0.7);
        const r = d.rad * (1 - pull); // collapse inward as pull → 1
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r * 0.92;
        const op = (0.18 + d.depth * 0.3) * (1 - pull * 0.6);
        n.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
          1
        )}px, 0)`;
        n.style.opacity = String(op);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, phase, reduced, dust]);

  const begin = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    window.scrollTo(0, 0);
    if (reduced) {
      setPhase("gone");
      launch();
      return;
    }
    setPhase("activating");
    // sink (0.45s) → unfurl + hand to loader (1.2s) → unmount (1.6s)
    window.setTimeout(() => launch(), 1200);
    window.setTimeout(() => setPhase("gone"), 1600);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      begin();
    }
  };

  if (!mounted || phase === "gone" || launched) return null;

  const activating = phase === "activating";

  return (
    <AnimatePresence>
      <motion.div
        key="entry"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-0 z-[110] bg-base flex flex-col items-center justify-center"
        data-cursor={tr("entry_cursor", lang)}
        role="button"
        tabIndex={0}
        aria-label={tr("entry_aria", lang)}
        title={tr("entry_aria", lang)}
        onClick={begin}
        onKeyDown={onKey}
        onPointerEnter={() => phase === "idle" && setPhase("hovering")}
        onPointerLeave={() => phase === "hovering" && setPhase("idle")}
        style={{ cursor: "pointer" }}
      >
        {/* ambient silver to match the ShaderGradient behind */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 46%, rgba(229,229,229,0.08) 0%, rgba(192,192,192,0.03) 30%, transparent 66%)",
          }}
        />

        {/* the stage — sphere + dust share a centre.
            grid place-items-center stacks children on one cell without
            shrinking the sphere (a flex 1x1 box collapsed it to a line). */}
        <div className="relative grid place-items-center">
          {/* dust ring — PC (rAF driven, 22 motes) */}
          {!isTouch && (
            <div
              ref={dustLayerRef}
              aria-hidden
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {dust.map((d) => (
                <span
                  key={d.id}
                  data-dust
                  className="absolute rounded-full"
                  style={{
                    left: 0,
                    top: 0,
                    width: d.size,
                    height: d.size,
                    marginLeft: -d.size / 2,
                    marginTop: -d.size / 2,
                    background:
                      "radial-gradient(circle, rgba(245,245,245,0.9), rgba(192,192,192,0))",
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </div>
          )}

          {/* dust ring — mobile (CSS-only, 8 motes, collapses on activate) */}
          {isTouch && !reduced && (
            <div
              aria-hidden
              className={`entry-dust-m absolute left-1/2 top-1/2 pointer-events-none ${
                activating ? "is-pulling" : ""
              }`}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {motes.map((m) => (
                <span
                  key={m.id}
                  className="entry-mote"
                  style={
                    {
                      width: m.size,
                      height: m.size,
                      marginLeft: -m.size / 2,
                      marginTop: -m.size / 2,
                      ["--tx" as string]: `${m.tx}px`,
                      ["--ty" as string]: `${m.ty}px`,
                      ["--fx" as string]: `${m.fx}px`,
                      ["--fy" as string]: `${m.fy}px`,
                      ["--op" as string]: m.op,
                      ["--dur" as string]: `${m.dur}s`,
                      ["--delay" as string]: `${m.delay}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}

          {/* chapter labels — exhibition signage orbiting the sphere.
              Centered on the sphere's centre; each label is translated to its
              angular position. On activate, every label is pulled to (0,0)
              with the dust, so labels + particles + sphere merge into one. */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 pointer-events-none select-none"
            style={{ width: 0, height: 0 }}
          >
            {labels.map((l, i) => (
              <motion.div
                key={l.key}
                initial={{ x: l.tx, y: l.ty, opacity: 0, scale: 0.96 }}
                animate={
                  activating
                    ? {
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0.7,
                      }
                    : reduced
                    ? { x: l.tx, y: l.ty, opacity: 1, scale: 1 }
                    : {
                        x: l.tx,
                        y: l.ty,
                        opacity: phase === "hovering" ? 1 : 1,
                        scale: phase === "hovering" ? 1.02 : 1,
                      }
                }
                transition={
                  activating
                    ? {
                        duration: 0.85,
                        ease: EASE,
                        delay: i * 0.04,
                      }
                    : {
                        duration: 1.4,
                        ease: EASE,
                        delay: 0.9 + i * 0.06,
                      }
                }
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  transform: "translate(-50%, -50%)",
                  willChange: "transform, opacity",
                }}
              >
                <span
                  className="entry-label-float font-sans uppercase"
                  style={
                    {
                      whiteSpace: "nowrap",
                      fontSize: isTouch ? "9px" : "10px",
                      letterSpacing: isTouch ? "0.32em" : "0.42em",
                      color: "var(--silver-bright)",
                      textShadow:
                        "0 0 18px rgba(229,229,229,0.18), 0 0 1px rgba(245,245,245,0.4)",
                      // CSS vars consumed by the float keyframe
                      ["--lfx" as string]: `${l.fx}px`,
                      ["--lfy" as string]: `${l.fy}px`,
                      ["--ldur" as string]: `${l.dur}s`,
                      ["--ldelay" as string]: `${l.delay}s`,
                      ["--lop" as string]:
                        phase === "hovering"
                          ? Math.min(l.op + 0.18, 0.78)
                          : l.op,
                      transition: "--lop 600ms cubic-bezier(0.19,1,0.22,1)",
                    } as React.CSSProperties
                  }
                >
                  {tr(l.key, lang)}
                </span>
              </motion.div>
            ))}
          </div>

          {/* sphere */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={
              activating
                ? { scale: [1, 0.9, 1.7], opacity: [1, 1, 0] }
                : reduced
                ? { scale: 1, opacity: 1 }
                : {
                    scale: phase === "hovering" ? 1.06 : [1, 1.035, 1],
                    opacity: 1,
                  }
            }
            transition={
              activating
                ? { duration: 1.2, ease: EASE, times: [0, 0.28, 1] }
                : reduced
                ? { duration: 0.6, ease: EASE }
                : phase === "hovering"
                ? { duration: 0.8, ease: EASE }
                : {
                    scale: { duration: 6, ease: "easeInOut", repeat: Infinity },
                    opacity: { duration: 1.2, ease: EASE },
                  }
            }
            className="relative"
            style={{
              width: "clamp(120px, 18vw, 210px)",
              height: "clamp(120px, 18vw, 210px)",
              willChange: "transform, opacity",
            }}
          >
            {/* liquid-metal body */}
            <motion.div
              className="absolute inset-0"
              animate={{
                borderRadius: activating
                  ? "50% 50% 50% 50% / 50% 50% 50% 50%"
                  : [
                      "48% 52% 50% 50% / 52% 48% 52% 48%",
                      "52% 48% 51% 49% / 48% 52% 49% 51%",
                      "48% 52% 50% 50% / 52% 48% 52% 48%",
                    ],
              }}
              transition={
                activating
                  ? { duration: 0.5, ease: EASE }
                  : { duration: 8, ease: "easeInOut", repeat: Infinity }
              }
              style={{
                background:
                  "radial-gradient(circle at 36% 30%, #ffffff 0%, #e5e5e5 14%, #9a9a9a 44%, #3a3a3a 72%, #0c0c0c 100%)",
                boxShadow:
                  "inset 0 -16px 36px rgba(0,0,0,0.7), inset 0 10px 22px rgba(255,255,255,0.18), 0 30px 80px -24px rgba(0,0,0,0.85), 0 0 60px -10px rgba(229,229,229,0.22)",
              }}
            />
            {/* gathering light — intensifies just before activation */}
            <motion.div
              aria-hidden
              className="absolute"
              animate={{
                opacity: activating ? [0.4, 1, 0] : phase === "hovering" ? 0.85 : 0.4,
                scale: activating ? [1, 1.2, 0.6] : 1,
              }}
              transition={{ duration: activating ? 0.6 : 0.8, ease: EASE }}
              style={{
                top: "13%",
                left: "25%",
                width: "32%",
                height: "22%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                filter: "blur(3px)",
              }}
            />
          </motion.div>
        </div>

        {/* TAP + sub-copy — small, quiet, secondary to the sphere */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: activating ? 0 : 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <motion.span
            animate={
              reduced
                ? undefined
                : { opacity: [0.55, 1, 0.55] }
            }
            transition={
              reduced
                ? undefined
                : { duration: 3.2, ease: "easeInOut", repeat: Infinity }
            }
            className="font-serif text-base tracking-[0.5em] uppercase text-offwhite"
          >
            {tr("entry_tap", lang)}
          </motion.span>
          <span className="text-[10px] tracking-[0.36em] uppercase text-silver-muted">
            {tr("entry_copy", lang)}
          </span>
        </motion.div>

        {/* skip — quiet, bottom-right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            begin();
          }}
          aria-label={tr("entry_skip", lang)}
          className="absolute bottom-7 right-7 text-[10px] tracking-[0.3em] uppercase text-silver-muted/60 hover:text-silver-bright transition-colors"
        >
          {tr("entry_skip", lang)}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
