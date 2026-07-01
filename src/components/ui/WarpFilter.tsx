/**
 * WarpFilter — a single hidden SVG displacement filter, mounted once.
 *
 * `filter: url(#liquidWarp)` is applied to a work's image only while the
 * cursor is over it (see .warp-target in globals). A slowly drifting fractal
 * noise feeds a feDisplacementMap so the surface reads as molten chrome
 * flexing under your gaze — the liquid-metal language, extended to the works
 * — without a WebGL context. Modest scale, desktop-hover only, disabled for
 * reduced-motion. No JS, no rAF: the drift is SMIL on the compositor.
 */
export default function WarpFilter() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* in-view: a clearly-visible living ripple */}
        <filter id="liquidWarp" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="9s"
              values="0.009 0.013; 0.016 0.008; 0.009 0.013"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/* hover: deepen it — the surface flexes harder as the cursor arrives */}
        <filter id="liquidWarpStrong" x="-14%" y="-14%" width="128%" height="128%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.010 0.015"
            numOctaves="2"
            seed="7"
            result="noise2"
          >
            <animate
              attributeName="baseFrequency"
              dur="6s"
              values="0.010 0.015; 0.020 0.010; 0.010 0.015"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise2"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
