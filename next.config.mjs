import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits a self-contained server bundle at .next/standalone, which is what the
  // Docker runner stage copies. Harmless outside Docker: `npm start` is
  // unaffected and the normal build output is still produced.
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },
  // Service pages moved under /services when the catalogue grew from two
  // offers to eight. Permanent, so search engines carry the old rankings over.
  async redirects() {
    return [
      { source: '/connectivity', destination: '/services/connectivity', permanent: true },
      { source: '/voip', destination: '/services/voip', permanent: true },
    ]
  },
  experimental: {
    // Two root layouts (site and admin) means unmatched URLs need an app-wide
    // 404 document: src/app/global-not-found.tsx.
    globalNotFound: true,
    optimizePackageImports: ['@phosphor-icons/react', 'motion'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
