import type { Metadata } from 'next'
import { Clock, EnvelopeSimple, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { ContactForm } from '@/components/site/ContactForm'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { getSiteSettings } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Contact us',
  description:
    'Contact the Hypernet sales and support teams by phone, email or message.',
  alternates: { canonical: '/contact' },
}

type Props = { searchParams: Promise<{ service?: string | string[] }> }

export default async function ContactPage({ searchParams }: Props) {
  const [settings, query] = await Promise.all([getSiteSettings(), searchParams])
  const service = typeof query.service === 'string' ? query.service : undefined

  return (
    <section className="night relative isolate overflow-hidden pb-24 pt-36 lg:pb-32 lg:pt-44">

      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SplitHeading
              as="h1"
              immediate
              delay={0.1}
              parts={[{ text: 'Contact' }, { text: 'Hypernet', accent: true }]}
              className="t-display text-ink"
            />
            <Reveal delay={0.3}>
              <p className="t-lead mt-7">
                Call us for the fastest response, or send a message and we will call you back.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <a
                href={`tel:${settings.phoneHref}`}
                className="card group mt-10 flex items-center gap-5 p-6 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-warm text-[#1a0b03]">
                  <Phone size={24} weight="fill" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[0.875rem] text-slate">Support line</span>
                  <span className="mt-1 block font-display text-[clamp(1.75rem,3vw,2.4rem)] font-bold tracking-[-0.045em] text-ink">
                    {settings.phone}
                  </span>
                </span>
              </a>

              <dl className="mt-8 grid gap-6">
                <div className="flex items-start gap-4">
                  <EnvelopeSimple size={20} weight="duotone" aria-hidden="true" className="mt-0.5 shrink-0 text-accent-text" />
                  <div>
                    <dt className="t-meta text-slate">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${settings.email}`} className="text-[1.0625rem] font-medium text-ink transition-colors hover:text-accent-text">
                        {settings.email}
                      </a>
                    </dd>
                  </div>
                </div>

                {settings.whatsapp ? (
                  <div className="flex items-start gap-4">
                    <WhatsappLogo size={20} weight="duotone" aria-hidden="true" className="mt-0.5 shrink-0 text-accent-text" />
                    <div>
                      <dt className="t-meta text-slate">WhatsApp</dt>
                      <dd className="mt-1">
                        <a href={settings.whatsapp} className="text-[1.0625rem] font-medium text-ink transition-colors hover:text-accent-text">
                          Message us
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}

                <div id="support" className="flex scroll-mt-28 items-start gap-4 border-t border-hairline pt-6">
                  <Clock size={20} weight="duotone" aria-hidden="true" className="mt-0.5 shrink-0 text-accent-text" />
                  <div>
                    <dt className="t-meta text-slate">Support hours</dt>
                    <dd className="pretty mt-1 text-[0.9375rem] leading-relaxed text-ink">{settings.supportHours}</dd>
                  </div>
                </div>

                {settings.addressLines?.length ? (
                  <div className="flex items-start gap-4 border-t border-hairline pt-6">
                    <MapPin size={20} weight="duotone" aria-hidden="true" className="mt-0.5 shrink-0 text-accent-text" />
                    <div>
                      <dt className="t-meta text-slate">Office</dt>
                      <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
                        {settings.addressLines.map((entry) => (
                          <span key={entry.id ?? entry.line} className="block">
                            {entry.line}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </div>
                ) : null}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <ContactForm source={service ? `/contact?service=${service}` : '/contact'} defaultInterest={service} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
