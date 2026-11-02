-- Sanjeev Jain Vedic Vastu Consultancy
-- Apply in the Supabase SQL editor or with the Supabase CLI.

create extension if not exists pgcrypto;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  role text not null default 'member' check (role in ('admin', 'member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_code text not null unique,
  full_name text not null,
  mobile text not null,
  email text not null,
  city text not null,
  property_type text not null check (property_type in ('residential_home', 'apartment', 'commercial', 'industrial', 'plot')),
  consultation_category text not null check (consultation_category in ('financial_business', 'health_wellbeing', 'family_residential', 'property_planning', 'multiple', 'other')),
  consultation_mode text not null check (consultation_mode in ('on_site', 'online', 'initial_discussion')),
  preferred_date date,
  property_description text not null default '',
  client_concern text not null,
  privacy_consent boolean not null,
  marketing_consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'consultation_scheduled', 'assessment_completed', 'recommendations_provided', 'closed')),
  follow_up_at timestamptz,
  attachment_paths text[] not null default '{}',
  fingerprint text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiry_notes (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries (id) on delete cascade,
  author_id uuid references public.profiles (id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries (id) on delete cascade,
  scheduled_at timestamptz,
  mode text,
  status text not null default 'scheduled',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null check (category in ('residential', 'business', 'financial', 'health', 'structural')),
  client_concern text not null default '',
  property_context text not null default '',
  assessment text not null default '',
  identified_issues text not null default '',
  recommendations text not null default '',
  implementation_details text not null default '',
  estimated_remedy_cost text not null default '',
  client_reported_experience text not null default '',
  timeline text not null default '',
  cover_image_url text not null default '',
  cover_image_alt text not null default '',
  consent_status text not null default 'pending' check (consent_status in ('pending', 'granted', 'declined')),
  published boolean not null default false,
  seo_title text not null default '',
  seo_description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_study_media (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null references public.case_studies (id) on delete cascade,
  url text not null,
  kind text not null default 'other' check (kind in ('before', 'after', 'other')),
  alt text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'written' check (kind in ('written', 'video')),
  content text not null default '',
  video_url text not null default '',
  client_name text not null default '',
  client_image_url text not null default '',
  source_url text not null default '',
  approved boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.article_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  description text not null default '',
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category_id uuid references public.article_categories (id) on delete set null,
  featured_image_url text not null default '',
  featured_image_alt text not null default '',
  published boolean not null default false,
  published_at timestamptz,
  seo_title text not null default '',
  seo_description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.website_settings (
  id integer primary key default 1 check (id = 1),
  brand_name text not null default 'Sanjeev Jain',
  practice_name text not null default 'Vedic Vastu Consultancy',
  tagline text not null default 'Ancient Knowledge. Personal Insight. Practical Guidance.',
  core_message text not null default 'Every Space Is Different. Every Vastu Solution Should Be Personal.',
  phone text not null default '',
  whatsapp text not null default '',
  email text not null default '',
  instagram_url text not null default '',
  linkedin_url text not null default '',
  service_areas text not null default '',
  address text not null default '',
  consultation_fee integer not null default 10000,
  fee_note text not null default 'Travel charges, where applicable, may be separate.',
  remedy_note text not null default 'Remedy costs are independent of the consultation fee and vary with the recommendations.',
  online_consultation_enabled boolean not null default false,
  deliverables jsonb not null default '[]'::jsonb,
  founder_summary text not null default '',
  founder_portrait_url text not null default '',
  hero_sanskrit text not null default '',
  hero_translation text not null default '',
  booking_note text not null default 'Enquiries are reviewed personally.',
  updated_at timestamptz not null default now()
);

create table public.consent_records (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid references public.enquiries (id) on delete cascade,
  consent_type text not null check (consent_type in ('privacy', 'marketing')),
  granted boolean not null,
  ip_hash text not null default '',
  created_at timestamptz not null default now()
);

create index enquiries_status_idx on public.enquiries (status, created_at desc);
create index enquiries_fingerprint_idx on public.enquiries (fingerprint, created_at desc);
create index enquiries_email_idx on public.enquiries (email);
create index case_studies_published_idx on public.case_studies (published, consent_status);
create index articles_published_idx on public.articles (published, published_at desc);
create index testimonials_public_idx on public.testimonials (approved, published);
create index faqs_sort_idx on public.faqs (published, sort_order);

create trigger profiles_touch before update on public.profiles
for each row execute function public.touch_updated_at();
create trigger enquiries_touch before update on public.enquiries
for each row execute function public.touch_updated_at();
create trigger consultations_touch before update on public.consultations
for each row execute function public.touch_updated_at();
create trigger case_studies_touch before update on public.case_studies
for each row execute function public.touch_updated_at();
create trigger testimonials_touch before update on public.testimonials
for each row execute function public.touch_updated_at();
create trigger articles_touch before update on public.articles
for each row execute function public.touch_updated_at();
create trigger faqs_touch before update on public.faqs
for each row execute function public.touch_updated_at();
create trigger settings_touch before update on public.website_settings
for each row execute function public.touch_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), 'member')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.enquiries enable row level security;
alter table public.enquiry_notes enable row level security;
alter table public.consultations enable row level security;
alter table public.case_studies enable row level security;
alter table public.case_study_media enable row level security;
alter table public.testimonials enable row level security;
alter table public.article_categories enable row level security;
alter table public.articles enable row level security;
alter table public.faqs enable row level security;
alter table public.website_settings enable row level security;
alter table public.consent_records enable row level security;

create policy "read own or admin profile" on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_admin());

create policy "admin update profiles" on public.profiles
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin enquiries" on public.enquiries
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin enquiry notes" on public.enquiry_notes
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin consultations" on public.consultations
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public case studies" on public.case_studies
for select to anon, authenticated
using (published = true and consent_status = 'granted');

