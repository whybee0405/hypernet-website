import { readFile, stat, writeFile, rename } from 'node:fs/promises'
import path from 'node:path'
import { modernImage } from '@/lib/optimize-image'

export const runtime = 'nodejs'

// Collapse duplicate work and bound CPU/memory use on cache misses.
const generating = new Map<string, Promise<Buffer>>()

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:jpe?g|png|webp)\.webp$/i.test(filename)) return new Response('Image not found', { status: 404 })
  const folder = process.env.MEDIA_DIR || path.resolve('public/media')
  const source = path.join(folder, filename.slice(0, -5))
  const target = path.join(folder, filename)
  try {
    const original = await stat(source)
    let image: Buffer
    const cached = await stat(target).catch(() => null)
    if (cached && cached.mtimeMs >= original.mtimeMs) {
      image = await readFile(target)
    } else {
      let pending = generating.get(target)
      if (!pending) {
        if (generating.size >= 2) return new Response('Image temporarily unavailable', { status: 503, headers: { 'Retry-After': '5' } })
        if (original.size > 12_000_000) return new Response('Image too large', { status: 413 })
        pending = (async () => {
          const result = await modernImage(await readFile(source))
          const temporary = `${target}.${crypto.randomUUID()}.tmp`
          await writeFile(temporary, result)
          await rename(temporary, target)
          return result
        })().finally(() => generating.delete(target))
        generating.set(target, pending)
      }
      image = await pending
    }
    return new Response(new Uint8Array(image), { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800', 'X-Content-Type-Options': 'nosniff' } })
  } catch (error) {
    const missing = (error as NodeJS.ErrnoException).code === 'ENOENT'
    if (!missing) console.error('Optimized media delivery failed', error)
    return new Response(missing ? 'Image not found' : 'Image temporarily unavailable', { status: missing ? 404 : 503 })
  }
}
