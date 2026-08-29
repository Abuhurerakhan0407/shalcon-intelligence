import { useEffect, useState, lazy, Suspense } from "react";
import { SITE_CONFIG, G } from "./data/content.js";
import { trackConversion } from "./lib/conversionTracking.js";
import CursorLight from "./components/CursorLight.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Nav from "./components/Nav.jsx";
import HeroSection from "./components/HeroSection.jsx";
import FlagshipSystem from "./components/FlagshipSystem.jsx";
import HealthcareArchitecture from "./components/HealthcareArchitecture.jsx";
import ROITeaser from "./components/ROITeaser.jsx";
import PlatformStats from "./components/PlatformStats.jsx";
import IndustriesSection from "./components/IndustriesSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import DemoWidget from "./components/DemoWidget.jsx";
import Testimonials from "./components/Testimonials.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";

const ROICalculatorModal = lazy(() => import("./components/ROICalculatorModal.jsx"));

export default function App() {
  const [roiOpen, setRoiOpen] = useState(false);

  const openLink = (url, eventName) => {
    if (eventName) trackConversion(eventName);
    if (url && url !== "#") window.open(url, "_blank", "noopener");
  };
  const onBookCall = () => openLink(SITE_CONFIG.calendlyLink, "booking_clicked");
  const onWhatsApp = () => openLink(`https://wa.me/${SITE_CONFIG.whatsappNumber}`, "whatsapp_clicked");
  const onLinkedIn = () => openLink(SITE_CONFIG.linkedinURL, "linkedin_clicked");
  const onEmail = () => {
    trackConversion("email_clicked");
    window.location.href = `mailto:${SITE_CONFIG.email}`;
  };

  const onOpenROI = (e) => {
    const el = e?.currentTarget;
    if (el) {
      el.classList.remove("roi-bounce");
      void el.offsetWidth;
      el.classList.add("roi-bounce");
      setTimeout(() => el.classList.remove("roi-bounce"), 200);
    }
    trackConversion("roi_opened");
    setRoiOpen(true);
  };
  const onCloseROI = () => setRoiOpen(false);

  useEffect(() => {
    const reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let disposeReveal = () => {};
    let disposeMagnetic = () => {};
    let cancelled = false;

    Promise.all([
      import("./motion/scrollReveal.js"),
      import("./motion/magnetic.js"),
    ]).then(([reveal, magnetic]) => {
      if (cancelled) return;
      disposeReveal = reveal.initScrollReveals();
      disposeMagnetic = magnetic.initMagnetic();
    });

    return () => {
      cancelled = true;
      disposeReveal();
      disposeMagnetic();
    };
  }, []);

  return (
    <div style={{ background: G.bg, minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <CursorLight />
      <ScrollProgress />
      <Nav onBookCall={onBookCall} onOpenROI={onOpenROI} />
      <HeroSection onBookCall={onBookCall} />
      <FlagshipSystem onBookCall={onBookCall} />
      <HealthcareArchitecture />
      <ROITeaser onOpenROI={onOpenROI} />
      <PlatformStats />
      <IndustriesSection />

      <section id="roi-calculator" style={{ padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px)", borderTop: `1px solid ${G.border}`, textAlign: "center" }}>
        <div data-reveal style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 14 }}>› OPPORTUNITY-AT-RISK ESTIMATOR</div>
          <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>Put your assumptions into the model.</h2>
          <p className="mono" style={{ color: G.muted, fontSize: 13, lineHeight: 1.9, maxWidth: 660, margin: "0 auto 32px" }}>
            Estimate the value tied to delayed or missed follow-up using your own inquiry volume, conversion assumption and average transaction value. The result is a planning estimate — not a guarantee of loss or recovery.
          </p>
          <button className="btn-primary" onClick={onOpenROI} style={{ fontSize: 14 }}>Open estimator</button>
        </div>
      </section>

      <ServicesSection />
      <HowItWorks />
      <DemoWidget />
      <Testimonials />
      <CTA onBookCall={onBookCall} />
      <Footer onBookCall={onBookCall} onWhatsApp={onWhatsApp} onLinkedIn={onLinkedIn} onEmail={onEmail} />

      {roiOpen && (
        <Suspense fallback={null}>
          <ROICalculatorModal onClose={onCloseROI} />
        </Suspense>
      )}
    </div>
  );
}
