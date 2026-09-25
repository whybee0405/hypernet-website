'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { SplitHeading } from '@/components/site/motion'
import { cn } from '@/lib/utils'

const LINKS = [
  { id: 'fibre', label: 'Fibre', y: 70 },
  { id: 'lte', label: 'LTE / 5G', y: 160 },
  { id: 'sat', label: 'Starlink', y: 250 },
] as const

const STAGES = [
  {
    key: 'normal',
    title: 'Normal operation',
    body: 'Traffic is spread across all your links. Calls and cloud apps use the fastest link, and updates and backups use the rest.',
  },
  {
    key: 'cut',
    title: 'Fibre cut',
    body: 'The primary line fails, for example because of roadworks or cable theft.',
  },
  {
    key: 'failover',
    title: 'Automatic failover',
    body: 'CloudPath moves every session to the remaining links in under a second. The static IP stays the same, so VPNs, whitelists and hosted systems are unaffected.',
  },
] as const

/**
 * CloudPath: a pinned, scroll-scrubbed failover demonstration. Three links are
 * bonded into one, the primary is cut, traffic reroutes and the public
 * address stays the same.
 */
export function FailoverModule() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.5', 'end end'] })
  const [stage, setStage] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setStage(value < 0.45 ? 0 : value < 0.72 ? 1 : 2)
  })

  const cut = stage >= 1
  const rerouted = stage >= 2
  const fibreOpacity = useTransform(scrollYProgress, [0.42, 0.5], [1, 0.25])

  return (
    <section ref={ref} className="night relative lg:h-[260vh]">
      <div className="relative overflow-hidden py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0">
        <div className="shell relative grid w-full items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SplitHeading
              parts={[{ text: 'How failover' }, { text: 'works', accent: true }]}
              className="t-section max-w-[12ch] text-ink"
            />
            <ol className="mt-10 grid gap-2">
              {STAGES.map((entry, index) => (
                <li
                  key={entry.key}
                  className={cn(
                    'rounded-2xl border p-5 transition-[border-color,background-color,opacity] duration-300',
                    index === stage ? 'border-hairline-strong bg-ink/[0.04]' : 'border-transparent opacity-45',
                  )}
                >
                  <p className="flex items-center gap-3 font-display text-[1.25rem] font-semibold tracking-[-0.03em] text-ink">
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full transition-colors',
                        index === stage ? (index === 1 ? 'bg-[#ff5a5a]' : 'bg-[#3ee089]') : 'bg-slate/50',
                      )}
                    />
                    {entry.title}
                  </p>
                  <p
                    className={cn(
                      'grid transition-[grid-template-rows] duration-500',
                      index === stage ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <span className="min-h-0 overflow-hidden pl-5 pt-2 text-[0.9375rem] leading-relaxed text-slate">
                      {entry.body}
                    </span>
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <div className="card relative overflow-hidden p-4 sm:p-6">
              <svg viewBox="0 0 640 320" className="h-auto w-full" role="img" aria-label="Diagram: an office connected through fibre, LTE and Starlink into a CloudPath node and out to the internet. When the fibre is cut, traffic moves to the other two links and the public IP stays the same.">
                <defs>
                  <linearGradient id="fo-line" x1="0" x2="1">
                    <stop offset="0" stopColor="#4f86ff" />
                    <stop offset="1" stopColor="#ff7a45" />
                  </linearGradient>
                  <filter id="fo-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Office */}
                <g>
                  <rect x="20" y="120" width="96" height="80" rx="16" fill="var(--accent-soft)" stroke="var(--hairline-strong)" />
                  <text x="68" y="156" textAnchor="middle" className="fill-[var(--ink)] text-[13px] font-semibold">Your site</text>
                  <text x="68" y="176" textAnchor="middle" className="fill-[var(--slate)] text-[11px]">calls, tills, cloud</text>
                </g>

                {/* Links */}
                {LINKS.map((link) => {
                  const isFibre = link.id === 'fibre'
                  const d = `M116 160 C 170 160, 170 ${link.y}, 230 ${link.y} L 380 ${link.y} C 440 ${link.y}, 440 160, 480 160`
                  return (
                    <g key={link.id}>
                      <path d={d} fill="none" stroke="var(--hairline-strong)" strokeWidth="2" />
                      <motion.path
                        d={d}
                        fill="none"
                        stroke={isFibre && cut ? '#ff5a5a' : 'url(#fo-line)'}
                        strokeWidth={isFibre ? 3 : rerouted ? 3.5 : 2}
                        strokeDasharray={isFibre && cut ? '6 8' : '10 14'}
                        filter="url(#fo-glow)"
                        style={isFibre ? { opacity: fibreOpacity } : undefined}
                        animate={{ strokeDashoffset: isFibre && cut ? 0 : [0, -48] }}
                        transition={{ duration: rerouted && !isFibre ? 0.5 : 1.1, repeat: Infinity, ease: 'linear' }}
                      />
                      <text x="330" y={link.y - 10} textAnchor="middle" className="fill-[var(--slate)] text-[11px] font-medium tracking-wider uppercase">
                        {link.label}
                      </text>
                    </g>
                  )
                })}

                {/* Cut marker */}
                <motion.g animate={{ opacity: cut ? 1 : 0, scale: cut ? 1 : 0.4 }} style={{ originX: '255px', originY: '70px' }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                  <circle cx="255" cy="70" r="15" fill="var(--surface)" stroke="#ff5a5a" strokeWidth="2" />
                  <path d="M248 63 L262 77 M262 63 L248 77" stroke="#ff5a5a" strokeWidth="2.5" strokeLinecap="round" />
                </motion.g>

                {/* CloudPath node */}
                <g>
                  <circle cx="500" cy="160" r="30" fill="rgb(255 122 69 / 0.14)" stroke="#ff7a45" strokeWidth="1.5" />
                  <circle cx="500" cy="160" r="8" fill="#ff7a45" filter="url(#fo-glow)" />
                  <text x="500" y="212" textAnchor="middle" className="fill-[var(--ink)] text-[12px] font-semibold">CloudPath</text>
                </g>
                <path d="M530 160 L 610 160" stroke="url(#fo-line)" strokeWidth="3" filter="url(#fo-glow)" />
                <text x="612" y="140" textAnchor="end" className="fill-[var(--slate)] text-[11px]">Internet</text>
              </svg>

              <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-hairline pt-5">
                <div>
                  <dt className="t-meta text-slate">Public IP</dt>
                  <dd className="mt-1.5 font-mono text-[0.9375rem] text-ink">Unchanged</dd>
                </div>
                <div>
                  <dt className="t-meta text-slate">Live call</dt>
                  <dd className={cn('mt-1.5 text-[0.9375rem] font-semibold', stage === 1 ? 'text-warm-text' : 'text-[#3ee089]')}>
                    {stage === 1 ? 'Rerouting' : 'Connected'}
                  </dd>
                </div>
                <div>
                  <dt className="t-meta text-slate">Active links</dt>
                  <dd className="mt-1.5 font-mono text-[0.9375rem] text-ink">{cut ? '2 of 3' : '3 of 3'}</dd>
                </div>
              </dl>
              <p className="mt-4 text-[0.75rem] text-slate/80">This diagram is an illustration; failover time depends on the links at your site.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
