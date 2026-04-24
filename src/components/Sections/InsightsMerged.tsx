import { Link } from '@tanstack/react-router';
import { FiArrowRight, FiCalendar, FiFileText } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { SectionHeader } from '../ui';

/* ─── Data: Actualités ─── */

type NewsArticle = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  slug: string;
};

const NEWS_ARTICLES: NewsArticle[] = [
  {
    title: "BRVM : Sucrivoire s'illustre, Société Générale CI donne le ton au marché",
    excerpt:
      "La BRVM orchestre un rebond, clôturant la séance en territoire positif. L'indice BRVM Composite gagne 0,13 % à 406,95 points, porté par Sucrivoire (+7,32 %) et Société Générale CI (+2,66 %).",
    category: 'Marchés',
    date: '2026-04-09',
    imageUrl: '/articles/brvm-marche.jpg',
    slug: 'brvm-sucrivoire-societe-generale-ci',
  },
  {
    title: "À Abidjan, le paradoxe d'un continent riche en capital mais pauvre en financement",
    excerpt:
      "Réunis à l'initiative de la BAD, les acteurs de la finance africaine constatent un déficit de 400 milliards USD/an malgré 4 000 milliards d'épargne disponible.",
    category: 'Finance',
    date: '2026-04-10',
    imageUrl: '/articles/abidjan-finance.jpg',
    slug: 'abidjan-paradoxe-financement-afrique',
  },
  {
    title: 'La RDC lève 1,25 milliard USD pour son tout premier eurobond',
    excerpt:
      "La République démocratique du Congo fait son entrée sur le marché international de la dette avec une émission largement sursouscrite, structurée en deux tranches.",
    category: 'Obligations',
    date: '2026-04-10',
    imageUrl: '/articles/rdc-eurobond.jpg',
    slug: 'rdc-premier-eurobond',
  },
];

/* ─── Data: Publications ─── */

type Frequency = 'hebdomadaire' | 'mensuelle' | 'semestrielle';

type Publication = {
  id: string;
  title: string;
  desc: string;
  frequency: Frequency;
  date: string;
  fileUrl: string;
  fileSize: string;
  pages?: number;
};

const FREQUENCY_LABELS: Record<Frequency, string> = {
  hebdomadaire: 'Hebdomadaire',
  mensuelle: 'Mensuelle',
  semestrielle: 'Semestrielle',
};

const PUBLICATIONS: Array<Publication> = [
  {
    id: 'revue-souveraine-mai-2024',
    title: 'Revue de la dette souveraine UEMOA — Mai 2024',
    desc: "Analyse des conditions de marché, des spreads et des perspectives de financement pour les émetteurs souverains de l'union.",
    frequency: 'semestrielle',
    date: '2024-05-15',
    fileUrl: '/publications/Revue-semestrielle-20.09.26-1.pdf',
    fileSize: '10.5 MB',
    pages: 28,
  },
  {
    id: 'brvm-monthly-avril-2024',
    title: 'BRVM Monthly Highlights — Avril 2024',
    desc: "Synthèse mensuelle des performances du marché boursier régional.",
    frequency: 'mensuelle',
    date: '2024-04-30',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '6.1 MB',
    pages: 14,
  },
  {
    id: 'focus-secteur-bancaire-avril-2024',
    title: 'Focus Secteur — Bancaire UEMOA — Avril 2024',
    desc: "Lecture structurée des dynamiques du secteur bancaire régional.",
    frequency: 'mensuelle',
    date: '2024-04-12',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '4.8 MB',
    pages: 10,
  },
  {
    id: 'allocation-obligataire-uemoa-avril-2024',
    title: 'Allocation obligataire UEMOA — Avril 2024',
    desc: "Lecture tactique des maturités, niveaux de rendement et arbitrages possibles sur les émissions récentes.",
    frequency: 'hebdomadaire',
    date: '2024-04-05',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '5.2 MB',
    pages: 12,
  },
  {
    id: 'tendances-liquidite-brvm-mai-2024',
    title: 'Tendances de liquidité — BRVM, Mai 2024',
    desc: "Analyse des volumes, spreads bid-ask et profondeur de carnet sur les compartiments les plus actifs.",
    frequency: 'mensuelle',
    date: '2024-05-20',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '3.4 MB',
    pages: 8,
  },
];

/* ─── Main Component ─── */

