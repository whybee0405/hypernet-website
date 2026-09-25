'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Global motion policy.
 *
 * `reducedMotion="user"` makes Motion honour the OS setting for every
 * animation in the tree: transform, layout and scale animations are skipped
 * and jump straight to their end state, while opacity is still allowed to
 * cross-fade. That is the recommended split, since the problem for vestibular
 * disorders is movement rather than a fade.
 *
 * Handling it here rather than per-component matters for correctness, not just
 * tidiness. `useReducedMotion()` returns null during server rendering, so
 * branching a component's `initial` prop on it produces different markup on the
 * server and the client, which is a hydration mismatch. Components keep one
 * unconditional initial state and this provider decides how it resolves.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
