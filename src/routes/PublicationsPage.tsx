import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { EditableText } from '../cms'
import { FiSearch, FiX } from 'react-icons/fi'
import { ArrowUpRight, N1, N2, PageHero } from '../components/Referentiel'
import { ANALYSES_TEXT } from '../content/analyses'
import {
  PUBLICATION_FILES,
  PUBLICATION_FREQUENCY_LABELS,
  type PublicationFile,
  type PublicationFrequency,
} from '../data/publications'

type Frequency = PublicationFrequency
type Publication = PublicationFile

const FREQUENCY_LABELS = PUBLICATION_FREQUENCY_LABELS

const ALL_LABEL = 'tout' as const
type FilterCategory = Frequency | typeof ALL_LABEL

/* ─── Referential V2.1 §4: standard disclaimer, on every publication ─── */
const Disclaimer = ({ className = '' }: { className?: string }) => (
  <EditableText
    id="publications.disclaimer"
    as="p"
    className={`max-w-4xl text-[13px] leading-[1.6] text-[var(--home-mid)] ${className}`}
  >
    {ANALYSES_TEXT['publications.disclaimer']}
  </EditableText>
)

/* ─── PDF Preview Modal ─── */
const PreviewModal: React.FC<{ pub: Publication; onClose: () => void }> = ({ pub, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--home-ink)_82%,transparent)]" />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`pub-${pub.id}-title`}
        className="relative z-10 w-full max-w-5xl h-[85vh] flex flex-col bg-white overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-6 px-6 py-4 shadow-[inset_0_-1px_0_var(--home-rule)]">
          <div className="min-w-0">
            <h2 id={`pub-${pub.id}-title`} className="truncate text-base font-semibold leading-snug! text-[var(--home-ink)]">{pub.title}</h2>
            <p className="text-[13px] text-[var(--home-mid)]">{pub.pages ? `${pub.pages} pages · ` : ''}{pub.fileSize}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href={pub.fileUrl} download className="home-button">
              Télécharger
              <ArrowUpRight />
            </a>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center text-[var(--home-ink)] hover:bg-[var(--home-paper)] transition-colors"
              aria-label="Fermer"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* PDF Embed */}
        <div className="flex-1 bg-[var(--home-paper)]">
          <iframe
            src={`${pub.fileUrl}#toolbar=1&navpanes=0`}
            title={pub.title}
            className="w-full h-full border-0"
          />
        </div>
        <div className="px-6 py-4 shadow-[inset_0_1px_0_var(--home-rule)]">
          <Disclaimer />
        </div>
      </div>
    </div>
  )
}

