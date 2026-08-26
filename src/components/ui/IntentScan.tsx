"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * IntentScan — the site's signature gesture, "The Read".
 *
 * Each work is framed as an exhibit. Engage it (hover on desktop, tap on
 * mobile) and a single chrome reading-line sweeps across the piece once, as
 * if an eye — or an AI — were reading it. As the line passes, a viewfinder
 * frames the work and the one thought behind it develops into view: the
 * intent. It reads three ways at once — an AI scan, a brand signal, a
 * designer's viewfinder — which is exactly Shintaro's overlap.
 *
 * Restraint by construction: monochrome, one line, one pass, no loop. The
 * exhibit plate is always shown (curatorial), the intent is the reveal. Pure
 * CSS animation triggered by a class — no rAF. Reduced-motion shows the
 * intent without the sweep. On mobile the reveal is a toggle; on desktop it
 * follows hover/focus and clears on leave.
 */
export default function IntentScan({
  children,
  exhibit,
  medium,
  year,
  intent,
  eyebrow,
  className = "",
  staticOnTouch = false,
}: {
  children: ReactNode;
  exhibit: string;
  medium: string;
  year: string;
  intent: string;
  eyebrow: string;
  className?: string;
  /** On touch, don't hijack the tap (e.g. the child is already interactive);
   *  show the intent statically instead of toggling it. */
  staticOnTouch?: boolean;
}) {
  const [reading, setReading] = useState(false);
  const [scanKey, setScanKey] = useState(0);
  const [touch, setTouch] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const engage = () => {
    setReading(true);
    setScanKey((k) => k + 1); // restart the one-shot sweep
  };
  const release = () => setReading(false);

  // Inspection crosshair — while reading, thin measure lines follow the
  // cursor (local CSS vars; .scan-follow / .scan-follow-x track them).
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const y = ((e.clientY - r.top) / r.height) * 100;
    const x = ((e.clientX - r.left) / r.width) * 100;
    el.style.setProperty("--sy", `${Math.max(2, Math.min(98, y)).toFixed(1)}%`);
    el.style.setProperty("--sx", `${Math.max(2, Math.min(98, x)).toFixed(1)}%`);
  };

  // On touch with an already-interactive child, keep the intent shown
  // statically so we never fight the child's tap.
  const staticShown = touch && staticOnTouch;

  const handlers =
    touch
      ? staticOnTouch
        ? {}
        : { onClick: () => (reading ? release() : engage()) }
      : {
          onPointerEnter: engage,
          onPointerLeave: release,
          onPointerMove: onMove,
          onFocus: engage,
          onBlur: release,
        };

  const active = reading || staticShown;

  return (
    <div
      className={`intent-scan ${active ? "is-reading" : ""} ${
        staticShown ? "is-static" : ""
      } ${className}`}
      {...handlers}
    >
      {children}

      {/* viewfinder ticks — frame the exhibit while reading */}
      <span className="is-tick tick-tl" aria-hidden />
      <span className="is-tick tick-tr" aria-hidden />
      <span className="is-tick tick-bl" aria-hidden />
      <span className="is-tick tick-br" aria-hidden />

      {/* the reading line — one chrome sweep, restarts on each engage */}
      {!reduced && (
        <span key={scanKey} className="scan-line" aria-hidden />
      )}

      {/* inspection mode — after the sweep, a measuring crosshair follows
          the eye: a horizontal reading line, a vertical measure line, and a
          ruler of fine ticks along the top edge */}
      {!reduced && !touch && (
        <>
          <span className="scan-follow" aria-hidden />
          <span className="scan-follow-x" aria-hidden />
          <span className="measure-ruler" aria-hidden />
          <span className="measure-meta" aria-hidden>
            INSPECT — {medium} · {year}
          </span>
        </>
      )}

      {/* exhibit plate — always shown, curatorial */}
      <span className="exhibit-plate" aria-hidden>
        <span className="exhibit-no">EXHIBIT {exhibit}</span>
        <span className="exhibit-sep" />
        <span>{medium}</span>
        <span className="exhibit-sep" />
        <span>{year}</span>
      </span>

      {/* intent — the single thought, developed by the reading line */}
      <span className="intent-line" aria-hidden>
        <span className="intent-eyebrow">{eyebrow}</span>
        <span className="intent-text">{intent}</span>
      </span>
    </div>
  );
}
