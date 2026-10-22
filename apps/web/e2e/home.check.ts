// Home page check (referential V2.1 §1, lot L2): full text in the served HTML, block order, links, lexicon, screenshots.
// Usage: build, start `bunx astro preview --port 4322 --host 127.0.0.1` in apps/web, then
//   bun apps/web/e2e/home.check.ts [baseUrl=http://127.0.0.1:4322] [outDir=/tmp/everest-home-shots]
// Set CHROMIUM_PATH to use a cached Chromium when the Playwright browser is not installed.
import { chromium } from 'playwright'
import { HOME_TEXT } from '../../../src/content/home'

const BASE = process.argv[2] || 'http://127.0.0.1:4322'
const OUT = process.argv[3] || '/tmp/everest-home-shots'
const results: Array<{ name: string; ok: boolean; detail?: string }> = []
const check = (name: string, ok: boolean, detail = '') => results.push({ name, ok, detail })

const decode = (s: string) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

// 1. II.3: the served HTML holds the whole content (no JavaScript needed)
const html = decode(await (await fetch(BASE + '/')).text())
for (const [id, text] of Object.entries(HOME_TEXT)) check(`HTML has ${id}`, html.includes(text))
check('HTML has the II.3 meta description', html.includes(`EVEREST Finance, Société de Gestion et d'Intermédiation agréée par l'AMF-UMOA (n° SGI/DA/2016/60). Accès intégré aux marchés financiers de l'UEMOA.`))

const ORDER = [
  'home.hero.title',
  'home.positioning.n1',
  'home.proof1.n1',
  'home.engagements.n1',
  'home.analyses.n1',
  'home.expertises.n1',
  'home.segments.n1',
  'home.samaNaffa.n1',
  'home.governance.n1',
  'home.finalCta.cta1',
] as const

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
for (const [w, h, label] of [[1440, 900, 'desktop'], [390, 844, 'phone']] as const) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })

  const tops = await Promise.all(
    ORDER.map((id) => page.locator(`[data-cms-id="${id}"]`).first().evaluate((el) => el.getBoundingClientRect().top + window.scrollY)),
  )
  check(`${label} blocks in referential order`, tops.every((t, i) => i === 0 || t > tops[i - 1]), tops.map(Math.round).join(','))

  const body = await page.locator('main').innerText()
  for (const word of ['rendement', 'performance', 'attractif', 'compétitif'])
    check(`${label} no « ${word} »`, !body.toLowerCase().includes(word))
  for (const gone of ['Questions fréquentes', 'Mds F CFA', 'Insights', 'La confiance d'])
    check(`${label} old block « ${gone} » removed`, !body.includes(gone))

  const LINKS: Record<string, string> = {
    'Entrer en relation': '/contact',
    'Accéder aux opportunités': '/opportunites',
    'Analyses & Publications': '/analyses',
    'Découvrir Sama Naffa →': '/sama-naffa',
    'Entrer en relation avec nos équipes': '/contact',
    'Découvrir nos expertises': '/expertises',
    'Marché des Titres Publics': '/expertises#marche-titres-publics',
    'Marché Financier Régional (BRVM)': '/expertises#marche-financier-regional',
    'Structuration & Ingénierie Financière': '/expertises#ingenierie-financiere',
    'Private Office': '/expertises#private-office',
  }
  for (const [name, to] of Object.entries(LINKS)) {
    const got = await page.locator('main').getByRole('link', { name, exact: true }).first().getAttribute('href')
    check(`${label} link « ${name} » -> ${to}`, got === to, String(got))
  }

  const hidden = await page.locator('main [data-cms-id]').evaluateAll((els) =>
    els.filter((el) => Number(getComputedStyle(el).opacity) === 0).map((el) => el.getAttribute('data-cms-id')),
  )
  check(`${label} no hidden text`, hidden.length === 0, hidden.join(','))
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  check(`${label} no horizontal scroll`, overflow <= 0, `${overflow}px`)
  check(`${label} no page errors`, errors.length === 0, errors.join(' | '))

  await page.screenshot({ path: `${OUT}/home-${label}-full.png`, fullPage: true })
  await page.close()
}
await browser.close()

const failed = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : `  -> ${r.detail}`}`)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
