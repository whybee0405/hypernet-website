#!/usr/bin/env bash
set -euo pipefail
cd /var/www/html
exec 9>/var/www/html/.deploy.lock
flock -n 9 || { echo 'Another deployment is running'; exit 1; }
set -a
source .env
set +a
export BUILDX_BUILDER=hypernet-limited
trap 'docker buildx stop hypernet-limited >/dev/null 2>&1 || true' EXIT
for target in builder runner; do
  if [ "$target" = builder ]; then image=hypernet-website-seed:local; else image=hypernet-website:local; fi
  docker buildx build --builder hypernet-limited --load --target "$target" \
    --build-arg "NEXT_PUBLIC_SERVER_URL=$HYPERNET_PUBLIC_URL" \
    --build-arg 'NODE_OPTIONS=--max-old-space-size=1536' \
    --tag "$image" .
done
docker buildx stop hypernet-limited
docker compose up -d --no-build
