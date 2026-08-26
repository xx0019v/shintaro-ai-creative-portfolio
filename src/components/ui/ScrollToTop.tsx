"use client";

import { useEffect } from "react";

/**
 * Disable browser scroll restoration and force top-of-page on every load.
 * Used in concert with the LiquidLoader so users always start at Hero.
 */
export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Guard against late layout shifts (web fonts, image decoding, etc.)
    const t1 = setTimeout(() => window.scrollTo(0, 0), 60);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return null;
}
