import { G } from "../data/content.js";

export default function CTA({ onBookCall }) {
  return (
    <section id="book" style={{ padding: "clamp(80px,12vw,160px) clamp(20px,5vw,60px)", background: G.green, position: "relative", overflow: "hidden" }}>
      <div data-reveal style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div className="mono" style={{ color: "rgba(3,3,8,.45)", fontSize: 9, letterSpacing: ".22em", marginBottom: 18 }}>› START WITH ONE WORKFLOW</div>
        <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,60px)", fontWeight: 800, color: G.bg, lineHeight: 1.06, marginBottom: 22 }}>
          Find the automation worth building first.
        </h2>
        <p className="mono" style={{ color: "rgba(3,3,8,.62)", fontSize: 14, lineHeight: 1.9, marginBottom: 42 }}>
          Bring the workflow your team repeats every day. We’ll map the steps, integrations, handoffs and measurement plan before recommending a build.
        </p>
        <button className="btn-primary" onClick={onBookCall} style={{ fontSize: 14 }}>Book a free automation audit</button>
        <p className="mono" style={{ color: "rgba(3,3,8,.45)", fontSize: 11, marginTop: 16 }}>20-minute discovery call · Google Meet</p>
      </div>
    </section>
  );
}
