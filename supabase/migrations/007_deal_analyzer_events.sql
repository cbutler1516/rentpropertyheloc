-- Deal Analyzer v11 — product analytics events + UTM attribution

create table if not exists public.deal_analyzer_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  session_id text,
  lead_id uuid references public.deal_analyzer_leads (id) on delete set null,
  report_id uuid references public.deal_analyzer_reports (id) on delete set null,
  agent_id uuid references public.deal_analyzer_agents (id) on delete set null,
  referral_code text,
  deal_type text,
  page_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists deal_analyzer_events_event_name_idx
  on public.deal_analyzer_events (event_name);

create index if not exists deal_analyzer_events_created_at_idx
  on public.deal_analyzer_events (created_at desc);

create index if not exists deal_analyzer_events_session_id_idx
  on public.deal_analyzer_events (session_id)
  where session_id is not null;

create index if not exists deal_analyzer_events_report_id_idx
  on public.deal_analyzer_events (report_id)
  where report_id is not null;

alter table public.deal_analyzer_leads
  add column if not exists session_id text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text;

alter table public.deal_analyzer_reports
  add column if not exists session_id text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text;

alter table public.deal_analyzer_events enable row level security;

-- Events are written only via service role (API routes). No public policies.
