import 'server-only'
import { cache } from 'react'
import { getPayload, type Where } from 'payload'
import config from '@payload-config'
import type {
  CaseStudy,
  HomePage,
  Media,
  Plan,
  Post,
  SiteSetting,
  Testimonial,
} from '../payload-types'

export const getClient = cache(async () => getPayload({ config }))

/* -------------------------------------------------------------------------- */
/* Globals                                                                     */
/* -------------------------------------------------------------------------- */

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})

export const getHomePage = cache(async (): Promise<HomePage> => {
  const payload = await getClient()
  return payload.findGlobal({ slug: 'home-page', depth: 2 })
})

/* -------------------------------------------------------------------------- */
/* Media                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Look a library image up by its filename.
 *
 * Static marketing pages reference their supporting photography this way so the
 * alt text and the generated size variants still come from the CMS record,
 * rather than hardcoding a path into public/media and losing both.
 */
export const getMediaByFilename = cache(async (filename: string): Promise<Media | null> => {
  const payload = await getClient()
  const result = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  return result.docs[0] ?? null
})

/** Batch variant, so a page resolves all of its imagery in one round trip. */
export const getMediaMap = cache(
  async (...filenames: string[]): Promise<Record<string, Media | null>> => {
    const payload = await getClient()
    const result = await payload.find({
      collection: 'media',
      where: { filename: { in: filenames } },
      limit: filenames.length,
    })

    return Object.fromEntries(
      filenames.map((name) => [name, result.docs.find((doc) => doc.filename === name) ?? null]),
    )
  },
)

/* -------------------------------------------------------------------------- */
/* Articles                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Published-only constraint for drafted collections.
 *
 * The Local API runs with overrideAccess on by default, so a collection's
 * `read` access control does NOT gate these queries the way it gates the REST
 * API. Without this the public site would happily serve an unpublished draft at
 * its real URL. The filter is explicit here rather than implied, and it is
 * lifted only when Next's draft mode is on, which only an authenticated editor
 * can turn on through the preview route.
 */
const PUBLISHED: Where = { _status: { equals: 'published' } }

const withPublished = (draft: boolean, where?: Where): Where | undefined => {
  if (draft) return where
  return where ? { and: [where, PUBLISHED] } : PUBLISHED
}

export const getPosts = cache(
  async ({
    limit = 12,
    category,
    draft = false,
  }: { limit?: number; category?: string; draft?: boolean } = {}): Promise<Post[]> => {
    const payload = await getClient()
    const result = await payload.find({
      collection: 'posts',
      limit,
      depth: 2,
      draft,
      sort: '-publishedAt',
      where: withPublished(draft, category ? { category: { equals: category } } : undefined),
    })
    return result.docs
  },
)

export const getPostBySlug = cache(async (slug: string, draft = false): Promise<Post | null> => {
  const payload = await getClient()
  const result = await payload.find({
    collection: 'posts',
    where: withPublished(draft, { slug: { equals: slug } }),
    limit: 1,
    depth: 2,
    draft,
  })
  return result.docs[0] ?? null
})

/* -------------------------------------------------------------------------- */
/* Case studies                                                                */
/* -------------------------------------------------------------------------- */

export const getCaseStudies = cache(
  async ({
    limit = 12,
    featured,
    draft = false,
  }: { limit?: number; featured?: boolean; draft?: boolean } = {}): Promise<CaseStudy[]> => {
    const payload = await getClient()
    const result = await payload.find({
      collection: 'case-studies',
      limit,
      depth: 2,
      draft,
      sort: '-publishedAt',
      where: withPublished(draft, featured ? { featured: { equals: true } } : undefined),
    })
    return result.docs
  },
)

export const getCaseStudyBySlug = cache(
  async (slug: string, draft = false): Promise<CaseStudy | null> => {
    const payload = await getClient()
    const result = await payload.find({
      collection: 'case-studies',
      where: withPublished(draft, { slug: { equals: slug } }),
      limit: 1,
      depth: 2,
      draft,
    })
    return result.docs[0] ?? null
  },
)

/* -------------------------------------------------------------------------- */
/* Plans and testimonials                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Only verified plans reach the public site. BRAND.md compliance rule 8:
 * publish only verified plan and support figures.
 */
export const getPlans = cache(async (): Promise<Plan[]> => {
  const payload = await getClient()
  const result = await payload.find({
    collection: 'plans',
    limit: 10,
    sort: 'order',
    where: { verified: { equals: true } },
  })
  return result.docs
})

export const getTestimonials = cache(async (limit = 6): Promise<Testimonial[]> => {
  const payload = await getClient()
  const result = await payload.find({
    collection: 'testimonials',
    limit,
    depth: 1,
    sort: 'order',
  })
  return result.docs
})
