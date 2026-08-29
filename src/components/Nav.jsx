import { useState, useEffect } from "react";
import { SITE_CONFIG, G } from "../data/content.js";

const LINKS = ["Services", "Industries", "How It Works", "Demo"];

export default function Nav({ onBookCall, onOpenROI }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const ids = LINKS.map((l) => l.toLowerCase().replace(/ /g, "-"));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 64,
          background: "rgba(3,3,8,.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${G.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px,5vw,60px)",
        }}
      >
        <button
          className="nav-brand"
          aria-label="Back to top — Shalcon Intelligence"
          onClick={() => scrollTo("hero")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 0,
          }}
        >
          <img src="/shalcon-logo.svg" alt="" width={26} height={26} style={{ flexShrink: 0, display: "block" }} />
          <div style={{ textAlign: "left" }}>
            <div className="syne" style={{ color: G.green, fontSize: 13, fontWeight: 800, letterSpacing: ".26em", lineHeight: 1 }}>
              {SITE_CONFIG.agencyName}
            </div>
            <div className="mono" style={{ color: G.muted, fontSize: 8, letterSpacing: ".2em" }}>
              {SITE_CONFIG.tagline}
            </div>
          </div>
        </button>

        <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {LINKS.map((label) => {
            const id = label.toLowerCase().replace(/ /g, "-");
            return (
              <button key={label} className={`nav-link${activeId === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
                {label}
              </button>
            );
          })}
          <button className="roi-nav-pill" onClick={onOpenROI}>Open Estimator</button>
          <button className="btn-ghost" onClick={onBookCall}><span>Book A Call</span></button>
        </div>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="mobile-menu-btn"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          style={{
            background: "none",
            border: `1px solid ${G.border}`,
            color: G.green,
            fontFamily: "'IBM Plex Mono',monospace",
            fontSize: 14,
            padding: "6px 12px",
            cursor: "pointer",
            letterSpacing: ".06em",
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "#050512",
            borderBottom: `1px solid ${G.border}`,
            padding: "28px 24px",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {LINKS.map((label) => (
            <button
              key={label}
              onClick={() => scrollTo(label.toLowerCase().replace(/ /g, "-"))}
              style={{
                background: "none",
                border: "none",
                color: G.muted,
                fontFamily: "'IBM Plex Mono',monospace",
                fontSize: 13,
                cursor: "pointer",
                textAlign: "left",
                padding: "12px 0",
                borderBottom: `1px solid ${G.border}`,
              }}
            >
              › {label}
            </button>
          ))}
          <button
            className="roi-nav-pill"
            style={{ marginTop: 16, width: "100%" }}
            onClick={() => {
              setMobileOpen(false);
              onOpenROI?.();
            }}
          >
            Open Estimator
          </button>
          <button
            className="btn-ghost"
            style={{ marginTop: 10 }}
            onClick={() => {
              setMobileOpen(false);
              onBookCall?.();
            }}
          >
            <span>Book A Free Call</span>
          </button>
        </div>
      )}
    </>
  );
}
