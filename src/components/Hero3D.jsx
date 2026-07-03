import { useEffect, useRef } from "react";
import useHeroMode from "../hooks/useHeroMode.js";

/**
 * Hero3D — hero background layer (Phase 4).
 *
 * Renders in two layers:
 *   1. A static gradient + blurred emerald glow (CSS only). This is ALWAYS
 *      present — it is the fallback UI and also the placeholder shown before
 *      the WebGL chunk loads. First paint never waits on THREE.js.
 *   2. If useHeroMode() returns "webgl", the crystal scene is dynamically
 *      imported (three lives in a separate lazy chunk) after requestIdleCallback
 *      and mounted on top of the gradient. On any import/init failure we simply
 *      keep the gradient — graceful degradation, never a crash.
 *
 * Nothing here blocks initial page load: the component paints the gradient
 * synchronously and upgrades asynchronously only when the device qualifies.
 */
export default function Hero3D() {
  const mode = useHeroMode();
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (mode !== "webgl" || !mountRef.current) return;

    let cancelled = false;
    let idleId = null;

    const boot = () => {
      if (cancelled || !mountRef.current) return;
      import("../three/crystalScene.js")
        .then(({ createCrystalScene }) => {
          if (cancelled || !mountRef.current) return;
          sceneRef.current = createCrystalScene(mountRef.current, {
            shardCount: 9,
          });
        })
        .catch((err) => {
          // Leave the static gradient in place — never crash the hero.
          console.warn("[Hero3D] WebGL scene failed, using fallback:", err);
        });
    };

    // Defer to idle so the 3D chunk never blocks first paint / interactivity.
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(boot, { timeout: 1500 });
    } else {
      idleId = window.setTimeout(boot, 300);
    }

    return () => {
      cancelled = true;
      if (idleId != null) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, [mode]);

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Layer 1: static gradient + blurred emerald glow (fallback + placeholder) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 55% at 68% 42%, rgba(0,255,148,0.10), transparent 70%), radial-gradient(45% 45% at 18% 82%, rgba(0,207,255,0.05), transparent 70%), #030308",
        }}
      />
      {/* Soft animated glow orb — CSS only, present in both modes */}
      <div
        className="hero-glow-orb"
        style={{
          position: "absolute",
          top: "34%",
          left: "62%",
          width: "42vmin",
          height: "42vmin",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,148,0.22), rgba(0,255,148,0.05) 45%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Layer 2: WebGL canvas mounts here (only in webgl mode) */}
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
