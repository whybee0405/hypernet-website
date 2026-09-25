'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Check } from '@phosphor-icons/react/dist/ssr'
import { SplitHeading } from '@/components/site/motion'
import type { ServicePackage } from '@/content/services'

/**
 * Packages as a cascading card stack. Each card pins a little lower than the
 * one before it, so the cards pile up as you scroll and the ones underneath
 * recede slightly. The packages are layers of one service, read in order.
 */
export function PackageStack({
  id,
  heading,
  intro,
  packages,
}: {
  id?: string
  heading: string
  intro: string
  packages: ServicePackage[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id={id} className="dusk relative scroll-mt-24">
      <div className="shell py-24 lg:py-36">
        <div className="max-w-[60rem]">
            <SplitHeading parts={[{ text: heading }]} className="t-section balance max-w-[16ch] text-ink" />
          <p className="t-lead mt-6">{intro}</p>
        </div>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {packages.map((pack, index) => (
            <PackageCard
              key={pack.name}
              pack={pack}
              index={index}
              total={packages.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PackageCard({
  pack,
  index,
  total,
  progress,
}: {
  pack: ServicePackage
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // Every card after this one pushes it back a little further.
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.035])
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - index) * 0.18])

  return (
    <div
      className="sticky mb-6 last:mb-0"
      style={{ top: `calc(7rem + ${index * 28}px)` }}
    >
      <motion.article
        style={{ scale }}
        className="night relative origin-top overflow-hidden rounded-[28px] border border-hairline-strong shadow-[0_30px_80px_-40px_rgb(10_15_34/0.7)]"
      >
        <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
          <div className="lg:col-span-6">
            {pack.tag ? <span className="chip">{pack.tag}</span> : null}
            <h3 className="mt-6 font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
              {pack.name}
            </h3>
            <p className="accent-word mt-4 text-[clamp(1.25rem,1.8vw,1.6rem)] leading-snug text-warm-text">
              {pack.summary}
            </p>
          </div>
          <ul className="grid content-center gap-4 lg:col-span-6">
            {pack.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 border-t border-hairline pt-4 text-[1rem] leading-relaxed text-ink/90 first:border-t-0 first:pt-0"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                  <Check size={13} weight="bold" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-surface" />
      </motion.article>
    </div>
  )
}
