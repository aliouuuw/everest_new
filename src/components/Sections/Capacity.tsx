import { FiActivity, FiBriefcase, FiGlobe, FiLayers } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { EditorialCard } from '../ui/EditorialCard';
import { PillBadge } from '../ui';

const CAPACITY: Array<{
  icon: React.ElementType;
  kicker: string;
  title: string;
  bullets: string[];
  href: string;
  index: string;
}> = [
  {
    icon: FiBriefcase,
    kicker: 'MTP UEMOA',
    title: "Marché des Titres Publics de l'UEMOA",
    bullets: [
      'Présence sur les émissions souveraines',
      'Lecture des dynamiques de taux sous-régionales',
    ],
    href: '/marche-capitaux',
    index: '01',
  },
  {
    icon: FiGlobe,
    kicker: 'Réseau',
    title: "Investisseurs qualifiés",
    bullets: [
      "Accès à des institutionnels & investisseurs privés",
      'Distribution sélective des opportunités',
    ],
    href: '/offres',
    index: '02',
  },
  {
    icon: FiActivity,
    kicker: 'Exécution',
    title: 'Obligations & bourse',
    bullets: [
      "Transactions sur le compartiment obligataire",
      "Intervention sur le marché actions (BRVM)",
    ],
    href: '/bourse',
    index: '03',
  },
  {
    icon: FiLayers,
    kicker: 'Structuration',
    title: "Montage & distribution d'instruments",
    bullets: [
      'Dette, capital et offres ad hoc',
      "Placement au sein d'un processus d'origination rigoureux",
    ],
    href: '/ingenieurie-financiere',
    index: '04',
  },
];

export const Capacity: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden py-24 md:py-32"
      style={{ background: 'var(--gradient-dark-section)' }}
    >
      <div
        className="absolute right-0 top-0 h-[55%] w-1/2 pointer-events-none opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(203,152,36,0.12) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-[60%] w-[40%] pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(70,29,76,0.45) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6">
              <PillBadge variant="gold">Capacité d&apos;intervention</PillBadge>
            </div>
            <h2 className="luxury-heading-dark">
              Capacité{' '}
              <span style={{ color: 'var(--jaune-or)' }}>opérationnelle</span>
              <br />
              &amp; relationnelle.
            </h2>
          </div>
          <p className="luxury-subheading-dark-left max-w-md">
            Plateforme éprouvée sur les opérations régionales, avec des équipes
            structurantes et une exécution de marché fiable.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {CAPACITY.map((c) => (
            <EditorialCard
              key={c.title}
              variant="dark"
              icon={c.icon}
              kicker={c.kicker}
              title={c.title}
              bullets={c.bullets}
              href={c.href}
              linkLabel="Découvrir"
              index={c.index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
