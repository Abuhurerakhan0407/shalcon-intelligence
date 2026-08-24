import { motion } from "framer-motion";
import { CAPABILITIES, CONTACT, PROCESS, SERVICES } from "./data.js";
import { MagneticLink, Reveal, useReducedMotionPreference } from "./ui.jsx";

function DualPreview() {
  return (
    <motion.div
      className="referral-preview balanced-preview"
      initial={{ opacity: 0, y: 26, scale: .985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: .9, delay: .28, ease: [.16, 1, .3, 1] }}
      data-cursor="EXPLORE"
    >
      <div className="preview-bar"><span/><span/><span/><b>WEB + AI / LIVE BUILD</b></div>
      <div className="balanced-preview-page">
        <div className="balanced-web-card">
          <div className="balanced-card-top"><small>WEB EXPERIENCE</small><span>01</span></div>
          <div className="balanced-web-nav"><b>AH</b><i/><i/><i/></div>
          <h3>Clear interface.<br/>Fast path to action.</h3>
          <p>Strategy, UI, responsive development and motion.</p>
          <div className="balanced-web-grid"><i/><i/><i/></div>
        </div>
        <div className="balanced-ai-card">
          <div className="balanced-card-top"><small>AI ORCHESTRATION</small><span><b className="live-dot"/> LIVE</span></div>
          <div className="balanced-flow" aria-hidden="true">
            <span>EVENT</span><i/><span>AI</span><i/><span>CRM</span><i/><span>HUMAN</span>
          </div>
          <div className="balanced-ai-copy"><strong>One event. Shared context. Coordinated action.</strong><p>Agents, CRM, WhatsApp and APIs moving as one workflow.</p></div>
          <div className="balanced-ai-status"><span>INTENT</span><span>ROUTE</span><span>SYNC</span><span>HANDOFF</span></div>
        </div>
      </div>
      <div className="preview-note"><span className="live-dot"/> design / development / orchestration</div>
    </motion.div>
  );
}

export function ReferralHero() {
  const reduced = useReducedMotionPreference();
  return (
    <section className="referral-hero section-shell" id="top">
      <div className="referral-hero-copy">
        <motion.div className="eyebrow" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .08 }}>
          <span>01</span> WEB EXPERIENCES · AI SYSTEMS
        </motion.div>
        <div className="referral-title-wrap balanced-title-wrap">
          {["I DESIGN WEBSITES.", "I BUILD AI SYSTEMS.", "ONE PARTNER. BOTH."].map((line, i) => (
            <div className="referral-title-line" key={line}>
              <motion.h1
                initial={reduced ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: .78, delay: .12 + i * .07, ease: [.16, 1, .3, 1] }}
              >{line}</motion.h1>
            </div>
          ))}
        </div>
        <motion.p className="referral-sub" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .42, duration: .65 }}>
          Premium websites, landing pages and web apps — plus <strong>AI agents, workflow orchestration, CRM + WhatsApp and API automation.</strong> The customer-facing experience and the operating system behind it, built with the same focus on clarity.
        </motion.p>
        <motion.div className="referral-actions" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .56 }}>
          <MagneticLink href={CONTACT.whatsapp} className="primary-btn" external>Discuss a project <span>↗</span></MagneticLink>
          <a href="#services" className="text-link" data-cursor="EXPLORE">Explore capabilities <span>↓</span></a>
        </motion.div>
        <motion.div className="referral-availability" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .72 }}>
          <span><b className="live-dot"/> Websites · automation systems · combined builds</span>
          <em>Mumbai · working remotely</em>
        </motion.div>
      </div>
      <DualPreview/>
    </section>
  );
}

