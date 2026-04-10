import { useNavigate, useParams } from '@tanstack/react-router'
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'

// Article data - same as in ActualitesPage
const ARTICLES_DATA: Record<string, {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  imageUrl: string
  content: string
}> = {
  'classement-crepmf': {
    title: "Nomination d'Everest Finance parmi les SGI les plus actives de la BRVM",
    excerpt: "Le classement annuel du CREPMF confirme la position d'Everest Finance dans le top 5 des sociétés de gestion et d'intermédiation en volume de transactions.",
    category: "Presse",
    date: "2024-03-10",
    readTime: "3 min",
    imageUrl: "/background-sol.jpg",
    content: `
      <h2>Reconnaissance du leadership d'Everest Finance</h2>
      <p>Le classement annuel du CREPMF (Conseil Régional de l'Épargne Publique et des Marchés Financiers) a confirmé la position d'Everest Finance parmi les sociétés de gestion et d'intermédiation les plus actives de la Bourse Régionale des Valeurs Mobilières (BRVM).</p>
      
      <h3>Une performance remarquable</h3>
      <p>Avec un volume de transactions significatif et une présence constante sur le marché, Everest Finance s'affirme comme un acteur incontournable de la région UEMOA. Cette reconnaissance reflète notre engagement envers l'excellence et notre contribution active au dynamisme du marché financier régional.</p>
      
      <h3>Perspectives futures</h3>
      <p>Cette nomination nous encourage à poursuivre nos efforts pour offrir des services de qualité supérieure à nos clients et contribuer au développement des marchés financiers en Afrique de l'Ouest.</p>
    `
  },
  'emission-obligataire-50mds': {
    title: "Everest Finance réalise avec succès une émission obligataire de 50 milliards FCFA",
    excerpt: "Retour sur la structuration et le placement de cette opération phare pour le compte d'un émetteur souverain de la zone UEMOA — un jalon majeur pour notre équipe d'ingénierie financière.",
    category: "Communiqué",
    date: "2024-03-15",
    readTime: "5 min",
    imageUrl: "/bg-mc.jpg",
    content: `
      <h2>Une opération structurante pour la région</h2>
      <p>Everest Finance a réalisé avec succès la structuration et le placement d'une émission obligataire de 50 milliards FCFA pour le compte d'un émetteur souverain majeur de la zone UEMOA.</p>
      
      <h3>Détails de l'opération</h3>
      <p>Cette opération représente un jalon important pour notre équipe d'ingénierie financière, démontrant notre capacité à structurer et placer des instruments financiers complexes sur les marchés régionaux.</p>
      
      <h3>Impact régional</h3>
      <p>Cette émission contribue au développement des marchés de capitaux régionaux et renforce la position d'Everest Finance comme partenaire de référence pour les opérations de financement en Afrique de l'Ouest.</p>
    `
  },
  'portail-client': {
    title: "Lancement du nouveau portail client sécurisé",
    excerpt: "Accès en temps réel à vos portefeuilles, relevés d'opérations et rapports de performance — une refonte complète de l'expérience digitale pour nos clients.",
    category: "Mise à jour",
    date: "2024-02-28",
    readTime: "4 min",
    imageUrl: "/bg-mc.jpg",
    content: `
      <h2>Une nouvelle expérience digitale</h2>
      <p>Nous sommes heureux d'annoncer le lancement de notre nouveau portail client, une plateforme entièrement repensée pour offrir une meilleure expérience utilisateur.</p>
      
      <h3>Fonctionnalités principales</h3>
      <ul>
        <li>Accès en temps réel à vos portefeuilles</li>
        <li>Relevés d'opérations détaillés</li>
        <li>Rapports de performance personnalisés</li>
        <li>Sécurité renforcée avec authentification multi-facteurs</li>
      </ul>
      
      <h3>Facilité d'utilisation</h3>
      <p>Le nouveau portail a été conçu avec une interface intuitive et responsive, accessible depuis tous vos appareils.</p>
    `
  },
  'rapport-brvm-2023': {
    title: "Everest Finance cité dans le rapport annuel de la BRVM",
    excerpt: "Mention dans le rapport 2023 de la Bourse Régionale pour notre contribution active au dynamisme du marché secondaire et des opérations de courtage.",
    category: "Médias",
    date: "2024-02-15",
    readTime: "6 min",
    imageUrl: "/background-sol.jpg",
    content: `
      <h2>Reconnaissance dans le rapport annuel de la BRVM</h2>
      <p>Le rapport annuel 2023 de la Bourse Régionale des Valeurs Mobilières (BRVM) a mis en avant la contribution active d'Everest Finance au dynamisme du marché.</p>
      
      <h3>Contributions clés</h3>
      <p>Notre entreprise a été mentionnée pour son rôle important dans :</p>
      <ul>
        <li>Le développement du marché secondaire</li>
        <li>Les opérations de courtage de qualité</li>
        <li>L'innovation en matière de services financiers</li>
      </ul>
      
      <h3>Perspectives</h3>
      <p>Cette reconnaissance nous motive à continuer notre engagement envers l'excellence et le développement des marchés financiers régionaux.</p>
    `
  },
  'webinaire-obligations-vertes': {
    title: "Webinaire : comprendre les obligations vertes sur le marché UEMOA",
    excerpt: "Notre équipe recherche animera une session dédiée aux enjeux ESG et aux nouvelles opportunités d'investissement durable dans la sous-région.",
    category: "Événement",
    date: "2024-01-30",
    readTime: "2 min",
    imageUrl: "/bg-mc.jpg",
    content: `
      <h2>Webinaire sur les obligations vertes</h2>
      <p>Everest Finance organise un webinaire dédié aux obligations vertes et aux enjeux ESG sur le marché UEMOA.</p>
      
      <h3>Programme</h3>
      <p>Notre équipe de recherche animera une session couvrant :</p>
      <ul>
        <li>Les principes des obligations vertes</li>
        <li>Les critères ESG dans la sélection d'investissements</li>
        <li>Les opportunités d'investissement durable en Afrique de l'Ouest</li>
      </ul>
      
      <h3>Participation</h3>
      <p>Cet événement s'adresse aux investisseurs, gestionnaires de portefeuille et professionnels des marchés financiers intéressés par l'investissement durable.</p>
    `
  }
}

export const ArticlePage = () => {
  const { slug } = useParams({ from: '/actualites/$slug' as const })
  const navigate = useNavigate()
  
  const heroRef = useReveal<HTMLElement>()
  const contentRef = useReveal<HTMLElement>()

  const article = ARTICLES_DATA[slug]

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

  return (
    <div className="min-h-screen bg-[var(--pure-white)]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'var(--gradient-image-overlay-heavy)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          {/* Back button */}
          <button
            onClick={() => navigate({ to: '/actualites' })}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Retour aux actualités
          </button>

          {/* Category badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase bg-[var(--jaune-or)]/20 text-[var(--jaune-or)] border border-[var(--jaune-or)]/30">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-primary font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-[var(--jaune-or)]" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-[var(--jaune-or)]" />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-lg max-w-none">
            {/* Content */}
            <div className="bg-white rounded-2xl border border-[var(--mauve)]/10 p-8 md:p-12 shadow-sm">
              <div 
                className="text-[var(--night)] leading-relaxed article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.8'
                }}
              />
            </div>

            {/* Back to articles */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate({ to: '/actualites' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--mauve)] text-white rounded-full hover:bg-[var(--night)] transition-colors font-bold text-sm tracking-[0.1em] uppercase"
              >
                <FiArrowLeft />
                Retour aux actualités
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
