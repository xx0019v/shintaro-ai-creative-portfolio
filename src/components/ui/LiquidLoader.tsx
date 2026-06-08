"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const TEXT = "AVENDANYO";
const STORAGE_KEY = "avendanyo-loader-seen";

/**
 * Cinematic timeline (ms) — total ~6.0s
 *   scatter  : droplets fade in scattered across the screen
 *   travel   : droplets are drawn inward toward a central band
 *   flash    : silver bloom births the text
 *   text     : chrome text crossfades over the merged liquid
 *   hold     : text shimmers, droplets dissolve
 *   exit     : vertical wipe reveals the hero behind
 */
const T = {
  scatter: 500,
  travel: 2500,
  flash: 250,
  text: 600,
  hold: 1500,
  exit: 900,
} as const;

const STAGE = {
  scatter: 0,
  travel: T.scatter,
  flash: T.scatter + T.travel,
  text: T.scatter + T.travel,
  hold: T.scatter + T.travel + T.text,
  exit: T.scatter + T.travel + T.text + T.hold,
  end: T.scatter + T.travel + T.text + T.hold + T.exit,
} as const;

interface Droplet {
  id: number;
  fromX: number;
  fromY: number;
  midX: number; // curved waypoint
  midY: number;
  toX: number;
  toY: number;
  size: number;
  delay: number;
}

/**
 * Deterministic pseudo-random (so SSR and client produce the same layout).
 */
function makeDroplets(count: number, seed = 17): Droplet[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: Droplet[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(1, count - 1);
    // converge to a horizontal central band that frames the text
    const toX = 18 + t * 64 + (rand() - 0.5) * 5; // 18 — 82 %
    const toY = 50 + (rand() - 0.5) * 5;           // ~mid screen
    const fromX = rand() * 100;
    const fromY = rand() * 100;
    out.push({
      id: i,
      fromX,
      fromY,
      // midpoint pulls each droplet on a gentle curve, so motion feels organic
      midX: (fromX + toX) / 2 + (rand() - 0.5) * 14,
      midY: (fromY + toY) / 2 + (rand() - 0.5) * 14,
      toX,
      toY,
      size: 30 + rand() * 30, // 30 — 60 px (goo filter merges them visually)
      delay: rand() * 700, // wider stagger across the longer travel phase
    });
  }
  return out;
}

