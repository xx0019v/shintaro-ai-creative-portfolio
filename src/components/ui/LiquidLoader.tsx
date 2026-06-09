"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const TEXT = "AVENDANYO";

/**
 * Cinematic timeline (ms) — total ~7.4s
 * The droplets travel to points sampled from the actual text shape, so
 * convergence ≡ letter formation. After the chrome reveal, the droplets
 * cascade downward toward the Hero before the loader wipes away.
 */
const T = {
  init: 600,      // black hold + droplets fade in scattered
  drift: 700,     // droplets drift gently (depth illusion)
  travel: 2400,   // droplets converge onto letter coordinates
  flash: 280,     // silver bloom births the chrome text
  text: 600,      // chrome text resolves over the liquid form
  hold: 1500,     // shimmer + sub-label hold
  spill: 700,     // droplets spill toward Hero (cascade)
  exit: 900,      // vertical wipe reveals the Hero
} as const;

const STAGE = {
  init: 0,
  drift: T.init,
  travel: T.init + T.drift,
  flash: T.init + T.drift + T.travel,
  text: T.init + T.drift + T.travel,
  hold: T.init + T.drift + T.travel + T.text,
  spill: T.init + T.drift + T.travel + T.text + T.hold,
  exit: T.init + T.drift + T.travel + T.text + T.hold + T.spill,
  end: T.init + T.drift + T.travel + T.text + T.hold + T.spill + T.exit,
} as const;

interface Droplet {
  id: number;
  fromX: number;   // 0..100 % viewport
  fromY: number;
  driftX: number;
  driftY: number;
  midX: number;    // curved waypoint
  midY: number;
  toX: number;     // sampled letter coord (% viewport)
  toY: number;
  spillY: number;  // exit Y direction (cascade toward Hero)
  size: number;
  depth: number;   // 0..1 — affects blur/opacity for depth illusion
  delay: number;
  spillDelay: number;
}

/**
 * Sample target positions from the actual text shape. Returns coords in 0..1
 * normalized to the canvas, which we'll map onto the viewport.
 */
function sampleTextShape(
  text: string,
  font: string,
  sampleCount: number
): { x: number; y: number }[] | null {
  if (typeof document === "undefined") return null;
  try {
    const W = 1400;
    const H = 320;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.font = font;
    const m = ctx.measureText(text);
    const tw = m.width;
    // shrink if too wide
    const scale = Math.min(1, (W - 40) / tw);
    ctx.font = `${Math.floor(parseInt(font, 10) * scale)}px ${font
      .split(/\s+/)
      .slice(1)
      .join(" ")}`;
    const m2 = ctx.measureText(text);
    ctx.fillText(text, (W - m2.width) / 2, H / 2);
    const data = ctx.getImageData(0, 0, W, H).data;
    const opaque: { x: number; y: number }[] = [];
    const step = 5;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const i = (y * W + x) * 4;
        if (data[i + 3] > 110) opaque.push({ x: x / W, y: y / H });
      }
    }
    if (opaque.length < 12) return null;
    // pick `sampleCount` points trying to spread them evenly
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
  shape: { x: number; y: number }[] | null,
  seed = 17
): Droplet[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: Droplet[] = [];
  for (let i = 0; i < count; i++) {
    // map normalized shape coord (0..1, 0..1) → viewport %, centred on the band
    // Place letters in middle 80% horizontally and ~middle vertically
    let toX = 50 + (rand() - 0.5) * 60;
    let toY = 48 + (rand() - 0.5) * 6;
    if (shape && shape.length) {
      const pt = shape[i % shape.length];
      toX = 10 + pt.x * 80;            // pad 10% L/R
      toY = 38 + pt.y * 24;            // ~38..62 % of viewport vertically
    }
    const fromX = rand() * 100;
    const fromY = rand() * 100;
    out.push({
      id: i,
      fromX,
      fromY,
      driftX: fromX + (rand() - 0.5) * 18,
      driftY: fromY + (rand() - 0.5) * 18,
      midX: (fromX + toX) / 2 + (rand() - 0.5) * 16,
      midY: (fromY + toY) / 2 + (rand() - 0.5) * 16,
      toX,
      toY,
      spillY: toY + 40 + rand() * 30, // off-screen down
      size: 18 + rand() * 22,         // 18..40 px — small enough to "ink" the letter strokes
      depth: rand(),                  // 0 close .. 1 deep
      delay: rand() * 700,
      spillDelay: rand() * 350,
    });
  }
  return out;
}

const DROPLET_COUNT = 92;

