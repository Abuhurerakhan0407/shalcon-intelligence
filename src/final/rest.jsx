import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT, INDUSTRIES, PROCESS } from "./data.js";
import { MagneticLink, Reveal } from "./ui.jsx";
import { PointerHighlight, RippleField, ScrambleText, TiltCard } from "./effects.jsx";

function IndustrySignal() {
  return (
    <div className="industry-signal" aria-hidden="true">
      <i/><i/><i/><i/><i/><i/><b/>
    </div>
  );
}

function IndustryIcon({ index }) {
  const common = { viewBox: "0 0 24 24", fill: "none", className: "industry-icon-svg" };
  const stroke = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

  if (index === 0) {
    return <div className="industry-icon" aria-hidden="true"><svg {...common}><rect x="5" y="5" width="14" height="14" rx="4" {...stroke}/><path d="M12 8.5v7M8.5 12h7" {...stroke}/></svg></div>;
  }
  if (index === 1) {
    return <div className="industry-icon" aria-hidden="true"><svg {...common}><path d="M3.5 9.5 12 5l8.5 4.5L12 14 3.5 9.5Z" {...stroke}/><path d="M7 11.5v4c2.9 2 7.1 2 10 0v-4M20.5 9.5v5" {...stroke}/></svg></div>;
  }
  if (index === 2) {
    return <div className="industry-icon" aria-hidden="true"><svg {...common}><path d="M12 3.8l6 2.7v4.7c0 4.1-2.4 7.6-6 9-3.6-1.4-6-4.9-6-9V6.5l6-2.7Z" {...stroke}/><path d="M9.4 12.2l1.7 1.7 3.5-4" {...stroke}/></svg></div>;
  }
  if (index === 3) {
    return <div className="industry-icon" aria-hidden="true"><svg {...common}><path d="M7 8.5h10c1.7 0 3 1.3 3 3v3.5H4V11.5c0-1.7 1.3-3 3-3Z" {...stroke}/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5M4 15h16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2Z" {...stroke}/></svg></div>;
  }
  if (index === 4) {
    return <div className="industry-icon" aria-hidden="true"><svg {...common}><circle cx="9" cy="8" r="2.7" {...stroke}/><path d="M4.8 18c.6-2.7 2.5-4.3 4.2-4.3 1.6 0 3.5 1.6 4.1 4.3M15.3 9.1h4.4M17.5 6.9v4.4" {...stroke}/></svg></div>;
  }
  if (index === 5) {
    return <div className="industry-icon" aria-hidden="true"><svg {...common}><path d="M4.5 18.5h15" {...stroke}/><path d="M6.5 18.5V10l5.5-4 5.5 4v8.5" {...stroke}/><path d="M8.5 11.2h3M8.5 14h3" {...stroke}/></svg></div>;
  }
  return <div className="industry-icon" aria-hidden="true"><svg {...common}><rect x="4.5" y="5.5" width="15" height="13" rx="3" {...stroke}/><path d="M8 12h8M12 8v8" {...stroke}/></svg></div>;
}

function CustomWorkflow() {
  return (
    <div className="custom-workflow" aria-hidden="true">
      <div className="custom-workflow-chiprow"><span>Intake</span><span>Logic</span><span>CRM</span><span>WhatsApp</span></div>
      <div className="custom-workflow-rail" />
      <div className="custom-workflow-nodes"><i/><i/><i/><i/><i/></div>
      <div className="custom-workflow-footer"><span>Human handoff</span><b/></div>
    </div>
  );
}

function ProductionSignal({ index }) {
  if (index === 0) return <div className="production-signal escalation" aria-hidden="true"><span/><span/><span/><i/></div>;
  if (index === 1) return <div className="production-signal integration" aria-hidden="true"><span/><span/><span/><i/></div>;
  if (index === 2) return <div className="production-signal failure" aria-hidden="true"><span/><span/><span/></div>;
  return <div className="production-signal monitoring" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>;
}

export function Industries() {
  return (
    <section className="section-shell section-pad industries-section">
      <Reveal className="section-heading"><div><span className="eyebrow"><span>06</span> INDUSTRIES</span><h2>Different businesses. Same friction.</h2></div><p>The interface changes. The underlying problems are familiar: slow response, duplicated work, broken handoffs and disconnected systems.</p></Reveal>
      <div className="industry-grid">
        {INDUSTRIES.map(([name, desc], i) => (
          <TiltCard className={`industry-card industry-card-${i + 1}`} key={name} delay={i * 0.035} depth={5} data-cursor="VIEW">
            <span>0{i + 1}</span>
            <IndustryIcon index={i}/>
            <h3>{name}</h3>
            <p>{desc}</p>
            <i>↗</i>
            <IndustrySignal/>
          </TiltCard>
        ))}
      </div>

      <TiltCard className="industry-card custom-feature-card" delay={.18} depth={6} data-cursor="CUSTOM">
        <div className="custom-feature-copy">
          <span>07</span>
          <h3>Custom Systems</h3>
          <p>Built around your workflow, not forced into a template. Mapped from scratch, integrated end-to-end, and designed for how your team actually operates.</p>
          <div className="custom-feature-tags"><small>Mapped from scratch</small><small>Integrated end-to-end</small><small>Human handoff ready</small></div>
        </div>
        <div className="custom-feature-visual">
          <IndustryIcon index={6}/>
          <CustomWorkflow/>
        </div>
      </TiltCard>
    </section>
  );
}

