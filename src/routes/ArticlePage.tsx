import { useNavigate, useParams } from '@tanstack/react-router'
import { FiArrowLeft, FiCalendar, FiClock, FiExternalLink, FiLoader, FiArrowRight } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Link } from '@tanstack/react-router'

// Static article data for internal (hardcoded) articles
const ARTICLES_DATA: Record<string, {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  imageUrl: string
  source?: string
  sourceUrl?: string
  content: string
}> = {
  'brvm-sucrivoire-societe-generale-ci': {
    title: "BRVM : Sucrivoire s'illustre, Société Générale CI donne le ton au marché",
    excerpt: "La BRVM orchestre un rebond, clôturant la séance en territoire positif. L'indice BRVM Composite gagne 0,13 % à 406,95 points, porté par Sucrivoire (+7,32 %) et Société Générale CI (+2,66 %).",
    category: "Marchés",
    date: "2026-04-09",
    readTime: "4 min",
    imageUrl: "/articles/brvm-marche.jpg",
    source: "Sika Finance",
    sourceUrl: "https://www.sikafinance.com/marches/brvm-sucrivoire-sillustre-societe-generale-ci-donne-le-ton-au-marche_60958",
    content: `
      <h2>Un rebond porté par les valeurs industrielles</h2>
      <p>La BRVM orchestre un rebond, clôturant la séance en territoire positif. L'indice BRVM Composite gagne 0,13 % à 406,95 points, suivi par la progression du BRVM-30 (+0,32 % à 191,95 points) et du BRVM Prestige (+0,67 % à 158,77 points).</p>

      <h3>Les meilleures performances de la séance</h3>
      <p>Dans ce contexte, les valeurs en hausse prennent logiquement l'ascendant. <strong>Sucrivoire</strong> se distingue comme la meilleure performance de la séance, bondissant à 2 125 FCFA (+7,32 %), suivie de <strong>PALM CI</strong> à 8 700 FCFA (+6,10 %) et de <strong>SAPH CI</strong>, qui gagne 3,05 % à 7 265 FCFA, soutenue par les signaux positifs issus de son Assemblée Générale Ordinaire tenue ce 09 avril 2026.</p>
      <p>À noter également la contribution de <strong>Société Générale CI</strong>, dont la progression à 33 980 FCFA (+2,66 %) engendre un impact significatif de 27,37 milliards FCFA sur la capitalisation globale du marché.</p>

      <h3>Un marché contrasté</h3>
      <p>En dépit de cette orientation globale, le marché reste contrasté, avec 23 valeurs en baisse contre 19 en hausse. SICABLE accuse le plus fort repli à 4 095 FCFA (-7,46 %), suivie de SETAO CI à 3 605 FCFA (-7,45 %) et de UNILEVER CI, en baisse de 3,53 % à 58 000 FCFA.</p>

      <h3>Volumes d'échanges</h3>
      <p>Côté échanges, l'activité ralentit nettement, avec un volume global limité à 860 millions FCFA, dans la continuité des niveaux observés ces dernières semaines. SONATEL domine les transactions avec 99,52 millions FCFA, soit 11,57 % des volumes, le titre évoluant quasi à l'équilibre à 28 795 FCFA (-0,02 %).</p>
    `
  },
  'abidjan-paradoxe-financement-afrique': {
    title: "À Abidjan, le paradoxe d'un continent riche en capital mais pauvre en financement",
    excerpt: "Réunis à l'initiative de la BAD, les acteurs de la finance africaine constatent un déficit de 400 milliards USD/an malgré 4 000 milliards d'épargne disponible.",
    category: "Finance",
    date: "2026-04-10",
    readTime: "6 min",
    imageUrl: "/articles/abidjan-finance.jpg",
    source: "Sika Finance",
    sourceUrl: "https://www.sikafinance.com/marches/afrique-a-abidjan-le-paradoxe-dun-continent-riche-en-capital-mais-pauvre-en-financement_60969",
    content: `
      <h2>Un déficit de financement structurel</h2>
      <p>Réunis ce 9 avril à Abidjan à l'initiative de la BAD pour mener des réflexions sur la construction de la Nouvelle architecture financière africaine (NAFA), les principaux acteurs de la finance du continent ont partagé un diagnostic de plus en plus difficile à éluder : le problème du financement du développement en Afrique tient moins à un manque de ressources qu'à une défaillance dans leur organisation.</p>
      <p>À la tribune, Sidi Ould Tah, le président de la BAD, a résumé une réalité désormais largement partagée : l'Afrique fait face à un déficit de financement supérieur à <strong>400 milliards de dollars par an</strong>, alimenté par des besoins massifs en infrastructures, en industrialisation et en transition climatique. Un déséquilibre d'autant plus frappant que le continent dispose, en parallèle, d'environ <strong>4 000 milliards de dollars d'épargne de long terme</strong>.</p>

      <h3>Sous-organisée, pas sous-capitalisée</h3>
      <p>Ce paradoxe révèle un problème structurel : « l'Afrique n'est pas sous-capitalisée, elle est sous-organisée », a-t-il indiqué pour reprendre les grandes lignes de la keynote du professeur Carlos Lopes à l'ouverture de ces assises.</p>
      <p>Pendant des décennies, les financements concessionnels ont permis de soutenir les économies les plus fragiles. Mais ces instruments, par nature limités, n'ont jamais été conçus pour accompagner une transformation économique à grande échelle.</p>

      <h3>L'Afrique, exportateur net de capital</h3>
      <p>Le constat le plus frappant reste souvent relégué au second plan : « l'Afrique est un exportateur net de capital ». Derrière cette réalité se cachent plusieurs mécanismes bien identifiés — érosion de la base fiscale, flux financiers illicites, mais aussi orientation des portefeuilles vers des actifs extérieurs.</p>
      <p>« Résultat : le continent exporte une part significative de ses ressources financières, avant de les réimporter à un coût élevé, grevé d'une prime de risque largement fondée sur des perceptions », a décrit Carlos Lopes.</p>

      <h3>L'enjeu : reprendre la main</h3>
      <p>L'enjeu du dialogue d'Abidjan apparaît dès lors clairement : permettre au continent de reprendre la main sur ses leviers financiers. Non pas en cherchant uniquement davantage de capitaux, mais en les réorganisant pour qu'ils financent effectivement le développement de la région.</p>
    `
  },
  'rdc-premier-eurobond': {
    title: "La RDC lève 1,25 milliard USD pour son tout premier eurobond",
    excerpt: "La République démocratique du Congo fait son entrée sur le marché international de la dette avec une émission largement sursouscrite, structurée en deux tranches.",
    category: "Obligations",
    date: "2026-04-10",
    readTime: "5 min",
    imageUrl: "/articles/rdc-eurobond.jpg",
    source: "Sika Finance",
    sourceUrl: "https://www.sikafinance.com/marches/la-rdc-leve-1-25-milliard-usd-pour-son-tout-premier-eurobond_60967",
    content: `
      <h2>Une première historique</h2>
      <p>La République démocratique du Congo a effectué son entrée sur le marché international de la dette en mobilisant <strong>1,25 milliard de dollars</strong>, à l'occasion d'une opération structurée en deux tranches et largement sursouscrite, selon des informations communiquées par Rawbank et confirmées par Reuters. Réalisée le 9 avril 2026, cette émission marque une première pour le pays sur ce segment, avec une demande globale ayant atteint près de <strong>5 milliards de dollars</strong>.</p>

      <h3>Détails de l'opération</h3>
      <p>L'opération s'est traduite par l'émission de deux obligations en dollars :</p>
      <ul>
        <li><strong>Tranche 1</strong> : 600 millions USD, maturité 2032, rendement de 8,75 %</li>
        <li><strong>Tranche 2</strong> : 650 millions USD, maturité 2037, rendement de 9,50 %</li>
      </ul>
      <p>Les carnets d'ordres ont dépassé respectivement 2 milliards et 2,8 milliards de dollars, permettant un resserrement des conditions initialement envisagées.</p>

      <h3>Réaction des autorités</h3>
      <p>Le ministre des Finances, Doudou Fwamba Likunde Libotayi, a déclaré : « Le succès de cette opération reflète la reconnaissance des progrès accomplis dans nos efforts continus pour renforcer la stabilité macroéconomique, améliorer la gestion des finances publiques et faire avancer les réformes structurelles. »</p>

      <h3>Utilisation des fonds</h3>
      <p>Selon les autorités congolaises, les fonds mobilisés seront orientés vers des projets d'infrastructures, d'énergie et de développement social. Cette levée s'inscrit dans un programme plus large portant sur un volume total potentiel de 1,5 milliard de dollars.</p>

      <h3>Positionnement sur les marchés émergents</h3>
      <p>Les niveaux de rendement obtenus situent cette première émission dans la fourchette observée sur les marchés émergents. L'Angola avait emprunté à 9,5 % en juillet 2025, la République du Congo à 9,875 % en novembre 2025 et le Kenya à 10,375 % en février 2024. Le niveau d'endettement de la RDC reste contenu, estimé entre 18 % et 22 % du PIB à fin 2025.</p>
    `
  }
}

