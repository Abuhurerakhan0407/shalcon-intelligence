import { G } from "../data/content.js";

export default function ROITeaser({ onOpenROI }) {
  return (
    <section id="roi-teaser" style={{ padding: "0 clamp(20px,5vw,60px)", position: "relative", marginTop: -40, marginBottom: 40, zIndex: 3 }}>
      <div data-reveal style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="glass-card roi-sweep" style={{ padding: "22px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div className="mono" style={{ color: G.green, fontSize: 9, letterSpacing: ".16em", marginBottom: 8 }}>OPPORTUNITY-AT-RISK ESTIMATOR</div>
            <div className="syne" style={{ fontSize: "clamp(18px,2.6vw,26px)", fontWeight: 800, lineHeight: 1.15 }}>Use your own numbers. See the size of the workflow opportunity.</div>
            <div className="mono" style={{ color: G.muted, fontSize: 12, marginTop: 8, lineHeight: 1.7, maxWidth: 720 }}>
              Enter inquiry volume, delayed-response rate, likely conversion and average value. Presets are editable starting assumptions — not industry performance claims.
            </div>
          </div>
          <button className="btn-primary" style={{ fontSize: 13, padding: "14px 28px" }} onClick={onOpenROI}>Open estimator</button>
        </div>
      </div>
    </section>
  );
}
