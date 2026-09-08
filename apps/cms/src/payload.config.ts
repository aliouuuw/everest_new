import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Articles } from './collections/Articles'
import { Categories } from './collections/Categories'
import { ExternalArticles } from './collections/ExternalArticles'
import { InvestorLeads } from './collections/InvestorLeads'
import { Media } from './collections/Media'
import { Publications } from './collections/Publications'
import { SiteContent } from './collections/SiteContent'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const corsOrigins = [
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
  ...(process.env.PAYLOAD_CORS_ORIGINS ||
    'http://localhost:4321,http://localhost:8000,http://localhost:3000').split(','),
]
  .map((origin) => origin?.trim())
  .filter((origin): origin is string => Boolean(origin))

export default buildConfig({
  cors: corsOrigins,
  csrf: corsOrigins,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Publications,
    Articles,
    ExternalArticles,
    Categories,
    SiteContent,
    InvestorLeads,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
