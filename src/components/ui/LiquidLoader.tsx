"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TEXT = "AVENDANYO";

// Two carefully chosen curves used everywhere — one slow luxurious deceleration,
// one symmetric ease-in-out for the final dissolve. Nothing else.
const EASE = [0.19, 1, 0.22, 1] as const;
const EASE_IO = [0.83, 0, 0.17, 1] as const;

/**
 * Cinematic timeline — designed as ONE sustained gesture, not stitched-together
 * phases. Each transition overlaps so the eye never sees a snap.
 *
 *   silence        : pure black for a beat before anything emerges
 *   emerge         : droplets ink in from depth, closest first
 *   drift          : weightless floating — quiet "alive" tempo
 *   migrate        : single coherent pull toward letter coordinates
 *                    (per-droplet delay tightened so it reads as ONE motion)
 *   settle         : final precise alignment onto the text shape
 *   liquidHold     : ★ the iconic frame — letters are liquid, breathing
 *   chromeFlow     : chrome polish SWEEPS left → right ACROSS the liquid,
 *                    consuming droplets as it passes (each droplet's exit
 *                    delay matches its X position so the dissolve tracks
 *                    the chrome wavefront — not a global crossfade)
 *   chromeHold     : metallic typography settles with a single shimmer pass
 *   dissolve       : chrome and ambient lift away — gentle handoff to Hero
 *
 *   Total ≈ 9.3s
 */
const T = {
  silence: 300,
  emerge: 900,
  drift: 800,
  migrate: 1800,
  settle: 500,
  liquidHold: 1300,
  chromeFlow: 1400,
  chromeHold: 1400,
  dissolve: 900,
} as const;

const STAGE = {
  silence: 0,
  emerge: T.silence,
  drift: T.silence + T.emerge,
  migrate: T.silence + T.emerge + T.drift,
  settle: T.silence + T.emerge + T.drift + T.migrate,
  liquidHold: T.silence + T.emerge + T.drift + T.migrate + T.settle,
  chromeFlow:
    T.silence + T.emerge + T.drift + T.migrate + T.settle + T.liquidHold,
  chromeHold:
    T.silence +
    T.emerge +
    T.drift +
    T.migrate +
    T.settle +
    T.liquidHold +
    T.chromeFlow,
  dissolve:
    T.silence +
    T.emerge +
    T.drift +
    T.migrate +
    T.settle +
    T.liquidHold +
    T.chromeFlow +
    T.chromeHold,
  end:
    T.silence +
    T.emerge +
    T.drift +
    T.migrate +
    T.settle +
    T.liquidHold +
    T.chromeFlow +
    T.chromeHold +
    T.dissolve,
} as const;

// Fewer, larger, more deliberate. Each droplet is meant to be seen.
const DROPLET_COUNT = 78;

type Phase =
  | "silence"
  | "emerge"
  | "drift"
  | "migrate"
  | "settle"
  | "liquidHold"
  | "chromeFlow"
  | "chromeHold"
  | "dissolve";

interface Droplet {
  id: number;
  // viewport % — converted to px at runtime for GPU transforms
  fromXp: number;
  fromYp: number;
  driftXp: number;
  driftYp: number;
  toXp: number;
  toYp: number;
  size: number;
  depth: number;       // 0 close .. 1 deep
  emergeDelay: number; // close droplets first
  migrateDelay: number;// tight spread so it reads as ONE gesture
  oscX: number;
  oscY: number;
}

/** Sample target positions from the rendered text shape. */
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
    const tw = ctx.measureText(text).width;
    const scale = Math.min(1, (W - 80) / tw);
    const finalPx = Math.floor(fontPx * scale);
    ctx.font = `bold ${finalPx}px ${fontFamily}`;
    const w2 = ctx.measureText(text).width;
    ctx.fillText(text, (W - w2) / 2, H / 2);

    const data = ctx.getImageData(0, 0, W, H).data;
    const opaque: { x: number; y: number }[] = [];
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
    let toXp = 50 + (rand() - 0.5) * 60;
    let toYp = 48 + (rand() - 0.5) * 6;
    if (shape && shape.length) {
      const pt = shape[i % shape.length];
      toXp = 12 + pt.x * 76;
      toYp = 39 + pt.y * 22;
    }
    const fromXp = rand() * 100;
    const fromYp = rand() * 100;
    const depth = rand();
    out.push({
      id: i,
      fromXp,
      fromYp,
      driftXp: fromXp + (rand() - 0.5) * 8,  // gentler drift
      driftYp: fromYp + (rand() - 0.5) * 8,
      toXp,
      toYp,
      size: 22 + rand() * 18,                // 22..40 px — bigger, more deliberate
      depth,
      emergeDelay: depth * 350,              // close droplets first
      migrateDelay: rand() * 280,            // ★ tightened from 750 to 280 → ONE gesture
      oscX: (rand() - 0.5) * 1.2,
      oscY: (rand() - 0.5) * 1.2,
    });
  }
  return out;
}

