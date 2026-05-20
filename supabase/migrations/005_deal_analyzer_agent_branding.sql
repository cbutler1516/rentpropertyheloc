-- Deal Analyzer v8 — agent co-branding

alter table public.deal_analyzer_agents
  add column if not exists headshot_url text,
  add column if not exists logo_url text,
  add column if not exists bio text,
  add column if not exists brokerage text,
  add column if not exists cta_phone text,
  add column if not exists cta_email text,
  add column if not exists brand_color text;
