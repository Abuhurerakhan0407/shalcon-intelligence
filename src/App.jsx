import { useEffect, useMemo, useRef, useState } from "react";

const CONTACT = {
  email: "shalconintelligence@gmail.com",
  whatsapp: "https://wa.me/919833001193",
  linkedin: "https://www.linkedin.com/in/shalcon-intelligence-a6b999407",
  calendly: "https://calendly.com/shalconintelligence/30min",
};

const capabilities = [
  {
    no: "01",
    title: "AI & Voice Agents",
    short: "Agents that listen, answer, qualify, route and act.",
    detail: "Voice, chat, support and knowledge agents with memory, tools, guardrails and human escalation.",
    use: "Support · Intake · Booking · Qualification",
  },
  {
    no: "02",
    title: "Workflow Orchestration",
    short: "Multiple agents and workflows working as one system.",
    detail: "I design the handoffs between triggers, decisions, tools, data and people instead of leaving automations isolated.",
    use: "Multi-agent · Routing · Retries · Handoffs",
  },
  {
    no: "03",
    title: "CRM, WhatsApp & Lead Ops",
    short: "From first inquiry to qualified conversation.",
    detail: "Lead capture, enrichment, qualification, follow-up, reminders, pipeline updates and sales handoff across channels.",
    use: "CRM · WhatsApp · Email · Calendar",
  },
  {
    no: "04",
    title: "Internal Tools & Web Apps",
    short: "Software shaped around the process—not the other way around.",
    detail: "Dashboards, portals, admin tools and operational apps for teams whose workflow does not fit generic software.",
    use: "Portals · Admin · Dashboards · Operations",
  },
  {
    no: "05",
    title: "AI SaaS, ERP & Custom Software",
    short: "Products with real business logic behind the interface.",
    detail: "Multi-tenant SaaS, vertical ERPs, AI features, roles, workflows, billing logic and the systems that make products usable.",
    use: "SaaS · ERP · Product systems",
  },
  {
    no: "06",
    title: "API & Systems Integration",
    short: "Existing tools finally sharing context.",
    detail: "I connect CRMs, messaging, databases, business apps and custom APIs so information moves once and stays consistent.",
    use: "APIs · Webhooks · Sync · Middleware",
  },
  {
    no: "07",
    title: "Document & Data Automation",
    short: "Turn unstructured work into usable data and next actions.",
    detail: "Extract, validate, transform, route and generate documents or records without creating another manual review queue.",
    use: "Extraction · Validation · Generation · Routing",
  },
  {
    no: "08",
    title: "Reporting & Observability",
    short: "Know what happened after the automation ran.",
    detail: "Operational reporting, alerts and traces that show completed work, failures, handoffs and where a system needs improvement.",
    use: "Reporting · Alerts · Logs · Insights",
  },
];

const systemSteps = [
  {
    no: "01",
    label: "Inquiry arrives",
    meta: "03:14 PM · Website form",
    text: "A new lead enters once. The system creates one source of truth instead of five tabs and a copy-paste ritual.",
  },
  {
    no: "02",
    label: "AI qualifies",
    meta: "Intent + fit + urgency",
    text: "The agent asks the useful questions, identifies buying intent and separates a real opportunity from noise.",
  },
  {
    no: "03",
    label: "CRM is written",
    meta: "Contact + context + stage",
    text: "The record is updated automatically with the conversation context, not a vague note someone has to decode later.",
  },
  {
    no: "04",
    label: "Follow-up starts",
    meta: "WhatsApp · Email",
    text: "The next message is triggered by the lead state—not by someone remembering to chase it after lunch.",
  },
  {
    no: "05",
    label: "Meeting gets booked",
    meta: "Calendar + reminders",
    text: "Availability, booking, confirmations and reminders happen inside the same flow without another manual handoff.",
  },
  {
    no: "06",
    label: "Human takes over",
    meta: "Qualified context attached",
    text: "The person receives the conversation, qualification and next action. Automation stops exactly where judgment becomes valuable.",
  },
  {
    no: "07",
    label: "System reports back",
    meta: "Outcome + failure + next signal",
    text: "The workflow leaves a trace: what happened, what failed, what converted and what should improve next.",
  },
];

