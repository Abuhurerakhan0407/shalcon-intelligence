/* ════════════════════════════════════════════════════════════════
   SHALCON INTELLIGENCE — CENTRAL DATA LAYER
   All copy/data ported verbatim from source/shalcon_final.jsx.
   Only SITE_CONFIG contact fields updated per build brief §3.
   Do NOT rewrite copy in NICHES / SERVICES / TESTIMONIALS / DEMO.
   ════════════════════════════════════════════════════════════════ */

export const SITE_CONFIG = {
  agencyName: "SHALCON",
  tagline: "INTELLIGENCE",
  description: "AI automation systems for businesses that can't afford to stop.",
  calendlyLink: "https://calendly.com/shalconintelligence/30min",
  whatsappNumber: "919833001193",
  linkedinURL: "https://www.linkedin.com/in/shalcon-intelligence-a6b999407",
  email: "shalconintelligence@gmail.com",
  copyright: "© 2026 SHALCON INTELLIGENCE",
};

// ── 5 industry solutions ──
export const NICHES = {
  Healthcare: {
    pain: "Your clinic has 200 unread messages. Patients book with whoever replies first.",
    solution: "24/7 AI Patient Intake + WhatsApp Booking System",
    tag: "MEDICAL · TELEMEDICINE · CLINICS",
    color: "#00FF94",
    stats: ["340 appts/mo", "0 missed calls", "99% uptime"],
    icon: "🏥",
    features: ["Intake Bot", "Auto Follow-up", "Smart Routing", "Live Dashboard"],
  },
  EdTech: {
    pain: "Students drop out silently. No one follows up on admissions or fees.",
    solution: "Automated Admissions Bot + Fee Reminder Pipeline",
    tag: "COACHING · ONLINE SCHOOLS · EDTECH",
    color: "#00CFFF",
    stats: ["2x enrollments", "Auto fee chase", "24/7 support"],
    icon: "🎓",
    features: ["Admissions Bot", "Fee Reminders", "Progress Reports", "Parent Alerts"],
  },
  Insurance: {
    pain: "Renewals lapse. Claims pile up. Agents can't reach everyone manually.",
    solution: "Renewal Reminder Automation + Claims Intake Bot",
    tag: "BROKERS · POLICIES · CLAIMS",
    color: "#FF9F00",
    stats: ["94% renewal rate", "3min response", "Zero leakage"],
    icon: "🛡️",
    features: ["Renewal Bot", "Claims Intake", "Doc Collection", "Policy FAQ Bot"],
  },
  "E-commerce": {
    pain: "500 'where is my order?' messages daily. Carts abandoned. Revenue gone.",
    solution: "AI Support Bot + Cart Recovery Automation",
    tag: "SHOPIFY · D2C · ONLINE RETAIL",
    color: "#FF4FD8",
    stats: ["38% cart recovery", "0 wait time", "5★ ratings"],
    icon: "🛒",
    features: ["Support Bot", "Cart Recovery", "Review Automation", "Upsell Flow"],
  },
  HR: {
    pain: "300 CVs. No screening. Interviews over endless email chains.",
    solution: "AI Candidate Screening + Interview Scheduling",
    tag: "RECRUITMENT · HIRING · ONBOARDING",
    color: "#A78BFA",
    stats: ["10x faster hiring", "Auto screening", "Full pipeline"],
    icon: "👥",
    features: ["CV Screening", "Interview Scheduler", "Offer Letters", "Onboarding Bot"],
  },
};

