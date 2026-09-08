import { PublicationsView } from '@/routes/PublicationsPage'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'
import type { PublicationFile } from '@/data/publications'

type Props = {
  siteContent: SiteContent[]
  publications?: Array<PublicationFile>
}

export default function PublicationsPageIsland({ siteContent, publications }: Props) {
  return (
    <StaticCMSProvider rows={siteContent} pageKey="publications">
      <PublicationsView publications={publications} />
    </StaticCMSProvider>
  )
}
