const MAX_FIELD = 240;
const MAX_BODY_BYTES = 20_000;
const MAX_AVG_VALUE = 1_000_000_000;
const MAX_DAILY_INQUIRIES = 100_000;
const ALLOWED_CURRENCIES = new Set(["INR", "USD"]);

function clean(value, max = MAX_FIELD) {
  return String(value ?? "").trim().slice(0, max);
}

function boundedNumber(value, min, max) {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) return null;
  return parsed;
}

function safePage(value) {
  const raw = clean(value, 1000);
  if (!raw) return "";
  try {
    const url = new URL(raw);
    if (!/^https?:$/.test(url.protocol)) return "";
    return `${url.origin}${url.pathname}`.slice(0, 300);
  } catch {
    return "";
  }
}

function attribution(value) {
  const raw = clean(value, 1000);
  try {
    const url = new URL(raw);
    return {
      utmSource: clean(url.searchParams.get("utm_source"), 100),
      utmMedium: clean(url.searchParams.get("utm_medium"), 100),
      utmCampaign: clean(url.searchParams.get("utm_campaign"), 120),
    };
  } catch {
    return { utmSource: "", utmMedium: "", utmCampaign: "" };
  }
}

function estimateOpportunity({ inquiries, missPercent, conversionRate, avgTxn }) {
  if ([inquiries, missPercent, conversionRate, avgTxn].some((value) => value === null)) {
    return { daily: null, monthly: null, yearly: null };
  }
  const dailyExact = inquiries * (missPercent / 100) * (conversionRate / 100) * avgTxn;
  return {
    daily: Math.round(dailyExact),
    monthly: Math.round(dailyExact * 30),
    yearly: Math.round(dailyExact * 365),
  };
}

function send(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  return res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, error: "method_not_allowed" });
  }

  const declaredLength = Number(req.headers["content-length"] || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return send(res, 413, { ok: false, error: "payload_too_large" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  } catch {
    return send(res, 400, { ok: false, error: "invalid_json" });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return send(res, 400, { ok: false, error: "invalid_payload" });
  }

  // Honeypot: pretend success without contacting persistence so bots cannot use
  // response differences to tune around the trap.
  if (clean(body.website, 100)) {
    return send(res, 200, { ok: true });
  }

  const name = clean(body.name, 100);
  const whatsapp = clean(body.whatsapp, 40);
  const whatsappDigits = whatsapp.replace(/\D/g, "");
  const company = clean(body.company, 120);
  const industry = clean(body.industry, 80).toLowerCase();
  const packageName = clean(body.packageName, 80).toUpperCase();
  const contactConsent = body.contactConsent === true;

  if (!name || !whatsapp) {
    return send(res, 400, { ok: false, error: "name_and_whatsapp_required" });
  }
  if (whatsappDigits.length < 7 || whatsappDigits.length > 15) {
    return send(res, 400, { ok: false, error: "invalid_whatsapp" });
  }
  if (!contactConsent) {
    return send(res, 400, { ok: false, error: "contact_consent_required" });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return send(res, 503, { ok: false, error: "lead_capture_not_configured" });
  }

  let webhookUrl;
  try {
    webhookUrl = new URL(webhook);
  } catch {
    console.error("lead_webhook_invalid_url");
    return send(res, 503, { ok: false, error: "lead_capture_not_configured" });
  }

  if (webhookUrl.protocol !== "https:") {
    console.error("lead_webhook_requires_https");
    return send(res, 503, { ok: false, error: "lead_capture_not_configured" });
  }

  const inquiries = boundedNumber(body.inquiries, 0, MAX_DAILY_INQUIRIES);
  const missPercent = boundedNumber(body.missPercent, 0, 100);
  const conversionRate = boundedNumber(body.conversionRate, 0, 100);
  const avgTxn = boundedNumber(body.avgTxn, 0, MAX_AVG_VALUE);
  const opportunity = estimateOpportunity({ inquiries, missPercent, conversionRate, avgTxn });
  const pageAttribution = attribution(body.page);
  const now = new Date().toISOString();
  const submittedCurrency = clean(body.currency, 8).toUpperCase();

  const payload = {
    schemaVersion: 1,
    source: "shalcon_opportunity_estimator",
    createdAt: now,
    contactConsent: true,
    contactConsentAt: now,
    contactConsentVersion: "website-audit-contact-v1",
    name,
    whatsapp: whatsappDigits,
    company,
    industry,
    packageName,
    currency: ALLOWED_CURRENCIES.has(submittedCurrency) ? submittedCurrency : "",
    inquiries,
    missPercent,
    conversionRate,
    avgTxn,
    estimatedDailyOpportunityAtRisk: opportunity.daily,
    estimatedMonthlyOpportunityAtRisk: opportunity.monthly,
    estimatedYearlyOpportunityAtRisk: opportunity.yearly,
    page: safePage(body.page),
    referrer: safePage(req.headers.referer),
    ...pageAttribution,
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });

    if (!upstream.ok) {
      console.error("lead_webhook_failed", upstream.status);
      return send(res, 502, { ok: false, error: "lead_persistence_failed" });
    }

    return send(res, 201, { ok: true });
  } catch (error) {
    console.error("lead_capture_error", error?.message || error);
    return send(res, 502, { ok: false, error: "lead_persistence_failed" });
  }
}
