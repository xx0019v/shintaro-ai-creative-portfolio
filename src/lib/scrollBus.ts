/**
 * One scroll ticker for the whole page.
 *
 * Why not `window.addEventListener("scroll")`: Lenis drives the scroll
 * position itself and does not emit native scroll events, so a listener-based
 * engine silently never updates — the page scrolls, the canvas does not. And
 * relying on Lenis's own callback would couple every chapter to the smooth
 * scroll library, which is skipped under prefers-reduced-motion anyway.
 *
 * Instead: a single RAF reads window.scrollY and notifies subscribers only
 * when it actually changed. That is correct for Lenis, native scrolling,
 * anchor jumps, keyboard paging and momentum alike — and it is ONE loop for
 * the page rather than one listener per chapter.
 *
 * The loop only runs while something is subscribed.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let raf = 0;
let lastY = Number.NaN;

function loop() {
  const y = window.scrollY;
  if (y !== lastY) {
    lastY = y;
    for (const fn of listeners) fn();
  }
  raf = requestAnimationFrame(loop);
}

export function onScroll(fn: Listener): () => void {
  listeners.add(fn);
  if (!raf) {
    lastY = Number.NaN; // force the first pass to notify
    raf = requestAnimationFrame(loop);
  }
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0 && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}
