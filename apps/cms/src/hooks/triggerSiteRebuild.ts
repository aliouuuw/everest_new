import type { CollectionAfterChangeHook, Payload } from 'payload'

/** Ask the host to rebuild the static site. No-op locally, where we just log. */
export async function rebuildSite(payload: Payload, reason: string): Promise<void> {
  const rebuildUrl = process.env.SITE_REBUILD_URL
  if (!rebuildUrl) {
    payload.logger.info(`${reason}. Rebuild locally with: bun run build:web`)
    return
  }

  try {
    const response = await fetch(rebuildUrl, { method: 'POST' })
    if (response.ok) {
      payload.logger.info(`Triggered site rebuild: ${reason}`)
    } else {
      payload.logger.error(`Site rebuild hook failed (${response.status}): ${reason}`)
    }
  } catch (error) {
    payload.logger.error(`Site rebuild hook error: ${String(error)}`)
  }
}

/**
 * Attach to any collection whose content is baked into the static site.
 * Bulk writers pass `context: { skipRebuild: true }` and call `rebuildSite`
 * once when they finish, so a batch is one deploy instead of one per document.
 */
export const triggerSiteRebuild: CollectionAfterChangeHook = async ({
  collection,
  context,
  doc,
  req,
}) => {
  if (context.skipRebuild) return doc

  const status = (doc as { status?: string }).status
  if (status && status !== 'published') return doc

  await rebuildSite(req.payload, `Published ${collection.slug}`)
  return doc
}
