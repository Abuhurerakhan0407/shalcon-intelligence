import { SERVICES, G } from "../data/content.js";
import Section from "./Section.jsx";

export default function ServicesSection() {
  return (
    <Section id="services" eyebrow="SYSTEM LAYERS" background="#040410">
      <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 22 }}>
        One system.<br /><span style={{ color: G.green }}>Connected layers.</span>
      </h2>
      <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, maxWidth: 760, marginBottom: 52 }}>
        We combine only the layers a workflow actually needs. The audit determines which channels, integrations and controls belong in the final scope.
      </p>

      <div className="grid-cards-3" style={{ gap: 14 }}>
        {SERVICES.map((s) => (
          <div key={s.title} className="service-card">
            <div className="mono" style={{ color: G.green, fontSize: 9, letterSpacing: ".18em", marginBottom: 18 }}>{s.tag}</div>
            <div style={{ fontSize: 30, marginBottom: 16 }}>{s.icon}</div>
            <h3 className="syne" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
            <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
