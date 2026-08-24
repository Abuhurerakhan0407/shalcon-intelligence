import { motion } from "framer-motion";
import { CAPABILITIES, CONTACT, PROCESS, SERVICES } from "./data.js";
import { MagneticLink, Reveal, useReducedMotionPreference } from "./ui.jsx";

function WebsitePreview() {
  return (
    <motion.div
      className="referral-preview"
      initial={{ opacity: 0, y: 26, scale: .985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: .9, delay: .28, ease: [.16, 1, .3, 1] }}
      data-cursor="VIEW"
    >
      <div className="preview-bar"><span/><span/><span/><b>abuhurera / build</b></div>
      <div className="preview-page">
        <div className="preview-nav"><strong>AH</strong><i/><i/><i/></div>
        <div className="preview-hero-copy">
          <small>DESIGN / DEVELOPMENT</small>
          <h3>Clean interface.<br/>Clear message.</h3>
          <p>Built to look credible on the first scroll.</p>
          <span>START PROJECT ↗</span>
        </div>
        <div className="preview-grid"><i/><i/><i/></div>
        <div className="preview-signal"/>
      </div>
      <div className="preview-note"><span className="live-dot"/> responsive / fast / custom</div>
    </motion.div>
  );
}

export function ReferralHero() {
  const reduced = useReducedMotionPreference();
  return (
    <section className="referral-hero section-shell" id="top">
      <div className="referral-hero-copy">
        <motion.div className="eyebrow" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .08 }}>
          <span>01</span> WEB DESIGN · DEVELOPMENT · AI
        </motion.div>
        <div className="referral-title-wrap">
          {["I DESIGN & BUILD", "WEBSITES THAT FEEL", "CLEAR, FAST & PREMIUM."].map((line, i) => (
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
          Websites, landing pages and web apps for businesses that need to <strong>look credible, explain themselves clearly and convert attention into action.</strong> AI and automation when the workflow actually needs it.
        </motion.p>
        <motion.div className="referral-actions" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .56 }}>
          <MagneticLink href={CONTACT.whatsapp} className="primary-btn" external>Start a website project <span>↗</span></MagneticLink>
          <a href="#projects" className="text-link" data-cursor="WORK">View selected work <span>↓</span></a>
        </motion.div>
        <motion.div className="referral-availability" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .72 }}>
          <span><b className="live-dot"/> Available for referrals, redesigns and new builds</span>
          <em>Mumbai · working remotely</em>
        </motion.div>
      </div>
      <WebsitePreview/>
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
  return <svg viewBox="0 0 24 24"><circle cx="7" cy="12" r="2.2"/><circle cx="17" cy="7" r="2.2"/><circle cx="17" cy="17" r="2.2"/><path d="M9.2 11l5.6-3M9.2 13l5.6 3"/></svg>;
}

export function ReferralServices() {
  return (
    <section className="section-shell section-pad referral-services" id="services">
      <Reveal className="section-heading referral-heading">
        <div><span className="eyebrow"><span>02</span> WHAT I CAN BUILD</span><h2>Everything needed to go from idea to live website.</h2></div>
        <p>No handoff maze. Structure, UI direction, responsive development, interactions and launch stay inside one build.</p>
      </Reveal>
      <div className="referral-service-grid">
        {SERVICES.map((service, i) => (
          <motion.article
            className="referral-service-card"
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .2 }}
            transition={{ duration: .6, delay: i * .04, ease: [.22,1,.36,1] }}
            whileHover={{ y: -4 }}
            data-cursor="VIEW"
          >
            <div className="service-card-head"><span>{service.n}</span><div className="referral-service-icon"><ServiceMark index={i}/></div></div>
            <h3>{service.title}</h3>
            <p>{service.body}</p>
            <small>{service.tag}</small>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function ReferralProcess() {
  return (
    <section className="section-shell section-pad referral-process" id="process">
      <Reveal className="section-heading referral-heading">
        <div><span className="eyebrow"><span>04</span> HOW I WORK</span><h2>A simple process. No agency maze.</h2></div>
        <p>Enough structure to keep the project sharp, without turning a website into three weeks of meetings.</p>
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
        <p>I design and build websites, web apps and AI-powered systems for businesses that need something sharper than a template. The goal is simple: make the business easier to understand, easier to trust and easier to act on.</p>
      </Reveal>
      <Reveal className="referral-about-meta" delay={.08}>
        <div><small>BASED IN</small><strong>Mumbai, India</strong></div>
        <div><small>FOCUS</small><strong>Web · Product · Automation</strong></div>
        <div><small>WORKING STYLE</small><strong>Direct · fast · detail-led</strong></div>
      </Reveal>
    </section>
  );
}

export function ReferralCTA() {
  return (
    <section className="section-shell referral-cta" id="contact">
      <Reveal>
        <span className="eyebrow"><span>06</span> START A PROJECT</span>
        <h2>Need a website?<br/>Send me the brief.</h2>
        <p>I’ll tell you what I’d build, what I’d remove, and the cleanest way to get it live.</p>
        <MagneticLink href={CONTACT.whatsapp} className="primary-btn large" external>Discuss your website <span>↗</span></MagneticLink>
      </Reveal>
    </section>
  );
}

export function ReferralFooter() {
  return (
    <footer className="section-shell referral-footer">
      <div><strong>ABU HURERA</strong><span>WEB DESIGN · DEVELOPMENT · AI SYSTEMS</span></div>
      <div><span>SHALCON INTELLIGENCE</span><span>MUMBAI, INDIA</span></div>
      <div><span>© 2026</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  );
}
