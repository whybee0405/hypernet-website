import type { CollectionConfig } from 'payload'
import { authenticated, publishedOrAuthenticated } from '../access'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { previewPath } from '../lib/preview'
import { revalidateCaseStudy, revalidateCaseStudyDelete } from '../hooks/revalidate'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case study',
    plural: 'Case studies',
  },
  admin: {
    useAsTitle: 'client',
    defaultColumns: ['client', 'sector', 'location', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => previewPath({ collectionPath: 'case-studies', slug: data?.slug }),
    },
    preview: (data) =>
      previewPath({ collectionPath: 'case-studies', slug: data?.slug as string }),
  },
  versions: {
    drafts: { autosave: { interval: 375 } },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [revalidateCaseStudy],
    afterDelete: [revalidateCaseStudyDelete],
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'client',
      type: 'text',
      required: true,
      admin: { description: 'The business name, exactly as they want it written.' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'The outcome in one line. Not the client name again.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 240,
    },
    {
      name: 'sector',
      type: 'select',
      required: true,
      defaultValue: 'retail',
      options: [
        { label: 'Retail', value: 'retail' },
        { label: 'Professional services', value: 'professional' },
        { label: 'Logistics & operations', value: 'logistics' },
        { label: 'Ecommerce', value: 'ecommerce' },
        { label: 'Hospitality', value: 'hospitality' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: { position: 'sidebar', description: 'Town or city, province.' },
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Fibre connectivity', value: 'fibre' },
        { label: 'Wireless connectivity', value: 'wireless' },
        { label: 'LTE failover', value: 'failover' },
        { label: 'VoIP lines', value: 'voip' },
        { label: 'Managed network', value: 'managed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'challenge',
      type: 'richText',
      required: true,
      label: 'What was going wrong',
    },
    {
      name: 'approach',
      type: 'richText',
      required: true,
      label: 'What we did',
    },
    {
      name: 'outcome',
      type: 'richText',
      required: true,
      label: 'Where it landed',
    },
    {
      name: 'results',
      type: 'array',
      label: 'Result figures',
      maxRows: 3,
      admin: {
        description:
          'Only publish figures the client has signed off on. Leave empty rather than estimating.',
      },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "4 hours"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "From call to fix"' } },
      ],
    },
    {
      name: 'quote',
      type: 'group',
      label: 'Client quote',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          maxLength: 260,
          admin: { description: 'Keep it to three lines or fewer. Trim, do not paraphrase.' },
        },
        { name: 'name', type: 'text' },
        { name: 'role', type: 'text' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Featured case studies appear on the homepage.' },
    },
    slugField('client'),
    seoField,
  ],
}
