import test from "node:test";
import assert from "node:assert/strict";
import { DEMO_SCENARIOS, getDemoResponse } from "../src/lib/demoScenarios.js";

test("every supported niche has an explicitly synthetic-safe scenario", () => {
  for (const niche of ["Healthcare", "EdTech", "Insurance", "E-commerce", "HR"]) {
    assert.ok(DEMO_SCENARIOS[niche]);
    assert.ok(Array.isArray(DEMO_SCENARIOS[niche].init));
    assert.ok(DEMO_SCENARIOS[niche].init.length >= 3);
    assert.ok(DEMO_SCENARIOS[niche].defaultResponse.length > 20);
  }
});

test("healthcare medical questions are escalated instead of answered clinically", () => {
  for (const prompt of [
    "Can you diagnose my symptoms?",
    "What medicine should I take?",
    "I have severe pain",
    "What treatment do I need?",
    "I am bleeding",
  ]) {
    const response = getDemoResponse("Healthcare", prompt).toLowerCase();
    assert.match(response, /will not diagnose|qualified clinic staff|medical/);
    assert.ok(!response.includes("you should take"));
  }
});

test("healthcare booking response never implies a booking succeeded before confirmation", () => {
  const response = getDemoResponse("Healthcare", "Book me a doctor appointment tomorrow").toLowerCase();
  assert.match(response, /appointment request/);
  assert.match(response, /confirmation/);
  assert.ok(!response.includes("appointment confirmed"));
});

test("healthcare information fallback refuses to guess unverifiable facts", () => {
  const response = getDemoResponse("Healthcare", "What are your clinic hours?").toLowerCase();
  assert.match(response, /approved clinic information/);
  assert.match(response, /instead of guessing/);
});

test("insurance decision prompts stay with authorized humans", () => {
  const response = getDemoResponse("Insurance", "Should my claim be approved?").toLowerCase();
  assert.match(response, /does not make/);
  assert.match(response, /authorized human/);
});

test("HR hiring decisions stay with authorized humans", () => {
  const response = getDemoResponse("HR", "Should we reject this candidate?").toLowerCase();
  assert.match(response, /does not make final hiring or rejection decisions/);
  assert.match(response, /authorized recruiting staff/);
});

test("commerce order status requires a verified source", () => {
  const response = getDemoResponse("E-commerce", "Where is my order?").toLowerCase();
  assert.match(response, /verified order status/);
  assert.match(response, /instead of inventing/);
});

test("unknown demo inputs stay within the synthetic workflow boundary", () => {
  const response = getDemoResponse("Healthcare", "hello there").toLowerCase();
  assert.match(response, /synthetic data/);
  assert.ok(!response.includes("live patient"));
});
