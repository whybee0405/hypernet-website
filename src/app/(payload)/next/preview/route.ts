import { draftMode, headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Turns on Next draft mode for an authenticated editor.
 *
 * Two gates, both required. The shared secret stops the endpoint being hit
 * from a guessed URL, and the Payload session check means a leaked secret on
 * its own still cannot expose unpublished work. The admin's live preview links
 * point here, so previewing a draft is the only way the site renders one.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const secret = searchParams.get('previewSecret')

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview secret.', { status: 403 })
  }

  // Only same-origin relative paths. Prevents this being used as an open redirect.
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid preview path.', { status: 400 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await nextHeaders() })

  if (!user) {
    return new Response('You must be signed in to preview drafts.', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
