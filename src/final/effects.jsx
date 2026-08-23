import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function TiltCard({ children, className = "", delay = 0, depth = 7, as = "article", ...rest }) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 22, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 170, damping: 22, mass: 0.45 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [`${depth}deg`, `-${depth}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${depth}deg`, `${depth}deg`]);
  const glareX = useTransform(springX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(springY, [-0.5, 0.5], [12, 88]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0,255,138,.18) 0%, rgba(0,255,138,.055) 24%, transparent 56%)`;
  const Tag = motion[as] || motion.article;
  const canHover = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  const move = (event) => {
    if (!canHover || (event.pointerType && event.pointerType !== "mouse")) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((pointerRef.current.x - rect.left) / rect.width - 0.5);
      y.set((pointerRef.current.y - rect.top) / rect.height - 0.5);
    });
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    x.set(0);
    y.set(0);
  };

  useEffect(() => reset, []);

  return (
    <Tag
      ref={ref}
      className={`tilt-surface ${className}`}
      onPointerMove={canHover ? move : undefined}
      onPointerLeave={canHover ? reset : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      {...rest}
    >
      <motion.div className="tilt-glare" style={{ background: glare }} aria-hidden="true" />
      {children}
    </Tag>
  );
}

export function PointerHighlight({ children, className = "" }) {
  return (
    <span className={`pointer-highlight ${className}`}>
      <span className="pointer-highlight-copy">{children}</span>
      <motion.span
        className="pointer-highlight-box"
        aria-hidden="true"
        initial={{ opacity: 0, scaleX: 0.3, scaleY: 0.72 }}
        whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.svg
        className="pointer-highlight-cursor"
        viewBox="0 0 16 16"
        aria-hidden="true"
        initial={{ opacity: 0, x: -18, y: -12 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </motion.svg>
    </span>
  );
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/<>[]{}";

export function ScrambleText({ text, className = "", speed = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let raf = 0;
    const total = Math.max(1, text.length * speed);
    const started = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - started) / total);
      const revealed = Math.floor(progress * text.length);
      setOutput(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < revealed) return char;
            frame += 1;
            return CHARS[(frame + index * 7) % CHARS.length];
          })
          .join("")
      );
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setOutput(text);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, speed, text]);

  return <span ref={ref} className={className} aria-label={text}>{output}</span>;
}

export function RippleField() {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(0);
  const cells = useMemo(() => Array.from({ length: 96 }), []);
  const canHover = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  const move = (event) => {
    if (!canHover) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect || !ref.current) return;
      ref.current.style.setProperty("--ripple-x", `${pointerRef.current.x - rect.left}px`);
      ref.current.style.setProperty("--ripple-y", `${pointerRef.current.y - rect.top}px`);
    });
  };

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={ref}
      className="ripple-field"
      onPointerMove={canHover ? move : undefined}
      onPointerDown={canHover ? () => setPulse((value) => value + 1) : undefined}
      aria-hidden="true"
    >
      <div className="ripple-grid">{cells.map((_, index) => <i key={index} />)}</div>
      <motion.div
        key={pulse}
        className="ripple-pulse"
        initial={{ scale: 0.25, opacity: 0.42 }}
        animate={{ scale: 1.7, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
