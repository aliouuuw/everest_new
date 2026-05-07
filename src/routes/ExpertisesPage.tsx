import { Link } from '@tanstack/react-router';
import { FiArrowRight } from 'react-icons/fi';
import { useReveal } from '../components/Hooks/useReveal';
import { HiArrowRight } from 'react-icons/hi2';
import { EditableImage, EditableText } from '../cms';

type Expertise = {
  id: string;
  title: string;
  titleSuffix: string;
  imageUrl: string;
  imageAlt: string;
  intro: string;
  approach: { label: string; text: string };
  bullets: string[];
};

const EXPERTISE_ID_TO_CMS: Record<string, string> = {
  'marche-titres-publics': 'expertises.mtp.image',
  'marche-financier-regional': 'expertises.mfr.image',
  'ingenierie-financiere': 'expertises.ing.image',
  'private-office': 'expertises.po.image',
};

const EXPERTISES: Array<Expertise> = [
  {
    id: 'marche-financier-regional',
    title: 'Marché Financier',
    titleSuffix: 'Régional.',
    imageUrl: '/Assets_Website/mfr.jpg',
    imageAlt: 'Salle de marché et exécution boursière',
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
    id: 'marche-titres-publics',
    title: 'Marché des',
    titleSuffix: 'Titres Publics.',
    imageUrl: '/Assets_Website/mtp.jpg',
    imageAlt: 'Obligations souveraines et courbe de taux',
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
    id: 'ingenierie-financiere',
    title: 'Structuration &',
    titleSuffix: 'Ingénierie financière.',
    imageUrl: '/Assets_Website/s-&-if.jpg',
    imageAlt: 'Structuration financière et modélisation',
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
    title: 'Private',
    titleSuffix: 'Office.',
    imageUrl: '/Assets_Website/po.jpg',
    imageAlt: 'Conseil patrimonial personnalisé',
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
        className="relative pt-[200px] pb-12 md:pb-16 border-b border-black/10 bg-[var(--everest-green)]"
      >
        <div className="relative z-10 page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--pure-white)]" style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}>
                <EditableText id="expertises.hero.title">Nos expertises.</EditableText>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base md:text-lg leading-relaxed text-white/70 font-light border-l-2 border-[var(--jaune-or)] pl-6">
                <EditableText id="expertises.hero.subtitle">
                  À l&apos;interface des besoins de financement et des stratégies
                  d&apos;investissement — souveraine, BRVM, ingénierie et patrimoine dans la zone
                  UEMOA.
                </EditableText>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ─── Sections (ValueProps-style image + content, alternating) ─── */}
      {EXPERTISES.map((e, idx) => (
        <ExpertiseSection key={e.id} expertise={e} imageLeft={idx % 2 === 0} />
      ))}

      {/* ─── CTA — Dark band (spacing matches FAQ / Outils) ─── */}
      <section className="section-bg-light py-12 md:py-20">
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="md:col-span-7">
              <h2
                className="font-primary font-bold leading-[0.95] tracking-tight mb-5 text-white"
                style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}
              >
                <EditableText id="expertises.cta.title">
                  Besoin d'un accompagnement personnalisé ?
                </EditableText>
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl">
                <EditableText id="expertises.cta.subtitle">
                  Nos équipes vous aident à structurer une stratégie adaptée à votre profil et vos objectifs d'investissement.
                </EditableText>
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row gap-6 md:justify-end">
              <Link
                to="/contact"
                className="btn-primary-dark inline-flex items-center justify-center gap-4 px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold w-fit"
              >
                <EditableText id="expertises.cta.label" as="span">Prendre rendez-vous</EditableText>
                <FiArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ───────── ExpertiseSection — mirrors ValueProps image + copy grid ───────── */

const ExpertiseSection: React.FC<{ expertise: Expertise; imageLeft: boolean }> = ({
  expertise,
  imageLeft,
}) => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id={expertise.id}
      ref={sectionRef}
      className="reveal scroll-mt-40 bg-[var(--pure-white)] py-16 md:py-20"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Image — col-span-5, order swaps with content */}
          <div
            className={`relative min-h-[320px] overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--command-surface)] lg:col-span-5 lg:min-h-[460px] ${
              imageLeft ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <EditableImage
              id={EXPERTISE_ID_TO_CMS[expertise.id] || ''}
              src={expertise.imageUrl}
              alt={expertise.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 55%, rgba(70,29,76,0.35) 100%)',
              }}
            />
          </div>

          {/* Copy — col-span-7 (no nested .reveal: only the ref host gets .in from useReveal) */}
          <div
            className={`flex flex-col justify-center lg:col-span-7 ${
              imageLeft ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <h2 className="luxury-heading mb-4 max-w-xl">
              <EditableText id={`expertises.${expertise.id}.title`}>
                {expertise.title} {expertise.titleSuffix}
              </EditableText>
            </h2>
            <p className="mb-6 max-w-xl text-sm font-light leading-relaxed text-[var(--night-60)] md:text-base">
              <EditableText id={`expertises.${expertise.id}.intro`}>
                {expertise.intro}
              </EditableText>
            </p>

            <div className="mb-6 max-w-xl pb-6">
              <p className="mb-2 font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)]">
                <EditableText id={`expertises.${expertise.id}.approachLabel`}>
                  {expertise.approach.label}
                </EditableText>
              </p>
              <p className="text-sm font-light leading-relaxed text-[var(--night-80)] md:text-base">
                <EditableText id={`expertises.${expertise.id}.approachText`}>
                  {expertise.approach.text}
                </EditableText>
              </p>
            </div>

            <ul className="max-w-xl divide-y divide-[var(--command-border)] border-b border-[var(--command-border)]">
              {expertise.bullets.map((b, idx) => (
                <li
                  key={b}
                  className="group flex items-center gap-3 py-5 md:gap-4 md:py-6 hover:pl-4 transition-all duration-300"
                >
                  <HiArrowRight className="text-[var(--mauve)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  <span className="font-primary text-sm font-light leading-relaxed text-[var(--night-80)] md:text-base">
                    <EditableText id={`expertises.${expertise.id}.bullet${idx + 1}`}>
                      {b}
                    </EditableText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
