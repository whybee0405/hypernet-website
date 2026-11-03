'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SESSION_KEY = 'hypernet-analytics-session'
type AnalyticsEventType = 'page_view' | 'page_exit' | 'form_submit' | 'whatsapp_click'

function sessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return crypto.randomUUID()
  }
}

/** Visitors who send Global Privacy Control or Do Not Track are not measured (see the privacy policy). */
function optedOut() {
  try {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
    return nav.globalPrivacyControl === true || nav.doNotTrack === '1'
  } catch {
    return false
  }
}

function post(type: AnalyticsEventType, path: string, options: { duration?: number; placement?: string; beacon?: boolean } = {}) {
  if (optedOut()) return
  let referrer = ''
  try { referrer = document.referrer ? new URL(document.referrer).origin : '' } catch { /* Invalid referrer. */ }
  const body = JSON.stringify({
    type, path, sessionId: sessionId(), referrer,
    ...(options.duration === undefined ? {} : { duration: options.duration }),
    ...(options.placement ? { whatsappPlacement: options.placement } : {}),
  })
  if (options.beacon && navigator.sendBeacon?.('/api/analytics-events', new Blob([body], { type: 'application/json' }))) return
  fetch('/api/analytics-events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    const loadedAt = Date.now()
    let exited = false
    const exit = () => {
      if (exited) return
      exited = true
      post('page_exit', pathname, { duration: Math.round((Date.now() - loadedAt) / 1000), beacon: true })
    }
    const onVisibility = () => { if (document.visibilityState === 'hidden') exit() }
    post('page_view', pathname)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', exit)
    return () => {
      exit()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', exit)
    }
  }, [pathname])

  return null
}

export function trackEnquiryAnalytics() {
  post('form_submit', '/contact')
}

export function trackWhatsAppAnalytics(placement: string) {
  post('whatsapp_click', window.location.pathname, { placement })
}
