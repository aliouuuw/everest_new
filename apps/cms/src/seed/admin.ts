import { getPayload } from 'payload'
import config from '../payload.config.js'

const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@everest-finance.sn'
const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'EverestAdmin2026!'
const adminName = process.env.SEED_ADMIN_NAME || 'Everest Admin'

async function seedAdmin(): Promise<void> {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: adminEmail,
      },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`Admin user already exists: ${adminEmail}`)
    process.exit(0)
  }

  await payload.create({
    collection: 'users',
    data: {
      email: adminEmail,
      password: adminPassword,
      name: adminName,
      role: 'admin',
    },
    overrideAccess: true,
  })

  console.log(`Created admin user: ${adminEmail}`)
  console.log('Change the password after first login.')
  process.exit(0)
}

seedAdmin().catch((error: unknown) => {
  console.error('Failed to seed admin user:', error)
  process.exit(1)
})
