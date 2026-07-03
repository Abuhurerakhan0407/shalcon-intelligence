import { G } from "../data/content.js";
import Section from "./Section.jsx";

/**
 * HowItWorks — 3-step process + timeline (brief §4 #how-it-works).
 * Step content is intrinsic to this section (process copy, not a shared data
 * block) — ported verbatim from source. Progress-ring spin + line-grow
 * animations land in Phase 5; static rings shown here.
 */
const STEPS = [
  { n: "01", t: "AUDIT", d: "Free 30-min call. We map your exact pain points, current workflow, and what to automate first. No fluff.", c: G.green },
  { n: "02", t: "BUILD", d: "7–10 day custom build. Your tools. Your language. Not a template — your system, built from scratch.", c: G.blue },
  { n: "03", t: "DEPLOY", d: "Go live. We monitor. You scale. Runs 24/7 from day one. Zero involvement needed from your side.", c: G.amber },
];

const TIMELINE = [
  ["Day 1", "Audit + Discovery"],
  ["Days 2–3", "Architecture Design"],
  ["Days 4–9", "Build + Test"],
  ["Day 10", "Deploy + Handoff"],
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" eyebrow="THE PROCESS">
      <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 80 }}>
        Three steps.<br />
        <span style={{ color: G.green }}>Then it runs itself.</span>
      </h2>

      <div style={{ position: "relative" }}>
        <div className="hide-m" style={{ position: "absolute", top: 36, left: "17%", right: "17%", height: 1, background: `linear-gradient(90deg,${G.green}44,${G.blue}44,${G.amber}44)` }} />
        <div className="grid-cards-3" style={{ gap: 32, position: "relative" }}>
          {STEPS.map((step) => (
            <div key={step.n} style={{ textAlign: "center" }}>
              <div style={{ width: 70, height: 70, margin: "0 auto 28px", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, border: `1px solid ${step.c}33`, borderRadius: "50%" }} />
                <div style={{ position: "absolute", inset: 8, border: `1px solid ${step.c}55`, borderRadius: "50%" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="smono" style={{ color: step.c, fontSize: 15, fontWeight: 800, textShadow: `0 0 20px ${step.c}55` }}>{step.n}</span>
                </div>
              </div>
              <div className="mono" style={{ color: step.c, fontSize: 10, letterSpacing: ".18em", marginBottom: 12 }}>{step.n} ·</div>
              <h3 className="syne" style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, letterSpacing: ".1em" }}>{step.t}</h3>
              <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, maxWidth: 260, margin: "0 auto" }}>{step.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginTop: 72, background: G.card, border: `1px solid ${G.border}`, padding: "26px 28px" }}>
        <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".18em", marginBottom: 18 }}>TYPICAL TIMELINE</div>
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
