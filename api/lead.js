const MAX_FIELD = 240;

function clean(value, max = MAX_FIELD) {
  return String(value ?? "").trim().slice(0, max);
}

function send(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  return res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, error: "method_not_allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});

  // Honeypot: bots commonly fill hidden fields.
  if (clean(body.website, 100)) {
    return send(res, 200, { ok: true });
  }

  const name = clean(body.name, 100);
  const whatsapp = clean(body.whatsapp, 40);
  const company = clean(body.company, 120);
  const industry = clean(body.industry, 80);
  const packageName = clean(body.packageName, 80);

  if (!name || !whatsapp) {
    return send(res, 400, { ok: false, error: "name_and_whatsapp_required" });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    // Critical: never pretend a lead was stored when persistence is unavailable.
    return send(res, 503, { ok: false, error: "lead_capture_not_configured" });
  }

  const payload = {
    source: "shalcon_roi_calculator",
    createdAt: new Date().toISOString(),
    name,
    whatsapp,
    company,
    industry,
    packageName,
    currency: clean(body.currency, 8),
    inquiries: Number(body.inquiries) || null,
    missPercent: Number(body.missPercent) || null,
    avgTxn: Number(body.avgTxn) || null,
    estimatedDailyLoss: Number(body.estimatedDailyLoss) || null,
    estimatedMonthlyLoss: Number(body.estimatedMonthlyLoss) || null,
    estimatedYearlyLoss: Number(body.estimatedYearlyLoss) || null,
    page: clean(body.page, 300),
    referrer: clean(req.headers.referer, 300),
  };

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
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
