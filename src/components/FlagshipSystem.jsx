import { G } from "../data/content.js";
import Section from "./Section.jsx";

const STEPS = [
  ["01", "CAPTURE", "New inquiry arrives from web, WhatsApp or another connected source."],
  ["02", "QUALIFY", "The system collects the fields your team actually needs before a human steps in."],
  ["03", "BOOK / ROUTE", "Qualified requests move to the right calendar, queue, department or person."],
  ["04", "FOLLOW UP", "No-response and reminder sequences run automatically within the configured rules."],
  ["05", "WRITE BACK", "Conversation status, source and outcome are written into the connected CRM or database."],
  ["06", "ESCALATE", "Edge cases, sensitive requests and low-confidence conversations are handed to a human."],
];

export default function FlagshipSystem({ onBookCall }) {
  return (
    <Section id="flagship" eyebrow="FLAGSHIP SYSTEM" background="#040410">
      <div className="grid-split" style={{ gap: 54, alignItems: "start" }}>
        <div>
          <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".16em", marginBottom: 16 }}>HEALTHCARE · AI FRONT DESK + LEAD OPERATIONS</div>
          <h2 className="syne" style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>
            One workflow from<br /><span style={{ color: G.green }}>first message to handoff.</span>
          </h2>
          <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, marginBottom: 24 }}>
            Instead of selling a chatbot, a CRM setup and a follow-up tool separately, Shalcon connects the operating path around the clinic's real intake process.
          </p>
          <div style={{ border: `1px solid ${G.green}22`, background: "#06100B", padding: "14px 16px", marginBottom: 26 }}>
            <div className="mono" style={{ color: G.green, fontSize: 10, lineHeight: 1.7 }}>
              DEMO STANDARD · synthetic patient examples only · no diagnosis · no medical advice · human escalation designed into the workflow
            </div>
          </div>
          <button className="btn-primary" onClick={onBookCall}>Map this for my clinic</button>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {STEPS.map(([n, title, text]) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: 14, background: G.card, border: `1px solid ${G.border}`, padding: "16px 18px" }}>
              <div className="smono" style={{ color: G.green, fontSize: 15, fontWeight: 800 }}>{n}</div>
              <div>
                <div className="syne" style={{ fontSize: 13, fontWeight: 800, marginBottom: 5 }}>{title}</div>
                <div className="mono" style={{ color: G.muted, fontSize: 10, lineHeight: 1.7 }}>{text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
