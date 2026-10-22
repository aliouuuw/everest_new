import { ContactPage } from '@/routes/ContactPage'
import { ExpertisesPage } from '@/routes/ExpertisesPage'
import { FAQPage } from '@/routes/FAQPage'
import { SocietePage } from '@/components/Sections/SocieteReferentiel'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'

const PAGES = {
  about: SocietePage,
  expertises: ExpertisesPage,
  contact: ContactPage,
  faq: FAQPage,
} as const

export type MarketingPageKey = keyof typeof PAGES

type Props = {
  siteContent: SiteContent[]
  pageKey: MarketingPageKey
}

export default function MarketingPage({ siteContent, pageKey }: Props) {
  const Page = PAGES[pageKey]
  return (
    <StaticCMSProvider rows={siteContent} pageKey={pageKey}>
      <Page />
    </StaticCMSProvider>
  )
}
