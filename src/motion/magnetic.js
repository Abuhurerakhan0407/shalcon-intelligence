import gsap from "gsap";

/**
 * initMagnetic — lightweight magnetic pull on interactive elements
 * (brief §7.4, Phase 5 §4). On pointer devices only.
 *
 * Within a small radius around each target, the element eases toward the
 * cursor, capped at ±8px (brief §7.4), springing back on leave. Uses
 * gsap.quickTo (transform-only) so there is NO layout shift and no per-element
 * rAF churn. Skip entirely under prefers-reduced-motion / touch.
 *
 * @returns {() => void} cleanup removing all listeners and resetting transforms.
 */
// Buttons + niche tabs + nav CTA (brief §7.4). Cards are intentionally excluded:
// .service-card/.stat-card own a CSS :hover transform (translateY lift), and a
// GSAP x/y translate would override it — cards keep their hover-lift + the
// cursor-ring glow instead, which is the intended card feedback.
const SELECTOR = ".btn-primary, .btn-ghost, .roi-nav-pill, .niche-tab";
const MAX_PULL = 8; // px
const RADIUS_PAD = 40; // px beyond the element bounds where pull begins

export function initMagnetic(root = document) {
  // Pointer/hover capability guard — no magnetic on touch.
  if (
    typeof window.matchMedia === "function" &&
    !window.matchMedia("(hover: hover)").matches
  ) {
    return () => {};
  }

  const els = Array.from(root.querySelectorAll(SELECTOR));
  const cleanups = [];

  els.forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(relX, relY);
      const radius = Math.max(r.width, r.height) / 2 + RADIUS_PAD;
      if (dist > radius) {
        xTo(0);
        yTo(0);
        return;
      }
      const strength = 1 - dist / radius;
      // clamp pull to ±MAX_PULL
      xTo(Math.max(-MAX_PULL, Math.min(MAX_PULL, relX * strength)));
      yTo(Math.max(-MAX_PULL, Math.min(MAX_PULL, relY * strength)));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
