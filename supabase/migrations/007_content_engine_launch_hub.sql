alter table public.content_engine_packages
  add column if not exists launch_hub_json jsonb;
