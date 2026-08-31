# Shalcon Intelligence — Batch 01 Synthetic Workflow Maps

Status date: 31 Aug 2026  
Status: **PREPARED / SYNTHETIC / NOT CLIENT-VALIDATED**

Purpose: give each already-authorized Batch 01 Healthcare prospect a concise, useful workflow map if they respond positively and ask to see what Shalcon means.

These are **not audits of internal operations**. They are bounded hypotheses based only on current public workflow observations. Every assumption must be validated with the prospect before any proposal, implementation, ROI estimate, or production data handling.

## Global boundaries for all five maps
- automate operational intake, routing, confirmation, eligible follow-up, status visibility and system write-back only;
- diagnosis, treatment, medical interpretation, emergency decisions and other clinical judgment remain human-controlled;
- collect the minimum operational fields needed for the scoped workflow;
- do not collect patient records or sensitive health detail in a public lead/demo flow;
- use client-owned communication/vendor accounts where practical;
- preserve opt-out/stop signals;
- ambiguous, sensitive, urgent or unsupported requests escalate to staff;
- success metrics are agreed during discovery; none below are claimed current results.

---

# 1. Tru Smile Multi Specialty Dental Clinic — Dr. Riyaz Quereshi

## Public observation used
Tru Smile publicly exposes a structured appointment request that captures service/date/time intent and then relies on staff confirmation through phone/WhatsApp-style coordination. Public information also suggests a technology-aware practice, so this map intentionally **does not propose replacing the existing booking layer**.

## Synthetic six-step workflow
1. **Appointment request received**  
   Preserve the existing captured service, preferred date/time, contact details and any non-sensitive routing field already collected.

2. **Operational validation**  
   Check only workflow completeness: required contact field present, requested service category recognized, requested slot/context structurally valid. Do not interpret symptoms or clinical suitability.

3. **Staff queue + context handoff**  
   Create one operational record/ticket containing the original appointment context so staff can confirm without recreating the request from another channel.

4. **Confirmation state**  
   Staff confirms, proposes an alternative, or marks the request for manual clarification. The system records the current state instead of treating every inquiry as a fresh conversation.

5. **Eligible follow-up**  
   If the clinic approves the cadence and the patient has not opted out, send a bounded reminder/follow-up for unresolved confirmation. No medical guidance is generated.

6. **Final operational status**  
   Write back a simple status such as Confirmed / Alternative Offered / Awaiting Patient / Closed / Escalated so the request does not disappear between channels.

## Human escalation
Immediately route to staff when the person asks about diagnosis, treatment suitability, medication, emergency symptoms, pricing exceptions requiring judgment, or any request not covered by approved operational content.

## Minimum fields to validate in discovery
- contact name;
- approved contact route;
- service/consultation category;
- preferred date/time or availability window;
- branch/location if applicable;
- consent/opt-out state;
- operational status;
- assigned staff owner.

## Questions for Dr. Quereshi
- Does the current booking context already persist cleanly after staff takes over?
- Where does staff currently record confirmation state?
- Is no-response follow-up manual, automated, or intentionally absent?
- Which status transitions would actually help the team?
- Which existing system should remain the source of truth?

## Possible pilot measurement — only after baseline agreement
- percentage of appointment requests with a recorded final status;
- time from request to first operational response;
- number of repeated context-collection steps;
- unresolved requests after the agreed follow-up window.

---

# 2. Sirona Diagnostics — Niteen Tulpule

## Public observation used
Sirona publicly offers diagnostic/specialty services with centre, home-visit, callback and WhatsApp-style coordination paths. This suggests a useful routing/state-management hypothesis, **not evidence that the current workflow is inefficient**.

## Synthetic six-step workflow
1. **Inquiry intake**  
   Capture the requested operational category: centre service, home visit, callback or another approved service route, plus location/area and contact details.

2. **Routing classification**  
   Route based on approved service/location rules only. The automation does not interpret reports, diagnose conditions or determine medical necessity.

3. **Operations handoff**  
   Assign the request to the appropriate centre/home-visit/callback queue with the original service + location intent preserved.

