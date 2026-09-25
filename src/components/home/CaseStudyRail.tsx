import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Duotone } from '@/components/site/Duotone'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { SECTOR_LABELS, mediaAlt, mediaUrl } from '@/lib/utils'
import type { CaseStudy } from '@/payload-types'

/**
 * Case studies as a sideways rail that bleeds past the shell. Pure CSS
 * scroll-snap, so trackpad, touch and keyboard all work without handlers.
 */
export function CaseStudyRail({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (caseStudies.length === 0) return null

  return (
    <section className="night py-24 lg:py-36">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitHeading
            parts={[{ text: 'Case' }, { text: 'studies', accent: true }]}
            className="t-section balance text-ink"
          />
          <Link href="/case-studies" className="link-arrow pb-2">
            All case studies
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <Reveal>
        <ul
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8 lg:mt-16 lg:scroll-px-14 lg:px-14 [scrollbar-width:none]"
          data-lenis-prevent-wheel
        >
          {caseStudies.map((study) => (
            <li key={study.id} className="w-[84vw] max-w-[460px] shrink-0 snap-start sm:w-[60vw] lg:w-[460px]">
              <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                <article className="card flex h-full flex-col overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1">
                  <Duotone
                    src={mediaUrl(study.heroImage, 'card')}
                    alt={mediaAlt(study.heroImage, study.client)}
                    sizes="(max-width: 640px) 84vw, 460px"
                    className="aspect-[16/11]"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="chip">{SECTOR_LABELS[study.sector] ?? study.sector}</span>
                      <ArrowUpRight
                        size={18}
                        weight="bold"
                        aria-hidden="true"
                        className="text-slate transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm"
                      />
                    </div>
                    <h3 className="t-card mt-5 text-ink">{study.title}</h3>
                    <p className="pretty mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate">{study.summary}</p>
                    <p className="mt-6 border-t border-hairline pt-5 text-[0.875rem] font-semibold text-ink">
                      {study.client}
                      <span className="mt-0.5 block font-normal text-slate">{study.location}</span>
                    </p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
