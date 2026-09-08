import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { FaArrowLeft, FaCalendar, FaEye, FaShare, FaTag, FaUser } from 'react-icons/fa'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { useReveal } from '../components/Hooks/useReveal'

const CATEGORY_LABELS: Record<string, string> = {
  'revues-hebdo': 'Revues hebdomadaires',
  'revues-mensuelles': 'Revues mensuelles',
  'teaser-dividende': 'Teaser des dividendes',
  marches: 'Marchés',
  analyses: 'Analyses',
}

function categoryLabel(category: string) {
  return CATEGORY_LABELS[category] || category
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date non disponible'
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export type PublicationViewData = {
  title: string
  description: string
  category: string
  featured: boolean
  date: string
  authorName?: string
  readingTime?: number
  tags: string[]
  content: string
}

export function PublicationView({ publication }: { publication: PublicationViewData }) {
  const heroRef = useReveal<HTMLElement>()
  const contentRef = useReveal<HTMLElement>()
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.share({
        title: publication.title,
        text: publication.description,
        url: window.location.href,
      })
    } catch {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setIsSharing(true)
        setTimeout(() => setIsSharing(false), 2000)
      } catch {
        // Share is optional; leave the button as-is.
      }
    }
  }

  return (
    <div className="min-h-screen bg-[var(--pure-white)]">
      <section
        ref={heroRef}
        className="section-bg-mauve pb-20 pt-[var(--site-chrome-top)] sm:pb-28"
      >
        <div className="page-container">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/publications"
              className="group mb-8 inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Retour aux publications
            </Link>

            <div className="mb-6">
              <span className="inline-flex items-center rounded-full border border-[var(--jaune-or)]/20 bg-[var(--jaune-or)]/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--jaune-or)]">
                {categoryLabel(publication.category)}
              </span>
              {publication.featured && (
                <span className="ml-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  En vedette
                </span>
              )}
            </div>

            <h1 className="mb-6 font-primary text-4xl font-bold leading-tight text-white sm:text-5xl">
              {publication.title}
            </h1>

            <p className="mb-8 border-l-2 border-[var(--jaune-or)] pl-6 text-xl font-light leading-relaxed text-white/70">
              {publication.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-[var(--jaune-or)]" />
                <span>{formatDate(publication.date)}</span>
              </div>
              {publication.authorName && (
                <div className="flex items-center gap-2">
                  <FaUser className="text-[var(--jaune-or)]" />
                  <span>{publication.authorName}</span>
                </div>
              )}
              {publication.readingTime ? (
                <div className="flex items-center gap-2">
                  <FaEye className="text-[var(--jaune-or)]" />
                  <span>{publication.readingTime} min de lecture</span>
                </div>
              ) : null}
            </div>

            {publication.tags.length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                <FaTag className="text-[var(--jaune-or)]" />
                <div className="flex flex-wrap gap-2">
                  {publication.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section ref={contentRef} className="py-16">
        <div className="page-container">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <div className="rounded-2xl border border-[var(--jaune-or)]/20 bg-white p-8 shadow-sm">
                <div
                  className="publication-content leading-relaxed text-[var(--night)]"
                  dangerouslySetInnerHTML={{ __html: publication.content }}
                />
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--jaune-or)] px-6 py-3 text-white transition-colors hover:bg-[var(--jaune-or)]/90"
                >
                  <FaShare />
                  {isSharing ? 'Lien copié !' : 'Partager cette publication'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const PublicationPage = () => {
  const { slug } = useParams({ from: '/publications/$slug' })
  const navigate = useNavigate()
  const publication = useQuery(api.publications.getPublicationBySlug, { slug })

  if (publication === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--jaune-or)]"></div>
          <p className="text-[rgba(10,10,10,0.8)]">Chargement de la publication...</p>
        </div>
      </div>
    )
  }

  if (!publication) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Publication non trouvée</h1>
          <p className="mb-4 text-gray-600">
            La publication que vous recherchez n'existe pas ou a été supprimée.
          </p>
          <button
            onClick={() => navigate({ to: '/publications' })}
            className="rounded bg-[var(--jaune-or)] px-4 py-2 text-white transition-colors hover:bg-[var(--jaune-or)]/90"
          >
            Retour aux publications
          </button>
        </div>
      </div>
    )
  }

  const view: PublicationViewData = {
    title: publication.title,
    description: publication.description,
    category: publication.category,
    featured: Boolean(publication.featured),
    date: publication.createdAt
      ? new Date(publication.createdAt).toISOString()
      : '',
    authorName: publication.author?.name,
    readingTime: publication.readingTime,
    tags: publication.tags ?? [],
    content: publication.content,
  }

  return <PublicationView publication={view} />
}
