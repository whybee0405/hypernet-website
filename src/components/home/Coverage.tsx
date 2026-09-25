'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '@/components/site/Reveal'
import { SplitHeading } from '@/components/site/motion'
import type { SiteSetting } from '@/payload-types'

type Metric = NonNullable<SiteSetting['metrics']>[number]

/**
 * South Africa as a living grid of light. The map zooms gently as the section
 * crosses the viewport while the statement holds still over it, which gives
 * the "local team, national reach" point real depth.
 *
 * Verified figures sit under the statement as plain facts, not as a
 * big-number card. Unverified metrics never render: publishing only verified figures is a
 * standing rule for this site, and the gate lives in code.
 */
export function Coverage({
  statement,
  support,
  metrics,
}: {
  statement: string
  support: string
  metrics?: Metric[] | null
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 0.96])
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const verified = (metrics ?? []).filter((metric) => metric.verified)

  return (
    <section ref={ref} className="stay-dark relative isolate overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={{ scale, y }}
        className="absolute inset-0 -z-10 lg:left-[28%]"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/brand/sa-map-poster.webp"
        >
          <source src="/brand/sa-map.webm" type="video/webm" />
          <source src="/brand/sa-map.mp4" type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/sa-map-poster.webp"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#03060f_0%,rgb(3_6_15/0.9)_30%,rgb(3_6_15/0.2)_65%,rgb(3_6_15/0.5))] max-lg:bg-[rgb(3_6_15/0.72)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-surface to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-surface to-transparent" />

      <div className="shell flex min-h-[100svh] flex-col justify-center py-28 lg:py-40">
        <div className="max-w-[40rem]">
          <SplitHeading
            parts={[{ text: statement }]}
            className="font-display text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink"
            stagger={0.025}
          />
          <Reveal delay={0.1}>
            <p className="t-lead mt-7">{support}</p>
          </Reveal>
        </div>

        {verified.length ? (
          <dl className="mt-12 grid max-w-[40rem] border-t border-hairline">
            {verified.map((metric, index) => (
              <Reveal key={metric.id ?? metric.label} delay={0.1 + index * 0.06}>
                <div className="grid gap-1 border-b border-hairline py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dd className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.04em] text-warm-text tabular-nums">
                    {metric.value}
                  </dd>
                  <div>
                    <dt className="font-semibold text-ink">{metric.label}</dt>
                    {metric.detail ? (
                      <p className="pretty mt-1 text-[0.9375rem] leading-relaxed text-slate">{metric.detail}</p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  )
}
