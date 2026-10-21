import AsyncBoundary from '@/components/site/AsyncBoundary'
import { pageMetadata } from '@/lib/seo'
import { Suspense } from 'react'
import Link from '@/components/site/SiteLink'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Hero } from '@/components/home/Hero'
import { Manifesto } from '@/components/home/Manifesto'
import { ServicesTrack } from '@/components/home/ServicesTrack'
import { Sectors } from '@/components/home/Sectors'
import { Coverage } from '@/components/home/Coverage'
import { DirectLine } from '@/components/home/DirectLine'
import { ProofBento } from '@/components/home/ProofBento'
import { PlanFinder } from '@/components/home/PlanFinder'
import { TestimonialPanel } from '@/components/home/TestimonialPanel'
import {
  DeferredCaseStudies,
  DeferredInsights,
  InsightsSkeleton,
  RailSkeleton,
} from '@/components/home/DeferredSections'
import { PlanTable } from '@/components/site/PlanTable'
import { CtaBand } from '@/components/site/CtaBand'
import { getHomePage, getPlans, getSiteSettings, getTestimonials } from '@/lib/payload'

export const metadata = pageMetadata({ path: '/' })

export default async function HomePage() {
  const [home, settings, testimonials, plans] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getTestimonials(3),
    getPlans(),
  ])

  return (
    <>
      <Hero
        headlineLead={home.headlineLead}
        headlineAccent={home.headlineAccent}
        subtext={home.subtext}
      />

      <Manifesto />

      <ServicesTrack />

      <Sectors heading={home.sectorsHeading} sectors={home.sectors ?? []} />

      <Coverage
        statement={settings.metricsStatement}
        support={settings.metricsSupport}
        metrics={settings.metrics}
      />

      <DirectLine heading={home.processHeading} intro={home.processIntro} steps={home.process ?? []} />

      <ProofBento heading={home.proofHeading} points={home.proofPoints ?? []} />

      <Suspense fallback={<RailSkeleton />}>
        <AsyncBoundary title="Case studies unavailable"><DeferredCaseStudies /></AsyncBoundary>
      </Suspense>

      <PlanFinder plans={plans} />

      <section className="night">
        <div className="shell pb-24 lg:pb-36">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-hairline pt-14">
            <h2 className="t-card max-w-[30ch] text-ink">
              Connectivity and VoIP plans
            </h2>
            <Link href="/pricing" className="link-arrow">
              Pricing details
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10">
            <PlanTable plans={plans} />
          </div>
        </div>
      </section>

      <TestimonialPanel testimonial={testimonials[0]} />

      <Suspense fallback={<InsightsSkeleton />}>
        <AsyncBoundary title="Insights unavailable"><DeferredInsights /></AsyncBoundary>
      </Suspense>

      <CtaBand
        heading={home.ctaHeading}
        body={home.ctaBody}
        email={settings.email}

      />
    </>
  )
}
