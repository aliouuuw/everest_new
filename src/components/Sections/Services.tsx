import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

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
      style={{ background: 'var(--cream)' }}
    >
      {/* Header — full width, tight */}
      <div
        className="px-8 md:px-16 lg:px-24 pt-20 md:pt-28 pb-10 md:pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        style={{ borderBottom: '1px solid var(--timberwolf)' }}
      >
        <div>
          <span
            className="block text-[10px] tracking-[0.35em] uppercase mb-5"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
          >
            Nos offres
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: 'var(--night)',
            }}
          >
            Solutions pour chaque{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>
              profil.
            </em>
          </h2>
        </div>
        <p
          className="max-w-sm"
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 300,
            fontSize: '0.9rem',
            lineHeight: 1.75,
            color: 'var(--night-60)',
          }}
        >
          Trois domaines d'expertise complémentaires pour couvrir l'ensemble
          de vos besoins en investissement et en ingénierie financière.
        </p>
      </div>

      {/* Stacked full-width service rows */}
      <div ref={rowsRef} className="reveal-stagger">
        {services.map((s) => (
          <a
            key={s.title}
            href={s.href}
            className="group flex items-stretch w-full transition-colors duration-500 hover:bg-[var(--gold-pale)]"
            style={{ borderBottom: '1px solid var(--timberwolf)' }}
          >
            {/* Oversized roman numeral — left column */}
            <div
              className="hidden md:flex items-center justify-center w-32 lg:w-44 shrink-0 transition-colors duration-500"
              style={{ borderRight: '1px solid var(--timberwolf)' }}
            >
              <span
                className="group-hover:opacity-100 transition-all duration-500"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: 'var(--jaune-or)',
                  opacity: 0.25,
                }}
              >
                {s.number}
              </span>
            </div>

            {/* Main content */}
            <div className="flex flex-col md:flex-row md:items-center flex-1 px-8 md:px-12 lg:px-16 py-10 md:py-12 gap-6 md:gap-16">
              {/* Title */}
              <h3
                className="md:w-[38%] shrink-0 transition-colors duration-500 group-hover:text-[var(--mauve)]"
                style={{
                  fontFamily: 'var(--font-display-aptos)',
                  fontWeight: 500,
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: 'var(--night)',
                }}
              >
                {s.title}
              </h3>

              {/* Description + tags */}
              <div className="flex-1">
                <p
                  className="mb-5 transition-colors duration-500 group-hover:text-[var(--night-80)]"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 300,
                    fontSize: '0.9rem',
                    lineHeight: 1.75,
                    color: 'var(--night-60)',
                    maxWidth: '28rem',
                  }}
                >
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] tracking-[0.1em] uppercase transition-colors duration-500 group-hover:border-[var(--jaune-or)] group-hover:text-[var(--jaune-or)]"
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 400,
                        color: 'var(--night-60)',
                        border: '1px solid var(--timberwolf)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow — right column */}
            <div className="hidden md:flex items-center justify-center w-20 lg:w-28 shrink-0">
              <span
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:border-[var(--jaune-or)] group-hover:bg-[var(--jaune-or)]/10"
                style={{ borderColor: 'var(--timberwolf)' }}
              >
                <FiArrowUpRight
                  className="text-sm transition-all duration-500 group-hover:text-[var(--jaune-or)]"
                  style={{ color: 'var(--night-60)' }}
                />
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