/* ─── Publication: the document itself, as on the home. Date and format first, size last. ─── */
const PublicationCard: React.FC<{ pub: Publication; onPreview: (pub: Publication) => void }> = ({ pub, onPreview }) => {
  const formattedDate = new Date(pub.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  // Covers are prebuilt (public/publications/covers/<id>.webp). A CMS issue without one shows a paper sheet.
  const [hasCover, setHasCover] = useState(true)

  return (
    <article className="home-publication">
      <button
        type="button"
        onClick={() => onPreview(pub)}
        aria-label={`Aperçu : ${pub.title}`}
        className="block w-full cursor-pointer text-left"
      >
        {hasCover ? (
          <img src={`/publications/covers/${pub.id}.webp`} alt="" width={1108} height={1568} loading="lazy" onError={() => setHasCover(false)} />
        ) : (
          <span aria-hidden className="block aspect-[1108/1568] w-full bg-[var(--home-white)] shadow-[0_1px_2px_color-mix(in_srgb,var(--home-ink)_18%,transparent)]" />
        )}
      </button>
      <div className="flex flex-col gap-2">
        <p className="text-[13px] leading-[1.5] text-[var(--home-mid)]">
          <time dateTime={pub.date}>{formattedDate}</time>
          {' · '}{FREQUENCY_LABELS[pub.frequency]}
          {pub.pages ? ` · ${pub.pages} pages` : ''}
          {' · '}{pub.fileSize}
        </p>
        {/* No summary: the CMS summaries use words banned by referential V2.1 I.6 (22 Oct 2026 decision). */}
        <h2 className="text-[18px] font-semibold leading-[1.35]! tracking-[-0.01em] text-[var(--home-ink)]">{pub.title}</h2>
        <div className="flex flex-wrap items-center gap-x-8">
          <button type="button" onClick={() => onPreview(pub)} className="home-link cursor-pointer text-[var(--home-ink)]">
            Aperçu
          </button>
          <a href={pub.fileUrl} download className="home-link text-[var(--home-ink)]">
            Télécharger
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ─── Page ─── */
export function PublicationsView({
  publications: incoming,
}: {
  publications?: Array<PublicationFile>
}) {
  const publications = incoming && incoming.length > 0 ? incoming : PUBLICATION_FILES

  const [activeFilter, setActiveFilter] = useState<FilterCategory>(ALL_LABEL)
  const [searchQuery, setSearchQuery] = useState('')
  const [previewPub, setPreviewPub] = useState<Publication | null>(null)

  const handlePreview = useCallback((pub: Publication) => setPreviewPub(pub), [])
  const handleClosePreview = useCallback(() => setPreviewPub(null), [])

  const filters: Array<FilterCategory> = [ALL_LABEL, 'hebdomadaire', 'mensuelle', 'semestrielle']
  const filterLabels: Record<FilterCategory, string> = {
    [ALL_LABEL]: 'Tout',
    ...FREQUENCY_LABELS,
  }

  const [activeYear, setActiveYear] = useState<string>('Tout')
  const [activeMonth, setActiveMonth] = useState<string>('Tout')

  const years = useMemo(() => {
    const y = new Set(publications.map(p => new Date(p.date).getFullYear().toString()))
    return ['Tout', ...Array.from(y).sort().reverse()]
  }, [publications])

  const months = useMemo(() => {
    if (activeYear === 'Tout') return ['Tout']
    const m = new Set(
      publications.filter(p => new Date(p.date).getFullYear().toString() === activeYear)
        .map(p => (new Date(p.date).getMonth() + 1).toString().padStart(2, '0'))
    )
    return ['Tout', ...Array.from(m).sort()]
  }, [activeYear, publications])

  // Reset month if year changes and month not in new year
  useEffect(() => {
    if (activeMonth !== 'Tout' && !months.includes(activeMonth)) {
      setActiveMonth('Tout')
    }
  }, [months, activeMonth])

  const filtered = useMemo(() => {
    let items = publications

    if (activeFilter !== ALL_LABEL) {
      items = items.filter(p => p.frequency === activeFilter)
    }

    if (activeYear !== 'Tout') {
      items = items.filter(p => new Date(p.date).getFullYear().toString() === activeYear)
    }

    if (activeMonth !== 'Tout') {
      items = items.filter(p => (new Date(p.date).getMonth() + 1).toString().padStart(2, '0') === activeMonth)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(p =>
        p.title.toLowerCase().includes(q)
      )
    }

    return [...items].sort((a, b) =>new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [publications, activeFilter, activeYear, activeMonth, searchQuery])

  return (
    <div className="bg-[var(--pure-white)]">
      {/* ─── Hero: referential V2.1 §4 ─── */}
      <PageHero title="Analyses & Publications">
        <N1 id="publications.n1" tone="dark" as="p" size="statement" />
        <N2 id="publications.n2" tone="dark" />
      </PageHero>

      {/* ─── Search + Filters ─── */}
      <section className="py-6 md:py-8 bg-[var(--home-white)] shadow-[inset_0_-1px_0_var(--home-rule)]">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <FiSearch aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--home-mid)]" size={16} />
              <input
                type="text"
                placeholder="Rechercher une revue..."
                aria-label="Rechercher une revue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-12 pl-11 pr-4 bg-white border border-[color-mix(in_srgb,var(--home-ink)_55%,transparent)] hover:border-[var(--home-mid)] focus:border-[var(--home-ink)] text-[15px] text-[var(--home-ink)] transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-1">
              {filters.map((cat) => {
                const isActive = activeFilter === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    className={`min-h-12 px-4 text-[15px] font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[var(--home-ink)] text-white'
                        : 'text-[var(--home-ink)] hover:bg-[var(--home-paper)]'
                    }`}
                    aria-pressed={isActive}
                  >
                    {filterLabels[cat]}
                  </button>
                )
              })}
            </div>
            
            <div className="flex items-center gap-2 sm:ml-auto">
              <select 
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                aria-label="Année"
                className="min-h-12 px-4 bg-white cursor-pointer border border-[color-mix(in_srgb,var(--home-ink)_55%,transparent)] hover:border-[var(--home-mid)] focus:border-[var(--home-ink)] text-[15px] text-[var(--home-ink)] transition-colors"
              >
                <option value="Tout">Année</option>
                {years.filter(y => y !== 'Tout').map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select 
                value={activeMonth}
                onChange={(e) => setActiveMonth(e.target.value)}
                aria-label="Mois"
                disabled={activeYear === 'Tout'}
                className="min-h-12 px-4 bg-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 border border-[color-mix(in_srgb,var(--home-ink)_55%,transparent)] hover:border-[var(--home-mid)] focus:border-[var(--home-ink)] text-[15px] text-[var(--home-ink)] transition-colors"
              >
                <option value="Tout">Mois</option>
                {months.filter(m => m !== 'Tout').map(m => (
                  <option key={m} value={m}>{new Date(2000, parseInt(m) - 1).toLocaleString('fr-FR', { month: 'long' })}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Publications Grid ─── */}
      <section className="bg-[var(--home-paper)] py-12 md:py-20 lg:py-28">
        <div className="page-container">
          {filtered.length === 0 ? (
            <div className="py-12">
              <h2 className="mb-2 text-[22px] font-semibold leading-snug! text-[var(--home-ink)]">Aucune publication trouvée</h2>
              <p className="text-[15px] text-[var(--home-mid)]">Essayez de modifier vos filtres ou votre recherche.</p>
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
              {filtered.map((pub) => (
                <PublicationCard key={pub.id} pub={pub} onPreview={handlePreview} />
              ))}
            </div>
          )}
          <Disclaimer className="mt-16 md:mt-20" />
        </div>
      </section>

      {/* ─── Preview Modal ─── */}
      {previewPub && <PreviewModal pub={previewPub} onClose={handleClosePreview} />}
    </div>
  )
}

export const PublicationsPage = () => <PublicationsView />
