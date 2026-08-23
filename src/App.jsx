import { useEffect, useMemo, useRef, useState } from "react";

const CONTACT = {
  email: "shalconintelligence@gmail.com",
  whatsapp: "https://wa.me/919833001193",
  linkedin: "https://www.linkedin.com/in/shalcon-intelligence-a6b999407",
  calendly: "https://calendly.com/shalconintelligence/30min",
};

const capabilities = [
  "AI Agents",
  "Multi-Agent Systems",
  "Business Automation",
  "Workflow Orchestration",
  "CRM + WhatsApp",
  "API Integrations",
  "Internal Tools",
  "AI SaaS",
  "Data + Reporting",
];

const services = [
  {
    id: "agents",
    index: "01",
    title: "AI Agents",
    desc: "Voice, chat, support and knowledge agents that handle real work, keep context and escalate when a human should take over.",
    example: "Intake · Support · Booking · Qualification",
    size: "wide",
  },
  {
    id: "orchestration",
    index: "02",
    title: "Workflow Orchestration",
    desc: "Multiple workflows, agents and tools coordinated as one system instead of isolated automations that stop talking to each other.",
    example: "Triggers · Routing · Retries · Human handoff",
    size: "tall",
  },
  {
    id: "crm",
    index: "03",
    title: "CRM + WhatsApp Systems",
    desc: "Lead capture, qualification, follow-ups, reminders, pipeline updates and handoffs connected across the customer journey.",
    example: "WhatsApp · CRM · Email · Calendar",
    size: "small",
  },
  {
    id: "tools",
    index: "04",
    title: "Internal Tools + Web Apps",
    desc: "Purpose-built dashboards, portals and operational tools for processes that generic software cannot handle cleanly.",
    example: "Portals · Dashboards · Admin tools",
    size: "small",
  },
  {
    id: "saas",
    index: "05",
    title: "AI SaaS + Custom Software",
    desc: "From product concept to production software: multi-tenant apps, AI features, business logic and the systems behind them.",
    example: "SaaS · ERP · AI products · APIs",
    size: "wide",
  },
  {
    id: "data",
    index: "06",
    title: "Data + Reporting",
    desc: "Data pipelines and reporting that show what automation completed, what failed and where the business needs attention.",
    example: "Sync · Reporting · Alerts · Insights",
    size: "small",
  },
];

const projects = [
  {
    number: "01",
    name: "Edqora",
    type: "K–12 School ERP / SIS",
    stage: "Live + selling",
    intro: "A full school operations platform built for admissions, academics, fees, staff, communication and daily administration.",
    role: "Product strategy, system design, automation, web and go-to-market.",
    systems: ["Student Information", "Admissions", "Fees + Accounting", "Attendance", "Exams", "HR + Payroll", "Transport", "Parent Portal"],
    signal: "BUSINESS SOFTWARE",
  },
  {
    number: "02",
    name: "Pagevelope",
    type: "Visual Email Design SaaS",
    stage: "In development",
    intro: "A design-first platform for building animated, email-safe campaigns and exporting them into real ecommerce marketing workflows.",
    role: "Product concept, UX architecture, SaaS system design and build orchestration.",
    systems: ["Visual Builder", "Compatibility Testing", "Animation Controls", "Preview", "Exports", "Campaign History"],
    signal: "DESIGN + SAAS",
  },
  {
    number: "03",
    name: "Madarsa ERP",
    type: "Urdu-first Institution ERP",
    stage: "In development",
    intro: "A customizable ERP for madarsas and Urdu-medium institutions, covering academics, finance, people and administration in one system.",
    role: "Product architecture, data model, workflow design and implementation planning.",
    systems: ["Students", "Fees", "Attendance", "Exams", "Staff", "Hostel", "Library", "Urdu-first UX"],
    signal: "VERTICAL ERP",
  },
  {
    number: "04",
    name: "AI Software Factory",
    type: "Agentic Build Infrastructure",
    stage: "R&D / active build",
    intro: "An internal system for turning scoped product work into coordinated planning, implementation, review and deployment workflows.",
    role: "Agent orchestration, workflow architecture, tooling and deployment design.",
    systems: ["Mission Control", "Planning Agents", "Execution", "Human Gates", "GitHub", "Vercel", "Observability"],
    signal: "AGENT SYSTEMS",
  },
];

