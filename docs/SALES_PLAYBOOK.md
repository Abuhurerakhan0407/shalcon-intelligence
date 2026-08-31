# Shalcon Intelligence — Sales Playbook

Status date: 31 Aug 2026  
Status: working market-ready playbook. Standard Healthcare commercial baseline is owner-approved; other vertical/custom pricing remains scoped after audit.

## 1. Primary offer
### AI Front Desk + Lead Operations System
A connected workflow that can capture inbound inquiries, collect approved fields, qualify intent, route/book, run approved follow-up, write status back to a CRM/database and escalate exceptions to humans.

Lead vertical: Healthcare / clinics.  
Secondary vertical: EdTech / coaching / admissions.  
Other supported workflows: Insurance, E-commerce, HR/Recruitment.

Shalcon sells the operating path, not isolated tools.

## 2. Ideal Healthcare client
Prioritize clinics, diagnostic centres, specialty practices and multi-location operators where discovery confirms meaningful repeated intake/routing/follow-up work.

Useful public signals for research:
- multiple booking/contact channels;
- multiple branches/services;
- visible appointment/home-collection paths;
- structured online booking plus staff handoff.

These are signals, not proof of internal pain.

Disqualify/defer when:
- autonomous diagnosis/medical advice is expected;
- human escalation for sensitive cases is refused;
- no repeatable workflow exists;
- guaranteed revenue outcomes are expected;
- required integrations cannot be lawfully/technically authorized;
- economics do not justify automation.

## 3. Workflow audit
Goal: diagnose one valuable workflow and quantify operational friction without promising revenue recovery.

Discovery questions:
1. Where do new inquiries arrive today?
2. Roughly how many arrive on a normal day/week?
3. What must staff ask before acting?
4. What requests repeat?
5. What must always go to a human?
6. How are appointments/requests booked or routed?
7. How are eligible no-response prospects followed up?
8. Where is final status stored?
9. Which tools are already used?
10. What breaks or creates duplicate work most often?
11. What response-time target matters operationally?
12. What information is sensitive and should stay outside general automation?
13. Who approves messaging, CRM/calendar access and data handling?
14. What measurable result would make a bounded pilot successful?

Do not populate answers from public assumptions.

## 4. Qualification score
Score each 0–2:
- Repetition: none / moderate / high
- Volume: low / useful / high
- Business impact: unclear / meaningful / critical
- Process clarity: chaotic / partly defined / defined
- Integration readiness: blocked / partial / ready
- Decision access: none / indirect / decision maker
- Timeline: someday / quarter / now

10–14 = priority opportunity.  
7–9 = nurture or narrower pilot.  
0–6 = do not force the sale.

Score is an internal aid, not a prospect-facing certainty.

## 5. Commercial structure
Do not promise recovery percentages, breakeven dates or business outcomes.

### Standard bounded Healthcare Pilot — OWNER APPROVED
- **₹39,000 implementation/setup**
- **₹9,000/month managed optimization/support** after included stabilization
- implementation collection: **50% / 30% / 20%**
- third-party/API/message/call/vendor usage: client-paid or separately itemized
- standard included stabilization: 14 days after acceptance unless SOW changes it

Use only when scope materially matches the approved bounded Healthcare Pilot.

### Expanded Healthcare / other verticals
Scope and quote after audit. Do not force old generic Starter/Growth/Enterprise tiers into a proposal. Additional branches, channels, voice, multiple CRMs, migrations, governance or materially higher support requirements trigger a custom scope/quote.

Internal commercial floors/margin rules live in internal commercial controls. Never expose them in a client-facing proposal.

Final scope, timeline, price, third-party costs and support obligations belong in signed/accepted SOW.

## 6. Proposal structure
1. Client-confirmed current workflow
2. Confirmed bottlenecks/handoffs
3. Proposed future workflow
4. Included channels/integrations
5. Human escalation rules
6. Data handled/excluded
7. Deliverables
8. Acceptance/UAT criteria
9. Client responsibilities
10. Implementation plan/dependencies
11. Commercial terms
12. Third-party costs
13. Support/change-control policy
14. Security/data-processing assumptions
15. Measurement plan
16. Next step

Use `PROPOSAL_SOW_TEMPLATE.md` and pass its pre-send scrub gate. No bracketed placeholders, example assumptions or internal commercial notes may remain in the client export.

## 7. Acceptance criteria examples
Use testable delivery criteria, not vague promises:
- test inquiry reaches workflow;
- required intake fields collected;
- approved intent routes correctly;
- booking/request creates expected record;
- configured follow-up triggers under agreed conditions;
- escalation condition creates human handoff;
- integration failure creates safe fallback/visible error;
- reporting/write-back event logged;
- client completes agreed UAT scenarios.

