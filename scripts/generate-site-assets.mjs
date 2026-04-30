import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const iconSource = path.join(publicDir, 'brand', 'logo-icon.png')
const svgSource = path.join(publicDir, 'brand', 'logo-icon.svg')

async function png(size, output) {
  await sharp(iconSource)
    .resize(size, size, { fit: 'contain' })
    .png()
    .toFile(path.join(publicDir, output))
}

function buildIco(entries) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(entries.length, 4)

  let offset = 6 + entries.length * 16
  const directory = []

  for (const entry of entries) {
    const dir = Buffer.alloc(16)
    dir.writeUInt8(entry.size >= 256 ? 0 : entry.size, 0)
    dir.writeUInt8(entry.size >= 256 ? 0 : entry.size, 1)
    dir.writeUInt8(0, 2)
    dir.writeUInt8(0, 3)
    dir.writeUInt16LE(1, 4)
    dir.writeUInt16LE(32, 6)
    dir.writeUInt32LE(entry.buffer.length, 8)
    dir.writeUInt32LE(offset, 12)
    directory.push(dir)
    offset += entry.buffer.length
  }

  return Buffer.concat([header, ...directory, ...entries.map((entry) => entry.buffer)])
}

async function favicon() {
  const sizes = [16, 32, 48]
  const entries = []

  for (const size of sizes) {
    const buffer = await sharp(iconSource)
      .resize(size, size, { fit: 'contain' })
      .png()
      .toBuffer()
    entries.push({ size, buffer })
  }

  await fs.writeFile(path.join(publicDir, 'favicon.ico'), buildIco(entries))

  const svg = await fs.readFile(svgSource, 'utf8')
  await fs.writeFile(
    path.join(publicDir, 'favicon.svg'),
    svg.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, ''),
  )
}

async function openGraph() {
  const logoData = await fs.readFile(path.join(publicDir, 'brand', 'logo-icon-white.svg'), 'utf8')
  const logoBase64 = Buffer.from(logoData).toString('base64')
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0d101c"/>
      <path d="M0 140H1200M0 280H1200M0 420H1200M0 560H1200M160 0V630M320 0V630M480 0V630M640 0V630M800 0V630M960 0V630" stroke="#253342" stroke-width="1" opacity=".28"/>
      <rect x="80" y="78" width="1040" height="474" fill="none" stroke="#3E5854" stroke-width="2" opacity=".7"/>
      <image href="data:image/svg+xml;base64,${logoBase64}" x="84" y="98" width="146" height="146"/>
      <text x="270" y="160" fill="#ffffff" font-family="Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="-1">ЕМ-ПСП</text>
      <text x="272" y="212" fill="#8ab0a3" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="6">ENGINEERING · PROJECT · CONSTRUCTION</text>
      <text x="84" y="360" fill="#ffffff" font-family="Arial, sans-serif" font-size="50" font-weight="700">Инженерные системы</text>
      <text x="84" y="425" fill="#d9d6cb" font-family="Arial, sans-serif" font-size="34">проектирование · строительство · надзор</text>
      <text x="84" y="505" fill="#8ab0a3" font-family="Arial, sans-serif" font-size="24" font-weight="700">СРО · ISO 9001 / 14001 / 45001 · 398 объектов</text>
    </svg>
  `

  await sharp(Buffer.from(svg)).png().toFile(path.join(publicDir, 'og-image.png'))
}

await fs.mkdir(publicDir, { recursive: true })
await png(16, 'favicon-16x16.png')
await png(32, 'favicon-32x32.png')
await png(180, 'apple-touch-icon.png')
await png(192, 'android-chrome-192x192.png')
await png(512, 'android-chrome-512x512.png')
await favicon()
await openGraph()

console.log('Site assets generated.')
