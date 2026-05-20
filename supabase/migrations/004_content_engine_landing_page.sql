alter table public.content_engine_packages
  add column if not exists landing_page_json jsonb;
