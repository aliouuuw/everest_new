import { useNavigate, useParams } from '@tanstack/react-router'
import { FiArrowLeft, FiCalendar, FiClock, FiExternalLink, FiLoader, FiArrowRight } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Link } from '@tanstack/react-router'

function estimateReadTime(text: string): string {
  const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min`
}

export const ArticlePage = () => {
  const { slug } = useParams({ from: '/actualites/$slug' as const })
  const navigate = useNavigate()

  const heroRef = useReveal<HTMLDivElement>()
  const contentRef = useReveal<HTMLDivElement>()

  // Query both sources in parallel; whichever returns a result wins
  const internalArticle = useQuery(api.articles.getArticleBySlug, { slug })
  const externalArticle = useQuery(
    api.externalNews.getExternalArticleBySlug,
    // only query external if internal came back null (not undefined = loading)
    internalArticle === null ? { slug } : 'skip'
  )

  // Still loading
  const isLoading = internalArticle === undefined || (internalArticle === null && externalArticle === undefined)

  // Normalize into a common shape
  const article = internalArticle
    ? {
        title:     internalArticle.title,
        excerpt:   internalArticle.excerpt,
        category:  internalArticle.category,
        date:      new Date(internalArticle.publishedAt ?? internalArticle.createdAt).toISOString().split('T')[0],
        readTime:  estimateReadTime(internalArticle.content),
        imageUrl:  internalArticle.imageUrl ?? '',
        content:   internalArticle.content,
        source:    undefined as string | undefined,
        sourceUrl: undefined as string | undefined,
      }
    : externalArticle
      ? {
          title:     externalArticle.title,
          excerpt:   externalArticle.excerpt,
          category:  externalArticle.category,
          date:      new Date(externalArticle.publishedAt).toISOString().split('T')[0],
          readTime:  estimateReadTime(externalArticle.content ?? externalArticle.excerpt),
          imageUrl:  externalArticle.imageUrl,
          content:   externalArticle.content ?? `<p>${externalArticle.excerpt}</p>`,
          source:    externalArticle.sourceName as string | undefined,
          sourceUrl: externalArticle.url as string | undefined,
        }
      : null

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--pure-white)]">
        <FiLoader className="animate-spin text-[var(--night-80)] w-8 h-8" />
      </div>
    )
  }

  // Article not found
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--pure-white)]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--mauve)]/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--night-80)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--night)] mb-4">Article non trouvé</h1>
          <p className="text-[rgba(10,10,10,0.6)] mb-4">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <button
            onClick={() => navigate({ to: '/actualites' })}
            className="px-4 py-2 bg-[var(--jaune-or)] text-white rounded-full hover:bg-[#b5832a] transition-colors"
          >
            Retour aux actualités
          </button>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Get all external articles for "related articles" sidebar
  const allExternalArticles = useQuery(api.externalNews.getExternalArticles)

  return (
    <div className="min-h-screen bg-[var(--pure-white)] pt-32 pb-24">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Column */}
          <article ref={heroRef} className="lg:col-span-8">
            {/* Header Area */}
            <header className="mb-10 text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* Back button */}
              <button
                onClick={() => navigate({ to: '/actualites' })}
                className="inline-flex items-center gap-2 text-[var(--night)]/50 hover:text-[var(--night-80)] transition-colors mb-8 group text-sm font-bold tracking-[0.1em] uppercase"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Retour aux actualités
              </button>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase bg-[var(--mauve)]/10 text-[var(--night-80)]">
                  {article.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-[var(--night)]/50">
                  <FiCalendar />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--night)]/50">
                  <FiClock />
                  <span>{article.readTime} de lecture</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-primary font-bold text-[var(--night)] leading-[1.15] mb-6">
                {article.title}
              </h1>
              
              {/* Excerpt/Lead paragraph */}
              <p className="text-xl md:text-2xl text-[var(--night)]/60 font-light leading-relaxed">
                {article.excerpt}
              </p>
            </header>

            {/* Featured Image */}
            <figure className="mb-12 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--white-smoke)] border border-black/5">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </figure>

            {/* Content Body */}
            <div ref={contentRef}>
              <div 
                className="prose prose-lg md:prose-xl max-w-none text-[rgba(10,10,10,0.85)] prose-headings:font-primary prose-headings:font-bold prose-headings:text-[var(--night)] prose-headings:tracking-tight prose-a:text-[var(--night-80)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-hr:border-black/10 article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Source attribution */}
              {article.source && article.sourceUrl && (
                <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-[var(--white-smoke)] rounded-2xl border border-black/5 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs tracking-[0.1em] uppercase font-bold text-[var(--night)]/40 mb-1">
                      Source originale
                    </span>
                    <span className="text-base text-[var(--night)] font-medium">
                      {article.source}
                    </span>
                  </div>
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pure-white)] border border-[var(--jaune-or)]/30 text-[var(--night-80)] rounded-full hover:bg-[var(--jaune-or)] hover:text-white transition-colors text-[11px] tracking-[0.1em] uppercase font-bold whitespace-nowrap"
                  >
                    Lire sur le site original <FiExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* Footer Back Button */}
              <div className="mt-16 pt-8 border-t border-black/10 text-center">
                <button
                  onClick={() => navigate({ to: '/actualites' })}
                  className="inline-flex items-center gap-2 text-[var(--night)] hover:text-[var(--night-80)] transition-colors font-bold text-sm tracking-[0.1em] uppercase group"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  Retour aux actualités
                </button>
              </div>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            {/* Promotional Banner */}
            <div className="p-8 bg-gradient-to-br from-[var(--mauve)] to-[rgba(1,45,42,0.8)] rounded-2xl text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 mb-4 text-[9px] tracking-[0.2em] uppercase font-bold text-white/70 bg-white/10 rounded-full">
                  Publicité
                </span>
                <h3 className="text-xl font-primary font-bold mb-3 leading-[1.25]">
                  Ouvrez votre compte-titres 100% en ligne
                </h3>
                <p className="text-sm mb-6 font-light leading-[1.6] text-white/80">
                  Accédez aux meilleures opportunités de la BRVM avec notre plateforme sécurisée.
                </p>
                <a
                  href="https://everest-account-opening.vercel.app/new-home"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--night-80)] rounded-full hover:bg-white/90 transition-colors text-[11px] tracking-[0.1em] uppercase font-bold"
                >
                  Commencer <FiArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Related Articles */}
            <div>
              <h3 className="text-lg font-primary font-bold text-[var(--night)] mb-6">
                Articles connexes
              </h3>
              <div className="space-y-4">
                {allExternalArticles && allExternalArticles.length > 0 ? (
                  allExternalArticles.slice(0, 3).map((relArticle) => (
                    <Link
                      key={relArticle._id}
                      to="/actualites/$slug"
                      params={{ slug: relArticle.slug || '' }}
                      className="group block p-4 rounded-xl border border-black/5 hover:border-[var(--mauve)]/30 hover:bg-[var(--mauve)]/5 transition-all duration-300"
                    >
                      <div className="flex gap-3">
                        {relArticle.imageUrl && (
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--white-smoke)]">
                            <img
                              src={relArticle.imageUrl}
                              alt={relArticle.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--night-80)] mb-1">
                            {relArticle.category}
                          </p>
                          <h4 className="text-sm font-primary font-bold text-[var(--night)] line-clamp-2 group-hover:text-[var(--night-80)] transition-colors">
                            {relArticle.title}
                          </h4>
                          <p className="text-[11px] text-[var(--night)]/50 mt-1">
                            {new Date(relArticle.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-[var(--night)]/50">Aucun article connexe</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
