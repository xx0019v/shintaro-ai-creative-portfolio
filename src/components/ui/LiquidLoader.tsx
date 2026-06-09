"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const TEXT = "AVENDANYO";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic timeline (ms) — total ≈ 9.4s
 *
 *   appearance     : droplets fade in scattered across a deep black space
 *   floating       : droplets drift gently — depth illusion via blur+opacity
 *   attraction     : liquid is drawn toward the central letter band
 *   formation      : droplets snap onto coordinates sampled from the text
 *                    shape — the goo filter melts neighbours together, so
 *                    convergence ≡ the letter form itself
 *   formationHold  : the LIQUID LETTERS settle and "breathe" for a moment
 *                    (this is the iconic frame — liquid IS the typography)
 *   flash          : silver bloom flares over the merged liquid
 *   text           : chrome typography RESOLVES the liquid into crisp form
 *                    (droplets fade out as chrome fades in — a transition,
 *                    not a stack)
 *   hold           : metallic shimmer sweeps + sub-label settles
 *   spill          : droplets re-emerge and cascade downward toward Hero
 *   exit           : vertical clip-path wipe completes the handoff
 */
const T = {
  appearance: 700,
  floating: 1000,
  attraction: 1100,
  formation: 1200,
  formationHold: 700,
  flash: 280,
  text: 900,
  hold: 1600,
  spill: 900,
  exit: 1000,
} as const;

const STAGE = {
  appearance: 0,
  floating: T.appearance,
  attraction: T.appearance + T.floating,
  formation: T.appearance + T.floating + T.attraction,
  formationHold:
    T.appearance + T.floating + T.attraction + T.formation,
  flash:
    T.appearance + T.floating + T.attraction + T.formation + T.formationHold,
  text:
    T.appearance + T.floating + T.attraction + T.formation + T.formationHold,
  hold:
    T.appearance +
    T.floating +
    T.attraction +
    T.formation +
    T.formationHold +
    T.text,
  spill:
    T.appearance +
    T.floating +
    T.attraction +
    T.formation +
    T.formationHold +
    T.text +
    T.hold,
  exit:
    T.appearance +
    T.floating +
    T.attraction +
    T.formation +
    T.formationHold +
    T.text +
    T.hold +
    T.spill,
  end:
    T.appearance +
    T.floating +
    T.attraction +
    T.formation +
    T.formationHold +
    T.text +
    T.hold +
    T.spill +
    T.exit,
} as const;

const DROPLET_COUNT = 120;

interface Droplet {
  id: number;
  // % of viewport — converted to pixels at runtime so we can use GPU transforms
  fromXp: number;
  fromYp: number;
  driftXp: number;
  driftYp: number;
  midXp: number;
  midYp: number;
  toXp: number;
  toYp: number;
  spillYp: number;
  size: number;
  depth: number;     // 0 close .. 1 deep — drives blur + opacity
  travelDelay: number;
  spillDelay: number;
  oscX: number;      // micro-oscillation amplitude during formationHold
  oscY: number;
}

/**
 * Sample target positions from the rendered text shape via an offscreen
 * canvas. Returns coords normalized to 0..1.
 */
