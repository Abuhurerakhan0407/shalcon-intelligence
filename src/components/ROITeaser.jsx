import { useEffect, useRef, useState } from "react";
import { G, ROI_DEFAULTS, roiLoss, formatINR } from "../data/content.js";
import useReducedMotion from "../hooks/useReducedMotion.js";

/**
 * ROITeaser — compact teaser block after the hero, before #industries
 * (brief §12.1). Second entry point into the ROI modal.
 *
 * PHASE 6:
 * - Live ticking loss-counter preview using a GENERIC industry-average default
 *   (brief §12.1) — NOT tied to the calculator's own state. Seeds from
 *   ROI_DEFAULTS via roiLoss(), then ticks upward slowly to read as an ongoing
 *   leak. Reduced-motion → static seed, no ticking. Width is reserved
 *   (tabular-nums + min-width) so the counter never shifts layout.
 * - Animated gradient-sweep top border (.roi-sweep, §12.4) signals "special".
 */
const SEED = roiLoss(ROI_DEFAULTS.inquiries, ROI_DEFAULTS.missPercent, ROI_DEFAULTS.avgTxn).daily;

export default function ROITeaser({ onOpenROI }) {
  const reduced = useReducedMotion();
  const [loss, setLoss] = useState(SEED);
  const lossRef = useRef(SEED);

  useEffect(() => {
    if (reduced) {
      setLoss(SEED);
      return;
    }
    // Gentle upward tick (~every 2.2s) — conveys a live, still-running leak.
    const id = setInterval(() => {
      lossRef.current += 200 + Math.floor(Math.random() * 700);
      setLoss(lossRef.current);
    }, 2200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      id="roi-teaser"
      style={{ padding: "0 clamp(20px,5vw,60px)", position: "relative", marginTop: -40, marginBottom: 40, zIndex: 3 }}
    >
      <div data-reveal style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="glass-card roi-sweep"
          style={{
            padding: "22px 26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div className="mono" style={{ color: "#FF6644", fontSize: 9, letterSpacing: ".16em", marginBottom: 8 }}>
              REVENUE LEAK DETECTOR
            </div>
            <div className="syne" style={{ fontSize: "clamp(18px,2.6vw,26px)", fontWeight: 800, lineHeight: 1.15 }}>
              See what you're losing daily.
            </div>
            <div className="mono" style={{ color: G.muted, fontSize: 12, marginTop: 8, lineHeight: 1.7 }}>
              Estimated daily leak (industry avg):{" "}
              <span
                className="smono"
                style={{
                  color: "#FF4444",
                  fontSize: 14,
                  fontWeight: 800,
                  fontVariantNumeric: "tabular-nums",
                  display: "inline-block",
                  minWidth: 78,
                }}
              >
                {formatINR(loss)}
              </span>
              <span style={{ color: G.muted }}> / day</span>
            </div>
          </div>
          <button className="btn-primary" style={{ fontSize: 13, padding: "14px 28px" }} onClick={onOpenROI}>
            Calculate Exact Number →
          </button>
        </div>
      </div>
    </section>
  );
}