4. **Confirmation / clarification**  
   Staff confirms availability or requests missing operational information. Any clinical/preparation question outside approved content escalates to qualified staff.

5. **Follow-up and status continuity**  
   Approved reminders can be sent for unresolved confirmations while the same record retains the original request context and staff owner.

6. **Completion / closure**  
   Record a final operational state such as Scheduled / Callback Completed / Unable to Serve Area / Awaiting Customer / Escalated / Closed.

## Human escalation
Report interpretation, test selection requiring professional judgment, contraindication/preparation uncertainty, urgent medical concerns, or sensitive exceptions go directly to staff.

## Minimum fields to validate
- service/request category;
- centre vs home-visit intent;
- area/location;
- preferred timing;
- contact route;
- consent/opt-out state;
- assigned team/location;
- current status.

## Questions for Niteen
- Which system currently receives centre, callback and home-visit inquiries?
- Are these channels already unified or handled separately?
- Which routing rules are deterministic enough to automate safely?
- What information should never be collected before staff takes over?
- What status would operations actually want visible across channels?

## Possible pilot measurement
- requests routed with complete operational context;
- request-to-assignment time;
- unresolved requests by category;
- repeated/manual data entry between first inquiry and final operations record.

---

# 3. Neevwellbeing’s The Dental Clinic — Dr. Chandraprabha Kumar

## Public observation used
Neevwellbeing publicly operates across Santacruz, Chembur and Mahim with branch-specific booking/contact paths. The hypothesis is a **multi-branch context-preservation layer**, not a claim that branch routing is currently broken.

## Synthetic six-step workflow
1. **New consultation inquiry**  
   Capture preferred branch/location, consultation intent at an approved non-clinical category level, contact information and preferred timing.

2. **Branch routing**  
   Apply explicit clinic-approved branch/service rules. If the request does not clearly fit, escalate rather than guessing.

3. **Branch/staff handoff**  
   Create one operational record carrying the original branch + consultation intent to the assigned branch/team.

4. **Booking coordination**  
   Staff confirms, changes timing/branch, or asks for clarification. The system preserves the latest state and does not make treatment decisions.

5. **Eligible follow-up**  
   If allowed by the clinic’s consent/cadence rules, follow up on unresolved booking state without requesting sensitive medical detail.

6. **Final branch-level status**  
   Record Confirmed / Rescheduled / Awaiting Patient / Wrong Branch / Escalated / Closed and retain the responsible branch/team.

## Human escalation
Clinical questions, treatment recommendations, emergencies, sensitive health history, pricing exceptions or unclear routing go to staff.

## Minimum fields to validate
- preferred branch;
- approved consultation category;
- contact details;
- preferred timing;
- consent/opt-out state;
- assigned branch/team;
- booking status.

## Questions for Dr. Kumar
- Do inquiries routinely start in a central route or directly at each branch?
- Can a patient change branches after the first inquiry, and how is that handled?
- Where is booking status currently visible across branches?
- Which branch/service rules are safe to automate?
- Would a central operational record help or duplicate an existing system?

## Possible pilot measurement
- requests with correct branch ownership;
- branch re-routing frequency;
- time from inquiry to assigned branch/staff;
- requests lacking a final booking status.

---

# 4. Shroff Eye Hospital — Dr. Anand Shroff

## Public observation used
Shroff Eye publicly operates Bandra and Marine Drive appointment paths and routes consultations across different doctors/contexts. This map addresses **operational appointment coordination only**; it does not automate eye-condition triage or clinician selection based on medical judgment.

## Synthetic six-step workflow
1. **Appointment inquiry received**  
   Capture location preference, non-clinical consultation/request category where approved, contact information and timing preference.

2. **Safe operational routing check**  
   Apply only explicit administrative rules supplied by Shroff Eye. If the correct doctor/route depends on symptoms or clinical interpretation, stop automation and hand to staff.

3. **Team handoff with preserved context**  
   Create an operational request containing location + appointment intent + contact state for the correct admin team.

4. **Staff scheduling / clarification**  
   Staff selects the appropriate clinical route where judgment is needed, confirms availability and records the next state.