export function Production() {
  const cards = [
    ["01", "Human escalation", "Automation knows when to stop and hands the situation to a person with context."],
    ["02", "System integration", "Existing tools stay connected instead of forcing the business into another isolated app."],
    ["03", "Failure handling", "Retries, fallbacks, edge cases and exceptions are designed before they become surprises."],
    ["04", "Monitoring", "You can see what the system did, where it failed and what needs attention."],
  ];
  return (
    <section className="section-shell section-pad production-section">
      <Reveal className="section-heading compact"><div><span className="eyebrow"><span>07</span> BUILT FOR REAL BUSINESS</span><h2>Production is where the clever demo ends.</h2></div><p>Reliable systems need boring things too: permissions, logs, retries, escalation and clear ownership.</p></Reveal>
      <div className="production-grid">
        {cards.map(([n, title, body], i) => (
          <TiltCard className="production-card" key={title} delay={i * .04} depth={5}>
            <div className="border-beam"/>
            <span>{n}</span>
            <ProductionSignal index={i}/>
            <h3>{title}</h3>
            <p>{body}</p>
            <small>OPERATIONS READY</small>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section-shell section-pad process-section" id="process">
      <Reveal className="section-heading compact"><div><span className="eyebrow"><span>08</span> HOW I WORK</span><h2>From messy process to operating system.</h2></div><p>Five steps. Not fifteen meetings.</p></Reveal>
      <div className="process-track">
        <div className="process-line"><span/></div>
        {PROCESS.map(([n, title, body], i) => (
          <Reveal className="process-step" key={title} delay={i * .04}><div className="step-node"><span>{n}</span></div><div><h3>{title}</h3><p>{body}</p></div></Reveal>
        ))}
      </div>
    </section>
  );
}

export function ROICalculator() {
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(450);
  const monthly = Math.round(people * hours * rate * 4.33);
  return (
    <section className="section-shell section-pad roi-section">
      <Reveal className="roi-shell">
        <div className="roi-copy"><span className="eyebrow"><span>09</span> ILLUSTRATIVE ROI TOOL</span><h2>How much is manual work costing?</h2><p>This is a simple assumption-based estimator — not a promise of savings. Change the inputs to match one repetitive process.</p><small>Useful for spotting whether a workflow is worth investigating.</small></div>
        <div className="roi-controls">
          <label><span>People doing the task <b>{people}</b></span><input type="range" min="1" max="20" value={people} onChange={(e) => setPeople(+e.target.value)} /></label>
          <label><span>Hours / week each <b>{hours}</b></span><input type="range" min="1" max="40" value={hours} onChange={(e) => setHours(+e.target.value)} /></label>
          <label><span>Approx. hourly cost <b>₹{rate}</b></span><input type="range" min="100" max="2500" step="50" value={rate} onChange={(e) => setRate(+e.target.value)} /></label>
          <div className="roi-result"><small>ESTIMATED MONTHLY MANUAL COST</small><motion.strong key={monthly} initial={{ opacity: 0.5, y: 5 }} animate={{ opacity: 1, y: 0 }}>₹{monthly.toLocaleString("en-IN")}</motion.strong><span>before software, API or implementation costs</span></div>
        </div>
      </Reveal>
    </section>
  );
}

export function About() {
  return (
    <section className="section-shell section-pad about-section" id="about">
      <Reveal className="about-visual">
        <div className="portrait-grid" />
        <div className="avatar-monogram">AH</div>
        <div className="avatar-orbit"><i/><i/><i/></div>
        <span className="about-status"><b className="live-dot"/> MUMBAI / INDIA</span>
      </Reveal>
      <Reveal className="about-copy" delay={.08}>
        <span className="eyebrow"><span>10</span> ABOUT</span>
        <h2>Abu Hurera</h2>
        <h3><ScrambleText text="FOUNDER — SHALCON INTELLIGENCE" speed={18}/></h3>
        <p>I build AI automation, product systems and web software around real business operations. My strongest work is orchestration: connecting agents, workflows, CRMs, APIs, data and people so the result behaves like one system.</p>
        <div className="about-tags"><span>AI AUTOMATION</span><span>PRODUCT SYSTEMS</span><span>WEB DEVELOPMENT</span></div>
        <div className="about-links"><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${CONTACT.email}`}>Email ↗</a></div>
      </Reveal>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="cta-section section-shell" id="contact">
      <RippleField/>
      <div className="cta-lamp" />
      <Reveal className="cta-inner">
        <span className="eyebrow"><span>11</span> START A CONVERSATION</span>
        <h2>Have a process your team should not be doing <PointerHighlight>manually?</PointerHighlight></h2>
        <p>Tell me how it works today. I’ll figure out what should be automated — and what should stay human.</p>
        <MagneticLink href={CONTACT.whatsapp} className="primary-btn large glow-border" external>Discuss a project <span>↗</span></MagneticLink>
        <div className="cta-links"><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href={`mailto:${CONTACT.email}`}>Email</a><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer section-shell">
      <div><strong>ABU HURERA</strong><span>AI Automation · Product Systems · Web Development</span></div>
      <div><span>Shalcon Intelligence</span><span>Mumbai, India</span></div>
      <div><span>© 2026</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
