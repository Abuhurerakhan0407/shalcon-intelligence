import { G } from "../data/content.js";
import Hero3D from "./Hero3D.jsx";

export default function HeroSection({ onBookCall }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const capabilities = [
    ["Capture", "Web · WhatsApp · Voice"],
    ["Qualify", "Intent + routing logic"],
    ["Follow up", "Automated sequences"],
    ["Handoff", "CRM + human escalation"],
  ];

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", paddingTop: 64, overflow: "hidden" }}>
      <Hero3D />

      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(90deg, rgba(3,3,8,.96) 0%, rgba(3,3,8,.86) 38%, rgba(3,3,8,.48) 60%, rgba(3,3,8,.1) 80%, transparent 92%)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "90px clamp(20px,5vw,60px) 140px", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 64px)", justifyContent: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: G.card, border: `1px solid ${G.border}`, padding: "7px 16px", marginBottom: 38, width: "fit-content" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: G.green, boxShadow: `0 0 10px ${G.green}` }} />
          <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".12em" }}>AI FRONT DESK + LEAD OPERATIONS · HEALTHCARE FIRST</span>
        </div>

        <h1 className="syne" style={{ fontSize: "clamp(42px,7.8vw,92px)", fontWeight: 800, lineHeight: .98, marginBottom: 28, letterSpacing: "-.03em", maxWidth: 920 }}>
          Turn inquiries into<br /><span style={{ color: G.green, textShadow: `0 0 50px ${G.green}33` }}>booked outcomes.</span>
        </h1>

        <h2 className="syne" style={{ fontSize: "clamp(19px,3vw,34px)", fontWeight: 600, color: G.muted, marginBottom: 28, letterSpacing: "-.01em", lineHeight: 1.2, maxWidth: 820 }}>
          One connected AI system for intake, qualification, follow-up, booking, CRM updates and human handoff.
        </h2>

        <p className="mono" style={{ color: G.muted, fontSize: 13, marginBottom: 44, lineHeight: 1.9, maxWidth: 760 }}>
          <span style={{ color: G.green }}>›</span>{"  "}Shalcon designs and deploys workflow systems around the tools your team already uses. Healthcare is our lead implementation track; EdTech, Insurance, E-commerce and HR workflows are also supported.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={onBookCall}>Get a free automation audit</button>
          <button className="btn-ghost" onClick={() => scrollTo("demo")}><span>Explore the prototype</span></button>
        </div>
      </div>

      <div className="hide-m" style={{ position: "absolute", bottom: 64, right: 60, width: 310, zIndex: 2 }}>
        <div style={{ background: G.card, border: `1px solid ${G.border}`, padding: "20px 22px", marginBottom: 10, boxShadow: "0 0 50px rgba(0,255,148,.04)" }}>
          <div style={{ color: G.green, fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: ".14em", paddingBottom: 14, marginBottom: 14, borderBottom: `1px solid ${G.border}` }}>FLAGSHIP WORKFLOW</div>
          {capabilities.map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 10 }}>
              <span className="mono" style={{ color: G.muted, fontSize: 10 }}>{label}</span>
              <span className="smono" style={{ color: G.white, fontSize: 10, textAlign: "right" }}>{value}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#06060F", border: `1px solid ${G.border}`, padding: "12px 16px" }}>
          <div className="mono" style={{ color: G.green, fontSize: 10, lineHeight: 1.6 }}>Prototype shown with synthetic data. Production scope is verified during audit.</div>
        </div>
      </div>
    </section>
  );
}
