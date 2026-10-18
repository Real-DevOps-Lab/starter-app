#!/usr/bin/env sh
set -eu

CONTAINER_NAME="rdl-incident-001"
IMAGE_NAME="rdl-incident-001"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required for this lab."
  exit 1
fi

echo "Resetting any previous run..."
docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

echo "Building image..."
docker build -t "$IMAGE_NAME" .

echo "Starting incident environment..."
docker run -d \
  --name "$CONTAINER_NAME" \
  -e PORT=3001 \
  -p 3000:3000 \
  "$IMAGE_NAME" >/dev/null

echo
echo "Incident started."
echo "Container status:"
docker ps --filter "name=$CONTAINER_NAME"
echo
echo "Your target: http://localhost:3000"
echo "The container should be running, but the app should be unavailable."
echo "Investigate before opening HINTS.md or SOLUTION.md."
