import { G } from "../data/content.js";

/**
 * CTA — final call-to-action, green background (brief §4 #book).
 * Decorative orbit rings + float are animations → deferred to Phase 5.
 * Static structure + real Book-a-Call handler here.
 */
export default function CTA({ onBookCall }) {
  return (
    <section
      id="book"
      style={{ padding: "clamp(80px,12vw,160px) clamp(20px,5vw,60px)", background: G.green, position: "relative", overflow: "hidden" }}
    >
      <div data-reveal style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div className="mono" style={{ color: "rgba(3,3,8,.45)", fontSize: 9, letterSpacing: ".22em", marginBottom: 18 }}>
          › READY TO START
        </div>
        <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,60px)", fontWeight: 800, color: G.bg, lineHeight: 1.06, marginBottom: 22 }}>
          Your competitors are automating right now.
        </h2>
        <p className="mono" style={{ color: "rgba(3,3,8,.6)", fontSize: 14, lineHeight: 1.9, marginBottom: 48 }}>
          Every day you wait is customers lost, leads wasted, and revenue that won't come back.
        </p>
        <button className="btn-primary" onClick={onBookCall} style={{ fontSize: 14 }}>
          [ Book Your Free 30-Minute Audit ]
        </button>
        <p className="mono" style={{ color: "rgba(3,3,8,.4)", fontSize: 11, marginTop: 16 }}>
          No pitch. No pressure. Just clarity on what to automate first.
        </p>
      </div>
    </section>
  );
}
