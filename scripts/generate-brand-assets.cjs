// Run with Node and the project's sharp dependency; reuse the supplied brand artwork.
const sharp = require('sharp')
const fs = require('node:fs/promises')
const path = require('node:path')
const root = process.env.ASSET_ROOT || process.cwd()
const target = (name) => path.join(root, name)

async function main() {
  const symbol = await sharp(target('logos/2000x2000 Symbol.png')).trim().png().toBuffer()
  async function icon(size, inset = 0.12) {
    const art = await sharp(symbol).resize(Math.round(size * (1 - 2 * inset)), Math.round(size * (1 - 2 * inset)), { fit: 'inside' }).toBuffer()
    return sharp({ create: { width: size, height: size, channels: 4, background: '#03060f' } })
      .composite([{ input: art, gravity: 'centre' }]).png().toBuffer()
  }
  for (const size of [16, 32, 48]) await fs.writeFile(target(`public/favicon-${size}x${size}.png`), await icon(size, 0.06))
  for (const size of [192, 512]) await fs.writeFile(target(`public/android-chrome-${size}x${size}.png`), await icon(size))
  await fs.writeFile(target('public/maskable-icon-512x512.png'), await icon(512, 0.22))
  const apple = await icon(180)
  await fs.writeFile(target('public/apple-touch-icon.png'), apple)
  await fs.writeFile(target('src/app/apple-icon.png'), apple)
  await fs.writeFile(target('src/app/icon.png'), await icon(512))
  // ICO directory with PNG-encoded 16, 32 and 48 pixel entries.
  const sizes = [16, 32, 48]
  const images = await Promise.all(sizes.map(size => icon(size, 0.06)))
  const header = Buffer.alloc(6 + 16 * sizes.length)
  header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4)
  let offset = header.length
  sizes.forEach((size, i) => {
    const at = 6 + i * 16
    header[at] = size; header[at + 1] = size
    header.writeUInt16LE(1, at + 4); header.writeUInt16LE(32, at + 6)
    header.writeUInt32LE(images[i].length, at + 8); header.writeUInt32LE(offset, at + 12)
    offset += images[i].length
  })
  await fs.writeFile(target('src/app/favicon.ico'), Buffer.concat([header, ...images]))
  const wordmark = await sharp(target('public/brand/hypernet-wordmark-dark.webp')).resize({ width: 470 }).png().toBuffer()
  const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect x="72" y="390" width="80" height="5" fill="#ff712b"/><g font-family="sans-serif" fill="white"><text x="72" y="465" font-size="42" font-weight="bold">Business connectivity.</text><text x="72" y="520" font-size="42">A human voice.</text><text x="72" y="580" font-size="23" fill="#b5c1d9">Internet · VoIP · Cloud · Security · Integration</text></g></svg>`)
  await sharp(target('public/brand/hero-signal-high.webp')).resize(1200, 630, { fit: 'cover' })
    .composite([
      { input: Buffer.from('<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#03060f" fill-opacity="0.8"/></svg>') },
      { input: wordmark, left: 72, top: 65 },
      { input: text },
    ]).jpeg({ quality: 88, mozjpeg: true }).toFile(target('public/brand/social-card.jpg'))
}
main().catch(error => { console.error(error); process.exit(1) })
