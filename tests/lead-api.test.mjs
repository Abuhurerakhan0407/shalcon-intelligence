import test from "node:test";
import assert from "node:assert/strict";
import handler, { resetLeadRateLimitForTests } from "../api/lead.js";

function makeReq({ method = "POST", body = {}, headers = {} } = {}) {
  return { method, body, headers };
}

function makeRes() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[String(name).toLowerCase()] = value;
      return this;
    },
    end(body = "") {
      this.body = body;
      return this;
    },
    json() {
      return JSON.parse(this.body || "{}");
    },
  };
}

function successfulWebhookResponse(options, status = 201) {
  const leadId = JSON.parse(options.body).leadId;
  return {
    ok: true,
    status,
    json: async () => ({ ok: true, leadId }),
  };
}

const originalFetch = global.fetch;
const originalWebhook = process.env.LEAD_WEBHOOK_URL;
const originalWebhookSecret = process.env.LEAD_WEBHOOK_SECRET;
const originalConsoleError = console.error;
const TEST_SECRET = "shalcon-test-webhook-secret-123456";

function restoreEnv(name, value) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

function configurePersistence() {
  process.env.LEAD_WEBHOOK_URL = "https://example.com/shalcon-leads";
  process.env.LEAD_WEBHOOK_SECRET = TEST_SECRET;
}

function resetGlobals() {
  global.fetch = originalFetch;
  restoreEnv("LEAD_WEBHOOK_URL", originalWebhook);
  restoreEnv("LEAD_WEBHOOK_SECRET", originalWebhookSecret);
  console.error = originalConsoleError;
  resetLeadRateLimitForTests();
}

test.afterEach(resetGlobals);

test("rejects non-POST methods", async () => {
  const res = makeRes();
  await handler(makeReq({ method: "GET" }), res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.allow, "POST");
  assert.equal(res.json().error, "method_not_allowed");
});

test("rejects browser requests explicitly marked cross-site", async () => {
  const res = makeRes();
  await handler(makeReq({ headers: { "sec-fetch-site": "cross-site" } }), res);
  assert.equal(res.statusCode, 403);
  assert.equal(res.json().error, "cross_site_request_rejected");
});

test("allows same-origin fetch metadata", async () => {
  const res = makeRes();
  await handler(makeReq({ headers: { "sec-fetch-site": "same-origin" }, body: { contactConsent: true } }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, "name_and_whatsapp_required");
});

test("rejects explicitly non-JSON request media types", async () => {
  const res = makeRes();
  await handler(makeReq({ headers: { "content-type": "application/x-www-form-urlencoded" } }), res);
  assert.equal(res.statusCode, 415);
  assert.equal(res.json().error, "unsupported_media_type");
});

test("rejects oversized declared payloads", async () => {
  const res = makeRes();
  await handler(makeReq({ headers: { "content-length": "20001" } }), res);
  assert.equal(res.statusCode, 413);
  assert.equal(res.json().error, "payload_too_large");
});

test("rejects malformed JSON", async () => {
  const res = makeRes();
  await handler(makeReq({ body: "{not-json" }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, "invalid_json");
});

test("rejects non-object payloads", async () => {
  const res = makeRes();
  await handler(makeReq({ body: [] }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, "invalid_payload");
});

test("requires name and WhatsApp", async () => {
  const res = makeRes();
  await handler(makeReq({ body: { contactConsent: true } }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, "name_and_whatsapp_required");
});

test("rejects invalid WhatsApp length", async () => {
  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "123", contactConsent: true } }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, "invalid_whatsapp");
});

test("requires explicit contact consent", async () => {
  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999" } }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, "contact_consent_required");
});

test("honeypot exits without persisting", async () => {
  let called = false;
  global.fetch = async () => {
    called = true;
    return { ok: true, status: 200 };
  };
  delete process.env.LEAD_WEBHOOK_URL;
  delete process.env.LEAD_WEBHOOK_SECRET;

  const res = makeRes();
  await handler(makeReq({ body: { website: "bot-filled-field" } }), res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().ok, true);
  assert.equal(called, false);
});

test("fails safely when persistence URL is not configured", async () => {
  delete process.env.LEAD_WEBHOOK_URL;
  process.env.LEAD_WEBHOOK_SECRET = TEST_SECRET;
  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.json().error, "lead_capture_not_configured");
});

test("fails safely when webhook authentication secret is missing or weak", async () => {
  process.env.LEAD_WEBHOOK_URL = "https://example.com/leads";
  delete process.env.LEAD_WEBHOOK_SECRET;

  let res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 503);

  process.env.LEAD_WEBHOOK_SECRET = "too-short";
  res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.json().error, "lead_capture_not_configured");
});

test("rejects non-HTTPS or credential-bearing webhook destinations", async () => {
  console.error = () => {};
  process.env.LEAD_WEBHOOK_SECRET = TEST_SECRET;

  process.env.LEAD_WEBHOOK_URL = "http://example.com/leads";
  let res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 503);

  process.env.LEAD_WEBHOOK_URL = "https://user:password@example.com/leads";
  res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.json().error, "lead_capture_not_configured");
});

