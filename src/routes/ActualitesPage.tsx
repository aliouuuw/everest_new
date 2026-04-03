import { useEffect, useRef } from 'react';
import { FiArrowRight, FiCalendar, FiClock, FiExternalLink } from 'react-icons/fi';
import { gsap } from 'gsap';

type Article = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  href: string;
};

const FEATURED: Article = {
  title: "Everest Finance réalise avec succès une émission obligataire de 50 milliards FCFA",
  excerpt: "Retour sur la structuration et le placement de cette opération phare pour le compte d'un émetteur souverain de la zone UEMOA — un jalon majeur pour notre équipe d'ingénierie financière.",
  category: "Communiqué",
  date: "2024-03-15",
  readTime: "5 min",
  imageUrl: "/bg-mc.jpg",
  href: "/actualites/emission-obligataire-50mds"
};

const ARTICLES: Article[] = [
  {
    title: "Nomination d'Everest Finance parmi les SGI les plus actives de la BRVM",
    excerpt: "Le classement annuel du CREPMF confirme la position d'Everest Finance dans le top 5 des sociétés de gestion et d'intermédiation en volume de transactions.",
    category: "Presse",
    date: "2024-03-10",
    readTime: "3 min",
    imageUrl: "/background-sol.jpg",
    href: "/actualites/classement-crepmf"
  },
  {
    title: "Lancement du nouveau portail client sécurisé",
    excerpt: "Accès en temps réel à vos portefeuilles, relevés d'opérations et rapports de performance — une refonte complète de l'expérience digitale pour nos clients.",
    category: "Mise à jour",
    date: "2024-02-28",
    readTime: "4 min",
    imageUrl: "/bg-mc.jpg",
    href: "/actualites/portail-client"
  },
  {
    title: "Everest Finance cité dans le rapport annuel de la BRVM",
    excerpt: "Mention dans le rapport 2023 de la Bourse Régionale pour notre contribution active au dynamisme du marché secondaire et des opérations de courtage.",
    category: "Médias",
    date: "2024-02-15",
    readTime: "6 min",
    imageUrl: "/background-sol.jpg",
    href: "/actualites/rapport-brvm-2023"
  },
  {
    title: "Webinaire : comprendre les obligations vertes sur le marché UEMOA",
    excerpt: "Notre équipe recherche animera une session dédiée aux enjeux ESG et aux nouvelles opportunités d'investissement durable dans la sous-région.",
    category: "Événement",
    date: "2024-01-30",
    readTime: "2 min",
    imageUrl: "/bg-mc.jpg",
    href: "/actualites/webinaire-obligations-vertes"
  }
];

const CATEGORIES = ['Tout', 'Communiqué', 'Presse', 'Mise à jour', 'Médias', 'Événement'];

