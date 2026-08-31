# Shalcon Intelligence — Marketing Claims Register

Status date: 31 Aug 2026

Rule: no numeric performance/result/client claim ships publicly without evidence. Synthetic/demo content must be labeled. Public client-result wording requires evidence + client permission.

## 1. Legacy claims — removed / prohibited
The following appeared in old marketing/prototype material and are **not approved current Shalcon claims**:

| Legacy claim/content | Evidence state | Current action |
|---|---|---|
| `1,247+ Automations Active` | UNSUPPORTED | Removed from active marketing; regression guard must keep it out |
| `99.97% System Uptime` / guaranteed SLA | UNSUPPORTED | Removed; use only if a real monitored/contractual basis exists later |
| `<2min avg AI reply` | UNSUPPORTED as client result | Removed; controlled demo latency may be reported only as test evidence with context |
| `340 appts/mo` Healthcare | UNSUPPORTED | Removed |
| `94% renewal rate` Insurance | UNSUPPORTED | Removed |
| `38% cart recovery` E-commerce | UNSUPPORTED | Removed |
| `10x faster hiring` HR | UNSUPPORTED | Removed |
| `2x enrollments` EdTech | UNSUPPORTED | Removed |
| Healthcare testimonial | NOT VERIFIED | Removed until real client evidence + permission |
| EdTech testimonial / `2.4x` | NOT VERIFIED | Removed until evidence + permission |
| `Healthcare & EdTech Live` / faux case-study proof | MISLEADING | Replaced by synthetic/demo framing |
| named-doctor/order/policy live-feed events | SIMULATED | Keep only as visibly synthetic demo content; do not imply real client activity |
| fixed ROI recovery multiplier | MODEL ASSUMPTION | Removed/reframed as editable Opportunity-at-Risk planning assumptions |
| fixed break-even day | UNSUPPORTED | Removed |
| unconditional `go live within 10 days` | UNSUPPORTED/DEPENDENCY-SENSITIVE | Removed from active promise; timelines belong in scoped SOW after access/integration review |
| `pay nothing if not live in 10 days` | UNAPPROVED COMMERCIAL RISK | Removed |
| `rebuild free if not perform in 30 days` | VAGUE/UNMEASURABLE | Removed; use scoped acceptance/remediation terms instead |

CI marketing-claim regression checks exist to reduce accidental reintroduction of legacy unsupported claims.

## 2. Current approved capability/positioning claims
These are capability/operating-position statements, not client-result proof:
- Shalcon Intelligence is an **AI Operations Systems Partner**.
- Primary launch wedge is **Healthcare / clinics**.
- Flagship is **AI Front Desk + Lead Operations System**.
- Shalcon can design scoped workflows around intake, approved qualification, routing/booking, approved follow-up, CRM/database write-back, operational reporting and human escalation.
- Public demos use synthetic data unless explicitly identified otherwise.
- Sensitive/clinical professional judgment remains human-controlled by default.
- Opportunity-at-Risk Estimator uses editable assumptions and is not guaranteed loss/recovery.
- Dedicated website lead persistence is deployed and has passed documented Vercel→Supabase success, replay/conflict and fail-closed tests.

Technical test evidence must still be described as test/implementation evidence—not client performance.

## 3. Current commercial statements
Owner-approved standard bounded Healthcare Pilot:
- ₹39,000 setup/implementation;
- ₹9,000/month managed optimization/support after included stabilization;
- 50% / 30% / 20% implementation milestones;
- third-party/API/message/call/vendor usage client-paid or separately itemized.

This is an approved commercial baseline, not a claim that every Healthcare/client project fits that price. Expanded/custom scope is quoted after audit.

No other vertical currently has a locked default price unless owner later approves one.

## 4. Allowed proof before real clients
Allowed when described accurately:
- synthetic demo recordings/screenshots;
- architecture/workflow diagrams;
- automated test run evidence;
- controlled test success/failure behaviour;
- measured controlled-demo latency with environment/context;
- integration coverage actually implemented/tested;
- human escalation/fallback behaviour;
- security/access design actually implemented;
- real live website/API persistence test evidence using synthetic QA data.

Do not convert these into claims about client revenue, patient bookings, staff savings or market adoption.

## 5. Required evidence for a client-result claim
Before any identifiable public result, record:
- client/company;
- metric name + exact definition;
- baseline period/value/source;
- post-launch period/value/source;
- sample size/event count where relevant;
- calculation method;
- known confounders/limitations;
- client validation;
- explicit permission to publish;
- approved wording;
- proof artifact/link.

If baseline is unavailable, do not invent one. Report observed post-launch behaviour without unsupported `improvement` language.

## 6. Causality rule
Prefer bounded observational wording:
- `Median first-response time changed from [verified baseline] to [verified post] during [period].`

Avoid causal claims such as:
- `Shalcon increased revenue by X%`
- `Shalcon recovered X bookings`

unless the evidence genuinely supports causation and client approves the wording.

## 7. Proof promotion gate
Private pilot evidence becomes public only when:
1. source data/evidence archived;
2. definitions/timeframes match;
3. caveats/confounders recorded;
4. client validates result;
5. publication permission obtained;
6. wording added/approved in this register.

Until then, keep result internal.

## 8. Current proof maturity
- Synthetic/capability proof: AVAILABLE.
- Technical production-path evidence: AVAILABLE.
- Real client result evidence: NONE YET.
- Permission-backed public case study: NONE YET.

Do not imply otherwise in website, outreach, proposals, social content or sales calls.
