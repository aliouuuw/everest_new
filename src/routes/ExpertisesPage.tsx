import { Link } from '@tanstack/react-router';
import {
  FiArrowRight,
  FiBarChart2,
  FiBriefcase,
  FiGlobe,
  FiLayers,
} from 'react-icons/fi';
import { useReveal } from '../components/Hooks/useReveal';

type Expertise = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  titleAccent: string;
  icon: React.ElementType;
  intro: string;
  approach: { label: string; text: string };
  bullets: string[];
};

const EXPERTISES: Array<Expertise> = [
  {
    id: 'marche-titres-publics',
    index: 'I',
    kicker: 'Expertise I',
    title: 'Marché des',
    titleAccent: 'Titres Publics.',
    icon: FiBarChart2,
    intro:
      "Nous accompagnons les investisseurs dans leur accès aux émissions souveraines de l'UEMOA, en intégrant une analyse fine des dynamiques de taux et des conditions de marché.",
    approach: {
      label: 'Notre approche',
      text: 'Sélection rigoureuse des maturités, gestion active du risque de taux et optimisation du rendement dans un cadre maîtrisé.',
    },
    bullets: [
      'Sélection rigoureuse des maturités',
      'Gestion active du risque de taux',
      'Optimisation du rendement dans un cadre maîtrisé',
    ],
  },
  {
    id: 'marche-financier-regional',
    index: 'II',
    kicker: 'Expertise II',
    title: 'Marché Financier',
    titleAccent: 'Régional.',
    icon: FiGlobe,
    intro:
      "Nous intervenons sur la BRVM en assurant une exécution efficiente et un conseil éclairé pour les investisseurs institutionnels et privés qualifiés.",
    approach: {
      label: 'Notre apport',
      text: "Une capacité d'intermédiation fiable, une analyse indépendante et un accès structuré aux opportunités de marché.",
    },
    bullets: [
      "Capacité d'intermédiation fiable",
      'Analyse indépendante',
      'Accès structuré aux opportunités de marché',
    ],
  },
  {
    id: 'ingenierie-financiere',
    index: 'III',
    kicker: 'Expertise III',
    title: 'Structuration &',
    titleAccent: 'Ingénierie financière.',
    icon: FiLayers,
    intro:
      "Nous concevons et mettons en œuvre des solutions de financement adaptées aux besoins des émetteurs publics et privés de la zone UEMOA.",
    approach: {
      label: "Champs d'intervention",
      text: "Émissions obligataires, structuration de dettes, titrisation et optimisation des conditions de financement.",
    },
    bullets: [
      'Émissions obligataires',
      'Structuration de dettes',
      'Titrisation',
      'Optimisation des conditions de financement',
    ],
  },
  {
    id: 'private-office',
    index: 'IV',
    kicker: 'Expertise IV',
    title: 'Private',
    titleAccent: 'Office.',
    icon: FiBriefcase,
    intro:
      "Nous accompagnons une clientèle exigeante dans la structuration et la gestion de leur patrimoine, avec une approche disciplinée et long terme.",
    approach: {
      label: 'Notre philosophie',
      text: 'Allocation disciplinée, diversification maîtrisée, gestion du risque intégrée et vision de long terme.',
    },
    bullets: [
      'Allocation disciplinée',
      'Diversification maîtrisée',
      'Gestion du risque intégrée',
      'Vision de long terme',
    ],
  },
];

export const ExpertisesPage = () => {
  const heroRef = useReveal<HTMLElement>();

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
      {/* ─── Hero — Mauve Banner (matches Bourse / Outils / Contact) ─── */}
      <section
        ref={heroRef}
        className="relative pt-[150px] pb-12 md:pb-16 border-b border-black/10 bg-[var(--mauve)]"
      >
        <div className="relative z-10 page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--pure-white)]" style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}>
                Nos expertises.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base md:text-lg leading-relaxed text-white/70 font-light border-l-2 border-[var(--jaune-or)] pl-6">
                À l&apos;interface des besoins de financement et des stratégies
                d&apos;investissement — souveraine, BRVM, ingénierie et patrimoine dans la zone
                UEMOA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sommaire (sticky TOC band) ─── */}
      <nav
        aria-label="Sommaire des expertises"
        className="sticky top-[64px] z-20 border-b border-black/10 bg-[var(--pure-white)]/95 backdrop-blur"
      >
        <div className="page-container">
          <ul className="flex flex-wrap gap-2 py-3 md:gap-3 md:py-4">
            {EXPERTISES.map((e) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--command-border)] px-4 py-2 transition-colors duration-200 hover:border-[var(--mauve)] hover:bg-[var(--mauve-05)]"
                >
                  <span className="font-primary text-[10px] font-bold tracking-[0.22em] text-[var(--jaune-or)]">
                    {e.index}
                  </span>
                  <span className="font-primary text-xs font-semibold text-[var(--mauve)] md:text-sm">
                    {e.title} {e.titleAccent.replace(/\.$/, '')}
                  </span>
                  <FiArrowRight
                    className="text-xs text-[var(--mauve-60)] transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ─── Sections ─── */}
      {EXPERTISES.map((e, idx) => (
        <ExpertiseSection key={e.id} expertise={e} reversed={idx % 2 === 1} />
      ))}

      {/* ─── CTA — Dark Section (matches SimulateurPage) ─── */}
      <section className="section-bg-light py-24 md:py-32">
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <h2
                className="font-primary font-bold leading-[0.95] tracking-tight mb-6 text-white"
                style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}
              >
                Besoin d'un accompagnement personnalisé ?
              </h2>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl">
                Nos équipes vous aident à structurer une stratégie adaptée à votre profil et vos objectifs d'investissement.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row gap-6 md:justify-end">
              <Link
                to="/contact"
                className="btn-primary-dark inline-flex items-center justify-center gap-4 px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold w-fit"
              >
                Prendre rendez-vous <FiArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ───────── ExpertiseSection ───────── */

const ExpertiseSection: React.FC<{ expertise: Expertise; reversed: boolean }> = ({
  expertise,
  reversed,
}) => {
  const sectionRef = useReveal<HTMLElement>();
  const Icon = expertise.icon;

  return (
    <section
      id={expertise.id}
      ref={sectionRef}
      className="reveal scroll-mt-40 bg-[var(--pure-white)] py-16 md:py-20 odd:bg-[var(--summit-ivory)]"
    >
      <div className="page-container">
        <div
          className={`grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 ${
            reversed ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Left/identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--mauve-05)] text-[var(--mauve)]">
                <Icon className="text-base" aria-hidden />
              </span>
              <span className="font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--jaune-or)]">
                {expertise.kicker}
              </span>
            </div>
            <h2 className="mt-6 font-primary text-3xl font-bold leading-[1.05] tracking-tight text-[var(--mauve)] md:text-4xl lg:text-5xl">
              {expertise.title}{' '}
              <span style={{ color: 'var(--jaune-or)' }}>{expertise.titleAccent}</span>
            </h2>
          </div>

          {/* Right/content */}
          <div className="lg:col-span-7">
            <p className="text-base font-light leading-relaxed text-[var(--night-80)] md:text-lg">
              {expertise.intro}
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--command-border)] bg-[var(--pure-white)] p-6 md:p-7">
              <p className="mb-4 font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)]">
                {expertise.approach.label}
              </p>
              <ul className="space-y-3">
                {expertise.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 font-primary text-sm leading-relaxed text-[var(--night-80)] md:text-base"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--jaune-or)]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
