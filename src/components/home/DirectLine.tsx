'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { SplitHeading } from '@/components/site/motion'
import type { HomePage } from '@/payload-types'

type Step = NonNullable<HomePage['process']>[number]

/**
 * "What happens when something breaks", told along the direct line itself: a
 * coral filament drawn down the page by scroll progress. Each step's node
 * lights as the line reaches it. The heading pins alongside on desktop so the
 * question stays in view while the answer unfolds.
 */
export function DirectLine({
  heading,
  intro,
  steps,
}: {
  heading: string
  intro: string
  steps: Step[]
}) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <section className="night relative overflow-clip">
      <div className="shell relative py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SplitHeading parts={[{ text: heading }]} className="t-section balance max-w-[13ch] text-ink" />
              <p className="t-lead mt-6 max-w-[38ch]">{intro}</p>
            </div>
          </div>

          <ol ref={ref} className="relative lg:col-span-6 lg:col-start-7">
            {/* The line: a dim track plus the lit filament drawn over it. */}
            <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-hairline-strong">
              <motion.div
                style={{ scaleY: draw }}
                className="absolute inset-0 origin-top bg-gradient-to-b from-warm via-warm to-accent"
              />
            </div>

            {steps.map((step, index) => (
              <StepRow
                key={step.id ?? step.title}
                step={step}
                index={index}
                total={steps.length}
                progress={draw}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function StepRow({
  step,
  index,
  total,
  progress,
}: {
  step: Step
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const at = total > 1 ? index / (total - 1) : 0
  const lit = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1])
  const textOpacity = useTransform(lit, [0, 1], [0.35, 1])
  const nodeScale = useTransform(lit, [0, 1], [0.6, 1])

  return (
    <li className="relative grid grid-cols-[40px_1fr] gap-6 pb-16 last:pb-0 lg:pb-24">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-hairline-strong bg-surface" />
        <motion.span
          style={{ opacity: lit, scale: nodeScale }}
          className="absolute inset-0 rounded-full bg-warm"
        />
        <span className="t-meta relative text-ink">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <motion.div style={{ opacity: textOpacity }} className="pt-1">
        <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.125rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
          {step.title}
        </h3>
        <p className="pretty mt-3 max-w-[48ch] text-[1rem] leading-relaxed text-slate">{step.body}</p>
      </motion.div>
    </li>
  )
}
