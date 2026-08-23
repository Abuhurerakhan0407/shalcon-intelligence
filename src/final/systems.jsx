import { SERVICES } from "./data.js";
import { Reveal } from "./ui.jsx";
import { TiltCard } from "./effects.jsx";

function ServiceSignal({ index }) {
  if (index === 0) {
    return <div className="service-signal signal-agents" aria-hidden="true"><b/><i/><i/><i/><i/><span/></div>;
  }
  if (index === 1) {
    return <div className="service-signal signal-orchestration" aria-hidden="true"><span/><span/><span/><i/><i/><b/></div>;
  }
  if (index === 2) {
    return <div className="service-signal signal-pipeline" aria-hidden="true"><span/><span/><span/><span/><i/></div>;
  }
  if (index === 3) {
    return <div className="service-signal signal-app" aria-hidden="true"><span className="window-back"/><span className="window-mid"/><span className="window-front"><i/><i/><i/></span></div>;
  }
  if (index === 4) {
    return <div className="service-signal signal-data" aria-hidden="true">{Array.from({ length: 9 }).map((_, i) => <i key={i}/>) }<b/></div>;
  }
  return <div className="service-signal signal-product" aria-hidden="true"><span/><span/><span/><span/><b/></div>;
}

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
          <TiltCard key={service.title} className={`service-card ${service.size}`} delay={i * 0.035} depth={4.5}>
            <div className="card-glow" />
            <div className="service-top"><span>{service.n}</span><i>↗</i></div>
            <ServiceSignal index={i} />
            <div className="service-copy">
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </div>
            <small>{service.tag}</small>
          </TiltCard>
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
        <div className="flow-story-readout" aria-hidden="true">
          <span className="flow-story-step flow-step-1">01 / EVENT RECEIVED</span>
          <span className="flow-story-step flow-step-2">02 / CONTEXT UNDERSTOOD</span>
          <span className="flow-story-step flow-step-3">03 / SYSTEMS ACTIVATED</span>
          <span className="flow-story-step flow-step-4">04 / HUMAN + DATA SYNCED</span>
        </div>
        <svg className="beam-svg" viewBox="0 0 1000 540" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="beamGreen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,255,138,0)" />
              <stop offset="50%" stopColor="#00ff8a" />
              <stop offset="100%" stopColor="rgba(0,255,138,0)" />
            </linearGradient>
          </defs>
          <path className="beam base b1" d="M500 74 C500 130 500 140 500 190" />
          <path className="beam pulse p1" d="M500 74 C500 130 500 140 500 190" />
          <path className="beam base b2" d="M500 262 C390 292 292 310 206 360" />
          <path className="beam pulse p2" d="M500 262 C390 292 292 310 206 360" />
          <path className="beam base b3" d="M500 262 C500 305 500 330 500 360" />
          <path className="beam pulse p3" d="M500 262 C500 305 500 330 500 360" />
          <path className="beam base b4" d="M500 262 C610 292 708 310 794 360" />
          <path className="beam pulse p4" d="M500 262 C610 292 708 310 794 360" />
          <path className="beam base b5" d="M206 430 C330 485 410 485 500 485" />
          <path className="beam pulse p5" d="M206 430 C330 485 410 485 500 485" />
          <path className="beam base b6" d="M500 430 L500 485" />
          <path className="beam pulse p6" d="M500 430 L500 485" />
          <path className="beam base b7" d="M794 430 C670 485 590 485 500 485" />
          <path className="beam pulse p7" d="M794 430 C670 485 590 485 500 485" />
        </svg>
        <div className="flow-node lead" tabIndex={0}><small>EVENT</small><strong>Lead / request / action</strong><i className="node-tip">e.g. a WhatsApp message, a form submit, a missed call</i></div>
        <div className="flow-node orchestrator" tabIndex={0}><small>INTELLIGENCE LAYER</small><strong>AI Orchestrator</strong><span>understands → decides → routes</span><i className="node-tip">reads intent, checks history, picks the next system — no manual triage</i></div>
        <div className="flow-node system crm" tabIndex={0}><small>SYSTEM</small><strong>CRM</strong><i className="node-tip">lead logged with full context, not just a name and number</i></div>
        <div className="flow-node system whatsapp" tabIndex={0}><small>CHANNEL</small><strong>WhatsApp</strong><i className="node-tip">reply sent from the same thread the event came from</i></div>
        <div className="flow-node system api" tabIndex={0}><small>INTEGRATION</small><strong>APIs</strong><i className="node-tip">connects the tools you already run — no rip and replace</i></div>
        <div className="flow-node outcome" tabIndex={0}><small>SHARED CONTEXT</small><strong>Data + human decision</strong><span>one process, one source of truth</span><i className="node-tip">a person steps in only where judgment is actually needed</i></div>
        <div className="flow-status"><span className="live-dot" /> LIVE SIGNAL PATH</div>
      </Reveal>
    </section>
  );
}
