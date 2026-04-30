#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

BACKUP_DIR="${BACKUP_DIR:-$PROJECT_DIR/backups}"
STAMP="$(date '+%Y%m%d-%H%M%S')"
mkdir -p "$BACKUP_DIR"

set -a
[ -f .env.production ] && source .env.production
[ -f .env ] && source .env
set +a

if [ -z "${DATABASE_URI:-}" ]; then
  echo "DATABASE_URI is missing" >&2
  exit 1
fi

echo "==> Dumping PostgreSQL"
pg_dump "$DATABASE_URI" > "$BACKUP_DIR/db-$STAMP.sql"

echo "==> Archiving uploads"
if [ -d public/media ]; then
  tar -czf "$BACKUP_DIR/media-$STAMP.tar.gz" public/media
else
  echo "public/media not found, skipping"
fi

echo "==> Backup saved to $BACKUP_DIR"