const useCases = [
  ["New lead arrives", "Qualify, enrich, route and update CRM"],
  ["Missed call", "Trigger AI follow-up and booking flow"],
  ["Form submitted", "Validate, sync systems and notify owner"],
  ["Document received", "Extract data and start the next workflow"],
  ["Customer asks a question", "Answer instantly or escalate with context"],
  ["Meeting gets booked", "Prepare records, reminders and handoff"],
  ["Report is due", "Generate and deliver the latest operational view"],
];

const industries = [
  { name: "Healthcare", text: "Patient intake, appointment workflows, support and operational follow-up.", code: "HC" },
  { name: "EdTech", text: "Admissions, student operations, fee reminders and support systems.", code: "ED" },
  { name: "Insurance", text: "Lead qualification, renewals, documents, claims intake and follow-up.", code: "IN" },
  { name: "E-commerce", text: "Support, cart recovery, customer operations and lifecycle automation.", code: "EC" },
  { name: "HR", text: "Screening, scheduling, onboarding, documents and internal workflows.", code: "HR" },
  { name: "Real Estate", text: "Lead routing, qualification, follow-up, booking and CRM operations.", code: "RE" },
  { name: "Custom Workflows", text: "When your business process does not fit a template, we design the system around it.", code: "++" },
];

const production = [
  ["01", "Human escalation", "AI knows when confidence is low, risk is high or a person simply needs to take over."],
  ["02", "System integration", "CRM, messaging, APIs, databases and internal tools share context instead of becoming new silos."],
  ["03", "Failure handling", "Retries, fallbacks and exception paths are designed before the happy path gets celebrated."],
  ["04", "Monitoring", "You can see what ran, what failed, what was handed off and where the workflow needs improvement."],
];

const process = [
  ["01", "Audit", "Understand the repetitive work, bottlenecks, systems and edge cases."],
  ["02", "Architect", "Map agents, workflows, data, integrations and human checkpoints."],
  ["03", "Build", "Implement the automation, software and interfaces as one system."],
  ["04", "Deploy", "Test real workflows, permissions, failures and handoffs before rollout."],
  ["05", "Improve", "Measure, refine and expand only where the system earns it."],
];

const assistantTopics = {
  start: ["What does Abu build?", "Show current projects", "How can AI automate my business?", "What industries do you work with?", "How does a project start?"],
  work: ["Explain workflow orchestration", "Can you build custom software?", "Do you only build chatbots?", "What can be automated?", "Show current projects"],
  projects: ["Tell me about Edqora", "What is Pagevelope?", "What is Madarsa ERP?", "What is the AI Software Factory?", "What does this prove?"],
  process: ["What happens in an audit?", "How do you handle failures?", "Can you use my existing tools?", "How do humans stay in control?", "How do I start?"],
};

function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    if (!nodes.length) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

function SmoothCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia?.("(pointer: coarse)")?.matches) return;
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor) return;
    let tx = -100;
    let ty = -100;
    let x = tx;
    let y = ty;
    let raf = 0;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target.closest?.("[data-cursor]");
      const text = target?.getAttribute("data-cursor") || "";
      cursor.classList.toggle("cursor-active", Boolean(target));
      if (label) label.textContent = text;
    };
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
}

