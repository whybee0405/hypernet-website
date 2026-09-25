import type { ReactNode } from 'react'
import { SplitHeading } from './motion'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

/**
 * Inner-page opener. Big type on the night field with a soft blue and coral
 * light behind it and the faint engineering grid. Optional `aside` slot for a
 * render or supporting panel on the right.
 */
export function PageHero({
  title,
  accent,
  lead,
  children,
  aside,
  className,
}: {
  title: string
  accent?: string
  lead?: string
  children?: ReactNode
  aside?: ReactNode
  className?: string
}) {
  return (
    <section className={cn('night relative isolate overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28', className)}>

      <div className="shell">
        <div className={cn('grid gap-12', aside && 'lg:grid-cols-12 lg:items-center')}>
          <div className={cn(aside && 'lg:col-span-7')}>
            <SplitHeading
              as="h1"
              immediate
              delay={0.1}
              parts={[{ text: title }, ...(accent ? [{ text: accent, accent: true }] : [])]}
              className="t-display balance max-w-[15ch] text-ink"
            />
            {lead ? (
              <Reveal delay={0.35}>
                <p className="t-lead mt-8 max-w-[60ch]">{lead}</p>
              </Reveal>
            ) : null}
            {children ? <Reveal delay={0.45}>{children}</Reveal> : null}
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
      </div>
    </section>
  )
}
