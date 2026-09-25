import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { CtaBand } from '@/components/site/CtaBand'
import { Duotone } from '@/components/site/Duotone'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { getCaseStudies, getSiteSettings } from '@/lib/payload'
import { SECTOR_LABELS, cn, mediaAlt, mediaUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Hypernet installations for South African businesses: the problem, the approach and the result.',
  alternates: { canonical: '/case-studies' },
}

export default async function CaseStudiesPage() {
  const [caseStudies, settings] = await Promise.all([getCaseStudies({ limit: 30 }), getSiteSettings()])

  return (
    <>
      <PageHero
        title="Case"
        accent="studies"
        lead="Installations we have completed: the problem, what we changed and the result. Figures are published only with client approval."
      />

      <section className="night">
        <div className="shell pb-24 lg:pb-36">
          {caseStudies.length === 0 ? (
            <Reveal>
              <div className="card p-10 text-center">
                <h2 className="t-card text-ink">No case studies yet</h2>
                <p className="pretty mx-auto mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-slate">
                  Case studies are published after client approval.
                </p>
                <Link href="/contact" className="btn btn-primary mt-7">
                  Contact us
                </Link>
              </div>
            </Reveal>
          ) : (
            <ul className="grid gap-5 lg:grid-cols-12">
              {caseStudies.map((study, index) => {
                // Rows alternate 7/5 then 5/7 so emphasis moves side to side.
                const rowIsEven = Math.floor(index / 2) % 2 === 0
                const wide = rowIsEven === (index % 2 === 0)
                return (
                  <Reveal as="li" key={study.id} delay={(index % 2) * 0.06} className={wide ? 'lg:col-span-7' : 'lg:col-span-5'}>
                    <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                      <article className="card flex h-full flex-col overflow-hidden">
                        <Duotone
                          src={mediaUrl(study.heroImage, 'feature')}
                          alt={mediaAlt(study.heroImage, study.client)}
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className={cn(wide ? 'aspect-[16/9]' : 'aspect-[4/3] lg:aspect-auto lg:h-[min(42vw,420px)]')}
                        />
                        <div className="flex flex-1 flex-col p-7 lg:p-9">
                          <div className="flex items-center justify-between gap-4">
                            <span className="chip">{SECTOR_LABELS[study.sector] ?? study.sector}</span>
                            <ArrowUpRight
                              size={20}
                              weight="bold"
                              aria-hidden="true"
                              className="text-slate transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm"
                            />
                          </div>
                          <h2 className="mt-6 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                            {study.title}
                          </h2>
                          <p className="pretty mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate">{study.summary}</p>
                          <p className="mt-6 border-t border-hairline pt-5 text-[0.875rem] font-semibold text-ink">
                            {study.client}
                            <span className="ml-2 font-normal text-slate">{study.location}</span>
                          </p>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <CtaBand
        heading="Discuss your setup"
        body="Describe the problem and we will tell you whether we have solved something similar before."
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
