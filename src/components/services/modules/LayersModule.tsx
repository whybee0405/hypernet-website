'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { SplitHeading, EASE } from '@/components/site/motion'
import { cn } from '@/lib/utils'

const LAYERS = [
  {
    ring: 'Edge',
    vendor: 'Cloudflare',
    threat: 'A DDoS attack on your website and bots attempting to log in.',
    stop: 'Cloudflare absorbs the traffic at its edge network. DDoS mitigation and the web application firewall filter it before it reaches you.',
    r: 150,
  },
  {
    ring: 'Email',
    vendor: 'Sendmarc',
    threat: 'A fake invoice sent to your clients from your domain with new bank details.',
    stop: "Your clients' mail servers reject it, because DMARC enforcement allows only your authorised systems to send from your domain.",
    r: 108,
  },
  {
    ring: 'Endpoint',
    vendor: 'Sophos',
    threat: 'Ransomware opened on a laptop in the accounts department.',
    stop: 'Sophos blocks it before it runs, isolates the laptop and alerts the 24/7 response team.',
    r: 66,
  },
] as const

/**
 * Dragon Guard: three rings around the business, lit one at a time as the
 * reader scrolls. Each stage shows a typical attack and the layer that blocks
 * it.
 */
export function LayersModule() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.4', 'end end'] })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setActive(value < 0.4 ? 0 : value < 0.7 ? 1 : 2)
  })

  const layer = LAYERS[active]

  return (
    <section ref={ref} className="night relative lg:h-[280vh]">
      <div className="relative overflow-hidden py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0">
        <div className="shell relative grid w-full items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SplitHeading
              parts={[{ text: 'How each layer' }, { text: 'responds', accent: true }]}
              className="t-section max-w-[12ch] text-ink"
            />

            <div className="mt-10 flex gap-2" role="tablist" aria-label="Protection layers">
              {LAYERS.map((entry, index) => (
                <span
                  key={entry.ring}
                  role="tab"
                  aria-selected={index === active}
                  className={cn(
                    'rounded-full border px-4 py-2 text-[0.8125rem] font-semibold transition-colors duration-500',
                    index === active
                      ? 'border-warm/60 bg-warm/15 text-ink'
                      : 'border-hairline text-slate',
                  )}
                >
                  {entry.ring}
                </span>
              ))}
            </div>

            <div className="relative mt-8 min-h-[230px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={layer.ring}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="t-meta text-[#ff8a8a]">Threat</p>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{layer.threat}</p>
                  <p className="t-meta mt-6 text-[#3ee089]">Blocked by {layer.vendor}</p>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-slate">{layer.stop}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" aria-hidden="true">
            <svg viewBox="0 0 400 400" className="mx-auto h-auto w-full max-w-[520px]">
              <defs>
                <radialGradient id="lg-core">
                  <stop offset="0" stopColor="#ff7a45" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#ff7a45" stopOpacity="0" />
                </radialGradient>
                <filter id="lg-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {LAYERS.map((entry, index) => {
                const on = index === active
                return (
                  <g key={entry.ring}>
                    <motion.circle
                      cx="200"
                      cy="200"
                      r={entry.r}
                      fill="none"
                      animate={{
                        stroke: on ? '#ff7a45' : 'rgba(120,140,200,0.35)',
                        strokeWidth: on ? 3 : 1.5,
                        opacity: on ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.5 }}
                      filter={on ? 'url(#lg-glow)' : undefined}
                      strokeDasharray={index === 0 ? '4 6' : undefined}
                    />
                    <text
                      x="200"
                      y={200 - entry.r + 16}
                      textAnchor="middle"
                      className={cn('text-[10px] font-semibold uppercase tracking-[0.18em]', on ? 'fill-[var(--ink)]' : 'fill-[var(--slate)]')}
                    >
                      {entry.ring}
                    </text>
                  </g>
                )
              })}

              <circle cx="200" cy="200" r="46" fill="url(#lg-core)" opacity="0.35" />
              <circle cx="200" cy="200" r="30" fill="var(--raised)" stroke="rgba(255,122,69,0.6)" />
              <text x="200" y="204" textAnchor="middle" className="fill-[var(--ink)] text-[10px] font-semibold">You</text>

              {/* The attack: travels in from outside and is stopped at the active ring. */}
              <AnimatePresence mode="wait">
                <motion.g key={active}>
                  <motion.line
                    x1="392"
                    y1="40"
                    x2={200 + (LAYERS[active].r + 6) * Math.cos(-Math.PI / 4)}
                    y2={200 + (LAYERS[active].r + 6) * Math.sin(-Math.PI / 4)}
                    stroke="#ff5a5a"
                    strokeWidth="2"
                    strokeDasharray="4 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                  <motion.circle
                    cx={200 + (LAYERS[active].r + 6) * Math.cos(-Math.PI / 4)}
                    cy={200 + (LAYERS[active].r + 6) * Math.sin(-Math.PI / 4)}
                    r="7"
                    fill="#ff5a5a"
                    filter="url(#lg-glow)"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.6, 1] }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />
                </motion.g>
              </AnimatePresence>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
