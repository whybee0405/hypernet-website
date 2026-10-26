'use client'

import { useEffect } from 'react'
import { trackEnquiryAnalytics } from './AnalyticsTracker'

export function EnquiryConversion() {
  useEffect(() => {
    // The server redirects here only after the lead has been saved.
    // Avoid counting a reload as another enquiry.
    const key = 'hypernet-enquiry-conversion'
    try {
      const last = Number(sessionStorage.getItem(key) || 0)
      if (Date.now() - last < 10_000) return
      sessionStorage.setItem(key, String(Date.now()))
    } catch { /* Storage may be unavailable. */ }
    trackEnquiryAnalytics()
  }, [])
  return null
}
