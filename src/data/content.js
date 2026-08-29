/* SHALCON INTELLIGENCE — MARKET-READY CONTENT SOURCE */

export const SITE_CONFIG = {
  agencyName: "SHALCON",
  tagline: "INTELLIGENCE",
  description: "AI operations systems for intake, qualification, follow-up, routing and reporting.",
  calendlyLink: "https://calendar.app.google/HMdDM2iUEuwbaMUEA",
  whatsappNumber: "919833001193",
  linkedinURL: "https://www.linkedin.com/in/shalcon-intelligence-a6b999407",
  email: "shalconintelligence@gmail.com",
  copyright: "© 2026 SHALCON INTELLIGENCE",
};

export const NICHES = {
  Healthcare: {
    pain: "Inquiries often move between calls, WhatsApp, forms, calendars and staff handoffs before an appointment is confirmed.",
    solution: "AI Front Desk + Lead Operations System",
    tag: "CLINICS · DIAGNOSTICS · TELEMEDICINE",
    color: "#00FF94",
    stats: ["Structured intake", "Human escalation", "CRM-ready"],
    icon: "🏥",
    features: ["Intake Flow", "Booking / Routing", "Follow-up", "Operational Events"],
  },
  EdTech: {
    pain: "Admissions inquiries, course questions, demo bookings and fee follow-up often live across disconnected channels.",
    solution: "Admissions Intake + Follow-up Operations System",
    tag: "COACHING · SCHOOLS · EDTECH",
    color: "#00CFFF",
    stats: ["Lead capture", "Demo routing", "Follow-up"],
    icon: "🎓",
    features: ["Admissions Intake", "Demo Booking", "Lead Routing", "Parent / Student Updates"],
  },
  Insurance: {
    pain: "Renewal, document and claim-related requests require consistent collection, reminders and human review.",
    solution: "Renewal + Document Intake Workflow",
    tag: "BROKERS · POLICIES · CLAIMS",
    color: "#FF9F00",
    stats: ["Reminder flows", "Document intake", "Escalation"],
    icon: "🛡️",
    features: ["Renewal Intake", "Document Collection", "Request Routing", "Status Updates"],
  },
  "E-commerce": {
    pain: "Support, order questions, returns and recovery workflows can create repetitive work across helpdesk and messaging channels.",
    solution: "AI Support + Commerce Operations Workflow",
    tag: "D2C · SHOPIFY · ONLINE RETAIL",
    color: "#FF4FD8",
    stats: ["Support intake", "Order routing", "Follow-up"],
    icon: "🛒",
    features: ["Support Intake", "Order / Return Routing", "Follow-up", "Human Handoff"],
  },
  HR: {
    pain: "Candidate intake, screening questions, scheduling and onboarding coordination create repeatable administrative work.",
    solution: "Candidate Intake + Scheduling Workflow",
    tag: "RECRUITMENT · HIRING · ONBOARDING",
    color: "#A78BFA",
    stats: ["Candidate intake", "Scheduling", "Handoff"],
    icon: "👥",
    features: ["Candidate Intake", "Screening Workflow", "Interview Scheduling", "Onboarding Routing"],
  },
};

export const SERVICES = [
  {
    title: "AI Front Desk",
    desc: "Structured inbound intake that collects required information, handles approved questions and routes the request to the right next step.",
    icon: "◎",
    tag: "INTAKE · ROUTING",
  },
  {
    title: "WhatsApp Workflows",
    desc: "Permission-aware WhatsApp journeys for intake, reminders, follow-up and human escalation using approved business messaging infrastructure.",
    icon: "↗",
    tag: "MESSAGING",
  },
  {
    title: "Voice Workflows",
    desc: "Inbound or outbound voice automation where the use case, consent requirements and escalation rules make voice appropriate.",
    icon: "◉",
    tag: "VOICE AI",
  },
  {
    title: "CRM Orchestration",
    desc: "Capture source, status, owner and outcome so the automation updates the operational system instead of creating another disconnected inbox.",
    icon: "↻",
    tag: "CRM · PIPELINE",
  },
  {
    title: "Document Workflows",
    desc: "Collect required files, track missing items, route them for review and trigger approved next steps without pretending review can always be automated.",
    icon: "▤",
    tag: "DOCUMENTS",
  },
  {
    title: "Operational Reporting",
    desc: "Event-based reporting around inquiries, handoffs, follow-ups, failures and outcomes so improvements are measured before ROI claims are made.",
    icon: "▥",
    tag: "MEASUREMENT",
  },
];

// Reserved for verified, permission-backed client evidence only.
export const TESTIMONIALS = [];
export const HERO_STATS = [];
export const PLATFORM_STATS = [];
export const LIVE_FEED = [];

export const DEMO_RESPONSES = {
  Healthcare: [
    "I can help with appointment requests, clinic information and routing. Which location or service are you trying to book?",
    "Thanks. I can capture your preferred time and contact details, then route the request for confirmation.",
    "For symptoms, diagnosis or treatment advice, I need to hand this to a qualified clinic professional rather than answer clinically.",
  ],
  EdTech: [
    "I can collect the course you're interested in, your preferred demo time and contact details for the admissions team.",
    "Your demo preference is captured in this prototype. A production workflow could route it into the institute's calendar or CRM.",
    "I can also trigger approved follow-up when an inquiry has not completed the next admissions step.",
  ],
  Insurance: [
    "I can help collect renewal or document-request details and route them for review. I won't make policy or claim decisions in this demo.",
    "A production workflow could track which required documents are still missing and send approved reminders.",
    "Complex or sensitive claim questions should move to an authorized human reviewer.",
  ],
  "E-commerce": [
    "I can demonstrate order-support intake, return routing and follow-up logic using synthetic example records.",
    "A production workflow can connect to approved commerce/helpdesk systems to retrieve status and record outcomes.",
    "If the system cannot verify the requested order data, it should escalate rather than invent a status.",
  ],
  HR: [
    "I can demonstrate candidate intake, screening workflow and interview scheduling using synthetic applicant data.",
    "A production workflow can write candidate status into the approved ATS or CRM and notify the right recruiter.",
    "Sensitive or judgment-heavy hiring decisions should remain with authorized humans.",
  ],
};

