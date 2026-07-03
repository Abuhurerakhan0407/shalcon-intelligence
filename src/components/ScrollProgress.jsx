import { useEffect, useRef } from "react";

/**
 * ScrollProgress — sticky reading-progress indicator (Phase 7 · Bug Group 13).
 *
 * A 3px brand-green bar fixed to the very top of the viewport that grows
 * left→right as the page scrolls:
 *
 *   progress = scrollY / (scrollHeight - innerHeight)
 *
 * applied as `transform: scaleX(progress)` with `transform-origin: left`.
 *
 * Perf: a single passive scroll/resize listener, coalesced through
 * requestAnimationFrame so we never write layout more than once per frame and
 * never trigger a React re-render (the DOM node is mutated via ref). Being
 * fixed + transform-only, it causes zero layout shift.
 *
 * Reduced-motion: the bar is a direct scroll position readout (not an
 * autonomous animation), so it stays functional; there is no transition to
 * freeze, and the global reduced-motion rule already neutralises any.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const update = () => {
      rafId = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    update(); // set initial state (also correct if page restores non-zero)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1100, // above the fixed nav (z 1000)
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          background: "#00FF94",
          boxShadow: "0 0 8px #00FF94, 0 0 4px #00FF94",
          willChange: "transform",
        }}
      />
    </div>
  );
}
