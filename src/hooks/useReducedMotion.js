import { useEffect, useState } from "react";

/**
 * useReducedMotion — tracks the user's `prefers-reduced-motion` setting and
 * updates live if it changes. Used to gate every Phase 5 animation so motion
 * can be disabled gracefully (brief §9 / Phase 5 performance rules).
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}