export default function LiquidLoader() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<
    "scatter" | "travel" | "text" | "hold" | "exit"
  >("scatter");
  const [flash, setFlash] = useState(false);

  const droplets = useMemo(() => makeDroplets(24), []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (seen === "1" || reduced) {
        setActive(false);
        return;
      }
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("travel"), STAGE.travel));
    timers.push(setTimeout(() => setFlash(true), STAGE.flash));
    timers.push(setTimeout(() => setFlash(false), STAGE.flash + T.flash));
    timers.push(setTimeout(() => setPhase("text"), STAGE.text));
    timers.push(setTimeout(() => setPhase("hold"), STAGE.hold));
    timers.push(setTimeout(() => setPhase("exit"), STAGE.exit));
    timers.push(
      setTimeout(() => {
        setActive(false);
        if (typeof window !== "undefined")
          sessionStorage.setItem(STORAGE_KEY, "1");
      }, STAGE.end)
    );

    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  // Lock scroll while loader is visible
  useEffect(() => {
    if (!mounted || !active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="liquid-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: T.exit / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden"
          aria-hidden
          role="presentation"
        >
          {/* CINEMATIC BACKDROP — animated vertical wipe on exit */}
          <motion.div
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={
              phase === "exit"
                ? { clipPath: "inset(50% 0% 50% 0%)" }
                : { clipPath: "inset(0% 0% 0% 0%)" }
            }
            transition={{
              duration: T.exit / 1000,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 bg-base"
          >
            {/* SVG defs — goo filter + chrome gradients + grid */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <filter
                  id="goo"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="9"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 22 -11"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>

              {/* faint scan grid */}
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
                  strokeOpacity="0.04"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#loaderGrid)" />
            </svg>

            {/* AMBIENT silver glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(229,229,229,0.10) 0%, rgba(229,229,229,0.04) 35%, transparent 70%)",
              }}
              aria-hidden
            />

            {/* DROPLETS — wrapped in goo container so overlap merges fluidly */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ filter: "url(#goo)" }}
              aria-hidden
            >
              {droplets.map((d) => (
                <motion.span
                  key={d.id}
                  initial={{
                    left: `${d.fromX}%`,
                    top: `${d.fromY}%`,
                    opacity: 0,
                    scale: 0.55,
                  }}
                  animate={
                    phase === "scatter"
                      ? {
                          left: `${d.fromX}%`,
                          top: `${d.fromY}%`,
                          opacity: 1,
                          scale: 1,
                        }
                      : phase === "travel"
                      ? {
                          // two-keyframe curved path through midX/midY
                          left: [`${d.fromX}%`, `${d.midX}%`, `${d.toX}%`],
                          top: [`${d.fromY}%`, `${d.midY}%`, `${d.toY}%`],
                          opacity: 1,
                          scale: [1, 1.05, 1],
                        }
                      : phase === "text"
                      ? {
                          left: `${d.toX}%`,
                          top: `${d.toY}%`,
                          opacity: 0.85,
                          scale: 1.15,
                        }
                      : phase === "hold"
                      ? {
                          left: `${d.toX}%`,
                          top: `${d.toY}%`,
                          opacity: 0,
                          scale: 1.3,
                        }
                      : { opacity: 0, scale: 1.5 }
                  }
                  transition={{
                    duration:
                      phase === "scatter"
                        ? T.scatter / 1000
                        : phase === "travel"
                        ? T.travel / 1000
                        : phase === "text"
                        ? T.text / 1000
                        : phase === "hold"
                        ? T.hold / 1000
                        : T.exit / 1000,
                    delay: phase === "travel" ? d.delay / 1000 : 0,
                    ease:
                      phase === "travel"
                        ? [0.22, 1, 0.36, 1]
                        : [0.22, 1, 0.36, 1],
                    times: phase === "travel" ? [0, 0.55, 1] : undefined,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: d.size,
                    height: d.size,
                    backgroundImage:
                      "radial-gradient(circle at 32% 28%, #ffffff 0%, #e5e5e5 28%, #9a9a9a 62%, #4a4a4a 100%)",
                    boxShadow:
                      "0 0 18px rgba(229,229,229,0.22), inset 0 0 8px rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            {/* MERGE FLASH — short silver bloom at the moment droplets converge */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  key="flash"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 0.9, scale: 1.4 }}
                  exit={{ opacity: 0, scale: 1.8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  aria-hidden
                >
                  <div
                    className="h-[55vh] w-[80vw] max-w-[1100px]"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(229,229,229,0.25) 22%, rgba(192,192,192,0.08) 48%, transparent 70%)",
                      filter: "blur(6px)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* TEXT — born from the merged liquid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, letterSpacing: "0.5em" }}
                animate={{
                  opacity:
                    phase === "text" || phase === "hold"
                      ? 1
                      : phase === "exit"
                      ? 0
                      : 0,
                  scale: phase === "exit" ? 1.04 : 1,
                  letterSpacing:
                    phase === "text" || phase === "hold" || phase === "exit"
                      ? "0.18em"
                      : "0.5em",
                }}
                transition={{
                  duration: T.text / 1000,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative px-6"
              >
                {/* metallic chrome heading */}
                <h1
                  className="relative font-serif text-[clamp(2.2rem,9vw,7.5rem)] leading-none m-0 select-none"
                  style={{
                    background:
                      "linear-gradient(180deg, #FFFFFF 0%, #E5E5E5 30%, #8E8E8E 55%, #C0C0C0 75%, #FFFFFF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 0 40px rgba(229,229,229,0.22)",
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
                    transition={{
                      duration: T.hold / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.65) 50%, transparent 60%)",
                      WebkitMaskImage:
                        "linear-gradient(180deg, #000 0%, #000 100%)",
                      mixBlendMode: "screen",
                    }}
                  />
                </h1>

                {/* hairline beneath */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX:
                      phase === "text" || phase === "hold" || phase === "exit"
                        ? 1
                        : 0,
                    opacity:
                      phase === "text" || phase === "hold"
                        ? 1
                        : phase === "exit"
                        ? 0
                        : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15,
                  }}
                  className="origin-center mt-4 h-px mx-auto"
                  style={{
                    width: "65%",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(229,229,229,0.75) 50%, transparent 100%)",
                  }}
                />

                {/* sub label */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: phase === "hold" ? 0.75 : 0,
                    y: phase === "hold" ? 0 : 6,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 text-center text-[10px] tracking-[0.42em] uppercase text-silver-bright"
                >
                  AI Creative Developer
                </motion.p>
              </motion.div>
            </div>

            {/* corner ticks — futuristic frame */}
            <div className="absolute inset-6 pointer-events-none" aria-hidden>
              <CornerTick className="top-0 left-0" />
              <CornerTick className="top-0 right-0" flipX />
              <CornerTick className="bottom-0 left-0" flipY />
              <CornerTick className="bottom-0 right-0" flipX flipY />
            </div>

            {/* portfolio hint at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  phase === "scatter" || phase === "travel" ? 0.5 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
      <div className="h-4 w-4 border-t border-l border-silver/50" />
    </div>
  );
}
