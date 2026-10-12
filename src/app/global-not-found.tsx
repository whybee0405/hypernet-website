import type { Metadata } from 'next'
import Link from 'next/link'
import { Archivo, Instrument_Sans } from 'next/font/google'
import { Logo } from '@/components/site/Logo'
import './(site)/globals.css'

/**
 * 404 for URLs that match no route at all. The app has two root layouts (the
 * site and the Payload admin), so there is no single layout for a normal
 * not-found.tsx to render inside; this page ships its own document. It is
 * deliberately static: no CMS query, no client JavaScript.
 */

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' })
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Page not found | Hypernet',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="en-ZA" className={`${archivo.variable} ${instrumentSans.variable}`}>
      <body className="night min-h-screen antialiased">
        <header className="shell flex h-24 items-center">
          <Link href="/" aria-label="Hypernet home">
            <Logo />
          </Link>
        </header>
        <main className="relative isolate flex min-h-[calc(100svh-6rem)] items-center overflow-hidden pb-24">
          <div className="shell">
            <h1 className="t-display balance max-w-[16ch] text-ink">
              Page <span className="accent-word">not found</span>
            </h1>
            <p className="t-lead mt-7">
              The link may be out of date or mistyped. Use the links below to continue.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="btn btn-primary">
                Back to the homepage
              </Link>
              <Link href="/services" className="btn btn-secondary">
                View services
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
