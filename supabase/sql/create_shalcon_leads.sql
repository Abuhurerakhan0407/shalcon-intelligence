-- Shalcon Intelligence dedicated lead-store schema.
-- Implementation SQL, intentionally not named as a migration until a dedicated
-- Supabase project exists and `supabase migration new` can generate the migration.

begin;

create table if not exists public.shalcon_leads (
  lead_id uuid primary key,
  schema_version smallint not null check (schema_version = 2),
  source text not null check (char_length(source) between 1 and 80),
  created_at timestamptz not null,
  received_at timestamptz not null default now(),
  contact_consent boolean not null check (contact_consent = true),
  contact_consent_at timestamptz not null,
  contact_consent_version text not null check (char_length(contact_consent_version) between 1 and 80),
  name text not null check (char_length(name) between 1 and 100),
  whatsapp text not null check (whatsapp ~ '^[0-9]{7,15}$'),
  company text not null default '' check (char_length(company) <= 120),
  industry text not null default '' check (char_length(industry) <= 80),
  package_name text not null default '' check (char_length(package_name) <= 80),
  currency text not null default '' check (currency in ('', 'INR', 'USD')),
  inquiries numeric check (inquiries is null or (inquiries >= 0 and inquiries <= 100000)),
  miss_percent numeric check (miss_percent is null or (miss_percent >= 0 and miss_percent <= 100)),
  conversion_rate numeric check (conversion_rate is null or (conversion_rate >= 0 and conversion_rate <= 100)),
  avg_txn numeric check (avg_txn is null or (avg_txn >= 0 and avg_txn <= 1000000000)),
  estimated_daily_opportunity_at_risk numeric check (estimated_daily_opportunity_at_risk is null or estimated_daily_opportunity_at_risk >= 0),
  estimated_monthly_opportunity_at_risk numeric check (estimated_monthly_opportunity_at_risk is null or estimated_monthly_opportunity_at_risk >= 0),
  estimated_yearly_opportunity_at_risk numeric check (estimated_yearly_opportunity_at_risk is null or estimated_yearly_opportunity_at_risk >= 0),
  page text not null default '' check (char_length(page) <= 300),
  referrer text not null default '' check (char_length(referrer) <= 300),
  utm_source text not null default '' check (char_length(utm_source) <= 100),
  utm_medium text not null default '' check (char_length(utm_medium) <= 100),
  utm_campaign text not null default '' check (char_length(utm_campaign) <= 120),
  stage text not null default 'new' check (stage in ('new', 'contacted', 'replied', 'qualified', 'audit_booked', 'audit_completed', 'proposal_sent', 'negotiation', 'won', 'lost', 'nurture')),
  owner text not null default '' check (char_length(owner) <= 120),
  next_action_at timestamptz,
  last_contact_at timestamptz,
  opted_out_at timestamptz,
  notes text not null default '' check (char_length(notes) <= 4000),
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$')
);

create index if not exists shalcon_leads_created_at_idx
  on public.shalcon_leads (created_at desc);
create index if not exists shalcon_leads_stage_next_action_idx
  on public.shalcon_leads (stage, next_action_at);
create index if not exists shalcon_leads_whatsapp_idx
  on public.shalcon_leads (whatsapp);

alter table public.shalcon_leads enable row level security;

-- The website/browser must never access this table directly. The Edge Function
-- uses a trusted admin client after authenticating the Vercel webhook.
revoke all on table public.shalcon_leads from anon, authenticated;
grant select, insert, update, delete on table public.shalcon_leads to service_role;

comment on table public.shalcon_leads is
  'Internal Shalcon Intelligence lead store. No public browser access. Avoid sensitive clinical, candidate, policy, or other client records.';
comment on column public.shalcon_leads.payload_hash is
  'SHA-256 of immutable inbound lead payload used to validate idempotent replays without overwriting stored consent/contact data.';

commit;
