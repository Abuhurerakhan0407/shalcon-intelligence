import { useEffect, useRef, useState, useCallback } from "react";
import ROICalculator from "./ROICalculatorV2.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";

const EXIT_MS = 200;
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function ROICalculatorModal({ onClose }) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef(null);
  const closeTimer = useRef(null);
  const previousFocusRef = useRef(null);
  const reduced = useReducedMotion();

  const requestClose = useCallback(() => {
    setClosing(true);
    const delay = reduced ? 0 : EXIT_MS;
    closeTimer.current = setTimeout(() => onClose?.(), delay);
  }, [onClose, reduced]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(panel.querySelectorAll(FOCUSABLE)).filter((element) => {
        const style = window.getComputedStyle(element);
        return style.visibility !== "hidden" && style.display !== "none";
      });

      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      const previousFocus = previousFocusRef.current;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [requestClose]);

  const onBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) requestClose();
  };

  return (
    <div
      className={`roi-modal-backdrop${closing ? " is-closing" : ""}`}
      onMouseDown={onBackdropMouseDown}
      role="dialog"
      aria-modal="true"
      aria-label="Shalcon opportunity-at-risk estimator"
    >
      <div ref={panelRef} tabIndex={-1} className={`roi-modal-panel${closing ? " is-closing" : ""}`}>
        <button type="button" className="roi-modal-close" onClick={requestClose} aria-label="Close estimator">✕</button>
        <ROICalculator />
      </div>
    </div>
  );
}
