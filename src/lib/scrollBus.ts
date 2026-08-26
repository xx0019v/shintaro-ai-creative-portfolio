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
 * The loop only runs while something is subscribed AND the page is actually
 * being looked at. Three gates, because a scroll ticker that runs regardless
 * is a battery bug that never shows up in a screenshot:
 *
 *   - nothing subscribed  → no loop
 *   - document hidden     → no loop (a backgrounded tab scrolls for nobody)
 *   - reduced motion      → no loop, and subscribers are notified once so
 *                           they can paint their static state
 *
 * The reduced-motion gate follows the media query live, so toggling the OS
 * setting starts or stops the loop without a reload.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let raf = 0;
let lastY = Number.NaN;
let wired = false;
let reduceMq: MediaQueryList | null = null;

function notifyAll() {
  for (const fn of listeners) fn();
}

function loop() {
  const y = window.scrollY;
  if (y !== lastY) {
    lastY = y;
    notifyAll();
  }
  raf = requestAnimationFrame(loop);
}

/** Should the ticker be running right now? */
function shouldRun() {
  if (listeners.size === 0) return false;
  if (typeof document !== "undefined" && document.hidden) return false;
  if (reduceMq?.matches) return false;
  return true;
}

function start() {
  if (raf || !shouldRun()) return;
  lastY = Number.NaN; // force the first pass to notify
  raf = requestAnimationFrame(loop);
}

function stop() {
  if (!raf) return;
  cancelAnimationFrame(raf);
  raf = 0;
}

/** Re-evaluate the gates. Paints one static pass when the loop is not allowed. */
function sync() {
  if (shouldRun()) {
    start();
  } else {
    stop();
    // Losing the loop must not lose the picture: give subscribers one pass so
    // they can settle on the frame that matches the current scroll position.
    if (listeners.size > 0) {
      lastY = window.scrollY;
      notifyAll();
    }
  }
}

function wire() {
  if (wired || typeof window === "undefined") return;
  wired = true;
  reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.addEventListener("visibilitychange", sync);
  if (typeof reduceMq.addEventListener === "function") {
    reduceMq.addEventListener("change", sync);
  }
}

export function onScroll(fn: Listener): () => void {
  wire();
  listeners.add(fn);
  sync();
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) stop();
  };
}

/** True when motion should be suppressed. Lets subscribers pick a static path. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
