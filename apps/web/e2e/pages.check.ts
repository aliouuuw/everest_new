// Referential page check (lots L2+): full text in the served HTML, block order, links, lexicon, screenshots.
// Usage: build, start `bunx astro preview --port 4322 --host 127.0.0.1` in apps/web, then
//   bun apps/web/e2e/pages.check.ts [baseUrl=http://127.0.0.1:4322] [outDir=/tmp/everest-page-shots]
// Set CHROMIUM_PATH to use a cached Chromium when the Playwright browser is not installed.
import { chromium } from 'playwright'
import { HOME_TEXT } from '../../../src/content/home'
import { SOCIETE_TEXT } from '../../../src/content/societe'
import { EXPERTISES_TEXT, EXPERTISE_ITEMS } from '../../../src/content/expertises'
import { ACTUALITES_TEXT, ANALYSES_TEXT } from '../../../src/content/analyses'
import { CONTACT_TEXT, OPPORTUNITES_TEXT, SAMA_NAFFA_TEXT } from '../../../src/content/relation'
import type { Page } from 'playwright'

const BASE = process.argv[2] || 'http://127.0.0.1:4322'
const OUT = process.argv[3] || '/tmp/everest-page-shots'
const results: Array<{ name: string; ok: boolean; detail?: string }> = []
const check = (name: string, ok: boolean, detail = '') => results.push({ name, ok, detail })

const decode = (s: string) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

type PageSpec = {
  path: string
  texts: Record<string, string>
  meta?: string
  order: string[]
  links: Record<string, string>
  gone: string[]
  /** Texts exempt from the lexicon check (the §4 disclaimer quotes « performances passées »). */
  allow?: string[]
  /** Page-specific steps, run on desktop. */
  extra?: (page: Page, P: string) => Promise<void>
}

