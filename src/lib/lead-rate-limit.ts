import 'server-only'
import { headers } from 'next/headers'
import { isIP } from 'node:net'

const WINDOW = 10 * 60 * 1000
const MAX_ATTEMPTS = 10
const buckets = new Map<string, { count: number; expires: number }>()

/** Nginx overwrites X-Real-IP; the app's port is accessible only on loopback. */
export async function allowLeadAttempt(): Promise<boolean> {
  const peer = (await headers()).get('x-real-ip') || ''
  const key = isIP(peer) ? peer : 'unidentified'
  const now = Date.now()
  const existing = buckets.get(key)
  if (existing && existing.expires > now) {
    if (existing.count >= MAX_ATTEMPTS) return false
    existing.count++
    return true
  }
  if (buckets.size >= 10_000) {
    for (const [ip, entry] of buckets) if (entry.expires <= now) buckets.delete(ip)
    if (buckets.size >= 10_000) return false
  }
  buckets.set(key, { count: 1, expires: now + WINDOW })
  return true
}
