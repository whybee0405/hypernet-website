'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowCounterClockwise,
  ArrowRight,
  Lightning,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'
import { Reveal } from '@/components/site/Reveal'
import { cn } from '@/lib/utils'
import type { Plan } from '@/payload-types'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * A two-question plan match. Team size picks a plan; if an outage would stop
 * trading, the recommendation moves up one tier. The logic is index arithmetic
 * over real plan records, so it never invents a number.
 */
export function PlanFinder({ plans }: { plans: Plan[] }) {
  const [sizeIndex, setSizeIndex] = useState<number | null>(null)
  const [critical, setCritical] = useState<boolean | null>(null)

  const step = sizeIndex === null ? 0 : critical === null ? 1 : 2

  const resultIndex = useMemo(() => {
    if (sizeIndex === null) return null
    if (critical && sizeIndex < plans.length - 1) return sizeIndex + 1
    return sizeIndex
  }, [sizeIndex, critical, plans.length])

  const result = resultIndex !== null ? plans[resultIndex] : null
  const bumped = critical === true && resultIndex !== null && resultIndex !== sizeIndex

  const reset = () => {
    setSizeIndex(null)
    setCritical(null)
  }

  if (plans.length === 0) return null

  return (
    <section className="night relative overflow-hidden">
      <div className="shell relative py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="t-section balance max-w-[14ch] text-ink">
                Plan <span className="accent-word">finder</span>
              </h2>
              <p className="t-lead mt-5">
                Answer two questions to see which connectivity and VoIP plan suits your business.
                Final pricing follows a site survey.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
            <div className="card overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {step === 0 ? (
                  <motion.div
                    key="q1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE } }}
                    exit={{ opacity: 0, x: -16, transition: { duration: 0.2, ease: EASE } }}
                    className="p-8 sm:p-10"
                  >
                    <p className="t-meta flex items-center gap-2 text-accent-text">
                      <UsersThree size={16} weight="bold" aria-hidden="true" />
                      Question one of two
                    </p>
                    <h3 className="t-card mt-4 text-ink">Business size</h3>
                    <div className="mt-6 grid gap-3">
                      {plans.map((plan, index) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSizeIndex(index)}
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-ink/[0.02] px-5 py-4 text-left transition-[border-color,background-color,transform] duration-150 ease-out hover:border-accent hover:bg-accent-soft active:scale-[0.98]"
                        >
                          <span className="text-[0.9375rem] font-medium text-ink">
                            {plan.audience}
                          </span>
                          <ArrowRight
                            size={16}
                            weight="bold"
                            className="shrink-0 text-slate transition-colors group-hover:text-ink"
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="q2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE } }}
                    exit={{ opacity: 0, x: -16, transition: { duration: 0.2, ease: EASE } }}
                    className="p-8 sm:p-10"
                  >
                    <p className="t-meta flex items-center gap-2 text-accent-text">
                      <Lightning size={16} weight="bold" aria-hidden="true" />
                      Question two of two
                    </p>
                    <h3 className="t-card mt-4 text-ink">
                      Impact of a few hours offline
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setCritical(false)}
                        className="rounded-2xl border border-hairline bg-ink/[0.02] px-5 py-4 text-left text-[0.9375rem] font-medium text-ink transition-[border-color,background-color,transform] duration-150 ease-out hover:border-accent hover:bg-accent-soft active:scale-[0.98]"
                      >
                        Inconvenient
                      </button>
                      <button
                        type="button"
                        onClick={() => setCritical(true)}
                        className="rounded-2xl border border-hairline bg-ink/[0.02] px-5 py-4 text-left text-[0.9375rem] font-medium text-ink transition-[border-color,background-color,transform] duration-150 ease-out hover:border-accent hover:bg-accent-soft active:scale-[0.98]"
                      >
                        We cannot trade
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-slate transition-colors hover:text-ink"
                    >
                      <ArrowCounterClockwise size={14} weight="bold" aria-hidden="true" />
                      Start again
                    </button>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE } }}
                    exit={{ opacity: 0, x: -16, transition: { duration: 0.2, ease: EASE } }}
                    className="p-8 sm:p-10"
                  >
                    <p className="t-meta text-accent-text">Recommended plan</p>
                    <h3 className="mt-3 font-display text-[1.75rem] font-bold tracking-[-0.03em] text-ink">
                      {result.name}
                    </h3>
                    {bumped ? (
                      <p className="pretty mt-2 max-w-[46ch] text-[0.875rem] leading-relaxed text-slate">
                        One tier above your team size, because an outage would stop trading.
                      </p>
                    ) : null}

                    <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
                      {[
                        { label: 'Connectivity', value: result.downstream },
                        { label: 'VoIP lines', value: result.voipLines },
                        { label: 'Support', value: result.support },
                      ].map((row) => (
                        <div key={row.label}>
                          <dt className="t-meta text-slate">{row.label}</dt>
                          <dd className="mt-1.5 text-[0.9375rem] text-ink">{row.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link href="/contact" className="btn btn-primary">
                        Contact us
                        <ArrowRight size={17} weight="bold" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={reset}
                        className={cn(
                          'inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-slate transition-colors hover:text-ink',
                        )}
                      >
                        <ArrowCounterClockwise size={14} weight="bold" aria-hidden="true" />
                        Start again
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
