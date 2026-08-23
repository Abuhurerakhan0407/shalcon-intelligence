import { SERVICES } from "./data.js";
import { Reveal } from "./ui.jsx";

export function Services() {
  return (
    <section className="section-shell section-pad" id="systems">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow"><span>02</span> WHAT I BUILD</span>
          <h2>Systems, not random automations.</h2>
        </div>
        <p>Each build is designed around the process first. Agents, interfaces and integrations only exist where they make that process work better.</p>
      </Reveal>
      <div className="bento-grid">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} className={`service-card ${service.size}`} delay={i * 0.035}>
            <div className="card-glow" />
            <div className="service-top"><span>{service.n}</span><i>↗</i></div>
            <div>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </div>
            <small>{service.tag}</small>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function OrchestrationFlow() {
  return (
    <section className="section-shell section-pad orchestration-section">
      <Reveal className="section-heading compact">
        <div>
          <span className="eyebrow"><span>03</span> ORCHESTRATION</span>
          <h2>The work moves. Context moves with it.</h2>
        </div>
        <p>This is the difference between a useful automation and six bots that do not know the others exist.</p>
      </Reveal>
      <Reveal className="flow-stage">
        <div className="flow-grid" />
        <svg className="beam-svg" viewBox="0 0 1000 540" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="beamGreen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,255,138,0)" />
              <stop offset="50%" stopColor="#00ff8a" />
              <stop offset="100%" stopColor="rgba(0,255,138,0)" />
            </linearGradient>
          </defs>
          <path className="beam base" d="M500 74 C500 130 500 140 500 190" />
          <path className="beam pulse p1" d="M500 74 C500 130 500 140 500 190" />
          <path className="beam base" d="M500 262 C390 292 292 310 206 360" />
          <path className="beam pulse p2" d="M500 262 C390 292 292 310 206 360" />
          <path className="beam base" d="M500 262 C500 305 500 330 500 360" />
          <path className="beam pulse p3" d="M500 262 C500 305 500 330 500 360" />
          <path className="beam base" d="M500 262 C610 292 708 310 794 360" />
          <path className="beam pulse p4" d="M500 262 C610 292 708 310 794 360" />
          <path className="beam base" d="M206 430 C330 485 410 485 500 485" />
          <path className="beam pulse p5" d="M206 430 C330 485 410 485 500 485" />
          <path className="beam base" d="M500 430 L500 485" />
          <path className="beam pulse p6" d="M500 430 L500 485" />
          <path className="beam base" d="M794 430 C670 485 590 485 500 485" />
          <path className="beam pulse p7" d="M794 430 C670 485 590 485 500 485" />
        </svg>
        <div className="flow-node lead"><small>EVENT</small><strong>Lead / request / action</strong></div>
        <div className="flow-node orchestrator"><small>INTELLIGENCE LAYER</small><strong>AI Orchestrator</strong><span>understands → decides → routes</span></div>
        <div className="flow-node system crm"><small>SYSTEM</small><strong>CRM</strong></div>
        <div className="flow-node system whatsapp"><small>CHANNEL</small><strong>WhatsApp</strong></div>
        <div className="flow-node system api"><small>INTEGRATION</small><strong>APIs</strong></div>
        <div className="flow-node outcome"><small>SHARED CONTEXT</small><strong>Data + human decision</strong><span>one process, one source of truth</span></div>
        <div className="flow-status"><span className="live-dot" /> LIVE SIGNAL PATH</div>
      </Reveal>
    </section>
  );
}
