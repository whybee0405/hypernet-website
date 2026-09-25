import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { CtaBand } from '@/components/site/CtaBand'
import { PageHero } from '@/components/site/PageHero'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { PILLARS, SERVICE_BY_SLUG, serviceHref, servicesInPillar } from '@/content/services'
import { getSiteSettings } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Business internet, CloudPath SD-WAN, VoIP, unified communications, omni-channel contact centre, Secure Business, Dragon Guard and Integration Suite, managed and supported by Hypernet.',
  alternates: { canonical: '/services' },
}

/** Common problems mapped to the services that solve them. */
const SYMPTOMS = [
  { symptom: 'The internet goes down and trading stops', slugs: ['cloudpath', 'connectivity'] },
  { symptom: 'Calls drop, echo or break up', slugs: ['voip', 'connectivity'] },
  { symptom: 'Staff use separate apps for calls, meetings and chat', slugs: ['unified-communications'] },
  { symptom: 'Customer WhatsApp messages and emails go unanswered', slugs: ['contact-centre'] },
  { symptom: 'Staff need secure remote access', slugs: ['secure-business'] },
  { symptom: 'Fake invoices are being sent from our domain', slugs: ['dragon-guard'] },
  { symptom: 'Staff re-type data between systems', slugs: ['integration-suite'] },
]

export default async function ServicesIndexPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <PageHero
        title="Business technology"
        accent="services"
        lead="Eight services in four areas: connectivity, communication, security and automation. Use one on its own or combine them, with the same support team for all of them."
      />

      {PILLARS.map((pillar, pillarIndex) => {
        const services = servicesInPillar(pillar.id)
        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className={`${pillarIndex % 2 === 1 ? 'dusk' : 'night'} relative scroll-mt-24`}
          >
            <div className="shell py-20 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <h2 className="font-display text-[clamp(2.75rem,4.3vw,4.6rem)] font-bold leading-[0.9] tracking-[-0.05em] text-ink">
                      {pillar.name}
                    </h2>
                    <p className="t-lead mt-6 max-w-[30ch]">{pillar.line}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                  {services.map((service, index) => (
                    <Reveal
                      key={service.slug}
                      delay={index * 0.06}
                      className={services.length === 1 ? 'sm:col-span-2' : services.length === 3 && index === 0 ? 'sm:col-span-2' : undefined}
                    >
                      <Link
                        href={serviceHref(service.slug)}
                        className="stay-dark group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-card border border-hairline"
                      >
                        <Image
                          src={service.image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050915] via-[#050915]/45 to-transparent" />
                        <div className="relative p-7 lg:p-8">
                          <h3 className="flex items-start justify-between gap-4 font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                            {service.name}
                            <ArrowUpRight
                              size={22}
                              weight="bold"
                              aria-hidden="true"
                              className="shrink-0 text-slate transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm"
                            />
                          </h3>
                          <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-slate">{service.short}</p>
                          {service.poweredBy ? (
                            <p className="mt-4 text-[0.8125rem] text-slate/80">Powered by {service.poweredBy}</p>
                          ) : null}
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <section className="night relative overflow-hidden border-t border-hairline">
        <div className="shell py-24 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SplitHeading
                parts={[{ text: 'Where to' }, { text: 'start', accent: true }]}
                className="t-section text-ink"
              />
            </div>
            <ul className="border-b border-hairline lg:col-span-7">
              {SYMPTOMS.map((row, index) => (
                <Reveal as="li" key={row.symptom} delay={index * 0.03}>
                  <div className="grid gap-3 border-t border-hairline py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
                    <p className="font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.025em] text-ink">
                      {row.symptom}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {row.slugs.map((slug) => (
                        <Link
                          key={slug}
                          href={serviceHref(slug)}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline-strong px-4 text-[0.8125rem] font-semibold text-ink transition-colors duration-150 hover:border-warm hover:bg-warm/10"
                        >
                          {SERVICE_BY_SLUG[slug].name}
                          <ArrowRight size={12} weight="bold" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Help choosing a service"
        body="Tell us the problem you want to solve and we will recommend the right service."
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
