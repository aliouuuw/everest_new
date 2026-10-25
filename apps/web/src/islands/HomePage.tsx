import { FiGitBranch, FiGlobe, FiPieChart, FiSend, FiShield, FiBriefcase, FiUsers, FiTrendingUp, FiHome } from 'react-icons/fi'
import { HeroSectionMountain } from '@/components/Hero/HeroSectionMountain'
import { Capacity } from '@/components/Sections/Capacity'
import { CTA } from '@/components/Sections/CTA'
import { Positioning } from '@/components/Sections/Positioning'
import { SamaNaffaBlock } from '@/components/Sections/SamaNaffaBlock'
import { Services } from '@/components/Sections/Services'
import { ValueProps } from '@/components/Sections/ValueProps'
import { EditableText, useContent } from '@/cms'
import { frenchSpaces } from '@/cms/EditableText'
import { HOME_TEXT, type HomeTextId } from '@/content/home'
import { StaticCMSProvider } from '../cms/StaticCMSProvider'
import type { NewsItem, SiteContent } from '../lib/payload'
import { InsightsMergedStatic } from './InsightsMergedStatic'
import type { PublicationFile } from '@/data/publications'

type Props = {
  siteContent: SiteContent[]
  news: NewsItem[]
  publications?: Array<PublicationFile>
}

const useHomeText = (id: HomeTextId) => frenchSpaces(useContent(id)?.value || HOME_TEXT[id])
const Copy = ({ id }: { id: HomeTextId }) => <EditableText id={id} as="span">{HOME_TEXT[id]}</EditableText>

/** The five functions named in parentheses in the positioning N2 (referential words, used as pillar titles). */
const POSITION_ICONS = [FiGitBranch, FiSend, FiGlobe, FiShield, FiPieChart]
const Positionnement = () => {
  const n2 = useHomeText('home.positioning.n2')
  const stations = n2.match(/\(([^)]+)\)/)?.[1].split(', ') ?? []
  return (
    <Positioning
      heading={<Copy id="home.positioning.n1" />}
      intro={<EditableText id="home.positioning.n2" as="p">{HOME_TEXT['home.positioning.n2']}</EditableText>}
      columns={stations.length === 5 ? 5 : 4}
      pillars={stations.length === 5 ? stations.map((station, i) => ({ icon: POSITION_ICONS[i], title: station.charAt(0).toUpperCase() + station.slice(1) })) : []}
    />
  )
}

/** Segments: the four audiences of the N2 as pillars, the closing line under them. */
const SEGMENT_ICONS = [FiTrendingUp, FiBriefcase, FiGlobe, FiUsers]
const Segments = () => {
  const n2 = useHomeText('home.segments.n2')
  const sentences = n2.split('. ')
  const close = sentences.pop() ?? ''
  const split = sentences.length === 4 && sentences.every((s) => s.includes(', '))
  if (!split) return <Positioning heading={<Copy id="home.segments.n1" />} intro={<EditableText id="home.segments.n2" as="p">{HOME_TEXT['home.segments.n2']}</EditableText>} pillars={[]} />
  return (
    <div data-cms-id="home.segments.n2">
      <p className="sr-only">{n2}</p>
      <Positioning
        heading={<Copy id="home.segments.n1" />}
        pillarsHidden
        pillars={sentences.map((sentence, i) => {
          const comma = sentence.indexOf(', ')
          return { icon: SEGMENT_ICONS[i], title: sentence.slice(0, comma + 1), desc: <>{sentence.slice(comma + 2)}.</> }
        })}
        footer={
          <p aria-hidden className="mt-10 flex items-center gap-3 font-primary text-xl font-bold tracking-tight text-[var(--everest-green)] md:mt-14 md:text-2xl">
            <FiHome aria-hidden className="text-[var(--jaune-or)]" />
            {close}
          </p>
        }
      />
    </div>
  )
}

/** Referential V2.1 §1: blocks in the order of the audience hierarchy, in the validated components. */
export default function HomePage({ siteContent, news, publications }: Props) {
  return (
    <StaticCMSProvider rows={siteContent} pageKey="home">
      <HeroSectionMountain />
      <Positionnement />
      <ValueProps />
      <Capacity />
      <InsightsMergedStatic news={news} publications={publications} />
      <Services />
      <Segments />
      <SamaNaffaBlock />
      <CTA
        scheme="ivory"
        primaryHref="/contact"
        primaryLabel={HOME_TEXT['home.finalCta.cta1']}
        secondaryHref="/expertises"
        secondaryLabel={HOME_TEXT['home.finalCta.cta2']}
        content={{
          heading: <Copy id="home.governance.n1" />,
          intro: <EditableText id="home.governance.n2" as="p">{HOME_TEXT['home.governance.n2']}</EditableText>,
          primary: <Copy id="home.finalCta.cta1" />,
          secondary: <EditableText id="home.finalCta.cta2" as="span" className="hidden sm:inline">{HOME_TEXT['home.finalCta.cta2']}</EditableText>,
        }}
      />
    </StaticCMSProvider>
  )
}
