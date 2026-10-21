'use client'

import { useTransition } from 'react'

import { CONTACT_EMAIL, CONTACT_HREF } from '@/lib/contact'

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const [pending, startTransition] = useTransition()
  return <html lang="en-ZA"><body style={{ margin: 0, padding: '48px 24px', background: '#03060f', color: '#eef2ff', font: '16px/1.6 system-ui, sans-serif' }}>
    <main style={{ maxWidth: 700, margin: 'auto' }} role="alert">
      <h1>We could not load Hypernet.</h1><p>Please try again or email <a style={{ color: '#8cb0ff', display: 'inline-flex', minHeight: 44, alignItems: 'center' }} href={CONTACT_HREF}>{CONTACT_EMAIL}</a>.</p>
      <button style={{ minHeight: 44, padding: '12px 24px', fontSize: 16 }} disabled={pending} aria-busy={pending} onClick={() => startTransition(() => retry())}>{pending ? 'Trying again…' : 'Try again'}</button>
      <p><a style={{ color: '#8cb0ff', display: 'inline-flex', minHeight: 44, alignItems: 'center' }} href="/">Back to the homepage</a></p>
    </main>
  </body></html>
}
