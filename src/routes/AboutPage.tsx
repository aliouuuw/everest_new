import type { ReactNode } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'
import { EditableImage, EditableText, useContent } from '../cms'
import { frenchSpaces } from '../cms/EditableText'
import { SOCIETE_TEXT, type SocieteTextId } from '../content/societe'

/** Matches Outils / Expertises / Contact section hero typography (max 50px). */
const sectionTitleStyle = { fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' } as const

/** Referential V2.1 §2.1 to §2.6, in the layouts of the validated page. §2.7 Références waits on Legal (§10). */
const T = ({ id, as = 'span', className, style }: { id: SocieteTextId; as?: 'span' | 'p' | 'h2' | 'h3'; className?: string; style?: React.CSSProperties }) => (
  <EditableText id={id} as={as} className={className} style={style}>{SOCIETE_TEXT[id]}</EditableText>
)

const CHAPTERS: Array<{ anchor: string; title: SocieteTextId }> = [
  { anchor: 'histoire', title: 'about.histoire.heading' },
  { anchor: 'mission', title: 'about.mission.heading' },
  { anchor: 'adn', title: 'about.adn.heading' },
  { anchor: 'engagements', title: 'about.engagements.heading' },
  { anchor: 'vision-gouvernance', title: 'about.vision.heading' },
  { anchor: 'conformite', title: 'about.conformite.heading' },
]

/** One item of the editorial list: optional label, the N1, the N2. */
const Item = ({ label, n1, n2 }: { label?: SocieteTextId; n1: SocieteTextId; n2?: SocieteTextId }) => (
  <div className="group py-5 md:py-6 border-b border-black/10">
    {label && <T id={label} as="p" className="mb-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--jaune-or)]" />}
    <T id={n1} as="h3" className="font-primary font-bold text-2xl md:text-3xl mb-3 text-[var(--night-80)] leading-snug!" />
    {n2 && <T id={n2} as="p" className="text-[rgba(10,10,10,0.8)] leading-relaxed text-lg font-light max-w-2xl" />}
  </div>
)

/** The editorial list section of the validated page: title on the left, items on the right. */
const EditorialSection = ({ chapter, children, tone = 'white' }: { chapter: number; children: ReactNode; tone?: 'white' | 'ivory' }) => {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id={CHAPTERS[chapter].anchor}
      className="reveal py-12 md:py-20 border-b border-black/10"
      style={tone === 'ivory' ? { background: 'var(--summit-ivory)' } : undefined}
    >
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <T id={CHAPTERS[chapter].title} as="h2" className="font-primary font-bold leading-[0.95] tracking-tight mb-0 text-[var(--night-80)]" style={sectionTitleStyle} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="border-t border-black/10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ENGAGEMENTS = [1, 2, 3, 4, 5, 6] as const

/** §2.6 N2: its obligations, split at the semicolons into the check list of the validated page. Words unchanged. */
const ComplianceList = () => {
  const n2 = frenchSpaces(useContent('about.conformite.n2')?.value || SOCIETE_TEXT['about.conformite.n2'])
  // frenchSpaces puts a no-break space before « : » and « ; ».
  const colon = n2.indexOf('\u00a0: ')
  const end = n2.indexOf('. ', colon)
  const items = colon > 0 && end > colon ? n2.slice(colon + 3, end).split('\u00a0; ') : []
  if (items.length < 3) return <T id="about.conformite.n2" as="p" className="text-[rgba(10,10,10,0.7)] leading-relaxed text-lg font-light" />
  return (
    <div data-cms-id="about.conformite.n2">
      <p className="sr-only">{n2}</p>
      <div aria-hidden>
      <p className="text-[rgba(10,10,10,0.7)] leading-relaxed text-lg font-light mb-4">{n2.slice(0, colon + 2)}</p>
      <ul className="space-y-3 text-[rgba(10,10,10,0.7)] mb-4">
        {items.map((item, i) => (
          <li key={item} className="flex items-start gap-4">
            <FiArrowRight className="text-[var(--jaune-or)] mt-1 shrink-0" aria-hidden />
            <span>{item}{i < items.length - 1 ? '\u00a0;' : '.'}</span>
          </li>
        ))}
      </ul>
      <p className="text-[rgba(10,10,10,0.7)] leading-relaxed text-lg font-light">{n2.slice(end + 2)}</p>
      </div>
    </div>
  )
}

export const AboutPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const engagementsRef = useReveal<HTMLElement>()
  const conformiteRef = useReveal<HTMLElement>()

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
      {/* ─── Hero: menu label and the chapter links ─── */}
      <section ref={heroRef} className="relative min-h-[46vh] md:min-h-[48vh] flex items-end pb-10 pt-[var(--site-chrome-top)] md:pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage id="about.hero.background" src="/Assets_Website/À-propos.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 w-full page-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="font-primary font-bold leading-[0.95] tracking-tight mb-3 text-white" style={sectionTitleStyle}>
                La société
              </h1>
            </div>
            <nav aria-label="La société" className="md:col-span-5 pb-2 flex flex-wrap gap-x-5 gap-y-2">
              {CHAPTERS.map((c) => (
                <a key={c.anchor} href={`/la-societe#${c.anchor}`} className="text-sm md:text-base text-white/75 font-light hover:text-[var(--jaune-or)] transition-colors">
                  {SOCIETE_TEXT[c.title]}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* §2.1 Histoire */}
      <EditorialSection chapter={0}>
        <Item n1="about.histoire.n1" n2="about.histoire.n2" />
      </EditorialSection>

      {/* §2.2 Mission et récit du nom */}
      <EditorialSection chapter={1} tone="ivory">
        <Item label="about.mission.label" n1="about.mission.n1" n2="about.mission.n2" />
        <Item label="about.nom.label" n1="about.nom.n1" n2="about.nom.n2" />
      </EditorialSection>

      {/* §2.3 L'ADN */}
      <EditorialSection chapter={2}>
        <div className="py-5 md:py-6 border-b border-black/10">
          <T id="about.adn.n1" as="p" className="font-primary font-bold text-2xl md:text-3xl text-[var(--night-80)] leading-snug" />
        </div>
        {(['ancrage', 'cordee', 'exigence'] as const).map((k) => (
          <Item key={k} label={`about.adn.${k}.label`} n1={`about.adn.${k}.n1`} n2={`about.adn.${k}.n2`} />
        ))}
      </EditorialSection>

      {/* §2.4 Six engagements: the dark grid of the validated page */}
      <section ref={engagementsRef} id={CHAPTERS[3].anchor} className="reveal py-12 md:py-20 section-bg-light">
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="sticky top-28 md:top-32">
                <T id="about.engagements.heading" as="h2" className="font-primary font-bold leading-[0.95] tracking-tight text-white mb-6" style={sectionTitleStyle} />
                <T id="about.engagements.n1" as="p" className="text-white/70 leading-relaxed font-light text-lg" />
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10">
                {ENGAGEMENTS.map((n) => (
                  <div key={n} className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-5" />
                    <T id={`about.engagement${n}.label`} as="h3" className="font-primary font-bold text-2xl md:text-3xl mb-3 text-white leading-snug!" />
                    <T id={`about.engagement${n}.n1`} as="p" className="text-white/80 leading-relaxed font-medium text-lg mb-3" />
                    <T id={`about.engagement${n}.n2`} as="p" className="text-white/60 text-sm leading-relaxed" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §2.5 Vision & gouvernance */}
      <EditorialSection chapter={4}>
        <Item label="about.vision.label" n1="about.vision.n1" n2="about.vision.n2" />
        <Item label="about.gouvernance.label" n1="about.gouvernance.n1" n2="about.gouvernance.n2" />
      </EditorialSection>

      {/* §2.6 Conformité & agrément: the compliance section of the validated page */}
      <section ref={conformiteRef} id={CHAPTERS[5].anchor} className="reveal relative py-12 md:py-20 overflow-hidden" style={{ background: 'var(--summit-ivory)' }}>
        <div
          className="absolute top-0 right-0 w-[50%] h-[80%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(14,40,38,0.07) 0%, rgba(182,138,62,0.03) 45%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[45%] h-[75%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(182,138,62,0.08) 0%, rgba(14,40,38,0.04) 50%, transparent 70%)' }}
        />
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="sticky top-28 md:top-32">
                <T id="about.conformite.heading" as="h2" className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--night-80)]" style={sectionTitleStyle} />
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <div className="w-8 h-px bg-[var(--jaune-or)] mb-4 md:mb-5" />
                  <T id="about.conformite.n1" as="p" className="font-primary font-bold text-xl md:text-2xl text-[var(--night-80)] leading-snug" />
                </div>
                <div>
                  <div className="w-8 h-px bg-[var(--jaune-or)] mb-4 md:mb-5" />
                  <ComplianceList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
