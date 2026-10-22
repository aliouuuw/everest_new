// Global frame check (referential V2.1, lot L1): menu, footer, redirects, layout at 7 widths, screenshots.
// Usage: bun run build:web, start `bunx astro preview --port 4322 --host 127.0.0.1` in apps/web, then
//   node apps/web/e2e/frame.check.cjs [baseUrl=http://127.0.0.1:4322] [outDir=/tmp/everest-frame-shots]
// Set CHROMIUM_PATH to use a cached Chromium when the Playwright browser is not installed.
const path = require('node:path')
const fs = require('node:fs')
const { chromium } = require('playwright')
const BASE = process.argv[2] || 'http://127.0.0.1:4322'
const OUT = process.argv[3] || '/tmp/everest-frame-shots'
const EXE = process.env.CHROMIUM_PATH

const NAV = ['Accueil', 'La société', 'Expertises', 'Analyses & Publications', 'Actualités', 'Opportunités', 'Sama Naffa', 'Contact / Devenir client']
const NAV_PATHS = ['/', '/la-societe', '/expertises', '/analyses', '/actualites', '/opportunites', '/sama-naffa', '/contact']
const PAGES = [...NAV_PATHS, '/faq']
const REDIRECTS = {
  '/about': '/la-societe', '/mot-dg': '/la-societe', '/publications': '/analyses', '/insights': '/analyses',
  '/offres': '/opportunites', '/marches-opportunites': '/opportunites', '/services': '/expertises',
  '/bourse': '/expertises/marche-financier-regional', '/gestion-sous-mandat': '/expertises/private-office', '/marche-capitaux': '/expertises/ingenierie-financiere',
  '/outils-investisseur': '/contact', '/simulateur': '/contact',
}

const results = []
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail })
fs.mkdirSync(OUT, { recursive: true })
const slug = (p) => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'))

