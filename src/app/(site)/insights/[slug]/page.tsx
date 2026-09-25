import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { RichText } from '@/components/site/RichText'
import { CtaBand } from '@/components/site/CtaBand'
import { Duotone } from '@/components/site/Duotone'
import { ReadingProgress } from '@/components/site/ReadingProgress'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { getPostBySlug, getPosts, getSiteSettings } from '@/lib/payload'
import { CATEGORY_LABELS, asMedia, formatDate, mediaAlt, mediaUrl } from '@/lib/utils'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts({ limit: 100 })
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Article not found' }

  const image = mediaUrl(post.seo?.image ?? post.heroImage, 'og')

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      publishedTime: post.publishedAt,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params
  // Draft mode is only ever on for a signed-in editor coming through the
  // preview route, so this is the one path that may render unpublished work.
  const { isEnabled: draft } = await draftMode()
  const post = await getPostBySlug(slug, draft)

  if (!post) notFound()

  const [settings, sameCategory, recent] = await Promise.all([
    getSiteSettings(),
    getPosts({ limit: 4, category: post.category }),
    getPosts({ limit: 5 }),
  ])

  const author = typeof post.author === 'object' ? post.author : null

  // Same category first, then topped up from the most recent.
  const seen = new Set([post.id])
  const more = [...sameCategory, ...recent]
    .filter((entry) => {
      if (seen.has(entry.id)) return false
      seen.add(entry.id)
      return true
    })
    .slice(0, 2)

  const caption = asMedia(post.heroImage)?.caption

  return (
    <>
      <ReadingProgress />
      <article className="night">
        <header className="relative isolate overflow-hidden pt-36 lg:pt-44">
          <div className="shell">
            <div className="mx-auto max-w-[56rem]">
              <Reveal>
                <Link href="/insights" className="t-meta inline-flex items-center gap-2 text-slate transition-colors hover:text-ink">
                  <ArrowLeft size={13} weight="bold" aria-hidden="true" />
                  All insights
                </Link>
              </Reveal>
              <SplitHeading
                as="h1"
                immediate
                delay={0.1}
                parts={[{ text: post.title }]}
                className="balance mt-8 font-display text-[clamp(2.3rem,4.8vw,4.25rem)] font-bold leading-[1] tracking-[-0.045em] text-ink"
              />
              <Reveal delay={0.3}>
                <p className="t-lead mt-7">{post.excerpt}</p>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline pt-6">
                  <span className="t-meta text-warm-text">{CATEGORY_LABELS[post.category] ?? post.category}</span>
                  {author ? (
                    <span className="t-meta text-slate">
                      {author.name}
                      {author.jobTitle ? `, ${author.jobTitle}` : ''}
                    </span>
                  ) : null}
                  <span className="t-meta text-slate">{formatDate(post.publishedAt)}</span>
                  {post.readingMinutes ? <span className="t-meta text-slate">{post.readingMinutes} min read</span> : null}
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        <div className="shell mt-14">
          <Reveal delay={0.1}>
            <Duotone
              src={mediaUrl(post.heroImage, 'wide')}
              alt={mediaAlt(post.heroImage, post.title)}
              sizes="(max-width: 1480px) 100vw, 1400px"
              priority
              className="aspect-[16/9] rounded-[28px] lg:aspect-[21/9]"
            />
            {caption ? <p className="mt-3 text-[0.8125rem] text-slate">{caption}</p> : null}
          </Reveal>
        </div>

        <div className="shell py-16 lg:py-24">
          <div className="mx-auto max-w-[68ch]">
            <RichText data={post.content as never} />
          </div>
        </div>
      </article>

      {more.length > 0 ? (
        <section className="dusk">
          <div className="shell py-20 lg:py-24">
            <h2 className="t-section text-ink">
              More <span className="accent-word">articles</span>
            </h2>
            <ul className="mt-10 grid gap-x-14 border-b border-hairline md:grid-cols-2">
              {more.map((entry) => (
                <li key={entry.id}>
                  <Link href={`/insights/${entry.slug}`} className="group flex gap-5 border-t border-hairline py-7">
                    <Duotone
                      src={mediaUrl(entry.heroImage, 'thumbnail')}
                      alt={mediaAlt(entry.heroImage, entry.title)}
                      sizes="112px"
                      className="hidden h-20 w-28 shrink-0 rounded-2xl sm:block"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.03em] text-ink transition-colors group-hover:text-accent-text">
                        {entry.title}
                      </span>
                      <span className="t-meta mt-2 block text-slate">{formatDate(entry.publishedAt)}</span>
                    </span>
                    <ArrowUpRight size={18} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-slate transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
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
