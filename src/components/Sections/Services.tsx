import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

type Service = {
  number: string;
  title: string;
  desc: string;
  href: string;
};

const services: Array<Service> = [
  {
    number: "I",
    title: 'Ingénierie financière',
    desc: "Structuration d'opérations, levées de fonds, émissions obligataires et placements primaires sur le marché régional.",
    href: "/ingenieurie-financiere",
  },
  {
    number: "II",
    title: 'Marché des capitaux',
    desc: "Gestion sous-mandat, courtage actions et obligations BRVM, émissions primaires et placements institutionnels.",
    href: "/marche-capitaux",
  },
  {
    number: "III",
    title: 'Recherche & analyses',
    desc: "Veille macroéconomique, notes sectorielles, analyses de valeurs et tableaux de bord des marchés UEMOA.",
    href: "/recherche-analyses",
  },
];

export const Services: React.FC = () => {
  const location = useLocation();

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const gridElement = gridRef.current;

    if (!sectionElement || !gridElement) return;

    sectionElement.classList.remove('in');
    gridElement.classList.remove('in');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    sectionObserver.observe(sectionElement);
    gridObserver.observe(gridElement);

    return () => {
      sectionObserver.disconnect();
      gridObserver.disconnect();
    };
  }, [location.pathname]);

  return (
    <section
      key={`services-${location.pathname}`}
      ref={sectionRef}
      className="reveal relative py-28 md:py-36 overflow-hidden"
      id="services"
      style={{ background: 'var(--night)' }}
    >
      {/* Subtle dual radial glow (mauve and jaune-or) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 30% 0%, var(--mauve-10) 0%, rgba(202,148,47,0.05) 40%, transparent 80%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <span
            className="block text-[10px] tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
          >
            Nos offres
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display-aptos)',
              fontWeight: 400,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: 'var(--pure-white)',
            }}
          >
            Solutions pour chaque{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--jaune-or)' }}>
              profil investisseur.
            </em>
          </h2>
        </div>

        {/* Service Cards */}
        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-0">
          {services.map((s, i) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative py-10 md:py-12 md:px-10 first:md:pl-0 last:md:pr-0 flex flex-col transition-colors duration-500 hover:bg-white/[0.02]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderRight: i < services.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Roman numeral */}
              <span
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-display-aptos)',
                  fontWeight: 300,
                  fontSize: '1.1rem',
                  color: 'var(--jaune-or)',
                  opacity: 0.5,
                }}
              >
                {s.number}
              </span>

              {/* Title */}
              <h3
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-display-aptos)',
                  fontWeight: 500,
                  fontSize: '1.6rem',
                  lineHeight: 1.15,
                  color: 'var(--pure-white)',
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                className="mb-8 flex-grow"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 300,
                  fontSize: '0.875rem',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.45)',
                  maxWidth: '22rem',
                }}
              >
                {s.desc}
              </p>

              {/* Link affordance */}
              <span
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase group-hover:text-[var(--jaune-or)] transition-colors duration-500"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}
              >
                En savoir plus
                <span className="inline-block w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-500" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};


