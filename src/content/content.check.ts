// Every site text must appear word for word in the referential (punctuation ignored: em dashes were replaced).
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { TEXT } from './index.ts'

const words = (s: string) =>
  s
    .replace(/\*\*|\\|^>\s?/gm, '')
    .replace(/[’']/g, "'")
    .replace(/[.,;:()—→·]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const referential = words(
  readFileSync(new URL('../../docs/referentiel/SITEWEB-REFERENTIEL-V2.1.md', import.meta.url), 'utf8'),
)

for (const [id, text] of Object.entries(TEXT)) {
  assert.ok(referential.includes(words(text)), `${id} is not word for word in the referential`)
  assert.ok(!text.includes('—'), `${id} still has an em dash`)
}
console.log(`site copy: ${Object.keys(TEXT).length} texts match the referential`)
