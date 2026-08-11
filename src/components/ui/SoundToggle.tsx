"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * SoundToggle — the gallery's optional soundtrack.
 *
 * Off by default (never surprise the visitor with audio). When switched on, a
 * whisper-quiet metallic tick plays as the cursor crosses interactive things —
 * links, buttons, works — like fingertips grazing chrome in a quiet exhibition.
 * A soft low tone marks the toggle itself. No files: everything is synthesised
 * with the Web Audio API (two detuned partials through a band-pass, fast
 * decay, gain ≈ 0.04), so it stays feather-light and always tasteful.
 *
 * The pill sits bottom-right. State persists in localStorage. Listeners are
 * only attached while enabled and are torn down the moment it's off, so there
 * is zero cost when silent. Ticks are throttled; the AudioContext is created
 * lazily on the first user gesture (autoplay-policy safe).
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    try {
      setOn(localStorage.getItem("sound") === "on");
    } catch {
      /* ignore */
    }
  }, []);

  const ctx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  // A short metallic tick — two detuned partials, band-passed, quick decay.
  const tick = useCallback(
    (base = 2600, level = 0.04, dur = 0.09) => {
      const ac = ctx();
      if (!ac) return;
      const now = ac.currentTime;
      const bp = ac.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = base;
      bp.Q.value = 6;
      const gain = ac.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(level, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      bp.connect(gain).connect(ac.destination);
      [base, base * 1.48].forEach((f, i) => {
        const o = ac.createOscillator();
        o.type = "triangle";
        o.frequency.value = f;
        const og = ac.createGain();
        og.gain.value = i === 0 ? 1 : 0.5;
        o.connect(og).connect(bp);
        o.start(now);
        o.stop(now + dur);
      });
    },
    [ctx]
  );

  // Attach the hover/tap listener only while enabled.
  useEffect(() => {
    if (!on || typeof window === "undefined") return;
    const SEL = 'a, button, [role="button"], [data-cursor], .bento-cell, .intent-scan';
    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (!t || !t.closest(SEL)) return;
      const now = performance.now();
      if (now - lastRef.current < 110) return; // throttle
      lastRef.current = now;
      tick();
    };
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => window.removeEventListener("pointerover", onOver);
  }, [on, tick]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem("sound", next ? "on" : "off");
    } catch {
      /* ignore */
    }
    if (next) tick(1400, 0.05, 0.16); // soft confirmation tone
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Sound on — click to mute" : "Sound off — click to enable"}
      data-cursor={on ? "MUTE" : "SOUND"}
      data-prox
      className="lg-btn lg-btn--quiet fixed bottom-6 right-6 z-[70] hidden md:inline-flex gap-2.5 px-4 text-[9px] tracking-[0.3em] uppercase text-silver-bright"
    >
      {/* three chrome bars that "wake" when sound is on */}
      <span className="flex items-end gap-[3px] h-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[2px] bg-silver-bright"
            style={{
              height: on ? ["6px", "12px", "8px"][i] : "3px",
              opacity: on ? 0.9 : 0.4,
              transition: "height 500ms cubic-bezier(0.19,1,0.22,1), opacity 500ms",
            }}
          />
        ))}
      </span>
      <span>{on ? "Sound" : "Silent"}</span>
    </button>
  );
}
