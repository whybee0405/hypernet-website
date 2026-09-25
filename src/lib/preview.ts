/**
 * Builds the admin live-preview URL for a drafted document.
 *
 * Kept in one place so the collections cannot drift apart on the query shape,
 * and so the secret is read from a single spot.
 */
export const previewPath = ({
  collectionPath,
  slug,
}: {
  collectionPath: string
  slug?: string | null
}): string => {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const path = `/${collectionPath}/${slug ?? ''}`

  const params = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `${base}/next/preview?${params.toString()}`
}
