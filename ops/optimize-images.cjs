// Run in the seed image with /workspace/public and /app/public/media mounted.
const sharp = require('/app/node_modules/sharp')
const fs = require('node:fs/promises')
const path = require('node:path')
const budget = 200000

async function processFolder(folder) {
  const report = []
  for (const item of await fs.readdir(folder, { withFileTypes: true })) {
    const name = path.join(folder, item.name)
    if (item.isDirectory()) { report.push(...await processFolder(name)); continue }
    if (!/\.(webp|jpe?g|png)$/i.test(item.name)) continue
    const input = await fs.readFile(name)
    if (input.length <= budget) continue
    const format = (await sharp(input).metadata()).format
    let output
    for (const width of [1920, 1600, 1280, 960]) {
      for (const quality of [78, 65, 50, 35]) {
        let image = sharp(input).rotate().resize({ width, withoutEnlargement: true })
        if (format === 'jpeg') image = image.jpeg({ quality, mozjpeg: true })
        else if (format === 'webp') image = image.webp({ quality, effort: 4 })
        else image = image.png({ palette: true, quality, compressionLevel: 9 })
        output = await image.toBuffer()
        if (output.length <= budget) break
      }
      if (output.length <= budget) break
    }
    if (output.length > budget) throw new Error(`Image remains over budget: ${name}`)
    const temp = name + '.optimizing'
    await fs.writeFile(temp, output)
    await fs.rename(temp, name)
    report.push({ file: name, before: input.length, after: output.length, format })
  }
  return report
}
;(async () => {
 const report = [...await processFolder('/workspace/public'), ...await processFolder('/app/public/media')]
 console.log(JSON.stringify(report, null, 2))
})().catch(error => { console.error(error); process.exit(1) })
