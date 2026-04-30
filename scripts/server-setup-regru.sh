#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-em-pcp.ru}"
IDN_DOMAIN="${IDN_DOMAIN:-xn----itbvnal.xn--p1ai}"
APP_DIR="${APP_DIR:-/var/www/em-rsr}"
REPO_URL="${REPO_URL:-https://github.com/shelestdan/EM-RSR.git}"
DB_NAME="${DB_NAME:-em_rsr}"
DB_USER="${DB_USER:-em_rsr}"
DB_PASS="${DB_PASS:-$(openssl rand -base64 32 | tr -d '\n')}"
SWAP_SIZE="${SWAP_SIZE:-4G}"
OWNER="${SUDO_USER:-root}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root: sudo bash scripts/server-setup-regru.sh" >&2
  exit 1
fi

echo "==> System packages"
apt-get update
apt-get install -y ca-certificates curl gnupg git nginx postgresql postgresql-contrib certbot python3-certbot-nginx build-essential openssl

if ! command -v node >/dev/null 2>&1 || ! node -v | grep -Eq '^v2[02]\.'; then
  echo "==> Node.js 22"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

echo "==> PM2"
npm install -g pm2

if ! swapon --show | grep -q .; then
  echo "==> Swap $SWAP_SIZE"
  fallocate -l "$SWAP_SIZE" /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '^/swapfile ' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> PostgreSQL DB"
if sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'" | grep -q 1; then
  sudo -u postgres psql -c "ALTER USER ${DB_USER} WITH PASSWORD '${DB_PASS}';"
else
  sudo -u postgres psql -c "CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';"
fi
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1 || \
  sudo -u postgres createdb -O "$DB_USER" "$DB_NAME"

echo "==> App dir"
mkdir -p "$(dirname "$APP_DIR")"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
fi
chown -R "$OWNER:$OWNER" "$APP_DIR" 2>/dev/null || true

echo "==> Nginx config"
cp "$APP_DIR/deploy/nginx/em-psp.conf.example" /etc/nginx/sites-available/em-psp.conf
ln -sf /etc/nginx/sites-available/em-psp.conf /etc/nginx/sites-enabled/em-psp.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl reload nginx

cat <<EOF

Setup done.

DATABASE_URI:
postgresql://${DB_USER}:${DB_PASS}@127.0.0.1:5432/${DB_NAME}

Next:
1. cd ${APP_DIR}
2. cp .env.production.example .env.production
3. fill .env.production
4. npm run deploy:vps
5. certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} -d ${IDN_DOMAIN} -d www.${IDN_DOMAIN}

EOF