function FloatingNav() {
  const [visible, setVisible] = useState(true);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 36);
      setVisible(y < 120 || y < last || Math.abs(y - last) < 8);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <header className={`nav-shell ${compact ? "compact" : ""} ${visible ? "shown" : "hidden"}`}>
        <button className="brand" onClick={() => go("#top")} data-cursor="TOP" aria-label="Back to top">
          <span className="brand-mark">A</span>
          <span className="brand-copy"><strong>ABU HURERA</strong><small>AI SYSTEMS + AUTOMATION</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => go("#work")}>Work</button>
          <button onClick={() => go("#systems")}>Systems</button>
          <button onClick={() => go("#about")}>About</button>
          <a className="nav-cta" href={CONTACT.calendly} target="_blank" rel="noreferrer" data-cursor="BOOK">Discuss a project <span>↗</span></a>
        </nav>
        <button className="mobile-menu-button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label="Toggle menu">
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => go("#work")}>01 / Work</button>
        <button onClick={() => go("#systems")}>02 / Systems</button>
        <button onClick={() => go("#projects")}>03 / Projects</button>
        <button onClick={() => go("#about")}>04 / About</button>
        <a href={CONTACT.calendly} target="_blank" rel="noreferrer">Discuss a project ↗</a>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow glow-a" aria-hidden="true" />
      <div className="hero-glow glow-b" aria-hidden="true" />
      <div className="section-inner hero-inner">
        <div className="hero-kicker" data-reveal>
          <span className="status-dot" /> AVAILABLE FOR SELECT PROJECTS
        </div>
        <h1 className="hero-title" data-reveal>
          I BUILD <span>AI-POWERED</span><br />BUSINESS SYSTEMS.
        </h1>
        <div className="hero-bottom" data-reveal>
          <p className="hero-copy">
            I design and build end-to-end systems that connect AI agents, workflows, software, data and human teams — so repetitive work stops living in somebody’s browser tabs.
          </p>
          <div className="hero-actions">
            <a href={CONTACT.calendly} target="_blank" rel="noreferrer" className="primary-button magnetic" data-cursor="START">
              Discuss a project <span>↗</span>
            </a>
            <button className="text-button" onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })} data-cursor="SCROLL">
              See what I build <span>↓</span>
            </button>
          </div>
        </div>
        <div className="hero-foot" data-reveal>
          <span>FOUNDER / SHALCON INTELLIGENCE</span>
          <span>MUMBAI, INDIA</span>
          <span className="hero-foot-personality">LESS TAB JUGGLING. MORE WORK FINISHING.</span>
        </div>
      </div>
    </section>
  );
}

