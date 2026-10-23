import { HeroSectionMountain } from '@/components/Hero/HeroSectionMountain'
import {
  HomeAnalyses,
  HomeClosing,
  HomeEngagements,
  HomeExpertises,
  HomePositioning,
  HomeProofs,
  HomeSamaNaffa,
  HomeSegments,
} from '@/components/Sections/HomeReferentiel'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { SiteContent } from '../lib/payload'

type Props = {
  siteContent: SiteContent[]
}

/** Referential V2.1 §1: blocks in the order of the audience hierarchy. */
export default function HomePage({ siteContent }: Props) {
  return (
    <StaticCMSProvider rows={siteContent} pageKey="home">
      <div className="everest-home">
        <HeroSectionMountain />
        <HomePositioning />
        <HomeProofs />
        <HomeEngagements />
        <HomeAnalyses />
        <HomeExpertises />
        <HomeSegments />
        <HomeSamaNaffa />
        <HomeClosing />
      </div>
    </StaticCMSProvider>
  )
}
