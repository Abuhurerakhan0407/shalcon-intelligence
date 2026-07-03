import { useState, useEffect, useRef, useCallback } from "react";
import {
  NICHES,
  SERVICES,
  TESTIMONIALS,
  HERO_STATS,
  PLATFORM_STATS,
  LIVE_FEED,
  DEMO_RESPONSES,
  DEMO_INIT,
  G,
} from "../src/data/content.js";

/* ════════════════════════════════════════════════════════════════
   ✏️  EDITABLE CONTENT — CHANGE ANYTHING HERE WITHOUT TOUCHING DESIGN
   ════════════════════════════════════════════════════════════════ */

const SITE_CONFIG = {
  agencyName: "SHALCON",
  tagline: "INTELLIGENCE",
  description: "AI automation systems for businesses that can't afford to stop.",
  calendlyLink: "https://calendly.com/your-link",        // ← Replace with your Calendly URL
  whatsappNumber: "919XXXXXXXXX",                         // ← Replace with your WhatsApp number (with country code)
  linkedinURL: "https://linkedin.com/in/your-profile",   // ← Replace with your LinkedIn URL
  email: "hello@shalconintelligence.com",                // ← Replace with your email
  copyright: "© 2026 SHALCON INTELLIGENCE",
};

/* ════════════════════════════════════════════════════════════════
   DESIGN & COMPONENT CODE — DO NOT EDIT BELOW UNLESS CONFIDENT
   ════════════════════════════════════════════════════════════════ */

const G = {
  bg: "#030308", card: "#0A0A14", card2: "#0D0D1A",
  green: "#00FF94", blue: "#00CFFF", amber: "#FF9F00",
  pink: "#FF4FD8", purple: "#A78BFA",
  muted: "#555577", border: "#1A1A2E", white: "#FFFFFF",
};

