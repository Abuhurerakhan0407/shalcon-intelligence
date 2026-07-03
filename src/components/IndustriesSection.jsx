import { useState } from "react";
import { NICHES, G } from "../data/content.js";
import Section from "./Section.jsx";

/**
 * IndustriesSection — 5 niche tabs, pain/solution cards (brief §4 #industries).
 * Niche tab switching (activeNiche) is base content behavior (brief §5) — kept.
 * Scene color-sync + card enter animations land in Phase 5.
 */
export default function IndustriesSection() {
  const [activeNiche, setActiveNiche] = useState("Healthcare");
  const nicheData = NICHES[activeNiche];

  return (
    <Section id="industries" eyebrow="INDUSTRY SOLUTIONS">
      <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 52 }}>
        One problem.<br />
        <span style={{ color: G.green }}>Five industries.</span>
      </h2>

      {/* Tabs */}
      <div className="no-scrollbar" style={{ display: "flex", borderBottom: `1px solid ${G.border}`, marginBottom: 48, overflowX: "auto" }}>
        {Object.keys(NICHES).map((n) => (
          <button
            key={n}
            className={`niche-tab${activeNiche === n ? " on" : ""}`}
            onClick={() => setActiveNiche(n)}
          >
            {NICHES[n].icon} {n}
          </button>
        ))}
      </div>

      {/* Pain + solution / feature grid */}
      <div
        className="grid-split"
        style={{ gap: 48, alignItems: "start" }}
      >
        <div>
          <div className="mono" style={{ color: nicheData.color, fontSize: 9, letterSpacing: ".2em", marginBottom: 18 }}>
            {nicheData.tag}
          </div>
          <h3 className="syne" style={{ fontSize: "clamp(20px,3vw,36px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 22 }}>
            {nicheData.pain}
          </h3>
          <div style={{ padding: "14px 20px", background: G.card, border: `1px solid ${G.border}`, borderLeft: `3px solid ${nicheData.color}`, marginBottom: 28, display: "flex", gap: 12 }}>
            <span style={{ color: nicheData.color, flexShrink: 0 }}>›</span>
            <span className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.85 }}>
              {nicheData.solution}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
            {nicheData.stats.map((st) => (
              <span
                key={st}
                style={{ background: `${nicheData.color}0E`, border: `1px solid ${nicheData.color}33`, color: nicheData.color, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, padding: "5px 12px", letterSpacing: ".08em" }}
              >
                {st}
              </span>
            ))}
          </div>
          <button
            className="btn-ghost"
            onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            style={{ borderColor: nicheData.color, color: nicheData.color }}
          >
            <span style={{ color: "inherit" }}>[ Request Demo for {activeNiche} → ]</span>
          </button>
        </div>

        <div className="grid-cards-2" style={{ gap: 12 }}>
          {nicheData.features.map((feat) => (
            <div key={feat} style={{ background: G.card, border: `1px solid ${G.border}`, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
              <div style={{ width: 24, height: 24, border: `1px solid ${nicheData.color}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: nicheData.color, fontSize: 10 }}>◆</div>
              <div className="syne" style={{ fontSize: 12, fontWeight: 700, marginBottom: 5 }}>{feat}</div>
              <div className="mono" style={{ color: G.muted, fontSize: 10, lineHeight: 1.7 }}>Automated. Always on.</div>
              <div style={{ position: "absolute", top: 0, right: 0, width: 36, height: 36, background: `${nicheData.color}06`, borderLeft: `1px solid ${nicheData.color}22`, borderBottom: `1px solid ${nicheData.color}22` }} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
