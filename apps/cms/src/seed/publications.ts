import { existsSync } from 'node:fs'
import { basename, join } from 'node:path'
import { getPayload } from 'payload'
import config from '../payload.config.js'

const webPdfs = join(process.cwd(), '../../public/publications')

const catalogue = [
  {
    title: 'Revue Hebdomadaire — 20 au 24 avril 2026',
    description:
      "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire' as const,
    publishedAt: '2026-04-24T12:00:00.000Z',
    pages: 10,
    featured: true,
    file: 'Revue-Hebdo-32.pdf',
  },
  {
    title: 'Revue Hebdomadaire — 1 au 4 avril 2026',
    description:
      "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire' as const,
    publishedAt: '2026-04-04T12:00:00.000Z',
    pages: 9,
    featured: false,
    file: 'Revue-Hebdomadaire-example.pdf',
  },
  {
    title: 'Revue Semestrielle — S1 2026',
    description:
      "Bilan semestriel complet : analyse macro-économique UEMOA, performances des indices, faits marquants et perspectives du second semestre.",
    frequency: 'semestrielle' as const,
    publishedAt: '2026-09-20T12:00:00.000Z',
    pages: 16,
    featured: false,
    file: 'Revue-semestrielle-20.09.26-1.pdf',
  },
]

const context = { skipRebuild: true }

async function seedPublications(): Promise<void> {
  const payload = await getPayload({ config })

  for (const item of catalogue) {
    const filePath = join(webPdfs, item.file)
    if (!existsSync(filePath)) {
      throw new Error(`Missing PDF: ${filePath}`)
    }

    const existing = await payload.find({
      collection: 'publications',
      where: { title: { equals: item.title } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.docs[0]) {
      console.log(`Kept publications: ${item.title}`)
      continue
    }

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: item.title,
        fileName: basename(item.file),
        fileType: 'document',
        mimeType: 'application/pdf',
      },
      filePath,
      overrideAccess: true,
      context,
    })

    await payload.create({
      collection: 'publications',
      data: {
        title: item.title,
        description: item.description,
        frequency: item.frequency,
        file: media.id,
        pages: item.pages,
        status: 'published',
        featured: item.featured,
        publishedAt: item.publishedAt,
      },
      overrideAccess: true,
      context,
    })
    console.log(`Created publications: ${item.title}`)
  }

  const published = await payload.find({
    collection: 'publications',
    where: { status: { equals: 'published' } },
    limit: 10,
    overrideAccess: true,
  })
  if (published.totalDocs < catalogue.length) {
    throw new Error(`Expected ${catalogue.length} published publications, got ${published.totalDocs}`)
  }
}

seedPublications()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error('Failed to seed publications:', error)
    process.exit(1)
  })
