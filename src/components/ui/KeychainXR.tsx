"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Support = "checking" | "ar" | "viewer" | "none";

/**
 * KeychainXR — place a real keychain on a real surface.
 *
 * There is no GLB in this project and there never was; /models/avatar.glb has
 * always 404'd. That is not a blocker here, because the product genuinely IS
 * simple geometry: a flat acrylic plate with a rounded outline, a hole, and a
 * split ring through it. Modelling that in code is not a stand-in for the real
 * object — it is an accurate description of it, with the actual printed
 * artwork as the texture. An imported mesh would add megabytes to say the
 * same thing less truthfully.
 *
 * Three tiers, resolved at runtime and never assumed:
 *   ar      immersive-ar with hit-testing — tap a surface, the keychain lands
 *           there at its true size (58mm), and stays put as you walk around.
 *   viewer  no XR device: the same object, draggable, in an inline canvas.
 *   none    no WebGL at all, or reduced-motion — the section's photographs
 *           already carry the work, so this renders nothing and says nothing.
 *
 * three is already a dependency and is imported dynamically, so a visitor who
 * never opens this pays nothing for it.
 */
export default function KeychainXR({
  texture,
  label,
  arLabel,
}: {
  texture: string;
  label: string;
  arLabel: string;
}) {
  const [support, setSupport] = useState<Support>("checking");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (typeof window === "undefined") return;

      // Reduced motion opts out of the whole feature, not just its animation:
      // an object you rotate in your hands is motion by definition.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setSupport("none");
        return;
      }

      // WebGL is the floor for both tiers.
      const probe = document.createElement("canvas");
      const gl =
        probe.getContext("webgl2") ||
        probe.getContext("webgl") ||
        probe.getContext("experimental-webgl");
      if (!gl) {
        setSupport("none");
        return;
      }

      const xr = (navigator as Navigator & { xr?: XRSystem }).xr;
      if (xr?.isSessionSupported) {
        try {
          const ok = await xr.isSessionSupported("immersive-ar");
          if (!cancelled) setSupport(ok ? "ar" : "viewer");
          return;
        } catch {
          // isSessionSupported can reject outright in embedded webviews.
        }
      }
      if (!cancelled) setSupport("viewer");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => cleanupRef.current?.(), []);

  const launch = useCallback(async () => {
    setError(null);
    // Reveal the host BEFORE mounting, and wait for the browser to lay it out.
    // The renderer sizes itself from host.clientWidth, and a display:none host
    // reports 0 — which produced a real 0x0 canvas: a live WebGL context
    // drawing nothing, with no error to show for it.
    setOpen(true);
    await new Promise((r) => requestAnimationFrame(() => r(null)));

    try {
      const mod = await import("@/lib/keychainScene");
      const stop = await mod.mount({
        host: hostRef.current,
        texture,
        mode: support === "ar" ? "ar" : "viewer",
      });
      cleanupRef.current = stop;
    } catch (e) {
      // A refused AR permission or a lost context must not leave a dead panel.
      setError(e instanceof Error ? e.message : String(e));
      setOpen(false);
    }
  }, [support, texture]);

  const close = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    setOpen(false);
  }, []);

  if (support === "checking" || support === "none") return null;

  return (
    <div className="mt-8">
      {!open && (
        <button
          onClick={launch}
          data-prox
          className="group inline-flex min-h-[44px] items-center gap-3 px-6 hairline-silver text-[11px] tracking-wider2 uppercase text-offwhite transition-colors duration-500 hover:bg-offwhite/[0.06]"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-silver-bright transition-transform duration-500 group-hover:scale-125"
          />
          {support === "ar" ? arLabel : label}
        </button>
      )}

      {error && (
        <p role="alert" className="mt-3 text-[11px] leading-relaxed text-silver-muted">
          {error}
        </p>
      )}

      <div
        ref={hostRef}
        className={open ? "relative mt-6 w-full overflow-hidden hairline" : "hidden"}
        // A solid ground, not the page showing through. The renderer keeps
        // alpha so AR can composite over the camera feed, which means the
        // inline viewer would otherwise be a transparent hole with the header
        // legible straight through the object.
        style={{
          aspectRatio: "4 / 3",
          background:
            "radial-gradient(120% 90% at 50% 30%, #16181b 0%, #0a0b0c 60%, #050505 100%)",
        }}
      />

      {open && (
        <button
          onClick={close}
          className="mt-3 min-h-[44px] text-[10px] tracking-wider2 uppercase text-silver-muted hover:text-offwhite"
        >
          Close
        </button>
      )}
    </div>
  );
}
