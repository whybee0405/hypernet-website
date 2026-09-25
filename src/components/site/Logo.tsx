import { cn } from '@/lib/utils'

export function Logo({
  className,
}: {
  className?: string
}) {
  return (
    <span className={cn('brand-logo inline-block shrink-0', className)} aria-hidden="true" />
  )
}