create policy "admin case studies" on public.case_studies
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public case media" on public.case_study_media
for select to anon, authenticated
using (
  exists (
    select 1 from public.case_studies
    where case_studies.id = case_study_media.case_study_id
      and case_studies.published = true
      and case_studies.consent_status = 'granted'
  )
);

create policy "admin case media" on public.case_study_media
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public testimonials" on public.testimonials
for select to anon, authenticated
using (approved = true and published = true);

create policy "admin testimonials" on public.testimonials
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public categories" on public.article_categories
for select to anon, authenticated
using (true);

create policy "admin categories" on public.article_categories
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public articles" on public.articles
for select to anon, authenticated
using (published = true);

create policy "admin articles" on public.articles
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public faqs" on public.faqs
for select to anon, authenticated
using (published = true);

create policy "admin faqs" on public.faqs
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public settings" on public.website_settings
for select to anon, authenticated
using (true);

create policy "admin settings" on public.website_settings
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin consent" on public.consent_records
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

grant usage on schema public to anon, authenticated, service_role;
grant select on public.case_studies, public.case_study_media, public.testimonials, public.article_categories, public.articles, public.faqs, public.website_settings to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated, service_role;

insert into storage.buckets (id, name, public)
values ('public-media', 'public-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('enquiry-uploads', 'enquiry-uploads', false)
on conflict (id) do nothing;

create policy "public media read" on storage.objects
for select to anon, authenticated
using (bucket_id = 'public-media');

create policy "admin media write" on storage.objects
for insert to authenticated
with check (bucket_id = 'public-media' and public.is_admin());

create policy "admin media update" on storage.objects
for update to authenticated
using (bucket_id = 'public-media' and public.is_admin());

create policy "admin media delete" on storage.objects
for delete to authenticated
using (bucket_id = 'public-media' and public.is_admin());

create policy "admin enquiry files" on storage.objects
for select to authenticated
using (bucket_id = 'enquiry-uploads' and public.is_admin());

insert into public.website_settings (
  id, deliverables
) values (
  1,
  '["Individual property assessment","Discussion of relevant concerns","Identification of areas requiring attention","Personalised recommendations","Practical implementation guidance"]'::jsonb
);

insert into public.article_categories (slug, name) values
  ('foundations', 'Foundations'),
  ('directions', 'Directions'),
  ('homes', 'Homes'),
  ('practice', 'Practice'),
  ('consultation', 'Consultation');

insert into public.faqs (question, answer, sort_order) values
  ('What is Vastu Shastra?', 'Vastu Shastra is a traditional Indian body of knowledge concerned with how a building sits on its site, how it is oriented, and how its rooms and entrances are arranged. In this practice it is offered as architectural and spatial guidance for an individual property. It is not a medical treatment, a financial product, or a substitute for engineering advice.', 1),
  ('How does a personal Vastu consultation work?', 'It begins with your concern and the property itself. Sanjeev Jain discusses the situation with you, assesses the relevant layout and directions in person, and suggests measures suited to that property. Recommendations are prepared from the visit. They are not taken from a fixed menu applied to every home.', 2),
  ('What happens during an on-site visit?', 'The visit is a personal assessment. You can walk through the spaces related to your concern, explain how the place is used, and review drawings if you have them. Observations and suggestions are then explained in practical terms. A minute-by-minute script is not fixed, because properties differ.', 3),
  ('What is the consultation fee?', 'The fee for a one-time personal property visit is ₹10,000. Travel charges, where a visit requires them, may be quoted separately. The cost of any remedy is independent of the consultation fee and is known only after the assessment.', 4),
  ('Do all Vastu corrections require structural changes?', 'No. Some suggestions concern how a space is used or furnished. Others may involve building work. You are told which is which. Structural changes are suggested only when the assessment indicates them, and any building work should be reviewed by a qualified engineer or architect before it is carried out.', 5),
  ('Can Vastu recommendations be practical and affordable?', 'The practice looks first for measures that are practical to carry out. Clients often hope for modest corrections, and that hope is taken seriously. It is not a promise that every property can be addressed within a particular budget. Structural work can cost more. Remedy costs vary with the recommendation and are separate from the ₹10,000 visit.', 6),
  ('Do I need an architectural floor plan?', 'A floor plan is helpful, especially when it shows north. It is not required in order to enquire. If you do not have one, say so on the form and bring whatever drawings or photographs you do have. You may also attach plans and property photographs to the enquiry.', 7),
  ('Can I book a consultation remotely?', 'The primary consultation is an on-site visit, because the property is assessed in person. You can request an initial discussion through the form. An online consultation is available only when the consultancy has enabled it. An online conversation is not offered as a full substitute for seeing a property that needs to be visited.', 8),
  ('How long does the assessment take?', 'A single duration is not published, because it depends on the property and the concerns being discussed. The likely length of the visit is confirmed when the consultation is arranged.', 9);

insert into public.case_studies (
  slug, title, category, client_concern, property_context, assessment, recommendations, consent_status, published, seo_title, seo_description
) values (
  'template-replace-before-publishing',
  'Template: replace with a consented client study',
  'residential',
  'Example field only. Describe the concern in the client’s own words. Do not invent a result.',
  'Describe the property without identifying the client unless consent allows it.',
  'Record what was actually observed.',
  'Record only recommendations that were given.',
  'pending',
  false,
  'Unpublished template',
  'Demonstration record. Not a client case.'
);

insert into public.testimonials (kind, content, approved, published) values (
  'written',
  'Template review. Replace this with words a client has approved. Do not publish placeholder text as a genuine review.',
  false,
  false
);

-- After creating the first auth user, promote them:
-- update public.profiles set role = 'admin' where id = 'USER_UUID';
