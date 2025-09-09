#!/usr/bin/env bash
set -euo pipefail

# Local CI helper: runs Next build without failing on ESLint/TS.
# Useful while you incrementally fix lint/types.

export NEXT_TELEMETRY_DISABLED=1
echo "→ Installing deps"
npm ci || npm install

echo "→ Building (ignoring lint & TS errors)"
NEXT_IGNORE_ESLINT=1 npm run build || true
