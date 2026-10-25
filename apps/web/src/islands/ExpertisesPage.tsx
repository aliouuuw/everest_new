import { ExpertiseDetailPage, ExpertisesPage as ExpertisesHub } from '@/routes/ExpertisesPage'
import type { ExpertiseKey } from '@/content/expertises'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'

type Props = {
  siteContent: SiteContent[]
  /** Omit for the /expertises hub. */
  expertise?: ExpertiseKey
}

export default function ExpertisesPage({ siteContent, expertise }: Props) {
  return (
    <StaticCMSProvider rows={siteContent} pageKey="expertises">
      {expertise ? <ExpertiseDetailPage expertise={expertise} /> : <ExpertisesHub />}
    </StaticCMSProvider>
  )
}
