import type { Metadata } from 'next'
import { PAGE_SEO } from '@/content/seo'

export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://hypernet.co.za').origin
export const DEFAULT_SHARE_IMAGE = '/brand/social-card.jpg'

const clean = (value: string) => value.replace(/\s+/g, ' ').trim()
const shorten = (value: string, limit: number) => {
  const text = clean(value)
  if (text.length <= limit) return text
  const cut = text.slice(0, limit - 1)
  const boundary = cut.lastIndexOf(' ')
  return `${cut.slice(0, boundary > limit / 2 ? boundary : cut.length).trimEnd()}…`
}

/** Complete per-page objects avoid shallow inheritance losing social fields. */
export function pageMetadata({
  path,
  title,
  description,
  image,
  imageAlt = 'Hypernet business connectivity, communications and IT services',
  article = false,
  publishedTime,
}: {
  path: string
  title?: string | null
  description?: string | null
  image?: string | null
  imageAlt?: string
  article?: boolean
  publishedTime?: string | null
}): Metadata {
  const reviewed = PAGE_SEO[path]
  const pageTitle = `${shorten(reviewed?.title || title || 'Business Connectivity & IT Services', 48)} | Hypernet`
  let summary = clean(reviewed?.description || description || PAGE_SEO['/'].description)
  // New CMS content gets bounded fallbacks until reviewed copy is supplied.
  if (summary.length < 120) summary += ' Explore practical business connectivity advice and managed services from Hypernet in South Africa.'
  summary = shorten(summary, 155)
  const url = new URL(path, SITE_URL).href
  const shareImage = new URL(image || DEFAULT_SHARE_IMAGE, SITE_URL).href

  return {
    title: { absolute: pageTitle },
    description: summary,
    alternates: { canonical: url },
    openGraph: {
      type: article ? 'article' : 'website',
      locale: 'en_ZA',
      siteName: 'Hypernet',
      title: pageTitle,
      description: summary,
      url,
      images: [{ url: shareImage, width: 1200, height: 630, alt: imageAlt }],
      ...(article && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: summary,
      images: [{ url: shareImage, alt: imageAlt }],
    },
  }
}
