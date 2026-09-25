import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateSiteSettings } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Settings' },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateSiteSettings] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text', required: true },
            { name: 'phoneHref', type: 'text', required: true, admin: { description: 'e.g. +27115551234' } },
            { name: 'email', type: 'email', required: true },
            { name: 'whatsapp', type: 'text', admin: { description: 'Full https:// link. Optional.' } },
            {
              name: 'supportHours',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "Mon to Fri, 07:00 to 19:00. After-hours on Priority plans."' },
            },
            {
              name: 'addressLines',
              type: 'array',
              maxRows: 4,
              fields: [{ name: 'line', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Proof figures',
          description:
            'These numbers appear on the homepage. Publish nothing here that Hypernet has not verified in writing.',
          fields: [
            {
              name: 'metricsStatement',
              type: 'textarea',
              required: true,
              maxLength: 180,
              admin: {
                description:
                  'The claim the band leads with. This is a statement of how Hypernet works, not a measurement, so it does not need sign-off.',
              },
            },
            {
              name: 'metricsSupport',
              type: 'textarea',
              required: true,
              maxLength: 240,
              admin: { description: 'One short supporting paragraph.' },
            },
            {
              name: 'metrics',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              fields: [
                { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "99.9%"' } },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: { description: 'Uppercase caption. e.g. "NETWORK UPTIME"' },
                },
                { name: 'detail', type: 'text', admin: { description: 'One short clarifying line.' } },
                {
                  name: 'verified',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description:
                      'Unverified figures are hidden from the live site. This is deliberate.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Trust',
          description:
            'Regulatory registrations and accreditations. Mark an entry verified only once Hypernet has supplied written confirmation and the certificate or membership number. Unverified entries display with an "In progress" label.',
          fields: [
            {
              name: 'trustHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'trustIntro',
              type: 'textarea',
              required: true,
              maxLength: 200,
            },
            {
              name: 'accreditations',
              type: 'array',
              minRows: 1,
              maxRows: 8,
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "ICASA registration"' },
                },
                {
                  name: 'detail',
                  type: 'text',
                  admin: { description: 'e.g. registration or membership number, once issued.' },
                },
                {
                  name: 'verified',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description:
                      'Ticked entries show a confirmed badge. Unticked entries show "In progress" instead of being hidden.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerNote',
              type: 'textarea',
              maxLength: 240,
              admin: { description: 'One short paragraph under the wordmark.' },
            },
            {
              name: 'legalLinks',
              type: 'array',
              maxRows: 5,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
