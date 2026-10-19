create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 3 and 254),
  email_normalized text generated always as (lower(trim(email))) stored unique,
  phone text check (phone is null or char_length(phone) <= 40),
  company text check (company is null or char_length(company) <= 160),
  source text not null default 'Website' check (char_length(trim(source)) between 1 and 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.enquiries
  add column if not exists source text
    check (source is null or char_length(trim(source)) between 1 and 80),
  add column if not exists contact_id uuid references public.contacts(id) on delete set null,
  add column if not exists follow_up_at timestamptz;

update public.enquiries set source = 'Not recorded' where source is null;
alter table public.enquiries
  alter column source set default 'Website',
  alter column source set not null;

insert into public.contacts (full_name, email, phone, source, created_at, updated_at)
select latest.full_name, latest.email, latest.phone, 'Not recorded', first_seen.created_at, first_seen.created_at
from (
  select distinct on (lower(trim(email)))
    full_name, email, phone
  from public.enquiries
  where trim(email) <> ''
  order by lower(trim(email)), created_at desc, id
) as latest
join (
  select lower(trim(email)) as normalized_email, min(created_at) as created_at
  from public.enquiries
  where trim(email) <> ''
  group by lower(trim(email))
) as first_seen on first_seen.normalized_email = lower(trim(latest.email))
on conflict (email_normalized) do nothing;

update public.enquiries as enquiry
set contact_id = contact.id
from public.contacts as contact
where enquiry.contact_id is null
  and lower(trim(enquiry.email)) = contact.email_normalized;

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_source_created_at_idx on public.contacts (source, created_at desc);
create index if not exists contacts_name_search_idx on public.contacts using gin (to_tsvector('simple', full_name));
create index if not exists enquiries_contact_created_at_idx on public.enquiries (contact_id, created_at desc);
create index if not exists enquiries_follow_up_at_idx on public.enquiries (follow_up_at) where follow_up_at is not null;
create index if not exists enquiries_email_search_idx on public.enquiries (lower(email));
create index if not exists enquiries_phone_search_idx on public.enquiries (phone);

create table if not exists public.enquiry_follow_up_notes (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  note text not null check (char_length(trim(note)) between 1 and 4000),
  admin_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists enquiry_follow_up_notes_enquiry_created_idx
  on public.enquiry_follow_up_notes (enquiry_id, created_at desc);
create index if not exists enquiry_follow_up_notes_contact_created_idx
  on public.enquiry_follow_up_notes (contact_id, created_at desc);

create table if not exists public.enquiry_status_history (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  old_status text not null,
  new_status text not null,
  admin_id uuid references auth.users(id) on delete set null,
  changed_at timestamptz not null default now()
);

create index if not exists enquiry_status_history_enquiry_changed_idx
  on public.enquiry_status_history (enquiry_id, changed_at desc);

create or replace function public.touch_contact_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contacts_touch_updated_at on public.contacts;
create trigger contacts_touch_updated_at
before update on public.contacts
for each row execute function public.touch_contact_updated_at();

create or replace function public.link_enquiry_contact()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.contacts (full_name, email, phone, source)
  values (new.full_name, new.email, new.phone, new.source)
  on conflict (email_normalized) do update
    set updated_at = public.contacts.updated_at
  returning id into new.contact_id;

  return new;
end;
$$;

drop trigger if exists enquiries_link_contact on public.enquiries;
create trigger enquiries_link_contact
before insert on public.enquiries
for each row execute function public.link_enquiry_contact();

create or replace function public.record_enquiry_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status is distinct from new.status then
    insert into public.enquiry_status_history (enquiry_id, old_status, new_status, admin_id)
    values (new.id, old.status::text, new.status::text, auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists enquiries_record_status_change on public.enquiries;
create trigger enquiries_record_status_change
after update of status on public.enquiries
for each row execute function public.record_enquiry_status_change();

create or replace function public.set_follow_up_note_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.admin_id = auth.uid();
  return new;
end;
$$;

drop trigger if exists enquiry_follow_up_notes_set_admin on public.enquiry_follow_up_notes;
create trigger enquiry_follow_up_notes_set_admin
before insert on public.enquiry_follow_up_notes
for each row execute function public.set_follow_up_note_admin();

alter table public.contacts enable row level security;
alter table public.enquiry_follow_up_notes enable row level security;
alter table public.enquiry_status_history enable row level security;

revoke all on public.contacts, public.enquiry_follow_up_notes, public.enquiry_status_history from anon, authenticated;
grant select, insert, update, delete on public.contacts to authenticated;
grant select on public.enquiry_follow_up_notes to authenticated;
grant insert (enquiry_id, contact_id, note) on public.enquiry_follow_up_notes to authenticated;
grant select on public.enquiry_status_history to authenticated;
grant update (status, follow_up_at) on public.enquiries to authenticated;

create policy "Admins can manage contacts"
on public.contacts for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can manage enquiry follow-up notes"
on public.enquiry_follow_up_notes for all to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can read enquiry status history"
on public.enquiry_status_history for select to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
