import { randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getPayload, type CollectionSlug, type Where } from 'payload'
import config from '../payload.config.js'
import { htmlToLexical } from './htmlToLexical.js'

type ConvexDoc = Record<string, unknown>
type Payload = Awaited<ReturnType<typeof getPayload>>
type DocId = number | string

function readJsonl(table: string): ConvexDoc[] {
  const root =
    process.env.CONVEX_EXPORT_DIR ||
    join(process.cwd(), '../../scripts/migration/.exports/convex-dev')

  let raw: string
  try {
    raw = readFileSync(join(root, table, 'documents.jsonl'), 'utf8')
  } catch {
    console.log(`Skip ${table}: no documents.jsonl`)
    return []
  }

  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as ConvexDoc)
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function asNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback
}

function asDate(value: unknown): string | undefined {
  const ms = asNumber(value)
  return ms === undefined ? undefined : new Date(ms).toISOString()
}

function asTags(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

/** A migration writes every document; one rebuild at the end, not thousands. */
const context = { skipRebuild: true }

/**
 * Insert or refresh one document, matched by `where`.
 * `createOnly` leaves an existing document untouched, which is what users
 * (generated passwords) and leads (immutable submissions) need.
 * Payload validates `data` at runtime, so the cast only skips its
 * per-slug compile-time generics.
 */
async function upsert(
  payload: Payload,
  collection: CollectionSlug,
  where: Where,
  data: Record<string, unknown>,
  label: string,
  createOnly = false,
): Promise<DocId> {
  const found = await payload.find({ collection, where, limit: 1, overrideAccess: true })
  const existing = found.docs[0]

  if (existing) {
    if (createOnly) {
      console.log(`Kept ${collection}: ${label}`)
      return existing.id
    }
    await payload.update({
      collection,
      id: existing.id,
      data: data as never,
      context,
      overrideAccess: true,
    })
    console.log(`Updated ${collection}: ${label}`)
    return existing.id
  }

  const created = await payload.create({
    collection,
    data: data as never,
    context,
    overrideAccess: true,
  })
  console.log(`Created ${collection}: ${label}`)
  return created.id
}

async function importUsers(payload: Payload): Promise<Map<string, DocId>> {
  const byConvexId = new Map<string, DocId>()

  for (const doc of readJsonl('users')) {
    const email = asString(doc.email).toLowerCase()
    if (!email) continue

    const id = await upsert(
      payload,
      'users',
      { email: { equals: email } },
      {
        email,
        password: randomBytes(16).toString('hex'),
        name: asString(doc.name) || email,
        role: asString(doc.role, 'viewer'),
      },
      email,
      true,
    )
    byConvexId.set(asString(doc._id), id)
  }

  return byConvexId
}

type AuthorOf = (convexId: unknown) => DocId

async function importPublications(_payload: Payload): Promise<void> {
  // Public publications are uploaded PDFs in admin, not Convex HTML slugs.
  console.log('Skip Convex HTML publications. Seed PDFs with: bun run seed:publications')
}

async function importArticles(payload: Payload, authorOf: AuthorOf): Promise<void> {
  for (const doc of readJsonl('articles')) {
    const slug = asString(doc.slug)
    await upsert(payload, 'articles', { slug: { equals: slug } }, {
      title: asString(doc.title),
      slug,
      excerpt: asString(doc.excerpt),
      content: htmlToLexical(asString(doc.content)),
      imageUrl: asString(doc.imageUrl) || undefined,
      category: asString(doc.category, 'Marchés'),
      status: asString(doc.status, 'draft'),
      featured: asBoolean(doc.featured),
      author: authorOf(doc.authorId),
      tags: asTags(doc.tags),
      publishedAt: asDate(doc.publishedAt) ?? asDate(doc.createdAt),
    }, slug)
  }
}

async function importExternalArticles(payload: Payload): Promise<void> {
  for (const doc of readJsonl('externalArticles')) {
    const guid = asString(doc.guid)
    await upsert(payload, 'external-articles', { guid: { equals: guid } }, {
      guid,
      slug: asString(doc.slug) || undefined,
      title: asString(doc.title),
      excerpt: asString(doc.excerpt) || asString(doc.title),
      content: asString(doc.content) || undefined,
      url: asString(doc.url),
      imageUrl: asString(doc.imageUrl) || 'https://placehold.co/800x450',
      publishedAt: asDate(doc.publishedAt),
      source: asString(doc.source, 'sika-finance'),
      sourceName: asString(doc.sourceName, 'Sika Finance'),
      category: asString(doc.category, 'Marchés'),
      fetchedAt: asDate(doc.fetchedAt) ?? new Date().toISOString(),
    }, guid)
  }
}

async function importSiteContent(payload: Payload, authorOf: AuthorOf): Promise<void> {
  for (const doc of readJsonl('siteContent')) {
    const contentId = asString(doc.contentId)
    await upsert(payload, 'site-content', { contentId: { equals: contentId } }, {
      contentId,
      pageKey: asString(doc.pageKey),
      type: asString(doc.type, 'text'),
      value: asString(doc.value),
      updatedBy: authorOf(doc.updatedBy),
    }, contentId)
  }
}

async function importLeads(payload: Payload): Promise<void> {
  for (const doc of readJsonl('investorProfileLeads')) {
    const email = asString(doc.email)
    const createdAt = asDate(doc.createdAt)
    await upsert(
      payload,
      'investor-leads',
      {
        and: [
          { email: { equals: email } },
          ...(createdAt ? [{ createdAt: { equals: createdAt } }] : []),
        ],
      },
      {
        // Leads have no natural key, so the submission time is half of it.
        // It has to be written for a re-run to match instead of duplicating.
        createdAt,
        firstName: asString(doc.firstName),
        lastName: asString(doc.lastName),
        email,
        phone: asString(doc.phone) || undefined,
        profileType: asString(doc.profileType, 'balanced'),
        profileTitle: asString(doc.profileTitle, 'Profil'),
        riskLevel: asNumber(doc.riskLevel) ?? 0,
        answers: Array.isArray(doc.answers) ? doc.answers : [],
        investmentAmount: asNumber(doc.investmentAmount),
        emailSent: asBoolean(doc.emailSent),
        emailSentAt: asDate(doc.emailSentAt),
        pdfGenerated: asBoolean(doc.pdfGenerated),
        pdfUrl: asString(doc.pdfUrl) || undefined,
        source: asString(doc.source) || undefined,
        userAgent: asString(doc.userAgent) || undefined,
      },
      email,
      true,
    )
  }
}

async function importConvex(): Promise<void> {
  const payload = await getPayload({ config })
  const userIds = await importUsers(payload)

  const fallbackAuthor = [...userIds.values()][0]
  if (fallbackAuthor === undefined) {
    throw new Error('No users available to own imported documents')
  }
  const authorOf: AuthorOf = (convexId) =>
    userIds.get(asString(convexId)) ?? fallbackAuthor

  await importPublications(payload)
  await importArticles(payload, authorOf)
  await importExternalArticles(payload)
  await importSiteContent(payload, authorOf)
  await importLeads(payload)

  console.log('Convex import complete.')
}

importConvex()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error('Convex import failed:', error)
    process.exit(1)
  })
