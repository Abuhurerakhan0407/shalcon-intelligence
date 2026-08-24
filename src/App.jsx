import { useEffect, useState } from "react";
import { Cursor, Nav, ScrollProgress, useReducedMotionPreference } from "./final/ui.jsx";
import { ReferralAbout, ReferralCapabilityRail, ReferralCTA, ReferralFooter, ReferralHero, ReferralProcess, ReferralServices } from "./final/referral.jsx";
import { ReferralWork } from "./final/referral-work.jsx";

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
        <ReferralWork />
        <ReferralProcess />
        <ReferralAbout />
        <ReferralCTA />
      </main>
      <ReferralFooter />
    </>
  );
}
