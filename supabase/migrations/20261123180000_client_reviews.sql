-- Client review submissions for STHAPATYA.
-- Public site may only read APPROVED rows with publish_consent = true.

create table public.client_reviews (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_email text not null default '',
  rating smallint not null check (rating between 1 and 5),
  review_text text not null,
  experience_text text not null default '',
  publish_consent boolean not null default false,
  status text not null default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  submitted_at timestamptz not null default now(),
  decided_at timestamptz,
  decided_by text not null default '',
  decision_note text not null default '',
  submission_hash text not null default '',
  notify_email_sent boolean not null default false,
  notify_email_error text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_review_tokens (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.client_reviews (id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index client_reviews_public_idx
  on public.client_reviews (status, publish_consent, submitted_at desc);

create index client_reviews_status_idx
  on public.client_reviews (status, submitted_at desc);

create index client_reviews_submission_hash_idx
  on public.client_reviews (submission_hash);

create index client_review_tokens_review_idx
  on public.client_review_tokens (review_id);

create trigger client_reviews_touch before update on public.client_reviews
for each row execute function public.touch_updated_at();

alter table public.client_reviews enable row level security;
alter table public.client_review_tokens enable row level security;

create policy "public approved reviews"
  on public.client_reviews
  for select to anon, authenticated
  using (status = 'APPROVED' and publish_consent = true);

create policy "admin client reviews"
  on public.client_reviews
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admin review tokens"
  on public.client_review_tokens
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant select on public.client_reviews to anon, authenticated;
grant select, insert, update, delete on public.client_reviews, public.client_review_tokens to authenticated, service_role;