5. **Approved follow-up**  
   Send only clinic-approved operational reminders/confirmation requests. No automated advice about conditions, treatment or urgency.

6. **Final status/write-back**  
   Record Confirmed / Alternative Offered / Awaiting Staff / Awaiting Patient / Clinical Routing Required / Closed.

## Human escalation
Any symptom-based routing, emergency/urgent concern, treatment question, medical report/image interpretation or uncertain clinician selection remains entirely staff/clinician controlled.

## Minimum fields to validate
- location preference;
- approved appointment category;
- contact route;
- timing preference;
- consent/opt-out state;
- administrative owner;
- status;
- explicit flag for clinical-routing-required.

## Questions for Dr. Shroff
- Which routing decisions are purely administrative versus clinically dependent?
- Does one team see appointment state across both centres?
- What does an unresolved inquiry look like operationally today?
- What status transitions would reduce coordination work without adding another patient-facing system?
- Which current system should receive the final record?

## Possible pilot measurement
- inquiries requiring manual clinical routing versus deterministic admin routing;
- time to administrative assignment;
- appointment requests with a visible final status;
- repeated context handoffs between channels/centres.

---

# 5. Vinit Eye Clinic — Dr. Vinit Shah

## Public observation used
Vinit Eye Clinic publicly supports Borivali and Mulund consultation/appointment coordination through online/WhatsApp-style routes. The hypothesis is to preserve **location + consultation intent through booking and follow-up**, not to automate ophthalmic decisions.

## Synthetic six-step workflow
1. **Consultation request**  
   Capture preferred location, approved appointment category, contact information and timing preference.

2. **Operational completeness check**  
   Validate required administrative fields only. Anything symptom/diagnosis-dependent routes to staff.

3. **Location/team assignment**  
   Assign Borivali, Mulund or manual-review state according to clinic-approved non-clinical rules while retaining original context.

4. **Staff confirmation**  
   Staff confirms appointment/alternative timing or escalates for clinician input. Status remains attached to the same request.

5. **Eligible reminder/follow-up**  
   Send approved operational follow-up for unresolved booking state while respecting opt-out and avoiding medical content.

6. **Final status**  
   Record Confirmed / Rescheduled / Awaiting Patient / Clinical Review Needed / Escalated / Closed in the agreed system.

## Human escalation
Diagnosis, treatment, urgency, procedure suitability, report interpretation or symptom-driven location/doctor decisions remain with the clinic team.

## Minimum fields to validate
- Borivali/Mulund/location preference;
- approved consultation category;
- contact route;
- preferred timing;
- consent/opt-out state;
- staff owner;
- operational status.

## Questions for Dr. Shah
- Are Borivali and Mulund requests currently managed in one view or separately?
- What administrative information is genuinely necessary before staff takes over?
- Which follow-up steps are repetitive enough to automate?
- Where should final booking status be written back?
- Which requests should bypass automation immediately?

## Possible pilot measurement
- location-routing accuracy against staff-confirmed destination;
- request-to-confirmation time;
- unresolved requests after the agreed follow-up window;
- repeated data collection across online/WhatsApp/staff handoffs.

---

# How to use these maps

## If prospect says “send it”
Send only that prospect’s map, not all five. Introduce it as a **synthetic hypothesis based on the public flow**, and explicitly ask them to correct anything that does not match reality.

Suggested framing:

> I mapped this only from the public booking/contact path, so I’m treating it as a hypothesis rather than assuming how your internal process works. The useful part is seeing which handoffs are deterministic enough to automate and which should stay with staff.

## If prospect wants a call
Use the map as the starting point for discovery. Do not pre-fill pain, volume, ROI, conversion, staff-time or system limitations. Validate current state first.

## If prospect says the workflow is already handled well
Accept that signal. Ask what—if anything—still requires repetitive manual coordination. If nothing meaningful remains, do not force a pilot.

## Evidence rule
These maps are capability/proposal-preparation assets, not proof of prospect pain, client deployment or results. Only prospect-confirmed facts may move into an audit/proposal, and only measured + client-validated + permission-backed outcomes may become case-study proof.