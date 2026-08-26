"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLaunch } from "@/context/LaunchContext";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const TEXT = "AVENDAÑO";

// Two carefully chosen curves used everywhere.
const EASE = [0.19, 1, 0.22, 1] as const;
const EASE_IO = [0.83, 0, 0.17, 1] as const;

/**
 * Cinematic timeline — ≈ 10.0s
 *
 *   dark      : pure black for a beat before anything emerges
 *   emerge    : silver droplets ink in from depth — already positioned on
 *               their orbital ring, just becoming visible
 *   orbit     : the SIGNATURE moment — droplets orbit the centre AND spiral
 *               inward simultaneously. Inner rings rotate faster than outer
 *               ones for a true vortex feel. 110 droplets across 4 rings,
 *               each on a pre-computed circular spiral keyframe path.
 *   fusion    : the spiral has tightened to a small cluster — droplets
 *               settle, breathe, ambient glow blooms (mercury mass)
 *   morph    : the liquid mass elongates outward as each droplet flies to
 *               its target inside the AVENDANO text shape. Goo filter
 *               melts adjacent droplets into letter strokes.
 *   chrome    : chrome polish SWEEPS left → right across the liquid letters,
 *               consuming droplets as it passes
 *   hold      : metallic typography settles with a single shimmer pass +
 *               sub-label
 *   dissolve  : chrome and ambient lift away — gentle handoff to Hero
 */
/**
 * Retimed from ~9.95s to ~3.7s.
 *
 * Every phase survives, so the sequence still reads as written above: dark,
 * emerge, vortex, fusion, morph into the wordmark, chrome sweep, hold,
 * dissolve. What changed is that it no longer asks for ten seconds before the
 * first line of the page. With the EntrySphere's own 1.6s hand-off in front
 * of it, time to content was about 11.2 seconds, and the control labelled
 * "skip" started the whole thing anyway.
 *
 * The vortex keeps the largest share because it is the phase people actually
 * watch; hold and dissolve give up the most because they are the part where
 * the visitor already knows what it says.
 */
const T = {
  dark: 100,
  emerge: 320,
  orbit: 900,
  fusion: 280,
  morph: 800,
  chrome: 500,
  hold: 400,
  dissolve: 400,
} as const;

const STAGE = {
  dark: 0,
  emerge: T.dark,
  orbit: T.dark + T.emerge,
  fusion: T.dark + T.emerge + T.orbit,
  morph: T.dark + T.emerge + T.orbit + T.fusion,
  chrome: T.dark + T.emerge + T.orbit + T.fusion + T.morph,
  hold: T.dark + T.emerge + T.orbit + T.fusion + T.morph + T.chrome,
  dissolve:
    T.dark +
    T.emerge +
    T.orbit +
    T.fusion +
    T.morph +
    T.chrome +
    T.hold,
  end:
    T.dark +
    T.emerge +
    T.orbit +
    T.fusion +
    T.morph +
    T.chrome +
    T.hold +
    T.dissolve,
} as const;

const DROPLET_COUNT = 110;
const ORBIT_KEYFRAMES = 22;

type Phase =
  | "dark"
  | "emerge"
  | "orbit"
  | "fusion"
  | "morph"
  | "chrome"
  | "hold"
  | "dissolve";

interface Droplet {
  id: number;
  // emerge starting position (random scatter)
  fromXp: number;
  fromYp: number;
  // orbit params
  ringIndex: number;        // 0 inner .. 3 outer
  startAngle: number;       // radians
  angularSpan: number;      // total rotation across orbit phase (rad)
  startRadiusFactor: number;// multiplier on the ring's base radius
  endRadiusFactor: number;  // multiplier at end of spiral
  // morph target (text-shape coord, % of viewport)
  toXp: number;
  toYp: number;
  // misc
  size: number;
  depth: number;            // 0 close .. 1 deep
  emergeDelay: number;
  oscX: number;
  oscY: number;
}

/* ─────────────────────────────────────────────────────────────────────
   Sample the AVENDANO text shape (whole word) — used as morph targets
   ───────────────────────────────────────────────────────────────────── */
