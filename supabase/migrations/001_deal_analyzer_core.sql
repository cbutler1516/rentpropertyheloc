-- The Loan Playbook — Deal Analyzer core schema
-- Run in Supabase SQL editor or via CLI: supabase db push

create extension if not exists "pgcrypto";

create table if not exists public.deal_analyzer_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  role text,
  notes text,
  sms_call_consent boolean not null default false,
  consent_text text not null,
  consent_timestamp timestamptz not null default now(),
  consent_ip text,
  consent_user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  session_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.deal_analyzer_scenarios (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.deal_analyzer_leads (id) on delete cascade,
  deal_type text not null,
  inputs_json jsonb not null default '{}'::jsonb,
  analysis_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.deal_analyzer_reports (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.deal_analyzer_leads (id) on delete cascade,
  scenario_id uuid not null references public.deal_analyzer_scenarios (id) on delete cascade,
  report_slug text unique not null,
  narrative_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists deal_analyzer_leads_email_idx on public.deal_analyzer_leads (email);
create index if not exists deal_analyzer_leads_created_at_idx on public.deal_analyzer_leads (created_at desc);
create index if not exists deal_analyzer_scenarios_lead_id_idx on public.deal_analyzer_scenarios (lead_id);
create index if not exists deal_analyzer_reports_slug_idx on public.deal_analyzer_reports (report_slug);
create index if not exists deal_analyzer_reports_lead_id_idx on public.deal_analyzer_reports (lead_id);

comment on table public.deal_analyzer_leads is 'Deal Analyzer lead captures with TCPA consent';
comment on table public.deal_analyzer_scenarios is 'Saved deal inputs and calculator output';
comment on table public.deal_analyzer_reports is 'Shareable Playbook Reports';
