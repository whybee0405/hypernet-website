'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/** A thin coral filament along the top edge that fills as the article is read. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-accent via-warm to-warm"
    />
  )
}
