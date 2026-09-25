'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

/**
 * Inertial scrolling. Lenis drives the real window scroll position, so every
 * Motion `useScroll` on the site keeps working unchanged; it only smooths how
 * the position gets there. Off entirely for reduced motion and for touch,
 * where native momentum scrolling is already better than anything we add.
 */
export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -96 } })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])

  // Route changes land at the top without an animated scroll back up.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname])

  return null
}
