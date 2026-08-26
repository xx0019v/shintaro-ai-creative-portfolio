"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLaunch } from "@/context/LaunchContext";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const EASE = [0.19, 1, 0.22, 1] as const;

type Phase = "idle" | "hovering" | "activating" | "gone";

/**
 * The chapters the site contains, held in the black around the sphere.
 *
 * English in both languages, like the section headings elsewhere — these are
 * signage, not prose, and the JP mode deliberately keeps Latin headings for
 * global tone (same reasoning as TAGS in Hero).
 *
 * `a` is the angle in degrees, clockwise from 3 o'clock. The bottom of the
 * ring (roughly 60°–120°) is left empty on purpose: TAP sits there. `r` nudges
 * each label off a perfect circle so the constellation reads as placed rather
 * than generated, and doubles as the brightness cue — tighter is brighter.
 */
const CHAPTER_LABELS = [
  // Held wide at the lower left so it clears TAP, which sits bottom-centre.
  { t: "THE WALK", a: 143, r: 1.14, m: true },
  { t: "CONTACT", a: 178, r: 0.86, m: false },
  { t: "AI CAMERA", a: 212, r: 1.0, m: true },
  { t: "FRAGRANCE", a: 254, r: 0.88, m: true },
  { t: "CLIENT WORK", a: 298, r: 0.97, m: true },
  { t: "KEYCHAIN", a: 340, r: 0.85, m: false },
  { t: "LEADERSHIP", a: 16, r: 0.99, m: false },
  { t: "SKILLS", a: 44, r: 0.87, m: false },
] as const;

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
  const { launched, introDone, ready, launch, skipIntro } = useLaunch();
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

  // Escape leaves the opening from anywhere, which is what Escape means
  // everywhere else on the web. Bound on the window rather than the sphere so
  // it works before the visitor has focused anything.
  useEffect(() => {
    if (!mounted || introDone) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipIntro();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [mounted, introDone, skipIntro]);

  // `ready` keeps the server markup and the first client paint identical while
  // sessionStorage is read; without it a returning visitor gets a flash of the
  // sphere before it disappears.
  if (!mounted || !ready || introDone || phase === "gone" || launched) return null;

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

        {/* the stage — sphere, dust and chapter labels share a centre.
            grid place-items-center stacks children on one cell without
            shrinking the sphere (a flex 1x1 box collapsed it to a line). */}
        <div className="relative grid place-items-center">
          {/* chapter labels — the room naming what it holds. Inside the stage
              so the ring is centred on the SPHERE, not on the viewport: the
              flex column puts TAP underneath, which pushes the sphere above
              centre, and a ring hung off the viewport would sit low.
              Mobile keeps only the four marked `m` so the ring stays legible
              at 375px and the sphere is still unmistakably the subject. */}
          <div
            aria-hidden
            className={`entry-ring ${activating ? "is-pulling" : ""}`}
          >
            {CHAPTER_LABELS.filter((l) => !isTouch || l.m).map((l, i) => {
              const rad = (l.a * Math.PI) / 180;
              return (
                <span
                  key={l.t}
                  data-prox
                  className="entry-label"
                  style={
                    {
                      ["--cx" as string]: (Math.cos(rad) * l.r).toFixed(4),
                      // squashed vertically: a true circle would collide with
                      // TAP below and run off the top on short viewports
                      ["--cy" as string]: (Math.sin(rad) * l.r * 0.82).toFixed(4),
                      // 1 at the tightest ring radius, 0 at the widest.
                      // Clamped: a label held out past the nominal ring would
                      // otherwise compute negative and vanish entirely.
                      ["--near" as string]: Math.max(
                        0,
                        Math.min(1, 1 - (l.r - 0.85) / 0.3)
                      ).toFixed(2),
                      ["--fx" as string]: `${(i % 2 ? 1 : -1) * (3 + (i % 3))}px`,
                      ["--fy" as string]: `${(i % 3 ? -1 : 1) * (4 + (i % 2) * 3)}px`,
                      ["--dur" as string]: `${10 + (i % 4) * 2.5}s`,
                      ["--delay" as string]: `${i * 0.7}s`,
                    } as React.CSSProperties
                  }
                >
                  <span className="entry-label-i">{l.t}</span>
                </span>
              );
            })}
          </div>

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

        {/* Skip, and it now actually skips.
            It used to call the same begin() as tapping the sphere, so it
            started a 1.6s exit and then the full 9.95s loader: the control
            labelled "skip" was a ten second wait. It also sat at 10px in
            silver-muted/60 over black, under every contrast and touch-target
            floor there is. */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            skipIntro();
          }}
          className="absolute bottom-4 right-4 min-h-[44px] min-w-[44px] px-4 py-3 text-[11px] tracking-[0.3em] uppercase text-silver-bright/80 hover:text-offwhite focus-visible:text-offwhite transition-colors"
        >
          {tr("entry_skip", lang)}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
