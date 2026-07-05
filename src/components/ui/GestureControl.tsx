"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

/**
 * GestureControl — Motion Control for the Digital Atelier.
 *
 * The browser will never let us open a camera silently — so the UX is built
 * around a single one-time consent, after which the experience is automatic:
 *
 *   first visit   small "Motion Control" chip → one click → permission →
 *                 Gesture Ready. Raise a hand → Gesture Active.
 *   return visit  if consent was stored AND the browser reports the camera
 *                 permission as granted, detection starts silently —
 *                 no button, no prompt. Raise a hand and it just works.
 *
 * States: unavailable → offer → loading → ready ⇄ active → (off)
 *   ready   camera on, hand not seen (detection at a light cadence)
 *   active  hand in frame (full cadence); pinch + move = scroll
 *   idle→stop: no hand for IDLE_MS lightens cadence; STOP_MS stops the
 *   camera entirely (tracks stopped) and returns to the offer chip.
 *
 * Gestures:
 *   pinch (thumb↔index close) + move hand up   → scroll page down
 *   pinch + move hand down                     → scroll page up
 *   open palm / no pinch                       → nothing (palm pause)
 *
 * Privacy: nothing is stored or sent; frames are analysed in-browser by
 * MediaPipe HandLandmarker (lazy-loaded from CDN only after consent).
 * Disable stops every camera track immediately. Tab hidden pauses work.
 * Desktop-only; reduced-motion disables the feature entirely.
 */

type GState = "unavailable" | "offer" | "loading" | "ready" | "active" | "off";

const CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
const MODEL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

const TICK_ACTIVE_MS = 40; // ~25fps while a hand is present — snappy tracking
const TICK_READY_MS = 180; // light cadence while watching for a hand
const IDLE_MS = 3000; // hand gone → back to ready cadence
const STOP_MS = 90_000; // no hand for 90s → stop camera fully
const PINCH_ON = 0.06; // normalized thumb↔index distance (slightly easier)
const PINCH_OFF = 0.095;
// Joystick model: the pinch point becomes the neutral centre. Holding the
// hand above/below it scrolls continuously at a speed proportional to the
// offset. Open palm releases instantly.
const DEAD_ZONE = 0.02; // normalized offset ignored around the centre
const JOY_SPEED = 110; // px/frame at full offset (~0.5 above/below centre)
const MAX_VEL = 42; // px/frame velocity clamp
const VEL_EASE = 0.16; // per-frame lerp toward target velocity (smoothness)

