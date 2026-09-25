import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Media } from '../payload-types'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

type MediaLike = number | Media | null | undefined

/** Payload relationships come back as an id or a populated doc depending on depth. */
export const asMedia = (value: MediaLike): Media | null =>
  value && typeof value === 'object' ? value : null

const SERVER_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').origin
  } catch {
    return ''
  }
})()

/**
 * Payload serves uploads from an absolute URL built on serverURL. Rewriting
 * our own origin to a relative path lets next/image optimise it without a
 * remotePatterns entry, and keeps the markup origin-agnostic across
 * environments. URLs on any other host are left alone, so moving uploads to
 * object storage later needs no change here beyond next.config.
 */
const toSameOriginPath = (url: string): string => {
  if (!url || url.startsWith('/')) return url
  try {
    const parsed = new URL(url)
    return parsed.origin === SERVER_ORIGIN ? `${parsed.pathname}${parsed.search}` : url
  } catch {
    return url
  }
}

export const mediaUrl = (value: MediaLike, size?: keyof NonNullable<Media['sizes']>): string => {
  const media = asMedia(value)
  if (!media) return ''
  const sized = size ? (media.sizes?.[size]?.url as string | undefined) : undefined
  return toSameOriginPath(sized || media.url || '')
}

export const mediaAlt = (value: MediaLike, fallback = ''): string => asMedia(value)?.alt ?? fallback

export const formatDate = (value?: string | null): string => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Johannesburg',
  }).format(new Date(value))
}

export const formatDateShort = (value?: string | null): string => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Johannesburg',
  }).format(new Date(value))
}

export const CATEGORY_LABELS: Record<string, string> = {
  connectivity: 'Connectivity',
  voip: 'VoIP',
  support: 'Support',
  business: 'Running a business',
}

export const SECTOR_LABELS: Record<string, string> = {
  retail: 'Retail',
  professional: 'Professional services',
  logistics: 'Logistics & operations',
  ecommerce: 'Ecommerce',
  hospitality: 'Hospitality',
}

export const SERVICE_LABELS: Record<string, string> = {
  fibre: 'Fibre',
  wireless: 'Wireless',
  failover: 'LTE failover',
  voip: 'VoIP lines',
  managed: 'Managed network',
}