test("persists a consented lead with server-computed values, authenticated webhook and minimized URLs", async () => {
  configurePersistence();
  let captured = null;
  global.fetch = async (url, options) => {
    captured = { url: String(url), options };
    return successfulWebhookResponse(options);
  };

  const res = makeRes();
  await handler(
    makeReq({
      headers: { referer: "https://ref.example/some-page?secret=must-not-persist#private" },
      body: {
        name: "  QA Person  ",
        whatsapp: "+91 99999 99999",
        company: "Test Clinic",
        industry: "Healthcare",
        packageName: "growth",
        contactConsent: true,
        currency: "inr",
        inquiries: 42,
        missPercent: 25,
        conversionRate: 20,
        avgTxn: 1200,
        estimatedDailyOpportunityAtRisk: 999999999,
        estimatedMonthlyOpportunityAtRisk: 999999999,
        estimatedYearlyOpportunityAtRisk: 999999999,
        page: "https://shalcon.example/?utm_source=qa&utm_medium=email&utm_campaign=launch&secret=drop-me#fragment",
      },
    }),
    res
  );

  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.json(), { ok: true });
  assert.equal(captured.url, "https://example.com/shalcon-leads");
  assert.equal(captured.options.method, "POST");
  assert.equal(captured.options.redirect, "error");
  assert.equal(captured.options.headers["X-Shalcon-Webhook-Secret"], TEST_SECRET);
  assert.ok(captured.options.headers["Idempotency-Key"]);

  const payload = JSON.parse(captured.options.body);
  assert.equal(payload.schemaVersion, 2);
  assert.equal(payload.source, "shalcon_opportunity_estimator");
  assert.equal(payload.name, "QA Person");
  assert.equal(payload.whatsapp, "919999999999");
  assert.equal(payload.contactConsent, true);
  assert.equal(payload.contactConsentVersion, "website-audit-contact-v1");
  assert.ok(payload.contactConsentAt);
  assert.ok(payload.leadId);
  assert.equal(payload.leadId, captured.options.headers["Idempotency-Key"]);
  assert.equal(payload.industry, "healthcare");
  assert.equal(payload.packageName, "GROWTH");
  assert.equal(payload.currency, "INR");

  assert.equal(payload.estimatedDailyOpportunityAtRisk, 2520);
  assert.equal(payload.estimatedMonthlyOpportunityAtRisk, 75600);
  assert.equal(payload.estimatedYearlyOpportunityAtRisk, 919800);

  assert.equal(payload.page, "https://shalcon.example/");
  assert.equal(payload.referrer, "https://ref.example/some-page");
  assert.equal(payload.utmSource, "qa");
  assert.equal(payload.utmMedium, "email");
  assert.equal(payload.utmCampaign, "launch");
  assert.ok(!JSON.stringify(payload).includes("drop-me"));
  assert.ok(!JSON.stringify(payload).includes("must-not-persist"));
});

test("invalid estimator inputs are stored as null rather than fake opportunity values", async () => {
  configurePersistence();
  let payload = null;
  global.fetch = async (_url, options) => {
    payload = JSON.parse(options.body);
    return successfulWebhookResponse(options);
  };

  const res = makeRes();
  await handler(
    makeReq({
      body: {
        name: "QA",
        whatsapp: "919999999999",
        contactConsent: true,
        inquiries: 100001,
        missPercent: 101,
        conversionRate: -1,
        avgTxn: 1000000001,
      },
    }),
    res
  );

  assert.equal(res.statusCode, 201);
  assert.equal(payload.inquiries, null);
  assert.equal(payload.missPercent, null);
  assert.equal(payload.conversionRate, null);
  assert.equal(payload.avgTxn, null);
  assert.equal(payload.estimatedDailyOpportunityAtRisk, null);
  assert.equal(payload.estimatedMonthlyOpportunityAtRisk, null);
  assert.equal(payload.estimatedYearlyOpportunityAtRisk, null);
});

test("best-effort IP rate limit protects the persistence destination", async () => {
  configurePersistence();
  global.fetch = async (_url, options) => successfulWebhookResponse(options);
  const request = () => makeReq({
    headers: { "x-forwarded-for": "203.0.113.10" },
    body: { name: "QA", whatsapp: "919999999999", contactConsent: true },
  });

  for (let i = 0; i < 8; i += 1) {
    const res = makeRes();
    await handler(request(), res);
    assert.equal(res.statusCode, 201);
  }

  const blocked = makeRes();
  await handler(request(), blocked);
  assert.equal(blocked.statusCode, 429);
  assert.equal(blocked.json().error, "rate_limited");
  assert.ok(Number(blocked.headers["retry-after"]) >= 1);
});

test("never returns success when the persistence destination fails HTTP", async () => {
  console.error = () => {};
  configurePersistence();
  global.fetch = async () => ({ ok: false, status: 500, json: async () => ({ ok: false }) });

  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 502);
  assert.equal(res.json().error, "lead_persistence_failed");
});

test("never returns success for a 2xx destination response that says ok false", async () => {
  console.error = () => {};
  configurePersistence();
  global.fetch = async () => ({ ok: true, status: 200, json: async () => ({ ok: false }) });

  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 502);
  assert.equal(res.json().error, "lead_persistence_failed");
});

test("never returns success when destination acknowledges the wrong lead ID", async () => {
  console.error = () => {};
  configurePersistence();
  global.fetch = async () => ({ ok: true, status: 201, json: async () => ({ ok: true, leadId: "00000000-0000-4000-8000-000000000000" }) });

  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 502);
  assert.equal(res.json().error, "lead_persistence_failed");
});

test("never returns success when destination acknowledgement is not valid JSON", async () => {
  console.error = () => {};
  configurePersistence();
  global.fetch = async () => ({ ok: true, status: 200, json: async () => { throw new Error("not json"); } });

  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 502);
  assert.equal(res.json().error, "lead_persistence_failed");
});

test("never returns success when persistence throws", async () => {
  console.error = () => {};
  configurePersistence();
  global.fetch = async () => {
    throw new Error("network down");
  };

  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 502);
  assert.equal(res.json().error, "lead_persistence_failed");
});
