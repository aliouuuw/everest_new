import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { EditableText } from '../cms'
import { FiCalendar, FiDownload, FiEye, FiFileText, FiSearch, FiX } from 'react-icons/fi'
import * as pdfjsLib from 'pdfjs-dist'
import PdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { useReveal } from '../components/Hooks/useReveal'

/* ─── Types ─── */
type Frequency = 'hebdomadaire' | 'mensuelle' | 'semestrielle'

type Publication = {
  id: string
  title: string
  description: string
  frequency: Frequency
  date: string          // ISO date
  fileUrl: string       // path under /publications/
  fileSize: string      // human-readable e.g. "13.2 MB"
  pages?: number
}

/* ─── Static catalogue (replace with API/Convex later) ─── */
const FREQUENCY_LABELS: Record<Frequency, string> = {
  hebdomadaire: 'Hebdomadaire',
  mensuelle: 'Mensuelle',
  semestrielle: 'Semestrielle',
}

const FREQUENCY_COLORS: Record<Frequency, { text: string; bg: string; border: string }> = {
  hebdomadaire: { text: 'var(--jaune-or)', bg: 'var(--jaune-or-10)', border: 'var(--jaune-or-20)' },
  mensuelle: { text: 'var(--jaune-or)', bg: 'var(--jaune-or-10)', border: 'var(--jaune-or-20)' },
  semestrielle: { text: 'var(--mauve)', bg: 'var(--mauve-10)', border: 'var(--mauve-20)' },
}

const ALL_LABEL = 'tout' as const
type FilterCategory = Frequency | typeof ALL_LABEL

const PUBLICATIONS: Array<Publication> = [
  {
    id: 'revue-hebdo-example',
    title: 'Revue Hebdomadaire — Marchés BRVM',
    description: "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire',
    date: '2025-04-04',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '13.2 MB',
    pages: 12,
  },
  {
    id: 'revue-semestrielle-sep-26',
    title: 'Revue Semestrielle — S1 2024',
    description: "Bilan semestriel complet : analyse macro-économique UEMOA, performances des indices, faits marquants et perspectives du second semestre.",
    frequency: 'semestrielle',
    date: '2024-09-26',
    fileUrl: '/publications/Revue-semestrielle-20.09.26-1.pdf',
    fileSize: '10.5 MB',
    pages: 28,
  },
]

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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-5xl h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--mauve)]/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--mauve-10)' }}>
              <FiFileText className="text-[var(--mauve)]" size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="font-primary font-bold text-base text-[var(--night)] truncate">{pub.title}</h3>
              <p className="text-xs text-[var(--night)]/50 font-primary">{pub.fileSize}{pub.pages ? ` · ${pub.pages} pages` : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pub.fileUrl}
              download
              className="btn-primary-dark inline-flex items-center gap-2"
            >
              <FiDownload size={14} />
              Télécharger
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--mauve)]/10 hover:bg-[var(--mauve-10)] transition-colors"
              aria-label="Fermer"
            >
              <FiX size={18} className="text-[var(--night)]" />
            </button>
          </div>
        </div>

        {/* PDF Embed */}
        <div className="flex-1 bg-[#f5f5f5]">
          <iframe
            src={`${pub.fileUrl}#toolbar=1&navpanes=0`}
            title={pub.title}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Publication Card ─── */
