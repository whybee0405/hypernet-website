import { getPayload } from 'payload'
import config from '../payload.config'
import {
  CASE_STUDIES_COPY,
  HOME_COPY,
  PLANS_COPY,
  POSTS_COPY,
  SITE_SETTINGS_COPY,
  TESTIMONIALS_COPY,
} from './content'

/**
 * Writes the text from content.ts into an existing database.
 *
 * Only text fields change. Media, verified flags, ordering, relationships and
 * anything the script cannot match (by slug, plan name or testimonial name)
 * are left alone, so records an editor has added are untouched. It will
 * overwrite text an editor has changed on the seeded records, so run it only
 * on a database that still holds placeholder content.
 *
 * Run with:  npm run refresh:copy
 */
const run = async () => {
  const payload = await getPayload({ config })

  /* Globals ---------------------------------------------------------------- */

  const home = await payload.findGlobal({ slug: 'home-page', depth: 0 })
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      ...HOME_COPY,
      services: HOME_COPY.services.map((service, index) => ({
        ...service,
        points: service.points.map((point) => ({ point })),
        image: home.services?.[index]?.image ?? undefined,
      })),
    } as never,
  })
  payload.logger.info('Homepage copy updated.')

  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      supportHours: SITE_SETTINGS_COPY.supportHours,
      metricsStatement: SITE_SETTINGS_COPY.metricsStatement,
      metricsSupport: SITE_SETTINGS_COPY.metricsSupport,
      metrics: SITE_SETTINGS_COPY.metrics.map((metric, index) => ({
        ...metric,
        verified: settings.metrics?.[index]?.verified ?? false,
      })),
      footerNote: SITE_SETTINGS_COPY.footerNote,
      trustHeading: SITE_SETTINGS_COPY.trustHeading,
      trustIntro: SITE_SETTINGS_COPY.trustIntro,
      accreditations: SITE_SETTINGS_COPY.accreditations.map((entry, index) => ({
        ...entry,
        verified: settings.accreditations?.[index]?.verified ?? false,
      })),
    },
  })
  payload.logger.info('Site settings copy updated.')

  /* Plans and testimonials ------------------------------------------------- */

  for (const plan of PLANS_COPY) {
    const result = await payload.update({
      collection: 'plans',
      where: { name: { equals: plan.name } },
      data: { audience: plan.audience, includes: plan.includes.map((item) => ({ item })) },
    })
    payload.logger.info(`Plan ${plan.name}: ${result.docs.length} updated.`)
  }

  for (const testimonial of TESTIMONIALS_COPY) {
    const result = await payload.update({
      collection: 'testimonials',
      where: { name: { equals: testimonial.name } },
      data: { quote: testimonial.quote },
    })
    payload.logger.info(`Testimonial ${testimonial.name}: ${result.docs.length} updated.`)
  }

  /* Case studies and articles ---------------------------------------------- */

  for (const [slug, copy] of Object.entries(CASE_STUDIES_COPY)) {
    const found = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    const current = found.docs[0]
    if (!current) {
      payload.logger.info(`Case study ${slug}: not found, skipped.`)
      continue
    }
    const { quote, ...rest } = copy
    await payload.update({
      collection: 'case-studies',
      id: current.id,
      data: {
        ...rest,
        quote: { ...current.quote, text: quote },
        _status: 'published',
      } as never,
    })
    payload.logger.info(`Case study ${slug}: updated.`)
  }

  for (const [slug, copy] of Object.entries(POSTS_COPY)) {
    const result = await payload.update({
      collection: 'posts',
      where: { slug: { equals: slug } },
      data: { ...copy, _status: 'published' } as never,
    })
    payload.logger.info(`Article ${slug}: ${result.docs.length} updated.`)
  }

  process.exit(0)
}

await run()
