"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface LaunchValue {
  /** The sphere has handed over; the loader timeline may run. */
  launched: boolean;
  /** The opening is over (skipped, already seen, or finished). Show the page. */
  introDone: boolean;
  /** True until we have read sessionStorage, so SSR and first paint agree. */
  ready: boolean;
  launch: () => void;
  /** End the whole opening immediately: sphere and loader both stand down. */
  skipIntro: () => void;
  /** The loader timeline reached its end on its own. */
  finishIntro: () => void;
}

const LaunchContext = createContext<LaunchValue | null>(null);

const SEEN_KEY = "avendano:intro-seen";

/**
 * LaunchContext gates the cinematic opening: the EntrySphere shows first and
 * only when the visitor "enters" does the LiquidLoader timeline begin.
 *
 * Two things changed here, both because the opening was costing more than it
 * was worth.
 *
 * It is now skippable for real. The skip control used to call the same
 * `begin()` as tapping the sphere, so "skip" started a 1.6s sphere exit and
 * then the full 9.95s loader: about 11.2 seconds to reach the first line of
 * content, with no way out. `skipIntro` ends both at once.
 *
 * And it plays once per session rather than on every load. A visitor who
 * reloads, or follows an anchor link back, or returns from a project page,
 * has already seen it. Re-running a ten second title sequence at someone who
 * is trying to re-read your case study is not atmosphere, it is a toll.
 */
export function LaunchProvider({ children }: { children: ReactNode }) {
  const [launched, setLaunched] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Read after mount so the server and the first client paint agree.
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private mode or storage disabled: treat as a first visit.
      seen = false;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setLaunched(true);
      setIntroDone(true);
    }
    setReady(true);
  }, []);

  const markSeen = useCallback(() => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Nothing to do: the opening simply plays again next load.
    }
  }, []);

  const launch = useCallback(() => setLaunched(true), []);

  const skipIntro = useCallback(() => {
    setLaunched(true);
    setIntroDone(true);
    markSeen();
  }, [markSeen]);

  const finishIntro = useCallback(() => {
    setIntroDone(true);
    markSeen();
  }, [markSeen]);

  return (
    <LaunchContext.Provider
      value={{ launched, introDone, ready, launch, skipIntro, finishIntro }}
    >
      {children}
    </LaunchContext.Provider>
  );
}

export function useLaunch() {
  const ctx = useContext(LaunchContext);
  if (!ctx) throw new Error("useLaunch must be used within LaunchProvider");
  return ctx;
}
