import { FiGitBranch, FiGlobe, FiPieChart, FiSend } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { EditorialCard } from '../ui/EditorialCard';
import { PillBadge } from '../ui';

const PILLARS: Array<{
  icon: React.ElementType;
  kicker: string;
  title: string;
  bullets: string[];
  href: string;
  index: string;
}> = [
  {
    icon: FiGitBranch,
    kicker: 'Structuration',
    title: "Structuration d'opérations de financement",
    bullets: [
      'Montages adaptés aux émetteurs publics et privés',
      "Coordination des acteurs de la chaîne d'investissement",
    ],
    href: '/offres',
    index: '01',
  },
  {
    icon: FiGlobe,
    kicker: 'Intermédiation',
    title: 'Marchés secondaires & exécution',
    bullets: [
      "Discipline d'exécution sur les titres publics",
      'Intervention sur le marché financier régional (BRVM)',
    ],
    href: '/bourse',
    index: '02',
  },
  {
    icon: FiSend,
    kicker: 'Distribution',
    title: "Instruments de dette & de capital",
    bullets: [
      "Placement auprès d'investisseurs qualifiés",
      "Structuration d'offres adaptée aux émetteurs",
    ],
    href: '/offres',
    index: '03',
  },
  {
    icon: FiPieChart,
    kicker: 'Allocation',
    title: 'Conseil stratégique en allocation',
    bullets: [
      'Cadre analytique et objectifs de rendement',
      "Alignement sur le profil de risque du portefeuille",
    ],
    href: 'https://everest-account-opening.vercel.app/new-home',
    index: '04',
  },
];

export const Positioning: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden py-24 md:py-32"
      style={{ background: 'var(--pure-white)' }}
    >
      <div
        className="absolute left-0 top-0 h-[60%] w-[45%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top left, var(--mauve-05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6">
              <PillBadge>Positionnement</PillBadge>
            </div>
            <h2 className="luxury-heading">
              Un intermédiaire de référence
              <br />
              <span style={{ color: 'var(--jaune-or)' }}>
                au service des flux de capitaux régionaux.
              </span>
            </h2>
          </div>
          <p className="text-secondary max-w-md text-base md:text-lg">
            Dans un environnement de transformation des marchés de capitaux en Afrique de l&apos;Ouest,
            nous alignons les besoins de financement des émetteurs avec les stratégies d&apos;allocation
            des investisseurs.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {PILLARS.map((p) => (
            <EditorialCard
              key={p.kicker}
              variant="light"
              icon={p.icon}
              kicker={p.kicker}
              title={p.title}
              bullets={p.bullets}
              href={p.href}
              linkLabel="En savoir plus"
              index={p.index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
