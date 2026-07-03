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
 * No blur, no scale distortion. Reveals fire once (toggleActions play-once).
 * Caller must skip this entirely when prefers-reduced-motion is set.
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
        toggleActions: "play none none none",
      },
    })
  );

  // Ensure positions are correct once layout/fonts settle.
  ScrollTrigger.refresh();

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  };
}
