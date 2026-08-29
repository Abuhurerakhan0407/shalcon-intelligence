import { useEffect, useRef, useState, useCallback } from "react";
import ROICalculator from "./ROICalculatorV2.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";

const EXIT_MS = 200;

export default function ROICalculatorModal({ onClose }) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef(null);
  const closeTimer = useRef(null);
  const reduced = useReducedMotion();

  const requestClose = useCallback(() => {
    setClosing(true);
    const delay = reduced ? 0 : EXIT_MS;
    closeTimer.current = setTimeout(() => onClose?.(), delay);
  }, [onClose, reduced]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [requestClose]);

  const onBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) requestClose();
  };

  return (
    <div
      className={`roi-modal-backdrop${closing ? " is-closing" : ""}`}
      onMouseDown={onBackdropMouseDown}
      role="dialog"
      aria-modal="true"
      aria-label="Shalcon opportunity-at-risk estimator"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`roi-modal-panel${closing ? " is-closing" : ""}`}
      >
        <button
          className="roi-modal-close"
          onClick={requestClose}
          aria-label="Close estimator"
        >
          ✕
        </button>

        <ROICalculator />
      </div>
    </div>
  );
}
