import type { MetadataRoute } from 'next'
import { getCaseStudies, getPosts } from '@/lib/payload'
import { SERVICES } from '@/content/services'

const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([
    getPosts({ limit: 500 }),
    getCaseStudies({ limit: 500 }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, changeFrequency: 'monthly', priority: 0.9 },
    ...SERVICES.map((service) => ({
      url: `${base}/services/${service.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: `${base}/pricing`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/case-studies`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/insights`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.9 },
  ]

  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: `${base}/insights/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...caseStudies.map((study) => ({
      url: `${base}/case-studies/${study.slug}`,
      lastModified: study.updatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