Acceptance is about contracted delivery, not guaranteed revenue or customer behaviour.

## 8. Objection handling
### “We already have WhatsApp.”
The offer is not WhatsApp itself. It is the operating path behind it: intake, routing/booking, approved follow-up, system updates and escalation.

### “AI makes mistakes.”
Correct. Define approved content, deterministic rules where appropriate, confidence limits and human escalation rather than pretending every request should be automated.

### “Can you guarantee revenue?”
No. Shalcon commits to agreed deliverables/acceptance criteria. Business outcomes are measured after launch, not guaranteed.

### “Why not just use ChatGPT?”
A model is one component. Production operation also needs data rules, integrations, permissions, routing, logging, fallbacks, monitoring and ownership.

### “This looks expensive.”
Compare scoped cost against the verified operational workflow. If economics do not justify it after audit, do not automate yet.

## 9. CRM / pipeline
Current source of truth: Google Sheet **Shalcon Intelligence — Sales Pipeline**.

Current 31 Aug state:
- 16 active Healthcare prospects;
- 15 `Draft Ready`;
- 1 `Research Ready`;
- 0 sent;
- 0 replied;
- 0 discovery.

Controlled Batch 01 is owner-authorized for these five prospects:
1. Dr. Riyaz Quereshi — Tru Smile
2. Niteen Tulpule — Sirona Diagnostics
3. Dr. Chandraprabha Kumar — Neevwellbeing’s The Dental Clinic
4. Dr. Anand Shroff — Shroff Eye Hospital
5. Dr. Vinit Shah — Vinit Eye Clinic

Authorization is not contact evidence. Their rows remain `Draft Ready` until actual messages leave an approved authenticated channel.

Conceptual stages:
1. Target identified
2. Researched
3. Research Ready
4. Draft Ready
5. Contacted
6. Replied
7. Qualified
8. Audit booked
9. Audit completed
10. Proposal sent
11. Negotiation
12. Won / onboarding
13. Lost — reason captured
14. Nurture
15. Do not contact

Actual Sheet status changes only after real events. A prepared or approved draft is not `Contacted`.

## 10. Outbound rules
Default: targeted business email and LinkedIn/manual outreach.

Before any external send:
- reverify public observation/contact route;
- check do-not-contact/opt-out state;
- use current Google Sheet as send manifest;
- use an owner-approved Shalcon business sender/profile;
- verify the exact prospect is inside an authorized controlled batch.

For Controlled Batch 01, owner authorization is complete. Do not ask for it again.

Approved Shalcon email sender: **`shalconintelligence@gmail.com`**. The current ChatGPT Gmail connector is authenticated to a different account, so do not send Shalcon prospect email from that connector. Current tools also do not expose an authenticated LinkedIn messaging session, so LinkedIn sends must not be marked complete until a real message leaves the approved profile.

Do not use patient-booking WhatsApp numbers for unsolicited first touch. WhatsApp follow-up/outreach requires an appropriate permission/policy basis for the specific communication.

Message structure:
- one public observation;
- one possible friction framed as a hypothesis;
- one concrete workflow idea;
- low-friction CTA.

No buzzword dump, fake personalization, unsupported ROI or artificial urgency.

## 11. Follow-up cadence
Only after a real first touch and absent suppression:
- Day 3: useful workflow observation;
- Day 7: concise check-in;
- Day 14: relevant synthetic demo/architecture asset;
- Day 30: close loop.

Stop on opt-out/rejection. Record it.

## 12. Reply triage
On a real response:
- **positive / curious** → mark `Replied`, capture exact stated interest, propose a short workflow-audit call;
- **asks what Shalcon does** → answer with one relevant workflow, not the full service catalogue;
- **asks price immediately** → state the bounded Healthcare baseline only if scope seems materially compatible, otherwise say pricing follows the workflow audit;
- **already solved / not interested** → record reason and stop unless they explicitly invite future follow-up;
- **wrong person** → ask once for the appropriate operations/business contact if natural; do not pressure;
- **unsubscribe / stop** → mark `Do Not Contact` immediately;
- **clinical/patient query** → do not engage as sales lead; redirect to their own clinical/support process if needed.

Do not invent urgency or convert a neutral reply into a qualified opportunity.

## 13. Sales KPIs
Track raw counts first:
- researched accounts;
- draft-ready accounts;
- first contacts sent;
- delivered/bounced where known;
- replies / positive replies;
- audits booked/attended;
- qualified opportunities;
- proposals;
- wins/losses;
- loss reasons;
- opt-outs.

Do not market these as conversion proof before meaningful real volume exists.

## 14. First-client proof rule
Before the first real client result, sell capability + process + synthetic proof honestly. After a pilot, record baseline, timeframe/sample, measured outcome and client permission before publishing any identifiable case-study/result claim.
