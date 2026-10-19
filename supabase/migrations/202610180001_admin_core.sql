do $$ begin
  create type public.enquiry_status as enum ('new', 'in_progress', 'resolved', 'spam');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.project_status as enum ('draft', 'active', 'published', 'archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.service_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null;
end $$;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text check (phone is null or char_length(phone) <= 40),
  service text not null check (char_length(service) between 2 and 80),
  message text not null check (char_length(trim(message)) between 10 and 5000),
  status public.enquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 2 and 160),
  status public.project_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 2 and 160),
  status public.service_status not null default 'draft',
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_created_at_idx on public.enquiries (status, created_at desc);
create index if not exists projects_status_idx on public.projects (status);
create index if not exists services_status_idx on public.services (status);

alter table public.enquiries enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;

revoke all on public.enquiries from anon, authenticated;
revoke all on public.projects from anon, authenticated;
revoke all on public.services from anon, authenticated;

grant insert (full_name, email, phone, service, message) on public.enquiries to anon, authenticated;
grant select on public.enquiries to authenticated;
grant update (status) on public.enquiries to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.services to authenticated;

create policy "Public can submit new enquiries"
on public.enquiries for insert to anon, authenticated
with check (status = 'new');

create policy "Admins can read enquiries"
on public.enquiries for select to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update enquiry status"
on public.enquiries for update to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can manage projects"
on public.projects for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can manage services"
on public.services for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
