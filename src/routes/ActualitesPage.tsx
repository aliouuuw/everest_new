import { useEffect, useRef } from 'react';
import { FiArrowRight, FiCalendar, FiTag, FiClock } from 'react-icons/fi';
import { gsap } from 'gsap';

// Expanded mock data
const FEATURED_ARTICLE = {
  title: "Le marché financier régional maintient sa dynamique de croissance record en 2024",
  excerpt: "Analyse approfondie des tendances récentes du marché financier de l'UEMOA, des politiques monétaires en cours et des perspectives macroéconomiques pour le prochain semestre.",
  category: "Marchés",
  date: "2024-03-15",
  readTime: "5 min",
  imageUrl: "/bg-mc.jpg",
  href: "/actualites/marche-financier-croissance"
};

const ARTICLES = [
  {
    title: "Everest Finance lance une nouvelle gamme de FCP",
    excerpt: "Découvrez nos nouveaux produits structurés adaptés aux besoins spécifiques des investisseurs institutionnels et particuliers.",
    category: "Entreprise",
    date: "2024-03-10",
    readTime: "3 min",
    imageUrl: "/background-sol.jpg",
    href: "/actualites/nouveaux-produits"
  },
  {
    title: "Comment optimiser la gestion de trésorerie face à l'inflation",
    excerpt: "Stratégies défensives et conseils pratiques pour les entreprises cherchant à préserver la valeur de leur trésorerie excédentaire.",
    category: "Conseil",
    date: "2024-02-28",
    readTime: "4 min",
    imageUrl: "/bg-mc.jpg",
    href: "/actualites/optimiser-tresorerie"
  },
  {
    title: "Bilan des introductions en bourse de l'année écoulée",
    excerpt: "Retour sur les IPOs marquantes à la BRVM et ce qu'elles révèlent sur l'appétit des investisseurs régionaux.",
    category: "Bourse",
    date: "2024-02-15",
    readTime: "6 min",
    imageUrl: "/background-sol.jpg",
    href: "/actualites/bilan-ipo"
  },
  {
    title: "Les enjeux de la finance verte en Afrique de l'Ouest",
    excerpt: "Le développement des obligations vertes et durables sur le marché régional : opportunités et défis réglementaires.",
    category: "ESG",
    date: "2024-01-30",
    readTime: "7 min",
    imageUrl: "/bg-mc.jpg",
    href: "/actualites/finance-verte"
  }
];

