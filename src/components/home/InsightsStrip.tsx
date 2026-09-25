import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Duotone } from '@/components/site/Duotone'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { CATEGORY_LABELS, formatDateShort, mediaAlt, mediaUrl } from '@/lib/utils'
import type { Post } from '@/payload-types'

/**
 * One lead article, then a list. On paper, so the page changes register
 * before it ends.
 */
export function InsightsStrip({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  const [lead, ...rest] = posts

  return (
    <section className="dusk">
      <div className="shell py-24 lg:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitHeading
            parts={[{ text: 'Latest' }, { text: 'insights', accent: true }]}
            className="t-section balance text-ink"
          />
          <Link href="/insights" className="link-arrow pb-2">
            All insights
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <Link href={`/insights/${lead.slug}`} className="group block">
              <article>
                <Duotone
                  src={mediaUrl(lead.heroImage, 'feature')}
                  alt={mediaAlt(lead.heroImage, lead.title)}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="aspect-[16/9] rounded-card"
                />
                <p className="t-meta mt-7 text-warm-text">
                  {CATEGORY_LABELS[lead.category] ?? lead.category}, {formatDateShort(lead.publishedAt)}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink transition-colors group-hover:text-accent-text">
                  {lead.title}
                </h3>
                <p className="pretty mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-slate">{lead.excerpt}</p>
              </article>
            </Link>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-5">
            <ul className="border-b border-hairline">
              {rest.slice(0, 3).map((post) => (
                <li key={post.id} className="border-t border-hairline">
                  <Link href={`/insights/${post.slug}`} className="group flex gap-5 py-7">
                    <span className="min-w-0 flex-1">
                      <span className="t-meta block text-slate">
                        {CATEGORY_LABELS[post.category] ?? post.category}, {formatDateShort(post.publishedAt)}
                      </span>
                      <span className="mt-2.5 block font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.03em] text-ink transition-colors group-hover:text-accent-text">
                        {post.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-slate transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm-text"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