function estimateReadTime(text: string): string {
  const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min`
}

export const ArticlePage = () => {
  const { slug } = useParams({ from: '/actualites/$slug' as const })
  const navigate = useNavigate()
  
  const heroRef = useReveal<HTMLDivElement>()
  const contentRef = useReveal<HTMLDivElement>()

  // Try static data first, then fall back to Convex external article
  const staticArticle = ARTICLES_DATA[slug]
  const externalArticle = useQuery(
    api.externalNews.getExternalArticleBySlug,
    staticArticle ? "skip" : { slug }
  )

  // Normalize into a common shape
  const article = staticArticle
    ? { ...staticArticle, isExternal: false as const }
    : externalArticle
      ? {
          title: externalArticle.title,
          excerpt: externalArticle.excerpt,
          category: externalArticle.category,
          date: new Date(externalArticle.publishedAt).toISOString().split('T')[0],
          readTime: estimateReadTime(externalArticle.content ?? externalArticle.excerpt),
          imageUrl: externalArticle.imageUrl,
          content: externalArticle.content ?? `<p>${externalArticle.excerpt}</p>`,
          source: externalArticle.sourceName,
          sourceUrl: externalArticle.url,
          isExternal: true as const,
        }
      : null

  // Loading state (only when querying Convex)
  if (!staticArticle && externalArticle === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--pure-white)]">
        <FiLoader className="animate-spin text-[var(--mauve)] w-8 h-8" />
      </div>
    )
  }

  // Article not found
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--pure-white)]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--mauve)]/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--mauve)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--night)] mb-4">Article non trouvé</h1>
          <p className="text-[rgba(10,10,10,0.6)] mb-4">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <button
            onClick={() => navigate({ to: '/actualites' })}
            className="px-4 py-2 bg-[var(--mauve)] text-white rounded-full hover:bg-[var(--night)] transition-colors"
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
                className="inline-flex items-center gap-2 text-[var(--night)]/50 hover:text-[var(--mauve)] transition-colors mb-8 group text-sm font-bold tracking-[0.1em] uppercase"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Retour aux actualités
              </button>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase bg-[var(--mauve)]/10 text-[var(--mauve)]">
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
                className="prose prose-lg md:prose-xl max-w-none text-[rgba(10,10,10,0.85)] prose-headings:font-primary prose-headings:font-bold prose-headings:text-[var(--night)] prose-headings:tracking-tight prose-a:text-[var(--mauve)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-hr:border-black/10 article-content"
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
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pure-white)] border border-[var(--mauve)]/20 text-[var(--mauve)] rounded-full hover:bg-[var(--mauve)] hover:text-white transition-colors text-[11px] tracking-[0.1em] uppercase font-bold whitespace-nowrap"
                  >
                    Lire sur le site original <FiExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* Footer Back Button */}
              <div className="mt-16 pt-8 border-t border-black/10 text-center">
                <button
                  onClick={() => navigate({ to: '/actualites' })}
                  className="inline-flex items-center gap-2 text-[var(--night)] hover:text-[var(--mauve)] transition-colors font-bold text-sm tracking-[0.1em] uppercase group"
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
            <div className="sticky top-40 p-8 bg-gradient-to-br from-[var(--mauve)] to-[rgba(70,29,76,0.8)] rounded-2xl text-white overflow-hidden relative">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--mauve)] rounded-full hover:bg-white/90 transition-colors text-[11px] tracking-[0.1em] uppercase font-bold"
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
                          <p className="text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--mauve)] mb-1">
                            {relArticle.category}
                          </p>
                          <h4 className="text-sm font-primary font-bold text-[var(--night)] line-clamp-2 group-hover:text-[var(--mauve)] transition-colors">
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