export const InsightsMerged: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  const featured = PUBLICATIONS[0];
  const secondary = PUBLICATIONS.slice(1, 4);

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden"
      style={{ background: 'var(--gradient-ivory-section)' }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
        style={{
          background:
            'radial-gradient(ellipse 55% 34% at 18% 16%, var(--mauve-05) 0%, transparent 60%), radial-gradient(ellipse 35% 26% at 84% 64%, var(--jaune-or-05) 0%, transparent 52%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-24 md:px-16 md:pt-32 md:pb-20 lg:px-24">
        <div className="mb-10 md:mb-12">
          <SectionHeader
            heading="Insights"
            subtext="Veille de marché, actualités BRVM et notes de recherche pour éclairer vos décisions d'investissement sur les marchés UEMOA."
            align="left"
            dark={false}
          />
        </div>

        {/* ─── Actualités grid ─── */}
        <div className="mb-14 md:mb-18">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)]">
              Actualités
            </p>
            <Link
              to="/actualites"
              className="group inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mauve)] transition-all duration-300 hover:gap-3"
            >
              Toutes les actualités
              <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div
            ref={gridRef}
            className="reveal-stagger -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
          >
            {NEWS_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                to="/actualites/$slug"
                params={{ slug: article.slug }}
                className="group flex min-h-0 w-[min(100%,85vw)] max-w-sm shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[var(--command-border)] bg-[var(--command-surface)] transition-all duration-500 hover:border-[var(--mauve-20)] hover:shadow-md md:w-auto md:max-w-none"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
                  <div className="absolute inset-0 z-10 bg-black/5 transition-colors duration-500 group-hover:bg-transparent" />
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full transform object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute left-5 top-5 z-20">
                    <span className="inline-block rounded-full border border-[var(--mauve-15)] bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--mauve)] backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-grow flex-col p-6 lg:p-7">
                  <div className="mb-4 flex items-center gap-2">
                    <FiCalendar size={12} className="text-[var(--night-20)]" />
                    <span
                      className="text-[11px]"
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 400,
                        color: 'var(--night-60)',
                      }}
                    >
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3
                    className="mb-3 transition-colors duration-300 group-hover:text-[var(--mauve)]"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      lineHeight: 1.3,
                      color: 'var(--night)',
                    }}
                  >
                    {article.title}
                  </h3>

                  <p
                    className="mb-6 flex-grow line-clamp-3"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 300,
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      color: 'var(--night-60)',
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <span
                    className="mt-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] transition-all duration-300 group-hover:gap-3 group-hover:text-[var(--mauve)]"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 600,
                      color: 'var(--night)',
                    }}
                  >
                    Lire l&apos;article
                    <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Publications ─── */}
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)]">
              Publications
            </p>
            <Link
              to="/publications"
              className="group inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mauve)] transition-all duration-300 hover:gap-3"
            >
              Toutes les publications
              <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            <a
              href={featured.fileUrl}
              download
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[var(--mauve)] p-7 md:p-9 lg:col-span-7 lg:min-h-[360px]"
            >
              <div className="relative z-10">
                <span
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--jaune-or)]" aria-hidden />
                  À la une
                </span>

                <h3 className="mb-3 max-w-xl font-primary text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
                  {featured.title}
                </h3>

                <p className="max-w-xl font-primary text-sm font-light leading-relaxed text-white/70 md:text-[15px]">
                  {featured.desc}
                </p>
              </div>

              <div className="relative mt-8 flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-primary text-xs font-light tracking-wide text-white/50">
                  <span>
                    {new Date(featured.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{FREQUENCY_LABELS[featured.frequency]}</span>
                  {featured.pages && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{featured.pages} pages</span>
                    </>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.14em] text-[var(--jaune-or)] transition-all duration-300 group-hover:gap-3">
                  Lire la publication
                  <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>

            {/* SECONDARY — three clean file rows */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              {secondary.map((it) => (
                <a
                  key={it.id}
                  href={it.fileUrl}
                  download
                  className="group flex items-start gap-4 rounded-2xl border border-[var(--command-border)] bg-[var(--pure-white)] p-5 transition-all duration-300 hover:border-[var(--mauve-20)] hover:shadow-[var(--shadow-card-lift)] md:p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--mauve-05)] text-[var(--mauve)] transition-colors duration-300 group-hover:bg-[var(--mauve)] group-hover:text-[var(--pure-white)]">
                    <FiFileText className="text-base" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 font-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mauve-60)]">
                      Note de recherche · {FREQUENCY_LABELS[it.frequency]}
                    </p>
                    <h4 className="mb-2 font-primary text-sm font-semibold leading-snug tracking-tight text-[var(--mauve)] md:text-base">
                      {it.title}
                    </h4>
                    <div className="flex items-center gap-3 font-primary text-[11px] font-light text-[var(--night-40)]">
                      <span>
                        {new Date(it.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{it.fileSize}</span>
                      {it.pages && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{it.pages} p.</span>
                        </>
                      )}
                    </div>
                  </div>
                  <FiArrowRight
                    className="mt-2 shrink-0 text-sm text-[var(--mauve-40)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--mauve)]"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
