// Build and serve apps/web on port 4322, then run:
// CHROMIUM_PATH=/path/to/Chromium bun apps/web/e2e/home-design.check.ts
import assert from 'node:assert/strict'
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'
import { HOME_TEXT } from '../../../src/content/home'
import { SITE_NAV } from '../../../src/components/siteNav'
import { PUBLICATION_FILES } from '../../../src/data/publications'

const positioning = HOME_TEXT['home.positioning.n2']
const span = positioning.match(/(de la [^,.]+?) (au [^,.]+?)\./)
const chainLabels = [...(positioning.match(/\(([^)]+)\)/)?.[1].split(', ') ?? []), span?.[1] ?? '', span?.[2] ?? '']

const base = process.argv[2] || 'http://127.0.0.1:4322'
const out = process.argv[3] || '.impeccable/review'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
)

try {
  for (const width of [390, 768, 1024, 1440, 1920]) {
    const page = await browser.newPage({
      viewport: { width, height: width === 390 ? 844 : 900 },
      reducedMotion: 'reduce',
    })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const response = await page.goto(base, { waitUntil: 'networkidle' })
    assert.equal(response?.status(), 200, `${width}: page serves successfully`)
    assert.equal(await page.locator('vite-error-overlay').count(), 0, `${width}: no dev import error`)
    assert.equal(
      await page.locator('#hero').evaluate((hero) => getComputedStyle(hero).backgroundColor),
      'rgb(14, 40, 38)',
      `${width}: home stylesheet loads`,
    )
    await page.locator('.everest-home img').evaluateAll((images) =>
      images.forEach((image) => { (image as HTMLImageElement).loading = 'eager' }),
    )
    await page.evaluate(() => Promise.all(
      Array.from(document.querySelectorAll<HTMLImageElement>('.everest-home img'))
        .map((image) => image.decode()),
    ))
    const measurements = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      height: document.documentElement.scrollHeight,
      hero: document.querySelector('#hero')!.getBoundingClientRect().height,
      viewportHeight: innerHeight,
      videos: document.querySelectorAll('#hero video').length,
      summaries: Array.from(document.querySelectorAll('.everest-home summary'))
        .map((summary) => summary.getBoundingClientRect().height),
    }))
    assert.equal(measurements.overflow, 0, `${width}: horizontal overflow`)
    assert.ok(measurements.hero >= measurements.viewportHeight, `${width}: hero owns the first viewport`)
    assert.equal(measurements.videos, 0, `${width}: reduced motion loads no video`)
    assert.ok(measurements.summaries.every((height) => height >= 44), `${width}: disclosure touch targets`)
    // 6000 was the folded target. Owner decision (23 Oct 2026): evidence stays open, only expertises fold.
    if (width === 390) assert.ok(measurements.height < 8500, `phone height: ${measurements.height}`)

    const text = (await page.locator('.everest-home').innerText()).replace(/\u00a0/g, ' ')
    for (const invented of ['100% Intégrée', 'Dakar Desk', 'Architecture de preuve', 'Déplier les détails']) {
      assert.ok(!text.includes(invented), `${width}: invented text "${invented}"`)
    }
    for (const summary of await page.locator('.everest-home summary').all()) {
      const initial = await summary.evaluate((element) => (element.parentElement as HTMLDetailsElement).open)
      await summary.click()
      assert.equal(await summary.evaluate((element) => (element.parentElement as HTMLDetailsElement).open), !initial)
      await summary.press('Enter')
      assert.equal(await summary.evaluate((element) => (element.parentElement as HTMLDetailsElement).open), initial)
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur())
    await page.screenshot({ path: `${out}/home-${width}.png` })
    await page.screenshot({ path: `${out}/home-${width}-full.png`, fullPage: true })
    assert.deepEqual(errors, [], `${width}: page errors`)
    console.log(`PASS ${width}px: height ${measurements.height}px, no overflow, disclosures and images work`)
    await page.close()
  }

  const noJS = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  })
  await noJS.goto(base, { waitUntil: 'networkidle' })
  const content = noJS.locator('.everest-home')
  const allCopy = (await content.textContent())!.replace(/\u00a0/g, ' ')
  for (const [id, text] of Object.entries(HOME_TEXT)) {
    assert.ok(allCopy.includes(text), `no-JS HTML includes ${id}`)
  }
  let remainder = allCopy
  const allowed = [
    ...Object.values(HOME_TEXT),
    ...(SITE_NAV.find((entry) => entry.children)?.children ?? []).map((entry) => entry.label),
    'Analyses & Publications',
    'Découvrir Sama Naffa →',
    // Catalogue records captioning the covers, and the chain labels, which repeat the positioning N2's own words.
    ...PUBLICATION_FILES.filter((pub) => pub.frequency === 'hebdomadaire').map((pub) => pub.title),
    ...chainLabels,
  ]
  for (const text of allowed) remainder = remainder.replace(text, '')
  assert.equal(remainder.replace(/\s+/g, ''), '', 'home contains no unapproved public copy')
  for (const summary of await content.locator('summary').all()) {
    if (!await summary.evaluate((element) => (element.parentElement as HTMLDetailsElement).open)) await summary.click()
    assert.equal(await summary.evaluate((element) => (element.parentElement as HTMLDetailsElement).open), true)
  }
  const revealed = (await content.innerText()).replace(/\u00a0/g, ' ')
  const readable = (text: string) => text.replace(/\s+/g, ' ').replace(/\s+([.,])/g, '$1')
  for (const [id, text] of Object.entries(HOME_TEXT).filter(([id]) => id.endsWith('.n2'))) {
    // Layout splits list items across lines without changing their words.
    assert.ok(readable(revealed).includes(readable(text)), `no-JS readable ${id}`)
  }
  await noJS.screenshot({ path: `${out}/home-no-js.png`, fullPage: true })
  console.log('PASS no-JS: all referential copy is present and disclosures open')
  await noJS.close()

  const motion = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
  await motion.goto(base, { waitUntil: 'networkidle' })
  await motion.waitForSelector('#hero video')
  await motion.emulateMedia({ reducedMotion: 'reduce' })
  await motion.waitForSelector('#hero video', { state: 'detached' })
  console.log('PASS motion: desktop video responds to reduced-motion changes')
  await motion.close()
} finally {
  await browser.close()
}