export const ActualitesPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.actu-reveal', { y: 40, opacity: 0 });
      gsap.to('.actu-reveal', {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out', delay: 0.15
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="font-primary">
      {/* ─── Hero — Editorial & Asymmetrical ─── */}
      <section className="relative bg-[var(--pure-white)] pt-32 pb-20 border-b border-black/10">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523287562758-66a65b7f7ef7?auto=format&fit=crop&w=1600&q=80"
            alt="Actualités financières"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--pure-white)] via-[var(--pure-white)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--pure-white)] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--mauve)]">
                  Centre de presse
                </span>
              </div>
              <h1 className="font-primary font-bold text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight">
                Actualités & <em className="font-normal italic text-[var(--mauve)]">Communiqués.</em>
              </h1>
            </div>
            <div className="lg:col-span-4 pb-4">
              <p className="text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.8)] font-light border-l-2 border-[var(--mauve)] pl-6">
                Restez informé de nos derniers communiqués de presse, mises à jour et mentions dans les médias.
              </p>
            </div>
          </div>

          {/* Category filters */}
          <div className="actu-reveal flex flex-wrap gap-2 mt-12">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 text-[11px] tracking-[0.1em] uppercase transition-all duration-300 border font-primary rounded-full ${
                  i === 0 
                    ? 'font-medium text-[var(--pure-white)] bg-[var(--mauve)] border-[var(--mauve)]' 
                    : 'font-light text-[rgba(10,10,10,0.6)] bg-transparent border-black/10 hover:border-[var(--mauve)] hover:text-[var(--mauve)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Article ─── */}
      <section className="bg-[var(--pure-white)] py-24 md:py-40 border-b border-black/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <a href={FEATURED.href} className="actu-reveal group grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black/10 hover:border-[var(--mauve)]/50 transition-all duration-500 rounded-2xl overflow-hidden hover:shadow-[0_8px_24px_rgba(70,29,76,0.1)]">
            <div className="lg:col-span-7 relative overflow-hidden">
              <div className="aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
                <img
                  src={FEATURED.imageUrl}
                  alt={FEATURED.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
              </div>
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-block bg-[var(--mauve)] px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-bold text-white rounded-full">
                  À la une
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-[var(--white-smoke)]/30">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--mauve)]">
                  {FEATURED.category}
                </span>
                <span className="w-1 h-1 bg-[rgba(10,10,10,0.3)] rounded-full" />
                <span className="flex items-center gap-1.5 text-[10px] tracking-[0.05em] text-[rgba(10,10,10,0.5)]">
                  <FiCalendar className="text-xs" /> {new Date(FEATURED.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h2 className="mb-6 group-hover:text-[var(--mauve)] transition-colors duration-300 font-primary font-bold text-3xl md:text-4xl leading-[1.2] text-[var(--night)]">
                {FEATURED.title}
              </h2>
              <p className="mb-8 font-light text-base leading-[1.7] text-[rgba(10,10,10,0.7)]">
                {FEATURED.excerpt}
              </p>
              <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase group-hover:gap-4 group-hover:text-[var(--mauve)] transition-all duration-300 font-bold text-[var(--night)]">
                Lire le communiqué
                <span className="inline-block w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-500" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* ─── Main Content: Articles + Sidebar ─── */}
      <section className="bg-[var(--pure-white)] py-24 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Articles Feed */}
            <div className="lg:col-span-8">
              <div className="actu-reveal flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <h3 className="font-primary font-bold text-2xl text-[var(--night)]">
                    Publications récentes
                  </h3>
                </div>
              </div>

              <div className="border-t border-black/10">
                {ARTICLES.map((article, i) => (
                  <a
                    key={i}
                    href={article.href}
                    className="actu-reveal group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 py-10 border-b border-black/10 hover:bg-[var(--white-smoke)]/30 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--white-smoke)] rounded-2xl">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] tracking-[0.12em] uppercase font-bold text-[var(--mauve)]">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-[rgba(10,10,10,0.5)]">
                          <FiCalendar className="text-[9px]" />
                          {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-[rgba(10,10,10,0.5)]">
                          <FiClock className="text-[9px]" /> {article.readTime}
                        </span>
                      </div>
                      <h4 className="mb-3 group-hover:text-[var(--mauve)] transition-colors duration-300 font-primary font-bold text-xl leading-[1.35] text-[var(--night)]">
                        {article.title}
                      </h4>
                      <p className="mb-4 line-clamp-2 font-light text-sm leading-[1.65] text-[rgba(10,10,10,0.7)]">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-[var(--mauve)] group-hover:gap-3 transition-all duration-300 font-bold">
                        Lire <FiArrowRight />
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Load more */}
              <div className="actu-reveal flex justify-center mt-12">
                <button className="group px-8 py-4 border border-black/10 rounded-full text-[11px] tracking-[0.15em] uppercase hover:border-[var(--mauve)] hover:text-[var(--mauve)] transition-all duration-300 font-bold text-[var(--night)]">
                  Voir plus d'articles
                </button>
              </div>
            </div>

            {/* ─── Sidebar ─── */}
            <aside className="lg:col-span-4 flex flex-col gap-10">

              {/* Ad Banner — Premium CTA */}
              <div className="actu-reveal relative overflow-hidden min-h-[400px] flex flex-col justify-end p-8 section-bg-mauve rounded-2xl">
                <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-full object-cover opacity-20" />
                </div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 mb-5 text-[9px] tracking-[0.2em] uppercase font-bold text-[var(--jaune-or)] bg-[var(--jaune-or)]/10 rounded-full">
                    Publicité
                  </span>
                  <h4 className="text-xl mb-3 font-primary font-bold leading-[1.25] text-[var(--pure-white)]">
                    Ouvrez votre compte-titres 100% en ligne
                  </h4>
                  <p className="text-sm mb-6 font-light leading-[1.6] text-white/70">
                    Accédez aux meilleures opportunités de la BRVM avec notre plateforme sécurisée.
                  </p>
                  <a
                    href="https://everest-account-opening.vercel.app/new-home"
                    className="inline-flex items-center gap-2 bg-[var(--jaune-or)] text-[var(--night)] px-6 py-3 rounded-full text-[11px] tracking-[0.12em] uppercase font-bold hover:bg-white transition-colors duration-300"
                  >
                    Commencer <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* Categories */}
              <div className="actu-reveal border border-black/10 p-8 rounded-2xl">
                <h3 className="font-primary font-bold text-lg mb-6 text-[var(--night)]">
                  Rubriques
                </h3>
                <ul className="flex flex-col">
                  {['Communiqués de presse', 'Mentions médias', 'Mises à jour', 'Événements'].map((cat, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="flex justify-between items-center py-3 text-sm hover:text-[var(--mauve)] transition-colors duration-200 border-b border-black/5 last:border-0 font-normal text-[var(--night)] group"
                      >
                        <span>{cat}</span>
                        <FiArrowRight className="text-xs opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="actu-reveal border border-black/10 p-8 rounded-2xl">
                <h3 className="font-primary font-bold text-lg mb-2 text-[var(--night)]">
                  Newsletter
                </h3>
                <p className="text-sm mb-5 font-light leading-[1.6] text-[rgba(10,10,10,0.6)]">
                  Recevez nos communiqués et analyses directement dans votre boîte mail.
                </p>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-white border border-black/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[var(--mauve)] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[var(--mauve)] rounded-full text-white px-5 py-3 text-[11px] tracking-[0.12em] uppercase hover:bg-[var(--night)] hover:text-white transition-colors duration-300 font-bold"
                  >
                    S'abonner
                  </button>
                </form>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
