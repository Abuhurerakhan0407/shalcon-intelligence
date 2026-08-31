# Shalcon Intelligence — Google Connector Identity Map

Status date: 31 Aug 2026  
Purpose: prevent future agents from assuming all connected Google tools use the same Google account.

## Verified connector identities

| Connector | Current authenticated identity | Operational meaning |
|---|---|---|
| Gmail | `iafakhan9999@gmail.com` | **NOT AUTHORIZED** for Shalcon prospect outreach. Do not send Shalcon prospect email from this connector identity. |
| Google Calendar | `shalconintelligence@gmail.com` — Shalcon Intelligence | Correct Shalcon business Google account for Calendar/discovery operations. |
| Google Drive | `iamabuhurerakhan@gmail.com` — Abu hurera Khan | Owner-controlled personal Drive workspace currently holding the Shalcon sales pipeline and finance ledger. Usable for internal operations; do not mislabel it as the Shalcon business Google account. |

## Owner-confirmed Shalcon sender
`shalconintelligence@gmail.com`

Owner confirms direct access/control of this mailbox. Mailbox ownership/access is **not** a blocker.

## Gmail execution rule
The current Gmail action sends only from its authenticated Gmail identity and exposes no `From`/send-as override. Therefore:
- do not use the current Gmail connector for Shalcon prospect outreach;
- Batch 01 Gmail fallback execution requires Gmail connector re-authentication to `shalconintelligence@gmail.com` or a separately owner-approved Shalcon-controlled sender;
- do not ask the owner to re-prove ownership/access to `shalconintelligence@gmail.com`;
- do not mark any prospect `Sent` until a real message leaves an approved authenticated channel.

## Calendar rule
The Calendar connector independently verifies that the Shalcon business Google account is connected in ChatGPT. Use it for Shalcon Calendar reads/actions when the user requests them or when they are necessary to an approved workflow.

The saved public discovery booking URL still requires visitor-context validation before it is inserted into a live prospect reply if that validation has not already been completed in the current execution environment.

## Drive rule
Current Shalcon operational Sheets may remain in the owner-controlled Drive account unless Abu explicitly asks to migrate them. Do not move/copy/delete the live pipeline or finance ledger merely to make connector identities uniform.

Current live Drive assets:
- `Shalcon Intelligence — Sales Pipeline`
- `Shalcon Intelligence — Invoice & Payment Ledger`

The location/account distinction is an administrative fact, not a sales or launch blocker.

## Safety
- no passwords, OTPs, OAuth tokens, PAN/Aadhaar/bank data or provider secrets belong in this file;
- do not infer that two Google connectors share identity because both are connected in ChatGPT;
- verify the connector profile before any sender-sensitive or account-sensitive action.