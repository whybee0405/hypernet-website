import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { anyone, authenticated } from '../access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Library',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    // Resolved relative to source in local development. In a container the
    // path is set explicitly, because this file is bundled into .next and
    // import.meta.url no longer points anywhere useful relative to public/.
    staticDir: process.env.MEDIA_DIR || path.resolve(dirname, '../../public/media'),
    // Sizes match the real breakpoints the site renders at, so next/image
    // is never asked to downscale a 4000px original on the fly.
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 768, height: undefined },
      { name: 'feature', width: 1280, height: undefined },
      { name: 'wide', width: 1920, height: undefined },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe what is happening in the image for screen readers. Do not start with "image of".',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional. Only shown where a layout calls for a visible caption.',
      },
    },
  ],
}
