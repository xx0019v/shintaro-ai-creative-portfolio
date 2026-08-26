"use client";

import { useLang } from "@/context/LanguageContext";
import { useMagneticText } from "@/components/ui/MagneticText";

const EASE = "cubic-bezier(0.19, 1, 0.22, 1)";

/** A single language button whose label pulls gently toward the cursor. */
function LangButton({
  code,
  label,
  active,
  onClick,
}: {
  code: "jp" | "en";
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const { hostRef, innerRef } = useMagneticText(3, 24);
  return (
    <button
      ref={hostRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      aria-pressed={active}
      aria-label={code === "jp" ? "日本語に切り替え" : "Switch to English"}
      title={code === "jp" ? "日本語" : "English"}
      className={`relative z-10 inline-flex min-h-[44px] items-center px-4 transition-colors duration-300 ${
        active ? "text-base" : "text-silver hover:text-offwhite"
      }`}
    >
      <span
        ref={innerRef as React.RefObject<HTMLSpanElement>}
        className="inline-block"
        style={{ transition: `transform 500ms ${EASE}`, willChange: "transform" }}
      >
        {label}
      </span>
    </button>
  );
}

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language toggle"
      data-prox
      className={`relative inline-flex items-center text-[10px] tracking-wider2 uppercase hairline-silver overflow-hidden ${className}`}
    >
      {/* sliding chrome highlight — moves horizontally on switch */}
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 bg-silver-bright"
        style={{
          width: "calc(50% - 0.5px)",
          transform: lang === "jp" ? "translateX(0%)" : "translateX(calc(100% + 1px))",
          transition: `transform 620ms ${EASE}`,
          willChange: "transform",
        }}
      />
      <LangButton code="jp" label="JP" active={lang === "jp"} onClick={() => setLang("jp")} />
      <span className="relative z-10 h-3 w-px bg-silver/30" aria-hidden />
      <LangButton code="en" label="EN" active={lang === "en"} onClick={() => setLang("en")} />
    </div>
  );
}