;(async () => {
  const browser = await chromium.launch(EXE ? { executablePath: EXE } : {})
  const errors = []

  for (const [w, h, label] of [[1280, 800, 'desktop1280'], [1366, 768, 'desktop1366'], [1440, 900, 'desktop1440'], [1536, 864, 'desktop1536'], [1920, 1080, 'desktop1920'], [390, 844, 'phone390'], [768, 1024, 'tablet768']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    page.on('pageerror', (e) => errors.push(`${label} ${page.url()}: ${e.message}`))
    page.on('console', (m) => m.type() === 'error' && errors.push(`${label} ${page.url()} console: ${m.text()}`))

    for (const p of PAGES) {
      const res = await page.goto(BASE + p, { waitUntil: 'networkidle' })
      check(`${label} ${p} status 200`, res && res.status() === 200, res && res.status())
      await page.waitForTimeout(400)
      await page.screenshot({ path: path.join(OUT, `${label}-${slug(p)}.png`) })
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      check(`${label} ${p} no horizontal scroll`, overflow <= 0, `overflow ${overflow}px`)
    }

    // footer (home, full width bottom)
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await footer.screenshot({ path: path.join(OUT, `${label}-footer.png`) })
    const ftext = await footer.innerText()
    check(`${label} footer signature`, ftext.includes('Encordés, vers le sommet'))
    check(`${label} footer copyright`, /EVEREST Finance, SGI agréée AMF-UMOA n° SGI\/DA\/2016\/60\. Tous droits réservés\./.test(ftext))
    for (const s of ['Mentions légales', "Conditions générales d'utilisation", 'Politique de Confidentialité', 'Abécédaire / FAQ'])
      check(`${label} footer has « ${s} »`, ftext.includes(s))
    const flinks = await footer.locator('ul').first().locator('a').allInnerTexts()
    check(`${label} footer 8 entries in order`, JSON.stringify(flinks.map((t) => t.trim())) === JSON.stringify(NAV), flinks.join(' | '))
    check(`${label} no ticker (header at top 0)`, (await page.locator('header').boundingBox()).y === 0)

    if (w >= 1280) {
      const nav = page.locator('header nav')
      const items = (await nav.locator(':scope > a, :scope > div > a').allInnerTexts()).map((t) => t.trim())
      check(`${label} menu 8 entries in order`, JSON.stringify(items) === JSON.stringify(NAV), items.join(' | '))
      // nothing in the header overlaps or wraps
      const boxes = await page.evaluate(() => {
        const hdr = document.querySelector('header > div')
        return [...hdr.children].filter((el) => el.getBoundingClientRect().width > 0).map((el) => { const r = el.getBoundingClientRect(); return { l: r.left, r: r.right, h: r.height } })
      })
      const fit = await nav.evaluate((n) => {
        const it = [...n.children].map((e) => e.getBoundingClientRect().width)
        return { need: it.reduce((a, b) => a + b, 0) + parseFloat(getComputedStyle(n).columnGap) * (it.length - 1), have: n.clientWidth }
      })
      check(`${label} menu fits its slot`, fit.need <= fit.have, `need ${Math.round(fit.need)} have ${fit.have}`)
      const noOverlap = boxes.every((b, i) => i === 0 || b.l >= boxes[i - 1].r - 0.5)
      check(`${label} header logo / nav / buttons do not overlap`, noOverlap, JSON.stringify(boxes))
      const navLinkHeights = await nav.locator('a').evaluateAll((as) => as.map((a) => a.getBoundingClientRect().height))
      check(`${label} menu labels on one line`, Math.max(...navLinkHeights) < 30, navLinkHeights.join(','))
      for (const b of ['Ouvrir un compte', 'Accès Client'])
        check(`${label} header button « ${b} » visible`, await page.locator('header').getByText(b, { exact: true }).first().isVisible())
      await page.screenshot({ path: path.join(OUT, `${label}-header.png`), clip: { x: 0, y: 0, width: w, height: 110 } })

      // Expertises dropdown
      await nav.getByText('Expertises', { exact: true }).hover()
      await page.waitForTimeout(250)
      const dd = await page.locator('header nav div.absolute a').allInnerTexts()
      check(`${label} Expertises dropdown 4 items`, dd.length === 4, dd.join(' | '))
      await page.screenshot({ path: path.join(OUT, `${label}-dropdown.png`), clip: { x: 0, y: 0, width: w, height: 420 } })
      await page.mouse.move(5, 600)

      // click each menu entry
      for (let i = 0; i < NAV.length; i++) {
        await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
        await Promise.all([page.waitForURL((u) => new URL(u).pathname.replace(/\/$/, '') === NAV_PATHS[i].replace(/\/$/, '')), nav.getByText(NAV[i], { exact: true }).click()])
        check(`${label} click « ${NAV[i]} » goes to ${NAV_PATHS[i]}`, true)
      }
    } else {
      // mobile drawer
      await page.goto(BASE + '/', { waitUntil: 'networkidle' })
      await page.getByRole('button', { name: 'Menu' }).click()
      await page.waitForTimeout(300)
      await page.screenshot({ path: path.join(OUT, `${label}-menu-open.png`) })
      const drawer = page.locator('header [data-lenis-prevent]')
      const top = (await drawer.locator(':scope > div > div:not(.pt-4) > a').allInnerTexts()).map((t) => t.trim())
      check(`${label} drawer 8 entries in order`, JSON.stringify(top) === JSON.stringify(NAV), top.join(' | '))
      await Promise.all([page.waitForURL('**/sama-naffa**'), drawer.getByText('Sama Naffa', { exact: true }).click()])
      check(`${label} drawer link navigates`, page.url().includes('/sama-naffa'))
    }
    await ctx.close()
  }

  // redirects
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  for (const [from, to] of Object.entries(REDIRECTS)) {
    await page.goto(BASE + from)
    await page.waitForURL((u) => new URL(u).pathname.replace(/\/$/, '') === to, { timeout: 8000 }).catch(() => {})
    const got = new URL(page.url()).pathname.replace(/\/$/, '')
    check(`redirect ${from} -> ${to}`, got === to, got)
  }
  const sn = await page.goto(BASE + '/sama-naffa')
  const cta = page.getByRole('link', { name: 'Découvrir Sama Naffa →' })
  check('Sama Naffa CTA href', (await cta.getAttribute('href')) === 'https://www.samanaffa.com')
  check('Sama Naffa logo loads', await page.locator('img[src="/sama-naffa-logo.png"]').evaluate((i) => i.complete && i.naturalWidth > 0))
  await page.goto(BASE + '/opportunites')
  check('Opportunités « Devenir client » -> /contact', (await page.getByRole('link', { name: 'Devenir client', exact: true }).getAttribute('href')) === '/contact')
  await browser.close()

  check('no page errors', errors.length === 0, errors.slice(0, 8).join('\n'))
  const failed = results.filter((r) => !r.ok)
  for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : `  -> ${r.detail}`}`)
  console.log(`\n${results.length - failed.length}/${results.length} passed`)
  process.exit(failed.length ? 1 : 0)
})().catch((e) => { console.error(e); process.exit(2) })
