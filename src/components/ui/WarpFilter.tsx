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
        <filter id="liquidWarp" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.010 0.014"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.010 0.014; 0.014 0.009; 0.010 0.014"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
