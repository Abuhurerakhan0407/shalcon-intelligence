import { useEffect, useState } from "react";

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!(window.WebGLRenderingContext && gl);
  } catch {
    return false;
  }
}

/**
 * Decorative WebGL is an enhancement, never a requirement.
 *
 * The CSS hero is retained when motion, data, memory, CPU or viewport signals
 * suggest that loading a ~3D engine chunk would be a poor trade-off. This keeps
 * the sales message and conversion paths available even on constrained devices.
 */
export default function useHeroMode() {
  const [mode, setMode] = useState("fallback");

  useEffect(() => {
    const match = (query) =>
      typeof window.matchMedia === "function" && window.matchMedia(query).matches;

    const reducedMotion = match("(prefers-reduced-motion: reduce)");
    const smallScreen = match("(max-width: 767px)");
    const lowPower =
      typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency < 4;
    const lowMemory =
      typeof navigator.deviceMemory === "number" && navigator.deviceMemory < 4;
    const saveData = navigator.connection?.saveData === true;

    if (
      reducedMotion ||
      smallScreen ||
      lowPower ||
      lowMemory ||
      saveData ||
      !webglAvailable()
    ) {
      setMode("fallback");
      return;
    }

    setMode("webgl");
  }, []);

  return mode;
}