// ── Services ──
export const SERVICES = [
  {
    title: "AI Voice Agent",
    desc: "Multilingual outbound & inbound calls. Handles objections, qualifies leads, books appointments — 24/7.",
    icon: "🎙️",
    tag: "VOICE AI",
  },
  {
    title: "WhatsApp Automation",
    desc: "24/7 intelligent intake, follow-up sequences, and broadcast systems on WhatsApp Business API.",
    icon: "💬",
    tag: "MESSAGING",
  },
  {
    title: "CRM Pipeline Build",
    desc: "Full lead capture to close automation. Never let a prospect fall through the cracks again.",
    icon: "🔁",
    tag: "CRM · PIPELINE",
  },
  {
    title: "Document Automation",
    desc: "Auto-generate contracts, collect e-signatures, chase document submissions — zero manual effort.",
    icon: "📄",
    tag: "DOCS · E-SIGN",
  },
  {
    title: "AI Support Bot",
    desc: "Deploy on website, WhatsApp or app. Handles Tier-1 support with smart human escalation.",
    icon: "🤖",
    tag: "CHATBOT · SUPPORT",
  },
  {
    title: "Analytics Dashboard",
    desc: "Real-time reporting on every automation. See exactly what's working and what to optimize.",
    icon: "📊",
    tag: "DATA · INSIGHTS",
  },
];

// ── Testimonials ──
export const TESTIMONIALS = [
  {
    name: "Healthcare Founder, Mumbai",
    role: "Telemedicine Clinic Owner",
    text: "We were losing at least 30 patients a week. The system went live in 8 days and now handles everything overnight without anyone touching it.",
    revealed: false,
  },
  {
    name: "Director, EdTech Platform",
    role: "Online Coaching Institute",
    text: "Our admissions team was drowning. Within two weeks of deployment, we saw a 2.4x increase in qualified enrollments. Zero extra staff.",
    revealed: false,
  },
];

// ── Stats ──
export const HERO_STATS = [
  { key: "a", label: "Automations active", display: (v) => v.toLocaleString() },
  { key: "l", label: "Leads today", display: (v) => String(v) },
  { key: "m", label: "Messages handled", display: (v) => v.toLocaleString() },
  { key: "c", label: "Client satisfaction", display: (v) => `${v}%` },
];

export const PLATFORM_STATS = [
  { val: "1,247+", label: "Automations Active", sub: "right now", color: "#00FF94" },
  { val: "99.97%", label: "System Uptime", sub: "guaranteed SLA", color: "#00CFFF" },
  { val: "24/7", label: "AI Availability", sub: "zero downtime", color: "#FF9F00" },
  { val: "< 2min", label: "Response Time", sub: "avg. AI reply", color: "#FF4FD8" },
];

// ── Live feed messages ──
export const LIVE_FEED = [
  "CLINIC_BOT → Booked appointment: Dr. Sharma 10AM",
  "EDTECH_BOT → Fee reminder sent: 847 students",
  "INSURANCE_BOT → Renewal processed: Policy #8821",
  "ECOM_BOT → Cart recovered: ₹4,200 order",
  "HR_BOT → Candidate screened: Priya S. — QUALIFIED",
  "CLINIC_BOT → Patient intake: New registration logged",
  "EDTECH_BOT → Lead captured: MBA inquiry booked",
  "INSURANCE_BOT → Claim intake: FNOL filed in 90 seconds",
  "ECOM_BOT → Order status: 342 customers notified",
  "SYSTEM → Uptime: 99.97% · All nodes operational",
];

