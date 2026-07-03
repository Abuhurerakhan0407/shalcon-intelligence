import { PLATFORM_STATS, G } from "../data/content.js";
import Section from "./Section.jsx";

/**
 * PlatformStats — "PLATFORM METRICS" band (restored from source/shalcon_final.jsx,
 * §STATS block). This section was part of the original Phase 3 layout and sits
 * between the hero/ROI teaser and #industries. Structure is ported verbatim;
 * only the wrapper is swapped to the shared <Section> so it inherits the exact
 * spacing, eyebrow, and top-border rhythm the rest of the page already uses —
 * no new styling language introduced.
 *
 * PHASE 5: each stat value carries `data-countup` so the shared count-up motion
 * (src/motion/countUp.js) tweens it 0 → target once on scroll-in, then snaps to
 * the authored string. The React children hold the final value, so with motion
 * disabled (reduced-motion) or before the tween fires, the correct number shows
 * — no layout shift, no hidden content.
 */
export default function PlatformStats() {
  return (
    <Section eyebrow="PLATFORM METRICS">
      <div
        className="grid-mobile-2"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 60 }}
      >
        {PLATFORM_STATS.map((s, i) => (
          <div key={s.label} className="stat-card">
            {/* Decorative orbiting corner accent (spin / spinR rings + orbit dot) */}
            <div style={{ position: "absolute", top: 16, right: 16, width: 44, height: 44 }}>
              <div style={{ position: "absolute", inset: 0, border: `1px solid ${s.color}22`, borderRadius: "50%", animation: `spin ${7 + i}s linear infinite` }} />
              <div style={{ position: "absolute", inset: 7, border: `1px solid ${s.color}44`, borderRadius: "50%", animation: `spinR ${5 + i}s linear infinite` }} />
              <div style={{ position: "absolute", inset: 0, animation: `orbit ${6 + i}s linear infinite` }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, boxShadow: `0 0 6px ${s.color}`, marginLeft: -2, marginTop: -2 }} />
              </div>
            </div>

            {/* Bottom accent line */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${s.color}33,transparent)` }} />

            {/* Value — count-up target (0 → s.val on scroll-in) */}
            <div
              className="smono"
              data-countup={s.val}
              style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, color: s.color, marginBottom: 8, lineHeight: 1, textShadow: `0 0 30px ${s.color}33` }}
            >
              {s.val}
            </div>
            <div className="syne" style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
            <div className="mono" style={{ color: G.muted, fontSize: 10 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Urgency warning strip (part of the original STATS band) */}
      <div style={{ border: `1px solid ${G.amber}33`, background: "#100800", padding: "15px 22px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.amber, flexShrink: 0, animation: "pulse 1.4s ease-in-out infinite" }} />
        <p className="mono" style={{ color: G.amber, fontSize: 12, letterSpacing: ".04em", lineHeight: 1.7 }}>
          ⚡ Businesses that don't automate in 2026 will be replaced by ones that do. The shift is already underway.
        </p>
      </div>
    </Section>
  );
}
