import { OpportunitesPage, SamaNaffaPage } from '@/components/Sections/RelationReferentiel'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'

const PAGES = {
  opportunites: OpportunitesPage,
  'sama-naffa': SamaNaffaPage,
} as const

type Props = {
  siteContent: SiteContent[]
  pageKey: keyof typeof PAGES
}

/** Text-only referential pages. Rendered without a client directive: static HTML, no JavaScript. */
export default function ReferentielPage({ siteContent, pageKey }: Props) {
  const Page = PAGES[pageKey]
  return (
    <StaticCMSProvider rows={siteContent} pageKey={pageKey}>
      <Page />
    </StaticCMSProvider>
  )
}
