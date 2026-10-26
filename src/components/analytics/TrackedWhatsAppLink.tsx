'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackWhatsAppAnalytics } from './AnalyticsTracker'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  placement: 'floating-button' | 'footer' | 'contact-page'
  children: ReactNode
}

export function TrackedWhatsAppLink({ placement, children, onClick, ...props }: Props) {
  return <a {...props} onClick={(event) => {
    trackWhatsAppAnalytics(placement)
    onClick?.(event)
  }}>{children}</a>
}