export function ReferralCapabilityRail() {
  const items = [...CAPABILITIES, ...CAPABILITIES];
  return <div className="referral-rail" aria-label="Capabilities"><div>{items.map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></div>;
}

function ServiceMark({ index }) {
  if (index === 0) return <svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M3.5 9h17M7 6.8h.1M9.5 6.8h.1"/></svg>;
  if (index === 1) return <svg viewBox="0 0 24 24"><path d="M5 18.5h14M6.5 15V6.5h11V15M9 10h6M9 12.8h4"/><path d="M8 18.5v-3.2h8v3.2"/></svg>;
  if (index === 2) return <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 16v-4M12 16V8M16 16v-7"/></svg>;
  if (index === 3) return <svg viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="11" rx="4"/><path d="M9 7V5.5M15 7V5.5M9 12h.1M15 12h.1M9.5 15h5"/></svg>;
  if (index === 4) return <svg viewBox="0 0 24 24"><circle cx="5.5" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18.5" cy="12" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7.2 10.9 10.3 7.2M13.7 7.2l3.1 3.7M16.8 13.1l-3.1 3.7M10.3 16.8l-3.1-3.7"/></svg>;
  return <svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="6" height="5" rx="1.4"/><rect x="14.5" y="5" width="6" height="5" rx="1.4"/><rect x="9" y="14" width="6" height="5" rx="1.4"/><path d="M9.5 7.5h5M7 10v2.5h5V14M17 10v2.5h-5"/></svg>;
}

function ServiceCard({ service, index }) {
  return (
    <motion.article
      className="referral-service-card balanced-service-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .2 }}
      transition={{ duration: .6, delay: (index % 3) * .045, ease: [.22,1,.36,1] }}
      whileHover={{ y: -4 }}
      data-cursor="VIEW"
    >
      <div className="service-card-head"><span>{service.n}</span><div className="referral-service-icon"><ServiceMark index={index}/></div></div>
      <h3>{service.title}</h3>
      <p>{service.body}</p>
      <small>{service.tag}</small>
    </motion.article>
  );
}

export function ReferralServices() {
  const web = SERVICES.filter((service) => service.pillar === "WEB");
  const ai = SERVICES.filter((service) => service.pillar === "AI SYSTEMS");
  return (
    <section className="section-shell section-pad referral-services balanced-services" id="services">
      <Reveal className="section-heading referral-heading">
        <div><span className="eyebrow"><span>02</span> TWO CORE CAPABILITIES</span><h2>Web experiences and AI systems. Equally serious.</h2></div>
        <p>One side makes the business clear, credible and easy to use. The other removes repetitive work and coordinates what happens behind the interface.</p>
      </Reveal>
      <div className="balanced-service-columns">
        <div className="service-pillar-group web-pillar">
          <div className="service-pillar-label"><span>WEB</span><b>DESIGN + DEVELOPMENT</b></div>
          {web.map((service, i) => <ServiceCard key={service.title} service={service} index={i}/>) }
        </div>
        <div className="service-pillar-group ai-pillar">
          <div className="service-pillar-label"><span>AI</span><b>AUTOMATION + ORCHESTRATION</b></div>
          {ai.map((service, i) => <ServiceCard key={service.title} service={service} index={i + 3}/>) }
        </div>
      </div>
    </section>
  );
}

export function ReferralProcess() {
  return (
    <section className="section-shell section-pad referral-process" id="process">
      <Reveal className="section-heading referral-heading">
        <div><span className="eyebrow"><span>04</span> HOW I WORK</span><h2>Design the experience. Architect the system.</h2></div>
        <p>The same process works whether the project is a website, an automation system, or both connected together.</p>
      </Reveal>
      <div className="referral-process-grid">
        {PROCESS.map(([n, title, body], i) => (
          <Reveal className="referral-process-step" key={title} delay={i * .04}>
            <span>{n}</span><h3>{title}</h3><p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ReferralAbout() {
  return (
    <section className="section-shell section-pad referral-about" id="about">
      <Reveal className="referral-about-copy">
        <span className="eyebrow"><span>05</span> ABOUT</span>
        <h2>Abu Hurera</h2>
        <p>I work at the intersection of web experience and business automation — designing the interface people see and architecting the AI-powered workflows running behind it. That means a project can stop at a premium website, go deep into orchestration, or combine both into one system.</p>
      </Reveal>
      <Reveal className="referral-about-meta" delay={.08}>
        <div><small>BASED IN</small><strong>Mumbai, India</strong></div>
        <div><small>WEB</small><strong>Design · Development · Web Apps</strong></div>
        <div><small>AI SYSTEMS</small><strong>Agents · Orchestration · Automation</strong></div>
      </Reveal>
    </section>
  );
}

export function ReferralCTA() {
  return (
    <section className="section-shell referral-cta" id="contact">
      <Reveal>
        <span className="eyebrow"><span>06</span> START A PROJECT</span>
        <h2>Website, AI system,<br/>or both?</h2>
        <p>Send me the problem. I’ll tell you what should be designed, what should be automated, and the cleanest way to connect it.</p>
        <MagneticLink href={CONTACT.whatsapp} className="primary-btn large" external>Discuss your project <span>↗</span></MagneticLink>
      </Reveal>
    </section>
  );
}

export function ReferralFooter() {
  return (
    <footer className="section-shell referral-footer">
      <div><strong>ABU HURERA</strong><span>WEB EXPERIENCES · AI SYSTEMS</span></div>
      <div><span>SHALCON INTELLIGENCE</span><span>MUMBAI, INDIA</span></div>
      <div><span>© 2026</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  );
}
