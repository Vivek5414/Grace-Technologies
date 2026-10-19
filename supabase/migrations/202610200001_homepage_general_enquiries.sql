alter table public.enquiries
  alter column email drop not null;

create or replace function public.link_enquiry_contact()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is null or trim(new.email) = '' then
    return new;
  end if;

  insert into public.contacts (full_name, email, phone, source)
  values (new.full_name, new.email, new.phone, new.source)
  on conflict (email_normalized) do update
    set updated_at = public.contacts.updated_at
  returning id into new.contact_id;

  return new;
end;
$$;