const projects = [
  {
    no: "01",
    name: "EDQORA",
    type: "K–12 School ERP / SIS",
    stage: "Built + selling",
    accent: "#8da5ff",
    problem: "Schools run admissions, fees, attendance, exams, staff and communication across disconnected tools and manual follow-ups.",
    building: "A full operating system for school administration—one product connecting the daily work of admins, teachers, students and parents.",
    role: "Product strategy · System architecture · Automation · Web · Go-to-market",
    systems: ["Admissions", "SIS", "Fees", "Attendance", "Exams", "HR", "Transport", "Parent portal"],
    proves: "Vertical SaaS thinking, operational depth, multi-role product design and business-system integration.",
  },
  {
    no: "02",
    name: "PAGEVELOPE",
    type: "Visual Email Design SaaS",
    stage: "In development",
    accent: "#ff9bc8",
    problem: "Designers can make beautiful web experiences, but email production still forces them into a much narrower technical workflow.",
    building: "A visual product for designing animated, email-safe campaigns, testing compatibility and exporting into ecommerce marketing stacks.",
    role: "Product concept · UX architecture · SaaS system design · Build orchestration",
    systems: ["Visual builder", "Animation controls", "Compatibility", "Preview", "Exports", "Campaign history"],
    proves: "Design-tool product thinking, technical constraints, SaaS architecture and builder UX.",
  },
  {
    no: "03",
    name: "MADARSA ERP",
    type: "Urdu-first Institution ERP",
    stage: "In development",
    accent: "#f0bd72",
    problem: "Madarsas and Urdu-medium institutions need serious management software without forcing their operations into generic school products.",
    building: "A customizable ERP for academics, finance, people and administration with an Urdu-first product direction.",
    role: "Product architecture · Data model · Workflow design · Implementation planning",
    systems: ["Students", "Fees", "Attendance", "Exams", "Staff", "Hostel", "Library", "Urdu-first UX"],
    proves: "Domain modelling, localization, ERP architecture and configurable workflows.",
  },
  {
    no: "04",
    name: "AI SOFTWARE FACTORY",
    type: "Agentic Build Infrastructure",
    stage: "Active R&D",
    accent: "#00ff8a",
    problem: "AI coding becomes unreliable when planning, execution, review and deployment live as separate conversations.",
    building: "An internal system that coordinates planning, implementation, human approval, GitHub, deployment and observability as one build workflow.",
    role: "Agent orchestration · Workflow architecture · Tooling · Deployment design",
    systems: ["Mission control", "Planning", "Execution", "Human gates", "GitHub", "Vercel", "Observability"],
    proves: "Multi-agent systems, tool orchestration, approval boundaries and AI-native operations.",
  },
];

const sectors = [
  ["Healthcare", "Patient intake · booking · follow-up · support"],
  ["EdTech", "Admissions · student ops · fees · communication"],
  ["Insurance", "Qualification · renewals · claims intake · documents"],
  ["E-commerce", "Support · recovery · lifecycle · operations"],
  ["HR", "Screening · scheduling · onboarding · documents"],
  ["Real Estate", "Qualification · follow-up · booking · CRM"],
  ["Custom", "Your workflow, mapped from the ground up"],
];

const principles = [
  ["01", "Human judgment stays human", "Automation handles repetition. High-risk, low-confidence or exceptional cases reach the right person with context attached."],
  ["02", "Integrate before replacing", "A useful system should work with the tools the business already depends on whenever that makes more sense than rebuilding everything."],
  ["03", "Design the failure path", "Retries, fallbacks, duplicate prevention and exception handling belong in the architecture—not in a panicked patch after launch."],
  ["04", "Everything should leave a trace", "If a workflow cannot show what ran, what changed and what failed, it is hard to trust and harder to improve."],
];

const process = [
  ["01", "Audit", "Map the actual work: people, tools, triggers, repetition, delays and edge cases."],
  ["02", "Architect", "Decide what should be automated, what stays human and how every system connects."],
  ["03", "Build", "Create the agents, workflows, software and integrations as one operating system."],
  ["04", "Deploy", "Test with real data, permissions, failures and handoffs before expanding usage."],
  ["05", "Improve", "Observe outcomes, remove friction and extend the system only where it earns the complexity."],
];