export default function LiquidLoader() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<
    "init" | "drift" | "travel" | "text" | "hold" | "spill" | "exit"
  >("init");
  const [flash, setFlash] = useState(false);
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const startedRef = useRef(false);

  // Sample text shape on mount (client only) and build droplets
  useEffect(() => {
    setMounted(true);
    // Reduced motion: skip loader entirely
    if (reduced) {
      setActive(false);
      return;
    }
    const shape = sampleTextShape(
      TEXT,
      // Bold serif gives thicker strokes → easier to "fill" with droplets
      "260px 'Playfair Display', 'DM Serif Display', serif",
      DROPLET_COUNT
    );
    setDroplets(makeDroplets(DROPLET_COUNT, shape));
  }, [reduced]);

  // Drive the phase timeline
  useEffect(() => {
    if (!mounted || !active || startedRef.current || droplets.length === 0)
      return;
    startedRef.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("drift"), STAGE.drift));
    timers.push(setTimeout(() => setPhase("travel"), STAGE.travel));
    timers.push(setTimeout(() => setFlash(true), STAGE.flash));
    timers.push(setTimeout(() => setFlash(false), STAGE.flash + T.flash));
    timers.push(setTimeout(() => setPhase("text"), STAGE.text));
    timers.push(setTimeout(() => setPhase("hold"), STAGE.hold));
    timers.push(setTimeout(() => setPhase("spill"), STAGE.spill));
    timers.push(setTimeout(() => setPhase("exit"), STAGE.exit));
    timers.push(
      setTimeout(() => {
        setActive(false);
        // restore scroll position to top once loader is gone
        if (typeof window !== "undefined") window.scrollTo(0, 0);
      }, STAGE.end)
    );

    return () => timers.forEach(clearTimeout);
  }, [mounted, active, droplets.length]);

  // Lock scroll & disable browser restoration while loader is visible
  useEffect(() => {
    if (!mounted || !active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if ("scrollRestoration" in history)
      history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
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
            {/* SVG defs — goo filter (true liquid merge) */}
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
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
                  <feColorMatrix
                    in="b"
                    mode="matrix"
                    values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 24 -12"
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

            {/* ambient silver glow */}
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
              {droplets.map((d) => {
                const blurForDepth = `${d.depth * 1.4}px`;
                const opacityForDepth = 0.72 + (1 - d.depth) * 0.28;

                const target =
                  phase === "init"
                    ? {
                        left: `${d.fromX}%`,
                        top: `${d.fromY}%`,
                        opacity: opacityForDepth,
                        scale: 1,
                      }
                    : phase === "drift"
                    ? {
                        left: `${d.driftX}%`,
                        top: `${d.driftY}%`,
                        opacity: opacityForDepth,
                        scale: 1,
                      }
                    : phase === "travel"
                    ? {
                        left: [`${d.driftX}%`, `${d.midX}%`, `${d.toX}%`],
                        top: [`${d.driftY}%`, `${d.midY}%`, `${d.toY}%`],
                        opacity: 1,
                        scale: [1, 1.06, 1],
                      }
                    : phase === "text" || phase === "hold"
                    ? {
                        left: `${d.toX}%`,
                        top: `${d.toY}%`,
                        opacity: phase === "hold" ? 0.65 : 1,
                        scale: phase === "hold" ? 1.05 : 1,
                      }
                    : phase === "spill"
                    ? {
                        left: `${d.toX + (d.toX - 50) * 0.04}%`,
                        top: `${d.spillY}%`,
                        opacity: 0,
                        scale: 0.95,
                      }
                    : {
                        opacity: 0,
                        scale: 0.9,
                      };

                const duration =
                  phase === "init"
                    ? T.init / 1000
                    : phase === "drift"
                    ? T.drift / 1000
                    : phase === "travel"
                    ? T.travel / 1000
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
                      left: `${d.fromX}%`,
                      top: `${d.fromY}%`,
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={target}
                    transition={{
                      duration,
                      delay:
                        phase === "travel"
                          ? d.delay / 1000
                          : phase === "spill"
                          ? d.spillDelay / 1000
                          : 0,
                      ease: [0.22, 1, 0.36, 1],
                      times:
                        phase === "travel" ? [0, 0.55, 1] : undefined,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: d.size,
                      height: d.size,
                      filter: `blur(${blurForDepth})`,
                      backgroundImage:
                        "radial-gradient(circle at 32% 28%, #ffffff 0%, #e8e8e8 30%, #9a9a9a 62%, #4a4a4a 100%)",
                      boxShadow:
                        "0 0 18px rgba(229,229,229,0.22), inset 0 0 8px rgba(255,255,255,0.18)",
                    }}
                  />
                );
              })}
            </div>

            {/* MERGE FLASH — bloom births the text from the merged liquid */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  key="flash"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 0.9, scale: 1.4 }}
                  exit={{ opacity: 0, scale: 1.9 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  aria-hidden
                >
                  <div
                    className="h-[55vh] w-[80vw] max-w-[1100px]"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(229,229,229,0.3) 22%, rgba(192,192,192,0.1) 48%, transparent 70%)",
                      filter: "blur(8px)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* TEXT — born from the liquid composite */}
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
                transition={{
                  duration: T.text / 1000,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
                    textShadow: "0 0 44px rgba(229,229,229,0.24)",
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
                        "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)",
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
                      phase === "text" || phase === "hold" || phase === "spill"
                        ? 1
                        : 0,
                    opacity:
                      phase === "text" || phase === "hold" ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15,
                  }}
                  className="origin-center mt-5 h-px mx-auto"
                  style={{
                    width: "65%",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(229,229,229,0.8) 50%, transparent 100%)",
                  }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: phase === "hold" ? 0.8 : 0,
                    y: phase === "hold" ? 0 : 6,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 text-center text-[10px] tracking-[0.46em] uppercase text-silver-bright"
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

            {/* bottom kicker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  phase === "init" || phase === "drift" || phase === "travel"
                    ? 0.55
                    : 0,
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
