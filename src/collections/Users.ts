import type { CollectionConfig } from 'payload'
import { adminsOnly, authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Team',
  },
  access: {
    read: authenticated,
    create: adminsOnly,
    update: authenticated,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'jobTitle',
      type: 'text',
      admin: {
        description: 'Shown on articles this person authors.',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