const assistantAnswers = [
  {
    keys: ["edqora"],
    answer: "Edqora is a K–12 school ERP/SIS that connects admissions, students, fees, attendance, exams, HR, transport and parent-facing operations. Abu works across product, automation, system design and go-to-market.",
  },
  {
    keys: ["pagevelope"],
    answer: "Pagevelope is a visual email-design SaaS for animated, email-safe campaigns. The interesting part is not just the editor—it is compatibility, preview, export and the technical rules email clients impose.",
  },
  {
    keys: ["madarsa"],
    answer: "Madarsa ERP is an Urdu-first institution management product covering academics, finance, staff and administration with a configurable vertical-ERP approach.",
  },
  {
    keys: ["software factory", "factory"],
    answer: "The AI Software Factory is an internal agentic system for coordinating planning, implementation, human approval, GitHub, deployment and observability instead of treating AI coding as one giant chat.",
  },
  {
    keys: ["orchestration", "multi-agent", "multiple agents"],
    answer: "Orchestration is the part between the pieces. A trigger starts work, agents make or support decisions, tools take actions, data stays synchronized, failures have fallback paths and humans take over where judgment matters.",
  },
  {
    keys: ["voice", "agent", "chatbot"],
    answer: "Agents are one capability, not the whole offer. Abu also builds workflow orchestration, CRM and WhatsApp systems, lead qualification, integrations, internal tools, web apps, SaaS, ERP, document automation and reporting.",
  },
  {
    keys: ["automate", "automation", "what can"],
    answer: "Good candidates are repetitive, rule-heavy and cross-system: qualification, follow-up, CRM updates, reminders, document handling, appointment flows, support triage, reporting and internal handoffs.",
  },
  {
    keys: ["start", "audit", "project", "work together"],
    answer: "A project starts by mapping how the process works today. From there Abu separates automation from human judgment, defines the architecture, then builds and deploys the connected system.",
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    if (!nodes.length) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useSectionSpy() {
  const [section, setSection] = useState("top");
  useEffect(() => {
    const ids = ["top", "capabilities", "system-trace", "projects", "sectors", "principles", "process", "about"];
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target?.id) setSection(current.target.id);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-20% 0px -55% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return section;
}

function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia?.("(pointer: coarse)")?.matches) return;
    const el = ref.current;
    if (!el) return;
    let x = -40;
    let y = -40;
    let tx = x;
    let ty = y;
    let frame = 0;
    const move = (event) => {
      tx = event.clientX;
      ty = event.clientY;
      el.dataset.mode = event.target.closest?.("[data-cursor]") ? "active" : "idle";
    };
    const tick = () => {
      x += (tx - x) * 0.24;
      y += (ty - y) * 0.24;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="cursor-dot" ref={ref} data-mode="idle" aria-hidden="true" />;
}

function SideProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="side-progress" aria-hidden="true">
      <span style={{ transform: `scaleY(${progress})` }} />
    </div>
  );
}

function Navigation({ current }) {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const labelMap = {
    top: "INTRO",
    capabilities: "CAPABILITIES",
    "system-trace": "SYSTEM TRACE",
    projects: "CURRENT WORK",
    sectors: "SECTORS",
    principles: "PRINCIPLES",
    process: "PROCESS",
    about: "ABOUT",
  };
  return (
    <>
      <header className="nav-line">
        <button className="nav-name" onClick={() => go("top")} data-cursor>
          ABU HURERA
        </button>
        <div className="nav-state">
          <span className="nav-signal" />
          <span>{labelMap[current] || "PORTFOLIO"}</span>
        </div>
        <nav className="nav-links" aria-label="Primary">
          <button onClick={() => go("projects")}>Work</button>
          <button onClick={() => go("capabilities")}>Capabilities</button>
          <button onClick={() => go("about")}>About</button>
          <a href={CONTACT.calendly} target="_blank" rel="noreferrer">Start a project ↗</a>
        </nav>
        <button className="nav-menu" onClick={() => setOpen((value) => !value)} aria-expanded={open}>{open ? "CLOSE" : "MENU"}</button>
      </header>
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        <button onClick={() => go("projects")}>Current work</button>
        <button onClick={() => go("capabilities")}>Capabilities</button>
        <button onClick={() => go("system-trace")}>How systems work</button>
        <button onClick={() => go("process")}>Process</button>
        <button onClick={() => go("about")}>About Abu</button>
        <a href={CONTACT.calendly} target="_blank" rel="noreferrer">Start a project ↗</a>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <svg className="hero-route" viewBox="0 0 1400 900" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-80 680 C190 590 280 740 490 620 C715 492 770 305 1015 360 C1200 402 1255 240 1490 160" />
        <circle r="5" className="route-dot"><animateMotion dur="9s" repeatCount="indefinite" path="M-80 680 C190 590 280 740 490 620 C715 492 770 305 1015 360 C1200 402 1255 240 1490 160" /></circle>
      </svg>
      <div className="hero-meta rail-meta" data-reveal>
        <span>FOUNDER / SHALCON INTELLIGENCE</span>
        <span>MUMBAI / INDIA</span>
        <span>AVAILABLE FOR SELECT BUILDS</span>
      </div>
      <div className="hero-main">
        <div className="hero-name" data-reveal>ABU HURERA</div>
        <h1 data-reveal>
          I build <em>systems</em><br />that move work.
        </h1>
        <div className="hero-lower" data-reveal>
          <p>
            AI agents, software, automation, data and people—designed as one operating flow instead of a pile of disconnected tools.
          </p>
          <div className="hero-actions">
            <a className="arrow-link" href={CONTACT.calendly} target="_blank" rel="noreferrer" data-cursor>Discuss a project <span>↗</span></a>
            <button className="arrow-link muted-link" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} data-cursor>See current work <span>↓</span></button>
          </div>
        </div>
      </div>
      <aside className="hero-index" data-reveal>
        <div className="hero-index-title">CURRENTLY BUILDING</div>
        {projects.map((project) => (
          <button key={project.name} onClick={() => document.getElementById(`project-${project.no}`)?.scrollIntoView({ behavior: "smooth" })}>
            <span>{project.no}</span><strong>{project.name}</strong><small>{project.stage}</small>
          </button>
        ))}
      </aside>
      <div className="hero-footnote" data-reveal>AI AUTOMATION · PRODUCT SYSTEMS · WEB DEVELOPMENT</div>
    </section>
  );
}