export const ActualitesPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.animate-fade-up', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[var(--pure-white)] pt-32 pb-20">
      {/* Header simple */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24 mb-12 animate-fade-up">
        <div className="max-w-3xl">
          <span
            className="block text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
          >
            Centre d'information
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display-aptos)',
              fontWeight: 500,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: 'var(--night)',
            }}
          >
            Actualités & <em style={{ fontWeight: 400, fontStyle: 'italic', color: 'var(--jaune-or)' }}>Analyses.</em>
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Featured Article */}
        <div className="mb-16 animate-fade-up group block relative overflow-hidden rounded-sm cursor-pointer">
          <a href={FEATURED_ARTICLE.href} className="flex flex-col lg:flex-row bg-[var(--cream)] border border-black/5 hover:border-[var(--jaune-or)]/30 transition-all duration-500">
            <div className="lg:w-2/3 relative aspect-[16/9] lg:aspect-auto overflow-hidden">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={FEATURED_ARTICLE.imageUrl} 
                alt={FEATURED_ARTICLE.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-[var(--jaune-or)] text-[var(--night)] text-[10px] tracking-[0.15em] uppercase px-4 py-2 font-bold">
                  À la une
                </span>
              </div>
            </div>
            <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center relative">
              <div className="flex items-center gap-4 mb-6 text-[11px] uppercase tracking-[0.1em] text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                <span className="flex items-center gap-1.5"><FiTag /> {FEATURED_ARTICLE.category}</span>
                <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(FEATURED_ARTICLE.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl mb-6 group-hover:text-[var(--mauve)] transition-colors duration-300" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, lineHeight: 1.2, color: 'var(--night)' }}>
                {FEATURED_ARTICLE.title}
              </h2>
              <p className="text-[0.95rem] leading-relaxed mb-8 flex-grow" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)', fontWeight: 300 }}>
                {FEATURED_ARTICLE.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase group-hover:text-[var(--mauve)] transition-colors duration-300 w-fit" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}>
                Lire l'article complet
                <span className="inline-block w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-500" />
              </span>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Articles List */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <h3 className="text-2xl mb-2 animate-fade-up" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, color: 'var(--night)' }}>
              Publications récentes
            </h3>
            <div className="w-12 h-px bg-[var(--jaune-or)] mb-6 animate-fade-up" />
            
            {ARTICLES.map((article, i) => (
              <a 
                key={i} 
                href={article.href}
                className="animate-fade-up group flex flex-col sm:flex-row gap-6 pb-8 border-b border-black/5 hover:bg-[var(--gold-pale)]/10 transition-colors duration-300 p-4 -mx-4 rounded-sm"
              >
                <div className="sm:w-1/3 relative aspect-[4/3] overflow-hidden rounded-sm">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[var(--night)] text-white text-[9px] tracking-[0.1em] uppercase px-2.5 py-1" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="sm:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-3 text-[10px] uppercase tracking-[0.1em] text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                    <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5"><FiClock /> {article.readTime}</span>
                  </div>
                  <h4 className="text-xl mb-3 group-hover:text-[var(--mauve)] transition-colors duration-300" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, lineHeight: 1.3, color: 'var(--night)' }}>
                    {article.title}
                  </h4>
                  <p className="text-[0.9rem] leading-relaxed mb-4 flex-grow" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)', fontWeight: 300 }}>
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[var(--jaune-or)]" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
                    Lire la suite <FiArrowRight />
                  </span>
                </div>
              </a>
            ))}
            
            <div className="flex justify-center mt-8 animate-fade-up">
              <button className="px-8 py-3 border border-[var(--night)]/20 text-[11px] tracking-[0.15em] uppercase hover:border-[var(--jaune-or)] hover:text-[var(--jaune-or)] transition-colors duration-300" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
                Charger plus d'articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Categories Widget */}
            <div className="bg-[var(--cream)] p-8 border border-black/5 animate-fade-up">
              <h3 className="text-lg mb-6" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, color: 'var(--night)' }}>
                Catégories
              </h3>
              <ul className="flex flex-col gap-3">
                {['Marchés', 'Entreprise', 'Bourse', 'Conseil', 'ESG'].map((cat, i) => (
                  <li key={i}>
                    <a href="#" className="flex justify-between items-center py-2 border-b border-black/5 text-[0.9rem] hover:text-[var(--jaune-or)] transition-colors" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300 }}>
                      <span>{cat}</span>
                      <FiArrowRight className="text-[var(--night-60)]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advertisement Space */}
            <div className="animate-fade-up relative flex flex-col items-center justify-center text-center p-8 min-h-[400px] border border-black/5 bg-[var(--night)] overflow-hidden group cursor-pointer">
              {/* Ad content placeholder */}
              <div className="absolute inset-0 bg-[url('/bg-mc.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/80 to-transparent" />
              
              <div className="relative z-10">
                <span className="inline-block border border-[var(--jaune-or)]/50 text-[var(--jaune-or)] text-[9px] tracking-[0.2em] uppercase px-3 py-1 mb-6">
                  Publicité
                </span>
                <h4 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, lineHeight: 1.2 }}>
                  Ouvrez votre compte-titres 100% en ligne
                </h4>
                <p className="text-white/70 text-sm mb-8" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300 }}>
                  Accédez aux meilleures opportunités de la BRVM en quelques clics avec notre plateforme sécurisée.
                </p>
                <a href="https://everest-account-opening.vercel.app/new-home" className="inline-block bg-[var(--jaune-or)] text-[var(--night)] px-6 py-3 text-[11px] tracking-[0.15em] uppercase font-bold hover:bg-white transition-colors duration-300">
                  Découvrir
                </a>
              </div>
            </div>
            
            {/* Newsletter Widget */}
            <div className="bg-[var(--cream)] p-8 border border-black/5 animate-fade-up">
              <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, color: 'var(--night)' }}>
                Newsletter
              </h3>
              <p className="text-[0.85rem] text-[var(--night-60)] mb-6" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300 }}>
                Recevez nos dernières analyses et publications directement dans votre boîte mail.
              </p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="bg-white border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--jaune-or)]"
                />
                <button type="submit" className="bg-[var(--night)] text-white px-4 py-3 text-[11px] tracking-[0.15em] uppercase font-bold hover:bg-[var(--jaune-or)] transition-colors duration-300">
                  S'abonner
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
