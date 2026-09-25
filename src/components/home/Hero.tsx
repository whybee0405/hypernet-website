'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { EASE } from '@/components/site/motion'

type HeroProps = {
  headlineLead: string
  headlineAccent: string
  subtext: string
}

/**
 * Pinned cinematic hero.
 *
 * The section is 170vh tall with a sticky 100vh stage, so the first stretch of
 * scrolling is spent inside the hero rather than leaving it. Across that
 * stretch: the filament video pushes in and dims, the two headline lines drift
 * apart in opposite directions, and the supporting copy lifts away. The
 * reader feels the page respond before any new content arrives.
 *
 * The video is the generated "signal" loop: one coral filament that loops into
 * a speech bubble. The poster is the same frame, so there is no flash while
 * it loads, and under reduced motion the poster is all that shows.
 */
export function Hero({ headlineLead, headlineAccent, subtext }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.28])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 0.7, 0])
  const leadX = useTransform(scrollYProgress, [0, 0.8], ['0vw', '-9vw'])
  const accentX = useTransform(scrollYProgress, [0, 0.8], ['0vw', '9vw'])
  const titleOpacity = useTransform(scrollYProgress, [0.25, 0.75], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, 60])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const leadWords = headlineLead.split(' ')
  const accentWords = headlineAccent.split(' ')

  return (
    <section ref={ref} className="stay-dark relative h-[170vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Depth 0: the filament loop. */}
        <motion.div
          aria-hidden="true"
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 origin-[70%_50%]"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover object-[72%_50%] motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/brand/hero-signal.webp"
          >
            <source src="/brand/hero-signal.webm" type="video/webm" />
            <source src="/brand/hero-signal.mp4" type="video/mp4" />
          </video>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/hero-signal.webp"
            alt=""
            className="absolute inset-0 hidden h-full w-full object-cover object-[72%_50%] motion-reduce:block"
          />
        </motion.div>

        {/* Depth 1: shading so the type always has a dark field to sit on. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,#03060f_0%,rgb(3_6_15/0.85)_32%,rgb(3_6_15/0.1)_65%,transparent)] max-lg:bg-[linear-gradient(180deg,rgb(3_6_15/0.35)_0%,rgb(3_6_15/0.6)_45%,#03060f_92%)]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-surface to-transparent" />

        {/* Depth 4: the words. */}
        <div className="shell relative flex h-full flex-col justify-end pb-24 pt-32 lg:justify-center lg:pb-10">
          <motion.h1
            style={{ opacity: titleOpacity }}
            className="t-hero text-ink"
            aria-label={`${headlineLead} ${headlineAccent}`}
          >
            <motion.span style={{ x: leadX }} className="block" aria-hidden="true">
              {leadWords.map((word, index) => (
                <Word key={`${word}-${index}`} delay={0.3 + index * 0.07}>
                  {word}
                </Word>
              ))}
            </motion.span>
            <motion.span style={{ x: accentX }} className="block" aria-hidden="true">
              {accentWords.map((word, index) => (
                <Word key={`${word}-${index}`} delay={0.45 + index * 0.07} accent>
                  {word}
                </Word>
              ))}
            </motion.span>
          </motion.h1>

          <motion.div style={{ y: copyY, opacity: copyOpacity }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
              className="t-lead mt-8 max-w-[44ch] text-ink/75"
            >
              {subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: EASE }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/contact" className="btn btn-primary">
                Contact us
                <ArrowRight size={17} weight="bold" aria-hidden="true" className="btn-arrow" />
              </Link>
              <Link href="/services" className="btn btn-secondary">
                View services
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

function Word({ children, delay, accent }: { children: string; delay: number; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] pr-[0.22em] align-bottom last:pr-0">
      <motion.span
        initial={{ y: '110%', rotate: 5 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className={accent ? 'accent-word inline-block text-warm-text' : 'inline-block'}
      >
        {children}
      </motion.span>
    </span>
  )
}