const PublicationCard: React.FC<{ pub: Publication; onPreview: (pub: Publication) => void }> = ({ pub, onPreview }) => {
  const freq = FREQUENCY_COLORS[pub.frequency]
  const formattedDate = new Date(pub.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        // Set worker source to local bundled worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker
        
        // Load PDF with CORS handling
        const loadingTask = pdfjsLib.getDocument({
          url: pub.fileUrl,
          withCredentials: false,
        })
        
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
        
        const scale = 1.5
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        if (!context) {
          console.warn('Could not get canvas context for PDF thumbnail')
          return
        }
        
        canvas.height = viewport.height
        canvas.width = viewport.width
        
        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        }).promise
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
        setThumbnailUrl(dataUrl)
      } catch (error) {
        console.error('Failed to generate PDF thumbnail for', pub.fileUrl, ':', error)
      }
    }

    generateThumbnail()
  }, [pub.fileUrl])

  return (
    <article className="group relative flex flex-col h-full border border-[var(--mauve)]/10 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(70,29,76,0.08)] hover:border-[var(--mauve)]/20">
      {/* PDF visual preview area */}
      <button
        type="button"
        onClick={() => onPreview(pub)}
        className="relative h-52 bg-gradient-to-br from-[var(--mauve-10)] to-[var(--summit-ivory)] flex flex-col items-center justify-center cursor-pointer group/preview overflow-hidden"
      >
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={`${pub.title} preview`}
              className="w-full h-full object-contain group-hover/preview:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/10 transition-colors duration-300" />
          </>
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-20 rounded-lg bg-white shadow-lg flex flex-col items-center justify-center border border-[var(--mauve)]/10 group-hover/preview:scale-105 transition-transform duration-300">
              <div className="w-8 h-0.5 bg-[var(--mauve)]/15 rounded mb-1" />
              <div className="w-6 h-0.5 bg-[var(--mauve)]/10 rounded mb-1" />
              <div className="w-7 h-0.5 bg-[var(--mauve)]/15 rounded mb-1" />
              <div className="w-5 h-0.5 bg-[var(--mauve)]/10 rounded mb-1" />
              <div className="w-7 h-0.5 bg-[var(--mauve)]/15 rounded" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--mauve)] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300">
              <FiEye size={12} />
              Aperçu
            </span>
          </div>
        )}

        {/* Frequency badge — top-left */}
        <span
          className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ color: freq.text, background: freq.bg, border: `1px solid ${freq.border}` }}
        >
          {FREQUENCY_LABELS[pub.frequency]}
        </span>
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-[var(--night)]/50 font-primary mb-3">
          <FiCalendar size={12} />
          <time dateTime={pub.date}>{formattedDate}</time>
          {pub.pages && <span>· {pub.pages} pages</span>}
          <span>· {pub.fileSize}</span>
        </div>

        <h3 className="font-primary font-bold text-lg text-[var(--night)] mb-2 leading-snug group-hover:text-[var(--mauve)] transition-colors duration-300">
          {pub.title}
        </h3>
        <p className="text-sm text-[var(--night)]/60 leading-relaxed font-primary mb-6 flex-1">
          {pub.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            type="button"
            onClick={() => onPreview(pub)}
            className="flex-1 btn-secondary inline-flex items-center justify-center gap-2"
          >
            <FiEye size={14} />
            Aperçu
          </button>
          <a
            href={pub.fileUrl}
            download
            className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
          >
            <FiDownload size={14} />
            Télécharger
          </a>
        </div>
      </div>
    </article>
  )
}

