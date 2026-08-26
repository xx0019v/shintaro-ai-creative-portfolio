"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import PremiumHover from "./PremiumHover";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

interface Props {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
}

type State = "idle" | "loading" | "playing" | "error";

/**
 * SignageVideo — one of the three films that run on the vending machine.
 *
 * These autoplayed on mount. Three of them, on one section, each a 2160x3840
 * H.264 at 13-14 Mbps: 223MB of 4K vertical video fetched the moment the
 * reader arrived, to be displayed in a frame no wider than 360 CSS px.
 * `preload="metadata"` did not save anyone, because `autoPlay` overrides it.
 *
 * So the film now waits to be asked for. `preload="none"` means nothing is
 * fetched until the visitor presses play, which turns the single most
 * expensive section of the site into a section that costs a still frame.
 *
 * The right fix upstream is to re-encode: at 720x1280 and ~1.1 Mbps with the
 * silent audio track dropped, each of these is about 6MB rather than 76MB.
 * That is an asset change rather than a presentation change, so it is not
 * done here.
 */
export default function SignageVideo({ src, poster, caption, className = "" }: Props) {
  const [state, setState] = useState<State>("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLang();

  const play = () => {
    const el = videoRef.current;
    if (!el) return;
    setState("loading");
    el.play().then(
      () => setState("playing"),
      () => setState("error")
    );
  };

  const label = caption
    ? `${tr("signage_play", lang)}: ${caption}`
    : tr("signage_play", lang);

  return (
    <PremiumHover cursor="PLAY" className="block">
      <figure className={`editorial-frame ${className}`}>
        <div className="relative aspect-[9/16] overflow-hidden bg-charcoal max-h-[640px] mx-auto">
          {state !== "error" ? (
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
              controls={state === "playing"}
              onError={() => setState("error")}
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] contrast-[1.02]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-center px-6">
              <div>
                <p className="font-serif text-silver-muted text-sm">
                  {tr("signage_unavailable_title", lang)}
                </p>
                <p className="mt-1 text-[10px] tracking-wider2 uppercase text-silver-muted/70">
                  {tr("signage_unavailable_body", lang)}
                </p>
              </div>
            </div>
          )}

          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* The control. Present until the film is actually running, so the
              still frame always reads as something you can start rather than
              as a picture that failed to load. */}
          {(state === "idle" || state === "loading") && (
            <button
              type="button"
              onClick={play}
              aria-label={label}
              disabled={state === "loading"}
              className="absolute inset-0 grid place-items-center group focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-silver-bright disabled:cursor-wait"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full border border-offwhite/25 bg-base/45 text-offwhite transition duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:border-offwhite/60 group-hover:bg-base/65 group-active:scale-[0.97]">
                {state === "loading" ? (
                  <span className="text-[9px] tracking-wider2 uppercase">
                    {tr("signage_loading", lang)}
                  </span>
                ) : (
                  <Play className="h-5 w-5 translate-x-[1px]" strokeWidth={1.25} aria-hidden />
                )}
              </span>
            </button>
          )}

          <div className="absolute top-3 left-3 text-[9px] tracking-wider2 uppercase text-silver-bright">
            {tr("signage_onsite", lang)}
          </div>
        </div>

        {caption && (
          <figcaption className="mt-3 px-2 flex items-center justify-between gap-4 text-[10px] tracking-wider2 uppercase text-silver-muted">
            <span>{caption}</span>
            <span className="text-silver/60 shrink-0">{tr("signage_meta", lang)}</span>
          </figcaption>
        )}
      </figure>
    </PremiumHover>
  );
}
