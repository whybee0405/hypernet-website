import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { RichText } from '@/components/site/RichText'
import { CtaBand } from '@/components/site/CtaBand'
import { Duotone } from '@/components/site/Duotone'
import { Parallax, SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { getCaseStudies, getCaseStudyBySlug, getSiteSettings } from '@/lib/payload'
import { SECTOR_LABELS, SERVICE_LABELS, mediaAlt, mediaUrl } from '@/lib/utils'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const studies = await getCaseStudies({ limit: 100 })
  return studies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) return { title: 'Case study not found' }

  const image = mediaUrl(study.seo?.image ?? study.heroImage, 'og')

  return {
    title: study.seo?.title || `${study.client}: ${study.title}`,
    description: study.seo?.description || study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      type: 'article',
      title: study.seo?.title || `${study.client}: ${study.title}`,
      description: study.seo?.description || study.summary,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const study = await getCaseStudyBySlug(slug, draft)

  if (!study) notFound()

  const [settings, all] = await Promise.all([getSiteSettings(), getCaseStudies({ limit: 6 })])
  const more = all.filter((entry) => entry.id !== study.id).slice(0, 2)

  const sections = [
    { heading: 'The problem', body: study.challenge },
    { heading: 'Our approach', body: study.approach },
    { heading: 'The result', body: study.outcome },
  ]

  const facts = [
    { label: 'Client', value: study.client },
    { label: 'Sector', value: SECTOR_LABELS[study.sector] ?? study.sector },
    { label: 'Location', value: study.location },
    { label: 'Services', value: study.services.map((service) => SERVICE_LABELS[service] ?? service).join(', ') },
  ]

  return (
    <>
      <article className="night">
        <header className="relative isolate overflow-hidden pt-36 lg:pt-44">
          <div className="shell">
            <Reveal>
              <Link href="/case-studies" className="t-meta inline-flex items-center gap-2 text-slate transition-colors hover:text-ink">
                <ArrowLeft size={13} weight="bold" aria-hidden="true" />
                All case studies
              </Link>
            </Reveal>
            <SplitHeading
              as="h1"
              immediate
              delay={0.1}
              parts={[{ text: study.title }]}
              className="t-display balance mt-8 max-w-[18ch] text-[clamp(2.4rem,5vw,4.5rem)] text-ink"
            />
            <Reveal delay={0.3}>
              <p className="t-lead mt-7 max-w-[60ch]">{study.summary}</p>
            </Reveal>

            <Reveal delay={0.4}>
              <dl className="mt-12 grid gap-6 border-t border-hairline pt-7 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="t-meta text-warm-text">{fact.label}</dt>
                    <dd className="mt-2 text-[0.9375rem] font-medium text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        <div className="shell mt-14 lg:mt-16">
          <div className="overflow-hidden rounded-[28px]">
            <Parallax offset={40}>
              <Duotone
                src={mediaUrl(study.heroImage, 'wide')}
                alt={mediaAlt(study.heroImage, study.client)}
                sizes="(max-width: 1480px) 100vw, 1400px"
                priority
                className="aspect-[16/9] scale-110 lg:aspect-[21/9]"
              />
            </Parallax>
          </div>
        </div>

        <div className="shell py-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {sections.map((section, index) => (
                <Reveal key={section.heading}>
                  <section className="border-t border-hairline pb-12 pt-9 first:border-t-0 first:pt-0">
                    <h2 className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-semibold tracking-[-0.035em] text-ink">
                      {section.heading}
                    </h2>
                    <div className="mt-6">
                      <RichText data={section.body as never} />
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="grid gap-4 lg:sticky lg:top-28">
                {study.results?.length ? (
                  <Reveal>
                    <dl className="card grid gap-7 p-7">
                      {study.results.map((result) => (
                        <div key={result.id ?? result.label} className="border-t border-hairline pt-6 first:border-t-0 first:pt-0">
                          <dd className="text-ink font-display text-[2.75rem] font-bold leading-none tracking-[-0.05em]">
                            {result.value}
                          </dd>
                          <dt className="t-meta mt-3 text-slate">{result.label}</dt>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                ) : null}

                {study.quote?.text ? (
                  <Reveal delay={0.08}>
                    <figure className="card p-7">
                      <span aria-hidden="true" className="accent-word block text-[4rem] leading-[0.5] text-warm">
                        &ldquo;
                      </span>
                      <blockquote className="mt-4">
                        <p className="accent-word text-[1.5rem] leading-snug text-ink">{study.quote.text}</p>
                      </blockquote>
                      {study.quote.name ? (
                        <figcaption className="mt-5 text-[0.875rem] leading-snug text-slate">
                          <span className="block font-semibold text-ink">{study.quote.name}</span>
                          {study.quote.role ? (
                            <span className="block">
                              {study.quote.role}, {study.client}
                            </span>
                          ) : null}
                        </figcaption>
                      ) : null}
                    </figure>
                  </Reveal>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </article>

      {more.length > 0 ? (
        <section className="dusk">
          <div className="shell py-20 lg:py-28">
            <h2 className="t-section text-ink">
              More <span className="accent-word">case studies</span>
            </h2>
            <ul className="mt-12 grid gap-5 md:grid-cols-2">
              {more.map((entry, index) => (
                <Reveal as="li" key={entry.id} delay={index * 0.06}>
                  <Link href={`/case-studies/${entry.slug}`} className="group block">
                    <Duotone
                      src={mediaUrl(entry.heroImage, 'card')}
                      alt={mediaAlt(entry.heroImage, entry.client)}
                      sizes="(max-width: 768px) 100vw, 46vw"
                      className="aspect-[16/10] rounded-card"
                    />
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="t-meta text-warm-text">{SECTOR_LABELS[entry.sector] ?? entry.sector}</p>
                        <h3 className="t-card mt-2.5 text-ink transition-colors group-hover:text-accent-text">{entry.title}</h3>
                      </div>
                      <ArrowUpRight size={20} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-slate transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        heading="Discuss your setup"
        body="Describe the problem and we will tell you whether we have solved something similar before."
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
