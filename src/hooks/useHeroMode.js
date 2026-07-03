import { useEffect, useState } from "react";

/**
 * useHeroMode — decides how the hero background renders (brief §9, Phase 4 §6).
 *
 * Returns one of:
 *   "fallback" — static gradient + CSS glow only (no WebGL canvas)
 *   "webgl"    — mount the lightweight THREE.js crystal scene
 *
 * Fallback is chosen when ANY of these is true:
 *   - WebGL is unavailable / context creation fails
 *   - user prefers reduced motion
 *   - device looks low-power (navigator.hardwareConcurrency < 4)
 *
 * IMPORTANT: initial value is always "fallback" so first paint never waits on
 * a capability probe or the 3D chunk. We upgrade to "webgl" after mount only
 * if the device qualifies — keeping initial page load unblocked.
 */
function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!(window.WebGLRenderingContext && gl);
  } catch {
    return false;
  }
}

export default function useHeroMode() {
  const [mode, setMode] = useState("fallback");

  useEffect(() => {
    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lowPower =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency < 4;

    if (reducedMotion || lowPower || !webglAvailable()) {
      setMode("fallback");
      return;
    }
    setMode("webgl");
  }, []);

  return mode;
}
