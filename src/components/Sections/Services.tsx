import { useLocation } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { FiBarChart2, FiBriefcase, FiGlobe, FiLayers } from 'react-icons/fi';
import { EditorialCard } from '../ui/EditorialCard';
import { PillBadge } from '../ui';
import { EditableText } from '../../cms';

const services: Array<{
  icon: React.ElementType;
  kicker: string;
  title: string;
  bullets: string[];
  href: string;
  index: string;
}> = [
  {
    icon: FiBarChart2,
    kicker: 'Expertise I',
    title: 'Marché des Titres Publics',
    bullets: [
      'Émissions souveraines & stratégie de taux',
      'MTP UEMAO et pilotage de sensibilité',
    ],
    href: '/marche-capitaux',
    index: 'I',
  },
  {
    icon: FiGlobe,
    kicker: 'Expertise II',
    title: 'Marché financier régional (BRVM)',
    bullets: [
      'Actions & obligations sur place',
      "Intermédiation & conseil d'exécution",
    ],
    href: '/bourse',
    index: 'II',
  },
  {
    icon: FiLayers,
    kicker: 'Expertise III',
    title: 'Structuration & ingénierie financière',
    bullets: [
      "Solutions sur mesure pour l'émetteur",
      'Levées, financement & accompagnement UEMOA',
    ],
    href: '/ingenieurie-financiere',
    index: 'III',
  },
  {
    icon: FiBriefcase,
    kicker: 'Expertise IV',
    title: 'Private Office',
    bullets: [
      "Allocation & vision patrimoniale long terme",
      'Conseil sur mesure pour profils exigeants',
    ],
    href: '/gestion-sous-mandat',
    index: 'IV',
  },
];

export const Services: React.FC = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const gridEl = gridRef.current;
    if (!sectionEl || !gridEl) return;

    sectionEl.classList.remove('in');
    gridEl.classList.remove('in');

    const obs = (el: Element) => {
      const o = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
        { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
      );
      o.observe(el);
      return o;
    };

    const o1 = obs(sectionEl);
    const o2 = obs(gridEl);
    return () => {
      o1.disconnect();
      o2.disconnect();
    };
  }, [location.pathname]);

  return (
    <section
      key={`services-${location.pathname}`}
      ref={sectionRef}
      className="reveal relative overflow-hidden"
      id="services"
      style={{ background: 'var(--gradient-ivory-section)' }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 20%, var(--mauve-05) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 60%, var(--jaune-or-05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] border-b border-[var(--mauve-10)] px-6 pb-16 pt-24 md:px-16 md:pt-32 lg:px-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-8">
              <PillBadge><EditableText id="home.services.badge" as="span">Nos expertises</EditableText></PillBadge>
            </div>
            <h2 className="luxury-heading">
              <EditableText id="home.services.title" as="span">Nos expertises —</EditableText>{' '}
              <EditableText id="home.services.titleAccent" as="span" style={{ color: 'var(--jaune-or)' }}>marchés &amp; patrimoine.</EditableText>
            </h2>
          </div>
          <EditableText
            id="home.services.intro"
            as="p"
            className="text-secondary max-w-md text-base md:text-lg"
          >
            Quatre blocs — titres publics, BRVM, structuration et Private Office — pour couvrir l'origination,
            la distribution et le conseil patrimonial depuis une plateforme unique.
          </EditableText>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-10 md:px-16 md:py-12 lg:px-24">
        <div
          ref={gridRef}
          className="reveal-stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {services.map((s) => (
            <EditorialCard
              key={s.title}
              variant="light"
              icon={s.icon}
              kicker={s.kicker}
              title={s.title}
              bullets={s.bullets}
              href={s.href}
              linkLabel={"Découvrir l'expertise"}
              index={s.index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
