import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const cmsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const astroDist = path.resolve(cmsRoot, '../web/dist')
const publicDir = path.join(cmsRoot, 'public')

if (!fs.existsSync(astroDist)) {
  console.error(`Missing Astro build output: ${astroDist}`)
  process.exit(1)
}

fs.mkdirSync(publicDir, { recursive: true })

for (const entry of fs.readdirSync(publicDir)) {
  if (entry === '.gitkeep') continue
  fs.rmSync(path.join(publicDir, entry), { recursive: true, force: true })
}

function copyDir(from, to) {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, entry.name)
    const destPath = path.join(to, entry.name)
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

copyDir(astroDist, publicDir)
console.log(`Synced ${astroDist} -> ${publicDir}`)
