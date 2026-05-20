-- Deal Analyzer v6 — follow-up workflow

alter table public.deal_analyzer_leads
  add column if not exists lead_status text not null default 'New',
  add column if not exists last_contacted_at timestamptz,
  add column if not exists next_follow_up_at timestamptz;

create table if not exists public.deal_analyzer_followups (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.deal_analyzer_reports (id) on delete cascade,
  lead_id uuid not null references public.deal_analyzer_leads (id) on delete cascade,
  scenario_id uuid not null references public.deal_analyzer_scenarios (id) on delete cascade,
  text_message text,
  email_subject text,
  email_body text,
  agent_partner_message text,
  call_notes jsonb not null default '[]'::jsonb,
  priority_reason text,
  recommended_timing text,
  status text not null default 'draft',
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deal_analyzer_followups_report_id_idx
  on public.deal_analyzer_followups (report_id);

create index if not exists deal_analyzer_followups_lead_id_idx
  on public.deal_analyzer_followups (lead_id);

create unique index if not exists deal_analyzer_followups_report_id_unique_idx
  on public.deal_analyzer_followups (report_id);

alter table public.deal_analyzer_followups enable row level security;

create policy "service_role_all_followups"
  on public.deal_analyzer_followups
  for all
  to service_role
  using (true)
  with check (true);
