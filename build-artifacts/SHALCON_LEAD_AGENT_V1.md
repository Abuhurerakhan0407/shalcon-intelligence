# Shalcon Lead Agent V1

Isolated build snapshot for Shalcon Intelligence.

Current modules: Command Center, Leads, Research, Scoring, Campaigns, Approval Queue, Message Copilot, CRM, Content Agent, Analytics, Integrations.

Safety boundary: no unauthorized LinkedIn scraping, automated connection requests, or automated DMs. Outbound LinkedIn actions remain human-approved unless approved API access exists.

Live backend: dedicated Supabase project with tenant RLS, same-organization FK enforcement, audit logs, agent runs, approvals, content and CRM tables.

The `.tar.gz` beside this file is a source snapshot only; secrets and `.env.local` are excluded from intended publication workflow.