import { useEffect, useState } from "react";
import { Cursor, Nav, ScrollProgress, useReducedMotionPreference } from "./final/ui.jsx";
import { CapabilityRail, Hero } from "./final/hero.jsx";
import { OrchestrationFlow, Services } from "./final/systems.jsx";
import { Projects, UseCases } from "./final/projects.jsx";
import { About, FinalCTA, Footer, Industries, Process, Production, ROICalculator } from "./final/rest.jsx";
import { usePortfolioMotion } from "./final/motion.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotionPreference();

  usePortfolioMotion(loaded);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), reduced ? 0 : 700);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      {!loaded && (
        <div className="loader"><div><span>ABU HURERA</span><i/><small>SYSTEMS / AUTOMATION</small></div></div>
      )}
      <Nav />
      <main className={loaded ? "site-ready" : "site-loading"}>
        <Hero />
        <CapabilityRail />
        <Services />
        <OrchestrationFlow />
        <Projects />
        <UseCases />
        <Industries />
        <Production />
        <Process />
        <ROICalculator />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
