create table if not exists public.content_engine_published_pages (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null unique references public.content_engine_packages (id) on delete cascade,
  slug text not null unique,
  package_title text not null,
  landing_page_json jsonb not null,
  lead_capture_json jsonb,
  crm_integration_json jsonb,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unpublished_at timestamptz
);

create index if not exists content_engine_published_pages_slug_live_idx
  on public.content_engine_published_pages (slug)
  where is_published = true;

create table if not exists public.content_engine_campaign_leads (
  id uuid primary key default gen_random_uuid(),
  published_page_id uuid not null references public.content_engine_published_pages (id) on delete cascade,
  package_id uuid not null references public.content_engine_packages (id) on delete cascade,
  campaign_slug text not null,
  lead_json jsonb not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  crm_push_status text,
  crm_push_message text,
  created_at timestamptz not null default now()
);

create index if not exists content_engine_campaign_leads_package_id_idx
  on public.content_engine_campaign_leads (package_id);

create index if not exists content_engine_campaign_leads_slug_idx
  on public.content_engine_campaign_leads (campaign_slug);