function sampleTextShape(
  text: string,
  fontPx: number,
  fontFamily: string,
  sampleCount: number
): { x: number; y: number }[] | null {
  if (typeof document === "undefined") return null;
  try {
    const W = 1600;
    const H = 360;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${fontPx}px ${fontFamily}`;

    // shrink-to-fit
    const m = ctx.measureText(text);
    const tw = m.width;
    const scale = Math.min(1, (W - 80) / tw);
    const finalPx = Math.floor(fontPx * scale);
    ctx.font = `bold ${finalPx}px ${fontFamily}`;
    const m2 = ctx.measureText(text);
    ctx.fillText(text, (W - m2.width) / 2, H / 2);

    const data = ctx.getImageData(0, 0, W, H).data;
    const opaque: { x: number; y: number }[] = [];
    // denser sampling for crisper letter forms
    const step = 4;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const i = (y * W + x) * 4;
        if (data[i + 3] > 120) {
          opaque.push({ x: x / W, y: y / H });
        }
      }
    }
    if (opaque.length < 24) return null;

    // even-stride sampling so letters get proportional droplet density
    const out: { x: number; y: number }[] = [];
    const stride = Math.max(1, Math.floor(opaque.length / sampleCount));
    for (let i = 0; i < sampleCount; i++) {
      out.push(opaque[(i * stride) % opaque.length]);
    }
    return out;
  } catch {
    return null;
  }
}

function makeDroplets(
  count: number,
  shape: { x: number; y: number }[] | null
): Droplet[] {
  let s = 17;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: Droplet[] = [];
  for (let i = 0; i < count; i++) {
    // Default target spreads across a central horizontal band — used only
    // when the canvas API isn't available (very rare fallback).
    let toXp = 50 + (rand() - 0.5) * 60;
    let toYp = 48 + (rand() - 0.5) * 6;
    if (shape && shape.length) {
      const pt = shape[i % shape.length];
      // Map sampled shape (0..1, 0..1) onto a centred letter band:
      //   horizontally pad 12% L/R, vertically 38..62%
      toXp = 12 + pt.x * 76;
      toYp = 39 + pt.y * 22;
    }
    const fromXp = rand() * 100;
    const fromYp = rand() * 100;
    out.push({
      id: i,
      fromXp,
      fromYp,
      driftXp: fromXp + (rand() - 0.5) * 14,
      driftYp: fromYp + (rand() - 0.5) * 14,
      midXp: (fromXp + toXp) / 2 + (rand() - 0.5) * 18,
      midYp: (fromYp + toYp) / 2 + (rand() - 0.5) * 18,
      toXp,
      toYp,
      spillYp: toYp + 45 + rand() * 35,
      // Smaller droplets — crisper letter formation
      size: 14 + rand() * 18, // 14..32 px
      depth: rand(),
      travelDelay: rand() * 750,
      spillDelay: rand() * 380,
      oscX: (rand() - 0.5) * 1.2,
      oscY: (rand() - 0.5) * 1.2,
    });
  }
  return out;
}

type Phase =
  | "appearance"
  | "floating"
  | "attraction"
  | "formation"
  | "formationHold"
  | "text"
  | "hold"
  | "spill"
  | "exit";

export default function LiquidLoader() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<Phase>("appearance");
  const [flash, setFlash] = useState(false);
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [viewport, setViewport] = useState({ w: 1280, h: 800 });
  const startedRef = useRef(false);

  // Sample text shape on mount + build droplets
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    }
    if (reduced) {
      setActive(false);
      return;
    }
    const shape = sampleTextShape(
      TEXT,
      280,
      "'Playfair Display','DM Serif Display',serif",
      DROPLET_COUNT
    );
    setDroplets(makeDroplets(DROPLET_COUNT, shape));
  }, [reduced]);

  // Lock scroll + force scroll to top while loader visible
  useEffect(() => {
    if (!mounted || !active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if ("scrollRestoration" in history)
      history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("resize", onResize);
    };
  }, [active, mounted]);

  // Drive the phase timeline
  useEffect(() => {
    if (!mounted || !active || startedRef.current || droplets.length === 0)
      return;
    startedRef.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("floating"), STAGE.floating));
    timers.push(setTimeout(() => setPhase("attraction"), STAGE.attraction));
    timers.push(setTimeout(() => setPhase("formation"), STAGE.formation));
    timers.push(
      setTimeout(() => setPhase("formationHold"), STAGE.formationHold)
    );
    timers.push(setTimeout(() => setFlash(true), STAGE.flash));
    timers.push(setTimeout(() => setFlash(false), STAGE.flash + T.flash));
    timers.push(setTimeout(() => setPhase("text"), STAGE.text));
    timers.push(setTimeout(() => setPhase("hold"), STAGE.hold));
    timers.push(setTimeout(() => setPhase("spill"), STAGE.spill));
    timers.push(setTimeout(() => setPhase("exit"), STAGE.exit));
    timers.push(
      setTimeout(() => {
        setActive(false);
        if (typeof window !== "undefined") window.scrollTo(0, 0);
      }, STAGE.end)
    );

    return () => timers.forEach(clearTimeout);
  }, [mounted, active, droplets.length]);

  if (!mounted) return null;

  // Convert % to px for GPU-friendly transforms
  const pct = (xp: number, yp: number) => ({
    x: (xp / 100) * viewport.w,
    y: (yp / 100) * viewport.h,
  });

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="liquid-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: T.exit / 1000, ease: EASE }}
          className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden"
          aria-hidden
          role="presentation"
        >
          {/* CINEMATIC BACKDROP with vertical wipe on exit */}
          <motion.div
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={
              phase === "exit"
                ? { clipPath: "inset(50% 0% 50% 0%)" }
                : { clipPath: "inset(0% 0% 0% 0%)" }
            }
            transition={{ duration: T.exit / 1000, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-base"
          >
            {/* SVG defs — goo filter + grid */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <filter
                  id="liquidGoo"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                >
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
                  <feColorMatrix
                    in="b"
                    mode="matrix"
                    values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 26 -13"
                    result="g"
                  />
                  <feComposite in="SourceGraphic" in2="g" operator="atop" />
                </filter>
              </defs>

              {/* faint scan grid for depth */}
              <pattern
                id="loaderGrid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#E5E5E5"
                  strokeOpacity="0.05"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#loaderGrid)" />
            </svg>

            {/* ambient silver radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(229,229,229,0.10) 0%, rgba(229,229,229,0.04) 35%, transparent 70%)",
              }}
              aria-hidden
            />

            {/* DROPLETS — wrapped in goo container; GPU-accelerated transforms */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ filter: "url(#liquidGoo)" }}
              aria-hidden
            >
              {droplets.map((d) => {
                const from = pct(d.fromXp, d.fromYp);
                const drift = pct(d.driftXp, d.driftYp);
                const mid = pct(d.midXp, d.midYp);
                const target = pct(d.toXp, d.toYp);
                const spill = pct(d.toXp, d.spillYp);

                // depth illusion
                const blurForDepth = `${d.depth * 1.4}px`;
                const opacityNear = 0.78 + (1 - d.depth) * 0.22;

                const animateProps =
                  phase === "appearance"
                    ? { x: from.x, y: from.y, opacity: opacityNear, scale: 1 }
                    : phase === "floating"
                    ? { x: drift.x, y: drift.y, opacity: opacityNear, scale: 1 }
                    : phase === "attraction"
                    ? {
                        x: [drift.x, mid.x, target.x],
                        y: [drift.y, mid.y, target.y],
                        opacity: 1,
                        scale: [1, 1.06, 1],
                      }
                    : phase === "formation"
                    ? {
                        x: target.x,
                        y: target.y,
                        opacity: 1,
                        scale: 1,
                      }
                    : phase === "formationHold"
                    ? {
                        // micro-oscillation so the liquid letters "breathe"
                        x: [target.x, target.x + d.oscX, target.x],
                        y: [target.y, target.y + d.oscY, target.y],
                        opacity: 1,
                        scale: [1, 1.02, 1],
                      }
                    : phase === "text"
                    ? {
                        // droplets fade out as chrome takes over (transformation, not stack)
                        x: target.x,
                        y: target.y,
                        opacity: 0,
                        scale: 0.9,
                      }
                    : phase === "hold"
                    ? { x: target.x, y: target.y, opacity: 0, scale: 0.9 }
                    : phase === "spill"
                    ? {
                        // re-emerge briefly and cascade down toward Hero
                        x: spill.x,
                        y: spill.y,
                        opacity: [0, 0.7, 0],
                        scale: [0.8, 1, 0.7],
                      }
                    : { opacity: 0, scale: 0.85 };

                const duration =
                  phase === "appearance"
                    ? T.appearance / 1000
                    : phase === "floating"
                    ? T.floating / 1000
                    : phase === "attraction"
                    ? T.attraction / 1000
                    : phase === "formation"
                    ? T.formation / 1000
                    : phase === "formationHold"
                    ? T.formationHold / 1000
                    : phase === "text"
                    ? T.text / 1000
                    : phase === "hold"
                    ? T.hold / 1000
                    : phase === "spill"
                    ? T.spill / 1000
                    : T.exit / 1000;

                return (
                  <motion.span
                    key={d.id}
                    initial={{
                      x: from.x,
                      y: from.y,
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={animateProps}
                    transition={{
                      duration,
                      delay:
                        phase === "attraction"
                          ? d.travelDelay / 1000
                          : phase === "spill"
                          ? d.spillDelay / 1000
                          : 0,
                      ease: EASE,
                      times:
                        phase === "attraction" || phase === "formationHold"
                          ? [0, 0.5, 1]
                          : phase === "spill"
                          ? [0, 0.45, 1]
                          : undefined,
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: d.size,
                      height: d.size,
                      borderRadius: "50%",
                      marginLeft: -d.size / 2,
                      marginTop: -d.size / 2,
                      willChange: "transform, opacity",
                      filter: `blur(${blurForDepth})`,
                      backgroundImage:
                        "radial-gradient(circle at 32% 28%, #ffffff 0%, #e8e8e8 30%, #9a9a9a 62%, #4a4a4a 100%)",
                      boxShadow:
                        "0 0 14px rgba(229,229,229,0.22), inset 0 0 6px rgba(255,255,255,0.18)",
                    }}
                  />
                );
              })}
            </div>

            {/* MERGE FLASH — silver bloom births the chrome text */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  key="flash"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 0.9, scale: 1.45 }}
                  exit={{ opacity: 0, scale: 1.95 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  aria-hidden
                >
                  <div
                    className="h-[58vh] w-[82vw] max-w-[1200px]"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.65) 0%, rgba(229,229,229,0.3) 22%, rgba(192,192,192,0.1) 48%, transparent 70%)",
                      filter: "blur(8px)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* CHROME TEXT — resolves the liquid into crisp form */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{
                  opacity:
                    phase === "text" || phase === "hold" || phase === "spill"
                      ? 1
                      : 0,
                  scale: phase === "exit" || phase === "spill" ? 1.04 : 1,
                }}
                transition={{ duration: T.text / 1000, ease: EASE }}
                className="relative px-6"
              >
                <h1
                  className="relative font-serif text-[clamp(2.2rem,9.5vw,8rem)] leading-none tracking-[0.18em] m-0 select-none"
                  style={{
                    background:
                      "linear-gradient(180deg, #FFFFFF 0%, #E5E5E5 30%, #8E8E8E 55%, #C0C0C0 75%, #FFFFFF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 0 48px rgba(229,229,229,0.26)",
                  }}
                >
                  {TEXT}
                  {/* shimmer sweep during hold */}
                  <motion.span
                    aria-hidden
                    initial={{ x: "-140%" }}
                    animate={
                      phase === "hold" ? { x: "140%" } : { x: "-140%" }
                    }
                    transition={{ duration: T.hold / 1000, ease: EASE }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.7) 50%, transparent 62%)",
                      WebkitMaskImage:
                        "linear-gradient(180deg, #000 0%, #000 100%)",
                      mixBlendMode: "screen",
                    }}
                  />
                </h1>

                {/* hairline */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX:
                      phase === "text" || phase === "hold" || phase === "spill"
                        ? 1
                        : 0,
                    opacity:
                      phase === "text" || phase === "hold" ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.95,
                    ease: EASE,
                    delay: 0.15,
                  }}
                  className="origin-center mt-5 h-px mx-auto"
                  style={{
                    width: "65%",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(229,229,229,0.85) 50%, transparent 100%)",
                  }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: phase === "hold" ? 0.8 : 0,
                    y: phase === "hold" ? 0 : 6,
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="mt-4 text-center text-[10px] tracking-[0.46em] uppercase text-silver-bright"
                >
                  AI Creative Developer
                </motion.p>
              </motion.div>
            </div>

            {/* futuristic corner ticks */}
            <div className="absolute inset-6 pointer-events-none" aria-hidden>
              <CornerTick className="top-0 left-0" />
              <CornerTick className="top-0 right-0" flipX />
              <CornerTick className="bottom-0 left-0" flipY />
              <CornerTick className="bottom-0 right-0" flipX flipY />
            </div>

            {/* bottom kicker — visible only during early phases */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  phase === "appearance" ||
                  phase === "floating" ||
                  phase === "attraction"
                    ? 0.55
                    : 0,
              }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 text-[10px] tracking-[0.4em] uppercase text-silver-muted"
              aria-hidden
            >
              <span className="h-px w-8 bg-silver/40" />
              <span>Portfolio · Volume 02</span>
              <span className="h-px w-8 bg-silver/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CornerTick({
  className = "",
  flipX,
  flipY,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        transform: `${flipX ? "scaleX(-1) " : ""}${flipY ? "scaleY(-1)" : ""}`,
      }}
      aria-hidden
    >
      <div className="h-4 w-4 border-t border-l border-silver/55" />
    </div>
  );
}
