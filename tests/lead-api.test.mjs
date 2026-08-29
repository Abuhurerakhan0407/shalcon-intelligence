import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/lead.js";

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

const originalFetch = global.fetch;
const originalWebhook = process.env.LEAD_WEBHOOK_URL;
const originalConsoleError = console.error;

function resetGlobals() {
  global.fetch = originalFetch;
  if (originalWebhook === undefined) delete process.env.LEAD_WEBHOOK_URL;
  else process.env.LEAD_WEBHOOK_URL = originalWebhook;
  console.error = originalConsoleError;
}

test.afterEach(resetGlobals);

test("rejects non-POST methods", async () => {
  const res = makeRes();
  await handler(makeReq({ method: "GET" }), res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.allow, "POST");
  assert.equal(res.json().error, "method_not_allowed");
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

  const res = makeRes();
  await handler(makeReq({ body: { website: "bot-filled-field" } }), res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().ok, true);
  assert.equal(called, false);
});

test("fails safely when persistence is not configured", async () => {
  delete process.env.LEAD_WEBHOOK_URL;
  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.json().error, "lead_capture_not_configured");
});

test("rejects non-HTTPS webhook destinations", async () => {
  console.error = () => {};
  process.env.LEAD_WEBHOOK_URL = "http://example.com/leads";
  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.json().error, "lead_capture_not_configured");
});

test("persists a consented lead with server-computed opportunity values and minimized URLs", async () => {
  process.env.LEAD_WEBHOOK_URL = "https://example.com/shalcon-leads";
  let captured = null;
  global.fetch = async (url, options) => {
    captured = { url: String(url), options };
    return { ok: true, status: 200 };
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
        // Deliberately forged browser-derived values. Server must ignore these.
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

  const payload = JSON.parse(captured.options.body);
  assert.equal(payload.schemaVersion, 1);
  assert.equal(payload.source, "shalcon_opportunity_estimator");
  assert.equal(payload.name, "QA Person");
  assert.equal(payload.whatsapp, "919999999999");
  assert.equal(payload.contactConsent, true);
  assert.equal(payload.contactConsentVersion, "website-audit-contact-v1");
  assert.ok(payload.contactConsentAt);
  assert.equal(payload.industry, "healthcare");
  assert.equal(payload.packageName, "GROWTH");
  assert.equal(payload.currency, "INR");

  // 42 × .25 × .20 × 1200 = 2520/day; derived only on the server.
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

test("invalid estimator inputs are not converted into fake opportunity values", async () => {
  process.env.LEAD_WEBHOOK_URL = "https://example.com/shalcon-leads";
  let payload = null;
  global.fetch = async (_url, options) => {
    payload = JSON.parse(options.body);
    return { ok: true, status: 200 };
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

test("never returns success when the persistence destination fails", async () => {
  console.error = () => {};
  process.env.LEAD_WEBHOOK_URL = "https://example.com/shalcon-leads";
  global.fetch = async () => ({ ok: false, status: 500 });

  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 502);
  assert.equal(res.json().error, "lead_persistence_failed");
});

test("never returns success when persistence throws", async () => {
  console.error = () => {};
  process.env.LEAD_WEBHOOK_URL = "https://example.com/shalcon-leads";
  global.fetch = async () => {
    throw new Error("network down");
  };

  const res = makeRes();
  await handler(makeReq({ body: { name: "QA", whatsapp: "919999999999", contactConsent: true } }), res);
  assert.equal(res.statusCode, 502);
  assert.equal(res.json().error, "lead_persistence_failed");
});
