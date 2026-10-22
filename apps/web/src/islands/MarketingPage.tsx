import { ContactPage } from '@/routes/ContactPage'
import { FAQPage } from '@/routes/FAQPage'
import { SocietePage } from '@/components/Sections/SocieteReferentiel'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'

const PAGES = {
  about: SocietePage,
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
