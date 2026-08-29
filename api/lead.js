const MAX_FIELD = 240;
const MAX_BODY_BYTES = 20_000;

function clean(value, max = MAX_FIELD) {
  return String(value ?? "").trim().slice(0, max);
}

function finiteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
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
  if (declaredLength > MAX_BODY_BYTES) {
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

  if (clean(body.website, 100)) {
    return send(res, 200, { ok: true });
  }

  const name = clean(body.name, 100);
  const whatsapp = clean(body.whatsapp, 40);
  const company = clean(body.company, 120);
  const industry = clean(body.industry, 80);
  const packageName = clean(body.packageName, 80);
  const contactConsent = body.contactConsent === true;

  if (!name || !whatsapp) {
    return send(res, 400, { ok: false, error: "name_and_whatsapp_required" });
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

  const now = new Date().toISOString();
  const payload = {
    source: "shalcon_roi_calculator",
    createdAt: now,
    contactConsent: true,
    contactConsentAt: now,
    name,
    whatsapp,
    company,
    industry,
    packageName,
    currency: clean(body.currency, 8),
    inquiries: finiteNumber(body.inquiries),
    missPercent: finiteNumber(body.missPercent),
    conversionRate: finiteNumber(body.conversionRate),
    avgTxn: finiteNumber(body.avgTxn),
    estimatedDailyOpportunityAtRisk: finiteNumber(body.estimatedDailyOpportunityAtRisk),
    estimatedMonthlyOpportunityAtRisk: finiteNumber(body.estimatedMonthlyOpportunityAtRisk),
    estimatedYearlyOpportunityAtRisk: finiteNumber(body.estimatedYearlyOpportunityAtRisk),
    page: clean(body.page, 300),
    referrer: clean(req.headers.referer, 300),
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
