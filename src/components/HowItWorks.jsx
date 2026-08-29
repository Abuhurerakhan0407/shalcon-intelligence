import { G } from "../data/content.js";
import Section from "./Section.jsx";

const STEPS = [
  { n: "01", t: "AUDIT", d: "Map the current workflow, systems, handoffs, sensitive data and one measurable problem worth automating.", c: G.green },
  { n: "02", t: "PROTOTYPE + BUILD", d: "Design the future workflow with synthetic/test data first, then connect only the approved systems and escalation rules.", c: G.blue },
  { n: "03", t: "UAT + DEPLOY", d: "Run agreed test cases, fix failures, launch with a fallback path, then measure real operational events before expanding.", c: G.amber },
];

const TIMELINE = [
  ["01", "Workflow + scope"],
  ["02", "Prototype + approval"],
  ["03", "Integration + testing"],
  ["04", "UAT + controlled launch"],
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" eyebrow="THE PROCESS">
      <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 26 }}>
        Scope it. Test it.<br /><span style={{ color: G.green }}>Then put it into production.</span>
      </h2>
      <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, maxWidth: 760, marginBottom: 64 }}>
        Implementation time depends on integrations, client access, approvals and workflow complexity. The audit establishes the real plan before a timeline is committed.
      </p>

      <div style={{ position: "relative" }}>
        <div className="hide-m" style={{ position: "absolute", top: 36, left: "17%", right: "17%", height: 1, background: `linear-gradient(90deg,${G.green}44,${G.blue}44,${G.amber}44)` }} />
        <div className="grid-cards-3" style={{ gap: 32, position: "relative" }}>
          {STEPS.map((step) => (
            <div key={step.n} style={{ textAlign: "center" }}>
              <div style={{ width: 70, height: 70, margin: "0 auto 28px", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, border: `1px solid ${step.c}33`, borderRadius: "50%" }} />
                <div style={{ position: "absolute", inset: 8, border: `1px solid ${step.c}55`, borderRadius: "50%" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><span className="smono" style={{ color: step.c, fontSize: 15, fontWeight: 800 }}>{step.n}</span></div>
              </div>
              <h3 className="syne" style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, letterSpacing: ".08em" }}>{step.t}</h3>
              <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, maxWidth: 280, margin: "0 auto" }}>{step.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 72, background: G.card, border: `1px solid ${G.border}`, padding: "26px 28px" }}>
        <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".18em", marginBottom: 18 }}>DELIVERY GATES</div>
        <div className="grid-cards-4" style={{ gap: "20px 0" }}>
          {TIMELINE.map(([d, l], i) => (
            <div key={d} style={{ padding: "0 16px", borderLeft: i > 0 ? `1px solid ${G.border}` : "none" }}>
              <div className="smono" style={{ color: G.green, fontSize: 11, marginBottom: 5 }}>{d}</div>
              <div className="mono" style={{ color: G.muted, fontSize: 11 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
