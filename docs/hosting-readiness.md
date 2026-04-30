# Hosting Readiness

## Verdict

The public static site can run on almost any hosting.

The full site with Payload Admin and the contractor portal needs:

- Node.js runtime, preferably Node 20+ or 22+
- PostgreSQL database
- long-running process support, for example PM2, systemd, or hosting-level Node app runner
- SSH/SFTP access
- writable storage for uploads in `public/media`
- HTTPS/SSL
- SMTP credentials for form notifications

The current app does not use MySQL. It uses `@payloadcms/db-postgres`, so a tariff with only MySQL is not enough for Admin and Portal.

## Current Project Runtime

- Framework: Next.js
- CMS/Admin: Payload CMS
- Database: PostgreSQL via `DATABASE_URI`
- Portal collections: `portal-users`, `portal-links`, `portal-access-log`
- Uploads: local disk, `public/media`
- Start command: `npm run start`
- Build command: `npm run build`

## Hosting Checklist

Before buying hosting, confirm these exact items:

- Node.js app support: yes
- Node version: 20+ or 22+
- PostgreSQL: yes
- SSH: yes
- ability to run `npm ci`: yes
- ability to run `npm run build`: yes
- process manager or Node app panel: yes
- custom env vars: yes
- persistent disk for `public/media`: yes
- domain DNS control: yes
- SSL certificate: yes

If provider answers “only PHP/MySQL”, use it only for static pages, not for Admin/Portal.

## Minimal Launch Steps

1. Create PostgreSQL database.
2. Upload repo or `git clone` it on server.
3. Copy `.env.production.example` to `.env`.
4. Fill `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, SMTP vars.
5. Run:

```bash
npm ci
npm run check:env
npm run build
npm run start
```

6. Open `/admin` and create first admin user.
7. In Admin, create portal users in `Портал исполнителей -> Исполнители`.
8. Add Synology Drive links in `Портал исполнителей -> Ссылки`.
9. Test `/portal` login and `/portal/dashboard`.
10. Point domain DNS to hosting.
11. Enable SSL.

## Production Env

Use `.env.production.example` as source.

Required:

- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SITE_URL`

Recommended:

- `PAYLOAD_API_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `NOTIFY_EMAIL`

## Good Target Hosting Shape

Best simple shape:

- VPS or managed Node hosting
- PostgreSQL included or external PostgreSQL
- PM2/systemd
- SSL
- backups

Not enough:

- PHP-only shared hosting
- MySQL-only hosting
- static hosting only

Static-only fallback still works through GitHub Pages, but Admin and Portal will not work there.
