-- Deal Analyzer v2 — run in Supabase SQL editor or via CLI

create extension if not exists "pgcrypto";

-- Leads
create table if not exists public.deal_analyzer_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  role text not null,
  notes text,
  referral_source text,
  agent_name text
);

-- Scenarios (form inputs + calculated output)
create table if not exists public.deal_analyzer_scenarios (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null references public.deal_analyzer_leads (id) on delete cascade,
  deal_type text not null,
  inputs_json jsonb not null,
  analysis_json jsonb not null
);

create index if not exists deal_analyzer_scenarios_lead_id_idx
  on public.deal_analyzer_scenarios (lead_id);

-- Shareable reports
create table if not exists public.deal_analyzer_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null references public.deal_analyzer_leads (id) on delete cascade,
  scenario_id uuid not null references public.deal_analyzer_scenarios (id) on delete cascade,
  report_slug text not null unique,
  narrative_json jsonb,
  referral_source text,
  agent_name text
);

create index if not exists deal_analyzer_reports_slug_idx
  on public.deal_analyzer_reports (report_slug);

-- RLS
alter table public.deal_analyzer_leads enable row level security;
alter table public.deal_analyzer_scenarios enable row level security;
alter table public.deal_analyzer_reports enable row level security;

-- Anonymous inserts for lead capture (tighten in production if needed)
create policy "anon_insert_leads"
  on public.deal_analyzer_leads for insert
  to anon, authenticated
  with check (true);

create policy "anon_insert_scenarios"
  on public.deal_analyzer_scenarios for insert
  to anon, authenticated
  with check (true);

create policy "anon_insert_reports"
  on public.deal_analyzer_reports for insert
  to anon, authenticated
  with check (true);

-- Public read of reports by slug (share links)
create policy "anon_select_reports"
  on public.deal_analyzer_reports for select
  to anon, authenticated
  using (true);

create policy "anon_select_scenarios_for_reports"
  on public.deal_analyzer_scenarios for select
  to anon, authenticated
  using (true);

create policy "anon_select_leads_for_reports"
  on public.deal_analyzer_leads for select
  to anon, authenticated
  using (true);
