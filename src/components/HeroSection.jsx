import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SITE_CONFIG, G, HERO_STATS, LIVE_FEED } from "../data/content.js";
import Hero3D from "./Hero3D.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";

/**
 * HeroSection — full-viewport hero (brief §4 #hero).
 *
 * PHASE 4: the 3D crystal scene (Hero3D) mounts behind the content.
 * PHASE 5: HERO_STATS animate in — a one-time count-up (0 → seed) the first
 * time the hero is visible, then the EXISTING live tick-up + live-feed rotation
 * take over (brief §7.6 keeps the tick-up logic for the live numbers). Both
 * intervals run ONLY while the hero is on-screen and only when motion is
 * allowed — paused otherwise, so they never cost CPU next to the 3D scene.
 *
 * The 3D scene is an imperative THREE loop mounted in a ref (Hero3D), fully
 * detached from React reconciliation, so the count-up's per-frame setState
 * re-renders this component's JSX only — it never restarts or throttles the
 * crystal scene's own rAF (3D FPS is unaffected).
 */
const SEED_COUNTERS = { a: 1247, l: 89, m: 4821, c: 98 };
const ZERO_COUNTERS = { a: 0, l: 0, m: 0, c: 0 };

// Synchronous reduced-motion probe for the initial state → reduced-motion users
// see final values from first paint (no flash); motion users start at 0 and
// count up cleanly.
function prefersReducedMotionNow() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function HeroSection({ onBookCall }) {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const [counters, setCounters] = useState(() =>
    prefersReducedMotionNow() ? SEED_COUNTERS : ZERO_COUNTERS
  );
  const [feedIdx, setFeedIdx] = useState(0);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Count-up intro → live tick-up + feed rotation. Gated on visibility + motion.
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let counterId = null;
    let feedId = null;
    let introTween = null;
    let introDone = false;

    const startTimers = () => {
      if (counterId == null) {
        counterId = window.setInterval(() => {
          setCounters((p) => ({
            a: p.a + Math.floor(Math.random() * 3),
            l: p.l + (Math.random() > 0.62 ? 1 : 0),
            m: p.m + Math.floor(Math.random() * 7) + 2,
            c: Math.min(99, p.c),
          }));
        }, 2800);
      }
      if (feedId == null) {
        feedId = window.setInterval(
          () => setFeedIdx((p) => (p + 1) % LIVE_FEED.length),
          2200
        );
      }
    };
    const stopTimers = () => {
      if (counterId != null) { clearInterval(counterId); counterId = null; }
      if (feedId != null) { clearInterval(feedId); feedId = null; }
    };

    // One-time 0 → seed count-up, then hand off to the live tick.
    const runIntro = () => {
      const p = { ...ZERO_COUNTERS };
      introTween = gsap.to(p, {
        ...SEED_COUNTERS,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () =>
          setCounters({
            a: Math.round(p.a),
            l: Math.round(p.l),
            m: Math.round(p.m),
            c: Math.round(p.c),
          }),
        onComplete: () => {
          introDone = true;
          introTween = null;
          setCounters(SEED_COUNTERS);
          startTimers();
        },
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (introDone) startTimers();
          else if (!introTween) runIntro();
        } else {
          stopTimers();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      stopTimers();
      introTween?.kill();
    };
  }, [reduced]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ position: "relative", minHeight: "100vh", paddingTop: 64, overflow: "hidden" }}
    >
      {/* 3D crystal scene (lazy WebGL) with static gradient/glow fallback */}
      <Hero3D />

      {/* Readability safe-zone scrim (Bug 3) — a left-anchored darkening
          gradient that sits above the 3D layer (z1) and below the content (z2).
          Keeps the headline / subhead / CTA fully legible over any geometry
          while leaving the right side clear so the crystal glow still shows.
          Phase-4 3D engine is untouched — this is a HeroSection-only overlay. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(3,3,8,0.94) 0%, rgba(3,3,8,0.82) 34%, rgba(3,3,8,0.45) 56%, rgba(3,3,8,0.12) 74%, transparent 88%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "90px clamp(20px,5vw,60px) 140px",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 64px)",
          justifyContent: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: G.card,
            border: `1px solid ${G.border}`,
            padding: "7px 16px",
            marginBottom: 44,
            width: "fit-content",
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            {/* Brand-green status dots (Bug 3) — replaces the off-brand
                green/amber/pink trio that read as red/orange/pink. */}
            {["#00FF94", "#00FF94AA", "#00FF9455"].map((c, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".12em" }}>
            ALL SYSTEMS OPERATIONAL · AI AUTOMATION AGENCY
          </span>
        </div>

        {/* Headline */}
        <h1 className="syne" style={{ fontSize: "clamp(40px,8.5vw,100px)", fontWeight: 800, lineHeight: 0.98, marginBottom: 8, letterSpacing: "-.02em" }}>
          Your business.
        </h1>
        <h1 className="syne" style={{ fontSize: "clamp(40px,8.5vw,100px)", fontWeight: 800, lineHeight: 0.98, marginBottom: 40, letterSpacing: "-.02em" }}>
          <span style={{ color: G.green, textShadow: `0 0 50px ${G.green}33` }}>Running.</span>
        </h1>
        <h2 className="syne" style={{ fontSize: "clamp(22px,4.5vw,54px)", fontWeight: 600, color: G.muted, marginBottom: 44, letterSpacing: "-.01em", lineHeight: 1.15 }}>
          Without anyone running it.
        </h2>

        <p className="mono" style={{ color: G.muted, fontSize: 13, marginBottom: 52, lineHeight: 2 }}>
          <span style={{ color: G.green }}>›</span>
          {"  "}AI Automation · Healthcare · EdTech · Insurance · E-commerce · HR
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button className="btn-ghost" onClick={onBookCall}>
            <span>[ Book Free Audit → ]</span>
          </button>
          <button className="btn-text" onClick={() => scrollTo("demo")}>
            Try Live Demo ↓
          </button>
        </div>
      </div>

      {/* Stats widget (desktop) — static seed values (ticking added Phase 5).
          zIndex 2 keeps it above the readability scrim (z1), same layer as text. */}
      <div className="hide-m" style={{ position: "absolute", bottom: 64, right: 60, width: 280, zIndex: 2 }}>
        <div style={{ background: G.card, border: `1px solid ${G.border}`, padding: "20px 22px", marginBottom: 10, boxShadow: "0 0 50px rgba(0,255,148,.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${G.border}` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.green, boxShadow: `0 0 8px ${G.green}` }} />
            <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".1em" }}>
              SYSTEM STATUS: ONLINE
            </span>
          </div>
          {HERO_STATS.map((s) => (
            <div key={s.key} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
              <span className="mono" style={{ color: G.muted, fontSize: 10 }}>{s.label}</span>
              <span className="smono" style={{ color: G.white, fontSize: 10 }} key={counters[s.key]}>{s.display(counters[s.key])}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#06060F", border: `1px solid ${G.border}`, padding: "12px 16px", height: 48, overflow: "hidden" }}>
          <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".08em", marginBottom: 3 }}>LIVE FEED</div>
          <div className="mono" style={{ color: G.green, fontSize: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} key={feedIdx}>
            ● {LIVE_FEED[feedIdx]}
          </div>
        </div>
      </div>
    </section>
  );
}
