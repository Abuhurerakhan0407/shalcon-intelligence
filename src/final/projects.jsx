import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS, USE_CASES } from "./data.js";
import { Reveal } from "./ui.jsx";

export function ProjectVisual({ project }) {
  return (
    <motion.div
      key={project.id}
      className={`project-visual-inner visual-${project.kind}`}
      initial={{ opacity: 0, scale: 0.97, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pv-top"><span>{project.index}</span><span>{project.stage}</span></div>
      {project.kind === "network" && (
        <div className="network-art">
          <div className="network-core">S</div>
          {["AI", "CRM", "WA", "API", "BI"].map((x, i) => <span key={x} className={`net-node n${i + 1}`}>{x}</span>)}
          <svg viewBox="0 0 500 300"><path d="M250 150 L90 65 M250 150 L405 70 M250 150 L88 238 M250 150 L410 232 M250 150 L250 28" /></svg>
        </div>
      )}
      {project.kind === "dashboard" && (
        <div className="dash-art">
          <div className="dash-side"><i/><i/><i/><i/><i/></div>
          <div className="dash-main"><div className="dash-head"/><div className="dash-cards"><i/><i/><i/></div><div className="dash-chart"><b/><b/><b/><b/><b/><b/><b/></div><div className="dash-table"><span/><span/><span/><span/></div></div>
        </div>
      )}
      {project.kind === "layers" && (
        <div className="layer-art"><div className="mail-layer back"/><div className="mail-layer mid"/><div className="mail-layer front"><span>PAGE</span><b>VELOPE</b><i/></div><div className="layer-cursor">↗</div></div>
      )}
      {project.kind === "matrix" && (
        <div className="matrix-art">
          <div className="matrix-heading"><b>مدرسہ</b><span>OPERATIONS</span></div>
          <div className="matrix-grid">{Array.from({ length: 12 }).map((_, i) => <i key={i}><span/></i>)}</div>
          <div className="matrix-line" />
        </div>
      )}
      <div className="pv-bottom"><strong>{project.title}</strong><span>{project.category}</span></div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = itemRefs.current.map((node, index) => {
      if (!node) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(index); },
        { rootMargin: "-38% 0px -42% 0px", threshold: 0.01 }
      );
      observer.observe(node);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="section-shell section-pad projects-section" id="projects">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow"><span>04</span> CURRENTLY BUILDING</span>
          <h2>Real systems. Visible work.</h2>
        </div>
        <p>Products and operating systems I am actively building, selling or architecting — shown as capability, not dressed up as fake case studies.</p>
      </Reveal>
      <div className="projects-layout">
        <div className="project-sticky"><ProjectVisual project={PROJECTS[active]} /><div className="project-progress">{PROJECTS.map((p, i) => <span key={p.id} className={i === active ? "active" : ""}/>)}</div></div>
        <div className="project-list">
          {PROJECTS.map((project, i) => (
            <article key={project.id} ref={(el) => (itemRefs.current[i] = el)} className={`project-copy ${i === active ? "active" : ""}`}>
              <div className="project-meta"><span>{project.index}</span><span>{project.stage}</span></div>
              <h3>{project.title}</h3>
              <h4>{project.category}</h4>
              <p>{project.statement}</p>
              <div className="project-role"><small>MY ROLE</small><span>{project.role}</span></div>
              <div className="project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="mobile-project-visual"><ProjectVisual project={project} /></div>
            </article>
          ))}
          <div className="labs-row"><span>LABS / EXPERIMENTS</span><b>Software Factory</b><b>ClosrAI</b></div>
        </div>
      </div>
    </section>
  );
}

export function UseCases() {
  return (
    <section className="section-shell section-pad usecase-section">
      <Reveal className="section-heading compact">
        <div><span className="eyebrow"><span>05</span> BUSINESS USE CASES</span><h2>What can actually be automated?</h2></div>
        <p>Start with the event. Then design the response, the data movement and where a human should still decide.</p>
      </Reveal>
      <div className="usecase-list">
        {USE_CASES.map(([event, response], i) => (
          <Reveal key={event} className="usecase-row" delay={i * 0.025}>
            <span className="case-number">0{i + 1}</span><strong>{event}</strong><i><b/></i><span>{response}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
