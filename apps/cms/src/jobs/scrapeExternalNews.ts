import { decodeEntities } from '../seed/htmlToLexical.js'

export type ExternalItem = {
  guid: string
  slug: string
  title: string
  excerpt: string
  content: string
  url: string
  imageUrl: string
  publishedAt: number
  source: 'sika-finance' | 'madis-invest'
  sourceName: string
  category: string
  fetchedAt: number
}

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function decodeUnicodeEscapes(str: string): string {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  )
}

async function safeFetch(url: string): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15_000)
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.5',
      },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

/** First capture group of `pattern`, trimmed, or '' when it does not match. */
function capture(text: string, pattern: RegExp): string {
  return text.match(pattern)?.[1]?.trim() ?? ''
}

function toTimestamp(value: string): number {
  const ms = Date.parse(value)
  return Number.isNaN(ms) ? Date.now() : ms
}

async function fetchSikaBody(url: string): Promise<string> {
  const html = await safeFetch(url)
  if (!html) return ''
  return capture(html, /<article>([\s\S]*?)<\/article>/i)
    .replace(/src="\.\.\//g, 'src="https://www.sikafinance.com/')
    .replace(/<p class="allf[^"]*">[^<]*<\/p>/gi, '')
    .trim()
}

export async function scrapeSikaFinance(): Promise<ExternalItem[]> {
  const rssText = await safeFetch(
    'https://www.sikafinance.com/rss/actualites_bourse_brvm',
  )
  if (!rssText) return []

  const items: ExternalItem[] = []

  for (const match of rssText.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    if (items.length >= 3) break
    const xml = match[1] ?? ''

    const title = decodeEntities(capture(xml, /<title>([^<]+)<\/title>/i))
    const url = capture(xml, /<link>([^<]+)<\/link>/i)
    if (!title || !url) continue

    const excerpt = decodeEntities(
      capture(xml, /<description>([^<]+)<\/description>/i),
    ).slice(0, 250)

    items.push({
      guid: capture(xml, /<guid[^>]*>([^<]+)<\/guid>/i) || url,
      slug: makeSlug(title),
      title,
      excerpt,
      content: (await fetchSikaBody(url)) || `<p>${excerpt}</p>`,
      url,
      imageUrl:
        capture(xml, /<enclosure\s+url="([^"]+)"/i) ||
        'https://placehold.co/800x450',
      publishedAt: toTimestamp(capture(xml, /<pubDate>([^<]+)<\/pubDate>/i)),
      source: 'sika-finance',
      sourceName: 'Sika Finance',
      category: 'Marchés',
      fetchedAt: Date.now(),
    })
  }

  return items
}

/** Madis renders article bodies into Next.js flight chunks keyed by `$<hex>`. */
function buildChunkMap(rawHtml: string): Map<string, string> {
  const chunkRe =
    /([0-9a-f]+):T[0-9a-f]+,"\]?\)?\s*<\/script>\s*<script>\s*self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g

  const chunkMap = new Map<string, string>()
  for (const cm of rawHtml.matchAll(chunkRe)) {
    chunkMap.set(
      `$${cm[1]}`,
      decodeUnicodeEscapes(
        cm[2].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\'),
      ),
    )
  }
  return chunkMap
}

function madisContent(
  chunkMap: Map<string, string>,
  descRef: string,
  metaDesc: string,
  title: string,
): string {
  const body = (chunkMap.get(descRef) ?? '')
    .replace(/<head><\/head>/gi, '')
    .replace(/<\/?body>/gi, '')
    .replace(/class="PlaygroundEditorTheme__[^"]*"/g, '')
    .replace(/style="white-space: pre-wrap;"/g, '')
    .trim()

  return body || `<p>${metaDesc || title}</p>`
}

export async function scrapeMadisInvest(): Promise<ExternalItem[]> {
  const rawHtml = await safeFetch('https://madisinvest.com/')
  if (!rawHtml) return []

  const html = rawHtml.replace(/\\"/g, '"')
  const chunkMap = buildChunkMap(rawHtml)

  const items: ExternalItem[] = []
  const seen = new Set<string>()
  const blockRe = /\{[^{}]{200,3000}?madisinvest\.com\/images\/[^{}]{0,1500}?\}/g

  for (const blockMatch of html.matchAll(blockRe)) {
    if (items.length >= 3) break
    const block = blockMatch[0]
    const id = capture(block, /"id":"([A-Za-z0-9]{15,30})"/)
    const title = decodeEntities(capture(block, /"title":"([^"]{15,300})"/))
    const media = capture(
      block,
      /"media":"(https:\/\/madisinvest\.com\/images\/[^"]+)"/,
    )

    if (!id || !title || !media || seen.has(id)) continue
    seen.add(id)

    const metaDesc = decodeEntities(
      capture(block, /"metaDescription":"([^"]{10,600})"/),
    )
    const descRef = capture(block, /"description":"(\$[0-9a-f]+)"/)

    items.push({
      guid: id,
      slug: makeSlug(title),
      title,
      excerpt: (metaDesc || title).slice(0, 250),
      content: madisContent(chunkMap, descRef, metaDesc, title),
      url: 'https://madisinvest.com/',
      imageUrl: media,
      publishedAt: toTimestamp(
        capture(block, /"createdAt":"(\d{4}-\d{2}-\d{2}T[^"]+)"/),
      ),
      source: 'madis-invest',
      sourceName: 'Madis Invest',
      category: 'Bourse',
      fetchedAt: Date.now(),
    })
  }

  return items.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 3)
}