export default function LiquidLoader() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<Phase>("silence");
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [viewport, setViewport] = useState({ w: 1280, h: 800 });
  const startedRef = useRef(false);

  // Mount: sample shape + build droplets
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

  // Lock scroll + manual scroll restoration
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

  // Phase timeline
  useEffect(() => {
    if (!mounted || !active || startedRef.current || droplets.length === 0)
      return;
    startedRef.current = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("emerge"), STAGE.emerge));
    timers.push(setTimeout(() => setPhase("drift"), STAGE.drift));
    timers.push(setTimeout(() => setPhase("migrate"), STAGE.migrate));
    timers.push(setTimeout(() => setPhase("settle"), STAGE.settle));
    timers.push(setTimeout(() => setPhase("liquidHold"), STAGE.liquidHold));
    timers.push(setTimeout(() => setPhase("chromeFlow"), STAGE.chromeFlow));
    timers.push(setTimeout(() => setPhase("chromeHold"), STAGE.chromeHold));
    timers.push(setTimeout(() => setPhase("dissolve"), STAGE.dissolve));
    timers.push(
      setTimeout(() => {
        setActive(false);
        if (typeof window !== "undefined") window.scrollTo(0, 0);
      }, STAGE.end)
    );
    return () => timers.forEach(clearTimeout);
  }, [mounted, active, droplets.length]);

  if (!mounted) return null;

  const pct = (xp: number, yp: number) => ({
    x: (xp / 100) * viewport.w,
    y: (yp / 100) * viewport.h,
  });

  const chromeOn =
    phase === "chromeFlow" ||
    phase === "chromeHold" ||
    phase === "dissolve";

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="liquid-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "dissolve" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: T.dissolve / 1000,
            ease: EASE_IO,
          }}
          className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden"
          aria-hidden
          role="presentation"
        >
          <div className="absolute inset-0 bg-base">
            {/* SVG defs */}
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

              <pattern
                id="loaderGrid"
                width="96"
                height="96"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 96 0 L 0 0 0 96"
                  fill="none"
                  stroke="#E5E5E5"
                  strokeOpacity="0.045"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#loaderGrid)" />
            </svg>

            {/* ambient silver glow — breathes during liquidHold */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0.6 }}
              animate={{
                opacity:
                  phase === "liquidHold" || phase === "chromeFlow" ? 1 : 0.6,
              }}
              transition={{ duration: 1.6, ease: EASE }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(229,229,229,0.12) 0%, rgba(229,229,229,0.04) 38%, transparent 72%)",
              }}
              aria-hidden
            />

            {/* DROPLETS — goo-merged, GPU-transformed */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ filter: "url(#liquidGoo)" }}
              aria-hidden
            >
              {droplets.map((d) => {
                const from = pct(d.fromXp, d.fromYp);
                const drift = pct(d.driftXp, d.driftYp);
                const target = pct(d.toXp, d.toYp);

                const blurForDepth = `${d.depth * 1.6}px`;
                const opacityNear = 0.8 + (1 - d.depth) * 0.2;

                // Droplet exit during chromeFlow tracks the chrome wavefront L→R
                // chrome reaches X at time = (d.toXp / 100) * T.chromeFlow
                const chromeReachSec = (d.toXp / 100) * (T.chromeFlow / 1000);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let animateProps: any = {};
                let duration = T.emerge / 1000;
                let delay = 0;
                let times: number[] | undefined;

                if (phase === "silence") {
                  animateProps = {
                    x: from.x,
                    y: from.y,
                    opacity: 0,
                    scale: 0.5,
                  };
                  duration = 0.001;
                } else if (phase === "emerge") {
                  animateProps = {
                    x: from.x,
                    y: from.y,
                    opacity: opacityNear,
                    scale: 1,
                  };
                  duration = T.emerge / 1000;
                  delay = d.emergeDelay / 1000;
                } else if (phase === "drift") {
                  animateProps = {
                    x: drift.x,
                    y: drift.y,
                    opacity: opacityNear,
                    scale: 1,
                  };
                  duration = T.drift / 1000;
                } else if (phase === "migrate") {
                  animateProps = {
                    x: target.x,
                    y: target.y,
                    opacity: 1,
                    scale: 1,
                  };
                  duration = T.migrate / 1000;
                  delay = d.migrateDelay / 1000;
                } else if (phase === "settle") {
                  animateProps = {
                    x: target.x,
                    y: target.y,
                    opacity: 1,
                    scale: 1,
                  };
                  duration = T.settle / 1000;
                } else if (phase === "liquidHold") {
                  animateProps = {
                    x: [target.x, target.x + d.oscX, target.x],
                    y: [target.y, target.y + d.oscY, target.y],
                    opacity: 1,
                    scale: [1, 1.02, 1],
                  };
                  duration = T.liquidHold / 1000;
                  times = [0, 0.5, 1];
                } else if (phase === "chromeFlow") {
                  // exit timed to chrome wavefront
                  animateProps = {
                    x: target.x,
                    y: target.y,
                    opacity: 0,
                    scale: 0.88,
                  };
                  duration = 0.35;
                  delay = chromeReachSec;
                } else {
                  // chromeHold + dissolve — droplets already gone
                  animateProps = {
                    x: target.x,
                    y: target.y,
                    opacity: 0,
                    scale: 0.85,
                  };
                  duration = 0.4;
                }

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
                      delay,
                      ease: EASE,
                      times,
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

            {/* CHROME TEXT — clip-path sweep L→R ACROSS the liquid letters */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative px-6">
                <motion.h1
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={
                    chromeOn
                      ? { clipPath: "inset(0 0% 0 0)" }
                      : { clipPath: "inset(0 100% 0 0)" }
                  }
                  transition={{
                    duration: T.chromeFlow / 1000,
                    ease: EASE,
                  }}
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
                  {/* shimmer sweep during chromeHold */}
                  <motion.span
                    aria-hidden
                    initial={{ x: "-140%" }}
                    animate={
                      phase === "chromeHold" ? { x: "140%" } : { x: "-140%" }
                    }
                    transition={{
                      duration: T.chromeHold / 1000,
                      ease: EASE,
                    }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.7) 50%, transparent 62%)",
                      WebkitMaskImage:
                        "linear-gradient(180deg, #000 0%, #000 100%)",
                      mixBlendMode: "screen",
                    }}
                  />
                </motion.h1>

                {/* hairline under text — slides in with chrome */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: chromeOn ? 1 : 0,
                    opacity:
                      phase === "chromeHold" || phase === "chromeFlow"
                        ? 1
                        : phase === "dissolve"
                        ? 0
                        : 0,
                  }}
                  transition={{
                    duration: T.chromeFlow / 1000,
                    ease: EASE,
                    delay: 0.1,
                  }}
                  className="origin-left mt-5 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(229,229,229,0.85) 50%, transparent 100%)",
                  }}
                />

                {/* sub-label */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: phase === "chromeHold" ? 0.8 : 0,
                    y: phase === "chromeHold" ? 0 : 6,
                  }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="mt-4 text-center text-[10px] tracking-[0.46em] uppercase text-silver-bright"
                >
                  AI Creative Developer
                </motion.p>
              </div>
            </div>

            {/* corner ticks */}
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
                  phase === "emerge" ||
                  phase === "drift" ||
                  phase === "migrate"
                    ? 0.55
                    : 0,
              }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 text-[10px] tracking-[0.4em] uppercase text-silver-muted"
              aria-hidden
            >
              <span className="h-px w-8 bg-silver/40" />
              <span>Portfolio · Volume 02</span>
              <span className="h-px w-8 bg-silver/40" />
            </motion.div>
          </div>
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
