'use client'

import { useTransition } from 'react'
import { CONTACT_EMAIL, CONTACT_HREF } from '@/lib/contact'
import { RecoveryLinks } from '@/components/site/RecoveryLinks'

export default function SiteError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const [pending, startTransition] = useTransition()
  return <section className="shell py-36" role="alert">
    <h1 className="t-display text-ink">We could not load this page.</h1>
    <p className="t-lead mt-6">Please try again. You can also email <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center text-accent-text">{CONTACT_EMAIL}</a>.</p>
    <button type="button" disabled={pending} aria-busy={pending} onClick={() => startTransition(() => retry())} className="btn btn-primary mt-8">{pending ? 'Trying again…' : 'Try again'}</button>
    <RecoveryLinks />
  </section>
}
