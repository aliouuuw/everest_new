import { AboutPage } from '@/routes/AboutPage'
import { BoursePage } from '@/routes/BoursePage'
import { ContactPage } from '@/routes/ContactPage'
import { ExpertisesPage } from '@/routes/ExpertisesPage'
import { FAQPage } from '@/routes/FAQPage'
import { OffresPage } from '@/routes/OffresPage'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'

const PAGES = {
  about: AboutPage,
  offres: OffresPage,
  expertises: ExpertisesPage,
  contact: ContactPage,
  faq: FAQPage,
  bourse: BoursePage,
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
