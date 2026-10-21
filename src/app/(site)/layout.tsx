import { pageMetadata, SITE_URL } from '@/lib/seo'
import type { Metadata, Viewport } from 'next'
import { Archivo, Instrument_Sans, Spline_Sans_Mono } from 'next/font/google'
import { Nav } from '@/components/site/Nav'
import { Footer } from '@/components/site/Footer'
import { MotionProvider } from '@/components/site/MotionProvider'
import { SmoothScroll } from '@/components/site/SmoothScroll'
import { WhatsAppButton } from '@/components/site/WhatsAppButton'
import { THEME_INIT_SCRIPT } from '@/lib/theme'
import { getSiteSettings } from '@/lib/payload'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const technicalMono = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-technical-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  ...pageMetadata({ path: '/' }),
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f7fc' },
    { media: '(prefers-color-scheme: dark)', color: '#03060f' },
  ],
  colorScheme: 'dark light',
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html
      lang="en-ZA"
      className={`${archivo.variable} ${instrumentSans.variable} ${technicalMono.variable}`}
      data-theme="dark"
      // The inline script below corrects data-theme before paint, so the
      // server and client markup legitimately differ on this one attribute.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <MotionProvider>
          <SmoothScroll />
          <Nav email={settings.email}  />
          <main id="main">{children}</main>
          <Footer settings={settings} />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  )
}
