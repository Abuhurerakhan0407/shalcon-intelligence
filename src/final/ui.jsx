import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { CONTACT } from "./data.js";

export function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export function Reveal({ children, className = "", delay = 0, y = 26 }) {
  const reduced = useReducedMotionPreference();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticLink({ href, children, className = "", external = false }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

  const move = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={reset}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </motion.a>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export function Cursor() {
  const reduced = useReducedMotionPreference();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 36, mass: 0.18 });
  const sy = useSpring(y, { stiffness: 500, damping: 36, mass: 0.18 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest?.("[data-cursor]");
      setLabel(target?.dataset?.cursor || "");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduced, x, y]);

  if (reduced) return null;
  return (
    <motion.div
      className={`custom-cursor ${label ? "is-active" : ""}`}
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    >
      <span>{label}</span>
    </motion.div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 110);
      setHidden(y > 140 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Services", "#services"],
    ["Work", "#projects"],
    ["Process", "#process"],
    ["About", "#about"],
  ];

  return (
    <motion.header
      className="nav-wrap"
      animate={{ y: hidden && !open ? -110 : 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        className={`nav glass-panel ${compact ? "is-compact" : ""}`}
        aria-label="Primary navigation"
        layout
        transition={{ layout: { type: "spring", stiffness: 180, damping: 28 } }}
      >
        <a href="#top" className="brand" data-cursor="TOP">
          <span className="brand-mark">AH</span>
          <span className="brand-copy">Abu Hurera<small>Web Design + Development</small></span>
        </a>
        <div className="nav-links">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <MagneticLink href={CONTACT.whatsapp} className="nav-cta" external>
          Start a project <span>↗</span>
        </MagneticLink>
        <button className={`menu-btn ${open ? "open" : ""}`} onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <span />
          <span />
        </button>
      </motion.nav>
      {open && (
        <motion.div className="mobile-menu glass-panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}<span>↘</span></a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
