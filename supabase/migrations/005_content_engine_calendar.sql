alter table public.content_engine_packages
  add column if not exists calendar_json jsonb;
