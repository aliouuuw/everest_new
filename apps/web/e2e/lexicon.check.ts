// Lexicon gate (referential V2.1 I.6, II.3, lot L8): scan every built page for banned words, em dashes,
// spelling the referential fixes, and off-charter colors. Zero hits outside the §4 disclaimer.
// Usage: bun run build:web, then
//   bun apps/web/e2e/lexicon.check.ts                       (scans apps/web/dist)
//   bun apps/web/e2e/lexicon.check.ts https://staging...    (same page list, fetched from that site)
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { ANALYSES_TEXT } from '../../../src/content/analyses'

const DIST = join(import.meta.dir, '..', 'dist')
const BASE = process.argv[2]

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))

const files = walk(DIST)
const pages = files.filter((f) => f.endsWith('.html'))
const css = files.filter((f) => f.endsWith('.css'))

const RULES: Array<[string, RegExp]> = [
  ['banned word', /\b(performances?|rendements?|attracti(?:f|fs|ve|ves)|compétiti(?:f|fs|ve|ves))\b/gi],
  ['em dash', /—/g],
  ['« Everest Finance » case', /Everest Finance/g],
  ['agrément with a stray space', /SGI\s+\/\s*DA|SGI\/DA\s+\/|SGI\/2016-01/g],
  ['BTD 2029', /BTD\s*2029/gi],
  ['« Termes et conditions »', /Termes et conditions/gi],
  ['« Confidentialite » without accent', /Confidentialite\b/g],
]
const COLORS = /#c8a96b|#012d2a|#cb9824|#461d4c|rgba\(\s*1,\s*45,\s*42|rgba\(\s*70,\s*29,\s*76|rgba\(\s*20[23],\s*1(?:48|52)/gi

const decode = (s: string) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;| /g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

/** Visible text plus title and meta description; the §4 disclaimer is the one allowed exception. */
function visibleText(html: string): string {
  const head = [...html.matchAll(/<title>([^<]*)<\/title>|<meta name="description" content="([^"]*)"/g)]
    .map((m) => m[1] ?? m[2])
    .join(' \n ')
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' \n ')
  return decode(`${head}\n${body}`).split(ANALYSES_TEXT['publications.disclaimer']).join(' ')
}

const hits: string[] = []
let scanned = 0
for (const file of pages) {
  const path = '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\.html$/, '')
  const html = BASE ? await (await fetch(BASE + path)).text() : readFileSync(file, 'utf8')
  if (/http-equiv="refresh"/.test(html)) continue // redirect stub
  scanned++
  const text = visibleText(html)
  for (const [name, re] of RULES) {
    for (const m of text.matchAll(re)) {
      const at = m.index ?? 0
      hits.push(`${path}  ${name}: « …${text.slice(Math.max(0, at - 50), at + 40).replace(/\s+/g, ' ').trim()}… »`)
    }
  }
  for (const m of html.matchAll(COLORS)) hits.push(`${path}  off-charter color in HTML: ${m[0]}`)
}
for (const file of css) {
  for (const m of readFileSync(file, 'utf8').matchAll(COLORS)) hits.push(`${relative(DIST, file)}  off-charter color in CSS: ${m[0]}`)
}

for (const h of hits) console.log(`FAIL  ${h}`)
console.log(`\nlexicon gate: ${scanned} pages and ${css.length} CSS files scanned, ${hits.length} hit(s)`)
process.exit(hits.length ? 1 : 0)
