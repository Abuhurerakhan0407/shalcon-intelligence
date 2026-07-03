import { useState, useEffect, useRef } from "react";
import { SITE_CONFIG, ROI_PACKAGES, ROI_INDUSTRIES, formatINR } from "../data/content.js";

/* ══════════════════════════════════════════════════ */
/* Phase 6 port note (brief §12.3): internals are byte-identical to
   source/shalcon_roi_calculator.jsx. The ONLY changes on port are:
   1. import path (../src/data → ../data),
   2. the CONTACT object below — the confirmed phase references CONTACT.*
      but the source never defined it (would ReferenceError at runtime).
      §12.3 explicitly sanctions adding it with the real SITE_CONFIG values.
   Do not touch PACKAGES/INDUSTRIES/useCountUp/formatINR, the phase flow,
   loss math, or the glitch/scanline/particle effects. */
const CONTACT = {
  whatsapp: "919833001193",
  calendly: "https://calendly.com/shalconintelligence/30min",
  email: "shalconintelligence@gmail.com",
};

function useCountUp(target, duration = 2200, active = false) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(ease * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setVal(target);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, active]);
  return val;
}

export default function ROICalculator() {
  const [phase, setPhase] = useState("calc"); // calc | reveal | pricing | capture | confirmed
  const [currency, setCurrency] = useState("INR");
  const [industry, setIndustry] = useState(null);
  const [inquiries, setInquiries] = useState(50);
  const [missPercent, setMissPercent] = useState(40);
  const [avgTxn, setAvgTxn] = useState(2000);
  const [countActive, setCountActive] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [form, setForm] = useState({ name: "", whatsapp: "", company: "" });
  const [formError, setFormError] = useState("");
  const [glitch, setGlitch] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [particles, setParticles] = useState([]);

  const dailyLoss = Math.round((inquiries * (missPercent / 100)) * avgTxn);
  const monthlyLoss = dailyLoss * 30;
  const yearlyLoss = dailyLoss * 365;

  const dailyCount = useCountUp(dailyLoss, 1800, countActive);
  const monthlyCount = useCountUp(monthlyLoss, 2200, countActive);
  const yearlyCount = useCountUp(yearlyLoss, 2600, countActive);

  // Glitch effect
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Scanline
  useEffect(() => {
    let pos = 0;
    const id = setInterval(() => { pos = (pos + 0.8) % 100; setScanLine(pos); }, 25);
    return () => clearInterval(id);
  }, []);

  // Particles
  useEffect(() => {
    setParticles(Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.15 + 0.03,
    })));
  }, []);

  const handleCalculate = () => {
    if (!industry) return;
    setPhase("reveal");
    setTimeout(() => setCountActive(true), 400);
  };

  const handleRevealPricing = () => {
    setPhase("pricing");
  };

  const handleSelectPkg = (pkg) => {
    setSelectedPkg(pkg);
    setPhase("capture");
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.whatsapp.trim()) {
      setFormError("Name and WhatsApp number are required.");
      return;
    }
    setFormError("");
    setPhase("confirmed");
  };

  const reset = () => {
    setPhase("calc");
    setCountActive(false);
    setSelectedPkg(null);
    setForm({ name: "", whatsapp: "", company: "" });
    setFormError("");
  };

  const ind = ROI_INDUSTRIES.find(i => i.id === industry);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@300;400;500;600&family=Syne+Mono&display=swap');
    .roi-root{font-family:'IBM Plex Mono',monospace;background:#030308;min-height:100vh;color:#fff;position:relative;overflow:hidden}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes spinR{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
    @keyframes countUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes glitchH{0%,100%{clip-path:inset(0 0 95% 0)}25%{clip-path:inset(20% 0 60% 0)}50%{clip-path:inset(50% 0 30% 0)}75%{clip-path:inset(80% 0 5% 0)}}
    @keyframes revealSlide{from{opacity:0;transform:translateY(40px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes borderPulse{0%,100%{opacity:.6}50%{opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes progressFill{from{width:0}to{width:100%}}
    @keyframes ringExpand{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes numberShake{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}

    .roi-btn{display:inline-flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-weight:600;letter-spacing:.06em;cursor:pointer;transition:all .3s ease;border:none;position:relative;overflow:hidden}
    .roi-btn-ghost{background:transparent;border:1px solid #00FF94;color:#00FF94;padding:13px 28px;font-size:12px}
    .roi-btn-ghost::before{content:'';position:absolute;inset:0;background:#00FF94;transform:translateX(-101%);transition:transform .3s ease;z-index:0}
    .roi-btn-ghost:hover::before{transform:translateX(0)}
    .roi-btn-ghost:hover{color:#030308}
    .roi-btn-ghost>span{position:relative;z-index:1}
    .roi-btn-red{background:transparent;border:1px solid #FF4444;color:#FF4444;padding:13px 28px;font-size:12px}
    .roi-btn-green{background:#00FF94;color:#030308;padding:16px 36px;font-size:13px;font-weight:700;font-family:'Syne',sans-serif}
    .roi-btn-green:hover{transform:scale(1.04);box-shadow:0 0 40px #00FF9455}
    .roi-btn-green::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.2);transform:translateX(-101%);transition:transform .35s ease}
    .roi-btn-green:hover::after{transform:translateX(0)}

    .roi-select{background:#0A0A14;border:1px solid #1A1A2E;color:#fff;font-family:'IBM Plex Mono',monospace;font-size:12px;padding:12px 16px;width:100%;outline:none;cursor:pointer;transition:border-color .2s;appearance:none;-webkit-appearance:none}
    .roi-select:focus{border-color:#00FF94}
    .roi-input{background:#0A0A14;border:1px solid #1A1A2E;color:#fff;font-family:'IBM Plex Mono',monospace;font-size:12px;padding:12px 14px;width:100%;outline:none;transition:border-color .2s}
    .roi-input:focus{border-color:#00FF94}
    .roi-input::placeholder{color:#333355}

    .roi-slider{-webkit-appearance:none;appearance:none;width:100%;height:3px;background:#1A1A2E;outline:none;cursor:pointer}
    .roi-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;background:#00FF94;cursor:pointer;border-radius:50%;box-shadow:0 0 10px #00FF9466;border:2px solid #030308}
    .roi-slider::-moz-range-thumb{width:18px;height:18px;background:#00FF94;cursor:pointer;border-radius:50%;box-shadow:0 0 10px #00FF9466;border:2px solid #030308}

    .pkg-card{background:#0A0A14;border:1px solid #1A1A2E;padding:28px 24px;transition:all .35s cubic-bezier(.16,1,.3,1);cursor:pointer;position:relative;overflow:hidden}
    .pkg-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,currentColor,transparent);transform:translateX(-100%);transition:transform .5s ease}
    .pkg-card:hover::before{transform:translateX(100%)}
    .pkg-card:hover{transform:translateY(-6px)}

    .loss-num{font-family:'Syne Mono',monospace;animation:numberShake 3s ease-in-out infinite}

    @media(max-width:640px){
      .roi-grid-3{grid-template-columns:1fr!important}
      .roi-two-col{grid-template-columns:1fr!important}
      .roi-currency-row{flex-direction:column;gap:8px!important}
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="roi-root">

        {/* Particles */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size, borderRadius: "50%",
              background: "#00FF94", opacity: p.opacity,
              animation: `float ${3 + p.speed * 10}s ease-in-out ${p.id * 0.2}s infinite`,
            }} />
          ))}
        </div>

        {/* Scanline */}
        <div style={{ position: "fixed", top: `${scanLine}vh`, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,255,148,.04),transparent)", pointerEvents: "none", zIndex: 1 }} />

        {/* Grain */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, opacity: .018, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 960, margin: "0 auto", padding: "clamp(24px,5vw,60px) clamp(16px,4vw,40px)" }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: 56, animation: "fadeUp .7s ease both" }}>
            {/* Logo mark */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ width: 28, height: 28, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, border: "1px solid #00FF94", animation: "spin 9s linear infinite" }} />
                <div style={{ position: "absolute", inset: 6, border: "1px solid #00FF9444", animation: "spinR 6s linear infinite" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5, background: "#00FF94", borderRadius: "50%", boxShadow: "0 0 8px #00FF94" }} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", color: "#00FF94", fontSize: 13, fontWeight: 800, letterSpacing: ".26em", lineHeight: 1 }}>SHALCON</div>
                <div style={{ color: "#555577", fontSize: 8, letterSpacing: ".2em" }}>INTELLIGENCE</div>
              </div>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0A0A14", border: "1px solid #1A1A2E", padding: "6px 14px", marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4444", animation: "pulse 1.5s ease-in-out infinite" }} />
              <span style={{ color: "#FF4444", fontSize: 9, letterSpacing: ".16em" }}>REVENUE LEAK DETECTOR</span>
            </div>

            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,5vw,52px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 14 }}>
              Before we show you our price —<br />
              <span style={{ color: "#FF4444", textShadow: glitch ? "3px 0 #00FF94,-3px 0 #FF4FD8" : "0 0 40px #FF444433" }}>find out what you're losing.</span>
            </h1>
            <p style={{ color: "#555577", fontSize: 13, lineHeight: 1.9, maxWidth: 560, margin: "0 auto" }}>
              Most businesses don't know their exact daily revenue leak. This calculator shows you the number — then shows you what it costs to stop it permanently.
            </p>
          </div>

          {/* ════════ PHASE: CALC ════════ */}
          {phase === "calc" && (
            <div style={{ animation: "revealSlide .6s ease both" }}>

              {/* Currency toggle */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0, marginBottom: 28 }} className="roi-currency-row">
                <span style={{ color: "#555577", fontSize: 10, letterSpacing: ".1em", marginRight: 12 }}>CURRENCY:</span>
                {["INR", "USD"].map(c => (
                  <button key={c} onClick={() => setCurrency(c)} style={{ background: currency === c ? "#00FF94" : "transparent", border: "1px solid " + (currency === c ? "#00FF94" : "#1A1A2E"), color: currency === c ? "#030308" : "#555577", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, padding: "6px 16px", cursor: "pointer", fontWeight: currency === c ? 700 : 400, transition: "all .2s" }}>
                    {c}
                  </button>
                ))}
              </div>

              {/* Step 1: Industry */}
              <div style={{ background: "#080812", border: "1px solid #1A1A2E", padding: "28px 28px", marginBottom: 14, position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#00FF94" }} />
                <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".2em", marginBottom: 14, paddingLeft: 4 }}>STEP 01 · SELECT YOUR INDUSTRY</div>
                <div style={{ position: "relative" }}>
                  <select className="roi-select" value={industry || ""} onChange={e => {
                    const found = ROI_INDUSTRIES.find(i => i.id === e.target.value);
                    setIndustry(e.target.value);
                    if (found) { setInquiries(found.dailyInq); setMissPercent(found.missRate); setAvgTxn(found.avgTxn); }
                  }}>
                    <option value="">› Choose your industry...</option>
                    {ROI_INDUSTRIES.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
                  </select>
                  <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#00FF94", fontSize: 10, pointerEvents: "none" }}>▼</div>
                </div>
                {ind && (
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "#FF44440A", border: "1px solid #FF444422", borderLeft: "3px solid #FF4444" }}>
                    <span style={{ color: "#FF6666", fontSize: 11, lineHeight: 1.7 }}>{ind.painLine}</span>
                  </div>
                )}
              </div>

              {/* Step 2: Inquiries */}
              <div style={{ background: "#080812", border: "1px solid #1A1A2E", padding: "28px 28px", marginBottom: 14, position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#FF9F00" }} />
                <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".2em", marginBottom: 18, paddingLeft: 4 }}>STEP 02 · DAILY INQUIRY VOLUME</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                  <span style={{ color: "#8888AA", fontSize: 12 }}>Inquiries you receive per day</span>
                  <span style={{ fontFamily: "'Syne Mono',monospace", color: "#00FF94", fontSize: 22, fontWeight: 800 }}>{inquiries}</span>
                </div>
                <input type="range" min={1} max={500} value={inquiries} onChange={e => setInquiries(Number(e.target.value))} className="roi-slider" style={{ background: `linear-gradient(to right,#00FF94 ${inquiries / 5}%,#1A1A2E ${inquiries / 5}%)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ color: "#333355", fontSize: 9 }}>1/day</span>
                  <span style={{ color: "#333355", fontSize: 9 }}>500/day</span>
                </div>
              </div>

              {/* Step 3: Miss rate */}
              <div style={{ background: "#080812", border: "1px solid #1A1A2E", padding: "28px 28px", marginBottom: 14, position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#FF4444" }} />
                <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".2em", marginBottom: 18, paddingLeft: 4 }}>STEP 03 · MISSED OR DELAYED RESPONSES</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                  <span style={{ color: "#8888AA", fontSize: 12 }}>% of inquiries going unanswered or delayed {">"}2hrs</span>
                  <span style={{ fontFamily: "'Syne Mono',monospace", color: "#FF4444", fontSize: 22, fontWeight: 800 }}>{missPercent}%</span>
                </div>
                <input type="range" min={1} max={95} value={missPercent} onChange={e => setMissPercent(Number(e.target.value))} className="roi-slider" style={{ background: `linear-gradient(to right,#FF4444 ${missPercent}%,#1A1A2E ${missPercent}%)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ color: "#333355", fontSize: 9 }}>1%</span>
                  <span style={{ color: "#333355", fontSize: 9 }}>95%</span>
                </div>
              </div>

              {/* Step 4: Avg transaction */}
              <div style={{ background: "#080812", border: "1px solid #1A1A2E", padding: "28px 28px", marginBottom: 28, position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#A78BFA" }} />
                <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".2em", marginBottom: 18, paddingLeft: 4 }}>
                  STEP 04 · AVERAGE TRANSACTION VALUE {currency === "INR" ? "(₹)" : "($)"}
                  {ind && <span style={{ color: "#555577", fontWeight: 400 }}> · {ind.lossLabel}</span>}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ color: "#A78BFA", fontSize: 18, fontWeight: 800, fontFamily: "'Syne Mono',monospace", flexShrink: 0 }}>
                    {currency === "INR" ? "₹" : "$"}
                  </span>
                  <input type="number" className="roi-input" value={avgTxn} onChange={e => setAvgTxn(Math.max(1, Number(e.target.value)))}
                    placeholder="Enter average value..." style={{ fontSize: 16, fontFamily: "'Syne Mono',monospace", fontWeight: 700, color: "#A78BFA" }} />
                </div>
              </div>

              {/* Preview */}
              {industry && (
                <div style={{ background: "#0D0008", border: "1px solid #FF444422", padding: "18px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 16, animation: "fadeIn .4s ease" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF4444", flexShrink: 0, animation: "pulse 1.2s ease-in-out infinite" }} />
                  <div>
                    <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".12em", marginBottom: 4 }}>ESTIMATED DAILY REVENUE LEAK</div>
                    <div style={{ fontFamily: "'Syne Mono',monospace", color: "#FF4444", fontSize: 22, fontWeight: 800 }}>
                      {currency === "INR" ? formatINR(dailyLoss) : `$${dailyLoss.toLocaleString()}`}
                      <span style={{ color: "#FF666666", fontSize: 12, fontWeight: 400, marginLeft: 8 }}>/ day</span>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <button className="roi-btn roi-btn-green" onClick={handleCalculate} disabled={!industry} style={{ opacity: industry ? 1 : .4, flex: 1, minWidth: 200, fontSize: 14 }}>
                  [ CALCULATE MY EXACT LOSS → ]
                </button>
                {!industry && <span style={{ color: "#333355", fontSize: 11 }}>← Select industry first</span>}
              </div>
            </div>
          )}

          {/* ════════ PHASE: REVEAL ════════ */}
          {phase === "reveal" && (
            <div style={{ animation: "revealSlide .7s ease both" }}>

              {/* Warning header */}
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1A0000", border: "1px solid #FF444444", padding: "8px 18px", marginBottom: 24, animation: "borderPulse 2s ease-in-out infinite" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF4444", animation: "pulse 1s ease-in-out infinite" }} />
                  <span style={{ color: "#FF4444", fontSize: 10, letterSpacing: ".16em" }}>REVENUE LEAK DETECTED · {ind?.label}</span>
                </div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,4vw,40px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
                  Here is what your current<br />situation is costing you.
                </h2>
                <p style={{ color: "#555577", fontSize: 12 }}>Based on {inquiries} daily inquiries · {missPercent}% missed · {currency === "INR" ? `₹${avgTxn.toLocaleString()}` : `$${avgTxn}`} avg value</p>
              </div>

              {/* Loss numbers — the dramatic moment */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }} className="roi-grid-3">
                {[
                  { label: "PER DAY", val: dailyCount, color: "#FF6644" },
                  { label: "PER MONTH", val: monthlyCount, color: "#FF4444" },
                  { label: "PER YEAR", val: yearlyCount, color: "#CC2222" },
                ].map((item, i) => (
                  <div key={item.label} style={{ background: "#0D0005", border: `1px solid ${item.color}33`, padding: "28px 20px", textAlign: "center", position: "relative", overflow: "hidden", animation: `revealSlide .6s ease ${i * .15}s both` }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%,${item.color}08,transparent 70%)` }} />
                    <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".18em", marginBottom: 16 }}>{item.label}</div>
                    <div className="loss-num" style={{ fontFamily: "'Syne Mono',monospace", fontSize: "clamp(20px,3.5vw,34px)", fontWeight: 800, color: item.color, lineHeight: 1, marginBottom: 8, textShadow: `0 0 30px ${item.color}44` }}>
                      {currency === "INR" ? formatINR(item.val) : `$${item.val.toLocaleString()}`}
                    </div>
                    <div style={{ height: 2, background: "#1A1A2E", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, background: item.color, animation: `progressFill 2.5s ease ${i * .2}s both` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div style={{ background: "#0D0005", border: "1px solid #FF444422", padding: "22px 24px", marginBottom: 14, animation: "fadeIn 1s ease .8s both" }}>
                <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".16em", marginBottom: 16 }}>LOSS BREAKDOWN</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="roi-two-col">
                  {[
                    { label: "Inquiries leaking daily", val: `${Math.round(inquiries * missPercent / 100)} of ${inquiries}` },
                    { label: "Leak rate", val: `${missPercent}%` },
                    { label: "Revenue per missed lead", val: currency === "INR" ? `₹${avgTxn.toLocaleString()}` : `$${avgTxn}` },
                    { label: "Brand damage & referrals", val: "Not counted" },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1A1A2E" }}>
                      <span style={{ color: "#555577", fontSize: 11 }}>{item.label}</span>
                      <span style={{ fontFamily: "'Syne Mono',monospace", color: "#FF6644", fontSize: 11 }}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pain reinforcement */}
              {ind && (
                <div style={{ padding: "16px 20px", background: "#0A0008", border: "1px solid #FF444422", borderLeft: "3px solid #FF4444", marginBottom: 36, animation: "fadeIn 1s ease 1.2s both" }}>
                  <span style={{ color: "#FF6666", fontSize: 12, lineHeight: 1.8 }}>
                    ⚠️ {ind.painLine} This number above is the proof.
                  </span>
                </div>
              )}

              {/* The pivot line */}
              <div style={{ textAlign: "center", marginBottom: 36, animation: "fadeIn 1s ease 1.6s both" }}>
                <div style={{ display: "inline-block", padding: "0 24px", position: "relative" }}>
                  <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#1A1A2E" }} />
                  <span style={{ position: "relative", background: "#030308", padding: "0 16px", color: "#555577", fontSize: 12 }}>
                    here is what it costs to stop this permanently
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeIn 1s ease 2s both" }}>
                <button className="roi-btn roi-btn-green" onClick={handleRevealPricing} style={{ flex: 1, minWidth: 240, fontSize: 13 }}>
                  [ SEE THE SOLUTION & PRICING → ]
                </button>
                <button className="roi-btn roi-btn-ghost" onClick={reset} style={{ padding: "13px 20px" }}>
                  <span>← Recalculate</span>
                </button>
              </div>
            </div>
          )}

          {/* ════════ PHASE: PRICING ════════ */}
          {phase === "pricing" && (
            <div style={{ animation: "revealSlide .6s ease both" }}>

              {/* Loss reminder bar */}
              <div style={{ background: "#0D0005", border: "1px solid #FF444422", padding: "14px 20px", marginBottom: 36, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".14em", marginBottom: 4 }}>YOUR CURRENT DAILY LOSS</div>
                  <div style={{ fontFamily: "'Syne Mono',monospace", color: "#FF4444", fontSize: 20, fontWeight: 800 }}>
                    {currency === "INR" ? formatINR(dailyLoss) : `$${dailyLoss.toLocaleString()}`}
                    <span style={{ color: "#555577", fontSize: 11, fontWeight: 400, marginLeft: 8 }}>every single day</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4444", animation: "pulse 1.2s ease-in-out infinite" }} />
                  <span style={{ color: "#FF6644", fontSize: 10, letterSpacing: ".1em" }}>STILL LOSING WHILE YOU READ THIS</span>
                </div>
              </div>

              <div style={{ textAlign: "center", marginBottom: 44 }}>
                <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".2em", marginBottom: 12 }}>› THE INVESTMENT</div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,4vw,42px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 14 }}>
                  Choose how much of<br /><span style={{ color: "#00FF94" }}>your loss you want to stop.</span>
                </h2>
                <p style={{ color: "#555577", fontSize: 12, maxWidth: 480, margin: "0 auto" }}>
                  Every package below stops a specific percentage of your daily leak. Pick the one that matches your scale.
                </p>
              </div>

              {/* Package cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 36 }} className="roi-grid-3">
                {ROI_PACKAGES.map((pkg, i) => {
                  const lossStopped = Math.round(dailyLoss * pkg.lossMultiplier);
                  const monthlyLossStopped = lossStopped * 30;
                  return (
                    <div key={pkg.name} className="pkg-card"
                      style={{ borderColor: pkg.recommended ? `${pkg.color}66` : "#1A1A2E", color: pkg.color, animation: `revealSlide .5s ease ${i * .12}s both`, boxShadow: pkg.recommended ? `0 0 40px ${pkg.color}11` : "none" }}
                      onClick={() => handleSelectPkg(pkg)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `${pkg.color}66`; e.currentTarget.style.boxShadow = `0 20px 50px ${pkg.color}11`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = pkg.recommended ? `${pkg.color}66` : "#1A1A2E"; e.currentTarget.style.boxShadow = pkg.recommended ? `0 0 40px ${pkg.color}11` : "none"; }}>

                      {pkg.recommended && (
                        <div style={{ position: "absolute", top: 0, right: 0, background: pkg.color, color: "#030308", fontSize: 8, fontWeight: 800, padding: "5px 12px", letterSpacing: ".14em" }}>MOST CHOSEN</div>
                      )}

                      {/* Top accent line */}
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${pkg.color},transparent)`, opacity: pkg.recommended ? 1 : .4 }} />

                      <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".18em", marginBottom: 10 }}>{pkg.timeline.toUpperCase()}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4, letterSpacing: ".06em" }}>{pkg.name}</div>
                      <div style={{ fontSize: 11, color: "#555577", marginBottom: 22 }}>{pkg.tagline}</div>

                      {/* Loss stopped — the key number */}
                      <div style={{ background: `${pkg.color}0D`, border: `1px solid ${pkg.color}22`, padding: "14px 16px", marginBottom: 20 }}>
                        <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".12em", marginBottom: 6 }}>DAILY LOSS THIS STOPS</div>
                        <div style={{ fontFamily: "'Syne Mono',monospace", color: pkg.color, fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 800, textShadow: `0 0 20px ${pkg.color}44` }}>
                          {currency === "INR" ? formatINR(lossStopped) : `$${lossStopped.toLocaleString()}`}
                          <span style={{ fontSize: 10, color: "#555577", fontWeight: 400 }}>/day</span>
                        </div>
                        <div style={{ color: "#555577", fontSize: 10, marginTop: 4 }}>
                          = {currency === "INR" ? formatINR(monthlyLossStopped) : `$${monthlyLossStopped.toLocaleString()}`} recovered/month
                        </div>
                      </div>

                      {/* Breakeven */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "8px 12px", background: "#0A0A14" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: pkg.color, flexShrink: 0 }} />
                        <span style={{ color: "#8888AA", fontSize: 10 }}>
                          Break even in <strong style={{ color: pkg.color }}>{pkg.breakevenDays} days</strong>
                        </span>
                      </div>

                      {/* Features */}
                      <div style={{ marginBottom: 22 }}>
                        {pkg.features.map(f => (
                          <div key={f} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                            <span style={{ color: pkg.color, flexShrink: 0, fontSize: 10, marginTop: 1 }}>✓</span>
                            <span style={{ color: "#8888AA", fontSize: 11, lineHeight: 1.5 }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price */}
                      <div style={{ borderTop: "1px solid #1A1A2E", paddingTop: 18, marginBottom: 18 }}>
                        <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".12em", marginBottom: 8 }}>INVESTMENT</div>
                        <div style={{ fontFamily: "'Syne Mono',monospace", color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                          {currency === "INR" ? pkg.setup.INR : pkg.setup.USD}
                        </div>
                        <div style={{ color: "#555577", fontSize: 11 }}>
                          + {currency === "INR" ? pkg.monthly.INR : pkg.monthly.USD}
                        </div>
                      </div>

                      {/* CTA */}
                      <div style={{ background: pkg.color, color: "#030308", padding: "11px 16px", textAlign: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: ".06em", transition: "opacity .2s" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = ".85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                        SELECT {pkg.name} →
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guarantee */}
              <div style={{ background: "#04100A", border: "1px solid #00FF9422", padding: "24px 28px", marginBottom: 20, textAlign: "center" }}>
                <div style={{ color: "#00FF94", fontSize: 10, letterSpacing: ".18em", marginBottom: 12 }}>› OUR GUARANTEE</div>
                <p style={{ color: "#8888AA", fontSize: 12, lineHeight: 1.9, maxWidth: 560, margin: "0 auto" }}>
                  If your system doesn't go live within <strong style={{ color: "#fff" }}>10 days</strong> — you pay nothing.<br />
                  If it doesn't perform as scoped in <strong style={{ color: "#fff" }}>30 days</strong> — we rebuild it free.<br />
                  <strong style={{ color: "#00FF94" }}>We only win when you stop losing.</strong>
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <button className="roi-btn roi-btn-ghost" onClick={() => setPhase("reveal")} style={{ fontSize: 11 }}>
                  <span>← Back to my loss calculation</span>
                </button>
              </div>
            </div>
          )}

          {/* ════════ PHASE: CAPTURE ════════ */}
          {phase === "capture" && selectedPkg && (
            <div style={{ maxWidth: 560, margin: "0 auto", animation: "revealSlide .6s ease both" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${selectedPkg.color}11`, border: `1px solid ${selectedPkg.color}44`, padding: "8px 18px", marginBottom: 20 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: selectedPkg.color }} />
                  <span style={{ color: selectedPkg.color, fontSize: 10, letterSpacing: ".14em" }}>{selectedPkg.name} PACKAGE SELECTED</span>
                </div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,4vw,38px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 14 }}>
                  One step to stop<br /><span style={{ color: selectedPkg.color }}>
                    {currency === "INR" ? formatINR(dailyLoss) : `$${dailyLoss.toLocaleString()}`}/day in losses.
                  </span>
                </h2>
                <p style={{ color: "#555577", fontSize: 12, lineHeight: 1.8 }}>
                  Leave your details. We'll reach out within 2 hours to schedule your free 30-minute audit and get your system started.
                </p>
              </div>

              {/* Summary card */}
              <div style={{ background: "#080812", border: `1px solid ${selectedPkg.color}33`, padding: "20px 22px", marginBottom: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="roi-two-col">
                {[
                  { label: "Selected package", val: selectedPkg.name },
                  { label: "Your daily loss", val: currency === "INR" ? formatINR(dailyLoss) : `$${dailyLoss.toLocaleString()}` },
                  { label: "Loss recovered/day", val: currency === "INR" ? formatINR(Math.round(dailyLoss * selectedPkg.lossMultiplier)) : `$${Math.round(dailyLoss * selectedPkg.lossMultiplier).toLocaleString()}` },
                  { label: "Break even", val: `Day ${selectedPkg.breakevenDays}` },
                ].map(item => (
                  <div key={item.label} style={{ padding: "8px 0", borderBottom: "1px solid #1A1A2E" }}>
                    <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".1em", marginBottom: 4 }}>{item.label.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Syne Mono',monospace", color: selectedPkg.color, fontSize: 13, fontWeight: 700 }}>{item.val}</div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {[
                  { placeholder: "Your full name *", key: "name", type: "text" },
                  { placeholder: "WhatsApp number (with country code) *", key: "whatsapp", type: "tel" },
                  { placeholder: "Company / Business name", key: "company", type: "text" },
                ].map(field => (
                  <input key={field.key} type={field.type} className="roi-input" placeholder={field.placeholder}
                    value={form[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()} />
                ))}
              </div>

              {formError && (
                <div style={{ color: "#FF4444", fontSize: 11, marginBottom: 16, padding: "8px 12px", background: "#1A0000", border: "1px solid #FF444422" }}>{formError}</div>
              )}

              <button className="roi-btn roi-btn-green" onClick={handleSubmit} style={{ width: "100%", marginBottom: 14, fontSize: 13 }}>
                [ BOOK MY FREE AUDIT CALL → ]
              </button>

              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="roi-btn roi-btn-ghost" onClick={() => window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}`, "_blank")} style={{ fontSize: 11, padding: "10px 18px" }}>
                  <span>💬 WhatsApp Us Now</span>
                </button>
                <button className="roi-btn roi-btn-ghost" onClick={() => window.open(SITE_CONFIG.calendlyLink, "_blank")} style={{ fontSize: 11, padding: "10px 18px" }}>
                  <span>📅 Book Directly</span>
                </button>
              </div>

              <p style={{ color: "#333355", fontSize: 10, textAlign: "center", marginTop: 16 }}>
                No pitch. No pressure. 30 minutes to map exactly what to automate first.
              </p>

              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button className="roi-btn roi-btn-ghost" onClick={() => setPhase("pricing")} style={{ fontSize: 11 }}>
                  <span>← Change package</span>
                </button>
              </div>
            </div>
          )}

          {/* ════════ PHASE: CONFIRMED ════════ */}
          {phase === "confirmed" && (
            <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto", animation: "revealSlide .6s ease both" }}>
              {/* Success ring */}
              <div style={{ position: "relative", width: 110, height: 110, margin: "0 auto 36px" }}>
                <div style={{ position: "absolute", inset: 0, border: "1px solid #00FF9444", borderRadius: "50%", animation: "spin 8s linear infinite" }} />
                <div style={{ position: "absolute", inset: 10, border: "1px solid #00FF9466", borderRadius: "50%", animation: "spinR 6s linear infinite" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>✓</div>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ position: "absolute", inset: 0, border: "1px solid #00FF94", borderRadius: "50%", animation: `rippleOut 2s ease-in-out ${i * .65}s infinite`, opacity: 0 }} />
                ))}
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#04100A", border: "1px solid #00FF9433", padding: "7px 16px", marginBottom: 22 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF94", animation: "pulse 2s ease-in-out infinite" }} />
                <span style={{ color: "#00FF94", fontSize: 10, letterSpacing: ".14em" }}>REQUEST RECEIVED</span>
              </div>

              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
                We'll reach out<br /><span style={{ color: "#00FF94" }}>within 2 hours.</span>
              </h2>

              <p style={{ color: "#555577", fontSize: 13, lineHeight: 1.9, marginBottom: 32 }}>
                Your audit is being scheduled. In the meantime — you're still losing{" "}
                <strong style={{ color: "#FF4444" }}>{currency === "INR" ? formatINR(dailyLoss) : `$${dailyLoss.toLocaleString()}`} today.</strong>{" "}
                For immediate help, reach us directly:
              </p>

              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
                <button className="roi-btn roi-btn-green" onClick={() => window.open(`https://wa.me/${CONTACT.whatsapp}`, "_blank")} style={{ fontSize: 12 }}>
                  💬 WhatsApp Now
                </button>
                <button className="roi-btn roi-btn-ghost" onClick={() => window.open(CONTACT.calendly, "_blank")} style={{ fontSize: 11 }}>
                  <span>📅 Book Directly</span>
                </button>
              </div>

              {/* Final guarantee */}
              <div style={{ background: "#080812", border: "1px solid #1A1A2E", padding: "20px 22px", marginBottom: 24 }}>
                <div style={{ color: "#555577", fontSize: 9, letterSpacing: ".16em", marginBottom: 10 }}>WHAT HAPPENS NEXT</div>
                {["We call or WhatsApp you within 2 hours", "30-min free audit — no pitch, just clarity", "Build starts within 24hrs of agreement", "Your automation goes live within 10 days"].map((step, i) => (
                  <div key={step} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'Syne Mono',monospace", color: "#00FF94", fontSize: 10, flexShrink: 0, marginTop: 1 }}>0{i + 1}</span>
                    <span style={{ color: "#8888AA", fontSize: 12 }}>{step}</span>
                  </div>
                ))}
              </div>

              <button onClick={reset} style={{ background: "none", border: "none", color: "#333355", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>
                Run another calculation
              </button>
            </div>
          )}

          {/* ── Footer line ── */}
          <div style={{ marginTop: 72, borderTop: "1px solid #1A1A2E", paddingTop: 24, textAlign: "center" }}>
            <span style={{ color: "#222233", fontSize: 11 }}>
              › Systems online. Automations running. Ready when you are.<span style={{ animation: "blink 1s step-end infinite" }}>_</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