export const DEMO_INIT = {
  Healthcare: [
    { r: "bot", t: "Demo mode: I can show a clinic intake and routing flow using synthetic data." },
    { r: "user", t: "I want to book an appointment." },
    { r: "bot", t: "Sure. Which clinic location or service would you like? In production, the options would come from the clinic's approved configuration." },
  ],
  EdTech: [
    { r: "bot", t: "Demo mode: I can show an admissions intake and follow-up workflow." },
    { r: "user", t: "I want a demo class." },
    { r: "bot", t: "I can collect the course, preferred time and contact details, then route the request to admissions." },
  ],
  Insurance: [
    { r: "bot", t: "Demo mode: I can show a renewal/document intake workflow without making policy decisions." },
    { r: "user", t: "I need help with a renewal." },
    { r: "bot", t: "I can collect the policy reference and required contact details, then route the request for authorized review." },
  ],
  "E-commerce": [
    { r: "bot", t: "Demo mode: I can show support intake and routing using synthetic orders." },
    { r: "user", t: "Where is my order?" },
    { r: "bot", t: "In production I would verify the order against an approved commerce system. If verification fails, I would escalate instead of guessing." },
  ],
  HR: [
    { r: "bot", t: "Demo mode: I can show candidate intake and scheduling with synthetic applicant data." },
    { r: "user", t: "Can you schedule an interview?" },
    { r: "bot", t: "I can collect availability and route it into the configured scheduling workflow while keeping hiring decisions with the recruiting team." },
  ],
};

export const ROI_PACKAGES = [
  {
    name: "STARTER",
    tagline: "One focused workflow.",
    timeline: "Typical pilot scope",
    setup: { INR: "₹25,000–₹40,000", USD: "$500–$800" },
    monthly: { INR: "₹8,000–₹12,000/mo", USD: "$150–$250/mo" },
    features: ["One core workflow", "One primary channel", "Human escalation", "Basic event tracking", "Stabilization support"],
    color: "#00CFFF",
    recommended: false,
  },
  {
    name: "GROWTH",
    tagline: "Connected lead operations.",
    timeline: "Multi-step implementation",
    setup: { INR: "₹75,000–₹1,20,000", USD: "$1,500–$2,500" },
    monthly: { INR: "₹25,000–₹40,000/mo", USD: "$500–$900/mo" },
    features: ["Multiple workflow steps", "CRM integration", "Cross-channel logic", "Operational reporting", "Priority optimization"],
    color: "#00FF94",
    recommended: true,
  },
  {
    name: "ENTERPRISE",
    tagline: "Broader operational orchestration.",
    timeline: "Custom implementation plan",
    setup: { INR: "₹2,00,000–₹5,00,000", USD: "$4,000–$10,000" },
    monthly: { INR: "₹75,000–₹1,50,000/mo", USD: "$1,500–$3,500/mo" },
    features: ["Multiple integrations", "Advanced routing", "Voice where appropriate", "Governance + reporting", "Ongoing optimization"],
    color: "#A78BFA",
    recommended: false,
  },
];

// Editable starter assumptions for the estimator. They are not industry benchmarks.
export const ROI_INDUSTRIES = [
  { id: "healthcare", label: "🏥 Healthcare & Clinics", avgTxn: 1200, missRate: 25, dailyInq: 30, lossLabel: "successful appointment value", painLine: "Use your own clinic data for a meaningful estimate." },
  { id: "edtech", label: "🎓 EdTech & Coaching", avgTxn: 15000, missRate: 25, dailyInq: 30, lossLabel: "successful enrollment value", painLine: "Use your own admissions data for a meaningful estimate." },
  { id: "insurance", label: "🛡️ Insurance", avgTxn: 12000, missRate: 20, dailyInq: 20, lossLabel: "successful conversion value", painLine: "Use your own renewal/lead data for a meaningful estimate." },
  { id: "ecommerce", label: "🛒 E-commerce", avgTxn: 2800, missRate: 20, dailyInq: 50, lossLabel: "successful conversion value", painLine: "Use your own commerce/support data for a meaningful estimate." },
  { id: "hr", label: "👥 HR & Recruitment", avgTxn: 45000, missRate: 20, dailyInq: 15, lossLabel: "successful placement value", painLine: "Use your own recruiting data for a meaningful estimate." },
];

export const ROI_DEFAULTS = { currency: "INR", inquiries: 30, missPercent: 25, avgTxn: 2000 };
export const ROI_MATH = { MONTH_DAYS: 30, YEAR_DAYS: 365 };

export function roiLoss(inquiries, missPercent, avgTxn) {
  const daily = Math.round(inquiries * (missPercent / 100) * avgTxn);
  return { daily, monthly: daily * ROI_MATH.MONTH_DAYS, yearly: daily * ROI_MATH.YEAR_DAYS };
}

export function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

export const G = {
  bg: "#030308",
  card: "#0A0A14",
  card2: "#0D0D1A",
  green: "#00FF94",
  blue: "#00CFFF",
  amber: "#FF9F00",
  pink: "#FF4FD8",
  purple: "#A78BFA",
  muted: "#555577",
  border: "#1A1A2E",
  white: "#FFFFFF",
};
