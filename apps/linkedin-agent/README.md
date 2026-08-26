# Shalcon LinkedIn Agent — V1

Internal AI SDR and LinkedIn copilot for Shalcon Intelligence.

## V1 modules
- Command Center
- Lead pipeline
- AI lead scoring
- Campaign tracking
- Human approval queue
- Content queue
- Analytics
- Integration and guardrail settings

## Stack
- React + TypeScript + Vite
- Supabase Auth + Postgres + RLS + Edge Functions
- Gemini API free tier for V1 AI calls
- GitHub source control

## Run
```bash
npm install
cp .env.example .env.local
npm run dev
```

Without Supabase keys, app runs in demo mode with local data.

## Supabase setup
1. Create a dedicated Supabase project.
2. Apply `supabase/migrations/20260819060000_linkedin_agent_v1.sql`.
3. Deploy `supabase/functions/analyze-lead` with JWT verification enabled.
4. Add `GEMINI_API_KEY` as an Edge Function secret.
5. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

## Safety boundary
Automatic V1 actions: research inputs, qualification, scoring, drafting, CRM state and analytics.

External LinkedIn actions remain review-driven in V1. Approved LinkedIn APIs can be added later without changing the core data model.
