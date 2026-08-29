import { G } from "../data/content.js";
import Hero3D from "./Hero3D.jsx";

/**
 * Market-ready hero.
 *
 * Important trust rule: this surface must never imply live client activity,
 * uptime, lead volume, satisfaction, or production results unless those values
 * come from a verified source. The right-side panel therefore describes demo
 * capabilities instead of simulated telemetry.
 */
export default function HeroSection({ onBookCall }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const capabilities = [
    ["Workflow", "Multi-step automation"],
    ["Handoff", "Human escalation ready"],
    ["Channels", "Web · WhatsApp-ready"],
    ["Reporting", "Event-based tracking"],
  ];

  return (
    <section
      id="hero"
      style={{ position: "relative", minHeight: "100vh", paddingTop: 64, overflow: "hidden" }}
    >
      <Hero3D />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(3,3,8,0.94) 0%, rgba(3,3,8,0.82) 34%, rgba(3,3,8,0.45) 56%, rgba(3,3,8,0.12) 74%, transparent 88%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "90px clamp(20px,5vw,60px) 140px",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 64px)",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: G.card,
            border: `1px solid ${G.border}`,
            padding: "7px 16px",
            marginBottom: 44,
            width: "fit-content",
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            {["#00FF94", "#00FF94AA", "#00FF9455"].map((c, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".12em" }}>
            AI OPERATIONS SYSTEMS · BUILT FOR REAL WORKFLOWS
          </span>
        </div>

        <h1 className="syne" style={{ fontSize: "clamp(40px,8.5vw,100px)", fontWeight: 800, lineHeight: 0.98, marginBottom: 8, letterSpacing: "-.02em" }}>
          Your business.
        </h1>
        <h1 className="syne" style={{ fontSize: "clamp(40px,8.5vw,100px)", fontWeight: 800, lineHeight: 0.98, marginBottom: 40, letterSpacing: "-.02em" }}>
          <span style={{ color: G.green, textShadow: `0 0 50px ${G.green}33` }}>Running.</span>
        </h1>
        <h2 className="syne" style={{ fontSize: "clamp(22px,4.5vw,54px)", fontWeight: 600, color: G.muted, marginBottom: 32, letterSpacing: "-.01em", lineHeight: 1.15 }}>
          Less repetitive work. Faster response. Cleaner operations.
        </h2>

        <p className="mono" style={{ color: G.muted, fontSize: 13, marginBottom: 52, lineHeight: 2, maxWidth: 720 }}>
          <span style={{ color: G.green }}>›</span>
          {"  "}We design, build and connect AI workflows across messaging, voice, CRM, documents and reporting — with human handoff where it matters.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button className="btn-ghost" onClick={onBookCall}>
            <span>[ Book Free Automation Audit → ]</span>
          </button>
          <button className="btn-text" onClick={() => scrollTo("demo")}>
            Explore Demo ↓
          </button>
        </div>
      </div>

      <div className="hide-m" style={{ position: "absolute", bottom: 64, right: 60, width: 300, zIndex: 2 }}>
        <div style={{ background: G.card, border: `1px solid ${G.border}`, padding: "20px 22px", marginBottom: 10, boxShadow: "0 0 50px rgba(0,255,148,.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${G.border}` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.green, boxShadow: `0 0 8px ${G.green}` }} />
            <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".1em" }}>
              DEMO CAPABILITIES
            </span>
          </div>
          {capabilities.map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 10 }}>
              <span className="mono" style={{ color: G.muted, fontSize: 10 }}>{label}</span>
              <span className="smono" style={{ color: G.white, fontSize: 10, textAlign: "right" }}>{value}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#06060F", border: `1px solid ${G.border}`, padding: "12px 16px" }}>
          <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".08em", marginBottom: 4 }}>TRUST NOTE</div>
          <div className="mono" style={{ color: G.green, fontSize: 10, lineHeight: 1.6 }}>
            ● Demo environment · synthetic data · no fabricated live metrics
          </div>
        </div>
      </div>
    </section>
  );
}
