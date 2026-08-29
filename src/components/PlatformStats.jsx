import { G } from "../data/content.js";
import Section from "./Section.jsx";

const CAPABILITIES = [
  { val: "24/7", label: "Automation Coverage", sub: "when client systems support it", color: G.green },
  { val: "HUMAN", label: "Escalation Path", sub: "AI never has to be the final stop", color: G.blue },
  { val: "MULTI", label: "Channel Workflows", sub: "web · WhatsApp · email · voice", color: G.amber },
  { val: "TRACK", label: "Operational Events", sub: "measure actions before claiming ROI", color: G.pink },
];

/**
 * Capability band.
 * No vanity telemetry or client-performance claims appear here. Real metrics
 * will only be added after a production system supplies verifiable data.
 */
export default function PlatformStats() {
  return (
    <Section eyebrow="SYSTEM CAPABILITIES">
      <div
        className="grid-mobile-2"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 48 }}
      >
        {CAPABILITIES.map((s, i) => (
          <div key={s.label} className="stat-card">
            <div style={{ position: "absolute", top: 16, right: 16, width: 44, height: 44 }}>
              <div style={{ position: "absolute", inset: 0, border: `1px solid ${s.color}22`, borderRadius: "50%", animation: `spin ${7 + i}s linear infinite` }} />
              <div style={{ position: "absolute", inset: 7, border: `1px solid ${s.color}44`, borderRadius: "50%", animation: `spinR ${5 + i}s linear infinite` }} />
              <div style={{ position: "absolute", inset: 0, animation: `orbit ${6 + i}s linear infinite` }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, boxShadow: `0 0 6px ${s.color}`, marginLeft: -2, marginTop: -2 }} />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${s.color}33,transparent)` }} />
            <div className="smono" style={{ fontSize: "clamp(22px,2.7vw,34px)", fontWeight: 800, color: s.color, marginBottom: 8, lineHeight: 1, textShadow: `0 0 30px ${s.color}33` }}>
              {s.val}
            </div>
            <div className="syne" style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
            <div className="mono" style={{ color: G.muted, fontSize: 10, lineHeight: 1.6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ border: `1px solid ${G.green}22`, background: "#05110C", padding: "15px 22px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.green, flexShrink: 0 }} />
        <p className="mono" style={{ color: G.green, fontSize: 12, letterSpacing: ".02em", lineHeight: 1.7 }}>
          We baseline the current workflow first. Any ROI claim comes after measurement — not before deployment.
        </p>
      </div>
    </Section>
  );
}
