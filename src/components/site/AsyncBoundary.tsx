'use client'

import { useTransition } from 'react'

import { catchError, type ErrorInfo } from 'next/error'
import { CONTACT_HREF } from '@/lib/contact'

export default catchError(function AsyncFallback({ title, message = 'This section could not load. Please try again.' }: { title: string; message?: string }, { retry }: ErrorInfo) {
  const [pending, startTransition] = useTransition()
  return <section className="shell py-16" role="alert"><h2 className="t-card">{title}</h2>
    <p className="mt-4 text-base text-slate">{message} Or <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center text-accent-text">email our team</a>.</p>
    <button className="btn btn-secondary mt-5" disabled={pending} aria-busy={pending} onClick={() => startTransition(() => retry())}>{pending ? 'Trying again…' : 'Try again'}</button></section>
})
