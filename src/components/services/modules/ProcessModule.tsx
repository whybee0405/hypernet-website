'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { SplitHeading } from '@/components/site/motion'

const STEPS: { title: string; body: string}[] = [
  {
    title: 'Assessment',
    body: 'We map your current network, find bottlenecks and single points of failure, and confirm what the business needs.',
  },
  {
    title: 'Design and build',
    body: 'Our engineers design a layered network, usually primary fibre with an automatic wireless backup, sized to your traffic and hardware.',
  },
  {
    title: 'Deployment',
    body: 'We install in stages to keep downtime low, then test throughput at every endpoint.',
  },
]

/** Connectivity: the three-step build, joined by a line drawn with scroll. */
export function ProcessModule() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const draw = useSpring(scrollYProgress, { stiffness: 110, damping: 26 })

  return (
    <section className="night relative overflow-hidden">
      <div className="shell relative py-24 lg:py-36">
        <SplitHeading
          parts={[{ text: 'Installation' }, { text: 'process', accent: true }]}
          className="t-section max-w-[14ch] text-ink"
        />

        <div ref={ref} className="relative mt-16 lg:mt-24">
          <div aria-hidden="true" className="absolute left-[7px] right-0 top-[7px] hidden h-px bg-hairline-strong lg:block">
            <motion.div style={{ scaleX: draw }} className="h-px origin-left bg-gradient-to-r from-warm to-accent" />
          </div>
          <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {STEPS.map((step, index) => (
              <Step key={step.title} step={step} index={index} progress={draw} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Step({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number]
  index: number
  progress: MotionValue<number>
}) {
  const at = index / (STEPS.length - 1)
  const lit = useTransform(progress, [Math.max(0, at - 0.12), at], [0, 1])
  const opacity = useTransform(lit, [0, 1], [0.4, 1])

  return (
    <motion.li style={{ opacity }} className="relative">
      <div aria-hidden="true" className="relative h-[15px] w-[15px] rounded-full border border-hairline-strong bg-surface">
        <motion.span style={{ opacity: lit }} className="absolute inset-[3px] rounded-full bg-warm" />
      </div>
      <h3 className="mt-8 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-tight tracking-[-0.035em] text-ink">
        {step.title}
      </h3>
      <p className="pretty mt-4 max-w-[40ch] text-[1rem] leading-relaxed text-slate">{step.body}</p>
    </motion.li>
  )
}
