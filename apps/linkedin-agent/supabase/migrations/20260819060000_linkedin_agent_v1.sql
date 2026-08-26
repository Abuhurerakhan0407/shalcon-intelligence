create extension if not exists pgcrypto;
create schema if not exists private;

do $$ begin
  create type public.lead_status as enum ('discovered','researching','qualified','approval','connected','conversation','meeting','proposal','won','lost');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.approval_status as enum ('pending','approved','rejected','completed');
exception when duplicate_object then null; end $$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  org_id uuid not null references public.organizations(id) on delete cascade,
  full_name text,
  role text not null default 'member',
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  domain text,
  industry text,
  size_band text,
  city text,
  linkedin_url text,
  website_summary text,
  created_at timestamptz not null default now(),
  unique(org_id, domain)
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  full_name text not null,
  title text,
  linkedin_url text,
  email text,
  city text,
  source text not null default 'manual',
  status public.lead_status not null default 'discovered',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_scores (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  score smallint not null check (score between 0 and 100),
  icp_fit smallint not null default 0 check (icp_fit between 0 and 30),
  problem_fit smallint not null default 0 check (problem_fit between 0 and 30),
  buying_signal smallint not null default 0 check (buying_signal between 0 and 20),
  engagement smallint not null default 0 check (engagement between 0 and 10),
  data_quality smallint not null default 0 check (data_quality between 0 and 10),
  recommended_offer text,
  rationale text,
  opener text,
  next_action text,
  model text,
  created_at timestamptz not null default now(),
  unique(org_id, lead_id)
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  offer text,
  goal text,
  status text not null default 'draft' check (status in ('draft','running','paused','completed')),
  rules jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.campaign_leads (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  stage text not null default 'queued',
  created_at timestamptz not null default now(),
  unique(campaign_id, lead_id)
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete cascade,
  action_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status public.approval_status not null default 'pending',
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete cascade,
  actor text not null default 'agent',
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.content_posts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  pillar text,
  hook text,
  body text not null,
  cta text,
  status text not null default 'idea' check (status in ('idea','draft','approval','ready','published')),
  scheduled_for timestamptz,
  published_at timestamptz,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  run_type text not null,
  status text not null default 'queued' check (status in ('queued','running','waiting_approval','completed','failed')),
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  error text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function private.current_org_id()
returns uuid language sql stable security definer set search_path = ''
as $$ select p.org_id from public.profiles p where p.id = auth.uid() $$;

revoke all on function private.current_org_id() from public;
grant usage on schema private to authenticated;
grant execute on function private.current_org_id() to authenticated;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.leads enable row level security;
alter table public.lead_scores enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_leads enable row level security;
alter table public.approvals enable row level security;
alter table public.activities enable row level security;
alter table public.content_posts enable row level security;
alter table public.agent_runs enable row level security;

create policy "profiles_select_self" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles_update_self" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "organizations_select_org" on public.organizations for select to authenticated using (id = private.current_org_id());
create policy "companies_org_all" on public.companies for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());
create policy "leads_org_all" on public.leads for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());
create policy "lead_scores_org_all" on public.lead_scores for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());
create policy "campaigns_org_all" on public.campaigns for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());
create policy "campaign_leads_org_all" on public.campaign_leads for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());
create policy "approvals_org_all" on public.approvals for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());
create policy "activities_org_all" on public.activities for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());
create policy "content_posts_org_all" on public.content_posts for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());
create policy "agent_runs_org_all" on public.agent_runs for all to authenticated using (org_id = private.current_org_id()) with check (org_id = private.current_org_id());

create index if not exists leads_org_status_idx on public.leads(org_id, status);
create index if not exists approvals_org_status_idx on public.approvals(org_id, status);
create index if not exists activities_org_created_idx on public.activities(org_id, created_at desc);
create index if not exists content_org_schedule_idx on public.content_posts(org_id, scheduled_for);
create index if not exists agent_runs_org_status_idx on public.agent_runs(org_id, status);
