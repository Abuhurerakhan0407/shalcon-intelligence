import { useState } from "react";
import { NICHES, G } from "../data/content.js";
import Section from "./Section.jsx";

const DEMO = {
  Healthcare: {
    init: [
      { r: "bot", t: "Demo clinic assistant ready. I can show a sample intake, appointment request, FAQ handoff, or follow-up flow." },
      { r: "user", t: "I need an appointment tomorrow." },
      { r: "bot", t: "I can collect your preferred time, doctor type, and contact details, then route the request to the clinic workflow." },
    ],
    responses: [
      "For this demo, I can collect your preferred slot and contact details, then show where a real clinic integration would check availability.",
      "A production version can hand off to staff whenever a medical, billing, or policy question needs human review.",
      "This prototype uses synthetic data only. No patient record or live calendar is connected.",
    ],
  },
  EdTech: {
    init: [
      { r: "bot", t: "Demo admissions assistant ready. Ask about a course, fee follow-up, demo class, or enrollment workflow." },
      { r: "user", t: "I want course details." },
      { r: "bot", t: "I can capture course interest, qualification details, preferred contact time, and route the lead to admissions." },
    ],
    responses: [
      "A production flow can capture the learner's course interest and push the lead into the institute CRM.",
      "Follow-up timing, fee reminders, and counselor handoff can be configured around the institute's actual process.",
      "This is a synthetic prototype; it is not connected to a real institute database.",
    ],
  },
  Insurance: {
    init: [
      { r: "bot", t: "Demo insurance assistant ready. Try a renewal, document collection, claim-intake, or callback request." },
      { r: "user", t: "My policy renewal is due." },
      { r: "bot", t: "I can demonstrate collecting policy context and routing the request. A production system would verify data in the insurer or broker system." },
    ],
    responses: [
      "A real deployment can trigger renewal reminders using approved customer data and consent rules.",
      "Claim or policy-specific advice should escalate to an authorized human workflow where required.",
      "No live policy record is being accessed in this prototype.",
    ],
  },
  "E-commerce": {
    init: [
      { r: "bot", t: "Demo commerce assistant ready. Try an order-status, return, product, or cart-follow-up question." },
      { r: "user", t: "Where is my order?" },
      { r: "bot", t: "I can show the support flow. In production, order status would come from the store or fulfillment system after verification." },
    ],
    responses: [
      "A production integration can retrieve verified order status and escalate exceptions to support staff.",
      "Cart follow-up can be configured around consent, timing, store policy, and CRM or commerce events.",
      "This demo does not access a real order database.",
    ],
  },
  HR: {
    init: [
      { r: "bot", t: "Demo recruitment assistant ready. Try candidate intake, screening questions, scheduling, or onboarding." },
      { r: "user", t: "Schedule an interview." },
      { r: "bot", t: "I can demonstrate collecting availability and routing the request. A production version would connect to the approved calendar and ATS workflow." },
    ],
    responses: [
      "A real workflow can collect structured candidate information and route it to the recruiting team for review.",
      "Screening rules should be approved by the employer and include human review where decisions affect candidates.",
      "This prototype uses synthetic candidate data only.",
    ],
  },
};

/**
 * Interactive prototype using synthetic example data.
 * It demonstrates conversation flow and UX only; it does not imply a live
 * client integration, production SLA, or verified performance benchmark.
 */
export default function DemoWidget() {
  const [demoNiche, setDemoNiche] = useState("Healthcare");
  const [chatMsgs, setChatMsgs] = useState(DEMO.Healthcare.init);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const changeDemo = (n) => {
    setDemoNiche(n);
    setChatMsgs(DEMO[n].init);
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMsgs((p) => [...p, { r: "user", t: chatInput }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      const rs = DEMO[demoNiche].responses;
      setChatMsgs((p) => [...p, { r: "bot", t: rs[Math.floor(Math.random() * rs.length)] }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <Section id="demo" eyebrow="INTERACTIVE PROTOTYPE" background="#040410">
      <div className="grid-split" style={{ gap: 64, alignItems: "start" }}>
        <div>
          <h2 className="syne" style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 22 }}>
            Explore the flow.<br />
            <span style={{ color: G.green }}>Then we adapt it to your operation.</span>
          </h2>
          <p className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.9, marginBottom: 20 }}>
            This prototype demonstrates the kind of intake, qualification and routing experience Shalcon can build. Responses and records below use synthetic examples; no client system is connected here.
          </p>
          <div style={{ border: `1px solid ${G.green}22`, background: "#05110C", padding: "10px 12px", marginBottom: 30 }}>
            <span className="mono" style={{ color: G.green, fontSize: 10, lineHeight: 1.6 }}>DEMO MODE · SYNTHETIC DATA · NO LIVE CLIENT RECORDS</span>
          </div>

          <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".1em", marginBottom: 12 }}>› SELECT INDUSTRY:</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {Object.keys(NICHES).map((n) => (
              <button key={n} className={`pill-btn${demoNiche === n ? " on" : ""}`} onClick={() => changeDemo(n)}>
                {NICHES[n].icon} {n}
              </button>
            ))}
          </div>

          <div className="grid-cards-2" style={{ gap: 10 }}>
            {[
              ["Conversation", "Intake + qualification"],
              ["Escalation", "Human handoff ready"],
              ["Languages", "Configurable"],
              ["Channels", "Web · WhatsApp-ready"],
            ].map(([k, v]) => (
              <div key={k} style={{ background: G.card, border: `1px solid ${G.border}`, padding: "12px 14px" }}>
                <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".1em", marginBottom: 4 }}>{k}</div>
                <div className="mono" style={{ color: G.green, fontSize: 11, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ background: "#04040E", border: `1px solid ${G.border}`, overflow: "hidden", boxShadow: "0 0 80px rgba(0,255,148,.05)" }}>
            <div style={{ background: "#09090F", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${G.border}` }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <span className="mono" style={{ color: G.muted, fontSize: 10, flex: 1, textAlign: "center", letterSpacing: ".07em" }}>
                PROTOTYPE · {demoNiche.toUpperCase()}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.green }} />
                <span className="mono" style={{ color: G.green, fontSize: 9 }}>DEMO</span>
              </div>
            </div>

            <div style={{ height: 320, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: "linear-gradient(180deg,#060610,#030308)" }}>
              {chatMsgs.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                  <div className={m.r === "bot" ? "chat-bot" : "chat-user"}>{m.t}</div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bot" style={{ display: "flex", gap: 5, alignItems: "center", width: 56, padding: "10px 14px" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="typing-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: G.green, animationDelay: `${i * 0.22}s` }} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ borderTop: `1px solid ${G.border}`, padding: 12, display: "flex", gap: 8, background: "#04040E" }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder="Try a sample question..."
                style={{ flex: 1, minWidth: 0, background: "#090914", border: `1px solid ${G.border}`, color: G.white, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, padding: "9px 12px", outline: "none" }}
              />
              <button
                onClick={sendChat}
                style={{ background: G.green, border: "none", color: G.bg, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, padding: "9px 16px", cursor: "pointer", letterSpacing: ".04em" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
