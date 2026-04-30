#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

export NODE_ENV=production
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1536}"

echo "==> Installing dependencies"
npm ci --include=dev

echo "==> Checking production environment"
npm run check:env

echo "==> Building application"
npm run build

echo "==> Running database migrations"
npx payload migrate

echo "==> Starting/reloading PM2"
pm2 startOrReload ecosystem.config.cjs --env production
pm2 save

echo "==> Done"
