import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * initScrollReveals — section reveal on scroll (brief §7.2, Phase 5 §2).
 *
 * Animates every `[data-reveal]` element with a light fade + small Y translate
 * (opacity 0→1, y 40→0, 0.8s, power2.out) once it enters the viewport. Uses
 * gsap.from() so the *natural* state is the visible one — if JS ever fails,
 * content stays visible (no permanent hiding, no layout shift).
 *
 * No blur, no scale distortion. Reveals fire once (`once: true` → the trigger
 * kill()s itself after firing, so it stops listening on scroll/resize and never
 * costs recalc for the rest of the session). Caller must skip this entirely when
 * prefers-reduced-motion is set.
 *
 * @returns {() => void} cleanup that kills all triggers/tweens it created.
 */
export function initScrollReveals() {
  const els = gsap.utils.toArray("[data-reveal]");

  const tweens = els.map((el) =>
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true, // self-kills after the one-time reveal (Phase 8A)
      },
    })
  );

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  };
}

/**
 * refreshAll — single coordinated ScrollTrigger.refresh() (Phase 8A).
 * Previously initScrollReveals() and initCountUp() each refreshed at boot (two
 * back-to-back full-document reflows). The caller now invokes this ONCE after
 * both have registered their triggers, so positions settle with a single reflow.
 */
export function refreshAll() {
  ScrollTrigger.refresh();
}
