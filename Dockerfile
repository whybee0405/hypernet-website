# syntax=docker/dockerfile:1.7

# Debian slim rather than Alpine on purpose: both sharp (image processing) and
# @libsql/client (SQLite) ship native bindings, and the glibc builds are the
# well-trodden path for them.
ARG NODE_VERSION=22-slim

# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS base

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# ---------------------------------------------------------------------------
FROM base AS deps

COPY package.json package-lock.json ./
# Dev dependencies are needed to build, and the builder stage doubles as the
# seed runner, so install the full tree here.
RUN npm ci --include=dev

# ---------------------------------------------------------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Inlined into the client bundle at build time, so it has to be correct here
# and not only at runtime.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3060
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NODE_ENV=production

# Prerendering reads content out of Payload, so the build needs a populated
# database. This applies the migrations and seeds a throwaway database under
# /tmp, then deletes it: no credentials and no content state reach the shipped
# image. The runtime database is created on a volume by the seed service in
# compose.yaml.
#
# Migrations rather than schema push, because the adapter refuses to push under
# NODE_ENV=production by design.
#
# public/media is emptied afterwards for a specific reason: Docker seeds an
# empty named volume from whatever the image has at the mount point, so leaving
# the build-time uploads here would pre-fill the media volume and the runtime
# seed would then upload a second, "-1" suffixed copy of every file.
RUN set -eux; \
  export PAYLOAD_SECRET=build-only-not-used-at-runtime; \
  export PREVIEW_SECRET=build-only-not-used-at-runtime; \
  export DATABASE_URI=file:/tmp/build.db; \
  export MEDIA_DIR=/app/public/media; \
  export SEED_ADMIN_EMAIL=build@example.com; \
  export SEED_ADMIN_PASSWORD=build-only-not-used-at-runtime; \
  npm run migrate; \
  npm run seed; \
  npm run build; \
  rm -f /tmp/build.db; \
  rm -rf /app/public/media; \
  mkdir -p /app/public/media

# ---------------------------------------------------------------------------
FROM base AS runner

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    MEDIA_DIR=/app/public/media

# Next's standalone output, which carries only the traced dependencies.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# The build-time seed left placeholder uploads in public/media. Clear them so
# the media volume starts empty and is populated once, by the seed service.
RUN rm -rf /app/public/media \
  && mkdir -p /app/public/media /app/data \
  && chown -R node:node /app/public/media /app/data

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
