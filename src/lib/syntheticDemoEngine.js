const NORMAL = "normal";
const ESCALATE = "escalate";

function textOf(value) {
  return String(value || "").trim().toLowerCase();
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function result(message, route = NORMAL, stage = "INTAKE") {
  return { message, route, stage };
}

const medicalRiskWords = [
  "symptom",
  "diagnose",
  "diagnosis",
  "medicine",
  "medication",
  "dose",
  "treatment",
  "bleeding",
  "chest pain",
  "breathing",
  "emergency",
  "severe pain",
];

export function runSyntheticDemo(industry, input) {
  const text = textOf(input);
  if (!text) return result("Type a sample request to run the synthetic workflow.", NORMAL, "WAITING");

  if (industry === "Healthcare") {
    if (includesAny(text, medicalRiskWords)) {
      return result(
        "Human escalation triggered. This demo does not diagnose, recommend treatment, or answer clinical questions. A production clinic workflow should route this request to qualified staff using the clinic's approved escalation rules.",
        ESCALATE,
        "HUMAN ESCALATION"
      );
    }
    if (includesAny(text, ["appointment", "book", "slot", "doctor", "consult", "tomorrow", "today"])) {
      return result(
        "Synthetic route: collect clinic/service, preferred time and contact details → check the approved scheduling source → create or route the booking request → record status for staff follow-up.",
        NORMAL,
        "BOOK / ROUTE"
      );
    }
    if (includesAny(text, ["price", "cost", "bill", "billing", "payment", "insurance"])) {
      return result(
        "Synthetic route: capture the service and billing question → answer only from approved clinic information → route account-specific or coverage questions to the billing/front-desk team.",
        NORMAL,
        "QUALIFY / ROUTE"
      );
    }
    if (includesAny(text, ["cancel", "reschedule", "change time"])) {
      return result(
        "Synthetic route: verify the appointment reference through the clinic's connected system → collect the preferred change → update or route the request → notify staff when manual approval is required.",
        NORMAL,
        "UPDATE / ROUTE"
      );
    }
    return result(
      "Synthetic intake: identify whether this is an appointment, clinic-information, billing, follow-up, or sensitive clinical request. Approved operational requests continue automatically; clinical or low-confidence requests escalate to staff.",
      NORMAL,
      "QUALIFY"
    );
  }

  if (industry === "EdTech") {
    if (includesAny(text, ["course", "program", "admission", "enroll", "enrol"])) {
      return result(
        "Synthetic route: capture course interest, learner profile and preferred contact time → qualify against approved admissions rules → create/update the lead → assign the right counselor.",
        NORMAL,
        "QUALIFY / ROUTE"
      );
    }
    if (includesAny(text, ["demo", "class", "trial", "schedule", "book"])) {
      return result(
        "Synthetic route: collect course + preferred demo slot → check the configured calendar → create the demo request → trigger approved reminder/follow-up events.",
        NORMAL,
        "BOOK / FOLLOW UP"
      );
    }
    if (includesAny(text, ["fee", "fees", "refund", "scholarship", "payment"])) {
      return result(
        "Synthetic route: answer only from approved fee information and route learner-specific payment, refund, or scholarship decisions to authorized admissions/accounts staff.",
        ESCALATE,
        "AUTHORIZED REVIEW"
      );
    }
    return result(
      "Synthetic admissions intake: identify course interest, qualification needs, demo intent, fee question, or follow-up status, then route the lead to the configured next step.",
      NORMAL,
      "QUALIFY"
    );
  }

  if (industry === "Insurance") {
    if (includesAny(text, ["claim", "approve", "reject", "coverage", "eligible", "payout"])) {
      return result(
        "Authorized-review route triggered. The automation can collect and organize claim context, but policy interpretation, eligibility, approval, rejection, or payout decisions stay with authorized humans/systems.",
        ESCALATE,
        "AUTHORIZED REVIEW"
      );
    }
    if (includesAny(text, ["renew", "renewal", "expire", "expiry"])) {
      return result(
        "Synthetic route: verify the policy reference in the approved system → collect renewal intent/missing details → trigger approved reminders → route exceptions to the servicing team.",
        NORMAL,
        "RENEWAL FLOW"
      );
    }
    if (includesAny(text, ["document", "upload", "kyc", "file"])) {
      return result(
        "Synthetic route: identify required document type → collect through the approved secure channel → track missing items → notify the authorized reviewer when the packet is complete.",
        NORMAL,
        "DOCUMENT FLOW"
      );
    }
    return result(
      "Synthetic insurance intake: classify renewal, document, claim-intake, or callback intent. Operational collection can automate; policy or claim decisions escalate to authorized review.",
      NORMAL,
      "QUALIFY"
    );
  }

  if (industry === "E-commerce") {
    if (includesAny(text, ["order", "where", "track", "delivery", "shipped"])) {
      return result(
        "Synthetic route: verify the order identifier against the approved commerce/fulfillment source → return only verified status → escalate if the order cannot be matched or an exception is detected.",
        NORMAL,
        "VERIFY / RESPOND"
      );
    }
    if (includesAny(text, ["return", "refund", "replace", "replacement", "damaged"])) {
      return result(
        "Synthetic route: verify the order → collect return reason/evidence required by store policy → create the support case → route refunds or policy exceptions for authorized handling.",
        NORMAL,
        "SUPPORT ROUTE"
      );
    }
    if (includesAny(text, ["discount", "coupon", "offer", "price match"])) {
      return result(
        "The automation should answer only from active approved promotion data. Unlisted discounts or price exceptions must not be invented and should route to staff when needed.",
        ESCALATE,
        "POLICY REVIEW"
      );
    }
    return result(
      "Synthetic commerce intake: identify order status, return, product, or follow-up intent → verify against approved systems → respond or route without inventing order data.",
      NORMAL,
      "QUALIFY"
    );
  }

  if (industry === "HR") {
    if (includesAny(text, ["hire me", "selected", "rejected", "reject", "score", "best candidate", "should we hire"])) {
      return result(
        "Human decision boundary triggered. This workflow can collect structured candidate information and coordinate steps, but hiring judgments and consequential candidate decisions stay with authorized people.",
        ESCALATE,
        "HUMAN DECISION"
      );
    }
    if (includesAny(text, ["interview", "schedule", "availability", "slot"])) {
      return result(
        "Synthetic route: collect candidate availability → check the approved interview calendar → create or route the scheduling request → write the status back to the ATS/CRM.",
        NORMAL,
        "SCHEDULE"
      );
    }
    if (includesAny(text, ["apply", "application", "resume", "cv", "job"])) {
      return result(
        "Synthetic route: collect the approved application fields → attach the candidate record to the configured ATS/CRM → notify the recruiting owner → preserve human review for screening decisions.",
        NORMAL,
        "INTAKE / ROUTE"
      );
    }
    return result(
      "Synthetic recruiting intake: classify application, scheduling, status, or onboarding intent. Coordination can automate; consequential hiring decisions remain human-controlled.",
      NORMAL,
      "QUALIFY"
    );
  }

  return result("Synthetic workflow route unavailable for this demo selection.", NORMAL, "UNAVAILABLE");
}

export const DEMO_ROUTE = { NORMAL, ESCALATE };
