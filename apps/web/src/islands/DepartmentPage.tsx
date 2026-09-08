import { DepartmentPage } from '@/components/Sections/DepartmentPage'
import { getDepartmentBySlug } from '@/data/departments'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'

const SLUG_TO_PAGE_KEY = {
  'marche-capitaux': 'capital-markets',
  'ingenieurie-financiere': 'investment-banking',
  'gestion-sous-mandat': 'mandate',
} as const

type DepartmentSlug = keyof typeof SLUG_TO_PAGE_KEY

type Props = {
  slug: DepartmentSlug
  siteContent: SiteContent[]
}

export default function DepartmentPageIsland({ slug, siteContent }: Props) {
  const department = getDepartmentBySlug(slug)
  if (!department) return null
  return (
    <StaticCMSProvider rows={siteContent} pageKey={SLUG_TO_PAGE_KEY[slug]}>
      <DepartmentPage department={department} />
    </StaticCMSProvider>
  )
}
