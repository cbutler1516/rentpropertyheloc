-- Deal Analyzer — SMS/call consent capture (preview gate v6)

alter table public.deal_analyzer_leads
  add column if not exists sms_call_consent boolean not null default false,
  add column if not exists consent_text text,
  add column if not exists consent_timestamp timestamptz,
  add column if not exists consent_ip text,
  add column if not exists consent_user_agent text;