// ── Demo chatbot responses ──
export const DEMO_RESPONSES = {
  Healthcare: [
    "We have slots at 10AM, 1:30PM & 4PM tomorrow. Which doctor — Dr. Sharma (General), Dr. Patel (Derm) or Dr. Verma (ENT)?",
    "Your appointment is confirmed for tomorrow 10AM. WhatsApp confirmation sent. Reminder 1hr before.",
    "Consultation fee: ₹800 general / ₹1,200 specialist. Pay online or at clinic. Want a payment link?",
  ],
  EdTech: [
    "JEE/NEET ₹45k · CAT ₹38k · Coding ₹28k. All include live sessions + recordings. Free demo class?",
    "Your demo class is Saturday 11AM. Join link sent to WhatsApp. 84% selection rate at top colleges.",
    "EMI available: 3×₹15,500 or 6×₹8,200. Zero interest. Shall I initiate enrollment?",
  ],
  Insurance: [
    "Policy HDFC-LF-2847 expires April 28th. Premium ₹12,450. Send payment link via WhatsApp?",
    "Claim #CLM-9823 under review. Processing: 5-7 days. WhatsApp updates at each stage.",
    "Quote in 30 seconds. Confirm: age, sum assured, policy type (term/health/vehicle)?",
  ],
  "E-commerce": [
    "Order #45821 out for delivery 🚚 Left Mumbai 7:42AM. ETA 2–4PM. SMS alert 30min before arrival.",
    "Return initiated. Pickup tomorrow 10AM–2PM. Refund in 3-5 days. ₹200 goodwill credits added.",
    "In stock! S, M, L, XL available. Adding with your 10% loyalty discount. Confirm?",
  ],
  HR: [
    "Scheduling links sent to all 3 candidates. Average response under 2hrs. Prepare assessment too?",
    "Background check initiated. Results in 48hrs. Offer letter draft sent for review.",
    "Job posted on 6 platforms. 23 applications received. Running screening now. Shortlist in 2hrs?",
  ],
};

export const DEMO_INIT = {
  Healthcare: [
    { r: "bot", t: "Welcome to MedCare Clinic — I'm your 24/7 AI assistant. Book appointments, check availability, get answers instantly." },
    { r: "user", t: "I need an appointment tomorrow." },
    { r: "bot", t: "We have slots at 10AM, 1:30PM & 4PM tomorrow. Which doctor — Dr. Sharma (General), Dr. Patel (Derm) or Dr. Verma (ENT)?" },
  ],
  EdTech: [
    { r: "bot", t: "Welcome to BrightMind — courses, fees, schedules, admissions. How can I help?" },
    { r: "user", t: "What courses and fees?" },
    { r: "bot", t: "JEE/NEET ₹45k · CAT ₹38k · Coding ₹28k. All include live sessions + recordings. Free demo class?" },
  ],
  Insurance: [
    { r: "bot", t: "Hello — renewals, claims, new quotes, document uploads. What do you need?" },
    { r: "user", t: "My policy expires next month." },
    { r: "bot", t: "Policy HDFC-LF-2847 expires April 28th. Premium ₹12,450. Send payment link via WhatsApp?" },
  ],
  "E-commerce": [
    { r: "bot", t: "Hi! Track orders, returns, product questions — I handle it all. How can I help?" },
    { r: "user", t: "Where is my order #45821?" },
    { r: "bot", t: "Order #45821 out for delivery 🚚 Left Mumbai 7:42AM. ETA 2–4PM. SMS alert 30min before." },
  ],
  HR: [
    { r: "bot", t: "TalentFlow HR — screening, scheduling, onboarding, documents. What do you need?" },
    { r: "user", t: "Schedule interviews for 3 candidates." },
    { r: "bot", t: "Scheduling links sent. Average response under 2hrs. Prepare standard assessment too?" },
  ],
};

/* ════════════════════════════════════════════════════════════════
   ROI CALCULATOR — canonical data (ported verbatim from
   source/shalcon_roi_calculator.jsx). Contact info intentionally
   NOT duplicated here — use SITE_CONFIG (real values). The ROI
   file's CONTACT was a placeholder and is dropped.
   ════════════════════════════════════════════════════════════════ */

