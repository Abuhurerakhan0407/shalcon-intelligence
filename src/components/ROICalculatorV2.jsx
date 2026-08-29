import { useMemo, useState } from "react";
import { SITE_CONFIG, ROI_INDUSTRIES, ROI_PACKAGES, G, formatINR } from "../data/content.js";
import { submitLead } from "../lib/leadCapture.js";
import { trackConversion } from "../lib/conversionTracking.js";

function money(value, currency) {
  if (currency === "INR") return formatINR(Math.round(value));
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export default function ROICalculatorV2() {
  const [currency, setCurrency] = useState("INR");
  const [industry, setIndustry] = useState("healthcare");
  const preset = ROI_INDUSTRIES.find((item) => item.id === industry) || ROI_INDUSTRIES[0];
  const [inquiries, setInquiries] = useState(preset?.dailyInq || 50);
  const [delayedRate, setDelayedRate] = useState(preset?.missRate || 30);
  const [avgValue, setAvgValue] = useState(preset?.avgTxn || 2000);
  const [conversionRate, setConversionRate] = useState(20);
  const [selectedPackage, setSelectedPackage] = useState("GROWTH");
  const [form, setForm] = useState({ name: "", whatsapp: "", company: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  const estimate = useMemo(() => {
    const delayed = inquiries * (delayedRate / 100);
    const expectedConversions = delayed * (conversionRate / 100);
    const daily = expectedConversions * avgValue;
    return { delayed, daily, monthly: daily * 30, yearly: daily * 365 };
  }, [inquiries, delayedRate, conversionRate, avgValue]);

  const chooseIndustry = (id) => {
    const next = ROI_INDUSTRIES.find((item) => item.id === id);
    setIndustry(id);
    if (next) {
      setInquiries(next.dailyInq);
      setDelayedRate(next.missRate);
      setAvgValue(next.avgTxn);
    }
    trackConversion("roi_industry_selected", { industry: id });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.whatsapp.trim()) {
      setError("Name and WhatsApp number are required.");
      return;
    }
    if (!consent) {
      setError("Please confirm that Shalcon may contact you about this audit request.");
      return;
    }

    setState("submitting");
    setError("");
    try {
      await submitLead({
        ...form,
        contactConsent: true,
        industry,
        packageName: selectedPackage,
        currency,
        inquiries,
        missPercent: delayedRate,
        conversionRate,
        avgTxn: avgValue,
        estimatedDailyOpportunityAtRisk: Math.round(estimate.daily),
        estimatedMonthlyOpportunityAtRisk: Math.round(estimate.monthly),
        estimatedYearlyOpportunityAtRisk: Math.round(estimate.yearly),
      });
      setState("confirmed");
      trackConversion("roi_lead_submitted", { industry, packageName: selectedPackage });
    } catch (submitError) {
      setState("error");
      setError(
        submitError?.code === "lead_capture_not_configured"
          ? "Online capture is not configured yet. Please use WhatsApp or book directly below."
          : "We could not safely save your request. Nothing has been marked as submitted. Please use WhatsApp or book directly."
      );
      trackConversion("roi_lead_failed", { code: submitError?.code || "unknown" });
    }
  };

  if (state === "confirmed") {
    return (
      <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: 28, color: G.white }}>
        <div style={{ maxWidth: 620, textAlign: "center", background: G.card, border: `1px solid ${G.green}44`, padding: "44px 28px" }}>
          <div style={{ color: G.green, fontSize: 12, letterSpacing: ".18em", marginBottom: 16 }}>REQUEST SAVED</div>
          <h2 className="syne" style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 16 }}>Your automation audit request is in.</h2>
          <p className="mono" style={{ color: G.muted, lineHeight: 1.8, marginBottom: 28 }}>We saved the details you submitted. You can also choose a call slot now or message Shalcon directly.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn-primary" href={SITE_CONFIG.calendlyLink} target="_blank" rel="noreferrer" onClick={() => trackConversion("booking_clicked", { surface: "roi_confirmed" })}>Book a call</a>
            <a className="btn-ghost" href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_clicked", { surface: "roi_confirmed" })}><span>WhatsApp</span></a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: G.bg, color: G.white, minHeight: "100vh", padding: "clamp(28px,6vw,70px) clamp(16px,4vw,36px)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 42 }}>
          <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".2em", marginBottom: 14 }}>OPPORTUNITY-AT-RISK ESTIMATOR</div>
          <h1 className="syne" style={{ fontSize: "clamp(30px,6vw,62px)", lineHeight: 1.02, marginBottom: 16 }}>Estimate what slow follow-up may be costing you.</h1>
          <p className="mono" style={{ maxWidth: 720, margin: "0 auto", color: G.muted, lineHeight: 1.8, fontSize: 12 }}>This is a planning estimate, not a promise of lost or recoverable revenue. Adjust the assumptions to match your own data before using the result in a business decision.</p>
        </div>

        <div className="grid-split" style={{ gap: 18, alignItems: "start" }}>
          <div style={{ background: G.card, border: `1px solid ${G.border}`, padding: "26px 22px" }}>
            <label className="mono" style={{ display: "block", color: G.muted, fontSize: 10, marginBottom: 8 }} htmlFor="roi-industry">INDUSTRY PRESET</label>
            <select id="roi-industry" className="roi-input" value={industry} onChange={(e) => chooseIndustry(e.target.value)}>
              {ROI_INDUSTRIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>

            {[
              ["Daily inquiries", inquiries, setInquiries, 1, 500, "roi-inquiries"],
              ["Delayed / missed (%)", delayedRate, setDelayedRate, 0, 95, "roi-delayed"],
              ["Likely conversion if handled (%)", conversionRate, setConversionRate, 1, 100, "roi-conversion"],
            ].map(([label, value, setter, min, max, id]) => (
              <div key={label} style={{ marginTop: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                  <label htmlFor={id} className="mono" style={{ color: G.muted, fontSize: 11 }}>{label}</label>
                  <strong className="smono" style={{ color: G.green }}>{value}{label.includes("%") ? "%" : ""}</strong>
                </div>
                <input id={id} aria-label={label} type="range" min={min} max={max} value={value} onChange={(e) => setter(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
            ))}

            <div style={{ marginTop: 22 }}>
              <label htmlFor="roi-avg-value" className="mono" style={{ display: "block", color: G.muted, fontSize: 10, marginBottom: 8 }}>AVERAGE VALUE OF A SUCCESSFUL CONVERSION</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button type="button" className={currency === "INR" ? "btn-primary" : "btn-ghost"} onClick={() => setCurrency("INR")} style={{ padding: "10px 14px" }}><span>INR</span></button>
                <button type="button" className={currency === "USD" ? "btn-primary" : "btn-ghost"} onClick={() => setCurrency("USD")} style={{ padding: "10px 14px" }}><span>USD</span></button>
                <input id="roi-avg-value" className="roi-input" type="number" min="1" value={avgValue} onChange={(e) => setAvgValue(Math.max(1, Number(e.target.value) || 1))} style={{ flex: "1 1 180px" }} />
              </div>
            </div>
          </div>

          <div style={{ background: "#07070F", border: `1px solid ${G.green}33`, padding: "26px 22px" }}>
            <div className="mono" style={{ color: G.muted, fontSize: 10, letterSpacing: ".14em", marginBottom: 18 }}>ESTIMATED OPPORTUNITY AT RISK</div>
            {[["Per day", estimate.daily], ["Per month", estimate.monthly], ["Per year", estimate.yearly]].map(([label, value]) => (
              <div key={label} style={{ borderBottom: `1px solid ${G.border}`, padding: "14px 0" }}>
                <div className="mono" style={{ color: G.muted, fontSize: 10, marginBottom: 4 }}>{label}</div>
                <div className="syne" style={{ color: G.green, fontSize: "clamp(24px,4vw,38px)", fontWeight: 800 }}>{money(value, currency)}</div>
              </div>
            ))}
            <p className="mono" style={{ color: G.muted, fontSize: 10, lineHeight: 1.7, marginTop: 18 }}>Formula: inquiries × delayed/missed rate × likely conversion rate × average conversion value. Presets are starting assumptions only.</p>
          </div>
        </div>

        <div style={{ marginTop: 18, background: G.card, border: `1px solid ${G.border}`, padding: "26px 22px" }}>
          <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".16em", marginBottom: 16 }}>INDICATIVE IMPLEMENTATION RANGE</div>
          <div className="grid-cards-3" style={{ gap: 12 }}>
            {ROI_PACKAGES.map((pkg) => (
              <button key={pkg.name} type="button" aria-pressed={selectedPackage === pkg.name} onClick={() => setSelectedPackage(pkg.name)} style={{ textAlign: "left", cursor: "pointer", background: selectedPackage === pkg.name ? `${G.green}0B` : "#080812", border: `1px solid ${selectedPackage === pkg.name ? G.green : G.border}`, padding: 18, color: G.white }}>
                <div className="syne" style={{ fontWeight: 800, marginBottom: 5 }}>{pkg.name}</div>
                <div className="mono" style={{ color: G.muted, fontSize: 10, lineHeight: 1.6 }}>{pkg.tagline}</div>
                <div className="mono" style={{ color: G.green, fontSize: 11, marginTop: 12 }}>{currency === "INR" ? pkg.setup.INR : pkg.setup.USD}</div>
                <div className="mono" style={{ color: G.muted, fontSize: 9, marginTop: 5 }}>Indicative only · final scope after audit</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 18, background: G.card, border: `1px solid ${G.border}`, padding: "26px 22px", position: "relative" }}>
          <div className="mono" style={{ color: G.green, fontSize: 10, letterSpacing: ".16em", marginBottom: 18 }}>REQUEST A FREE AUTOMATION AUDIT</div>
          <div className="grid-cards-3" style={{ gap: 12 }}>
            <label className="mono" style={{ fontSize: 10, color: G.muted }}>Full name *<input className="roi-input" autoComplete="name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} style={{ marginTop: 6 }} /></label>
            <label className="mono" style={{ fontSize: 10, color: G.muted }}>WhatsApp with country code *<input className="roi-input" type="tel" autoComplete="tel" value={form.whatsapp} onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))} style={{ marginTop: 6 }} /></label>
            <label className="mono" style={{ fontSize: 10, color: G.muted }}>Company / business<input className="roi-input" autoComplete="organization" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} style={{ marginTop: 6 }} /></label>
          </div>
          <input aria-hidden="true" tabIndex="-1" autoComplete="off" value={form.website} onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))} style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />

          <label className="mono" style={{ display: "flex", gap: 10, alignItems: "flex-start", color: G.muted, fontSize: 10, lineHeight: 1.6, marginTop: 16 }}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>I agree that Shalcon Intelligence may contact me about this audit request. I can opt out at any time. <a href="/privacy.html" target="_blank" rel="noreferrer" style={{ color: G.green }}>Privacy notice</a>.</span>
          </label>

          {error && <div role="alert" className="mono" style={{ color: "#FF7777", marginTop: 14, fontSize: 11 }}>{error}</div>}

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <button className="btn-primary" type="submit" disabled={state === "submitting"}>{state === "submitting" ? "Saving…" : "Request free audit"}</button>
            <a className="btn-ghost" href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_clicked", { surface: "roi_form" })}><span>WhatsApp instead</span></a>
            <a className="btn-text" href={SITE_CONFIG.calendlyLink} target="_blank" rel="noreferrer" onClick={() => trackConversion("booking_clicked", { surface: "roi_form" })}>Book directly</a>
          </div>
        </form>
      </div>
    </div>
  );
}
