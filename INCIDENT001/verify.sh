#!/usr/bin/env sh
set -eu

URL="http://localhost:3000/api/health"

echo "Checking $URL ..."

if RESPONSE=$(curl -fsS --max-time 3 "$URL" 2>/dev/null); then
  if printf '%s' "$RESPONSE" | grep -q '"status":"ok"'; then
    echo "✅ Incident resolved. Application is healthy."
    exit 0
  fi
fi

echo "❌ Not fixed yet. The health endpoint is still unavailable."
echo "Keep troubleshooting, then run ./verify.sh again."
exit 1
