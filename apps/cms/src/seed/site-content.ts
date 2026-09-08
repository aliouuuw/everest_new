import { getPayload } from 'payload'
import config from '../payload.config.js'
import { SITE_CONTENT_DEFAULTS } from './site-content-defaults.js'
import { registry } from '../../../../src/cms/registry.ts'

const context = { skipRebuild: true }

async function seedSiteContent(): Promise<void> {
  const payload = await getPayload({ config })
  let created = 0
  let kept = 0

  for (const [pageKey, entries] of Object.entries(registry)) {
    for (const entry of entries) {
      const value = SITE_CONTENT_DEFAULTS[entry.id]
      if (!value) {
        throw new Error(`Missing default for ${entry.id}`)
      }

      const existing = await payload.find({
        collection: 'site-content',
        where: { contentId: { equals: entry.id } },
        limit: 1,
        overrideAccess: true,
      })
      if (existing.docs[0]) {
        kept += 1
        continue
      }

      await payload.create({
        collection: 'site-content',
        data: {
          contentId: entry.id,
          pageKey,
          type: entry.type,
          value,
        },
        overrideAccess: true,
        context,
      })
      created += 1
      console.log(`Created site-content: ${entry.id}`)
    }
  }

  const total = await payload.find({
    collection: 'site-content',
    limit: 1,
    overrideAccess: true,
  })
  const expected = Object.values(registry).reduce((n, entries) => n + entries.length, 0)
  if (total.totalDocs < expected) {
    throw new Error(`Expected at least ${expected} site-content rows, got ${total.totalDocs}`)
  }

  console.log(`site-content: created ${created}, kept ${kept}, total ${total.totalDocs}`)
}

seedSiteContent()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error('Failed to seed site-content:', error)
    process.exit(1)
  })
