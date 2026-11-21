-- Temporary payment bypass support for launch testing.

alter table public.bookings
  add column if not exists amount_paid integer not null default 0;

alter table public.bookings drop constraint if exists bookings_payment_status_check;
alter table public.bookings
  add constraint bookings_payment_status_check
  check (payment_status in ('unpaid', 'pending', 'paid', 'failed', 'payment_bypassed'));
