import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * One-off, additive fix for any deployment whose database predates the
 * Trust tab on SiteSettings (added 2026-09-17).
 *
 * compose.yaml's seed service skips the full seed script on every
 * deployment past the first, gated on a ".seeded" marker on the volume, so
 * that a redeploy never wipes real content. A schema migration alone still
 * leaves accreditations empty and trustHeading/trustIntro at the migration's
 * literal SQL default on any database that predates this field. This script
 * only ever writes those three fields, only when accreditations is still
 * empty, so it is safe to run against a database with real content in every
 * other field. Run once per pre-existing deployment; a no-op after that.
 *
 * Run with:  npm run backfill:trust
 */
const run = async () => {
  const payload = await getPayload({ config })

  const current = await payload.findGlobal({ slug: 'site-settings' })

  if ((current.accreditations ?? []).length > 0) {
    payload.logger.info('Accreditations already populated. Nothing to backfill.')
    process.exit(0)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      trustHeading: 'What we are registered and working toward',
      trustIntro:
        'Some of this is confirmed. Some of it is still moving through the process. We would rather show you both than print a badge we cannot back up.',
      accreditations: [
        {
          name: 'ICASA registration',
          detail: 'Confirmation and registration number pending.',
          verified: false,
        },
        {
          name: 'ISPA membership',
          detail: 'Application in progress.',
          verified: false,
        },
        {
          name: 'POPIA compliance review',
          detail: 'Data handling policy drafted, external review pending.',
          verified: false,
        },
      ],
    },
  })

  payload.logger.info('Backfilled trust heading, intro and accreditations.')
  process.exit(0)
}

await run()
