import { G } from "../data/content.js";
import Section from "./Section.jsx";

const PRINCIPLES = [
  {
    index: "01",
    title: "Minimum data",
    body: "Every production workflow starts with a field map. If the automation does not need a piece of personal or sensitive data, it should not collect it.",
    tag: "DATA MINIMIZATION",
  },
  {
    index: "02",
    title: "Human boundaries",
    body: "Medical judgment, policy decisions, hiring decisions and other sensitive edge cases are designed to escalate rather than forcing the model to guess.",
    tag: "ESCALATION",
  },
  {
    index: "03",
    title: "Fail visibly",
    body: "Bookings, CRM writes and lead capture should confirm only after the connected system acknowledges success. Silent false-success states are treated as defects.",
    tag: "SAFE FAILURE",
  },
  {
    index: "04",
    title: "Measure before claiming",
    body: "Shalcon baselines the real workflow, logs agreed operational events and publishes client-result claims only when evidence and permission support them.",
    tag: "EVIDENCE",
  },
];

export default function TrustSection() {
  return (
    <Section id="trust" eyebrow="TRUST BY DESIGN" background="#040410">
      <div style={{ maxWidth: 790, marginBottom: 44 }}>
        <h2 className="syne" style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>
          Automation without the<br />
          <span style={{ color: G.green }}>pretend-confidence layer.</span>
        </h2>
        <p className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.9 }}>
          Production systems need more than a clever response. Shalcon scopes the data, decision boundary, write-back, failure path and measurement before treating an automation as ready.
        </p>
      </div>

      <div className="grid-cards-2" style={{ gap: 14 }}>
        {PRINCIPLES.map((item) => (
          <article
            key={item.index}
            style={{
              background: G.card,
              border: `1px solid ${G.border}`,
              padding: "clamp(22px,3vw,30px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
              <span className="smono" style={{ color: G.green, fontSize: 14, fontWeight: 800 }}>{item.index}</span>
              <span className="mono" style={{ color: G.green, fontSize: 9, letterSpacing: ".14em", textAlign: "right" }}>{item.tag}</span>
            </div>
            <h3 className="syne" style={{ fontSize: 18, fontWeight: 800, margin: "0 0 10px" }}>{item.title}</h3>
            <p className="mono" style={{ color: G.muted, fontSize: 11, lineHeight: 1.85, margin: 0 }}>{item.body}</p>
            <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: `linear-gradient(90deg,transparent,${G.green}44,transparent)` }} />
          </article>
        ))}
      </div>

      <div style={{ marginTop: 20, border: `1px solid ${G.green}22`, background: "#05110C", padding: "16px 18px" }}>
        <p className="mono" style={{ color: G.green, fontSize: 10, lineHeight: 1.75, margin: 0 }}>
          SECURITY + PRIVACY REQUIREMENTS ARE SCOPED PER DEPLOYMENT · PUBLIC DEMOS USE SYNTHETIC DATA · NO GENERIC “100% COMPLIANT” CLAIM
        </p>
      </div>
    </Section>
  );
}
