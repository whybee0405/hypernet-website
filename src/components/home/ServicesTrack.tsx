'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { PILLARS, SERVICES, serviceHref } from '@/content/services'

const PILLAR_NAME = Object.fromEntries(PILLARS.map((pillar) => [pillar.id, pillar.name]))

/**
 * Pinned horizontal track. Vertical scroll is converted into sideways travel
 * through the service catalogue, so eight services read as one continuous
 * journey instead of a grid of equal boxes.
 *
 * The section's height is derived from the track's measured overflow, so the
 * pin lasts exactly as long as the travel needs. Below lg there is no pin: the
 * track becomes a native scroll-snap rail, which is what thumbs expect.
 */
export function ServicesTrack() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const overflow = track.scrollWidth - window.innerWidth
      setDistance(window.innerWidth >= 1024 ? Math.max(0, overflow) : 0)
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  const pinned = distance > 0

  return (
    <section
      ref={sectionRef}
      className="night relative"
      style={{ height: pinned ? `calc(100vh + ${distance}px)` : undefined }}
      aria-labelledby="services-track-heading"
    >
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-20'}>
        <motion.div
          ref={trackRef}
          style={{ x: pinned ? x : 0 }}
          className="flex w-max items-stretch gap-5 px-5 max-lg:w-auto max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:pb-6 sm:px-8 lg:gap-6 lg:px-14"
        >
          {/* Intro panel */}
          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-between pr-6 sm:w-[60vw] lg:w-[38vw] lg:max-w-[560px]">
            <div>
              <h2
                id="services-track-heading"
                className="t-display balance text-ink"
              >
                Our <span className="accent-word">services</span>
              </h2>
              <p className="t-lead mt-6 max-w-[40ch]">
                Start with the service you need most and add others as you grow. Every service is
                supported through the same service desk.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-6">
              {PILLARS.map((pillar) => (
                <div key={pillar.id}>
                  <p className="t-meta text-warm-text">{pillar.name}</p>
                  <p className="mt-1 text-[0.875rem] leading-snug text-slate">{pillar.verb}</p>
                </div>
              ))}
            </div>
          </div>

          {SERVICES.map((service, index) => (
            <Link
              key={service.slug}
              href={serviceHref(service.slug)}
              className="stay-dark card group relative flex h-[min(74vh,640px)] w-[78vw] shrink-0 snap-start flex-col overflow-hidden sm:w-[46vw] lg:w-[400px]"
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 78vw, 400px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] via-transparent to-transparent" />
              </div>
              <div className="relative p-6 pt-2">
                <p className="text-[0.8125rem] font-medium text-warm-text">{PILLAR_NAME[service.pillar]}</p>
                <h3 className="t-card mt-1.5 flex items-start justify-between gap-3 text-[1.75rem] text-ink">
                  {service.name}
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    aria-hidden="true"
                    className="mt-1.5 shrink-0 text-slate transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm"
                  />
                </h3>
                <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-slate">{service.short}</p>
                {service.poweredBy ? (
                  <p className="mt-4 text-[0.8125rem] text-slate/80">Powered by {service.poweredBy}</p>
                ) : null}
              </div>
            </Link>
          ))}

          {/* Outro panel */}
          <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-center pl-4 pr-10 sm:w-[46vw] lg:w-[360px]">
            <p className="font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-ink">
              Choosing a service
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate">
              Call us with the problem you want to solve and we will recommend where to start.
            </p>
            <Link href="/services" className="link-arrow mt-6">
              View services
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        {pinned ? (
          <div className="shell mt-10 w-full">
            <div className="h-px w-full bg-hairline">
              <motion.div
                style={{ scaleX: progress }}
                className="h-px origin-left bg-gradient-to-r from-accent to-warm"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
