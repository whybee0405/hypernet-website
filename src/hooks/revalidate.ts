import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * On-demand revalidation.
 *
 * Every public page is prerendered, which is what makes the site fast, but it
 * also means a published edit is invisible until something invalidates the
 * route. These hooks do that at the moment of the write, so an editor hitting
 * Publish sees the change on the live site without a deploy.
 *
 * revalidatePath only works inside a Next request. The seed script and any CLI
 * task run outside one, so failures are swallowed on purpose: there is no
 * route cache to bust in that context.
 */
const safeRevalidate = (paths: string[], logger?: { warn: (msg: string) => void }) => {
  for (const path of paths) {
    try {
      revalidatePath(path)
    } catch {
      logger?.warn(`Skipped revalidating ${path}: not running inside a request.`)
      return
    }
  }
}

/** Routes that show site-wide chrome or homepage content. */
const GLOBAL_PATHS = ['/', '/sitemap.xml']

export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  const paths = new Set([...GLOBAL_PATHS, '/insights'])

  if (doc?.slug) paths.add(`/insights/${doc.slug}`)
  // A renamed slug leaves the old URL cached, so clear that too.
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    paths.add(`/insights/${previousDoc.slug}`)
  }

  safeRevalidate([...paths], req.payload.logger)
  return doc
}

export const revalidatePostDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  safeRevalidate(
    [...GLOBAL_PATHS, '/insights', doc?.slug ? `/insights/${doc.slug}` : ''].filter(Boolean),
    req.payload.logger,
  )
  return doc
}

export const revalidateCaseStudy: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  const paths = new Set([...GLOBAL_PATHS, '/case-studies'])

  if (doc?.slug) paths.add(`/case-studies/${doc.slug}`)
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    paths.add(`/case-studies/${previousDoc.slug}`)
  }

  safeRevalidate([...paths], req.payload.logger)
  return doc
}

export const revalidateCaseStudyDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  safeRevalidate(
    [...GLOBAL_PATHS, '/case-studies', doc?.slug ? `/case-studies/${doc.slug}` : ''].filter(Boolean),
    req.payload.logger,
  )
  return doc
}

/** Plans appear on the homepage and the pricing page. */
export const revalidatePlan: CollectionAfterChangeHook = ({ doc, req }) => {
  safeRevalidate(['/', '/pricing'], req.payload.logger)
  return doc
}

export const revalidatePlanDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  safeRevalidate(['/', '/pricing'], req.payload.logger)
  return doc
}

/** Quotes appear on the homepage and the about page. */
export const revalidateTestimonial: CollectionAfterChangeHook = ({ doc, req }) => {
  safeRevalidate(['/', '/about'], req.payload.logger)
  return doc
}

export const revalidateTestimonialDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  safeRevalidate(['/', '/about'], req.payload.logger)
  return doc
}

/** Homepage global. */
export const revalidateHome: GlobalAfterChangeHook = ({ doc, req }) => {
  safeRevalidate(['/'], req.payload.logger)
  return doc
}

/**
 * Site settings drive the nav, the footer and the contact details on every
 * page, so this clears the whole tree rather than a list of routes.
 */
export const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc, req }) => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    req.payload.logger.warn('Skipped layout revalidation: not running inside a request.')
  }
  return doc
}
