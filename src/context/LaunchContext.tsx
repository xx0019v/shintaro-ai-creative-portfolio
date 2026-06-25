"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface LaunchValue {
  launched: boolean;
  launch: () => void;
}

const LaunchContext = createContext<LaunchValue | null>(null);

/**
 * LaunchContext gates the cinematic opening: the EntrySphere shows first
 * and only when the user "enters" does the LiquidLoader timeline begin.
 * In-memory only (resets on reload) so the full Entry → Loader → Hero
 * sequence plays on every page load.
 */
export function LaunchProvider({ children }: { children: ReactNode }) {
  const [launched, setLaunched] = useState(false);
  const launch = useCallback(() => setLaunched(true), []);
  return (
    <LaunchContext.Provider value={{ launched, launch }}>
      {children}
    </LaunchContext.Provider>
  );
}

export function useLaunch() {
  const ctx = useContext(LaunchContext);
  if (!ctx) throw new Error("useLaunch must be used within LaunchProvider");
  return ctx;
}
