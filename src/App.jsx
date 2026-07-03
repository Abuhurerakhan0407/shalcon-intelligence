import { useEffect, useState, lazy, Suspense } from "react";
import { SITE_CONFIG, G } from "./data/content.js";
import CursorLight from "./components/CursorLight.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Nav from "./components/Nav.jsx";
import HeroSection from "./components/HeroSection.jsx";
import ROITeaser from "./components/ROITeaser.jsx";
import PlatformStats from "./components/PlatformStats.jsx";
import IndustriesSection from "./components/IndustriesSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import DemoWidget from "./components/DemoWidget.jsx";
import Testimonials from "./components/Testimonials.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";

// Lazy-loaded so the ROI calculator + modal code (and its deps) don't ship
// until the ROI button is first clicked (brief §12.5).
const ROICalculatorModal = lazy(() => import("./components/ROICalculatorModal.jsx"));

/**
 * App shell (Phase 3) — static layout, exact section order (brief §4):
 *   #hero → (#roi-teaser) → #industries → #roi-calculator → #services →
 *   #how-it-works → #demo → #testimonials → #book → footer
 *
 * Contact handlers use real SITE_CONFIG links (brief §3/§11).
 * ROI modal wiring is Phase 6 — onOpenROI is a stub for now so both entry
 * points (nav pill + teaser) are already connected structurally.
 */
export default function App() {
  const [roiOpen, setRoiOpen] = useState(false);

  const openLink = (url) => {
    if (url && url !== "#") window.open(url, "_blank", "noopener");
  };
  const onBookCall = () => openLink(SITE_CONFIG.calendlyLink);
  const onWhatsApp = () => openLink(`https://wa.me/${SITE_CONFIG.whatsappNumber}`);
  const onLinkedIn = () => openLink(SITE_CONFIG.linkedinURL);
  const onEmail = () => {
    window.location.href = `mailto:${SITE_CONFIG.email}`;
  };

  // Opens the ROI modal (Phase 6). Gives the clicked trigger a brief
  // scale-bounce before the modal animates in (brief §12.4). CSS handles the
  // reduced-motion gate, so no JS check is needed here.
  const onOpenROI = (e) => {
    const el = e?.currentTarget;
    if (el) {
      el.classList.remove("roi-bounce");
      // reflow so the animation can retrigger on repeat clicks
      void el.offsetWidth;
      el.classList.add("roi-bounce");
      setTimeout(() => el.classList.remove("roi-bounce"), 200);
    }
    setRoiOpen(true);
  };
  const onCloseROI = () => setRoiOpen(false);

  // ── Motion system (Phase 5) ── scroll reveals + magnetic buttons.
  // Gated on prefers-reduced-motion; lazy-imported so GSAP never blocks first
  // paint. Runs once after mount when the section DOM already exists.
  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let disposeReveal = () => {};
    let disposeMagnetic = () => {};
    let disposeCountUp = () => {};
    let cancelled = false;

    Promise.all([
      import("./motion/scrollReveal.js"),
      import("./motion/magnetic.js"),
      import("./motion/countUp.js"),
    ]).then(([reveal, magnetic, countUp]) => {
      if (cancelled) return;
      disposeReveal = reveal.initScrollReveals();
      disposeMagnetic = magnetic.initMagnetic();
      disposeCountUp = countUp.initCountUp();
      // Single coordinated ScrollTrigger.refresh() after BOTH reveal + countUp
      // have registered (Phase 8A) — replaces two back-to-back refreshes.
      reveal.refreshAll();
    });

    return () => {
      cancelled = true;
      disposeReveal();
      disposeMagnetic();
      disposeCountUp();
    };
  }, []);

  return (
    <div style={{ background: G.bg, minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <CursorLight />
      <ScrollProgress />

      <Nav onBookCall={onBookCall} onOpenROI={onOpenROI} />

      <HeroSection onBookCall={onBookCall} />

      <ROITeaser onOpenROI={onOpenROI} />

      {/* Platform metrics band — restored Phase 3 section (source §STATS). */}
      <PlatformStats />

      <IndustriesSection />

      {/* #roi-calculator — featured on-page anchor + third modal entry point. */}
      <section
        id="roi-calculator"
        style={{
          padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px)",
          borderTop: `1px solid ${G.border}`,
          textAlign: "center",
        }}
      >
        <div data-reveal style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 14 }}>
            › ROI CALCULATOR
          </div>
          <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
            Calculate what inaction costs you.
          </h2>
          <p className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.9, maxWidth: 560, margin: "0 auto 32px" }}>
            The Revenue Leak Detector maps your exact daily loss by industry — then
            shows precisely what it costs to stop it. Two minutes, no signup.
          </p>
          <button className="btn-primary" onClick={onOpenROI} style={{ fontSize: 14 }}>
            [ Calculate My ROI → ]
          </button>
        </div>
      </section>

      <ServicesSection />

      <HowItWorks />

      <DemoWidget />

      <Testimonials />

      <CTA onBookCall={onBookCall} />

      <Footer
        onBookCall={onBookCall}
        onWhatsApp={onWhatsApp}
        onLinkedIn={onLinkedIn}
        onEmail={onEmail}
      />

      {/* ROI modal (Phase 6) — mounted only while open so close fully unmounts
          the calculator and resets its phase/form state (brief §12.3). */}
      {roiOpen && (
        <Suspense fallback={null}>
          <ROICalculatorModal onClose={onCloseROI} />
        </Suspense>
      )}
    </div>
  );
}
