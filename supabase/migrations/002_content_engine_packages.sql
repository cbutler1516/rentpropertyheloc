-- Content Engine saved packages
create table if not exists public.content_engine_packages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  source_input text not null,
  audience text not null default 'general',
  tone text not null default 'strategic',
  topic text not null default 'Mortgage strategy',
  model_used text not null default 'demo',
  outputs_json jsonb not null,
  tags text[] not null default '{}'
);

create index if not exists content_engine_packages_created_at_idx
  on public.content_engine_packages (created_at desc);

create index if not exists content_engine_packages_audience_idx
  on public.content_engine_packages (audience);

create index if not exists content_engine_packages_topic_idx
  on public.content_engine_packages (topic);

alter table public.content_engine_packages enable row level security;

-- Server routes use the service role key; allow anon read/write for direct client use if needed later.
create policy "content_engine_packages_select_anon"
  on public.content_engine_packages for select
  to anon, authenticated
  using (true);

create policy "content_engine_packages_insert_anon"
  on public.content_engine_packages for insert
  to anon, authenticated
  with check (true);

create policy "content_engine_packages_update_anon"
  on public.content_engine_packages for update
  to anon, authenticated
  using (true);

create policy "content_engine_packages_delete_anon"
  on public.content_engine_packages for delete
  to anon, authenticated
  using (true);
