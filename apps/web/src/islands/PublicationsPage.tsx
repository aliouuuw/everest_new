import { PublicationsView } from '@/routes/PublicationsPage'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'

type Props = {
  siteContent: SiteContent[]
}

export default function PublicationsPageIsland({ siteContent }: Props) {
  return (
    <StaticCMSProvider rows={siteContent} pageKey="publications">
      <PublicationsView />
    </StaticCMSProvider>
  )
}
