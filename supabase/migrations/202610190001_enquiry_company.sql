alter table public.enquiries
  add column if not exists company text
  check (company is null or char_length(company) <= 160);

grant insert (full_name, email, phone, company, service, message)
on public.enquiries to anon, authenticated;
