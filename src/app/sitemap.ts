import type { MetadataRoute } from 'next'
import { getClient } from '@/lib/payload'
import { PAGE_SEO } from '@/content/seo'
import { SITE_URL } from '@/lib/seo'

// Refresh published CMS entries without requiring a new deployment.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getClient()
  const entries: MetadataRoute.Sitemap = Object.keys(PAGE_SEO)
    .filter((path) => path !== '/thank-you' && !path.startsWith('/insights/') && !path.startsWith('/case-studies/'))
    .map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : 0.7,
    }))

  for (const collection of ['posts', 'case-studies'] as const) {
    let page = 1
    let hasNextPage = true
    while (hasNextPage) {
      const result = await payload.find({
        collection,
        where: { _status: { equals: 'published' } },
        depth: 0,
        limit: 100,
        page,
        sort: 'id',
        draft: false,
      })
      for (const doc of result.docs) {
        entries.push({
          url: `${SITE_URL}/${collection === 'posts' ? 'insights' : 'case-studies'}/${doc.slug}`,
          lastModified: doc.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
      hasNextPage = result.hasNextPage
      page++
    }
  }
  return entries
}