const PAGES: PageSpec[] = [
  {
    path: '/',
    texts: HOME_TEXT,
    meta: `EVEREST Finance, Société de Gestion et d'Intermédiation agréée par l'AMF-UMOA (n° SGI/DA/2016/60). Accès intégré aux marchés financiers de l'UEMOA.`,
    order: [
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
    ],
    links: {
      'Entrer en relation': '/contact',
      'Accéder aux opportunités': '/opportunites',
      'Analyses & Publications': '/analyses',
      'Découvrir Sama Naffa →': '/sama-naffa',
      'Entrer en relation avec nos équipes': '/contact',
      'Découvrir nos expertises': '/expertises',
      'Marché des Titres Publics': '/expertises/marche-titres-publics',
      'Marché Financier Régional (BRVM)': '/expertises/marche-financier-regional',
      'Structuration & Ingénierie Financière': '/expertises/ingenierie-financiere',
      'Private Office': '/expertises/private-office',
    },
    gone: ['Questions fréquentes', 'Mds F CFA', 'Insights', 'La confiance d'],
  },
  {
    path: '/la-societe',
    texts: SOCIETE_TEXT,
    meta: SOCIETE_TEXT['about.histoire.n1'],
    order: [
      'about.histoire.n1',
      'about.mission.n1',
      'about.nom.n1',
      'about.adn.n1',
      'about.engagements.n1',
      'about.engagement6.n1',
      'about.vision.n1',
      'about.gouvernance.n1',
      'about.conformite.n1',
    ],
    links: {
      'Histoire de la maison': '/la-societe#histoire',
      'Mission et récit du nom': '/la-societe#mission',
      "L'ADN de la maison": '/la-societe#adn',
      'Nos six engagements': '/la-societe#engagements',
      'Vision & gouvernance': '/la-societe#vision-gouvernance',
      'Conformité & agrément': '/la-societe#conformite',
    },
    gone: ['2013', 'Équipe dirigeante', 'Stress tests', 'Notre approche', 'Mds'],
  },
  {
    path: '/expertises',
    texts: Object.fromEntries(
      Object.entries(EXPERTISES_TEXT).filter(([id]) => id.startsWith('expertises.intro.') || /\.(heading|chapeau)$/.test(id)),
    ),
    meta: EXPERTISES_TEXT['expertises.intro.n1'],
    order: ['expertises.intro.n1', 'expertises.intro.n2', 'expertises.mtp.chapeau', 'expertises.brvm.chapeau', 'expertises.structuration.chapeau', 'expertises.privateOffice.chapeau'],
    links: {
      'Marché des Titres Publics': '/expertises/marche-titres-publics',
      'Marché Financier Régional (BRVM)': '/expertises/marche-financier-regional',
      'Structuration & Ingénierie Financière': '/expertises/ingenierie-financiere',
      'Private Office': '/expertises/private-office',
    },
    gone: ['Nos expertises.', 'Prendre rendez-vous', 'Optimisation'],
  },
  ...(
    [
      ['mtp', 'marche-titres-publics'],
      ['brvm', 'marche-financier-regional'],
      ['structuration', 'ingenierie-financiere'],
      ['privateOffice', 'private-office'],
    ] as const
  ).map(([key, slug]) => {
    const ids = Object.keys(EXPERTISES_TEXT).filter((id) => id.startsWith(`expertises.${key}.`))
    return {
      path: `/expertises/${slug}`,
      texts: Object.fromEntries(ids.map((id) => [id, EXPERTISES_TEXT[id as keyof typeof EXPERTISES_TEXT]])),
      meta: EXPERTISES_TEXT[`expertises.${key}.chapeau`],
      order: [
        `expertises.${key}.chapeau`,
        ...Array.from({ length: EXPERTISE_ITEMS[key] }, (_, i) => `expertises.${key}.i${i + 1}.n1`),
      ],
      links: { Expertises: '/expertises', 'Contact / Devenir client': '/contact' },
      gone: ['Optimisation', 'Prendre rendez-vous'],
    }
  }),
  {
    path: '/analyses',
    texts: ANALYSES_TEXT,
    meta: ANALYSES_TEXT['publications.n1'],
    order: ['publications.n1', 'publications.n2', 'publications.disclaimer'],
    links: {},
    gone: ['Nos revues', 'Aucune publication trouvée'],
    allow: [ANALYSES_TEXT['publications.disclaimer']],
    extra: async (page, P) => {
      await page.getByRole('button', { name: /Aperçu/ }).first().click()
      const modal = page.locator('div.fixed.inset-0.z-50')
      check(`${P} preview shows the disclaimer`, await modal.locator('[data-cms-id="publications.disclaimer"]').isVisible())
      await page.keyboard.press('Escape')
    },
  },
  {
    path: '/actualites',
    texts: ACTUALITES_TEXT,
    meta: ACTUALITES_TEXT['actualites.n1'],
    order: ['actualites.n1', 'actualites.n2'],
    links: {},
    gone: ['Publicité', 'Newsletter', 'Rubriques', 'Publications récentes', 'Centre de presse', "S'abonner"],
  },
  {
    path: '/opportunites',
    texts: OPPORTUNITES_TEXT,
    meta: OPPORTUNITES_TEXT['opportunites.n1'],
    order: ['opportunites.n1', 'opportunites.n2', 'opportunites.cta2'],
    links: { 'Devenir client': '/contact' },
    gone: ["Accéder à l'espace investisseur"],
  },
  {
    path: '/sama-naffa',
    texts: SAMA_NAFFA_TEXT,
    meta: SAMA_NAFFA_TEXT['sama-naffa.n1'],
    order: ['sama-naffa.n1', 'sama-naffa.cta'],
    links: { 'Découvrir Sama Naffa →': 'https://www.samanaffa.com' },
    gone: [],
  },
  {
    path: '/contact',
    texts: CONTACT_TEXT,
    order: [
      'contact.n1',
      'contact.n2',
      'contact.parcours.heading',
      'contact.step1.n1',
      'contact.step2.n1',
      'contact.step3.n1',
      'contact.step4.n1',
      'contact.coordonnees.n1',
    ],
    links: {
      'contact@everestfin.com': 'mailto:contact@everestfin.com',
      '+221 33 822 87 00': 'tel:+221338228700',
      '+221 33 822 87 01': 'tel:+221338228701',
    },
    gone: ['Parlons de vos projets', 'Horaires', 'Lundi', 'Envoyer un message', 'prendra contact sous'],
    extra: async (page, P) => {
      const required = await page.locator('main form [required]').count()
      check(`${P} form keeps its 3 required fields`, required === 3, String(required))
    },
  },
]

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
for (const spec of PAGES) {
  const P = spec.path
  // II.3: the served HTML holds the whole content (no JavaScript needed)
  const html = decode(await (await fetch(BASE + P)).text())
  // Text check ignores markup: links (e-mail, phone) and React comments split a text in the raw HTML.
  const plain = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '').replace(/\u00a0/g, ' ')
  for (const [id, text] of Object.entries(spec.texts)) check(`${P} HTML has ${id}`, plain.includes(text))
  if (spec.meta) check(`${P} meta description`, html.includes(`<meta name="description" content="${spec.meta}"`))

  for (const [w, h, label] of [[1440, 900, 'desktop'], [390, 844, 'phone']] as const) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(BASE + P, { waitUntil: 'networkidle' })
    const main = page.locator('main')

    // Reading order: top first, then left (cards on one row share a top).
    const pos = await Promise.all(
      spec.order.map((id) =>
        main.locator(`[data-cms-id="${id}"]`).last().evaluate((el) => {
          const r = el.getBoundingClientRect()
          return [Math.round(r.top + window.scrollY), Math.round(r.left)] as const
        }),
      ),
    )
    const after = (a: readonly [number, number], b: readonly [number, number]) => a[0] > b[0] || (a[0] === b[0] && a[1] > b[1])
    check(`${P} ${label} blocks in referential order`, pos.every((p, i) => i === 0 || after(p, pos[i - 1])), pos.map((p) => p.join(':')).join(','))

    let body = (await main.innerText()).replace(/\u00a0/g, ' ')
    for (const ok of spec.allow ?? []) body = body.split(ok).join(' ')
    for (const word of ['rendement', 'performance', 'attractif', 'compétitif'])
      check(`${P} ${label} no « ${word} »`, !body.toLowerCase().includes(word))
    check(`${P} ${label} no em dash`, !body.includes('—'))
    for (const gone of spec.gone) check(`${P} ${label} old text « ${gone} » removed`, !body.includes(gone))

    for (const [name, to] of Object.entries(spec.links)) {
      const got = await main.getByRole('link', { name, exact: true }).first().getAttribute('href')
      check(`${P} ${label} link « ${name} » -> ${to}`, got === to, String(got))
    }

    const hidden = await main.locator('[data-cms-id]').evaluateAll((els) =>
      els.filter((el) => Number(getComputedStyle(el).opacity) === 0).map((el) => el.getAttribute('data-cms-id')),
    )
    check(`${P} ${label} no hidden text`, hidden.length === 0, hidden.join(','))
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    check(`${P} ${label} no horizontal scroll`, overflow <= 0, `${overflow}px`)
    if (spec.extra && label === 'desktop') await spec.extra(page, P)
    check(`${P} ${label} no page errors`, errors.length === 0, errors.join(' | '))

    await page.screenshot({ path: `${OUT}/${P === '/' ? 'home' : P.slice(1)}-${label}-full.png`, fullPage: true })
    await page.close()
  }
}
await browser.close()

const failed = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : `  -> ${r.detail}`}`)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