export default function GestureControl() {
  const { lang } = useLang();
  const [state, setState] = useState<GState>("unavailable");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const landmarkerRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSeenRef = useRef(0);
  const pinchRef = useRef(false);
  const anchorYRef = useRef<number | null>(null); // pinch point = neutral centre
  const targetVelRef = useRef(0); // px/frame the joystick asks for
  const velRef = useRef(0); // smoothed velocity actually applied
  const scrollRafRef = useRef(0);
  const scrollActiveRef = useRef(false); // loop keep-alive flag
  const stateRef = useRef<GState>("unavailable");
  stateRef.current = state;

  // Smooth scroll engine — one rAF loop runs for the whole active session.
  // Detection (~25fps) only steers targetVel; this loop eases the real
  // velocity toward it every frame (60fps) and applies it with behavior
  // "auto" so the CSS `scroll-behavior: smooth` never swallows it.
  const stopScrollLoop = useCallback(() => {
    scrollActiveRef.current = false;
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = 0;
    targetVelRef.current = 0;
    velRef.current = 0;
  }, []);

  const startScrollLoop = useCallback(() => {
    if (scrollActiveRef.current) return;
    scrollActiveRef.current = true;
    const step = () => {
      if (!scrollActiveRef.current) {
        scrollRafRef.current = 0;
        return;
      }
      velRef.current += (targetVelRef.current - velRef.current) * VEL_EASE;
      if (Math.abs(velRef.current) > 0.15) {
        window.scrollBy({ top: velRef.current, left: 0, behavior: "auto" });
      }
      scrollRafRef.current = requestAnimationFrame(step);
    };
    scrollRafRef.current = requestAnimationFrame(step);
  }, []);

  // capability + auto-resume for returning visitors.
  // Not gated on `launched`: during the intro the chip simply sits beneath
  // the loader overlay (z-100 vs z-70), so there's no timing dependency.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || narrow || reduced || !navigator.mediaDevices?.getUserMedia) {
      setState("unavailable");
      return;
    }
    let pref: string | null = null;
    try {
      pref = localStorage.getItem("gesture");
    } catch {
      /* ignore */
    }
    if (pref === "off") {
      setState("off");
      return;
    }
    setState("offer");
    // returning visitor with stored consent: start silently only if the
    // browser itself says the permission is already granted (no prompt).
    if (pref === "on" && navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "camera" as PermissionName })
        .then((p) => {
          if (p.state === "granted") enable(true);
        })
        .catch(() => {
          /* permissions API unavailable — stay at offer */
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopCamera = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stopScrollLoop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, [stopScrollLoop]);

  // full teardown on unmount
  useEffect(() => stopCamera, [stopCamera]);

  // tab hidden → pause the detection loop (camera stays, work stops)
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else if (
        streamRef.current &&
        (stateRef.current === "ready" || stateRef.current === "active")
      ) {
        loop(stateRef.current === "active" ? TICK_ACTIVE_MS : TICK_READY_MS);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectOnce = useCallback(() => {
    const video = videoRef.current;
    const lm = landmarkerRef.current;
    if (!video || !lm || video.readyState < 2) return;

    let result;
    try {
      result = lm.detectForVideo(video, performance.now());
    } catch {
      return;
    }
    const hand = result?.landmarks?.[0];

    if (hand) {
      lastSeenRef.current = performance.now();
      if (stateRef.current !== "active") {
        setState("active");
        loop(TICK_ACTIVE_MS);
        startScrollLoop();
      }
      // pinch = thumb tip (4) ↔ index tip (8), with hysteresis
      const dx = hand[4].x - hand[8].x;
      const dy = hand[4].y - hand[8].y;
      const dist = Math.hypot(dx, dy);
      const wasPinch = pinchRef.current;
      const isPinch = wasPinch ? dist < PINCH_OFF : dist < PINCH_ON;
      pinchRef.current = isPinch;

      if (isPinch) {
        const y = hand[8].y; // normalized 0 (top) .. 1 (bottom)
        if (anchorYRef.current === null) {
          // the moment you pinch becomes the neutral centre
          anchorYRef.current = y;
          targetVelRef.current = 0;
        } else {
          // joystick: hold above the centre → page flows down, and the
          // further you hold, the faster it flows. Dead zone kills jitter.
          const off = anchorYRef.current - y; // hand above anchor → positive
          const mag = Math.abs(off);
          if (mag < DEAD_ZONE) {
            targetVelRef.current = 0;
          } else {
            const v = (mag - DEAD_ZONE) * Math.sign(off) * JOY_SPEED;
            targetVelRef.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, v));
          }
        }
      } else {
        // open palm → instant release
        anchorYRef.current = null;
        targetVelRef.current = 0;
      }
    } else {
      pinchRef.current = false;
      anchorYRef.current = null;
      targetVelRef.current = 0;
      const since = performance.now() - lastSeenRef.current;
      if (stateRef.current === "active" && since > IDLE_MS) {
        setState("ready");
        loop(TICK_READY_MS);
        stopScrollLoop();
      } else if (
        stateRef.current === "ready" &&
        lastSeenRef.current > 0 &&
        since > STOP_MS
      ) {
        // long idle — release the camera entirely, return to the quiet chip
        stopCamera();
        setState("offer");
      }
    }
  }, [stopCamera, startScrollLoop, stopScrollLoop]);

  const loop = useCallback(
    (ms: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(detectOnce, ms);
    },
    [detectOnce]
  );

  const enable = useCallback(
    async (silent = false) => {
      if (stateRef.current === "loading") return;
      setState("loading");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, frameRate: { ideal: 15 } },
          audio: false,
        });
        streamRef.current = stream;
        const video = videoRef.current;
        if (!video) throw new Error("no video element");
        video.srcObject = stream;
        await video.play();

        if (!landmarkerRef.current) {
          // lazy-load MediaPipe only now — never on initial page load
          // (CDN module: resolved at runtime in the browser, not by the bundler)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const vision: any = await import(
            /* webpackIgnore: true */ `${CDN}/vision_bundle.mjs`
          );
          const files = await vision.FilesetResolver.forVisionTasks(
            `${CDN}/wasm`
          );
          landmarkerRef.current =
            await vision.HandLandmarker.createFromOptions(files, {
              baseOptions: { modelAssetPath: MODEL, delegate: "GPU" },
              runningMode: "VIDEO",
              numHands: 1,
            });
        }
        try {
          localStorage.setItem("gesture", "on");
        } catch {
          /* ignore */
        }
        lastSeenRef.current = performance.now();
        setState("ready");
        loop(TICK_READY_MS);
      } catch {
        // denied or failed — the site simply stays a normal site
        stopCamera();
        landmarkerRef.current = null;
        setState(silent ? "offer" : "off");
        if (!silent) {
          try {
            localStorage.setItem("gesture", "off");
          } catch {
            /* ignore */
          }
        }
      }
    },
    [loop, stopCamera]
  );

  const disable = useCallback(() => {
    stopCamera();
    setState("off");
    try {
      localStorage.setItem("gesture", "off");
    } catch {
      /* ignore */
    }
  }, [stopCamera]);

  if (state === "unavailable") return null;

  const label =
    state === "loading"
      ? tr("gesture_loading", lang)
      : state === "active"
      ? tr("gesture_active", lang)
      : state === "ready"
      ? tr("gesture_ready", lang)
      : tr("gesture_offer", lang);

  const sub =
    state === "active"
      ? tr("gesture_active_sub", lang)
      : state === "ready"
      ? tr("gesture_ready_sub", lang)
      : tr("gesture_offer_sub", lang);

  const running = state === "ready" || state === "active";

  return (
    <>
      {/* hidden low-res camera feed used only for in-browser analysis */}
      <video
        ref={videoRef}
        muted
        playsInline
        aria-hidden
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <div
        className="fixed bottom-[4.4rem] right-6 z-[70] hidden md:flex flex-col items-end gap-1"
        title={tr("gesture_privacy", lang)}
      >
        <button
          onClick={() =>
            running ? disable() : state === "loading" ? undefined : enable()
          }
          aria-label={tr("gesture_aria", lang)}
          aria-pressed={running}
          data-cursor={running ? "OFF" : "ENTER"}
          className="group flex items-center gap-2.5 px-3.5 py-2 hairline-silver bg-base/50 backdrop-blur-sm text-[9px] tracking-[0.3em] uppercase text-silver-bright hover:text-offwhite transition-colors duration-500"
        >
          {/* state dot — quiet, breathing while active */}
          <span
            aria-hidden
            className="relative flex h-2 w-2 items-center justify-center"
          >
            <span
              className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
              style={{
                background:
                  state === "active"
                    ? "#f5f5f5"
                    : state === "ready"
                    ? "rgba(229,229,229,0.7)"
                    : "rgba(142,142,142,0.6)",
                boxShadow:
                  state === "active"
                    ? "0 0 8px rgba(245,245,245,0.9)"
                    : state === "ready"
                    ? "0 0 6px rgba(229,229,229,0.5)"
                    : "none",
              }}
            />
            {state === "active" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-offwhite/30" />
            )}
          </span>
          <span>{label}</span>
        </button>
        <span className="pr-1 text-[8px] tracking-[0.26em] uppercase text-silver-muted/70">
          {sub}
        </span>
      </div>
    </>
  );
}
