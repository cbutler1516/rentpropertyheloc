alter table public.content_engine_packages
  add column if not exists crm_integration_json jsonb;

create table if not exists public.content_engine_crm_credentials (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.content_engine_packages (id) on delete cascade,
  provider text not null,
  credentials_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (package_id, provider)
);

create index if not exists content_engine_crm_credentials_package_id_idx
  on public.content_engine_crm_credentials (package_id);
