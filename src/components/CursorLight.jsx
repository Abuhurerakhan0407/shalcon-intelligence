import { useEffect, useRef } from "react";
import gsap from "gsap";
import { G } from "../data/content.js";
import useReducedMotion from "../hooks/useReducedMotion.js";

/**
 * CursorLight — custom cursor (brief §5 / §7.3), Phase 5 upgrade.
 *
 * Dot follows the pointer immediately; the ring lags via gsap.quickTo (~130ms
 * feel). On hovering interactive elements the ring grows + brightens (soft glow
 * intensity shift, Phase 5 §4). Transform/opacity only → no layout impact.
 *
 * Desktop + non-reduced-motion only. On touch or reduced-motion the elements
 * stay parked off-screen (and `.hide-m` hides them on mobile anyway), so this
 * never affects performance or the Phase 4 3D FPS.
 */
export default function CursorLight() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const hoverCapable =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover)").matches;
    if (reduced || !hoverCapable) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power2.out" });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const INTERACTIVE = "a, button, .service-card, .stat-card, .niche-tab, .pill-btn, input";
    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 1.7, borderColor: `${G.green}aa`, duration: 0.25 });
        gsap.to(dot, { scale: 0.6, duration: 0.25 });
      }
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 1, borderColor: `${G.green}44`, duration: 0.25 });
        gsap.to(dot, { scale: 1, duration: 0.25 });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      gsap.killTweensOf([dot, ring]);
    };
  }, [reduced]);

  return (
    <>
      {/* Dot — transform origin at top-left; we translate via GSAP x/y */}
      <div
        ref={dotRef}
        className="custom-cursor hide-m"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 11,
          height: 11,
          marginLeft: -5.5,
          marginTop: -5.5,
          borderRadius: "50%",
          background: G.green,
          boxShadow: `0 0 10px ${G.green},0 0 22px ${G.green}55`,
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="custom-cursor hide-m"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 34,
          height: 34,
          marginLeft: -17,
          marginTop: -17,
          borderRadius: "50%",
          border: `1px solid ${G.green}44`,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
