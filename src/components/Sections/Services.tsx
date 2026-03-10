import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

type Service = {
  number: string;
  title: string;
  desc: string;
  href: string;
  metrics?: { label: string; value: string }[];
};

const services: Array<Service> = [
  {
    number: "01",
    title: 'Ingénierie financière',
    desc: "Structuration d'opérations, levées de fonds, émissions obligataires et placements primaires sur le marché régional.",
    href: "/ingenieurie-financiere",
    metrics: [
      { label: "Focus", value: "Capital" },
      { label: "Zone", value: "UEMOA" }
    ]
  },
  {
    number: "02",
    title: 'Marché des capitaux',
    desc: "Gestion sous-mandat, courtage actions et obligations BRVM, émissions primaires et placements institutionnels.",
    href: "/marche-capitaux",
    metrics: [
      { label: "Market", value: "BRVM" },
      { label: "Type", value: "Mandat" }
    ]
  },
  {
    number: "03",
    title: 'Recherche & analyses',
    desc: "Veille macroéconomique, notes sectorielles, analyses de valeurs et tableaux de bord des marchés UEMOA.",
    href: "/recherche-analyses",
    metrics: [
      { label: "Data", value: "Macro" },
      { label: "Freq", value: "Daily" }
    ]
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
      className="reveal relative py-28 md:py-36 overflow-hidden bg-[#f5f5f5]"
      id="services"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[var(--jaune-or)]" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--night)' }}
              >
                Pôles d'expertise
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display-aptos)',
                fontWeight: 500,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--night)',
              }}
            >
              Un accès structuré{' '}
              <span className="block text-[var(--night)]/40 mt-2">
                au marché des capitaux.
              </span>
            </h2>
          </div>
          
          <div className="hidden md:block pb-2">
            <p className="text-[0.9rem] text-[var(--night)]/50 max-w-xs font-light leading-relaxed">
              Une architecture de services conçue pour l'investisseur institutionnel et privé exigeant.
            </p>
          </div>
        </div>

        {/* Services Grid Dashboard Style */}
        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group relative bg-white border border-black/5 flex flex-col transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.02] hover:-translate-y-1"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-[var(--jaune-or)] transition-colors duration-300" />
              
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <span
                    className="font-mono text-xs text-[var(--night)]/30 group-hover:text-[var(--jaune-or)] transition-colors"
                  >
                    {s.number}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center text-[var(--night)]/30 group-hover:bg-[var(--jaune-or)]/10 group-hover:text-[var(--jaune-or)] group-hover:border-[var(--jaune-or)]/20 transition-all duration-300">
                    <FiArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>

                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display-aptos)',
                    fontWeight: 500,
                    fontSize: '1.6rem',
                    lineHeight: 1.15,
                    color: 'var(--night)',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  className="mb-10 flex-grow"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 400,
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--night)',
                    opacity: 0.6,
                  }}
                >
                  {s.desc}
                </p>

                {/* Dashboard-style metrics footer */}
                {s.metrics && (
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-black/5 mt-auto">
                    {s.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <span className="block text-[9px] uppercase tracking-widest text-[var(--night)]/40 mb-1">
                          {metric.label}
                        </span>
                        <span className="block text-xs font-mono text-[var(--night)]/80">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};


