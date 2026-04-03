import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { PillBadge } from '../ui';

type Service = {
  number: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
};

const services: Array<Service> = [
  {
    number: "I",
    title: 'Ingénierie financière',
    desc: "Structuration d'opérations, levées de fonds, émissions obligataires et placements primaires sur le marché régional UEMOA.",
    tags: ["Structuration", "Levée de fonds", "Obligations"],
    href: "/ingenieurie-financiere",
  },
  {
    number: "II",
    title: 'Marché des capitaux',
    desc: "Gestion sous-mandat, courtage actions et obligations BRVM, émissions primaires et placements institutionnels.",
    tags: ["BRVM", "Gestion sous-mandat", "Courtage"],
    href: "/marche-capitaux",
  },
  {
    number: "III",
    title: 'Recherche & analyses',
    desc: "Veille macroéconomique, notes sectorielles, analyses de valeurs et tableaux de bord des marchés UEMOA.",
    tags: ["Macroéconomie", "Notes sectorielles", "UEMOA"],
    href: "/recherche-analyses",
  },
];

export const Services: React.FC = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const rowsEl = rowsRef.current;
    if (!sectionEl || !rowsEl) return;

    sectionEl.classList.remove('in');
    rowsEl.classList.remove('in');

    const obs = (el: Element) => {
      const o = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
        { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
      );
      o.observe(el);
      return o;
    };

    const o1 = obs(sectionEl);
    const o2 = obs(rowsEl);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, [location.pathname]);

  return (
    <section
      key={`services-${location.pathname}`}
      ref={sectionRef}
      className="reveal relative overflow-hidden"
      id="services"
      style={{ background: 'var(--gradient-ivory-section)' }}
    >
      {/* Subtle mauve-gold gradient atmosphere */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 30% 20%, var(--mauve-05) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 60%, var(--jaune-or-05) 0%, transparent 50%)',
        }}
      />
      {/* Header — full width, tight */}
      <div className="px-8 md:px-16 lg:px-24 pt-24 md:pt-32 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10 border-b border-[var(--mauve-10)] relative z-10">
        <div className="max-w-2xl">
          <div className="mb-8">
            <PillBadge>Nos offres</PillBadge>
          </div>
          <h2 className="luxury-heading">
            Solutions pour chaque{' '}
            <span style={{ color: 'var(--jaune-or)' }}>
              profil.
            </span>
          </h2>
        </div>
        <p className="max-w-md text-secondary text-base md:text-lg mb-2 md:mb-0">
          Trois domaines d'expertise complémentaires pour couvrir l'ensemble
          de vos besoins en investissement et en ingénierie financière.
        </p>
      </div>

      {/* Stacked full-width service rows */}
      <div ref={rowsRef} className="reveal-stagger relative z-10">
        {services.map((s) => (
          <a
            key={s.title}
            href={s.href}
            className="group flex flex-col md:flex-row items-stretch w-full transition-colors duration-500 hover:bg-[var(--pure-white)] border-b border-[var(--mauve-10)]"
          >
            {/* Oversized roman numeral — left column */}
            <div className="hidden md:flex items-center justify-center w-24 lg:w-40 shrink-0 border-r border-[var(--mauve-10)] transition-colors duration-500 group-hover:border-[var(--mauve-30)]">
              <span className="font-display text-[3rem] lg:text-[4rem] leading-none text-[var(--mauve)] opacity-30 transition-all duration-500 group-hover:opacity-100 group-hover:text-[var(--jaune-or)]">
                {s.number}
              </span>
            </div>

            {/* Main content */}
            <div className="flex flex-col md:flex-row md:items-center flex-1 px-8 md:px-12 lg:px-16 py-12 gap-6 md:gap-16">
              {/* Title */}
              <h3 className="md:w-[40%] shrink-0 font-primary font-semibold text-2xl lg:text-3xl text-[var(--night)] transition-colors duration-300 group-hover:text-[var(--mauve)]">
                {s.title}
              </h3>

              {/* Description + tags */}
              <div className="flex-1">
                <p className="text-secondary text-sm md:text-base mb-6 max-w-xl transition-colors duration-300 group-hover:text-[var(--night)]">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-[var(--night-60)] border border-[var(--mauve-15)] rounded-full transition-all duration-300 group-hover:border-[var(--mauve)] group-hover:text-[var(--mauve)] group-hover:bg-[var(--mauve-05)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow — right column */}
            <div className="hidden md:flex items-center justify-center w-24 lg:w-32 shrink-0 border-l border-transparent transition-colors duration-500 group-hover:border-[var(--mauve-10)]">
              <span className="w-12 h-12 rounded-full border border-[var(--mauve-15)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[var(--mauve)] group-hover:bg-[var(--mauve)]">
                <FiArrowUpRight className="text-lg text-[var(--night-60)] transition-colors duration-500 group-hover:text-[var(--pure-white)]" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom padding */}
      <div className="h-10 md:h-16" />
    </section>
  );
};


