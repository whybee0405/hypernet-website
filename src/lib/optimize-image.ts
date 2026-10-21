import sharp from 'sharp'

/** Bound public image payloads while preserving aspect ratio and useful detail. */
export async function modernImage(input: Buffer): Promise<Buffer> {
  for (const width of [1920, 1600, 1280, 960]) {
    for (const quality of [78, 65, 50]) {
      const result = await sharp(input, { limitInputPixels: 40_000_000, animated: false }).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 4 }).toBuffer()
      if (result.length <= 200_000) return result
    }
  }
  throw new Error('Could not produce an image within the delivery budget')
}
