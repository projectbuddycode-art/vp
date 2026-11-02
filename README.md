# Sanjeev Jain Vedic Vastu Consultancy

A production-ready Next.js site for a personal Vedic Vastu practice. The public website runs without Supabase. Enquiries, the studio desk, and CMS publishing need the credentials in `.env.example`.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local`. Do not commit real keys.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Public project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key, used with row-level security |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only. Required to store enquiries and upload files |
| `RESEND_API_KEY` | Optional email delivery |
| `EMAIL_FROM` | Verified sender address |
| `ADMIN_NOTIFICATION_EMAIL` | Where new enquiries are sent |
| `CONSENT_IP_SALT` | Salt for the consent address hash |

The service role key is read only on the server. It is not prefixed with `NEXT_PUBLIC`.

## Database

1. Create a Supabase project.
2. Run `supabase/migrations/20261102120000_initial_schema.sql` in the SQL editor.
3. In Authentication, turn off public sign-ups.
4. Create one user in Authentication.
5. Promote that user:

```sql
update public.profiles set role = 'admin' where id = 'USER_UUID';
```

The migration creates `public-media` and private `enquiry-uploads` buckets. It seeds editable FAQs, settings, an unpublished case-study template, and an unapproved testimonial template. Those templates are not shown on the public site.

## What works before credentials exist

- All public pages, navigation, and the knowledge-centre essays
- The consultation form validates, then explains that nothing was stored
- Admin routes explain the missing configuration instead of exposing data

## What needs credentials

- Saving an enquiry and its files
- Email acknowledgement and the administrator notice
- Signing in to `/admin`
- Publishing case studies, testimonials, articles, FAQs, and settings

## Deployment

Deploy on Vercel with the same environment variables. Set `NEXT_PUBLIC_SITE_URL` to the production origin. Apply the migration before accepting enquiries. The in-memory enquiry rate limit is per server instance; put a shared limiter in front of the form if you need a hard global cap.

## Content boundaries

Biographies, Sanskrit verses, phone numbers, and social links stay blank until they are entered in Website settings. Case studies and testimonials render only when published and approved. The knowledge-centre essays are original explanations and do not quote scripture.