// ── Pricing packages ──
export const ROI_PACKAGES = [
  {
    name: "STARTER",
    tagline: "Your first AI employee.",
    timeline: "Live in 10 days",
    setup: { INR: "₹25,000–₹40,000", USD: "$500–$800" },
    monthly: { INR: "₹8,000–₹12,000/mo", USD: "$150–$250/mo" },
    breakevenDays: 6,
    features: [
      "One core automation",
      "WhatsApp or booking bot",
      "Up to 15 conversation intents",
      "30-day support included",
      "One revision round",
    ],
    color: "#00CFFF",
    lossMultiplier: 0.4,
    recommended: false,
  },
  {
    name: "GROWTH",
    tagline: "Full department replaced.",
    timeline: "Running in 3 weeks",
    setup: { INR: "₹75,000–₹1,20,000", USD: "$1,500–$2,500" },
    monthly: { INR: "₹25,000–₹40,000/mo", USD: "$500–$900/mo" },
    breakevenDays: 9,
    features: [
      "Three automations as one system",
      "CRM pipeline integration",
      "WhatsApp + email + voice flow",
      "Monthly performance reports",
      "Priority 24hr support SLA",
    ],
    color: "#00FF94",
    lossMultiplier: 0.75,
    recommended: true,
  },
  {
    name: "ENTERPRISE",
    tagline: "The office that runs itself.",
    timeline: "Full deployment in 30 days",
    setup: { INR: "₹2,00,000–₹5,00,000", USD: "$4,000–$10,000" },
    monthly: { INR: "₹75,000–₹1,50,000/mo", USD: "$1,500–$3,500/mo" },
    breakevenDays: 14,
    features: [
      "Full automation stack",
      "AI voice agent (in + outbound)",
      "Real-time analytics dashboard",
      "Document + e-sign automation",
      "Monthly strategy call with team",
    ],
    color: "#A78BFA",
    lossMultiplier: 1.0,
    recommended: false,
  },
];

// ── ROI industry presets (numeric inputs for the calculator) ──
// NOTE: distinct from NICHES (marketing copy). No fields overlap:
// NICHES = pain/solution/features; ROI_INDUSTRIES = txn/miss/volume.
export const ROI_INDUSTRIES = [
  {
    id: "healthcare",
    label: "🏥 Healthcare & Telemedicine",
    avgTxn: 1200,
    missRate: 40,
    dailyInq: 80,
    lossLabel: "per missed patient appointment",
    painLine: "Patients book with whoever responds first. You're not responding fast enough.",
  },
  {
    id: "edtech",
    label: "🎓 EdTech & Coaching",
    avgTxn: 15000,
    missRate: 35,
    dailyInq: 60,
    lossLabel: "per lost enrollment inquiry",
    painLine: "Students ghost. Fees go unpaid. Nobody is following up automatically.",
  },
  {
    id: "insurance",
    label: "🛡️ Insurance",
    avgTxn: 12000,
    missRate: 25,
    dailyInq: 40,
    lossLabel: "per lapsed renewal",
    painLine: "Renewals lapse silently. Claims pile up. Agents can't reach everyone.",
  },
  {
    id: "ecommerce",
    label: "🛒 E-commerce",
    avgTxn: 2800,
    missRate: 68,
    dailyInq: 200,
    lossLabel: "per abandoned cart",
    painLine: "68% of carts abandoned. Support tickets pile up. Revenue leaks daily.",
  },
  {
    id: "hr",
    label: "👥 HR & Recruitment",
    avgTxn: 45000,
    missRate: 30,
    dailyInq: 25,
    lossLabel: "per missed placement",
    painLine: "Top candidates ghost. Interviews missed. Placements lost to faster agencies.",
  },
];

// ── ROI math: default slider state + constants ──
export const ROI_DEFAULTS = {
  currency: "INR",
  inquiries: 50,
  missPercent: 40,
  avgTxn: 2000,
};

export const ROI_MATH = { MONTH_DAYS: 30, YEAR_DAYS: 365 };

// dailyLoss = inquiries × missRate × avgTxn (verbatim formula)
export function roiLoss(inquiries, missPercent, avgTxn) {
  const daily = Math.round(inquiries * (missPercent / 100) * avgTxn);
  return { daily, monthly: daily * ROI_MATH.MONTH_DAYS, yearly: daily * ROI_MATH.YEAR_DAYS };
}

export function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ── Design tokens — reuse exactly, do not invent new palette (brief §2) ── */
export const G = {
  bg: "#030308", card: "#0A0A14", card2: "#0D0D1A",
  green: "#00FF94", blue: "#00CFFF", amber: "#FF9F00",
  pink: "#FF4FD8", purple: "#A78BFA",
  muted: "#555577", border: "#1A1A2E", white: "#FFFFFF",
};
