import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import {
  lexicalEditor,
  HeadingFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { CaseStudies } from './collections/CaseStudies'
import { Plans } from './collections/Plans'
import { Testimonials } from './collections/Testimonials'
import { Leads } from './collections/Leads'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Hypernet',
      icons: [
        { rel: 'icon', type: 'image/png', url: '/icon.png' },
        { rel: 'apple-touch-icon', type: 'image/png', url: '/apple-icon.png' },
      ],
    },
    components: {
      graphics: {
        Icon: '/components/payload/HypernetIcon',
        Logo: '/components/payload/HypernetLogo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Posts, CaseStudies, Plans, Testimonials, Media, Users, Leads],
  globals: [HomePage, SiteSettings],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      HorizontalRuleFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      BlocksFeature({
        blocks: [
          {
            slug: 'pullQuote',
            labels: { singular: 'Pull quote', plural: 'Pull quotes' },
            fields: [
              { name: 'quote', type: 'textarea', required: true, maxLength: 240 },
              { name: 'attribution', type: 'text' },
            ],
          },
          {
            slug: 'callout',
            labels: { singular: 'Callout', plural: 'Callouts' },
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'body', type: 'textarea', required: true },
            ],
          },
        ],
      }),
    ],
  }),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./hypernet.db',
    },
    // Schema push is a development convenience and the adapter refuses to run
    // it under NODE_ENV=production regardless of this flag. Production, which
    // includes the Docker image, applies the committed migrations in
    // src/migrations instead. Regenerate them with `npm run migrate:create`
    // after any collection or global change.
    push: process.env.NODE_ENV !== 'production',
  }),
  secret: process.env.PAYLOAD_SECRET || 'hypernet-dev-secret-change-me',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  graphQL: {
    disable: false,
  },
  upload: {
    limits: { fileSize: 12_000_000 },
  },
})