function CapabilityLedger() {
  const [active, setActive] = useState(0);
  return (
    <section className="section ledger-section" id="capabilities">
      <div className="section-shell">
        <div className="section-intro" data-reveal>
          <span className="section-kicker">WHAT I CAN BUILD</span>
          <h2>Capability without the buzzword soup.</h2>
          <p>Each capability can stand alone. The better systems usually combine several of them around one business process.</p>
        </div>
        <div className="ledger" data-reveal>
          {capabilities.map((item, index) => (
            <article
              key={item.title}
              className={`ledger-row ${active === index ? "active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              tabIndex={0}
              data-cursor
            >
              <span className="ledger-no">{item.no}</span>
              <div className="ledger-title-wrap"><h3>{item.title}</h3><p>{item.short}</p></div>
              <div className="ledger-detail"><p>{item.detail}</p><small>{item.use}</small></div>
              <span className="ledger-mark">{active === index ? "—" : "+"}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemTrace() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number(visible.target.dataset.step));
      },
      { threshold: [0.4, 0.7], rootMargin: "-22% 0px -32% 0px" }
    );
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="section trace-section" id="system-trace">
      <div className="section-shell">
        <div className="trace-heading" data-reveal>
          <span className="section-kicker">ONE EVENT / SEVEN HANDOFFS</span>
          <h2>Orchestration is what happens between the boxes.</h2>
        </div>
        <div className="trace-layout">
          <div className="trace-sticky">
            <div className="trace-stage">
              <div className="trace-stage-top"><span>LIVE EXAMPLE</span><span>{systemSteps[active].no} / 07</span></div>
              <div className="trace-stage-main">
                <span className="trace-ghost">{systemSteps[active].no}</span>
                <div><small>{systemSteps[active].meta}</small><h3>{systemSteps[active].label}</h3></div>
              </div>
              <div className="trace-rail" aria-hidden="true">
                {systemSteps.map((step, index) => <span key={step.no} className={index <= active ? "done" : ""} />)}
              </div>
              <p>{systemSteps[active].text}</p>
            </div>
          </div>
          <div className="trace-copy">
            {systemSteps.map((step, index) => (
              <article key={step.no} data-step={index} ref={(node) => (refs.current[index] = node)} className={active === index ? "active" : ""}>
                <span>{step.no}</span><h4>{step.label}</h4><p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectChapter({ project }) {
  return (
    <article className="project-chapter" id={`project-${project.no}`} style={{ "--project-accent": project.accent }}>
      <div className="project-title-side" data-reveal>
        <div className="project-label"><span>BUILD FILE {project.no}</span><span>{project.stage}</span></div>
        <h3>{project.name}</h3>
        <p className="project-type">{project.type}</p>
        <div className="project-wordmark" aria-hidden="true">{project.name.split(" ")[0]}</div>
      </div>
      <div className="project-content" data-reveal>
        <div className="project-block"><span>THE PROBLEM</span><p>{project.problem}</p></div>
        <div className="project-block important"><span>WHAT I’M BUILDING</span><p>{project.building}</p></div>
        <div className="project-block"><span>MY ROLE</span><p>{project.role}</p></div>
        <div className="project-system-list"><span>SYSTEMS INSIDE</span><div>{project.systems.map((item, index) => <b key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</b>)}</div></div>
        <div className="project-proof"><span>WHAT THIS DEMONSTRATES</span><strong>{project.proves}</strong></div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-intro section-shell" data-reveal>
        <span className="section-kicker">CURRENT WORK / NOT TESTIMONIALS</span>
        <h2>I’d rather show what I’m building than invent proof I don’t have.</h2>
        <p>These projects are active build files. They show the kinds of systems, products and problems I’m capable of handling right now.</p>
      </div>
      {projects.map((project) => <ProjectChapter key={project.name} project={project} />)}
    </section>
  );
}

function Sectors() {
  return (
    <section className="section sector-section" id="sectors">
      <div className="section-shell">
        <div className="sector-head" data-reveal>
          <span className="section-kicker">WHERE THIS WORKS</span>
          <h2>Different industry. Same operational friction.</h2>
        </div>
        <div className="sector-list" data-reveal>
          {sectors.map(([name, use], index) => (
            <div className="sector-row" key={name} data-cursor>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><p>{use}</p><i>↗</i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="section principles-section" id="principles">
      <div className="section-shell">
        <div className="principle-head" data-reveal>
          <span className="section-kicker">THE PART AFTER THE DEMO</span>
          <h2>If it only works once, it doesn’t work.</h2>
        </div>
        <div className="principle-grid">
          {principles.map(([no, title, text]) => (
            <article key={title} data-reveal>
              <span>{no}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="section process-section" id="process">
      <div className="section-shell process-layout">
        <div className="process-sticky" data-reveal>
          <span className="section-kicker">HOW I WORK</span>
          <h2>Five moves.<br /><em>Fewer meetings.</em></h2>
          <div className="process-counter">{String(active + 1).padStart(2, "0")} <span>/ 05</span></div>
        </div>
        <div className="process-list" data-reveal>
          {process.map(([no, title, text], index) => (
            <button key={title} className={active === index ? "active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
              <span>{no}</span><div><h3>{title}</h3><p>{text}</p></div><i>{active === index ? "—" : "+"}</i>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManualCost() {
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(350);
  const monthly = Math.round(people * hours * rate * 4.33);
  return (
    <section className="section diagnostic-section">
      <div className="section-shell diagnostic-layout" data-reveal>
        <div>
          <span className="section-kicker">QUICK DIAGNOSTIC</span>
          <h2>Put a number on the repetition.</h2>
          <p>Not an ROI promise. Just a fast way to see whether a recurring manual process is expensive enough to deserve a closer look.</p>
        </div>
        <div className="diagnostic-controls">
          <label><span>People</span><b>{people}</b><input type="range" min="1" max="20" value={people} onChange={(e) => setPeople(Number(e.target.value))} /></label>
          <label><span>Hours / week each</span><b>{hours}</b><input type="range" min="1" max="40" value={hours} onChange={(e) => setHours(Number(e.target.value))} /></label>
          <label><span>Hourly cost</span><b>₹{rate}</b><input type="range" min="100" max="2000" step="50" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></label>
        </div>
        <div className="diagnostic-result">
          <span>ESTIMATED MONTHLY MANUAL COST</span>
          <strong>₹{monthly.toLocaleString("en-IN")}</strong>
          <small>≈ ₹{Math.round(monthly * 12).toLocaleString("en-IN")} / year</small>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-shell">
        <div className="about-statement" data-reveal>
          <span className="section-kicker">ABOUT ABU</span>
          <h2>I’m more interested in <em>how the work moves</em> than where the AI badge goes.</h2>
        </div>
        <div className="about-grid" data-reveal>
          <div className="about-copy">
            <p>I’m Abu Hurera, founder of Shalcon Intelligence. I design AI automation, product systems and web software for businesses with repetitive work, disconnected tools or processes that have outgrown manual coordination.</p>
            <p>My strongest work sits between disciplines: part product, part automation, part software architecture, part operations. That is usually where the interesting problems are anyway.</p>
          </div>
          <dl className="about-facts">
            <div><dt>BASE</dt><dd>Mumbai, India</dd></div>
            <div><dt>FOCUS</dt><dd>AI systems · Automation · Product software</dd></div>
            <div><dt>BUILDING</dt><dd>Edqora · Pagevelope · Madarsa ERP · AI Software Factory</dd></div>
            <div><dt>WORK STYLE</dt><dd>Audit → architect → build → deploy → improve</dd></div>
            <div><dt>AVAILABLE</dt><dd>Selected custom systems and product work</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta section">
      <div className="section-shell" data-reveal>
        <span className="section-kicker">YOUR PROCESS / NEXT</span>
        <h2>If a process repeats every week, it probably deserves a system.</h2>
        <p>Show me how the work happens today. I’ll help figure out what should be automated, what should stay human and what the system actually needs.</p>
        <div className="final-links">
          <a href={CONTACT.calendly} target="_blank" rel="noreferrer" data-cursor>Discuss a project <span>↗</span></a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          <a href={`mailto:${CONTACT.email}`}>Email ↗</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer-inner">
        <div><strong>ABU HURERA</strong><span>Founder / Shalcon Intelligence</span></div>
        <div><span>AI AUTOMATION</span><span>PRODUCT SYSTEMS</span><span>WEB DEVELOPMENT</span></div>
        <div><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={`mailto:${CONTACT.email}`}>Email ↗</a></div>
        <div><span>Mumbai / India</span><span>© 2026</span></div>
      </div>
    </footer>
  );
}

function assistantReply(input) {
  const value = input.toLowerCase();
  const match = assistantAnswers.find((item) => item.keys.some((key) => value.includes(key)));
  return match?.answer || "Abu builds connected business systems: agents, workflows, software, integrations and data working together. Ask me about a project, capability or how a workflow gets designed.";
}

const assistantSuggestions = {
  top: ["What does Abu actually build?", "Show current projects", "What is workflow orchestration?"],
  capabilities: ["Do you build voice agents?", "Can you build custom software?", "What can be automated?"],
  "system-trace": ["Explain orchestration simply", "Where does a human take over?", "How are failures handled?"],
  projects: ["Tell me about Edqora", "What is Pagevelope?", "What is the AI Software Factory?"],
  process: ["How does a project start?", "What happens in the audit?", "Can you use my existing tools?"],
  about: ["Why work with Abu?", "What industries does he work with?", "How do I start?"],
};

function Assistant({ current }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Ask about the work, the current projects or how a system gets put together." },
  ]);
  const suggestions = useMemo(() => assistantSuggestions[current] || assistantSuggestions.top, [current]);
  const send = (text) => {
    const value = (text || input).trim();
    if (!value) return;
    setMessages((items) => [...items, { role: "user", text: value }, { role: "bot", text: assistantReply(value) }]);
    setInput("");
  };
  return (
    <div className={`assistant ${open ? "open" : ""}`}>
      {!open && <button className="assistant-trigger" onClick={() => setOpen(true)} data-cursor><span>ASK /</span> Abu’s assistant <i>↗</i></button>}
      {open && (
        <div className="assistant-drawer" role="dialog" aria-label="Abu's assistant">
          <div className="assistant-head"><div><span>ABU / ASSISTANT</span><small>Portfolio guide</small></div><button onClick={() => setOpen(false)} aria-label="Close">×</button></div>
          <div className="assistant-body">
            {messages.map((message, index) => <div key={index} className={`assistant-message ${message.role}`}>{message.text}</div>)}
          </div>
          <div className="assistant-suggestions">{suggestions.map((text) => <button key={text} onClick={() => send(text)}>{text}</button>)}</div>
          <form onSubmit={(event) => { event.preventDefault(); send(); }} className="assistant-form">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about systems, projects, process..." />
            <button type="submit">↗</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function App() {
  useReveal();
  const current = useSectionSpy();
  return (
    <main>
      <Cursor />
      <SideProgress />
      <Navigation current={current} />
      <Hero />
      <CapabilityLedger />
      <SystemTrace />
      <Projects />
      <Sectors />
      <Principles />
      <Process />
      <ManualCost />
      <About />
      <FinalCTA />
      <Footer />
      <Assistant current={current} />
    </main>
  );
}
