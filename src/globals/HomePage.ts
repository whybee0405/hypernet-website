import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateHome } from '../hooks/revalidate'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Homepage',
  admin: {
    group: 'Content',
    livePreview: { url: () => `${process.env.NEXT_PUBLIC_SERVER_URL}/` },
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateHome] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'badge',
              type: 'text',
              required: true,
              admin: { description: 'Short uppercase label above the headline.' },
            },
            {
              name: 'headlineLead',
              type: 'text',
              required: true,
              admin: { description: 'First line of the headline, in Ink.' },
            },
            {
              name: 'headlineAccent',
              type: 'text',
              required: true,
              admin: { description: 'Second line, set in Hypernet Blue.' },
            },
            {
              name: 'subtext',
              type: 'textarea',
              required: true,
              maxLength: 160,
              admin: {
                description: 'Twenty words maximum. It has to fit the first screen on a laptop.',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { description: 'Portrait crop. The main parallax layer.' },
            },
            {
              name: 'heroDetailA',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Square detail shot. Floats over the top left of the main image.' },
            },
            {
              name: 'heroDetailB',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Square detail shot. Floats over the bottom right.' },
            },
            {
              name: 'heroCallout',
              type: 'group',
              label: 'Floating callout card',
              fields: [
                { name: 'value', type: 'text', admin: { description: 'e.g. "Third ring"' } },
                { name: 'label', type: 'text', admin: { description: 'e.g. "Average pickup on the support line"' } },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            {
              name: 'sectorsHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'sectors',
              type: 'array',
              minRows: 4,
              maxRows: 8,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'detail', type: 'text', required: true },
              ],
            },
            {
              name: 'servicesHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'servicesIntro',
              type: 'textarea',
              required: true,
              maxLength: 200,
            },
            {
              name: 'services',
              type: 'array',
              minRows: 2,
              maxRows: 2,
              admin: { description: 'The two pillars: connectivity and VoIP.' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true, maxLength: 260 },
                {
                  name: 'points',
                  type: 'array',
                  minRows: 3,
                  maxRows: 4,
                  fields: [{ name: 'point', type: 'text', required: true }],
                },
                { name: 'href', type: 'text', required: true },
                { name: 'linkLabel', type: 'text', required: true },
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
              ],
            },
            {
              name: 'processHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'processIntro',
              type: 'textarea',
              required: true,
              maxLength: 200,
            },
            {
              name: 'process',
              type: 'array',
              minRows: 3,
              maxRows: 4,
              admin: { description: 'The steps of the support process, in order.' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'text', required: true },
              ],
            },
            {
              name: 'proofHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'proofPoints',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true, maxLength: 220 },
              ],
            },
            {
              name: 'proofImageA',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Tall cell in the proof grid.' },
            },
            {
              name: 'proofImageB',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Wide cell in the proof grid.' },
            },
            {
              name: 'ctaHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'ctaBody',
              type: 'textarea',
              required: true,
              maxLength: 200,
            },
          ],
        },
      ],
    },
  ],
}
