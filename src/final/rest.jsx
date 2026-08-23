import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT, INDUSTRIES, PROCESS } from "./data.js";
import { MagneticLink, Reveal } from "./ui.jsx";

export function Industries() {
  return (
    <section className="section-shell section-pad industries-section">
      <Reveal className="section-heading"><div><span className="eyebrow"><span>06</span> INDUSTRIES</span><h2>Different businesses. Same friction.</h2></div><p>The interface changes. The underlying problems are familiar: slow response, duplicated work, broken handoffs and disconnected systems.</p></Reveal>
      <div className="industry-grid">
        {INDUSTRIES.map(([name, desc], i) => (
          <Reveal className="industry-card" key={name} delay={i * 0.035}>
            <span>0{i + 1}</span><h3>{name}</h3><p>{desc}</p><i>↗</i>
          </Reveal>
        ))}
        <Reveal className="industry-card custom-industry"><span>07</span><h3>Custom</h3><p>Your workflow, mapped from scratch.</p><i>↗</i></Reveal>
      </div>
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
      <div className="production-grid">{cards.map(([n, title, body], i) => <Reveal className="production-card" key={title} delay={i * .04}><div className="border-beam"/><span>{n}</span><h3>{title}</h3><p>{body}</p><small>OPERATIONS READY</small></Reveal>)}</div>
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
        <h3>Founder — Shalcon Intelligence</h3>
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
      <div className="cta-lamp" />
      <Reveal className="cta-inner">
        <span className="eyebrow"><span>11</span> START A CONVERSATION</span>
        <h2>Have a process your team should not be doing manually?</h2>
        <p>Tell me how it works today. I’ll figure out what should be automated — and what should stay human.</p>
        <MagneticLink href={CONTACT.whatsapp} className="primary-btn large" external>Discuss a project <span>↗</span></MagneticLink>
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
