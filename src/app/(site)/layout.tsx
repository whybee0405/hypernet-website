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

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hypernet | Connectivity with a Human Voice',
    template: '%s | Hypernet',
  },
  description:
    'Business internet, VoIP, unified communications, contact centre, cybersecurity and integration for South African businesses, designed, installed and supported by Hypernet.',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Hypernet',
    url: siteUrl,
    images: [{ url: '/brand/hero-signal-high.webp', width: 2560, height: 1430 }],
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
          <Nav phone={settings.phone} phoneHref={settings.phoneHref} />
          <main id="main">{children}</main>
          <Footer settings={settings} />
          <WhatsAppButton href={settings.whatsapp} />
        </MotionProvider>
      </body>
    </html>
  )
}
