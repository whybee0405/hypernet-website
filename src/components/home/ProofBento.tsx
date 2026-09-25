import Image from 'next/image'
import { SplitHeading } from '@/components/site/motion'
import { Reveal } from '@/components/site/Reveal'
import { cn } from '@/lib/utils'
import type { HomePage } from '@/payload-types'

type Point = NonNullable<HomePage['proofPoints']>[number]

/**
 * Why people stay, as a bento. The first point takes the large tile with the
 * VoIP render; the installation tile carries the fibre render; the rest are
 * plain text tiles, so the grid has variety without icon badges.
 */
export function ProofBento({ heading, points }: { heading: string; points: Point[] }) {
  if (points.length === 0) return null
  const [first, ...rest] = points

  return (
    <section className="dusk">
      <div className="shell py-24 lg:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitHeading parts={[{ text: heading }]} className="t-section balance max-w-[14ch] text-ink" />
        </div>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:grid-rows-2">
          <Reveal className="lg:col-span-6 lg:row-span-2">
            <article className="stay-dark relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden rounded-card p-8 lg:p-10">
              <Image
                src="/brand/people/team-service-desk.webp"
                alt="Hypernet service desk agents working at their desks in the Sandton office at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-[50%_40%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050915] via-[#050915]/70 via-35% to-[#050915]/10" />
              <div className="relative">
                <h3 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                  {first.title}
                </h3>
                <p className="pretty mt-4 max-w-[44ch] text-[1rem] leading-relaxed text-slate">{first.body}</p>
              </div>
            </article>
          </Reveal>

          {rest.map((point, index) => (
            <Reveal
              key={point.id ?? point.title}
              delay={0.06 * (index + 1)}
              // Fill the 6x2 right half whatever the count: two tiles stack
              // full width, three become two-plus-one, four make a 2x2.
              className={cn(
                rest.length <= 2 || (rest.length === 3 && index === 2)
                  ? 'lg:col-span-6'
                  : 'lg:col-span-3',
              )}
            >
              <article className={cn('card relative flex h-full min-h-[210px] flex-col justify-end overflow-hidden p-7 lg:p-8', index === 0 && 'stay-dark')}>
                {index === 0 ? (
                  <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[45%]">
                    <Image
                      src="/brand/connectivity.webp"
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 45vw, 22vw"
                      className="render-mask object-cover opacity-80"
                    />
                  </div>
                ) : null}
                <div className={cn('relative', index === 0 ? 'max-w-[55%]' : 'max-w-[40ch]')}>
                  <h3 className="t-card text-ink">{point.title}</h3>
                  <p className="pretty mt-3 text-[0.9375rem] leading-relaxed text-slate">{point.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
