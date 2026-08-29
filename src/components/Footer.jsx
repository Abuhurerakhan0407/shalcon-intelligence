import { SITE_CONFIG, NICHES, SERVICES, G } from "../data/content.js";

export default function Footer({ onBookCall, onWhatsApp, onLinkedIn, onEmail }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ borderTop: `1px solid ${G.border}`, padding: "68px clamp(20px,5vw,60px) 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid-cards-4" style={{ gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <img src="/shalcon-logo.svg" alt="Shalcon Intelligence logo" width={22} height={22} style={{ flexShrink: 0, display: "block" }} />
              <div>
                <div className="syne" style={{ color: G.green, fontSize: 13, fontWeight: 800, letterSpacing: ".25em", lineHeight: 1 }}>{SITE_CONFIG.agencyName}</div>
                <div className="mono" style={{ color: G.muted, fontSize: 8, letterSpacing: ".18em" }}>{SITE_CONFIG.tagline}</div>
              </div>
            </div>
            <p className="mono" style={{ color: G.muted, fontSize: 12, lineHeight: 1.9, maxWidth: 250, marginBottom: 24 }}>{SITE_CONFIG.description}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-text" onClick={onWhatsApp}>WhatsApp</button>
              <button className="btn-text" onClick={onLinkedIn}>LinkedIn</button>
              <button className="btn-text" onClick={onEmail}>Email</button>
            </div>
          </div>

          <div>
            <div className="syne" style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".2em", marginBottom: 18 }}>INDUSTRIES</div>
            {Object.keys(NICHES).map((l) => <button key={l} className="footer-link" onClick={() => scrollTo("industries")}>{l}</button>)}
          </div>

          <div>
            <div className="syne" style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".2em", marginBottom: 18 }}>SERVICES</div>
            {SERVICES.map((s) => <button key={s.title} className="footer-link" onClick={() => scrollTo("services")}>{s.title}</button>)}
          </div>

          <div>
            <div className="syne" style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".2em", marginBottom: 18 }}>COMPANY</div>
            {[
              { label: "How It Works", action: () => scrollTo("how-it-works") },
              { label: "Interactive Demo", action: () => scrollTo("demo") },
              { label: "Book A Call", action: onBookCall },
              { label: "WhatsApp Us", action: onWhatsApp },
              { label: "Email Us", action: onEmail },
            ].map((item) => <button key={item.label} className="footer-link" onClick={item.action}>{item.label}</button>)}
            <a className="footer-link" href="/privacy.html" target="_blank" rel="noreferrer">Privacy</a>
            <a className="footer-link" href="/terms.html" target="_blank" rel="noreferrer">Terms</a>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${G.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span className="mono" style={{ color: "#333355", fontSize: 11 }}><span style={{ color: G.green }}>›</span> Audit. Build. Measure. Improve.</span>
          <span className="mono" style={{ color: "#333355", fontSize: 10 }}>{SITE_CONFIG.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
