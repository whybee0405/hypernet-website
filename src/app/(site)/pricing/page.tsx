import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from '@phosphor-icons/react/dist/ssr'
import { PageHero } from '@/components/site/PageHero'
import { PlanTable } from '@/components/site/PlanTable'
import { CtaBand } from '@/components/site/CtaBand'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { SERVICES, serviceHref } from '@/content/services'
import { getPlans, getSiteSettings } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Plans and pricing',
  description:
    'Connectivity and VoIP plans for South African businesses, with custom designs for larger and multi-site networks.',
  alternates: { canonical: '/pricing' },
}

const HONESTY = [
  {
    question: 'Why are prices not listed?',
    answer:
      'Pricing depends on what can be installed at your address. A site survey takes one or two days and gives you a fixed price.',
  },
  {
    question: 'What is included in every plan?',
    answer:
      'A site survey, a configured and supported router, standard cabling, traffic prioritisation and line monitoring.',
  },
  {
    question: 'Can we change plans?',
    answer:
      'You can move to a larger plan without renegotiating your contract, and our monitoring usually shows when you need to.',
  },
  {
    question: 'What happens if we cancel?',
    answer:
      'You give written notice, we port your numbers out, and you return any equipment supplied with the plan. The contract sets this out in plain language.',
  },
]

const PRICED_PER_SETUP = SERVICES.filter((service) => !['connectivity', 'voip'].includes(service.slug))

export default async function PricingPage() {
  const [settings, plans] = await Promise.all([getSiteSettings(), getPlans()])

  return (
    <>
      <PageHero
        title="Plans and"
        accent="pricing"
        lead="Three connectivity and VoIP plans for different business sizes. Prices depend on what can be installed at your address, so we quote after a site survey."
      />

      <section className="night">
        <div className="shell pb-24 lg:pb-32">
          <PlanTable plans={plans} />
          <p className="mt-6 max-w-[64ch] text-[0.875rem] leading-relaxed text-slate">
            Line speeds are the maximum available on each plan. We confirm what your address supports
            before quoting. Larger and multi-site networks are designed and quoted individually.
          </p>

          {plans.length ? (
            <div className="mt-20 grid gap-4 md:grid-cols-3">
              {plans.map((plan, index) => (
                <Reveal key={plan.id} delay={index * 0.06}>
                  <div className="card h-full p-7 lg:p-8">
                    <p className="t-meta text-warm-text">{plan.recommended ? 'Most chosen' : 'Plan'}</p>
                    <h2 className="t-card mt-3 text-ink">{plan.name}</h2>
                    <ul className="mt-6 grid gap-3">
                      {plan.includes?.map((entry) => (
                        <li key={entry.id ?? entry.item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-slate">
                          <Check size={15} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-text" />
                          {entry.item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="night border-t border-hairline">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-[60rem]">
              <SplitHeading
                parts={[{ text: 'Other' }, { text: 'services', accent: true }]}
                className="t-section max-w-[14ch] text-ink"
              />
            <p className="t-lead mt-6">
              Security, communications and integration services are priced on the number of users,
              sites and systems. You receive one written quote with no costs added later.
            </p>
          </div>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRICED_PER_SETUP.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 0.05}>
                <Link href={serviceHref(service.slug)} className="card group flex items-center gap-4 p-4 pr-6">
                  <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-sunken">
                    <Image src={service.image.replace('.webp', '-thumb.webp')} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{service.name}</span>
                    <span className="mt-0.5 block text-[0.8125rem] text-slate">Quoted per user, site or system</span>
                  </span>
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" className="shrink-0 text-slate transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dusk">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SplitHeading
                parts={[{ text: 'Pricing' }, { text: 'questions', accent: true }]}
                className="t-section balance text-ink"
              />
            </div>
            <dl className="border-b border-hairline lg:col-span-7 lg:col-start-6">
              {HONESTY.map((item, index) => (
                <Reveal key={item.question} delay={index * 0.04}>
                  <div className="border-t border-hairline py-8">
                    <div>
                      <dt className="font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">{item.question}</dt>
                      <dd className="pretty mt-3 max-w-[62ch] text-[1rem] leading-relaxed text-slate">{item.answer}</dd>
                    </div>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Request a quote"
        body="Send us your address and the number of phone users, and we will reply with the available options and prices."
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
