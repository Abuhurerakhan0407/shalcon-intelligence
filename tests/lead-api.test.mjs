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

test("persists a consented lead and only then returns success", async () => {
  process.env.LEAD_WEBHOOK_URL = "https://example.com/shalcon-leads";
  let captured = null;
  global.fetch = async (url, options) => {
    captured = { url: String(url), options };
    return { ok: true, status: 200 };
  };

  const res = makeRes();
  await handler(
    makeReq({
      headers: { referer: "https://shalcon.example/?utm_source=qa" },
      body: {
        name: "  QA Person  ",
        whatsapp: " 919999999999 ",
        company: "Test Clinic",
        industry: "healthcare",
        packageName: "GROWTH",
        contactConsent: true,
        currency: "INR",
        inquiries: 42,
        missPercent: 25,
        conversionRate: 20,
        avgTxn: 1200,
        estimatedDailyOpportunityAtRisk: 2520,
        estimatedMonthlyOpportunityAtRisk: 75600,
        estimatedYearlyOpportunityAtRisk: 919800,
        page: "https://shalcon.example/",
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
  assert.equal(payload.name, "QA Person");
  assert.equal(payload.whatsapp, "919999999999");
  assert.equal(payload.contactConsent, true);
  assert.ok(payload.contactConsentAt);
  assert.equal(payload.estimatedMonthlyOpportunityAtRisk, 75600);
  assert.equal(payload.referrer, "https://shalcon.example/?utm_source=qa");
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
