-- Run once in Supabase Dashboard > SQL Editor.
-- Gallery images are publicly viewable; only signed-in admins can manage them.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery-photos', 'gallery-photos', true, 31457280, array['image/jpeg'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.gallery_photos (
  id uuid primary key,
  storage_path text not null unique,
  url text not null,
  title text not null,
  collection text not null,
  category text not null,
  album text not null default '',
  is_favorite boolean not null default false,
  date_label text not null,
  created_at timestamptz not null default now()
);

-- Explicit grants are needed on newer Supabase projects where new public
-- tables are not automatically exposed through the Data API.
grant select on public.gallery_photos to anon;
grant select, insert, update, delete on public.gallery_photos to authenticated;

alter table public.gallery_photos enable row level security;

drop policy if exists "Gallery photos are publicly readable" on public.gallery_photos;
create policy "Gallery photos are publicly readable"
  on public.gallery_photos for select to anon, authenticated using (true);

drop policy if exists "Admins manage gallery photo records" on public.gallery_photos;
create policy "Admins manage gallery photo records"
  on public.gallery_photos for all to authenticated
  using (true) with check (true);

drop policy if exists "Gallery images are publicly readable" on storage.objects;
create policy "Gallery images are publicly readable"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'gallery-photos');

drop policy if exists "Admins upload gallery images" on storage.objects;
create policy "Admins upload gallery images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'gallery-photos');

drop policy if exists "Admins delete gallery images" on storage.objects;
create policy "Admins delete gallery images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'gallery-photos');