function sampleTextShape(
  text: string,
  fontPx: number,
  fontFamily: string,
  sampleCount: number
): { x: number; y: number }[] | null {
  if (typeof document === "undefined") return null;
  try {
    const W = 1800;
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
    const scale = Math.min(1, (W - 120) / tw);
    const finalPx = Math.floor(fontPx * scale);
    ctx.font = `bold ${finalPx}px ${fontFamily}`;
    const finalTw = ctx.measureText(text).width;
    ctx.fillText(text, (W - finalTw) / 2, H / 2);

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

  // Vortex: inner rings rotate further (faster) than outer ones.
  const ringSpec = [
    { ringIndex: 0, count: 24, baseStart: 0.55, baseEnd: 0.08, spans: 1.55 }, // inner — fastest
    { ringIndex: 1, count: 30, baseStart: 0.72, baseEnd: 0.09, spans: 1.30 },
    { ringIndex: 2, count: 30, baseStart: 0.90, baseEnd: 0.10, spans: 1.05 },
    { ringIndex: 3, count: 26, baseStart: 1.10, baseEnd: 0.12, spans: 0.80 }, // outer — slowest
  ];

  const out: Droplet[] = [];
  let id = 0;

  for (const ring of ringSpec) {
    for (let i = 0; i < ring.count && id < count; i++) {
      // distribute around the ring with mild jitter
      const baseAngle = (i / ring.count) * Math.PI * 2;
      const startAngle = baseAngle + (rand() - 0.5) * 0.5;
      const startR = ring.baseStart * (0.9 + rand() * 0.2);
      const endR = ring.baseEnd * (0.7 + rand() * 0.6);
      const span = ring.spans * Math.PI * 2 * (0.92 + rand() * 0.16);

      // morph target inside text shape
      let toXp = 50 + (rand() - 0.5) * 60;
      let toYp = 50 + (rand() - 0.5) * 6;
      if (shape && shape.length) {
        const pt = shape[id % shape.length];
        toXp = 10 + pt.x * 80;
        toYp = 39 + pt.y * 22;
      }

      const fromXp = rand() * 100;
      const fromYp = rand() * 100;
      const depth = (ring.ringIndex + rand() * 0.6) / 4; // outer rings have more depth blur

      out.push({
        id,
        fromXp,
        fromYp,
        ringIndex: ring.ringIndex,
        startAngle,
        angularSpan: span,
        startRadiusFactor: startR,
        endRadiusFactor: endR,
        toXp,
        toYp,
        size: 18 + rand() * 20, // 18..38 px
        depth,
        emergeDelay: depth * 320,
        oscX: (rand() - 0.5) * 1.2,
        oscY: (rand() - 0.5) * 1.2,
      });
      id++;
    }
  }
  return out;
}

export default function LiquidLoader() {
  const reduced = useReducedMotion();
  const { launched, introDone, ready, skipIntro, finishIntro } = useLaunch();
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<Phase>("dark");
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if ("scrollRestoration" in history)
      history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("resize", onResize);
    };
  }, [active, mounted]);

  // Phase timeline — waits for the EntrySphere to hand off (launched)
  useEffect(() => {
    if (!mounted || !active || startedRef.current || droplets.length === 0)
      return;
    if (!launched) return; // hold on the dark frame until the user enters
    startedRef.current = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("emerge"), STAGE.emerge));
    timers.push(setTimeout(() => setPhase("orbit"), STAGE.orbit));
    timers.push(setTimeout(() => setPhase("fusion"), STAGE.fusion));
    timers.push(setTimeout(() => setPhase("morph"), STAGE.morph));
    timers.push(setTimeout(() => setPhase("chrome"), STAGE.chrome));
    timers.push(setTimeout(() => setPhase("hold"), STAGE.hold));
    timers.push(setTimeout(() => setPhase("dissolve"), STAGE.dissolve));
    timers.push(
      setTimeout(() => {
        setActive(false);
        finishIntro();
        if (typeof window !== "undefined") window.scrollTo(0, 0);
      }, STAGE.end)
    );
    return () => timers.forEach(clearTimeout);
  }, [mounted, active, droplets.length, launched, finishIntro]);

  // Escape ends the opening from here too, matching the sphere.
  useEffect(() => {
    if (!mounted || !active) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(false);
        skipIntro();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [mounted, active, skipIntro]);

  // Pre-compute orbit keyframes (one set per droplet) — keeps motion smooth
  // and GPU-friendly via Framer's keyframe interpolation.
  //
  // Each path PREPENDS the scatter position so the orbit phase begins by
  // pulling droplets from their random scatter onto the orbital ring.
  // The first 18% of the phase = "gather onto ring", the remaining 82% =
  // the actual vortex spiral. This way the visual starts as a wide, airy
  // scatter — not a pre-organised clump.
  const GATHER_FRACTION = 0.18;
  const orbitKeyframes = useMemo(() => {
    const cx = viewport.w / 2;
    const cy = viewport.h / 2;
    const baseRadius = Math.min(viewport.w, viewport.h) * 0.42;
    return droplets.map((d) => {
      const fromX = (d.fromXp / 100) * viewport.w;
      const fromY = (d.fromYp / 100) * viewport.h;
      const xKeys: number[] = [fromX];
      const yKeys: number[] = [fromY];
      const times: number[] = [0];

      const startR = baseRadius * d.startRadiusFactor;
      const endR = baseRadius * d.endRadiusFactor;
      for (let k = 0; k <= ORBIT_KEYFRAMES; k++) {
        const t = k / ORBIT_KEYFRAMES;
        // ease-in spiral: radius shrinks slowly first, then faster
        const radius = startR + (endR - startR) * (t * t * (3 - 2 * t));
        const angle = d.startAngle + d.angularSpan * t;
        xKeys.push(cx + radius * Math.cos(angle));
        yKeys.push(cy + radius * Math.sin(angle));
        // remap so orbit keyframes occupy 0.18..1.0 of the phase
        times.push(GATHER_FRACTION + (1 - GATHER_FRACTION) * t);
      }
      return { x: xKeys, y: yKeys, times };
    });
  }, [droplets, viewport]);

  // The "settled" position at end of orbit phase — start of fusion.
  const settled = useMemo(() => {
    const cx = viewport.w / 2;
    const cy = viewport.h / 2;
    const baseRadius = Math.min(viewport.w, viewport.h) * 0.42;
    return droplets.map((d) => {
      const finalAngle = d.startAngle + d.angularSpan;
      const finalR = baseRadius * d.endRadiusFactor;
      return {
        x: cx + finalR * Math.cos(finalAngle),
        y: cy + finalR * Math.sin(finalAngle),
      };
    });
  }, [droplets, viewport]);

  // `ready` gates on sessionStorage having been read, so a returning visitor
  // never sees a frame of the opening they already sat through.
  if (!mounted || !ready || introDone) return null;

  const pct = (xp: number, yp: number) => ({
    x: (xp / 100) * viewport.w,
    y: (yp / 100) * viewport.h,
  });

  const chromeOn =
    phase === "chrome" || phase === "hold" || phase === "dissolve";

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="liquid-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "dissolve" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: T.dissolve / 1000, ease: EASE_IO }}
          className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden"
        >
          {/* A way out of the opening that is visible while the opening is
              playing. The wrapper is no longer aria-hidden, because an
              aria-hidden container cannot hold a control anyone can reach;
              the decorative layers below carry their own aria-hidden. */}
          <button
            type="button"
            onClick={() => {
              setActive(false);
              skipIntro();
            }}
            className="absolute bottom-4 right-4 z-10 min-h-[44px] min-w-[44px] px-4 py-3 text-[11px] tracking-[0.3em] uppercase text-silver-bright/80 hover:text-offwhite focus-visible:text-offwhite transition-colors"
          >
            {tr("entry_skip", lang)}
          </button>

          <div className="absolute inset-0 bg-base" aria-hidden>
            {/* SVG defs — goo filter + scan grid */}
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

            {/* Ambient silver glow — intensifies during fusion */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0.45 }}
              animate={{
                opacity:
                  phase === "fusion" || phase === "morph" || phase === "chrome"
                    ? 1
                    : phase === "orbit"
                    ? 0.75
                    : 0.5,
              }}
              transition={{ duration: 1.4, ease: EASE }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(229,229,229,0.14) 0%, rgba(229,229,229,0.05) 36%, transparent 72%)",
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
                const target = pct(d.toXp, d.toYp);
                const orbit = orbitKeyframes[d.id];
                const settle = settled[d.id];

                const blurForDepth = `${d.depth * 1.6}px`;
                const opacityNear = 0.8 + (1 - d.depth) * 0.2;

                // emerge → at the random scatter position (wide, airy).
                // orbit phase will pull droplets onto the ring during its
                // first 18% before the actual spiral begins.
                const emergeX = from.x;
                const emergeY = from.y;

                // Chrome wavefront timing
                const chromeReachSec = (d.toXp / 100) * (T.chrome / 1000);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let animateProps: any = {};
                let duration = 0.4;
                let delay = 0;
                let times: number[] | undefined;
                let ease: typeof EASE | "linear" = EASE;

                if (phase === "dark") {
                  animateProps = {
                    x: from.x,
                    y: from.y,
                    opacity: 0,
                    scale: 0.4,
                  };
                  duration = 0.001;
                } else if (phase === "emerge") {
                  animateProps = {
                    x: emergeX,
                    y: emergeY,
                    opacity: opacityNear,
                    scale: 1,
                  };
                  duration = T.emerge / 1000;
                  delay = d.emergeDelay / 1000;
                } else if (phase === "orbit") {
                  // ★ Vortex motion — droplets first GATHER from their
                  // scatter onto the orbital ring (first 18% of the phase),
                  // then traverse the spiral keyframe path into the centre.
                  animateProps = {
                    x: orbit.x,
                    y: orbit.y,
                    opacity: 1,
                    scale: 1,
                  };
                  duration = T.orbit / 1000;
                  times = orbit.times;
                  ease = "linear"; // linear between keyframes = smooth orbit
                } else if (phase === "fusion") {
                  // settled near the centre, micro-oscillation suggests liquid
                  animateProps = {
                    x: [settle.x, settle.x + d.oscX * 2, settle.x],
                    y: [settle.y, settle.y + d.oscY * 2, settle.y],
                    opacity: 1,
                    scale: [1, 1.06, 1],
                  };
                  duration = T.fusion / 1000;
                  times = [0, 0.5, 1];
                } else if (phase === "morph") {
                  // The liquid mass elongates outward — each droplet flies
                  // to its target inside the AVENDANO text shape. Goo filter
                  // melts adjacent droplets into letter strokes.
                  animateProps = {
                    x: target.x,
                    y: target.y,
                    opacity: 1,
                    scale: 1,
                  };
                  duration = T.morph / 1000;
                } else if (phase === "chrome") {
                  // exit timed to chrome wavefront L→R
                  animateProps = {
                    x: target.x,
                    y: target.y,
                    opacity: 0,
                    scale: 0.88,
                  };
                  duration = 0.4;
                  delay = chromeReachSec;
                } else {
                  // hold + dissolve — droplets already gone
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
                      scale: 0.4,
                    }}
                    animate={animateProps}
                    transition={{
                      duration,
                      delay,
                      ease,
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

            {/* CHROME TEXT — clip-path sweep L→R across the formed liquid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative px-6">
                <motion.h1
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={
                    chromeOn
                      ? { clipPath: "inset(0 0% 0 0)" }
                      : { clipPath: "inset(0 100% 0 0)" }
                  }
                  transition={{ duration: T.chrome / 1000, ease: EASE }}
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
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: chromeOn ? 1 : 0,
                    opacity:
                      phase === "hold" || phase === "chrome"
                        ? 1
                        : phase === "dissolve"
                        ? 0
                        : 0,
                  }}
                  transition={{
                    duration: T.chrome / 1000,
                    ease: EASE,
                    delay: 0.1,
                  }}
                  className="origin-left mt-5 h-px"
                  style={{
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

            {/* bottom kicker — visible only during early phases */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  phase === "emerge" ||
                  phase === "orbit" ||
                  phase === "fusion"
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
