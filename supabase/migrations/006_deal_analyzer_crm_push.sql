-- Deal Analyzer v9 — CRM push tracking on reports

alter table public.deal_analyzer_reports
  add column if not exists crm_push_status text not null default 'not_pushed',
  add column if not exists crm_last_pushed_at timestamptz,
  add column if not exists crm_push_error text,
  add column if not exists crm_external_id text;

create index if not exists deal_analyzer_reports_crm_push_status_idx
  on public.deal_analyzer_reports (crm_push_status);
