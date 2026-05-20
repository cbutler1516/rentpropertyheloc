-- Deal Analyzer v7 — agent partner system

create table if not exists public.deal_analyzer_agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  slug text not null unique,
  referral_code text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deal_analyzer_agents_slug_idx
  on public.deal_analyzer_agents (slug);

create index if not exists deal_analyzer_agents_referral_code_idx
  on public.deal_analyzer_agents (referral_code);

alter table public.deal_analyzer_leads
  add column if not exists agent_id uuid references public.deal_analyzer_agents (id) on delete set null,
  add column if not exists referral_code text;

alter table public.deal_analyzer_reports
  add column if not exists agent_id uuid references public.deal_analyzer_agents (id) on delete set null,
  add column if not exists referral_code text;

create index if not exists deal_analyzer_leads_agent_id_idx
  on public.deal_analyzer_leads (agent_id);

create index if not exists deal_analyzer_reports_agent_id_idx
  on public.deal_analyzer_reports (agent_id);

alter table public.deal_analyzer_agents enable row level security;

create policy "public_select_agents_by_slug"
  on public.deal_analyzer_agents for select
  to anon, authenticated
  using (true);