export default function Shalcon() {
  const [activeNiche, setActiveNiche] = useState("Healthcare");
  const [demoNiche, setDemoNiche] = useState("Healthcare");
  const [chatMsgs, setChatMsgs] = useState(DEMO_INIT.Healthcare);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [feedIdx, setFeedIdx] = useState(0);
  const [counters, setCounters] = useState({ a: 1247, l: 89, m: 4821, c: 98 });
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [cursorTrail, setCursorTrail] = useState({ x: -200, y: -200 });
  const [dots, setDots] = useState("...");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progressShown, setProgressShown] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [revealedTestimonials, setRevealedTestimonials] = useState({});
  const [nicheTransition, setNicheTransition] = useState(true);

  const canvasRef = useRef(null);
  const matrixRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(null);
  const matrixRaf = useRef(null);
  const particles = useRef([]);
  const chatBottom = useRef(null);
  const progressRef = useRef(null);

  /* ── CSS ── */
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500;600&family=Syne+Mono&display=swap');
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{background:#030308;color:#fff;font-family:'IBM Plex Mono',monospace;overflow-x:hidden;}
      ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#030308}::-webkit-scrollbar-thumb{background:#00FF9444;border-radius:2px}

      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes spinR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
      @keyframes orbit{from{transform:rotate(0deg) translateX(28px) rotate(0deg)}to{transform:rotate(360deg) translateX(28px) rotate(-360deg)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes marqueeL{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes breathe{0%,100%{box-shadow:0 0 20px #00FF9408}50%{box-shadow:0 0 50px #00FF9422}}
      @keyframes lineGrow{from{width:0}to{width:100%}}
      @keyframes slideL{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
      @keyframes slideR{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
      @keyframes morphBlob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
      @keyframes neonGlow{0%,100%{text-shadow:0 0 10px #00FF9466}50%{text-shadow:0 0 30px #00FF94,0 0 60px #00FF9444}}
      @keyframes rippleOut{0%{transform:scale(1);opacity:.5}100%{transform:scale(3);opacity:0}}
      @keyframes countTick{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      @property --angle{syntax:'<angle>';initial-value:0deg;inherits:false}
      @keyframes rotateBorder{from{--angle:0deg}to{--angle:360deg}}

      .syne{font-family:'Syne',sans-serif}
      .mono{font-family:'IBM Plex Mono',monospace}
      .smono{font-family:'Syne Mono',monospace}

      .reveal{opacity:0;transform:translateY(40px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
      .reveal.in{opacity:1;transform:translateY(0)}
      .d1{transition-delay:.08s}.d2{transition-delay:.18s}.d3{transition-delay:.28s}.d4{transition-delay:.38s}

      /* ─── BUTTONS — ALL CLICKABLE ─── */
      .btn-ghost{
        display:inline-flex;align-items:center;justify-content:center;
        background:transparent;border:1px solid #00FF94;color:#00FF94;
        font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:500;
        padding:13px 28px;cursor:pointer;letter-spacing:.07em;
        position:relative;overflow:hidden;transition:color .3s ease;
        text-decoration:none;
      }
      .btn-ghost::before{content:'';position:absolute;inset:0;background:#00FF94;transform:translateX(-101%);transition:transform .32s cubic-bezier(.16,1,.3,1);z-index:0}
      .btn-ghost:hover::before,.btn-ghost:focus::before{transform:translateX(0)}
      .btn-ghost:hover,.btn-ghost:focus{color:#030308;outline:none}
      .btn-ghost>*{position:relative;z-index:1}

      .btn-primary{
        display:inline-flex;align-items:center;justify-content:center;
        background:#00FF94;border:none;color:#030308;
        font-family:'Syne',sans-serif;font-weight:800;font-size:15px;
        padding:18px 44px;cursor:pointer;letter-spacing:.04em;
        position:relative;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease;
        text-decoration:none;
      }
      .btn-primary::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.25);transform:translateX(-101%);transition:transform .35s ease}
      .btn-primary:hover::after{transform:translateX(0)}
      .btn-primary:hover{transform:scale(1.04);box-shadow:0 0 50px #00FF9466;outline:none}
      .btn-primary:active{transform:scale(.99)}

      .btn-text{background:none;border:none;color:#555577;font-family:'IBM Plex Mono',monospace;font-size:12px;cursor:pointer;text-decoration:underline;text-underline-offset:4px;letter-spacing:.04em;transition:color .2s;padding:4px}
      .btn-text:hover{color:#00FF94}

      .nav-link{background:none;border:none;color:#555577;font-family:'IBM Plex Mono',monospace;font-size:11px;cursor:pointer;letter-spacing:.06em;transition:color .2s;padding:4px 0}
      .nav-link:hover{color:#fff}

      .niche-tab{background:transparent;border:none;border-bottom:2px solid transparent;color:#555577;font-family:'IBM Plex Mono',monospace;font-size:11px;padding:12px 18px;cursor:pointer;transition:all .22s;letter-spacing:.06em;white-space:nowrap}
      .niche-tab:hover{color:#ddd}
      .niche-tab.on{color:#00FF94;border-bottom-color:#00FF94}

      .pill-btn{background:transparent;border:1px solid #1A1A2E;color:#555577;font-family:'IBM Plex Mono',monospace;font-size:10px;padding:6px 14px;border-radius:20px;cursor:pointer;transition:all .2s;white-space:nowrap}
      .pill-btn:hover:not(.on){border-color:#00FF9055;color:#00FF9099}
      .pill-btn.on{background:#00FF94;color:#030308;border-color:#00FF94;font-weight:700}

      .service-card{background:#0D0D1A;border:1px solid #1A1A2E;padding:32px 26px;transition:all .38s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;cursor:default}
      .service-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#00FF94,transparent);transform:translateX(-100%);transition:transform .6s ease}
      .service-card:hover{border-color:#00FF9433;transform:translateY(-5px);box-shadow:0 20px 60px rgba(0,255,148,.07)}
      .service-card:hover::after{transform:translateX(100%)}

      .stat-card{background:#0A0A14;border:1px solid #1A1A2E;padding:32px 24px;position:relative;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease;cursor:default;animation:breathe 5s ease-in-out infinite}
      .stat-card:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 20px 50px rgba(0,255,148,.08)}

      .chat-bot{background:#0D0D1A;border:1px solid #1E1E3A;padding:10px 14px;font-size:12px;color:#ccccdd;max-width:88%;align-self:flex-start;line-height:1.7;border-radius:2px 8px 8px 8px;animation:fadeUp .3s ease}
      .chat-user{background:linear-gradient(135deg,#00FF94,#00CFAA);padding:10px 14px;font-size:12px;color:#030308;max-width:88%;align-self:flex-end;font-weight:600;line-height:1.7;border-radius:8px 2px 8px 8px;animation:fadeUp .3s ease}

      .footer-link{color:#555577;cursor:pointer;font-family:'IBM Plex Mono',monospace;font-size:11px;transition:all .22s;display:block;margin-bottom:12px;padding-left:0}
      .footer-link:hover{color:#00FF94;padding-left:8px}

      .custom-cursor{position:fixed;pointer-events:none;z-index:9999;border-radius:50%;transition:transform .1s ease}

      @media(max-width:768px){
        .hide-m{display:none!important}
        .grid-mobile-1{grid-template-columns:1fr!important}
        .grid-mobile-2{grid-template-columns:1fr 1fr!important}
        .tabs-x{overflow-x:auto;-webkit-overflow-scrolling:touch}
        .tabs-x::-webkit-scrollbar{display:none}
        .mobile-center{text-align:center}
        .mobile-menu-btn{display:flex!important}
      }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  /* ── Mouse / cursor ── */
  useEffect(() => {
    const h = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setCursorTrail(cursorPos), 100);
    return () => clearTimeout(t);
  }, [cursorPos]);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    particles.current = Array.from({ length: 90 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      size: Math.random() * 1.6 + .4, life: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rect = canvas.getBoundingClientRect();
      const mx = mousePos.current.x - rect.left, my = mousePos.current.y - rect.top;
      particles.current.forEach((p, i) => {
        const dx = p.x - mx, dy = p.y - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) { const f = (140 - dist) / 140; p.vx += dx / dist * f * .7; p.vy += dy / dist * f * .7; }
        p.vx *= .96; p.vy *= .96; p.x += p.vx; p.y += p.vy; p.life += .008;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,148,${.1 + Math.sin(p.life) * .05})`; ctx.fill();
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j], d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 95) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.strokeStyle = `rgba(0,255,148,${.045 * (1 - d / 95)})`; ctx.lineWidth = .5; ctx.stroke(); }
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  /* ── Matrix rain ── */
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor((canvas.width || 800) / 22);
    const drops = Array(cols).fill(1);
    const chars = "01アイウエカキクサシスセ∑∆√∞≠ABCDEF";
    const draw = () => {
      ctx.fillStyle = "rgba(3,3,8,0.06)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,148,0.06)"; ctx.font = "13px 'IBM Plex Mono'";
      drops.forEach((d, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 22, d * 22);
        if (d * 22 > canvas.height && Math.random() > .976) drops[i] = 0;
        drops[i]++;
      });
      matrixRaf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(matrixRaf.current); window.removeEventListener("resize", resize); };
  }, []);

  /* ── Counters ── */
  useEffect(() => {
    const id = setInterval(() => {
      setCounters(p => ({ a: p.a + Math.floor(Math.random() * 3), l: p.l + (Math.random() > .62 ? 1 : 0), m: p.m + Math.floor(Math.random() * 7) + 2, c: Math.min(99, p.c) }));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  /* ── Live feed ── */
  useEffect(() => {
    const id = setInterval(() => setFeedIdx(p => (p + 1) % LIVE_FEED.length), 2200);
    return () => clearInterval(id);
  }, []);

  /* ── Dots animation ── */
  useEffect(() => {
    const a = [".", "..", "..."]; let i = 0;
    const id = setInterval(() => { i = (i + 1) % 3; setDots(a[i]); }, 560);
    return () => clearInterval(id);
  }, []);

  /* ── Glitch effect ── */
  useEffect(() => {
    const id = setInterval(() => { setGlitchActive(true); setTimeout(() => setGlitchActive(false), 350); }, 5500);
    return () => clearInterval(id);
  }, []);

  /* ── Intersection observer for reveals + progress ── */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); }
    }), { threshold: .1 });
    const progObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setProgressShown(true); }, { threshold: .2 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    if (progressRef.current) progObs.observe(progressRef.current);
    return () => { obs.disconnect(); progObs.disconnect(); };
  }, []);

  /* ── Chat auto scroll ── */
  useEffect(() => { chatBottom.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs, isTyping]);

  /* ── Actions ── */
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  const changeNiche = (n) => {
    setNicheTransition(false);
    setTimeout(() => { setActiveNiche(n); setNicheTransition(true); }, 180);
  };

  const changeDemo = (n) => { setDemoNiche(n); setChatMsgs(DEMO_INIT[n]); };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMsgs(p => [...p, { r: "user", t: chatInput }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      const rs = DEMO_RESPONSES[demoNiche];
      setChatMsgs(p => [...p, { r: "bot", t: rs[Math.floor(Math.random() * rs.length)] }]);
      setIsTyping(false);
    }, 1300);
  };

  const openLink = (url) => { if (url && url !== "#") window.open(url, "_blank", "noopener"); };
  const bookCall = () => openLink(SITE_CONFIG.calendlyLink);
  const openWA = () => openLink(`https://wa.me/${SITE_CONFIG.whatsappNumber}`);
  const openLI = () => openLink(SITE_CONFIG.linkedinURL);
  const openEmail = () => { window.location.href = `mailto:${SITE_CONFIG.email}`; };

  const nicheData = NICHES[activeNiche];

  return (
    <div style={{ background: G.bg, minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      {/* ── Custom cursor (desktop only) ── */}
      <div className="custom-cursor hide-m" style={{ left: cursorPos.x, top: cursorPos.y, width: 11, height: 11, background: G.green, transform: "translate(-50%,-50%)", boxShadow: `0 0 10px ${G.green},0 0 22px ${G.green}55`, mixBlendMode: "difference" }} />
      <div className="custom-cursor hide-m" style={{ left: cursorTrail.x, top: cursorTrail.y, width: 34, height: 34, border: `1px solid ${G.green}44`, transform: "translate(-50%,-50%)", transition: "left .13s ease,top .13s ease,opacity .3s" }} />

      {/* ── Grain overlay ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998, opacity: .02, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ── Scanline ── */}
      <div style={{ position: "fixed", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.03) 3px,rgba(0,0,0,.03) 4px)", pointerEvents: "none", zIndex: 997 }} />

      {/* ════════ NAV ════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 64, background: "rgba(3,3,8,.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,5vw,60px)" }}>
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0 }}>
          <div style={{ width: 26, height: 26, position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, border: `1px solid ${G.green}`, animation: "spin 9s linear infinite" }} />
            <div style={{ position: "absolute", inset: 5, border: `1px solid ${G.green}55`, animation: "spinR 6s linear infinite" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5, background: G.green, borderRadius: "50%", boxShadow: `0 0 8px ${G.green}` }} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div className="syne" style={{ color: G.green, fontSize: 13, fontWeight: 800, letterSpacing: ".26em", lineHeight: 1, animation: glitchActive ? "neonGlow .35s ease" : "none" }}>{SITE_CONFIG.agencyName}</div>
            <div className="mono" style={{ color: G.muted, fontSize: 8, letterSpacing: ".2em" }}>{SITE_CONFIG.tagline}</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {["Services", "Industries", "How It Works", "Demo"].map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replace(/ /g, "-"))}>{l}</button>
          ))}
          <button className="btn-ghost" onClick={bookCall}><span>Book A Call</span></button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: `1px solid ${G.border}`, color: G.green, fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, padding: "6px 12px", cursor: "pointer", display: "none", letterSpacing: ".06em" }} className="mobile-menu-btn">
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, background: "#050512", borderBottom: `1px solid ${G.border}`, padding: "28px 24px", zIndex: 999, display: "flex", flexDirection: "column", gap: 4 }}>
          {["Services", "Industries", "How It Works", "Demo"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/ /g, "-"))} style={{ background: "none", border: "none", color: G.muted, fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, cursor: "pointer", textAlign: "left", padding: "12px 0", borderBottom: `1px solid ${G.border}` }}>
              › {l}
            </button>
          ))}
          <button className="btn-ghost" style={{ marginTop: 16 }} onClick={bookCall}><span>Book A Free Call</span></button>
        </div>
      )}

      {/* ════════ HERO ════════ */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", paddingTop: 64, overflow: "hidden" }}>
        <canvas ref={matrixRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: .55 }} />
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

        {/* Perspective grid */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: `repeating-linear-gradient(90deg,${G.green}09 0,${G.green}09 1px,transparent 1px,transparent 8vw),repeating-linear-gradient(180deg,${G.green}09 0,${G.green}09 1px,transparent 1px,transparent 44px)`, transform: "perspective(350px) rotateX(55deg)", transformOrigin: "bottom center", opacity: .4, pointerEvents: "none" }} />

        {/* Blobs */}
        <div style={{ position: "absolute", top: "12%", right: "6%", width: 320, height: 320, background: `radial-gradient(circle,${G.green}0C,transparent 70%)`, animation: "morphBlob 9s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "3%", width: 200, height: 200, background: `radial-gradient(circle,${G.blue}08,transparent 70%)`, animation: "morphBlob 12s ease-in-out infinite reverse", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "90px clamp(20px,5vw,60px) 140px", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 64px)", justifyContent: "center" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: G.card, border: `1px solid ${G.border}`, padding: "7px 16px", marginBottom: 44, width: "fit-content", animation: "fadeUp .7s ease both" }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#00FF94", "#FF9F00", "#FF4FD8"].map((c, i) => (
                <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c, animation: `pulse 2s ease-in-out ${i * .35}s infinite` }} />
              ))}
            </div>
            <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".12em" }}>ALL SYSTEMS OPERATIONAL · AI AUTOMATION AGENCY</span>
          </div>

          {/* Headline */}
          <h1 className="syne" style={{ fontSize: "clamp(40px,8.5vw,100px)", fontWeight: 800, lineHeight: .98, marginBottom: 8, animation: "fadeUp .8s ease .1s both", letterSpacing: "-.02em" }}>
            Your business.
          </h1>
          <h1 className="syne" style={{ fontSize: "clamp(40px,8.5vw,100px)", fontWeight: 800, lineHeight: .98, marginBottom: 40, animation: "fadeUp .8s ease .18s both", letterSpacing: "-.02em" }}>
            <span style={{ color: G.green, textShadow: glitchActive ? `3px 0 ${G.blue},-3px 0 ${G.pink}` : `0 0 50px ${G.green}33`, transition: "text-shadow .1s" }}>Running.</span>
          </h1>
          <h2 className="syne" style={{ fontSize: "clamp(22px,4.5vw,54px)", fontWeight: 600, color: G.muted, marginBottom: 44, animation: "fadeUp .8s ease .26s both", letterSpacing: "-.01em", lineHeight: 1.15 }}>
            Without anyone running it.
          </h2>

          <p className="mono" style={{ color: G.muted, fontSize: 13, marginBottom: 52, animation: "fadeUp .8s ease .34s both", lineHeight: 2 }}>
            <span style={{ color: G.green, animation: "blink 1.1s step-end infinite" }}>›</span>{"  "}AI Automation · Healthcare · EdTech · Insurance · E-commerce · HR
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp .8s ease .44s both" }}>
            <button className="btn-ghost" onClick={bookCall}><span>[ Book Free Audit → ]</span></button>
            <button className="btn-text" onClick={() => scrollTo("demo")}>Try Live Demo ↓</button>
          </div>
        </div>

        {/* Stats widget (desktop) */}
        <div className="hide-m" style={{ position: "absolute", bottom: 64, right: 60, width: 280, animation: "fadeUp 1s ease .55s both" }}>
          <div style={{ background: G.card, border: `1px solid ${G.border}`, padding: "20px 22px", marginBottom: 10, boxShadow: `0 0 50px rgba(0,255,148,.04)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${G.border}` }}>
              <div style={{ position: "relative", width: 10, height: 10 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: G.green, opacity: .4, animation: "rippleOut 2s ease-in-out infinite" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.green, position: "absolute", top: 1, left: 1, boxShadow: `0 0 8px ${G.green}` }} />
              </div>
              <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".1em" }}>SYSTEM STATUS: ONLINE</span>
            </div>
            {HERO_STATS.map(s => (
              <div key={s.key} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
                <span className="mono" style={{ color: G.muted, fontSize: 10 }}>{s.label}</span>
                <span className="smono" style={{ color: G.white, fontSize: 10, animation: "countTick .3s ease" }} key={counters[s.key]}>{s.display(counters[s.key])}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#06060F", border: `1px solid ${G.border}`, padding: "12px 16px", height: 48, overflow: "hidden" }}>
            <div key={feedIdx} style={{ animation: "slideL .4s ease" }}>
              <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".08em", marginBottom: 3 }}>LIVE FEED</div>
              <div className="mono" style={{ color: G.green, fontSize: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>● {LIVE_FEED[feedIdx]}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ MARQUEE ════════ */}
      <div style={{ borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}`, padding: "13px 0", overflow: "hidden", background: "#04040C" }}>
        <div style={{ display: "flex", animation: "marqueeL 24s linear infinite", width: "200%" }}>
          {[0, 1].map(ri => (
            <div key={ri} style={{ display: "flex", flexShrink: 0, width: "50%" }}>
              {["AI VOICE AGENT", "WHATSAPP AUTOMATION", "CRM PIPELINE", "DOCUMENT AI", "CHATBOT DEPLOY", "LEAD NURTURING", "APPOINTMENT BOOKING", "OUTBOUND CALLING", "ANALYTICS DASHBOARD", "ONBOARDING SYSTEM"].map(item => (
                <span key={item + ri} className="mono" style={{ color: G.muted, fontSize: 10, letterSpacing: ".14em", whiteSpace: "nowrap", padding: "0 30px", borderRight: `1px solid ${G.border}` }}>
                  <span style={{ color: G.green, marginRight: 10 }}>◆</span>{item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ════════ STATS ════════ */}
      <section style={{ padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 28 }}>› PLATFORM METRICS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 60 }} className="grid-mobile-2">
            {PLATFORM_STATS.map((s, i) => (
              <div key={s.label} className={`stat-card reveal d${i + 1}`}>
                <div style={{ position: "absolute", top: 16, right: 16, width: 44, height: 44 }}>
                  <div style={{ position: "absolute", inset: 0, border: `1px solid ${s.color}22`, borderRadius: "50%", animation: `spin ${7 + i}s linear infinite` }} />
                  <div style={{ position: "absolute", inset: 7, border: `1px solid ${s.color}44`, borderRadius: "50%", animation: `spinR ${5 + i}s linear infinite` }} />
                  <div style={{ position: "absolute", inset: 0, animation: `orbit ${6 + i}s linear infinite` }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, boxShadow: `0 0 6px ${s.color}`, marginLeft: -2, marginTop: -2 }} />
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${s.color}33,transparent)` }} />
                <div className="smono" style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, color: s.color, marginBottom: 8, lineHeight: 1, textShadow: `0 0 30px ${s.color}33` }}>{s.val}</div>
                <div className="syne" style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
                <div className="mono" style={{ color: G.muted, fontSize: 10 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="reveal" style={{ border: `1px solid ${G.amber}33`, background: "#100800", padding: "15px 22px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.amber, flexShrink: 0, animation: "pulse 1.4s ease-in-out infinite" }} />
            <p className="mono" style={{ color: G.amber, fontSize: 12, letterSpacing: ".04em", lineHeight: 1.7 }}>
              ⚡ Businesses that don't automate in 2026 will be replaced by ones that do. The shift is already underway.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ INDUSTRIES ════════ */}
      <section id="industries" style={{ padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px)", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 52 }}>
            <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 14 }}>› INDUSTRY SOLUTIONS</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08 }}>
              One problem.<br /><span style={{ color: G.green }}>Five industries.</span>
            </h2>
          </div>

          <div className="tabs-x" style={{ display: "flex", borderBottom: `1px solid ${G.border}`, marginBottom: 48 }}>
            {Object.keys(NICHES).map(n => (
              <button key={n} className={`niche-tab${activeNiche === n ? " on" : ""}`} onClick={() => changeNiche(n)}>
                {NICHES[n].icon} {n}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", opacity: nicheTransition ? 1 : 0, transform: nicheTransition ? "translateY(0)" : "translateY(12px)", transition: "all .22s ease" }} className="grid-mobile-1" key={activeNiche}>
            <div>
              <div className="mono" style={{ color: nicheData.color, fontSize: 9, letterSpacing: ".2em", marginBottom: 18 }}>{nicheData.tag}</div>
              <h3 className="syne" style={{ fontSize: "clamp(20px,3vw,36px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 22 }}>{nicheData.pain}</h3>
              <div style={{ padding: "14px 20px", background: G.card, border: `1px solid ${G.border}`, borderLeft: `3px solid ${nicheData.color}`, marginBottom: 28, display: "flex", gap: 12 }}>
                <span style={{ color: nicheData.color, flexShrink: 0 }}>›</span>
                <span className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.85 }}>{nicheData.solution}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
                {nicheData.stats.map(st => (
                  <span key={st} style={{ background: `${nicheData.color}0E`, border: `1px solid ${nicheData.color}33`, color: nicheData.color, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, padding: "5px 12px", letterSpacing: ".08em" }}>{st}</span>
                ))}
              </div>
              <button className="btn-ghost" onClick={() => scrollTo("demo")} style={{ borderColor: nicheData.color, color: nicheData.color }}>
                <span style={{ color: "inherit" }}>[ Request Demo for {activeNiche} → ]</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {nicheData.features.map((feat, i) => (
                <div key={feat} style={{ background: G.card, border: `1px solid ${G.border}`, padding: "20px 18px", position: "relative", overflow: "hidden", transition: "all .3s", animation: `fadeUp .4s ease ${i * .08}s both` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${nicheData.color}44`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ width: 24, height: 24, border: `1px solid ${nicheData.color}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: nicheData.color, fontSize: 10 }}>◆</div>
                  <div className="syne" style={{ fontSize: 12, fontWeight: 700, marginBottom: 5 }}>{feat}</div>
                  <div className="mono" style={{ color: G.muted, fontSize: 10, lineHeight: 1.7 }}>Automated. Always on.</div>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 36, height: 36, background: `${nicheData.color}06`, borderLeft: `1px solid ${nicheData.color}22`, borderBottom: `1px solid ${nicheData.color}22` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SERVICES ════════ */}
      <section id="services" style={{ padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px)", borderTop: `1px solid ${G.border}`, background: "#040410" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 52 }}>
            <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 14 }}>› WHAT WE BUILD</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08 }}>
              The full stack.<br /><span style={{ color: G.green }}>Every automation.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="grid-mobile-1">
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`service-card reveal d${(i % 3) + 1}`}
                onMouseMove={e => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.background = `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, #0D1C18, ${G.card2} 65%)`;
                }}
                onMouseLeave={e => { e.currentTarget.style.background = G.card2; }}>
                <div className="mono" style={{ color: G.green, fontSize: 9, letterSpacing: ".18em", marginBottom: 18 }}>{s.tag}</div>
                <div style={{ fontSize: 30, marginBottom: 16 }}>{s.icon}</div>
                <h3 className="syne" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
                <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9 }}>{s.desc}</p>
                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, color: G.green, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>
                  <span>Learn more</span><span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section id="how-it-works" style={{ padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px)", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 80 }}>
            <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 14 }}>› THE PROCESS</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08 }}>
              Three steps.<br /><span style={{ color: G.green }}>Then it runs itself.</span>
            </h2>
          </div>

          {/* Connecting line */}
          <div style={{ position: "relative" }}>
            <div className="hide-m" style={{ position: "absolute", top: 36, left: "17%", right: "17%", height: 1, background: `linear-gradient(90deg,${G.green}44,${G.blue}44,${G.amber}44)` }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, position: "relative" }} className="grid-mobile-1">
              {[
                { n: "01", t: "AUDIT", d: "Free 30-min call. We map your exact pain points, current workflow, and what to automate first. No fluff.", c: G.green },
                { n: "02", t: "BUILD", d: "7–10 day custom build. Your tools. Your language. Not a template — your system, built from scratch.", c: G.blue },
                { n: "03", t: "DEPLOY", d: "Go live. We monitor. You scale. Runs 24/7 from day one. Zero involvement needed from your side.", c: G.amber },
              ].map((step, i) => (
                <div key={step.n} className={`reveal d${i + 1}`} style={{ textAlign: "center" }}>
                  <div style={{ width: 70, height: 70, margin: "0 auto 28px", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, border: `1px solid ${step.c}33`, borderRadius: "50%", animation: `spin ${9 + i * 2}s linear infinite` }} />
                    <div style={{ position: "absolute", inset: 8, border: `1px solid ${step.c}55`, borderRadius: "50%", animation: `spinR ${7 + i * 2}s linear infinite` }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="smono" style={{ color: step.c, fontSize: 15, fontWeight: 800, textShadow: `0 0 20px ${step.c}55` }}>{step.n}</span>
                    </div>
                    <div style={{ position: "absolute", inset: 0, animation: `orbit ${6 + i}s linear infinite` }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: step.c, boxShadow: `0 0 8px ${step.c}`, marginTop: -3, marginLeft: -3 }} />
                    </div>
                  </div>
                  <div className="mono" style={{ color: step.c, fontSize: 10, letterSpacing: ".18em", marginBottom: 12 }}>{step.n} ·</div>
                  <h3 className="syne" style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, letterSpacing: ".1em" }}>{step.t}</h3>
                  <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, maxWidth: 260, margin: "0 auto" }}>{step.d}</p>
                  <div style={{ marginTop: 24, height: 2, background: G.border, overflow: "hidden", maxWidth: 180, margin: "24px auto 0" }}>
                    <div style={{ height: "100%", background: `linear-gradient(90deg,${step.c},${step.c}44)`, boxShadow: `0 0 8px ${step.c}`, width: 0, animation: `lineGrow 1.6s ease ${.4 + i * .2}s forwards` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="reveal" style={{ marginTop: 72, background: G.card, border: `1px solid ${G.border}`, padding: "26px 28px" }}>
            <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".18em", marginBottom: 18 }}>TYPICAL TIMELINE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }} className="grid-mobile-2">
              {[["Day 1", "Audit + Discovery"], ["Days 2–3", "Architecture Design"], ["Days 4–9", "Build + Test"], ["Day 10", "Deploy + Handoff"]].map(([d, l], i) => (
                <div key={d} style={{ padding: "0 16px", borderLeft: i > 0 ? `1px solid ${G.border}` : "none" }}>
                  <div className="smono" style={{ color: G.green, fontSize: 11, marginBottom: 5 }}>{d}</div>
                  <div className="mono" style={{ color: G.muted, fontSize: 11 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ DEMO ════════ */}
      <section id="demo" style={{ padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px)", borderTop: `1px solid ${G.border}`, background: "#040410" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="grid-mobile-1">

            <div className="reveal">
              <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 14 }}>› LIVE DEMO</div>
              <h2 className="syne" style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 22 }}>
                Not a video.<br />Not a screenshot.<br /><span style={{ color: G.green }}>The actual system.</span>
              </h2>
              <p className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.9, marginBottom: 32 }}>
                This is a working AI intake bot — the same type we deploy for clients. Type anything. It handles it.
              </p>
              <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".1em", marginBottom: 12 }}>› SELECT INDUSTRY:</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
                {Object.keys(NICHES).map(n => (
                  <button key={n} className={`pill-btn${demoNiche === n ? " on" : ""}`} onClick={() => changeDemo(n)}>{NICHES[n].icon} {n}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Response Time", "< 2 seconds"], ["Availability", "24/7/365"], ["Languages", "EN · HI · Hinglish"], ["Integration", "WhatsApp · Web"]].map(([k, v]) => (
                  <div key={k} style={{ background: G.card, border: `1px solid ${G.border}`, padding: "12px 14px" }}>
                    <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".1em", marginBottom: 4 }}>{k}</div>
                    <div className="mono" style={{ color: G.green, fontSize: 11, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat window */}
            <div className="reveal d2">
              <div style={{ background: "#04040E", border: `1px solid ${G.border}`, overflow: "hidden", boxShadow: `0 0 80px rgba(0,255,148,.05)` }}>
                {/* Terminal bar */}
                <div style={{ background: "#09090F", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${G.border}` }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#FF5F57", "#FFBD2E", "#28CA41"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                  </div>
                  <span className="mono" style={{ color: G.muted, fontSize: 10, flex: 1, textAlign: "center", letterSpacing: ".07em" }}>AI ASSISTANT · {demoNiche.toUpperCase()}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, animation: "pulse 2s ease-in-out infinite" }} />
                    <span className="mono" style={{ color: G.green, fontSize: 9 }}>LIVE</span>
                  </div>
                </div>
                {/* Messages */}
                <div style={{ height: 320, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: "linear-gradient(180deg,#060610,#030308)" }}>
                  {chatMsgs.map((m, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                      <div className={m.r === "bot" ? "chat-bot" : "chat-user"}>{m.t}</div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="chat-bot" style={{ display: "flex", gap: 5, alignItems: "center", width: 56, padding: "10px 14px" }}>
                      {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: G.green, animation: `pulse 1s ease-in-out ${i * .22}s infinite` }} />)}
                    </div>
                  )}
                  <div ref={chatBottom} />
                </div>
                {/* Input */}
                <div style={{ borderTop: `1px solid ${G.border}`, padding: 12, display: "flex", gap: 8, background: "#04040E" }}>
                  <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()}
                    placeholder="Type your message..." style={{ flex: 1, background: "#090914", border: `1px solid ${G.border}`, color: G.white, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, padding: "9px 12px", outline: "none", transition: "border-color .2s" }}
                    onFocus={e => e.target.style.borderColor = G.green} onBlur={e => e.target.style.borderColor = G.border} />
                  <button onClick={sendChat} style={{ background: G.green, border: "none", color: G.bg, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, padding: "9px 16px", cursor: "pointer", transition: "opacity .2s", letterSpacing: ".04em" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = ".82"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SOCIAL PROOF ════════ */}
      <section ref={progressRef} style={{ padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px)", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 52 }}>
            <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 14 }}>› RESULTS</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, lineHeight: 1.08 }}>
              Building in public.<br /><span style={{ color: G.green }}>Results loading{dots}</span>
            </h2>
          </div>

          {/* Circular progress */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 40 }} className="grid-mobile-1">
            {[
              { label: "Case Studies", pct: 60, status: "Healthcare & EdTech · Live", color: G.green },
              { label: "Clients Onboarding", pct: 35, status: "First cohort in progress", color: G.blue },
              { label: "Industries Active", pct: 40, status: "Healthcare · EdTech · Insurance", color: G.amber },
            ].map((item, i) => (
              <div key={item.label} className="reveal" style={{ background: G.card, border: `1px solid ${G.border}`, padding: "28px 24px", position: "relative", overflow: "hidden", textAlign: "center" }}>
                <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 20px" }}>
                  <svg width="90" height="90" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="38" fill="none" stroke={G.border} strokeWidth="3" />
                    <circle cx="45" cy="45" r="38" fill="none" stroke={item.color} strokeWidth="3"
                      strokeDasharray={`${2 * Math.PI * 38}`}
                      strokeDashoffset={progressShown ? `${2 * Math.PI * 38 * (1 - item.pct / 100)}` : `${2 * Math.PI * 38}`}
                      style={{ transition: `stroke-dashoffset 1.6s ease ${i * .22}s` }} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="smono" style={{ color: item.color, fontSize: 17, fontWeight: 800 }}>{item.pct}%</span>
                  </div>
                </div>
                <div className="syne" style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                <div className="mono" style={{ color: G.muted, fontSize: 10 }}>{item.status}</div>
                <div style={{ position: "absolute", top: 0, right: 0, width: 22, height: 22, borderLeft: `1px solid ${item.color}33`, borderBottom: `1px solid ${item.color}33`, background: `${item.color}06` }} />
              </div>
            ))}
          </div>

          {/* Testimonials — hover to reveal */}
          <div className="reveal" style={{ background: G.card, border: `1px solid ${G.border}`, padding: "28px 32px" }}>
            <div className="mono" style={{ color: G.muted, fontSize: 9, letterSpacing: ".2em", marginBottom: 24 }}>EARLY CLIENT FEEDBACK — HOVER TO REVEAL</div>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ marginBottom: i < TESTIMONIALS.length - 1 ? 24 : 0, paddingBottom: i < TESTIMONIALS.length - 1 ? 24 : 0, borderBottom: i < TESTIMONIALS.length - 1 ? `1px solid ${G.border}` : "none" }}>
                <div className="mono" style={{ color: G.muted, fontSize: 10, marginBottom: 10 }}>— {t.name} · {t.role}</div>
                <div style={{ position: "relative" }}
                  onMouseEnter={() => setRevealedTestimonials(p => ({ ...p, [i]: true }))}
                  onMouseLeave={() => setRevealedTestimonials(p => ({ ...p, [i]: false }))}
                  onTouchStart={() => setRevealedTestimonials(p => ({ ...p, [i]: !p[i] }))}>
                  <p className="syne" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.8, color: G.muted, filter: revealedTestimonials[i] || t.revealed ? "blur(0)" : "blur(5px)", transition: "filter .4s ease", userSelect: revealedTestimonials[i] ? "auto" : "none" }}>{t.text}</p>
                  {!revealedTestimonials[i] && !t.revealed && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".12em", background: G.card, padding: "4px 12px", border: `1px solid ${G.border}` }}>
                        {window.innerWidth < 768 ? "[ TAP TO REVEAL ]" : "[ HOVER TO REVEAL ]"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="reveal mono" style={{ color: G.muted, fontSize: 12, textAlign: "center", marginTop: 24 }}>
            Building in public. Testimonials and case studies update as clients go live.
          </p>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section id="book" style={{ padding: "clamp(80px,12vw,160px) clamp(20px,5vw,60px)", background: G.green, position: "relative", overflow: "hidden" }}>
        {[200, 360, 520].map((sz, i) => (
          <div key={sz} style={{ position: "absolute", top: "50%", left: "50%", width: sz, height: sz, marginLeft: -sz / 2, marginTop: -sz / 2, border: "1px solid rgba(3,3,8,.1)", borderRadius: "50%", animation: `spin ${14 + i * 8}s linear infinite`, pointerEvents: "none" }} />
        ))}
        <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: 100, opacity: .07, animation: "float 7s ease-in-out infinite", pointerEvents: "none" }}>◆</div>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div className="mono" style={{ color: "rgba(3,3,8,.45)", fontSize: 9, letterSpacing: ".22em", marginBottom: 18 }}>› READY TO START</div>
          <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,60px)", fontWeight: 800, color: G.bg, lineHeight: 1.06, marginBottom: 22 }}>
            Your competitors are automating right now.
          </h2>
          <p className="mono" style={{ color: "rgba(3,3,8,.6)", fontSize: 14, lineHeight: 1.9, marginBottom: 48 }}>
            Every day you wait is customers lost, leads wasted, and revenue that won't come back.
          </p>
          <button className="btn-primary" onClick={bookCall} style={{ fontSize: 14 }}>
            [ Book Your Free 30-Minute Audit ]
          </button>
          <p className="mono" style={{ color: "rgba(3,3,8,.4)", fontSize: 11, marginTop: 16 }}>No pitch. No pressure. Just clarity on what to automate first.</p>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ borderTop: `1px solid ${G.border}`, padding: "68px clamp(20px,5vw,60px) 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }} className="grid-mobile-1">

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 22, height: 22, position: "relative", flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 0, border: `1px solid ${G.green}`, animation: "spin 9s linear infinite" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", width: 4, height: 4, marginLeft: -2, marginTop: -2, background: G.green, borderRadius: "50%", boxShadow: `0 0 6px ${G.green}` }} />
                </div>
                <div>
                  <div className="syne" style={{ color: G.green, fontSize: 13, fontWeight: 800, letterSpacing: ".25em", lineHeight: 1 }}>{SITE_CONFIG.agencyName}</div>
                  <div className="mono" style={{ color: G.muted, fontSize: 8, letterSpacing: ".18em" }}>{SITE_CONFIG.tagline}</div>
                </div>
              </div>
              <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, maxWidth: 250, marginBottom: 24 }}>{SITE_CONFIG.description}</p>
              <div style={{ display: "flex", gap: 14 }}>
                <button className="btn-text" onClick={openWA}>WhatsApp</button>
                <button className="btn-text" onClick={openLI}>LinkedIn</button>
                <button className="btn-text" onClick={openEmail}>Email</button>
              </div>
            </div>

            {/* Industries */}
            <div>
              <div className="syne" style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".2em", marginBottom: 18 }}>INDUSTRIES</div>
              {Object.keys(NICHES).concat(["HR & Recruitment"]).slice(0, 5).map(l => (
                <button key={l} className="footer-link" onClick={() => { changeNiche(l.replace(" & Recruitment", "")); scrollTo("industries"); }} style={{ background: "none", border: "none", textAlign: "left" }}>{l}</button>
              ))}
            </div>

            {/* Services */}
            <div>
              <div className="syne" style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".2em", marginBottom: 18 }}>SERVICES</div>
              {SERVICES.map(s => (
                <button key={s.title} className="footer-link" onClick={() => scrollTo("services")} style={{ background: "none", border: "none", textAlign: "left" }}>{s.title}</button>
              ))}
            </div>

            {/* Company */}
            <div>
              <div className="syne" style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".2em", marginBottom: 18 }}>COMPANY</div>
              {[
                { label: "How It Works", action: () => scrollTo("how-it-works") },
                { label: "Try Demo", action: () => scrollTo("demo") },
                { label: "Book A Call", action: bookCall },
                { label: "WhatsApp Us", action: openWA },
                { label: "Email Us", action: openEmail },
              ].map(item => (
                <button key={item.label} className="footer-link" onClick={item.action} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer" }}>{item.label}</button>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: `1px solid ${G.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span className="mono" style={{ color: "#333355", fontSize: 11 }}>
              <span style={{ color: G.green }}>›</span> Systems online. Automations running. Ready when you are.<span style={{ animation: "blink 1s step-end infinite" }}>_</span>
            </span>
            <span className="mono" style={{ color: "#333355", fontSize: 10 }}>{SITE_CONFIG.copyright}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
