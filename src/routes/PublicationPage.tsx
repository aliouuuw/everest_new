import { useNavigate, useParams } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { FaArrowLeft, FaCalendar, FaEye, FaShare, FaTag, FaUser } from 'react-icons/fa'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { useReveal } from '../components/Hooks/useReveal'

export const PublicationPage = () => {
  const { slug } = useParams({ from: '/publications/$slug' })
  const navigate = useNavigate()
  const [isSharing, setIsSharing] = useState(false)
  
  const heroRef = useReveal<HTMLElement>()
  const contentRef = useReveal<HTMLElement>()

  // Fetch publication by slug
  const publication = useQuery(api.publications.getPublicationBySlug, { slug })

  // Handle sharing
  const handleShare = async () => {
    if (publication) {
      try {
        await navigator.share({
          title: publication.title,
          text: publication.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        setIsSharing(true)
        setTimeout(() => setIsSharing(false), 2000)
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }

  // Loading state
  if (publication === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gold-metallic)] mx-auto mb-4"></div>
          <p className="text-[var(--night-80)]">Chargement de la publication...</p>
        </div>
      </div>
    )
  }

  // Publication not found
  if (!publication) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--error-red)]/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--error-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Publication non trouvée</h1>
          <p className="text-gray-600 mb-4">La publication que vous recherchez n'existe pas ou a été supprimée.</p>
          <button
            onClick={() => navigate({ to: '/publications' })}
            className="px-4 py-2 bg-[var(--gold-metallic)] text-white rounded hover:bg-[var(--gold-dark)] transition-colors"
          >
            Retour aux publications
          </button>
        </div>
      </div>
    )
  }

  const getCategoryLabel = (category: string) => {
    const categoryLabels: Record<string, string> = {
      'revues-hebdo': 'Revues hebdomadaires',
      'revues-mensuelles': 'Revues mensuelles',
      'teaser-dividende': 'Teaser des dividendes',
      'marches': 'Marchés',
      'analyses': 'Analyses',
    }
    return categoryLabels[category] || category
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-[var(--pure-white)]">
      {/* Hero Section */}
      <section ref={heroRef} className="reveal py-20 sm:py-28 bg-gradient-to-br from-[var(--white-smoke)]/50 to-[var(--gold-light)]/10">
        <div className="mx-auto max-w-4xl px-6">
          {/* Back button */}
          <button
            onClick={() => navigate({ to: '/publications' })}
            className="inline-flex items-center gap-2 text-[var(--night-80)] hover:text-[var(--night)] transition-colors mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Retour aux publications
          </button>

          {/* Category badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[var(--gold-light)]/10 text-[var(--gold-dark)] border border-[var(--gold-light)]/20">
              {getCategoryLabel(publication.category)}
            </span>
            {publication.featured && (
              <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-[var(--gold-metallic)]/20 text-[var(--gold-metallic)] border border-[var(--gold-metallic)]/30 ml-3">
                ⭐ En vedette
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--night)] mb-6 leading-tight">
            {publication.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-[var(--night-80)] mb-8 leading-relaxed">
            {publication.description}
          </p>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-[var(--night-60)] text-sm">
            <div className="flex items-center gap-2">
              <FaCalendar className="text-[var(--gold-metallic)]" />
              <span>{publication.createdAt ? formatDate(publication.createdAt) : 'Date non disponible'}</span>
            </div>
            {publication.author && (
              <div className="flex items-center gap-2">
                <FaUser className="text-[var(--gold-metallic)]" />
                <span>{publication.author.name}</span>
              </div>
            )}
            {publication.readingTime && (
              <div className="flex items-center gap-2">
                <FaEye className="text-[var(--gold-metallic)]" />
                <span>{publication.readingTime} min de lecture</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {publication.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-6">
              <FaTag className="text-[var(--gold-metallic)]" />
              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] text-xs rounded-full border border-[var(--gold-metallic)]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-lg max-w-none">
            {/* Content */}
            <div className="bg-white rounded-2xl border border-[var(--gold-metallic)]/20 p-8 shadow-sm">
              <div 
                className="text-[var(--night)] leading-relaxed publication-content"
                dangerouslySetInnerHTML={{ __html: publication.content }}
              />
            </div>

            {/* Share button */}
            <div className="mt-12 text-center">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold-metallic)] text-white rounded-xl hover:bg-[var(--gold-dark)] transition-colors"
              >
                <FaShare />
                {isSharing ? 'Lien copié !' : 'Partager cette publication'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
