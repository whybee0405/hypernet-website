import type { Field } from 'payload'

/**
 * Lightweight SEO group. Deliberately not the full plugin-seo surface:
 * the marketing team only needs title, description and a share image.
 */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'Search & social',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Falls back to the page title. Aim for 50 to 60 characters.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Shown in search results. Aim for 140 to 160 characters.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Share card image, 1200x630. Falls back to the main image.',
      },
    },
  ],
}