/* ─── Page ─── */
export const PublicationsPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const filtersRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  const navigate = useNavigate()
  const search = useRouterState({
    select: (s) => s.location.search as { frequency?: Frequency },
  })

  const initialFilter: FilterCategory =
    search.frequency === 'hebdomadaire' ||
    search.frequency === 'mensuelle' ||
    search.frequency === 'semestrielle'
      ? search.frequency
      : ALL_LABEL

  const [activeFilter, setActiveFilter] = useState<FilterCategory>(initialFilter)
  const [searchQuery, setSearchQuery] = useState('')
  const [previewPub, setPreviewPub] = useState<Publication | null>(null)

  useEffect(() => {
    const f = search.frequency
    if (f === 'hebdomadaire' || f === 'mensuelle' || f === 'semestrielle') {
      setActiveFilter(f)
    } else {
      setActiveFilter(ALL_LABEL)
    }
  }, [search.frequency])

  const goToFilter = (cat: FilterCategory) => {
    if (cat === ALL_LABEL) {
      navigate({ to: '/publications', search: {} })
    } else {
      navigate({ to: '/publications', search: { frequency: cat } })
    }
  }

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
    const y = new Set(PUBLICATIONS.map(p => new Date(p.date).getFullYear().toString()))
    return ['Tout', ...Array.from(y).sort().reverse()]
  }, [])

  const months = useMemo(() => {
    if (activeYear === 'Tout') return ['Tout']
    const m = new Set(
      PUBLICATIONS.filter(p => new Date(p.date).getFullYear().toString() === activeYear)
        .map(p => (new Date(p.date).getMonth() + 1).toString().padStart(2, '0'))
    )
    return ['Tout', ...Array.from(m).sort()]
  }, [activeYear])

  // Reset month if year changes and month not in new year
  useEffect(() => {
    if (activeMonth !== 'Tout' && !months.includes(activeMonth)) {
      setActiveMonth('Tout')
    }
  }, [months, activeMonth])

  const filtered = useMemo(() => {
    let items = PUBLICATIONS

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
        p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [activeFilter, activeYear, activeMonth, searchQuery])

  return (
    <div className="bg-[var(--pure-white)] font-primary">
      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative min-h-[55vh] flex items-end pb-16 pt-24 bg-[var(--mauve)]">
        <div className="relative z-10 w-full page-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-7">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)] mb-6">
                <EditableText id="publications.hero.badge">Publications</EditableText>
              </span>
              <h1 className="font-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5 text-white">
                <EditableText id="publications.hero.title">Nos revues</EditableText>{' '}
                <span style={{ color: 'var(--jaune-or)' }}><EditableText id="publications.hero.titleAccent">&amp; analyses.</EditableText></span>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <p className="text-base md:text-lg leading-relaxed text-white/65 font-light mb-8">
                <EditableText id="publications.hero.subtitle">Consultez et téléchargez nos revues hebdomadaires, mensuelles et semestrielles pour suivre l'évolution des marchés.</EditableText>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Search + Filters ─── */}
      <section className="py-10 border-b border-black/5 sticky top-0 z-20 bg-[var(--pure-white)]/95 backdrop-blur-md">
        <div className="page-container">
          <div ref={filtersRef} className="reveal flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--mauve)]/40" size={16} />
              <input
                type="text"
                placeholder="Rechercher une revue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[var(--mauve)]/15 focus:border-[var(--mauve)] outline-none font-primary text-sm transition-colors rounded-full shadow-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((cat) => {
                const isActive = activeFilter === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => goToFilter(cat)}
                    className={`px-4 py-2 border rounded-full text-[11px] tracking-[0.1em] uppercase font-bold transition-all shadow-sm hover:shadow ${
                      isActive
                        ? 'bg-[var(--mauve)] text-white border-[var(--mauve)]'
                        : 'bg-white text-[var(--mauve)] border-[var(--mauve)]/10 hover:border-[var(--mauve)]/30 hover:bg-[var(--mauve-10)]'
                    }`}
                    aria-pressed={isActive}
                  >
                    {filterLabels[cat]}
                  </button>
                )
              })}
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <select 
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                className="px-4 py-2.5 bg-white border border-[var(--mauve)]/15 rounded-full text-sm font-primary focus:outline-none focus:border-[var(--mauve)] text-[var(--night)] shadow-sm cursor-pointer"
              >
                <option value="Tout">Année</option>
                {years.filter(y => y !== 'Tout').map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select 
                value={activeMonth}
                onChange={(e) => setActiveMonth(e.target.value)}
                disabled={activeYear === 'Tout'}
                className="px-4 py-2.5 bg-white border border-[var(--mauve)]/15 rounded-full text-sm font-primary focus:outline-none focus:border-[var(--mauve)] disabled:opacity-50 text-[var(--night)] shadow-sm cursor-pointer"
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
      <section className="py-20 md:py-28">
        <div className="page-container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--mauve-10)] rounded-full flex items-center justify-center">
                <FiFileText className="w-7 h-7 text-[var(--mauve)]" />
              </div>
              <h3 className="text-lg font-primary font-bold text-[var(--night)] mb-2">Aucune publication trouvée</h3>
              <p className="text-sm text-[var(--night)]/50 font-primary">Essayez de modifier vos filtres ou votre recherche.</p>
            </div>
          ) : (
            <div ref={listRef} className="reveal grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((pub) => (
                <PublicationCard key={pub.id} pub={pub} onPreview={handlePreview} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Preview Modal ─── */}
      {previewPub && <PreviewModal pub={previewPub} onClose={handleClosePreview} />}
    </div>
  )
}
