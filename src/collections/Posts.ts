import type { CollectionConfig } from 'payload'
import { anyone, authenticated, publishedOrAuthenticated } from '../access'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { previewPath } from '../lib/preview'
import { revalidatePost, revalidatePostDelete } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => previewPath({ collectionPath: 'insights', slug: data?.slug }),
    },
    preview: (data) => previewPath({ collectionPath: 'insights', slug: data?.slug as string }),
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
    },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidatePostDelete],
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 220,
      admin: {
        description: 'One or two plain sentences. Shown on cards and in search results.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'connectivity',
      options: [
        { label: 'Connectivity', value: 'connectivity' },
        { label: 'VoIP', value: 'voip' },
        { label: 'Support', value: 'support' },
        { label: 'Running a business', value: 'business' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'readingMinutes',
      type: 'number',
      min: 1,
      max: 60,
      admin: {
        position: 'sidebar',
        description: 'Rounded reading time in minutes.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured articles lead the blog index and the homepage strip.',
      },
    },
    slugField('title'),
    seoField,
  ],
}
