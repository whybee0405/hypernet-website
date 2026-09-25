import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

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
        { label: 'Dragon Guard', value: 'dragon-guard' },
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
