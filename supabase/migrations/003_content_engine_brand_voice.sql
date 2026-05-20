alter table public.content_engine_packages
  add column if not exists brand_voice_id text not null default 'chris-butler-loan-playbook',
  add column if not exists generation_mode text not null default 'single';

create index if not exists content_engine_packages_brand_voice_idx
  on public.content_engine_packages (brand_voice_id);

create index if not exists content_engine_packages_generation_mode_idx
  on public.content_engine_packages (generation_mode);
