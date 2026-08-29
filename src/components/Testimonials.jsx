import { G } from "../data/content.js";
import Section from "./Section.jsx";

const VALIDATION = [
  {
    label: "Baseline first",
    value: "BEFORE",
    text: "Document response time, manual steps, lead leakage and follow-up gaps before deployment.",
    color: G.green,
  },
  {
    label: "Track events",
    value: "LIVE",
    text: "Measure messages, bookings, handoffs, completed follow-ups and workflow exceptions after launch.",
    color: G.blue,
  },
  {
    label: "Publish proof",
    value: "AFTER",
    text: "Only publish ROI, conversion or time-saved claims when client-approved evidence supports them.",
    color: G.amber,
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="PROOF STANDARD">
      <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 28 }}>
        No invented wins.<br />
        <span style={{ color: G.green }}>We measure before we claim.</span>
      </h2>

      <p className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.9, maxWidth: 760, marginBottom: 46 }}>
        Shalcon is building its public case-study library from verified production deployments. Until client-approved evidence exists, demos stay labeled as demos and illustrative numbers stay out of marketing claims.
      </p>

      <div className="grid-cards-3" style={{ gap: 14, marginBottom: 32 }}>
        {VALIDATION.map((item) => (
          <div key={item.label} style={{ background: G.card, border: `1px solid ${G.border}`, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
            <div className="smono" style={{ color: item.color, fontSize: 20, fontWeight: 800, marginBottom: 14 }}>
              {item.value}
            </div>
            <div className="syne" style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{item.label}</div>
            <div className="mono" style={{ color: G.muted, fontSize: 11, lineHeight: 1.8 }}>{item.text}</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${item.color}44,transparent)` }} />
          </div>
        ))}
      </div>

      <div style={{ background: "#05110C", border: `1px solid ${G.green}22`, padding: "18px 22px" }}>
        <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".14em", marginBottom: 8 }}>CURRENT STATUS</div>
        <div className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.8 }}>
          Interactive demos available now. Verified public client metrics will replace this section as permission-backed case studies go live.
        </div>
      </div>
    </Section>
  );
}
