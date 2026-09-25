'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Scroll entry for a single element. Motion is here to establish reading order
 * as a section arrives, so it fires once and never loops.
 *
 * The initial state is unconditional: reduced motion is handled by the global
 * MotionConfig, which drops the translate and keeps the fade. Branching on
 * useReducedMotion() here would render different markup on the server and the
 * client.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'ul' | 'section' | 'span'
}) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      // 16px and 550ms, not 22px and 700ms. Long travel over long duration is
      // what makes a page feel like it is loading rather than arriving, and the
      // reader meets this gesture on every section.
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}
