alter table public.content_engine_packages
  add column if not exists analytics_json jsonb;
