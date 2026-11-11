import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

/** Privacy policy section 8: enquiries are kept for up to two years. */
const RETENTION_MS = 2 * 365 * 24 * 60 * 60 * 1000

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'business', 'phone', 'status', 'createdAt'],
    group: 'Team',
  },
  access: {
    // Enquiries are written by the public contact form through the Local API,
    // which bypasses access control. Nothing on the public web can read them.
    read: authenticated,
    create: () => false,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [
      async ({ req, operation }) => {
        if (operation !== 'create') return
        await req.payload.delete({
          collection: 'leads',
          overrideAccess: true,
          where: { createdAt: { less_than: new Date(Date.now() - RETENTION_MS).toISOString() } },
        })
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'business', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    {
      name: 'interest',
      type: 'select',
      required: true,
      defaultValue: 'both',
      options: [
        { label: 'Business internet', value: 'connectivity' },
        { label: 'VoIP', value: 'voip' },
        { label: 'Both', value: 'both' },
        { label: 'CloudPath SD-WAN', value: 'cloudpath' },
        { label: 'Unified Communications', value: 'unified-communications' },
        { label: 'Contact centre', value: 'contact-centre' },
        { label: 'Secure Business', value: 'secure-business' },
        { label: 'HyperGuard', value: 'hyperguard' },
        { label: 'Integration Suite', value: 'integration-suite' },
        { label: 'Something else', value: 'other' },
      ],
    },
    { name: 'message', type: 'textarea' },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'Which page the enquiry came from.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Called back', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
