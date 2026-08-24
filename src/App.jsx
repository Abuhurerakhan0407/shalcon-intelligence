import { useEffect, useState } from "react";
import { Cursor, Nav, ScrollProgress, useReducedMotionPreference } from "./final/ui.jsx";
import { AwardAbout, AwardApproach, AwardCTA, AwardFooter, AwardHero, AwardServices, AwardWork, DualityStory } from "./final/showcase.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), reduced ? 0 : 520);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      {!loaded && (
        <div className="loader"><div><span>ABU HURERA</span><i/><small>WEB EXPERIENCE × AI SYSTEMS</small></div></div>
      )}
      <Nav />
      <main className={loaded ? "site-ready" : "site-loading"}>
        <AwardHero />
        <DualityStory />
        <AwardServices />
        <AwardWork />
        <AwardApproach />
        <AwardAbout />
        <AwardCTA />
      </main>
      <AwardFooter />
    </>
  );
}
