import { useState } from "react";
import { TESTIMONIALS, G } from "../data/content.js";
import Section from "./Section.jsx";

/**
 * Testimonials — results + blur-to-reveal client feedback (brief §4).
 * This section carries the id #testimonials (source had no id; brief §4 section
 * map assigns one). Blur-to-reveal on hover/tap is preserved base behavior
 * (brief §5). Progress rings shown static — count/ring animation in Phase 5.
 * GlassCard hover bloom (§7.7) also added in Phase 5.
 */
const PROGRESS = [
  { label: "Case Studies", pct: 60, status: "Healthcare & EdTech · Live", color: G.green },
  { label: "Clients Onboarding", pct: 35, status: "First cohort in progress", color: G.blue },
  { label: "Industries Active", pct: 40, status: "Healthcare · EdTech · Insurance", color: G.amber },
];

export default function Testimonials() {
  const [revealed, setRevealed] = useState({});

  return (
    <Section id="testimonials" eyebrow="RESULTS">
      <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 52 }}>
        Building in public.<br />
        <span style={{ color: G.green }}>Real results, live.</span>
      </h2>

      {/* Circular progress (static in Phase 3) */}
      <div className="grid-cards-3" style={{ gap: 14, marginBottom: 40 }}>
        {PROGRESS.map((item) => (
          <div key={item.label} style={{ background: G.card, border: `1px solid ${G.border}`, padding: "28px 24px", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 20px" }}>
              <svg width="90" height="90" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} viewBox="0 0 90 90">
                <circle cx="45" cy="45" r="38" fill="none" stroke={G.border} strokeWidth="3" />
                <circle
                  cx="45" cy="45" r="38" fill="none" stroke={item.color} strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 38}`}
                  strokeDashoffset={`${2 * Math.PI * 38 * (1 - item.pct / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="smono" style={{ color: item.color, fontSize: 17, fontWeight: 800 }}>{item.pct}%</span>
              </div>
            </div>
            <div className="syne" style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
            <div className="mono" style={{ color: G.muted, fontSize: 10 }}>{item.status}</div>
            <div style={{ position: "absolute", top: 0, right: 0, width: 22, height: 22, borderLeft: `1px solid ${item.color}33`, borderBottom: `1px solid ${item.color}33`, background: `${item.color}06` }} />
          </div>
        ))}
      </div>

      {/* Testimonials — hover/tap to reveal (preserved behavior) */}
      <div style={{ background: G.card, border: `1px solid ${G.border}`, padding: "28px 32px" }}>
        <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".2em", marginBottom: 24 }}>
          EARLY CLIENT FEEDBACK — TAP / HOVER TO REVEAL
        </div>
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            style={{
              marginBottom: i < TESTIMONIALS.length - 1 ? 24 : 0,
              paddingBottom: i < TESTIMONIALS.length - 1 ? 24 : 0,
              borderBottom: i < TESTIMONIALS.length - 1 ? `1px solid ${G.border}` : "none",
            }}
          >
            <div className="mono" style={{ color: G.muted, fontSize: 10, marginBottom: 10 }}>— {t.name} · {t.role}</div>
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onMouseEnter={() => setRevealed((p) => ({ ...p, [i]: true }))}
              onMouseLeave={() => setRevealed((p) => ({ ...p, [i]: false }))}
              onClick={() => setRevealed((p) => ({ ...p, [i]: !p[i] }))}
            >
              <p
                className="syne"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.8,
                  color: G.muted,
                  filter: revealed[i] || t.revealed ? "blur(0)" : "blur(5px)",
                  transition: "filter .4s ease",
                  userSelect: revealed[i] ? "auto" : "none",
                }}
              >
                {t.text}
              </p>
              {!revealed[i] && !t.revealed && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".12em", background: G.card, padding: "4px 12px", border: `1px solid ${G.border}` }}>
                    [ HOVER TO REVEAL ]
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mono" style={{ color: G.muted, fontSize: 12, textAlign: "center", marginTop: 24 }}>
        Building in public. Testimonials and case studies update as clients go live.
      </p>
    </Section>
  );
}
