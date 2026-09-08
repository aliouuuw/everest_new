import { HeroSectionMountain } from '@/components/Hero/HeroSectionMountain'
import { Capacity } from '@/components/Sections/Capacity'
import { CTA } from '@/components/Sections/CTA'
import { FAQ } from '@/components/Sections/FAQ'
import { Positioning } from '@/components/Sections/Positioning'
import { Services } from '@/components/Sections/Services'
import { TrustStrip } from '@/components/Sections/TrustStrip'
import { ValueProps } from '@/components/Sections/ValueProps'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { NewsItem, SiteContent } from '../lib/payload'
import { InsightsMergedStatic } from './InsightsMergedStatic'
import type { PublicationFile } from '@/data/publications'

type Props = {
  siteContent: SiteContent[]
  news: NewsItem[]
  publications?: Array<PublicationFile>
}

export default function HomePage({ siteContent, news, publications }: Props) {
  return (
    <StaticCMSProvider rows={siteContent} pageKey="home">
      <HeroSectionMountain />
      <TrustStrip />
      <Positioning />
      <ValueProps />
      <Capacity />
      <Services />
      <InsightsMergedStatic news={news} publications={publications} />
      <CTA
        scheme="ivory"
        secondaryHref="https://everest-account-opening.vercel.app/new-home"
        secondaryLabel="Évaluer mon profil d'investisseur"
      />
      <FAQ />
    </StaticCMSProvider>
  )
}
