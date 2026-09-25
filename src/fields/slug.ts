import type { Field } from 'payload'

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * URL slug that auto-fills from a source field but stays editable.
 * Slugs are part of the SEO surface, so they are never rewritten once set.
 */
export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
    description: 'Used in the URL. Changing this breaks existing links and search rankings.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data, operation }) => {
        if (typeof value === 'string' && value.length > 0) return slugify(value)

        const source = data?.[sourceField]
        if (operation === 'create' && typeof source === 'string') return slugify(source)

        return value
      },
    ],
  },
})
