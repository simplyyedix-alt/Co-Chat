create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  provider text not null,
  storage_key text not null unique,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  encrypted boolean not null default true,
  status text not null default 'ready' check (status in ('pending', 'ready', 'deleted', 'failed')),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists files_owner_created_idx on public.files (owner_id, created_at desc);
create index if not exists files_status_created_idx on public.files (status, created_at);

alter table public.files enable row level security;

drop policy if exists files_owner_read on public.files;
create policy files_owner_read on public.files for select to authenticated
  using (owner_id = auth.uid());

drop policy if exists files_owner_insert on public.files;
create policy files_owner_insert on public.files for insert to authenticated
  with check (owner_id = auth.uid());

drop policy if exists files_owner_delete on public.files;
create policy files_owner_delete on public.files for update to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());
