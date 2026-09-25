import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { getSiteSettings } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Hypernet handles the personal information you give us.',
  alternates: { canonical: '/legal/privacy' },
  robots: { index: false, follow: true },
}

/**
 * PLACEHOLDER. This page states current practice in plain language, but it has
 * not been reviewed against POPIA by anyone qualified to do that. Have it
 * checked before launch, and add the information officer details the Act
 * requires.
 */
export default async function PrivacyPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <PageHero
        title="Privacy"
        accent="policy"
        lead="What personal information we collect, why we hold it, and how to have it changed or removed."
      />
      <section className="dusk">
      <div className="shell py-20 lg:py-28">
        <Reveal delay={0.06}>
          <div className="prose-hypernet mx-auto max-w-[68ch]">
            <p className="rounded-2xl border border-warm/40 bg-warm-soft p-5 text-[0.9375rem]">
              This policy is a draft. It has not yet been reviewed against the Protection of Personal
              Information Act, and the information officer details will be added after review.
            </p>

            <h2>Information we collect</h2>
            <p>
              If you fill in the form on this site, we keep your name, business name, email address,
              phone number, what you told us the enquiry is about, and anything you wrote in the
              message field.
            </p>
            <p>
              If you become a customer, we also hold the details needed to run your service: your
              installation address, the equipment on site, your line configuration and your billing
              details.
            </p>

            <h2>Purpose</h2>
            <p>
              We use it to reply to you, prepare quotes, and run and support your service. We do not
              sell it or send marketing you did not ask for.
            </p>

            <h2>Sharing</h2>
            <p>
              Upstream network and voice providers see what they need to provision and support your
              service. Nobody else does, unless we are required by law to hand something over.
            </p>

            <h2>Retention</h2>
            <p>
              Enquiries that do not become customers are removed after two years. Customer records
              are kept for as long as the service runs, and afterwards for the period the relevant
              tax and telecommunications regulations require.
            </p>

            <h2>Corrections and deletion</h2>
            <p>
              Email <a href={`mailto:${settings.email}`}>{settings.email}</a> or phone{' '}
              <a href={`tel:${settings.phoneHref}`}>{settings.phone}</a> and ask. You are entitled to
              see what we hold about you, correct it, and in most cases have it deleted.
            </p>

            <h2>Cookies</h2>
            <p>
              This site does not set advertising or tracking cookies. If analytics are added later,
              this page will be updated before they go live.
            </p>
          </div>
        </Reveal>
      </div>
      </section>
    </>
  )
}
