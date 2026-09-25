import Link from 'next/link'
import { EnvelopeSimple, Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { Logo } from './Logo'
import { PILLARS, serviceHref, servicesInPillar } from '@/content/services'
import type { SiteSetting } from '@/payload-types'

const COMPANY = [
  { href: '/services', label: 'All services' },
  { href: '/pricing', label: 'Plans and pricing' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About Hypernet' },
  { href: '/contact', label: 'Contact us' },
  { href: '/contact#support', label: 'Existing customer support' },
]

export function Footer({ settings }: { settings: SiteSetting }) {
  const year = new Date().getFullYear()

  return (
    <footer className="night relative overflow-hidden border-t border-hairline">
      <div className="shell pt-20 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            {settings.footerNote ? (
              <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-slate">
                {settings.footerNote}
              </p>
            ) : null}

            <div className="mt-8 grid gap-3">
              <a
                href={`tel:${settings.phoneHref}`}
                className="inline-flex items-center gap-3 font-display text-2xl font-bold tracking-[-0.03em] text-ink transition-colors hover:text-accent-text"
              >
                <Phone size={20} weight="duotone" aria-hidden="true" className="text-warm" />
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex min-h-6 items-center gap-3 text-[0.9375rem] text-ink/85 transition-colors hover:text-accent-text"
              >
                <EnvelopeSimple size={18} aria-hidden="true" />
                {settings.email}
              </a>
              {settings.whatsapp ? (
                <a
                  href={settings.whatsapp}
                  className="inline-flex min-h-6 items-center gap-3 text-[0.9375rem] text-ink/85 transition-colors hover:text-accent-text"
                >
                  <WhatsappLogo size={18} aria-hidden="true" />
                  WhatsApp us
                </a>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5 lg:gap-6">
            {PILLARS.map((pillar) => (
              <div key={pillar.id}>
                <h2 className="t-meta text-warm-text">{pillar.name}</h2>
                <ul className="mt-5 grid gap-3">
                  {servicesInPillar(pillar.id).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={serviceHref(service.slug)}
                        className="text-[0.9375rem] text-ink/85 transition-colors hover:text-ink"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="t-meta text-slate">Hypernet</h2>
              <ul className="mt-5 grid gap-3">
                {COMPANY.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] text-ink/85 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-hairline pt-7 text-[0.8125rem] text-slate sm:flex-row sm:items-start sm:justify-between">
          <div className="leading-relaxed">
            <p>&copy; {year} Hypernet. Connectivity with a human voice.</p>
            {settings.addressLines?.length ? (
              <p className="mt-1">
                {settings.addressLines.map((entry) => entry.line).filter(Boolean).join(', ')}
              </p>
            ) : null}
          </div>
          {settings.legalLinks?.length ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {settings.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {/* A quiet, full-width use of the approved wordmark finishes the page. */}
      <div aria-hidden="true" className="pointer-events-none mt-10 select-none overflow-hidden">
        <div className="brand-logo-footer mx-auto translate-y-[18%]" />
      </div>
    </footer>
  )
}
