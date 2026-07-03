import { useEffect, useRef, useState, useCallback } from "react";
import ROICalculator from "./ROICalculator.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";

/**
 * ROICalculatorModal — full-screen glass overlay wrapper for the ported
 * ROICalculator (brief §12.2). CSS-only motion (no framer-motion) to stay
 * consistent with the GSAP/CSS architecture and keep the runtime bundle lean.
 *
 * Enter:  backdrop opacity fade + blur; panel opacity 0→1, translateY(24)→0,
 *         scale(.96)→1, ~300ms cubic-bezier ease-out.
 * Exit:   symmetrical but faster (~200ms), played before the parent unmounts.
 * Reduced-motion: no transforms; minimal instant fade (handled in index.css).
 *
 * Reset on close (§12.3): the parent unmounts this component on close, which
 * unmounts ROICalculator and drops all its phase/form state — reopening starts
 * fresh at the "calc" phase. No need to reach into calculator internals.
 *
 * Lazy-loaded from App via React.lazy + Suspense (§12.5) so none of this code
 * (nor the calculator) ships until the ROI button is first clicked.
 */
const EXIT_MS = 200;

export default function ROICalculatorModal({ onClose }) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef(null);
  const closeTimer = useRef(null);
  const reduced = useReducedMotion();

  // Play the exit animation, then hand control back to the parent to unmount.
  const requestClose = useCallback(() => {
    setClosing(true);
    const delay = reduced ? 0 : EXIT_MS;
    closeTimer.current = setTimeout(() => onClose?.(), delay);
  }, [onClose, reduced]);

  // Escape closes; body scroll-lock while open (scroll position preserved
  // because we lock via overflow:hidden, not position:fixed — §12.5).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog for keyboard users.
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [requestClose]);

  // Click on the backdrop (outside the panel) closes; clicks inside do not.
  const onBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) requestClose();
  };

  return (
    <div
      className={`roi-modal-backdrop${closing ? " is-closing" : ""}`}
      onMouseDown={onBackdropMouseDown}
      role="dialog"
      aria-modal="true"
      aria-label="Revenue Leak Detector — ROI calculator"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`roi-modal-panel${closing ? " is-closing" : ""}`}
      >
        {/* Close button (top-right, §12.2) */}
        <button
          className="roi-modal-close"
          onClick={requestClose}
          aria-label="Close ROI calculator"
        >
          ✕
        </button>

        <ROICalculator />
      </div>
    </div>
  );
}
