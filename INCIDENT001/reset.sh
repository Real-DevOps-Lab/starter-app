#!/usr/bin/env sh
set -eu

CONTAINER_NAME="rdl-incident-001"

echo "Removing incident container if it exists..."
docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

echo "✅ Lab reset. Run ./start-broken.sh to start again."
