import { getPayload } from 'payload'
import config from '../src/payload.config'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const payload = await getPayload({ config })
const media = await payload.find({ collection: 'media', pagination: false, depth: 0 })
for (const doc of media.docs) {
  const root = process.env.MEDIA_DIR || '/app/public/media'
  const original = await stat(path.join(root, doc.filename!))
  const dimensions = await sharp(path.join(root, doc.filename!)).metadata()
  const sizes = { ...doc.sizes }
  for (const [key, value] of Object.entries(sizes)) {
    if (value?.filename) {
      const file = await stat(path.join(root, value.filename))
      const dimensions = await sharp(path.join(root, value.filename)).metadata()
      ;(sizes as Record<string, unknown>)[key] = { ...value, filesize: file.size, width: dimensions.width, height: dimensions.height }
    }
  }
  const alt = doc.alt.toLowerCase().startsWith('illustration') ? doc.alt : `Illustration: ${doc.alt}`
  await payload.update({ collection: 'media', id: doc.id, data: { alt, filesize: original.size, width: dimensions.width, height: dimensions.height, sizes }, overrideAccess: true })
}
console.log(`Updated image sizes and illustration descriptions for ${media.docs.length} media records.`)
await payload.destroy()
