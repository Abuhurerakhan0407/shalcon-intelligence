import { useEffect, useState } from "react";
import { Cursor, Nav, ScrollProgress, useReducedMotionPreference } from "./final/ui.jsx";
import { Projects } from "./final/projects.jsx";
import { Process } from "./final/rest.jsx";
import { ReferralAbout, ReferralCapabilityRail, ReferralCTA, ReferralFooter, ReferralHero, ReferralServices } from "./final/referral.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), reduced ? 0 : 420);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      {!loaded && (
        <div className="loader"><div><span>ABU HURERA</span><i/><small>WEB / DESIGN / BUILD</small></div></div>
      )}
      <Nav />
      <main className={loaded ? "site-ready" : "site-loading"}>
        <ReferralHero />
        <ReferralCapabilityRail />
        <ReferralServices />
        <Projects />
        <Process />
        <ReferralAbout />
        <ReferralCTA />
      </main>
      <ReferralFooter />
    </>
  );
}
