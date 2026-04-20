#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo "==> Deploy: GitHub Pages static export"

# ── 1. Stash dynamic routes temporarily ──────────────────────
PAYLOAD_DIR="$PROJECT_DIR/src/app/(payload)"
PAYLOAD_STASH="$PROJECT_DIR/src/app/_payload_stash"
API_DIR="$PROJECT_DIR/src/app/api"
API_STASH="$PROJECT_DIR/src/app/_api_stash"

echo "  -> Stashing payload + api routes"
mv "$PAYLOAD_DIR" "$PAYLOAD_STASH"
mv "$API_DIR" "$API_STASH"

restore() {
  echo "  -> Restoring payload + api routes"
  [ -d "$PAYLOAD_STASH" ] && mv "$PAYLOAD_STASH" "$PAYLOAD_DIR" || true
  [ -d "$API_STASH" ] && mv "$API_STASH" "$API_DIR" || true
}
trap restore EXIT

# ── 2. Build static export ────────────────────────────────────
echo "  -> Building with GITHUB_PAGES=true"
GITHUB_PAGES=true npm run build

# ── 3. Push out/ to gh-pages ─────────────────────────────────
OUT_DIR="$PROJECT_DIR/out"
TEMP_DIR="$(mktemp -d)"
echo "  -> Copying out/ to $TEMP_DIR"
cp -r "$OUT_DIR/." "$TEMP_DIR/"
touch "$TEMP_DIR/.nojekyll"

REMOTE_URL=$(git -C "$PROJECT_DIR" remote get-url origin)

cd "$TEMP_DIR"
git init
git config user.email "deploy@em-pcp.local"
git config user.name "Deploy Script"
git checkout -b gh-pages
git add -A
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git remote add origin "$REMOTE_URL"
git push --force origin gh-pages

echo "==> Done. https://shelestdan.github.io/EM-RSR/"
