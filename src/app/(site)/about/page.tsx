import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin } from '@phosphor-icons/react/dist/ssr'
import { PageHero } from '@/components/site/PageHero'
import { CtaBand } from '@/components/site/CtaBand'
import { Parallax, Render, ScrollLitText, SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { TestimonialPanel } from '@/components/home/TestimonialPanel'
import { getSiteSettings, getTestimonials } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'About Hypernet',
  description:
    'Hypernet designs, installs and manages connectivity, communications, security and integration services for businesses across South Africa.',
  alternates: { canonical: '/about' },
}

/** The three brand pillars, written as behaviour. */
const PILLARS = [
  {
    title: 'Reliable',
    body: 'We design backup connections as carefully as primary ones, because they decide how long an outage lasts.',
  },
  {
    title: 'Trustworthy',
    body: 'Clear answers and fair terms. If a fault is ours, we say so. If it is with a third party, we tell you and follow it up.',
  },
  {
    title: 'Innovative',
    body: 'Enterprise-grade platforms from partners such as Cloudflare, Sophos and Flowgear, sized to each business and managed by us.',
  },
]

/** How the company is organised, described by function rather than headcount. */
const TEAMS = [
  {
    title: 'Service desk',
    image: '/brand/people/team-service-desk.webp',
    alt: 'A service desk agent talking with a colleague at her desk in the Sandton office',
    body: 'Logs and triages every support call and message, owns each fault until it is resolved, and keeps customers updated throughout.',
  },
  {
    title: 'Network engineering',
    image: '/brand/people/team-network-engineering.webp',
    alt: 'Two network engineers discussing live network status on a wall of screens',
    body: 'Designs customer networks, monitors lines and services around the clock, and resolves routing and configuration faults remotely.',
  },
  {
    title: 'Field services',
    image: '/brand/people/team-field-services.webp',
    alt: 'A field technician labelling patch cables in a client network cabinet',
    body: 'Surveys sites, installs and documents equipment, and attends on site when a fault needs hands-on work.',
  },
  {
    title: 'Account management',
    image: '/brand/people/team-account-management.webp',
    alt: 'An account manager reviewing plans on a tablet with a warehouse operations manager',
    body: 'Reviews customer services as each business grows and plans new sites, users and upgrades.',
  },
]

export default async function AboutPage() {
  const [settings, testimonials] = await Promise.all([getSiteSettings(), getTestimonials(3)])
  const address = settings.addressLines?.map((entry) => entry.line).filter(Boolean) ?? []

  return (
    <>
      <PageHero
        title="About"
        accent="Hypernet"
        lead="Hypernet designs, installs and manages connectivity, communications, security and integration services for businesses across South Africa, from single sites to multi-branch networks."
        aside={
          <div className="render-stage mx-auto w-full max-w-[440px]">
            <Render src="/brand/voip.webp" priority className="aspect-[4/5] w-full" />
          </div>
        }
      />

      <section className="night">
        <div className="shell py-24 lg:py-36">
          <ScrollLitText
            text="Hypernet was founded to give South African businesses enterprise-grade technology backed by support that responds quickly and fixes faults properly."
            accentWords={['properly.']}
            className="max-w-[28ch] font-display text-[clamp(1.9rem,4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink"
          />
          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-5 lg:col-start-2">
              <p className="text-[1.0625rem] leading-relaxed text-slate">
                That standard runs through every team: the service desk that handles each call, the
                engineers who monitor the network, the technicians who install and repair on site,
                and the account managers who plan each customer's growth.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="text-[1.0625rem] leading-relaxed text-slate">
                Our customers include independent retailers, professional practices, logistics
                operators and e-commerce businesses. As they add staff, sites and systems, their
                services grow with them on the same platforms and the same support agreement.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dusk">
        <div className="shell py-24 lg:py-36">
          <SplitHeading
            parts={[{ text: 'Our' }, { text: 'values', accent: true }]}
            className="t-section balance max-w-[14ch] text-ink"
          />
          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.06}>
                <article className="card h-full p-8 lg:p-10">
                  <h3 className="font-display text-[2.25rem] font-bold tracking-[-0.045em] text-ink">{pillar.title}</h3>
                  <p className="pretty mt-4 max-w-[44ch] text-[1rem] leading-relaxed text-slate">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where we are. The city at night on a slow parallax; a media band, so it
          stays dark in both themes. */}
      <section className="stay-dark relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Parallax offset={90} className="absolute inset-x-0 -inset-y-28">
            <Image src="/brand/city-night.webp" alt="" fill sizes="100vw" className="object-cover" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-surface/10" />
        </div>
        <div className="shell flex min-h-[80svh] items-center py-24">
          <div className="max-w-[36rem]">
            <SplitHeading
              parts={[{ text: 'Head' }, { text: 'office', accent: true }]}
              className="t-section text-ink"
            />
            <p className="t-lead mt-6">
              Our head office, service desk and network engineering team are based in Sandton,
              Johannesburg. We support businesses across South Africa.
            </p>
            {address.length ? (
              <p className="mt-8 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink">
                <MapPin size={20} weight="duotone" aria-hidden="true" className="mt-0.5 shrink-0 text-warm" />
                <span>
                  {address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="night">
        <div className="shell py-24 lg:py-36">
          <SplitHeading
            parts={[{ text: 'Our' }, { text: 'teams', accent: true }]}
            className="t-section max-w-[14ch] text-ink"
          />
          <dl className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20">
            {TEAMS.map((team, index) => (
              <Reveal key={team.title} delay={(index % 2) * 0.05}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sunken">
                  <Image
                    src={team.image}
                    alt={team.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <dt className="mt-6 font-display text-[clamp(1.5rem,2.2vw,1.875rem)] font-semibold tracking-[-0.03em] text-ink">
                  {team.title}
                </dt>
                <dd className="pretty mt-3 max-w-[48ch] text-[1rem] leading-relaxed text-slate">{team.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <TestimonialPanel testimonial={testimonials[2]} />

      <CtaBand
        heading="Contact us"
        body="Call our service desk during business hours, or send a message and our sales team will reply."
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
