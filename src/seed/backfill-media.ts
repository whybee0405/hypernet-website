import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * One-off, additive fix for any deployment whose database predates the
 * supplementary imagery added 2026-09-17 (Sectors, TrustBand, Connectivity
 * "what is included"). The regular seed script is gated behind a
 * "content already seeded" marker on every deployment past the first, so a
 * new photo added to IMAGES in seed.ts never reaches an existing database on
 * its own. This script only ever creates media rows, and only for filenames
 * that don't already exist, so it is safe to run against a database with
 * real content in every other collection.
 *
 * Run with:  npm run backfill:media
 */
const dirname = path.dirname(fileURLToPath(import.meta.url))
const asset = (name: string) => path.resolve(dirname, 'assets', name)

const NEW_IMAGES: { file: string; alt: string }[] = [
  {
    file: 'sectors-shop-counter.jpg',
    alt: 'A shopkeeper handing change to a customer over a hardware shop counter with a card machine beside the till',
  },
  {
    file: 'install-close-up.jpg',
    alt: "A technician's hands testing a freshly labelled network port at a wall-mounted patch panel",
  },
  {
    file: 'trust-paperwork-desk.jpg',
    alt: 'Hands turning pages in a lever-arch file of registration paperwork beside an open laptop on an office desk',
  },
]

const run = async () => {
  const payload = await getPayload({ config })

  for (const entry of NEW_IMAGES) {
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: entry.file } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`  already present: ${entry.file}`)
      continue
    }

    await payload.create({
      collection: 'media',
      data: { alt: entry.alt },
      filePath: asset(entry.file),
    })
    payload.logger.info(`  uploaded: ${entry.file}`)
  }

  payload.logger.info('Media backfill complete.')
  process.exit(0)
}

await run()
