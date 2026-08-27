import { randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getPayload } from 'payload'
import config from '../payload.config.js'
import { htmlToLexical } from './htmlToLexical.js'

type ConvexDoc = Record<string, unknown>

function exportRoot(): string {
  return (
    process.env.CONVEX_EXPORT_DIR ||
    join(process.cwd(), '../../scripts/migration/.exports/convex-dev')
  )
}

function readJsonl(table: string): ConvexDoc[] {
  const file = join(exportRoot(), table, 'documents.jsonl')
  let raw: string
  try {
    raw = readFileSync(file, 'utf8')
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
  if (!ms) return undefined
  return new Date(ms).toISOString()
}

function asTags(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

async function findOne(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  field: string,
  equals: string,
) {
  const result = await payload.find({
    collection: collection as 'users',
    where: { [field]: { equals } },
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] ?? null
}

async function importConvex(): Promise<void> {
  const payload = await getPayload({ config })
  const userIdByConvexId = new Map<string, number | string>()

  const users = readJsonl('users')
  for (const user of users) {
    const email = asString(user.email).toLowerCase()
    if (!email) continue
    const existing = await findOne(payload, 'users', 'email', email)
    if (existing) {
      userIdByConvexId.set(asString(user._id), existing.id)
      console.log(`User exists: ${email}`)
      continue
    }
    const created = await payload.create({
      collection: 'users',
      data: {
        email,
        password: randomBytes(16).toString('hex'),
        name: asString(user.name) || email,
        role: (asString(user.role) || 'viewer') as
          | 'admin'
          | 'editor'
          | 'viewer'
          | 'client',
      },
      overrideAccess: true,
    })
    userIdByConvexId.set(asString(user._id), created.id)
    console.log(`Created user: ${email}`)
  }

  const fallbackAuthor = [...userIdByConvexId.values()][0]
  if (!fallbackAuthor) {
    throw new Error('No users available to own imported documents')
  }

  const publications = readJsonl('publications')
  for (const doc of publications) {
    const slug = asString(doc.slug)
    const existing = await findOne(payload, 'publications', 'slug', slug)
    const author =
      userIdByConvexId.get(asString(doc.authorId)) ?? fallbackAuthor
    const data = {
      title: asString(doc.title),
      slug,
      description: asString(doc.description),
      excerpt: asString(doc.excerpt),
      content: htmlToLexical(asString(doc.content)),
      category: asString(doc.category, 'analyses'),
      status: asString(doc.status, 'draft'),
      author,
      tags: asTags(doc.tags),
      featured: asBoolean(doc.featured),
      readingTime: asNumber(doc.readingTime),
      publishedAt: asDate(doc.publishedAt) ?? asDate(doc.createdAt),
      seoTitle: asString(doc.seoTitle) || undefined,
      seoDescription: asString(doc.seoDescription) || undefined,
    }
    if (existing) {
      await payload.update({
        collection: 'publications',
        id: existing.id,
        data,
        overrideAccess: true,
      })
      console.log(`Updated publication: ${slug}`)
    } else {
      await payload.create({
        collection: 'publications',
        data,
        overrideAccess: true,
      })
      console.log(`Created publication: ${slug}`)
    }
  }

  const articles = readJsonl('articles')
  for (const doc of articles) {
    const slug = asString(doc.slug)
    const existing = await findOne(payload, 'articles', 'slug', slug)
    const author =
      userIdByConvexId.get(asString(doc.authorId)) ?? fallbackAuthor
    const data = {
      title: asString(doc.title),
      slug,
      excerpt: asString(doc.excerpt),
      content: htmlToLexical(asString(doc.content)),
      imageUrl: asString(doc.imageUrl) || undefined,
      category: asString(doc.category, 'Marchés'),
      status: asString(doc.status, 'draft'),
      featured: asBoolean(doc.featured),
      author,
      tags: asTags(doc.tags),
      publishedAt: asDate(doc.publishedAt) ?? asDate(doc.createdAt),
    }
    if (existing) {
      await payload.update({
        collection: 'articles',
        id: existing.id,
        data,
        overrideAccess: true,
      })
      console.log(`Updated article: ${slug}`)
    } else {
      await payload.create({
        collection: 'articles',
        data,
        overrideAccess: true,
      })
      console.log(`Created article: ${slug}`)
    }
  }

  const externals = readJsonl('externalArticles')
  for (const doc of externals) {
    const guid = asString(doc.guid)
    const existing = await findOne(payload, 'external-articles', 'guid', guid)
    const data = {
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
    }
    if (existing) {
      await payload.update({
        collection: 'external-articles',
        id: existing.id,
        data,
        overrideAccess: true,
      })
      console.log(`Updated external: ${guid}`)
    } else {
      await payload.create({
        collection: 'external-articles',
        data,
        overrideAccess: true,
      })
      console.log(`Created external: ${guid}`)
    }
  }

  const siteContent = readJsonl('siteContent')
  for (const doc of siteContent) {
    const contentId = asString(doc.contentId)
    const existing = await findOne(payload, 'site-content', 'contentId', contentId)
    const data = {
      contentId,
      pageKey: asString(doc.pageKey),
      type: asString(doc.type, 'text'),
      value: asString(doc.value),
      updatedBy: userIdByConvexId.get(asString(doc.updatedBy)) ?? fallbackAuthor,
    }
    if (existing) {
      await payload.update({
        collection: 'site-content',
        id: existing.id,
        data,
        overrideAccess: true,
      })
      console.log(`Updated site-content: ${contentId}`)
    } else {
      await payload.create({
        collection: 'site-content',
        data,
        overrideAccess: true,
      })
      console.log(`Created site-content: ${contentId}`)
    }
  }

  const leads = readJsonl('investorProfileLeads')
  for (const doc of leads) {
    const email = asString(doc.email)
    const createdAt = asDate(doc.createdAt)
    const existing = await payload.find({
      collection: 'investor-leads',
      where: {
        and: [
          { email: { equals: email } },
          ...(createdAt ? [{ createdAt: { equals: createdAt } }] : []),
        ],
      },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.docs[0]) {
      console.log(`Lead exists: ${email}`)
      continue
    }
    await payload.create({
      collection: 'investor-leads',
      data: {
        firstName: asString(doc.firstName),
        lastName: asString(doc.lastName),
        email,
        phone: asString(doc.phone) || undefined,
        profileType: asString(doc.profileType, 'balanced'),
        profileTitle: asString(doc.profileTitle, 'Profil'),
        riskLevel: asNumber(doc.riskLevel) ?? 0,
        answers: Array.isArray(doc.answers)
          ? (doc.answers as { questionId: string; value: number }[])
          : [],
        investmentAmount: asNumber(doc.investmentAmount),
        emailSent: asBoolean(doc.emailSent),
        emailSentAt: asDate(doc.emailSentAt),
        pdfGenerated: asBoolean(doc.pdfGenerated),
        pdfUrl: asString(doc.pdfUrl) || undefined,
        source: asString(doc.source) || undefined,
        userAgent: asString(doc.userAgent) || undefined,
      },
      overrideAccess: true,
    })
    console.log(`Created lead: ${email}`)
  }

  console.log('Convex import complete.')
  process.exit(0)
}

importConvex().catch((error: unknown) => {
  console.error('Convex import failed:', error)
  process.exit(1)
})
