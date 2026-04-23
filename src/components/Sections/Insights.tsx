import { FiArrowRight, FiFileText } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { SectionHeader } from '../ui';

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
];

/* Decorative chart line SVG for the featured dark card */
const ChartLine = () => (
  <svg
    aria-hidden
    viewBox="0 0 600 200"
    className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-[0.18]"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="insights-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
        <stop offset="35%" stopColor="rgba(255,255,255,0.7)" />
        <stop offset="100%" stopColor="var(--jaune-or)" />
      </linearGradient>
      <linearGradient id="insights-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(202,152,36,0.25)" />
        <stop offset="100%" stopColor="rgba(202,152,36,0)" />
      </linearGradient>
    </defs>
    <path
      d="M0,160 C60,140 100,150 160,120 C220,90 260,110 320,90 C380,70 420,60 480,50 C540,40 580,35 600,28 L600,200 L0,200 Z"
      fill="url(#insights-fill)"
    />
    <path
      d="M0,160 C60,140 100,150 160,120 C220,90 260,110 320,90 C380,70 420,60 480,50 C540,40 580,35 600,28"
      fill="none"
      stroke="url(#insights-line)"
      strokeWidth="2"
    />
  </svg>
);

export const Insights: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  const featured = PUBLICATIONS[0];
  const secondary = PUBLICATIONS.slice(1, 3);

  return (
    <section
      ref={sectionRef}
      className="reveal relative bg-[var(--pure-white)] py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="mb-10 md:mb-12">
          <SectionHeader
            heading={
              <>
                Publications <span style={{ color: 'var(--jaune-or)' }}>&amp; recherches.</span>
              </>
            }
            subtext="Synthèses hebdomadaires, mensuelles et semestrielles sur l'UEMOA et la BRVM, en PDF téléchargeable."
            align="left"
            dark={false}
            action={{
              label: 'Voir toutes les publications',
              href: '/publications',
              variant: 'primary',
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* FEATURED — dark mauve card with chart background */}
          <a
            href={featured.fileUrl}
            download
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 md:p-9 lg:col-span-7 lg:min-h-[360px]"
            style={{ background: 'var(--gradient-dark-section)' }}
          >
            <ChartLine />
            {/* Subtle gold wash top-right */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-[60%] w-[60%] opacity-70"
              style={{
                background:
                  'radial-gradient(ellipse at top right, rgba(202,152,36,0.12) 0%, transparent 65%)',
              }}
            />

            <div className="relative">
              <span
                className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 font-primary text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{
                  color: 'var(--jaune-or)',
                  border: '1px solid rgba(202,152,36,0.35)',
                  background: 'rgba(202,152,36,0.08)',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--jaune-or)]" aria-hidden />
                Publication à la une
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

          {/* SECONDARY — two clean file rows */}
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
    </section>
  );
};
