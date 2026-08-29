export const DEMO_SCENARIOS = {
  Healthcare: {
    init: [
      { r: "bot", t: "Demo clinic assistant ready. I can show a sample intake, appointment request, FAQ handoff, or follow-up flow." },
      { r: "user", t: "I need an appointment tomorrow." },
      { r: "bot", t: "I can collect your preferred time, service and contact details, then route the request to the clinic workflow for confirmation." },
    ],
    defaultResponse: "For this demo, I can collect approved intake details and show where a real clinic integration would route the request. This prototype uses synthetic data only.",
  },
  EdTech: {
    init: [
      { r: "bot", t: "Demo admissions assistant ready. Ask about a course, fee follow-up, demo class, or enrollment workflow." },
      { r: "user", t: "I want course details." },
      { r: "bot", t: "I can capture course interest, qualification details, preferred contact time, and route the lead to admissions." },
    ],
    defaultResponse: "A production admissions flow can collect approved lead details, route the inquiry and schedule the next step. This demo is not connected to a real institute database.",
  },
  Insurance: {
    init: [
      { r: "bot", t: "Demo insurance assistant ready. Try a renewal, document collection, claim-intake, or callback request." },
      { r: "user", t: "My policy renewal is due." },
      { r: "bot", t: "I can demonstrate collecting renewal context and routing the request. A production system would verify policy data in the authorized insurer or broker system." },
    ],
    defaultResponse: "I can demonstrate request intake and routing, but policy-specific decisions or advice should move to an authorized human workflow. No live policy record is accessed here.",
  },
  "E-commerce": {
    init: [
      { r: "bot", t: "Demo commerce assistant ready. Try an order-status, return, product, or cart-follow-up question." },
      { r: "user", t: "Where is my order?" },
      { r: "bot", t: "I can show the support flow. In production, order status would come from the store or fulfillment system after verification." },
    ],
    defaultResponse: "A production support flow can retrieve verified order data, route exceptions and record the outcome. This demo does not access a real order database.",
  },
  HR: {
    init: [
      { r: "bot", t: "Demo recruitment assistant ready. Try candidate intake, screening questions, scheduling, or onboarding." },
      { r: "user", t: "Schedule an interview." },
      { r: "bot", t: "I can demonstrate collecting availability and routing the request. A production version would connect to the approved calendar and ATS workflow." },
    ],
    defaultResponse: "A production recruiting workflow can collect approved candidate information and route it to the team. Hiring decisions that affect candidates should remain with authorized humans.",
  },
};

const containsAny = (text, words) => words.some((word) => text.includes(word));

export function getDemoResponse(niche, input) {
  const text = String(input || "").trim().toLowerCase();
  const scenario = DEMO_SCENARIOS[niche] || DEMO_SCENARIOS.Healthcare;

  if (niche === "Healthcare") {
    if (containsAny(text, ["diagnos", "treatment", "medicine", "medication", "prescription", "symptom", "pain", "bleeding", "emergency"])) {
      return "This demo will not diagnose, prescribe or recommend treatment. A production clinic workflow should hand medical or urgent questions to qualified clinic staff and the clinic's approved escalation process.";
    }
    if (containsAny(text, ["appointment", "book", "slot", "schedule", "tomorrow", "doctor", "consultation"])) {
      return "I can collect your preferred service, location, time and contact details, then route the appointment request to the clinic workflow. Confirmation would come only after the connected calendar or staff process accepts it.";
    }
    if (containsAny(text, ["price", "fee", "cost", "hours", "open", "location", "address"])) {
      return "A production assistant can answer approved clinic information from maintained source content. If that information cannot be verified, it should hand the question to staff instead of guessing.";
    }
  }

  if (niche === "EdTech") {
    if (containsAny(text, ["demo", "class", "counsel", "schedule", "book"])) {
      return "I can collect the course and preferred demo/counseling time, then route the request to admissions. A real booking is confirmed only by the connected calendar or admissions workflow.";
    }
    if (containsAny(text, ["discount", "scholarship", "refund", "exception"])) {
      return "That kind of policy or commercial exception should be routed to authorized admissions staff rather than decided by the automation.";
    }
  }

  if (niche === "Insurance") {
    if (containsAny(text, ["approve", "deny", "eligible", "coverage", "claim decision", "advice"])) {
      return "This demo does not make coverage, eligibility or claim decisions. A production workflow should collect the approved context and escalate the decision to an authorized human reviewer.";
    }
    if (containsAny(text, ["renew", "document", "callback"])) {
      return "I can demonstrate collecting renewal/document details and routing the request. A production version would verify the relevant record before sending status or reminders.";
    }
  }

  if (niche === "E-commerce") {
    if (containsAny(text, ["order", "shipping", "delivery", "where", "track"])) {
      return "A production integration should retrieve verified order status from the approved commerce or fulfillment system. If verification fails, it should escalate instead of inventing a status.";
    }
    if (containsAny(text, ["return", "refund", "exchange"])) {
      return "I can demonstrate collecting the request and routing it against approved store policy. Exceptions or unverifiable cases should move to support staff.";
    }
  }

  if (niche === "HR") {
    if (containsAny(text, ["hire", "reject", "best candidate", "should we", "decision"])) {
      return "This demo does not make final hiring or rejection decisions. A production workflow can organize approved screening information and route it to authorized recruiting staff for judgment.";
    }
    if (containsAny(text, ["interview", "schedule", "availability", "calendar"])) {
      return "I can collect availability and route an interview request. A production version confirms the meeting only after the approved calendar or ATS accepts it.";
    }
  }

  return scenario.defaultResponse;
}
