'use client'

import Link, { useLinkStatus } from 'next/link'
import type { ComponentProps } from 'react'

function PendingNavigation() {
  const { pending } = useLinkStatus()
  return pending ? <span role="status" aria-live="polite" className="fixed inset-x-0 top-0 z-[80] bg-panel px-4 py-2 text-center text-base text-ink shadow-lg">Loading page…</span> : null
}

export default function SiteLink({ children, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props}>{children}<PendingNavigation /></Link>
}
