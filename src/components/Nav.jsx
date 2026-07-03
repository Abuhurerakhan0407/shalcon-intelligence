import { useState, useEffect } from "react";
import { SITE_CONFIG, G } from "../data/content.js";

/**
 * Nav — fixed top bar (ported structure from source, brief §3/§12.1).
 * - Logo uses shalcon-logo.svg (replaces old spinning-square mark).
 * - Desktop links + "Book A Call" ghost button.
 * - "Calculate My ROI" distinct filled pill (key feature entry point, §12.1).
 *   Idle pulse-glow animation is added in Phase 5 — static pill here.
 * - Mobile hamburger + dropdown menu (functional, brief §5).
 *
 * Scroll-to uses native scrollIntoView (base behavior, NOT an animation lib).
 */
const LINKS = ["Services", "Industries", "How It Works", "Demo"];

export default function Nav({ onBookCall, onOpenROI }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Active-section scroll spy (lightweight, IntersectionObserver only).
  useEffect(() => {
    const ids = LINKS.map((l) => l.toLowerCase().replace(/ /g, "-"));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
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
        {/* Logo */}
        <button
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
          <img
            src="/shalcon-logo.svg"
            alt="Shalcon Intelligence logo"
            width={26}
            height={26}
            style={{ flexShrink: 0, display: "block" }}
          />
          <div style={{ textAlign: "left" }}>
            <div
              className="syne"
              style={{ color: G.green, fontSize: 13, fontWeight: 800, letterSpacing: ".26em", lineHeight: 1 }}
            >
              {SITE_CONFIG.agencyName}
            </div>
            <div className="mono" style={{ color: G.muted, fontSize: 8, letterSpacing: ".2em" }}>
              {SITE_CONFIG.tagline}
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {LINKS.map((l) => {
            const id = l.toLowerCase().replace(/ /g, "-");
            return (
              <button
                key={l}
                className={`nav-link${activeId === id ? " active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {l}
              </button>
            );
          })}
          {/* Key feature entry point — distinct filled pill (brief §12.1) */}
          <button className="roi-nav-pill" onClick={onOpenROI}>
            Calculate My ROI
          </button>
          <button className="btn-ghost" onClick={onBookCall}>
            <span>Book A Call</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="mobile-menu-btn"
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div
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
          {LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase().replace(/ /g, "-"))}
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
              › {l}
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
            Calculate My ROI
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
