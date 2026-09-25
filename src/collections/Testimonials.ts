import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateTestimonial, revalidateTestimonialDelete } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'business', 'order'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateTestimonial],
    afterDelete: [revalidateTestimonialDelete],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      maxLength: 260,
      admin: {
        description:
          'Three lines maximum on the page. Trim the original rather than running long.',
      },
    },
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'business', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
