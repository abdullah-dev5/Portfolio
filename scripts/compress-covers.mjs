import sharp from 'sharp'
import { basename, join } from 'path'
import { readdir, unlink } from 'fs/promises'

const assetsDir = join(process.cwd(), 'src/assets')
const sources = [
  'project-accelerate-hub-cover-v2.png',
  'project-admission-portal-cover.png',
  'project-snipnote-lab-cover.png',
]

for (const file of sources) {
  const input = join(assetsDir, file)
  const outName = file.replace(/\.png$/i, '.webp')
  const output = join(assetsDir, outName)

  await sharp(input)
    .resize(1400, 788, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(output)

  const { size: inSize } = await sharp(input).metadata().then((m) => ({ size: m.size }))
  const outMeta = await sharp(output).metadata()
  console.log(`${basename(input)} → ${outName} (${Math.round(outMeta.size / 1024)} KB)`)
}

// Remove legacy PNG covers to keep repo lean
const legacy = [
  'project-accelerate-hub-cover.png',
  'project-accelerate-hub-cover-v2.png',
  'project-admission-portal-cover.png',
  'project-snipnote-lab-cover.png',
]

for (const file of legacy) {
  try {
    await unlink(join(assetsDir, file))
    console.log(`removed ${file}`)
  } catch {
    /* already gone */
  }
}
