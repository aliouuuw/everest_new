import { getPayload } from 'payload'
import config from '../payload.config.js'
import { rebuildSite } from '../hooks/triggerSiteRebuild.js'
import {
  scrapeMadisInvest,
  scrapeSikaFinance,
  type ExternalItem,
} from './scrapeExternalNews.js'

type Payload = Awaited<ReturnType<typeof getPayload>>
type FetchResult = { source: string; count: number; error?: string }

const sources = [
  { name: 'sika-finance', scrape: scrapeSikaFinance },
  { name: 'madis-invest', scrape: scrapeMadisInvest },
]

/** One rebuild for the whole run, not one per article. */
const context = { skipRebuild: true }

async function upsertItem(payload: Payload, item: ExternalItem): Promise<void> {
  const existing = await payload.find({
    collection: 'external-articles',
    where: { guid: { equals: item.guid } },
    limit: 1,
    overrideAccess: true,
  })

  const data = {
    guid: item.guid,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || item.title,
    content: item.content,
    url: item.url,
    imageUrl: item.imageUrl,
    publishedAt: new Date(item.publishedAt).toISOString(),
    source: item.source,
    sourceName: item.sourceName,
    category: item.category,
    fetchedAt: new Date(item.fetchedAt).toISOString(),
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'external-articles',
      id: existing.docs[0].id,
      data,
      context,
      overrideAccess: true,
    })
    return
  }

  await payload.create({
    collection: 'external-articles',
    data,
    context,
    overrideAccess: true,
  })
}

export async function fetchAndStoreExternalNews(): Promise<FetchResult[]> {
  const payload = await getPayload({ config })
  const results: FetchResult[] = []

  for (const { name, scrape } of sources) {
    try {
      const items = await scrape()
      for (const item of items) await upsertItem(payload, item)
      results.push({
        source: name,
        count: items.length,
        ...(items.length === 0 ? { error: 'No articles found' } : {}),
      })
    } catch (error) {
      results.push({ source: name, count: 0, error: String(error) })
    }
  }

  const imported = results.reduce((total, result) => total + result.count, 0)
  if (imported > 0) {
    await rebuildSite(payload, `Fetched ${imported} external articles`)
  }

  return results
}
