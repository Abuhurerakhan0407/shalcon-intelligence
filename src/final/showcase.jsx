import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT, PROJECTS } from "./data.js";
import { MagneticLink, Reveal, useReducedMotionPreference } from "./ui.jsx";

gsap.registerPlugin(ScrollTrigger);

const WEB_SERVICES = [
  ["01", "Website Design + Development", "Strategy, UI direction and responsive development built as one coherent experience.", "UX / UI / DEVELOPMENT"],
  ["02", "Landing Pages + Portfolios", "Focused pages that explain the offer fast, build trust and make the next action obvious.", "CONVERSION / PERSONAL BRAND"],
  ["03", "Web Apps + Dashboards", "Interfaces, portals and internal tools for businesses that need useful software, not brochure screens.", "PRODUCT / OPERATIONS"],
];

const AI_SERVICES = [
  ["04", "AI Agents + Assistants", "Voice, chat and task agents that answer, qualify, retrieve context and trigger the next action.", "VOICE / CHAT / AGENTS"],
  ["05", "Workflow Orchestration", "Multiple automations, tools and agents sharing context so a full process moves as one system.", "MULTI-STEP / MULTI-TOOL"],
  ["06", "CRM + WhatsApp + API Automation", "Lead routing, follow-up, handoffs, notifications and data movement across the systems your team already uses.", "CRM / WHATSAPP / APIS"],
];

function SplitWord({ children, tone }) {
  return <span className={`aw-split-word ${tone}`}>{children}</span>;
}

export function AwardHero() {
  const reduced = useReducedMotionPreference();
  return (
    <section className="aw-hero" id="top">
      <div className="aw-hero-bg aw-hero-bg-web" />
      <div className="aw-hero-bg aw-hero-bg-ai" />
      <div className="aw-hero-seam" aria-hidden="true"><span /></div>
      <div className="section-shell aw-hero-inner">
        <motion.div className="aw-hero-kicker" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <span>ABU HURERA</span><b>WEB EXPERIENCE × AI SYSTEMS</b><em>MUMBAI / REMOTE</em>
        </motion.div>
        <div className="aw-hero-title">
          {["I BUILD WHAT", "PEOPLE SEE —", "AND WHAT", "BUSINESSES RUN ON."].map((line, i) => (
            <div className="aw-hero-line" key={line}>
              <motion.h1 initial={reduced ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .82, delay: .08 + i * .055, ease: [.16,1,.3,1] }}>
                {i === 1 ? <><SplitWord tone="web">PEOPLE SEE</SplitWord><span> —</span></> : i === 3 ? <SplitWord tone="ai">BUSINESSES RUN ON.</SplitWord> : line}
              </motion.h1>
            </div>
          ))}
        </div>
        <div className="aw-hero-bottom">
          <motion.p initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .42, duration: .7 }}>
            <strong className="web-text">Web design + development</strong> for the interface people experience. <strong className="ai-text">AI automation + orchestration</strong> for the work happening behind it.
          </motion.p>
          <motion.div className="aw-hero-actions" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .52, duration: .6 }}>
            <MagneticLink href={CONTACT.whatsapp} className="aw-main-cta" external data-cursor="START">Start a project <span>↗</span></MagneticLink>
            <a href="#duality" className="aw-scroll-link">Scroll the story <span>↓</span></a>
          </motion.div>
        </div>
        <div className="aw-domain-label aw-domain-label-web"><span>WEB</span><small>DESIGN / DEVELOPMENT / PRODUCT UI</small></div>
        <div className="aw-domain-label aw-domain-label-ai"><span>AI</span><small>AGENTS / AUTOMATION / ORCHESTRATION</small></div>
      </div>
    </section>
  );
}

