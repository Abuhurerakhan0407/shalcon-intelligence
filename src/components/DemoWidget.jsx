import { useState } from "react";
import { NICHES, G } from "../data/content.js";
import { DEMO_SCENARIOS, getDemoResponse } from "../lib/demoScenarios.js";
import Section from "./Section.jsx";

/**
 * Interactive prototype using synthetic example data.
 * It demonstrates conversation flow and UX only; it does not imply a live
 * client integration, production SLA, or verified performance benchmark.
 */
export default function DemoWidget() {
  const [demoNiche, setDemoNiche] = useState("Healthcare");
  const [chatMsgs, setChatMsgs] = useState(DEMO_SCENARIOS.Healthcare.init);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const changeDemo = (n) => {
    setDemoNiche(n);
    setChatMsgs(DEMO_SCENARIOS[n].init);
    setChatInput("");
    setIsTyping(false);
  };

  const sendChat = () => {
    const trimmed = chatInput.trim();
    if (!trimmed || isTyping) return;
    const response = getDemoResponse(demoNiche, trimmed);
    setChatMsgs((current) => [...current, { r: "user", t: trimmed }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setChatMsgs((current) => [...current, { r: "bot", t: response }]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <Section id="demo" eyebrow="INTERACTIVE PROTOTYPE" background="#040410">
      <div className="grid-split" style={{ gap: 64, alignItems: "start" }}>
        <div>
          <h2 className="syne" style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 22 }}>
            Explore the flow.<br /><span style={{ color: G.green }}>Then we adapt it to your operation.</span>
          </h2>
          <p className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.9, marginBottom: 20 }}>
            This prototype demonstrates the kind of intake, qualification and routing experience Shalcon can build. Responses and records below use synthetic examples; no client system is connected here.
          </p>
          <div style={{ border: `1px solid ${G.green}22`, background: "#05110C", padding: "10px 12px", marginBottom: 30 }}>
            <span className="mono" style={{ color: G.green, fontSize: 10, lineHeight: 1.6 }}>DEMO MODE · SYNTHETIC DATA · NO LIVE CLIENT RECORDS</span>
          </div>

          <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".1em", marginBottom: 12 }}>› SELECT INDUSTRY:</div>
          <div role="group" aria-label="Prototype industry" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {Object.keys(NICHES).map((n) => (
              <button key={n} type="button" aria-pressed={demoNiche === n} className={`pill-btn${demoNiche === n ? " on" : ""}`} onClick={() => changeDemo(n)}>
                {NICHES[n].icon} {n}
              </button>
            ))}
          </div>

          <div className="grid-cards-2" style={{ gap: 10 }}>
            {[
              ["Conversation", "Intake + qualification"],
              ["Escalation", "Human handoff ready"],
              ["Data", "Synthetic only"],
              ["Channels", "Web · WhatsApp-ready"],
            ].map(([key, value]) => (
              <div key={key} style={{ background: G.card, border: `1px solid ${G.border}`, padding: "12px 14px" }}>
                <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".1em", marginBottom: 4 }}>{key}</div>
                <div className="mono" style={{ color: G.green, fontSize: 11, fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ background: "#04040E", border: `1px solid ${G.border}`, overflow: "hidden", boxShadow: "0 0 80px rgba(0,255,148,.05)" }}>
            <div style={{ background: "#09090F", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${G.border}` }}>
              <div aria-hidden style={{ display: "flex", gap: 6 }}>
                {["#FF5F57", "#FFBD2E", "#28CA41"].map((color) => <div key={color} style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />)}
              </div>
              <span className="mono" style={{ color: G.muted, fontSize: 10, flex: 1, textAlign: "center", letterSpacing: ".07em" }}>PROTOTYPE · {demoNiche.toUpperCase()}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: G.green }} />
                <span className="mono" style={{ color: G.green, fontSize: 9 }}>DEMO</span>
              </div>
            </div>

            <div role="log" aria-live="polite" aria-label={`${demoNiche} synthetic demo conversation`} style={{ height: 320, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: "linear-gradient(180deg,#060610,#030308)" }}>
              {chatMsgs.map((message, index) => (
                <div key={`${message.r}-${index}`} style={{ display: "flex", flexDirection: "column" }}>
                  <div className={message.r === "bot" ? "chat-bot" : "chat-user"}>{message.t}</div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bot" aria-label="Prototype is responding" style={{ display: "flex", gap: 5, alignItems: "center", width: 56, padding: "10px 14px" }}>
                  {[0, 1, 2].map((i) => <div key={i} className="typing-dot" aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: G.green, animationDelay: `${i * 0.22}s` }} />)}
                </div>
              )}
            </div>

            <div style={{ borderTop: `1px solid ${G.border}`, padding: 12, display: "flex", gap: 8, background: "#04040E" }}>
              <label htmlFor="prototype-question" className="sr-only">Prototype question</label>
              <input
                id="prototype-question"
                className="demo-chat-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder="Try a sample question..."
                autoComplete="off"
                style={{ flex: 1, minWidth: 0, background: "#090914", border: `1px solid ${G.border}`, color: G.white, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, padding: "9px 12px", outline: "none" }}
              />
              <button type="button" className="demo-send-btn" onClick={sendChat} disabled={isTyping || !chatInput.trim()} style={{ background: G.green, border: "none", color: G.bg, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, padding: "9px 16px", cursor: "pointer", letterSpacing: ".04em" }}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
