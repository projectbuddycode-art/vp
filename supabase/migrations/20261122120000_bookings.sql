-- Booking tokens, phone consultations, and private contact storage.
-- Apply in the Supabase SQL editor after the initial schema.

alter table public.website_settings
  add column if not exists booking_token integer not null default 1000;

create table if not exists public.private_settings (
  id integer primary key default 1 check (id = 1),
  consultation_phone text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.private_settings (id) values (1) on conflict (id) do nothing;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_code text not null unique,
  kind text not null check (kind in ('phone', 'on_site')),
  subject text check (subject in ('money', 'health')),
  full_name text not null,
  mobile text not null,
  language text not null default 'en',
  preferred_date date,
  preferred_time text not null default '',
  concern text not null default '',
  service_slug text not null default '',
  total_amount integer not null,
  token_amount integer not null,
  remaining_amount integer not null,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'pending', 'paid', 'failed')),
  booking_status text not null default 'requested' check (booking_status in ('requested', 'confirmed', 'rescheduled', 'cancelled')),
  gateway text not null default '',
  gateway_order_id text unique,
  gateway_payment_id text,
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings (id) on delete cascade,
  gateway_event_id text unique,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;
alter table public.payment_events enable row level security;
alter table public.private_settings enable row level security;

create policy "admin bookings" on public.bookings
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin payment events" on public.payment_events
for select to authenticated
using (public.is_admin());

create policy "admin private settings" on public.private_settings
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop trigger if exists bookings_touch on public.bookings;
create trigger bookings_touch before update on public.bookings
for each row execute function public.touch_updated_at();
