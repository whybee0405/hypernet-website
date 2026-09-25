import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { CtaBand } from '@/components/site/CtaBand'
import { Duotone } from '@/components/site/Duotone'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { getPosts, getSiteSettings } from '@/lib/payload'
import { CATEGORY_LABELS, formatDate, mediaAlt, mediaUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Articles on connectivity, VoIP and security for South African businesses, written by Hypernet engineers.',
  alternates: { canonical: '/insights' },
}

export default async function InsightsPage() {
  const [posts, settings] = await Promise.all([getPosts({ limit: 30 }), getSiteSettings()])
  const [lead, ...rest] = posts

  return (
    <>
      <PageHero
        title="Insights and"
        accent="guides"
        lead="Practical articles on connectivity, phones and security for South African businesses, written by our engineers and service desk."
      />

      <section className="night">
        <div className="shell pb-24 lg:pb-32">
          {posts.length === 0 ? (
            <Reveal>
              <div className="card p-10 text-center">
                <h2 className="t-card text-ink">No articles yet</h2>
                <p className="pretty mx-auto mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-slate">
                  New articles will be published here. For an answer now, call our service desk.
                </p>
                <Link href="/contact" className="btn btn-primary mt-7">
                  Contact us
                </Link>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <Link href={`/insights/${lead.slug}`} className="group block">
                <article className="card grid overflow-hidden lg:grid-cols-12">
                  <Duotone
                    src={mediaUrl(lead.heroImage, 'feature')}
                    alt={mediaAlt(lead.heroImage, lead.title)}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                    className="aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]"
                  />
                  <div className="flex flex-col justify-center p-8 lg:col-span-5 lg:p-12">
                    <p className="t-meta text-warm-text">
                      Latest, {CATEGORY_LABELS[lead.category] ?? lead.category}
                    </p>
                    <h2 className="mt-5 font-display text-[clamp(1.75rem,2.8vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink transition-colors group-hover:text-accent-text">
                      {lead.title}
                    </h2>
                    <p className="pretty mt-5 text-[1rem] leading-relaxed text-slate">{lead.excerpt}</p>
                    <p className="t-meta mt-8 text-slate">
                      {formatDate(lead.publishedAt)}
                      {lead.readingMinutes ? `, ${lead.readingMinutes} min read` : ''}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {rest.length ? (
        <section className="dusk">
          <div className="shell py-20 lg:py-28">
            <ul className="grid gap-x-14 border-b border-hairline md:grid-cols-2">
              {rest.map((post, index) => (
                <Reveal as="li" key={post.id} delay={(index % 2) * 0.05}>
                  <Link href={`/insights/${post.slug}`} className="group block border-t border-hairline py-9">
                    <article className="flex gap-6">
                      <Duotone
                        src={mediaUrl(post.heroImage, 'thumbnail')}
                        alt={mediaAlt(post.heroImage, post.title)}
                        sizes="144px"
                        className="hidden h-28 w-36 shrink-0 rounded-2xl sm:block"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="t-meta text-warm-text">
                          {CATEGORY_LABELS[post.category] ?? post.category}, {formatDate(post.publishedAt)}
                        </p>
                        <h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.035em] text-ink transition-colors group-hover:text-accent-text">
                          {post.title}
                        </h3>
                        <p className="pretty mt-2.5 text-[0.9375rem] leading-relaxed text-slate">{post.excerpt}</p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        weight="bold"
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-slate transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </article>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        heading="Ask our team"
        body="Describe the problem and we will tell you the likely cause before we discuss a quote."
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
