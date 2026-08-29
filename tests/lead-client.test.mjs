import test from "node:test";
import assert from "node:assert/strict";
import { submitLead } from "../src/lib/leadCapture.js";

const originalFetch = global.fetch;
const originalWindow = global.window;

test.afterEach(() => {
  global.fetch = originalFetch;
  if (originalWindow === undefined) delete global.window;
  else global.window = originalWindow;
});

test("submits JSON to the server boundary and returns only explicit success", async () => {
  global.window = { location: { href: "https://shalcon.example/?utm_source=test" } };
  let captured = null;
  global.fetch = async (url, options) => {
    captured = { url, options };
    return {
      ok: true,
      async json() {
        return { ok: true };
      },
    };
  };

  const result = await submitLead({
    name: "QA Person",
    whatsapp: "919999999999",
    contactConsent: true,
  });

  assert.deepEqual(result, { ok: true });
  assert.equal(captured.url, "/api/lead");
  assert.equal(captured.options.method, "POST");
  assert.equal(captured.options.headers["Content-Type"], "application/json");
  const payload = JSON.parse(captured.options.body);
  assert.equal(payload.name, "QA Person");
  assert.equal(payload.page, "https://shalcon.example/?utm_source=test");
});

test("fails closed when HTTP succeeds but application success is false", async () => {
  global.fetch = async () => ({
    ok: true,
    async json() {
      return { ok: false, error: "lead_persistence_failed" };
    },
  });

  await assert.rejects(
    () => submitLead({ name: "QA" }),
    (error) => error.code === "lead_persistence_failed"
  );
});

test("preserves server error codes from non-2xx responses", async () => {
  global.fetch = async () => ({
    ok: false,
    async json() {
      return { ok: false, error: "lead_capture_not_configured" };
    },
  });

  await assert.rejects(
    () => submitLead({ name: "QA" }),
    (error) => error.code === "lead_capture_not_configured"
  );
});

test("fails closed on malformed server responses", async () => {
  global.fetch = async () => ({
    ok: true,
    async json() {
      throw new Error("bad json");
    },
  });

  await assert.rejects(
    () => submitLead({ name: "QA" }),
    (error) => error.code === "lead_submission_failed"
  );
});
