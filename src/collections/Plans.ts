import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePlan, revalidatePlanDelete } from '../hooks/revalidate'

export const Plans: CollectionConfig = {
  slug: 'plans',
  labels: { singular: 'Plan', plural: 'Plans' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'downstream', 'voipLines', 'order'],
    group: 'Content',
    description:
      'Plan specifications and pricing must be confirmed with Hypernet before they go live.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidatePlan],
    afterDelete: [revalidatePlanDelete],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'audience',
      type: 'text',
      required: true,
      admin: { description: 'Who this is sized for. e.g. "Two to five people, one location."' },
    },
    {
      name: 'downstream',
      type: 'text',
      required: true,
      label: 'Connectivity',
      admin: { description: 'e.g. "Up to 50 Mbps"' },
    },
    {
      name: 'voipLines',
      type: 'text',
      required: true,
      label: 'VoIP lines',
    },
    {
      name: 'support',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Business hours"' },
    },
    {
      name: 'price',
      type: 'text',
      admin: {
        description:
          'Leave blank to show "Priced on your setup". Never publish a price that has not been confirmed.',
      },
    },
    {
      name: 'priceNote',
      type: 'text',
      admin: { description: 'e.g. "per month, excl. VAT"' },
    },
    {
      name: 'includes',
      type: 'array',
      label: 'What is included',
      minRows: 2,
      maxRows: 6,
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'recommended',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Only one plan should carry this.' },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Low numbers sort first.' },
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Tick only once Hypernet has signed off on these figures. Unverified plans stay out of the public plan table.',
      },
    },
  ],
}
