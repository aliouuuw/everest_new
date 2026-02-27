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
    <div ref={pageRef}>
      {/* ─── Dark Hero Band ─── */}
      <section className="relative bg-[var(--night)] pt-36 pb-20 overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-20"
            style={{ background: 'radial-gradient(circle, var(--jaune-or) 0%, transparent 70%)' }} />
          <div className="absolute top-[50%] -left-[10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, var(--mauve) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
          <div className="actu-reveal flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-[var(--jaune-or)]" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
            >
              Centre de presse
            </span>
          </div>
          <h1
            className="actu-reveal max-w-4xl"
            style={{
              fontFamily: 'var(--font-display-aptos)',
              fontWeight: 500,
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: 'var(--pure-white)',
            }}
          >
            Actualités &{' '}
            <em style={{ fontWeight: 400, fontStyle: 'italic', color: 'var(--jaune-or)' }}>
              Communiqués.
            </em>
          </h1>
          <p
            className="actu-reveal mt-6 max-w-2xl"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 300,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Restez informé de nos derniers communiqués de presse, mises à jour et mentions dans les médias.
          </p>

          {/* Category filters */}
          <div className="actu-reveal flex flex-wrap gap-2 mt-10">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className="px-4 py-2 text-[11px] tracking-[0.1em] uppercase transition-all duration-300 border"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: i === 0 ? 500 : 300,
                  color: i === 0 ? 'var(--night)' : 'rgba(255,255,255,0.5)',
                  backgroundColor: i === 0 ? 'var(--jaune-or)' : 'transparent',
                  borderColor: i === 0 ? 'var(--jaune-or)' : 'rgba(255,255,255,0.1)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Article ─── */}
      <section className="bg-[var(--pure-white)] py-16 md:py-20 border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
          <a href={FEATURED.href} className="actu-reveal group flex flex-col lg:flex-row bg-[var(--cream)] overflow-hidden border border-black/[0.04] hover:border-[var(--jaune-or)]/25 transition-all duration-500">
            <div className="lg:w-[58%] relative overflow-hidden">
              <div className="aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
                <img
                  src={FEATURED.imageUrl}
                  alt={FEATURED.title}
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
              </div>
              <div className="absolute top-6 left-6 z-10">
                <span
                  className="inline-block bg-[var(--jaune-or)] px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, color: 'var(--night)' }}
                >
                  À la une
                </span>
              </div>
            </div>
            <div className="lg:w-[42%] p-8 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-5">
                <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}>
                  {FEATURED.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--night-20)]" />
                <span className="flex items-center gap-1.5 text-[10px] tracking-[0.05em]" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
                  <FiCalendar className="text-xs" /> {new Date(FEATURED.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h2
                className="mb-5 group-hover:text-[var(--mauve)] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', lineHeight: 1.2, color: 'var(--night)' }}
              >
                {FEATURED.title}
              </h2>
              <p className="mb-8" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--night-60)' }}>
                {FEATURED.excerpt}
              </p>
              <span
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase group-hover:text-[var(--mauve)] transition-colors duration-300 w-fit"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--night)' }}
              >
                Lire le communiqué
                <span className="inline-block w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-500" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* ─── Main Content: Articles + Sidebar ─── */}
      <section className="bg-[var(--pure-white)] py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

            {/* Articles Feed */}
            <div className="lg:col-span-8">
              <div className="actu-reveal flex items-center justify-between mb-10">
                <h3 style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.5rem', color: 'var(--night)' }}>
                  Publications récentes
                </h3>
                <div className="hidden md:block w-32 h-px bg-[var(--timberwolf)]" />
              </div>

              <div className="flex flex-col gap-0">
                {ARTICLES.map((article, i) => (
                  <a
                    key={i}
                    href={article.href}
                    className="actu-reveal group grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-6 py-8 border-b border-[var(--timberwolf)] hover:bg-[var(--cream)]/40 transition-colors duration-300 px-4 -mx-4"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="inline-block px-2.5 py-1 text-[9px] tracking-[0.12em] uppercase border"
                          style={{
                            fontFamily: 'var(--font-primary)', fontWeight: 600,
                            color: 'var(--mauve)', borderColor: 'var(--mauve-20)', backgroundColor: 'var(--mauve-05)'
                          }}
                        >
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-[10px]" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
                          <FiCalendar className="text-[9px]" />
                          {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1 text-[10px]" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
                          <FiClock className="text-[9px]" /> {article.readTime}
                        </span>
                      </div>
                      <h4
                        className="mb-2 group-hover:text-[var(--mauve)] transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, fontSize: '1.15rem', lineHeight: 1.35, color: 'var(--night)' }}
                      >
                        {article.title}
                      </h4>
                      <p
                        className="mb-4 line-clamp-2"
                        style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--night-60)' }}
                      >
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-[var(--jaune-or)] group-hover:gap-3 transition-all duration-300" style={{ fontFamily: 'var(--font-primary)', fontWeight: 600 }}>
                        Lire <FiArrowRight />
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Load more */}
              <div className="actu-reveal flex justify-center mt-12">
                <button
                  className="group px-8 py-3.5 border border-[var(--night-20)] text-[11px] tracking-[0.15em] uppercase hover:border-[var(--jaune-or)] hover:text-[var(--jaune-or)] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}
                >
                  Voir plus d'articles
                </button>
              </div>
            </div>

            {/* ─── Sidebar ─── */}
            <aside className="lg:col-span-4 flex flex-col gap-10">

              {/* Ad Banner — Premium CTA */}
              <div className="actu-reveal relative overflow-hidden min-h-[420px] flex flex-col justify-end p-8 bg-[var(--night)]">
                <div className="absolute inset-0">
                  <img src="/bg-mc.jpg" alt="" className="w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/85 to-[var(--night)]/40" />
                </div>
                <div className="relative z-10">
                  <span
                    className="inline-block border border-[var(--jaune-or)]/40 px-3 py-1 mb-5 text-[9px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
                  >
                    Publicité
                  </span>
                  <h4
                    className="text-xl mb-3"
                    style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, lineHeight: 1.25, color: 'var(--pure-white)' }}
                  >
                    Ouvrez votre compte-titres 100% en ligne
                  </h4>
                  <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, lineHeight: 1.6, color: 'rgba(255,255,255,0.55)' }}>
                    Accédez aux meilleures opportunités de la BRVM avec notre plateforme sécurisée.
                  </p>
                  <a
                    href="https://everest-account-opening.vercel.app/new-home"
                    className="inline-flex items-center gap-2 bg-[var(--jaune-or)] text-[var(--night)] px-5 py-3 text-[11px] tracking-[0.12em] uppercase font-bold hover:bg-white transition-colors duration-300"
                  >
                    Commencer <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* Categories */}
              <div className="actu-reveal bg-[var(--cream)] p-7 border border-black/[0.04]">
                <h3 className="text-base mb-5" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, color: 'var(--night)' }}>
                  Rubriques
                </h3>
                <ul className="flex flex-col">
                  {['Communiqués de presse', 'Mentions médias', 'Mises à jour', 'Événements'].map((cat, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="flex justify-between items-center py-3 text-[0.85rem] hover:text-[var(--jaune-or)] transition-colors duration-200 border-b border-[var(--timberwolf)]"
                        style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-80)' }}
                      >
                        <span>{cat}</span>
                        <FiArrowRight className="text-xs opacity-40" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="actu-reveal bg-[var(--cream)] p-7 border border-black/[0.04]">
                <h3 className="text-base mb-2" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, color: 'var(--night)' }}>
                  Newsletter
                </h3>
                <p className="text-[0.8rem] mb-5" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, lineHeight: 1.6, color: 'var(--night-60)' }}>
                  Recevez nos communiqués et analyses directement dans votre boîte mail.
                </p>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-white border border-[var(--timberwolf)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--jaune-or)] transition-colors"
                    style={{ fontFamily: 'var(--font-primary)' }}
                  />
                  <button
                    type="submit"
                    className="bg-[var(--night)] text-white px-4 py-3 text-[11px] tracking-[0.12em] uppercase hover:bg-[var(--jaune-or)] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 600 }}
                  >
                    S'abonner
                  </button>
                </form>
              </div>

              {/* Secondary Ad Slot */}
              <div className="actu-reveal border border-[var(--timberwolf)] p-6 flex flex-col items-center text-center">
                <span className="text-[9px] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                  Espace partenaire
                </span>
                <div className="w-full aspect-[3/2] bg-[var(--cream)] border border-dashed border-[var(--timberwolf)] flex items-center justify-center">
                  <span className="text-xs" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'var(--night-60)' }}>
                    300 × 200
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