function CapabilityRail() {
  const doubled = [...capabilities, ...capabilities];
  return (
    <div className="capability-rail" aria-label="Capabilities">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`}><b>{item}</b><i>✦</i></span>
        ))}
      </div>
    </div>
  );
}

function ServiceVisual({ id }) {
  if (id === "orchestration") {
    return (
      <div className="mini-orbit" aria-hidden="true">
        <span className="orbit-center">AI</span>
        <span className="orbit-node n1">CRM</span>
        <span className="orbit-node n2">API</span>
        <span className="orbit-node n3">MSG</span>
      </div>
    );
  }
  if (id === "agents") {
    return (
      <div className="voice-bars" aria-hidden="true">
        {[24, 52, 80, 38, 68, 92, 44, 74, 58, 30, 65, 42].map((h, i) => <span key={i} style={{ height: `${h}%`, animationDelay: `${i * -0.08}s` }} />)}
      </div>
    );
  }
  if (id === "crm") {
    return <div className="mini-flow" aria-hidden="true"><span>LEAD</span><i>→</i><span>CRM</span><i>→</i><span>FOLLOW-UP</span></div>;
  }
  if (id === "tools") {
    return <div className="mini-ui" aria-hidden="true"><div /><div /><div /><div /></div>;
  }
  if (id === "saas") {
    return <div className="mini-stack" aria-hidden="true"><span>PRODUCT</span><span>LOGIC</span><span>DATA</span><span>AI</span></div>;
  }
  return <div className="mini-chart" aria-hidden="true"><span style={{ height: "35%" }} /><span style={{ height: "58%" }} /><span style={{ height: "47%" }} /><span style={{ height: "82%" }} /><span style={{ height: "72%" }} /></div>;
}

function WhatIBuild() {
  return (
    <section className="section" id="work">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <div className="eyebrow">01 / WHAT I BUILD</div>
          <h2>Systems, not random automations.</h2>
          <p>I can build individual agents or tools. The real value usually appears when they share context, data and responsibility.</p>
        </div>
        <div className="service-bento">
          {services.map((service) => (
            <article className={`service-card ${service.size}`} key={service.id} data-reveal data-cursor="EXPLORE">
              <div className="card-glow" aria-hidden="true" />
              <div className="service-top"><span>{service.index}</span><span className="service-plus">+</span></div>
              <ServiceVisual id={service.id} />
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <small>{service.example}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemFlow() {
  const nodes = [
    ["flow-lead", "LEAD", "16%", "15%"],
    ["flow-agent", "AI AGENT", "42%", "32%"],
    ["flow-orch", "ORCHESTRATOR", "70%", "50%"],
    ["flow-crm", "CRM", "26%", "74%"],
    ["flow-wa", "WHATSAPP", "50%", "78%"],
    ["flow-api", "APIs", "74%", "74%"],
    ["flow-human", "HUMAN", "88%", "90%"],
  ];
  return (
    <section className="section system-section" id="systems">
      <div className="section-inner">
        <div className="section-heading split-heading" data-reveal>
          <div><div className="eyebrow">02 / ORCHESTRATION</div><h2>Everything should talk to everything.</h2></div>
          <p>I don’t just build a chatbot and leave. I design the flow around the business — what starts it, what each system does, where data moves and when a human takes control.</p>
        </div>
        <div className="system-canvas" data-reveal>
          <div className="canvas-grid" aria-hidden="true" />
          <svg className="beam-map" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            <path d="M180 90 C260 110 310 145 420 170" />
            <path d="M490 188 C560 210 610 245 705 260" />
            <path d="M715 280 C590 330 440 365 270 385" />
            <path d="M720 282 C650 340 580 380 510 405" />
            <path d="M735 278 C760 330 775 355 770 385" />
            <path d="M785 395 C835 420 865 435 890 470" />
          </svg>
          <svg className="beam-map pulse" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            <path d="M180 90 C260 110 310 145 420 170" />
            <path d="M490 188 C560 210 610 245 705 260" />
            <path d="M715 280 C590 330 440 365 270 385" />
            <path d="M720 282 C650 340 580 380 510 405" />
            <path d="M735 278 C760 330 775 355 770 385" />
            <path d="M785 395 C835 420 865 435 890 470" />
          </svg>
          {nodes.map(([id, label, left, top]) => (
            <div className={`flow-node ${id}`} style={{ left, top }} key={id}>
              <span>{label}</span>
              <i />
            </div>
          ))}
          <div className="system-caption">
            <span>TRIGGER</span><i>→</i><span>DECISION</span><i>→</i><span>ACTION</span><i>→</i><span>DATA</span><i>→</i><span>HUMAN</span>
          </div>
        </div>
        <div className="system-note" data-reveal>
          <strong>No magic wand.</strong> Just well-connected systems with clear responsibilities.
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className="project-visual-shell">
      <div className="project-visual-top"><span>{project.signal}</span><span className="live-dot" />{project.stage.toUpperCase()}</div>
      <div className="project-display">
        <div className="project-display-header"><span>{project.name}</span><i>↗</i></div>
        <div className="project-display-body">
          <div className="project-side-rail"><span /><span /><span /><span /></div>
          <div className="project-dashboard">
            <div className="dash-hero"><small>SYSTEM</small><strong>{project.type}</strong></div>
            <div className="dash-grid">
              {project.systems.slice(0, 6).map((item, i) => <div key={item} className={`dash-cell c${i}`}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b></div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="project-visual-foot"><span>PRODUCT / SYSTEM DESIGN</span><span>{project.number} / 04</span></div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number(visible.target.dataset.index));
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-20% 0px -30% 0px" }
    );
    refs.current.forEach((node) => node && io.observe(node));
    return () => io.disconnect();
  }, []);
  return (
    <section className="section projects-section" id="projects">
      <div className="section-inner">
        <div className="section-heading split-heading" data-reveal>
          <div><div className="eyebrow">03 / CURRENTLY BUILDING</div><h2>Current projects are the proof.</h2></div>
          <p>No invented case studies. These are products and systems I’m actively building, operating or taking to market — and the work shows what I can actually handle.</p>
        </div>
        <div className="projects-desktop">
          <div className="projects-sticky"><ProjectVisual project={projects[active]} /></div>
          <div className="projects-copy-column">
            {projects.map((project, i) => (
              <article className={`project-story ${active === i ? "active" : ""}`} key={project.name} data-index={i} ref={(node) => (refs.current[i] = node)}>
                <div className="project-meta"><span>{project.number}</span><span>{project.stage}</span></div>
                <h3>{project.name}</h3>
                <h4>{project.type}</h4>
                <p>{project.intro}</p>
                <div className="project-role"><small>MY ROLE</small><span>{project.role}</span></div>
                <div className="project-tags">{project.systems.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
        <div className="projects-mobile">
          {projects.map((project) => (
            <article className="project-mobile-card" key={project.name} data-reveal>
              <ProjectVisual project={project} />
              <div className="project-mobile-copy">
                <div className="project-meta"><span>{project.number}</span><span>{project.stage}</span></div>
                <h3>{project.name}</h3><h4>{project.type}</h4><p>{project.intro}</p>
                <div className="project-role"><small>MY ROLE</small><span>{project.role}</span></div>
                <div className="project-tags">{project.systems.slice(0, 6).map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="section usecase-section">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <div className="eyebrow">04 / REAL BUSINESS USE</div>
          <h2>What can actually be automated?</h2>
          <p>Start with an event. Decide what should happen next. Connect the systems. Keep a human available for judgment.</p>
        </div>
        <div className="usecase-table" data-reveal>
          <div className="usecase-head"><span>WHEN THIS HAPPENS</span><span>SYSTEM DOES THIS</span></div>
          {useCases.map(([trigger, action], i) => (
            <div className="usecase-row" key={trigger}>
              <span className="row-index">{String(i + 1).padStart(2, "0")}</span>
              <strong>{trigger}</strong>
              <i>→</i>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="section industries-section">
      <div className="section-inner">
        <div className="section-heading split-heading" data-reveal>
          <div><div className="eyebrow">05 / INDUSTRIES</div><h2>Built around the workflow, not the label.</h2></div>
          <p>I work most naturally where teams deal with repetitive communication, handoffs, records and operational follow-up. Custom industries are welcome.</p>
        </div>
        <div className="industry-grid">
          {industries.map((industry, i) => (
            <article className={`industry-card ${i === industries.length - 1 ? "industry-wide" : ""}`} key={industry.name} data-reveal data-cursor="VIEW">
              <span className="industry-code">{industry.code}</span>
              <div><h3>{industry.name}</h3><p>{industry.text}</p></div>
              <span className="industry-arrow">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductionReady() {
  return (
    <section className="section production-section">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <div className="eyebrow">06 / PRODUCTION THINKING</div>
          <h2>Built for real business operations.</h2>
          <p>A workflow is not finished when the happy path works once.</p>
        </div>
        <div className="production-grid">
          {production.map(([num, title, text]) => (
            <article className="production-card" key={title} data-reveal>
              <div className="border-beam" aria-hidden="true" />
              <span>{num}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section">
      <div className="section-inner">
        <div className="section-heading split-heading" data-reveal>
          <div><div className="eyebrow">07 / HOW I WORK</div><h2>From messy process to working system.</h2></div>
          <p>Five steps. Not fifteen meetings.</p>
        </div>
        <div className="timeline">
          {process.map(([num, title, text], i) => (
            <article className="timeline-item" key={title} data-reveal>
              <div className="timeline-axis"><span>{num}</span>{i < process.length - 1 && <i />}</div>
              <div className="timeline-copy"><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const start = prev.current;
    const diff = value - start;
    const duration = 420;
    let startTime;
    let raf;
    const tick = (t) => {
      if (!startTime) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + diff * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>₹{Math.max(0, display).toLocaleString("en-IN")}</>;
}

function ROICalculator() {
  const [people, setPeople] = useState(4);
  const [hours, setHours] = useState(8);
  const [hourly, setHourly] = useState(350);
  const monthly = Math.round(people * hours * hourly * 4.33);
  return (
    <section className="section roi-section" id="roi">
      <div className="section-inner roi-grid">
        <div className="roi-copy" data-reveal>
          <div className="eyebrow">08 / MANUAL WORK CALCULATOR</div>
          <h2>What is repetitive work costing you?</h2>
          <p>This is not a sales quote. It is a quick way to put a number on recurring manual effort before deciding whether automation is worth discussing.</p>
          <small>Adjust three inputs. No signup. No mysterious “AI score”.</small>
        </div>
        <div className="calculator" data-reveal>
          <label><span>People doing the task</span><b>{people}</b><input type="range" min="1" max="30" value={people} onChange={(e) => setPeople(Number(e.target.value))} /></label>
          <label><span>Hours per person / week</span><b>{hours}h</b><input type="range" min="1" max="40" value={hours} onChange={(e) => setHours(Number(e.target.value))} /></label>
          <label><span>Approx. hourly cost</span><b>₹{hourly.toLocaleString("en-IN")}</b><input type="range" min="100" max="2500" step="50" value={hourly} onChange={(e) => setHourly(Number(e.target.value))} /></label>
          <div className="roi-result"><small>ESTIMATED MONTHLY MANUAL COST</small><strong><AnimatedNumber value={monthly} /></strong><span>≈ ₹{Math.round(monthly * 12).toLocaleString("en-IN")} / year</span></div>
          <a href={CONTACT.calendly} target="_blank" rel="noreferrer" className="secondary-button" data-cursor="DISCUSS">See what can be automated <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-inner about-grid">
        <div className="about-visual" data-reveal>
          <div className="portrait-card">
            <div className="portrait-orbit" />
            <div className="portrait-monogram">AH</div>
            <div className="portrait-meta"><span>ABU HURERA</span><span>MUMBAI / IN</span></div>
          </div>
        </div>
        <div className="about-copy" data-reveal>
          <div className="eyebrow">09 / ABOUT</div>
          <h2>Builder first. Tool collector second.</h2>
          <p className="about-lead">I’m Abu Hurera, founder of Shalcon Intelligence. I work across AI automation, product systems and web development.</p>
          <p>My focus is not “adding AI” to a business. It is understanding how work moves, where it gets stuck, and then building a system that makes the process simpler, faster and easier to operate.</p>
          <div className="about-skills">
            <span>AI Agents</span><span>Multi-Agent Systems</span><span>Workflow Orchestration</span><span>Web Apps</span><span>Internal Tools</span><span>AI SaaS</span><span>ERP Systems</span><span>Integrations</span>
          </div>
          <div className="about-links"><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${CONTACT.email}`}>Email ↗</a></div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section final-cta">
      <div className="cta-lamp" aria-hidden="true" />
      <div className="section-inner" data-reveal>
        <div className="eyebrow">10 / START A CONVERSATION</div>
        <h2>Have a process your team should not be doing manually?</h2>
        <p>Show me how it works today. I’ll help separate what should be automated, what should stay human and what the system actually needs.</p>
        <div className="cta-actions">
          <a href={CONTACT.calendly} target="_blank" rel="noreferrer" className="primary-button" data-cursor="START">Discuss a project <span>↗</span></a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="text-button">WhatsApp <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section-inner footer-grid">
        <div><strong>ABU HURERA</strong><span>Founder — Shalcon Intelligence</span></div>
        <div><span>AI AUTOMATION</span><span>PRODUCT SYSTEMS</span><span>WEB DEVELOPMENT</span></div>
        <div><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={`mailto:${CONTACT.email}`}>EMAIL ↗</a><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">WHATSAPP ↗</a></div>
        <div className="footer-end"><span>MUMBAI, INDIA</span><span>© 2026</span></div>
      </div>
    </footer>
  );
}

