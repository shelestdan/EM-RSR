# REG.RU VPS Launch

Target: REG.RU ФЗ-152 VPS, Ubuntu 24.04 LTS, Node.js 22, PostgreSQL, Nginx, PM2.

## Server Shape

Minimum purchased tariff is enough:

- 3 vCPU
- 3 GB RAM
- 60 GB NVMe
- Ubuntu 24.04 LTS
- one floating IPv4
- backups enabled

Required swap: 4 GB. The setup script creates it if no swap exists.

## DNS

Before SSL:

- `A em-pcp.ru -> SERVER_IP`
- `A www.em-pcp.ru -> SERVER_IP`
- `A ем-псп.рф -> SERVER_IP`
- `A www.ем-псп.рф -> SERVER_IP`

## One-Time Server Setup

Run on VPS as root:

```bash
curl -fsSL https://raw.githubusercontent.com/shelestdan/EM-RSR/main/scripts/server-setup-regru.sh -o /tmp/server-setup-regru.sh
sudo bash /tmp/server-setup-regru.sh
```

The script installs:

- Node.js 22
- npm
- PM2
- Nginx
- PostgreSQL
- Certbot
- build tools
- 4 GB swap

It also clones the repo into `/var/www/em-rsr`, creates PostgreSQL DB/user, prints `DATABASE_URI`.

## Environment

On server:

```bash
cd /var/www/em-rsr
cp .env.production.example .env.production
nano .env.production
```

Required values:

```bash
NEXT_PUBLIC_SITE_URL=https://em-pcp.ru
DATABASE_URI=postgresql://em_rsr:PASTE_PASSWORD@127.0.0.1:5432/em_rsr
PAYLOAD_SECRET=PASTE_RANDOM_32_PLUS_CHARS
PAYLOAD_API_KEY=PASTE_RANDOM_32_PLUS_CHARS
PAYLOAD_INTERNAL_URL=http://127.0.0.1:3000
```

Generate secrets:

```bash
openssl rand -base64 48
```

Email can be filled later. Forms still work, but email notification is skipped until SMTP is set.

## Deploy

```bash
cd /var/www/em-rsr
git pull
npm run deploy:vps
```

PM2 check:

```bash
pm2 status
pm2 logs em-rsr --lines 80
```

## SSL

After DNS points to server:

```bash
sudo certbot --nginx -d em-pcp.ru -d www.em-pcp.ru -d xn----itbvnal.xn--p1ai -d www.xn----itbvnal.xn--p1ai
sudo nginx -t
sudo systemctl reload nginx
```

## Admin Start

Open:

- `https://em-pcp.ru/admin`

First Payload visit creates first admin user.

Then create:

- portal users
- portal links
- map marker placeholders if needed later

## Portal Check

Open:

- `https://em-pcp.ru/portal`

Login with created contractor user. Dashboard must show links from Admin.

## Backups

Manual backup:

```bash
cd /var/www/em-rsr
npm run backup:vps
```

Backups are saved to `/var/www/em-rsr/backups` unless `BACKUP_DIR` is set.

Recommended cron:

```bash
0 3 * * * cd /var/www/em-rsr && npm run backup:vps >/var/log/em-rsr-backup.log 2>&1
```

## Static GitHub Pages

GitHub Pages remains separate:

```bash
npm run deploy:gh-pages
```

GitHub Pages publishes static public pages only. Admin and portal work only on VPS.