export function DualityStory() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotionPreference();

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const stages = gsap.utils.toArray(".aw-duality-stage");
        gsap.set(stages.slice(1), { autoAlpha: 0, y: 24 });
        gsap.set(sectionRef.current, { "--split": "64%" });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=240%",
            pin: ".aw-duality-sticky",
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(sectionRef.current, { "--split": "62%", duration: 1 })
          .to(stages[0], { autoAlpha: 0, y: -22, duration: .35 }, .65)
          .to(stages[1], { autoAlpha: 1, y: 0, duration: .35 }, .82)
          .to(sectionRef.current, { "--split": "38%", duration: 1.2 }, .8)
          .to(".aw-duality-word-web", { xPercent: -16, opacity: .18, duration: 1 }, .8)
          .to(".aw-duality-word-ai", { xPercent: 8, opacity: .95, duration: 1 }, .8)
          .to(stages[1], { autoAlpha: 0, y: -22, duration: .35 }, 1.82)
          .to(stages[2], { autoAlpha: 1, y: 0, duration: .35 }, 2)
          .to(sectionRef.current, { "--split": "50%", duration: 1 }, 1.96)
          .to(".aw-duality-word-web", { xPercent: 0, opacity: .9, duration: 1 }, 1.96)
          .to(".aw-duality-word-ai", { xPercent: 0, opacity: .9, duration: 1 }, 1.96)
          .to(".aw-duality-bridge", { scaleX: 1, opacity: 1, duration: .7 }, 2.15);
      });
      return () => mm.revert();
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const stages = [
    ["01", "Design the experience.", "Clear hierarchy, sharp visual direction, responsive behavior and motion with a reason to exist.", "web"],
    ["02", "Orchestrate the work.", "Agents, CRM, WhatsApp, APIs and business rules coordinated as one system instead of scattered automations.", "ai"],
    ["03", "Connect both.", "The strongest build is often the interface customers touch connected directly to the system doing the work behind it.", "both"],
  ];

  return (
    <section className="aw-duality" id="duality" ref={sectionRef}>
      <div className="aw-duality-sticky">
        <div className="aw-duality-pane aw-duality-pane-web" />
        <div className="aw-duality-pane aw-duality-pane-ai" />
        <div className="aw-duality-grid" aria-hidden="true" />
        <div className="aw-duality-words" aria-hidden="true">
          <span className="aw-duality-word-web">DESIGN</span>
          <span className="aw-duality-word-ai">ORCHESTRATE</span>
        </div>
        <div className="aw-duality-bridge" aria-hidden="true"><i/><i/><i/><i/><i/></div>
        <div className="section-shell aw-duality-copy">
          <span className="aw-section-index">02 / DUALITY</span>
          <div className="aw-duality-stage-wrap">
            {stages.map(([n, title, body, tone], i) => (
              <div className={`aw-duality-stage ${tone}`} key={title}>
                <small>{n}</small>
                <h2>{title}</h2>
                <p>{body}</p>
                <span className="aw-stage-tag">{tone === "web" ? "WEB EXPERIENCE" : tone === "ai" ? "AI SYSTEM" : "INTERFACE × SYSTEM"}</span>
              </div>
            ))}
          </div>
          <div className="aw-duality-progress"><span>SCROLL</span><i><b/></i><em>03</em></div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ item, tone, index }) {
  const [n, title, body, tag] = item;
  return (
    <motion.article
      className={`aw-service-card ${tone}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .18 }}
      transition={{ duration: .68, delay: index * .045, ease: [.22,1,.36,1] }}
      whileHover={{ y: -5 }}
      data-cursor={tone === "web" ? "WEB" : "AI"}
      data-cursor-tone={tone}
    >
      <div className="aw-service-meta"><span>{n}</span><b>{tone === "web" ? "WEB" : "AI"}</b></div>
      <div className="aw-service-art" aria-hidden="true">
        <i/><i/><i/><i/>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <small>{tag}</small>
    </motion.article>
  );
}

export function AwardServices() {
  return (
    <section className="aw-services section-shell section-pad" id="services">
      <Reveal className="aw-section-head">
        <div><span className="aw-section-index">03 / SERVICES</span><h2>Two disciplines.<br/>One build partner.</h2></div>
        <p>Web and AI are treated as equal capabilities, with different visual languages and the same standard of execution.</p>
      </Reveal>
      <div className="aw-service-columns">
        <div className="aw-service-column web">
          <div className="aw-pillar-head"><span>WEB EXPERIENCE</span><small>WHAT PEOPLE SEE</small></div>
          {WEB_SERVICES.map((item, i) => <ServiceCard key={item[1]} item={item} tone="web" index={i} />)}
        </div>
        <div className="aw-service-column ai">
          <div className="aw-pillar-head"><span>AI SYSTEMS</span><small>WHAT THE BUSINESS RUNS ON</small></div>
          {AI_SERVICES.map((item, i) => <ServiceCard key={item[1]} item={item} tone="ai" index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectArt({ kind }) {
  if (kind === "network") return <div className="aw-project-art network"><b>S</b>{[0,1,2,3,4].map((i)=><i key={i}/>)}</div>;
  if (kind === "dashboard") return <div className="aw-project-art dashboard"><i/><i/><i/><i/><b/><b/></div>;
  if (kind === "layers") return <div className="aw-project-art layers"><i/><i/><i/><span/></div>;
  return <div className="aw-project-art matrix">{Array.from({ length: 12 }).map((_,i)=><i key={i}/>)}</div>;
}

export function AwardWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotionPreference();

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current || !trackRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const getDistance = () => Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 72);
        gsap.to(trackRef.current, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getDistance() + window.innerHeight * .7}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="aw-work" id="projects" ref={sectionRef}>
      <div className="aw-work-track" ref={trackRef}>
        <article className="aw-work-intro">
          <span className="aw-section-index">04 / SELECTED WORK</span>
          <h2>Projects where interface, software and systems meet.</h2>
          <p>Real products and active builds. No inflated case-study theatre.</p>
          <div className="aw-work-legend"><span className="web">WEB</span><span className="ai">AI / SYSTEMS</span></div>
        </article>
        {PROJECTS.map((project, i) => (
          <article className={`aw-project-card ${i % 2 === 0 ? "web" : "ai"}`} key={project.id} data-cursor="VIEW" data-cursor-tone={i % 2 === 0 ? "web" : "ai"}>
            <div className="aw-project-top"><span>{project.index}</span><b>{project.stage}</b></div>
            <ProjectArt kind={project.kind}/>
            <div className="aw-project-copy"><small>{project.category}</small><h3>{project.title}</h3><p>{project.statement}</p></div>
            <div className="aw-project-tags">{project.stack.slice(0,4).map(tag => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
        <article className="aw-work-outro"><span>INTERFACE</span><b>×</b><span>SYSTEM</span><p>Design the touchpoint. Orchestrate what happens next.</p></article>
      </div>
    </section>
  );
}

export function AwardApproach() {
  const steps = [
    ["01", "Frame", "Clarify the business, audience, offer, workflow and the result the build needs to create.", "web"],
    ["02", "Design", "Structure the interface, hierarchy, visual system and interaction model before adding polish.", "web"],
    ["03", "Orchestrate", "Map triggers, data, agents, integrations and human handoffs so the automation behaves like a system.", "ai"],
    ["04", "Build + Launch", "Connect front end and back end, test real devices and edge cases, then ship the smallest complete version.", "both"],
  ];
  return (
    <section className="aw-approach section-shell section-pad" id="approach">
      <Reveal className="aw-section-head"><div><span className="aw-section-index">05 / APPROACH</span><h2>From first screen<br/>to final handoff.</h2></div><p>The process stays compact: understand, design, orchestrate, build and test the real experience.</p></Reveal>
      <div className="aw-approach-grid">
        {steps.map(([n,title,body,tone], i)=>(
          <motion.article className={`aw-approach-step ${tone}`} key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration:.65, delay:i*.05 }}>
            <span>{n}</span><h3>{title}</h3><p>{body}</p><i/>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function AwardAbout() {
  return (
    <section className="aw-about section-shell section-pad" id="about">
      <Reveal className="aw-about-main"><span className="aw-section-index">06 / ABOUT</span><h2>I sit between design and systems.</h2><p>I design websites, web apps and digital experiences, then build the automations, agents and orchestration behind the workflows when the business needs more than a front end.</p></Reveal>
      <Reveal className="aw-about-side" delay={.08}>
        <div><small>BASE</small><strong>Mumbai, India</strong></div>
        <div><small>WEB</small><strong>UI / UX · Development · Product</strong></div>
        <div><small>AI</small><strong>Agents · Automation · Orchestration</strong></div>
        <div><small>WORK STYLE</small><strong>Direct · experimental · detail-led</strong></div>
      </Reveal>
    </section>
  );
}

export function AwardCTA() {
  return (
    <section className="aw-cta" id="contact">
      <div className="aw-cta-web"/><div className="aw-cta-ai"/>
      <div className="section-shell aw-cta-inner">
        <Reveal>
          <span className="aw-section-index">07 / START</span>
          <h2><span className="web-text">Need the website,</span><br/><span className="ai-text">the system, or both?</span></h2>
          <p>Send the brief. I’ll tell you what should be designed, what should be automated, and what should stay human.</p>
          <MagneticLink href={CONTACT.whatsapp} className="aw-main-cta" external data-cursor="START">Discuss the project <span>↗</span></MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}

export function AwardFooter() {
  return <footer className="aw-footer section-shell"><div><strong>ABU HURERA</strong><span>WEB EXPERIENCE × AI SYSTEMS</span></div><div><span>SHALCON INTELLIGENCE</span><span>MUMBAI / REMOTE</span></div><div><span>© 2026</span><a href="#top">BACK TO TOP ↑</a></div></footer>;
}
