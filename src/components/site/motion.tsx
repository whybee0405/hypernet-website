'use client'

import Image from 'next/image'
import { useRef, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'

export const EASE = [0.16, 1, 0.3, 1] as const

type Part = { text: string; accent?: boolean }

/**
 * Headline that rises word by word out of a mask. Each word sits in an
 * overflow-clipped slot so it appears to come up from a baseline rather than
 * fade in from nowhere. `parts` lets a segment be set as an accent word.
 * Screen readers get the plain sentence through the visually hidden copy.
 */
export function SplitHeading({
  parts,
  as = 'h2',
  className,
  delay = 0,
  immediate = false,
  stagger = 0.045,
}: {
  parts: Part[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  /** Animate on mount instead of on entering the viewport (hero headings). */
  immediate?: boolean
  stagger?: number
}) {
  const Tag = as
  const words: { word: string; accent?: boolean }[] = []
  parts.forEach((part) => {
    part.text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => words.push({ word, accent: part.accent }))
  })
  const plain = parts.map((part) => part.text).join(' ')

  const trigger = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, amount: 0.4 } }

  return (
    <Tag className={className}>
      <span className="sr-only">{plain}</span>
      <motion.span aria-hidden="true" initial="hide" {...trigger} className="block">
        {words.map((entry, index) => (
          <span
            key={`${entry.word}-${index}`}
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          >
            <motion.span
              className={cn('inline-block', entry.accent && 'accent-word')}
              variants={{
                hide: { y: '105%', rotate: 4 },
                show: {
                  y: '0%',
                  rotate: 0,
                  transition: { duration: 0.9, ease: EASE, delay: delay + index * stagger },
                },
              }}
            >
              {entry.word}
            </motion.span>
            {index < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/**
 * A paragraph whose words light up as it scrolls through the viewport. It
 * slows the reader down on the one statement per page that matters most.
 */
export function ScrollLitText({
  text,
  className,
  accentWords = [],
}: {
  text: string
  className?: string
  accentWords?: string[]
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(/\s+/)
  const normalise = (word: string) => word.toLowerCase().replace(/[^a-z’']/g, '')
  const accents = new Set(accentWords.map(normalise))

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const start = index / words.length
          const end = start + 1 / words.length
          const clean = normalise(word)
          return (
            <LitWord
              key={`${word}-${index}`}
              progress={scrollYProgress}
              range={[start, end]}
              accent={accents.has(clean)}
            >
              {word}
            </LitWord>
          )
        })}
      </span>
    </p>
  )
}

function LitWord({
  children,
  progress,
  range,
  accent,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  accent: boolean
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }} className={cn(accent && 'accent-word')}>
        {children}
      </motion.span>{' '}
    </>
  )
}

/** Vertical parallax for any child, relative to its own passage through the viewport. */
export function Parallax({
  children,
  offset = 80,
  className,
}: {
  children: ReactNode
  offset?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/**
 * One of the glass service renders, with two motion layers: scroll parallax
 * and a slow scale as it passes through the viewport, and a spring-smoothed
 * pointer tilt (mouse only). The baked-in dark backdrop is feathered away with
 * a radial mask so the object sits in whatever section it is placed in.
 */
export function Render({
  src,
  alt = '',
  className,
  priority = false,
  sizes = '(max-width: 1024px) 90vw, 45vw',
  mask = true,
}: {
  src: string
  alt?: string
  className?: string
  priority?: boolean
  sizes?: string
  mask?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.04])

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 })

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className={cn('relative', className)}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse') return
        const bounds = event.currentTarget.getBoundingClientRect()
        px.set((event.clientX - bounds.left) / bounds.width - 0.5)
        py.set((event.clientY - bounds.top) / bounds.height - 0.5)
      }}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
    >
      <motion.div style={{ rotateX, rotateY, transformPerspective: 1000 }} className="relative h-full w-full">
        <div className={cn('relative h-full w-full', mask && 'render-mask')}>
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Count-free marquee. Content is duplicated once so the loop is seamless. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn('mask-fade-x overflow-hidden', className)} aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={`${copy}-${item}`} className="flex items-center">
                <span className="px-7 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.035em] text-ink/85">
                  {item}
                </span>
                <span className="h-2 w-2 rounded-full bg-warm" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
