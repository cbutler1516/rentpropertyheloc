alter table public.content_engine_packages
  add column if not exists compliance_json jsonb;
