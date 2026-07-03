import { SERVICES, G } from "../data/content.js";
import Section from "./Section.jsx";

/**
 * ServicesSection — 6 service cards (brief §4 #services).
 * PHASE 3: static cards from content.js. Hover-sweep + scroll reveal in Phase 5.
 */
export default function ServicesSection() {
  return (
    <Section id="services" eyebrow="WHAT WE BUILD" background="#040410">
      <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 52 }}>
        The full stack.<br />
        <span style={{ color: G.green }}>Every automation.</span>
      </h2>

      <div className="grid-cards-3" style={{ gap: 14 }}>
        {SERVICES.map((s) => (
          <div key={s.title} className="service-card">
            <div className="mono" style={{ color: G.green, fontSize: 9, letterSpacing: ".18em", marginBottom: 18 }}>
              {s.tag}
            </div>
            <div style={{ fontSize: 30, marginBottom: 16 }}>{s.icon}</div>
            <h3 className="syne" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
            <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9 }}>{s.desc}</p>
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, color: G.green, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>
              <span>Learn more</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
