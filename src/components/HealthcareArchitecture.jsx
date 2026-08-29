import { G } from "../data/content.js";
import Section from "./Section.jsx";

const LAYERS = [
  {
    label: "ENTRY",
    title: "Inquiry channels",
    items: ["Web", "WhatsApp-ready", "Voice-ready"],
    note: "Connect only the channels approved for the production scope.",
  },
  {
    label: "ORCHESTRATE",
    title: "Workflow logic",
    items: ["Intake", "Qualification", "Routing", "Follow-up"],
    note: "Rules and approved content sit between the channel and business systems.",
  },
  {
    label: "SYSTEMS",
    title: "Operational write-back",
    items: ["Calendar", "CRM / database", "Alerts"],
    note: "Production integrations are confirmed during the audit; the public demo is not connected to client systems.",
  },
  {
    label: "CONTROL",
    title: "Human + evidence layer",
    items: ["Escalation", "Failure events", "Audit trail"],
    note: "Sensitive, unusual and low-confidence cases have an explicit human path.",
  },
];

const TESTS = [
  ["INTAKE", "Required fields are collected before routing."],
  ["ROUTING", "Known intents reach the configured destination."],
  ["ESCALATION", "Sensitive / low-confidence cases move to a human path."],
  ["FAILURE", "A broken integration produces a visible failure/fallback instead of fake success."],
];

export default function HealthcareArchitecture() {
  return (
    <Section id="architecture" eyebrow="HOW THE FLAGSHIP SYSTEM IS PROVED" background="#03030B">
      <div style={{ maxWidth: 880, marginBottom: 42 }}>
        <h2 className="syne" style={{ fontSize: "clamp(28px,4.6vw,52px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 18 }}>
          Architecture first.<br /><span style={{ color: G.green }}>Claims after evidence.</span>
        </h2>
        <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, maxWidth: 760 }}>
          The public healthcare experience is a synthetic demonstration of the operating pattern. A real clinic deployment replaces demo inputs with approved channels, rules and integrations, then passes written UAT before any outcome is treated as evidence.
        </p>
      </div>

      <div className="architecture-flow" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10, marginBottom: 18 }}>
        {LAYERS.map((layer, index) => (
          <div key={layer.label} style={{ position: "relative", minWidth: 0, background: G.card, border: `1px solid ${G.border}`, padding: "20px 18px" }}>
            <div className="mono" style={{ color: G.green, fontSize: 9, letterSpacing: ".15em", marginBottom: 10 }}>
              {String(index + 1).padStart(2, "0")} · {layer.label}
            </div>
            <div className="syne" style={{ fontSize: 15, fontWeight: 800, marginBottom: 13 }}>{layer.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {layer.items.map((item) => (
                <span key={item} className="mono" style={{ color: G.white, fontSize: 9, border: `1px solid ${G.green}2B`, background: `${G.green}08`, padding: "6px 8px" }}>{item}</span>
              ))}
            </div>
            <p className="mono" style={{ color: G.muted, fontSize: 9, lineHeight: 1.65, margin: 0 }}>{layer.note}</p>
            {index < LAYERS.length - 1 && (
              <span className="architecture-arrow" aria-hidden style={{ position: "absolute", right: -10, top: "50%", zIndex: 2, color: G.green, transform: "translate(50%,-50%)", fontFamily: "monospace", fontSize: 16 }}>→</span>
            )}
          </div>
        ))}
      </div>

      <div style={{ border: `1px solid ${G.green}2B`, background: "#05100B", padding: "18px" }}>
        <div className="mono" style={{ color: G.green, fontSize: 9, letterSpacing: ".15em", marginBottom: 14 }}>MINIMUM PRODUCTION UAT EVIDENCE</div>
        <div className="grid-cards-2" style={{ gap: 8 }}>
          {TESTS.map(([label, text]) => (
            <div key={label} style={{ border: `1px solid ${G.border}`, background: "#06060E", padding: "13px 14px" }}>
              <div className="mono" style={{ color: G.green, fontSize: 9, marginBottom: 5 }}>{label}</div>
              <div className="mono" style={{ color: G.muted, fontSize: 9, lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
        <p className="mono" style={{ color: G.muted, fontSize: 9, lineHeight: 1.65, margin: "14px 0 0" }}>
          Client-result metrics are published only after a real baseline, matching post-launch measurement and permission to publish.
        </p>
      </div>
    </Section>
  );
}
