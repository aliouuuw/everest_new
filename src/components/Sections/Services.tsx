import { useLocation } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { FiArrowRight, FiBarChart2, FiBriefcase, FiGlobe, FiLayers } from 'react-icons/fi';
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
    icon: FiGlobe,
    kicker: 'Expertise I',
    title: 'Marché financier régional (BRVM)',
    bullets: [
      'Actions & obligations sur place',
      "Intermédiation & conseil d'exécution",
    ],
    href: '/expertises#marche-financier-regional',
    index: 'I',
  },
  {
    icon: FiBarChart2,
    kicker: 'Expertise II',
    title: 'Marché des Titres Publics',
    bullets: [
      'Émissions souveraines & stratégie de taux',
      'MTP UEMAO et pilotage de sensibilité',
    ],
    href: '/expertises#marche-titres-publics',
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
    href: '/expertises#ingenierie-financiere',
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
    href: '/expertises#private-office',
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
            'radial-gradient(ellipse 60% 40% at 30% 20%, var(--everest-green-05) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 60%, var(--jaune-or-05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] border-b border-[var(--everest-green-10)] px-6 pb-16 pt-24 md:px-16 md:pt-32 lg:px-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-8">
              <PillBadge variant="green">
                <EditableText id="home.services.badge" as="span">
                  Nos expertises
                </EditableText>
              </PillBadge>
            </div>
            <h2 className="luxury-heading" style={{ color: 'var(--night-80)' }}>
              <EditableText id="home.services.title" as="span">
                Nos expertises — marchés &amp; patrimoine.
              </EditableText>
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
          className="overflow-hidden rounded-[1.25rem] border border-[var(--everest-green-10)] bg-[var(--pure-white)]"
          style={{
            boxShadow:
              '0 8px 32px -12px rgba(1,45,42,0.12), inset 0 1px 0 rgba(255,255,255,0.85)',
          }}
        >
          <div
            ref={gridRef}
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.title}
                  href={s.href}
                  className={[
                    'group relative z-0 flex min-h-[24rem] flex-col border-[var(--everest-green-10)] bg-[var(--pure-white)] px-0 py-8 sm:px-6 lg:px-8',
                    'transition-[background-color,box-shadow] duration-500',
                    'hover:z-10 hover:bg-[var(--everest-green)] hover:shadow-[0_20px_40px_-20px_rgba(1,45,42,0.35)]',
                    i > 0 ? 'border-t' : '',
                    i % 2 === 1 ? 'sm:border-l' : 'sm:border-l-0',
                    i >= 2 ? 'sm:border-t' : 'sm:border-t-0',
                    i > 0 ? 'lg:border-l' : 'lg:border-l-0',
                    'lg:border-t-0',
                  ].join(' ')}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
                    style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
                  />

                  <div className="mb-10 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--everest-green-10)] bg-[var(--everest-green-05)] text-[var(--night-80)] transition-colors duration-500 group-hover:border-[rgba(203,152,36,0.25)] group-hover:bg-[rgba(203,152,36,0.12)] group-hover:text-[var(--jaune-or)]">
                      <Icon className="text-lg transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
                    </div>
                    <span className="font-primary text-xs font-bold tracking-[0.16em] text-[var(--night-40)] transition-colors duration-500 group-hover:text-white/35">
                      {s.index}
                    </span>
                  </div>

                  <p className="mb-2 font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--jaune-or)]">
                    {s.kicker}
                  </p>

                  <h3 className="mb-4 font-primary text-xl font-bold leading-tight tracking-tight text-[var(--night-80)] transition-colors duration-500 group-hover:text-white md:text-2xl">
                    {s.title}
                  </h3>

                  <ul className="mb-8 flex-1 space-y-2.5 font-primary text-sm font-light leading-relaxed text-[var(--night-60)] transition-colors duration-500 group-hover:text-white/75">
                    {s.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 pl-0.5">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--night-80)] transition-colors duration-500 group-hover:bg-[var(--jaune-or)]"
                          aria-hidden
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-2 font-primary text-sm font-semibold text-[var(--night-80)] transition-all duration-300 group-hover:gap-3 group-hover:text-[var(--jaune-or)]">
                    Découvrir l&apos;expertise
                    <FiArrowRight className="text-base opacity-80 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
