# Hypernet

Marketing site and CMS for Hypernet, a South African provider of connectivity, communications,
security and integration for small and medium businesses. Originally built against `BRAND.md` v1.1;
the v2 design ("Night Signal", September 2026) deliberately departs from it where noted below.

Next.js 16 (App Router, React 19) with Payload CMS 3 running inside the same application. One
process serves the public site, the admin and the API.

---

## Running it

```bash
npm install
cp .env.example .env      # then fill in the values, see below
npm run seed              # placeholder content, images and an admin user
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- Seeded login: `hello@hypernet.co.za` / `ChangeMe123!` (change this immediately)

### Environment

| Variable | What it does |
|---|---|
| `PAYLOAD_SECRET` | Signs auth tokens. Must be a long random string, and must not change once users exist. |
| `DATABASE_URI` | SQLite file by default (`file:./hypernet.db`). See "Going to production". |
| `NEXT_PUBLIC_SERVER_URL` | Canonical origin. Drives canonical URLs, OG tags, the sitemap and media URLs. |
| `PREVIEW_SECRET` | Shared secret for the draft preview route. |
| `MEDIA_DIR` | Absolute upload directory. Only set in Docker; local development resolves it from source. |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Only read by `npm run seed`. |

The `HYPERNET_*` variables in the same file are read by `compose.yaml` only. See the Docker section
below.

### Scripts

| Command | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build and serve |
| `npm run seed` | Wipes content collections and reseeds. Safe to re-run. |
| `npm run refresh:copy` | Writes the text in `src/seed/content.ts` into an existing database (globals, plans, testimonials, seeded case studies and articles). Leaves media, flags and editor-added records alone, but overwrites text on the seeded records. |
| `npm run migrate` | Applies pending migrations. Required in production; development uses schema push. |
| `npm run migrate:create` | Generates a new migration after a collection or global change |
| `npm run migrate:status` | Shows which migrations have run |
| `npm run generate:types` | Regenerates `src/payload-types.ts` after a schema change |
| `npm run generate:importmap` | Regenerates the admin import map after adding custom components |

---

## Running it in Docker

```bash
docker compose up -d --build
```

- Site: http://localhost:3060
- Admin: http://localhost:3060/admin

Everything is namespaced so it cannot collide with anything else on the machine:

| | |
|---|---|
| Compose project | `hypernet` |
| Containers | `hypernet-web`, `hypernet-seed` |
| Images | `hypernet-website:local` (486 MB), `hypernet-website-seed:local` |
| Volumes | `hypernet_db-data`, `hypernet_media-data` |
| Network | `hypernet_net` |
| Host port | `3060`, bound to `127.0.0.1` only |

Port 3060 was picked because it is clear of the other projects currently on this Docker Desktop.
Change `HYPERNET_PORT` and `HYPERNET_PUBLIC_URL` in `.env` together if that changes. The public URL
is inlined into the client bundle at build time, so changing it needs `--build`, not just a restart.

### How the two services fit together

`hypernet-seed` runs first and exits; `hypernet-web` waits for it to complete successfully.

The seed container applies migrations on every start, then seeds placeholder content **only if
`/app/data/.seeded` is absent**. Restarting the stack therefore never wipes content the client has
entered. It also hands the volumes over to uid 1000 before exiting, because it runs as root to be
able to write to a brand new volume while the web container runs as the unprivileged `node` user.
Without that step every write from the running site fails with `SQLITE_READONLY`.

### State and resetting

The SQLite database and all uploads live on the two named volumes, not in the image. The image
contains no credentials and no content: the build seeds a throwaway database under `/tmp` purely so
that prerendering has something to read, and deletes it before the runner stage.

```bash
docker compose down          # stop, keep all content
docker compose down -v       # stop and delete the database and uploads
docker compose up -d --build # rebuild after a code change
docker compose logs -f web   # tail the site
```

### Migrations, not schema push

Payload's adapter refuses to push a schema under `NODE_ENV=production` by design, so the container
applies the committed migrations in `src/migrations` instead. Local development still uses push.
After changing a collection or global, run `npm run migrate:create` and commit the result, otherwise
the container will start against an out-of-date schema.

---

## What the client can edit

Everything in the admin, grouped as an editor would look for it.

**Content**
- **Articles** - the blog at `/insights`. Drafts, autosave, version history, live preview.
- **Case studies** - `/case-studies`. Same draft and preview behaviour.
- **Plans** - the pricing table. See "Unverified claims" below.
- **Testimonials** - the quote panels on the homepage, VoIP page and about page.
- **Homepage** - hero copy and imagery, the sector list, both service pillars, the support process,
  the proof grid and the closing CTA.

**Library**
- **Media** - all imagery, with required alt text and five generated size variants.

**Team**
- **Users** - admin and editor roles.
- **Enquiries** - contact form submissions, with a status workflow.

**Settings**
- **Site settings** - phone, email, WhatsApp, support hours, address, footer note, legal links and
  the proof figures.

### What is not in the CMS

All seeded CMS text lives in `src/seed/content.ts`. The service catalogue (`/services` and the eight
`/services/[slug]` pages) lives in
`src/content/services.ts`, one typed record per service. The source brochures are summarised in
`docs/services/`. The body copy of `/pricing`, `/about` and `/legal/privacy` also lives in code.
These are stable positioning pages that change once or twice a year, and keeping them as code kept
the build focused. If the client wants to edit them, the next step is a `Pages` collection with a
blocks field reusing the section components that already exist in `src/components/site/`.

---

## Unverified claims

`BRAND.md` marks the uptime and response figures as placeholders, and compliance rule 8 says to
publish only verified figures. That rule is enforced in code rather than left to an editor's memory.

- **Proof figures** (Site settings) each have a `verified` checkbox. Unverified figures do not
  render. The Blue Deep band leads with a statement about how Hypernet works, which needs no
  measurement, and the figures fill in beside it as each is signed off. Currently only
  "100% SA-based support team" is ticked; the 99.9% uptime and sub-two-minute response figures are
  seeded unticked and are therefore invisible on the live site. **Tick them once Hypernet confirms
  them in writing.**
- **Plans** have a `verified` checkbox too. Unverified plans are excluded from the public table, and
  the table falls back to an honest "priced on your setup" prompt if none are verified. The seeded
  specifications come from the plan table in `BRAND.md` section 7. **No price is seeded**, because
  none has been confirmed; the table renders "Priced on your setup" until one is entered.

### Placeholder content

**All seeded case studies, testimonials and client names are placeholders.** They are built from the
customer personas in `BRAND.md` section 10, not from real Hypernet customers. Replace them with
signed-off customer stories before launch.

The CMS photography is AI-generated placeholder imagery. Real photography is not expected, so the v2
design no longer depends on it: CMS images render through a duotone treatment
(`src/components/site/Duotone.tsx`), and the site's own art direction is a generated series of
glass-and-titanium service renders in `public/brand/` (made with Higgsfield: Nano Banana Pro stills,
Kling 3.0 loops for the hero filament and the South Africa map).

`/legal/privacy` is a working draft. It states current practice in plain language but has not been
reviewed against POPIA, and the information officer details still need adding. It is `noindex` for
now.

---

## Design system: "Night Signal" (v2)

Tokens live in one place: `src/app/(site)/globals.css`. Components never reference a raw hex value
for theme colours, so the whole site rethemes from that block.

- **Concept** - a deep midnight field lit by one warm coral filament (the human voice) against cool
  Hypernet blue (the network). The hero video is literally that: a filament looping into a speech
  bubble.
- **Themes by section, not by OS** - `:root` and `.night` are the dark theme; `.paper` is a warm
  off-white. Both define the same semantic names (`--surface`, `--ink`, `--slate`, `--accent`,
  `--warm`, ...), so any section re-themes by adding one class. Pages alternate night and paper so
  long pages breathe.
- **Type** - Bricolage Grotesque display, Instrument Serif italic for the one or two "human" words in
  a headline (the `.serif` class), Inter body, Spline Sans Mono for metadata. All via `next/font`.
- **Surfaces** - `.card` is a glass card with a lit gradient edge; `.halo` is a blurred light;
  `.grid-lines` is the faint engineering grid; `.render-mask` feathers a render's baked background.
- **Radius** - 22px cards, 14px inputs, pill buttons.
- **Grain** - a fixed SVG noise layer over everything stops the dark fields banding.

Departures from `BRAND.md` (at the client's request): dark-first rather than 80% white, new display
face, and generated 3D renders instead of documentary photography. Palette, voice, tagline and the
verified-claims rules are unchanged.

### Motion

`MotionConfig reducedMotion="user"` is set once in `src/components/site/MotionProvider.tsx`.
Components keep one unconditional initial state and the provider decides how it resolves, which
avoids hydration mismatches. Lenis (`src/components/site/SmoothScroll.tsx`) smooths wheel scrolling
on desktop and is off for touch and reduced motion; it drives the real scroll position, so every
`useScroll` keeps working. Videos are replaced by their poster frame under reduced motion.

The signature moves:

1. **Pinned hero** (`home/Hero.tsx`) - 170vh with a sticky stage; the filament video pushes in and
   dims while the two headline lines drift apart.
2. **Scroll-lit statements** (`site/motion.tsx` `ScrollLitText`) - words light up as they scroll
   through; used once per page for the sentence that matters.
3. **Horizontal services track** (`home/ServicesTrack.tsx`) - vertical scroll becomes sideways
   travel through the catalogue; a native snap rail on mobile.
4. **Stacking packages** (`services/PackageStack.tsx`) - package cards pin and deal on top of each
   other.
5. **Bespoke service modules** (`services/modules/`) - CloudPath failover demo, Dragon Guard attack
   layers, contact-centre channel orbit, zero-trust contrast, UC comparison and so on.
6. **The direct line** (`home/DirectLine.tsx`) - a coral filament drawn down the support process.

### Navigation

`site/Nav.tsx` is a floating glass bar that hides on scroll-down and returns on scroll-up. The
Services megamenu groups the catalogue into four pillars (Connect, Communicate, Protect, Automate)
with a live preview of the hovered service. On mobile it becomes a full-height sheet.

No `window.addEventListener('scroll')` anywhere; everything goes through Motion's `useScroll`.

---

## Notable implementation decisions

**Draft visibility.** Payload's Local API runs with `overrideAccess` on, so a collection's `read`
access control does not gate server-component queries the way it gates the REST API. Without an
explicit filter, an unpublished draft would be served at its real URL. `src/lib/payload.ts` adds
`_status: published` to every public query, and lifts it only when Next's draft mode is on. Draft
mode can only be enabled through `/next/preview`, which requires both the shared secret and a valid
Payload session, and rejects non-relative paths so it cannot be used as an open redirect.

**No route-level `loading.tsx`.** A loading boundary above a page that can call `notFound()` flushes
a 200 before the page resolves, which turns every missing article into a soft 404. Skeletons are
instead placed on Suspense boundaries around the two below-the-fold homepage sections
(`src/components/home/DeferredSections.tsx`), where there is no `notFound()` to interfere with, and
where deferring the two heaviest queries lets the hero stream immediately.

**On-demand revalidation.** Every public page is prerendered. `src/hooks/revalidate.ts` busts the
affected routes on publish, including the old URL when a slug changes, so an editor sees their
change live without a deploy. The hooks fail quietly outside a request context so the seed script
and CLI tasks still work.

**Contact form.** A server action writes through the Local API. The `leads` collection denies
`create` to everyone, which means the public REST endpoint cannot be used to stuff the enquiry list;
the action is the only way in. There is a honeypot field, server-side validation, and inline field
errors.

**Media URLs.** Payload serves uploads from an absolute URL built on `serverURL`. `mediaUrl()`
rewrites same-origin URLs to relative paths so `next/image` can optimise them without a
`remotePatterns` entry, and leaves other hosts alone so moving uploads to object storage later needs
no change beyond `next.config.mjs`.

---

## Going to production

1. **Swap the database.** SQLite is here so the project runs with no external services. For
   production use `@payloadcms/db-postgres` and point `DATABASE_URI` at a managed Postgres. The
   collection configs do not change, but the migrations in `src/migrations` are SQLite-specific:
   delete them and run `npm run migrate:create` once against the new adapter.
2. **Swap media storage.** Uploads currently land in `public/media`, which does not survive a
   containerised deploy. Add `@payloadcms/storage-s3` (or Vercel Blob) and add the bucket host to
   `next.config.mjs` `images.remotePatterns`.
3. **Add an email adapter.** Payload logs a warning at boot because there is none. Password resets
   will not work without it, and enquiry notifications need it. `@payloadcms/email-nodemailer` or
   `@payloadcms/email-resend`.
4. **Set real secrets.** `PAYLOAD_SECRET` and `PREVIEW_SECRET` must be long and random.
   `PAYLOAD_SECRET` cannot change after users exist without invalidating every session.
5. **Change the seeded admin password**, or create real users and delete the seeded one.
6. **Resolve everything in "Unverified claims" above** before the site is public.
7. **Pick the logo.** `BRAND.md` section 12 has two directions pending sign-off. The Connection
   Point mark is implemented in `src/components/site/Logo.tsx` and `src/app/icon.svg`. Swapping
   those two files swaps every instance on the site.

---

## Layout

```
src/
  access/          collection access control helpers
  actions/         server actions (contact form)
  app/
    (payload)/     admin, REST, GraphQL, draft preview route
    (site)/        the public site, its own root layout and design tokens
    icon.svg  robots.ts  sitemap.ts
  collections/     Posts, CaseStudies, Plans, Testimonials, Media, Users, Leads
  components/
    home/          homepage sections
    site/          shared chrome and primitives
  fields/          reusable field definitions (slug, seo)
  globals/         HomePage, SiteSettings
  hooks/           revalidation
  lib/             data access, formatting, preview URLs
  seed/            seed script, Lexical builders, placeholder imagery
  payload.config.ts
```
