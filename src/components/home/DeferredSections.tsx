import { CaseStudyRail } from './CaseStudyRail'
import { InsightsStrip } from './InsightsStrip'
import { getCaseStudies, getPosts } from '@/lib/payload'

/**
 * The two below-the-fold sections that own their own queries.
 *
 * Keeping these out of the page's top-level await means the hero and the rest
 * of the page stream immediately instead of waiting on the slowest query in the
 * set. Each is wrapped in Suspense on the page with the matching skeleton
 * below, so the reserved space is the right shape and nothing shifts when the
 * real content arrives.
 *
 * Route-level loading.tsx is deliberately not used anywhere on this site: a
 * loading boundary above a page that can call notFound() flushes a 200 before
 * the page resolves, which turns every missing article into a soft 404.
 */

export async function DeferredCaseStudies() {
  const caseStudies = await getCaseStudies({ limit: 6, featured: true })
  return <CaseStudyRail caseStudies={caseStudies} />
}

export async function DeferredInsights() {
  const posts = await getPosts({ limit: 4 })
  return <InsightsStrip posts={posts} />
}

export function RailSkeleton() {
  return (
    <section className="night py-24 lg:py-36" aria-hidden="true">
      <div className="shell">
        <div className="skeleton h-11 w-full max-w-[26rem]" />
        <div className="skeleton mt-3 h-11 w-full max-w-[20rem]" />
      </div>
      <div className="mt-12 flex gap-5 overflow-hidden px-6 lg:mt-14 lg:px-[4.5rem]">
        {[0, 1, 2].map((index) => (
          <div key={index} className="w-[400px] shrink-0">
            <div className="skeleton aspect-[16/10] w-full" />
            <div className="skeleton mt-6 h-3 w-24" />
            <div className="skeleton mt-4 h-5 w-full" />
            <div className="skeleton mt-3 h-4 w-11/12" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function InsightsSkeleton() {
  return (
    <section className="dusk shell py-24 lg:py-36" aria-hidden="true">
      <div className="skeleton h-11 w-full max-w-[24rem]" />
      <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="skeleton aspect-[16/9] w-full" />
          <div className="skeleton mt-6 h-3 w-24" />
          <div className="skeleton mt-4 h-6 w-4/5" />
        </div>
        <div className="lg:col-span-5">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex gap-5 border-t border-hairline py-6">
              <div className="skeleton h-24 w-32 shrink-0" />
              <div className="flex-1">
                <div className="skeleton h-3 w-20" />
                <div className="skeleton mt-3 h-4 w-full" />
                <div className="skeleton mt-2 h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