function answerAssistant(input) {
  const q = input.toLowerCase();
  if (q.includes("edqora")) return ["Edqora is a K–12 school ERP/SIS covering admissions, fees, attendance, exams, HR, transport and parent-facing operations. Abu works across product, automation, web and go-to-market.", "projects"];
  if (q.includes("pagevelope")) return ["Pagevelope is a visual email-design SaaS for building animated, email-safe campaigns, testing compatibility and exporting campaigns into ecommerce marketing workflows.", "projects"];
  if (q.includes("madarsa")) return ["Madarsa ERP is an Urdu-first, customizable institution management system for students, fees, attendance, exams, staff, hostel, library and administration.", "projects"];
  if (q.includes("software factory") || q.includes("factory")) return ["The AI Software Factory is an internal agentic build system: mission control, planning, execution, human approval gates, GitHub, deployment and observability working together.", "projects"];
  if (q.includes("orchestration") || q.includes("multi-agent") || q.includes("multiple")) return ["Workflow orchestration means the agent is not the whole product. A trigger starts a process, agents make or support decisions, CRMs/APIs/messaging systems act, data stays synced, failures have fallback paths and humans can take over with context.", "work"];
  if (q.includes("chatbot") || q.includes("only")) return ["No. Chatbots are one surface. Abu also builds voice agents, multi-agent systems, CRM/WhatsApp automation, API integrations, internal tools, web apps, AI SaaS, ERPs, data flows and end-to-end business automation.", "work"];
  if (q.includes("custom software") || q.includes("web app") || q.includes("saas")) return ["Yes. Custom software is part of the work: internal dashboards, portals, AI SaaS, ERP-style systems and workflow-specific web apps when off-the-shelf software does not fit the operation.", "work"];
  if (q.includes("industry") || q.includes("industries")) return ["Common areas include healthcare, EdTech, insurance, ecommerce, HR and real estate. The better filter is workflow fit: repetitive communication, handoffs, records, follow-ups and multi-system operations.", "work"];
  if (q.includes("failure") || q.includes("reliab")) return ["Production workflows need retries, fallbacks, logging, permissions and clear human escalation. A demo that works once is not the same thing as a business system you can rely on.", "process"];
  if (q.includes("human") || q.includes("control")) return ["Humans stay in the loop where judgment matters. The system can route low-confidence cases, approvals, exceptions or high-risk actions to the right person with the context already prepared.", "process"];
  if (q.includes("audit") || q.includes("start") || q.includes("project")) return ["A project starts by mapping the current process: people, tools, inputs, repetitive steps, bottlenecks and edge cases. From there Abu defines what should be automated, what should remain human and how the pieces connect.", "process"];
  if (q.includes("automate") || q.includes("automation") || q.includes("what can")) return ["Good automation candidates are repetitive, rule-heavy and cross-system: lead qualification, follow-ups, CRM updates, document extraction, appointment flows, reminders, support triage, reporting and internal handoffs.", "work"];
  if (q.includes("current") || q.includes("proof") || q.includes("build")) return ["Current work includes Edqora, Pagevelope, Madarsa ERP and an AI Software Factory. They show product architecture, vertical software, AI workflows, automation and system orchestration — without pretending unfinished work is a testimonial.", "projects"];
  return ["Abu builds AI-powered business systems: agents, workflows, software, integrations and data working together. Pick a topic below and I’ll keep it useful — buzzword bingo not included.", "start"];
}

function AbuAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [topic, setTopic] = useState("start");
  const [messages, setMessages] = useState([{ role: "bot", text: "Hey — I’m Abu’s portfolio assistant. Ask what he builds, how the systems work, or what he’s building right now." }]);
  const suggestions = useMemo(() => assistantTopics[topic] || assistantTopics.start, [topic]);
  const send = (text) => {
    const value = (text || input).trim();
    if (!value) return;
    const [reply, nextTopic] = answerAssistant(value);
    setMessages((m) => [...m, { role: "user", text: value }, { role: "bot", text: reply }]);
    setTopic(nextTopic);
    setInput("");
  };
  return (
    <div className={`assistant-shell ${open ? "open" : ""}`}>
      {!open && <button className="assistant-launcher" onClick={() => setOpen(true)} data-cursor="ASK"><span className="assistant-pulse" />Ask Abu’s assistant <i>↗</i></button>}
      {open && (
        <div className="assistant-panel" role="dialog" aria-label="Abu's assistant">
          <div className="assistant-header"><div><span className="assistant-avatar">A</span><div><strong>ABU’S ASSISTANT</strong><small><i /> PORTFOLIO GUIDE</small></div></div><button onClick={() => setOpen(false)} aria-label="Close assistant">×</button></div>
          <div className="assistant-messages">
            {messages.map((m, i) => <div key={i} className={`assistant-message ${m.role}`}>{m.text}</div>)}
          </div>
          <div className="assistant-suggestions">{suggestions.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
          <form className="assistant-input" onSubmit={(e) => { e.preventDefault(); send(); }}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about systems, projects, process..." aria-label="Ask Abu's assistant" /><button type="submit" aria-label="Send">↗</button></form>
        </div>
      )}
    </div>
  );
}

export default function App() {
  useReveal();
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty("--pointer-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <main>
      <ScrollProgress />
      <SmoothCursor />
      <FloatingNav />
      <Hero />
      <CapabilityRail />
      <WhatIBuild />
      <SystemFlow />
      <Projects />
      <UseCases />
      <Industries />
      <ProductionReady />
      <Process />
      <ROICalculator />
      <About />
      <FinalCTA />
      <Footer />
      <AbuAssistant />
    </main>
  );
}
