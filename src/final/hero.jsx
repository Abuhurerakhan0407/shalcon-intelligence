import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CAPABILITIES, CONTACT } from "./data.js";
import { MagneticLink, useReducedMotionPreference } from "./ui.jsx";

export function SystemOrb() {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 90, damping: 18 });
  const sy = useSpring(ry, { stiffness: 90, damping: 18 });

  const move = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 11);
    rx.set(((e.clientY - rect.top) / rect.height - 0.5) * -11);
  };

  return (
    <motion.div
      ref={ref}
      className="system-orb-wrap"
      onMouseMove={move}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: sx, rotateY: sy }}
      data-cursor="EXPLORE"
    >
      <div className="orb-aura" />
      <div className="orb-shell">
        <div className="orb-core"><span>AI</span><small>ORCHESTRATOR</small></div>
        <div className="orbit orbit-a"><i /><i /><i /></div>
        <div className="orbit orbit-b"><i /><i /></div>
        <div className="orbit orbit-c"><i /><i /><i /><i /></div>
        <span className="orb-label l1">CRM</span>
        <span className="orb-label l2">API</span>
        <span className="orb-label l3">DATA</span>
        <span className="orb-label l4">HUMAN</span>
        <span className="orb-label l5">WHATSAPP</span>
      </div>
      <div className="orb-caption"><span className="live-dot" /> systems talking to systems</div>
    </motion.div>
  );
}

export function Hero() {
  const reduced = useReducedMotionPreference();
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-grid-bg" />
      <div className="hero-spotlight" />
      <div className="hero-copy">
        <motion.div className="eyebrow" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <span>01</span> ABU HURERA / MUMBAI
        </motion.div>
        <div className="hero-title-wrap">
          {["I BUILD AI-POWERED", "BUSINESS SYSTEMS."].map((line, i) => (
            <div className="hero-line" key={line}>
              <motion.h1
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.14 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>
        <motion.p
          className="hero-sub"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.72 }}
        >
          I connect <strong>agents, workflows, software, data and human teams</strong> so they work as one operating system — not a pile of disconnected automations.
        </motion.p>
        <motion.div className="hero-actions" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68 }}>
          <MagneticLink href={CONTACT.whatsapp} className="primary-btn" external>
            Discuss a project <span>↗</span>
          </MagneticLink>
          <a href="#systems" className="text-link" data-cursor="SCROLL">See what I build <span>↓</span></a>
        </motion.div>
        <motion.div className="hero-footnote" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <span className="live-dot" /> Available for selected builds
          <em>Automation should remove work, not add another dashboard to babysit.</em>
        </motion.div>
      </div>
      <motion.div className="hero-visual" initial={reduced ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 1 }}>
        <SystemOrb />
      </motion.div>
      <div className="hero-scroll-cue"><span>SCROLL TO TRACE THE SYSTEM</span><i /></div>
    </section>
  );
}

export function CapabilityRail() {
  const items = [...CAPABILITIES, ...CAPABILITIES];
  return (
    <div className="capability-rail" aria-label="Capabilities">
      <div className="capability-track">
        {items.map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}
      </div>
    </div>
  );
}
