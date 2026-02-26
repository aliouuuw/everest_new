import { FaCalculator, FaFileAlt, FaUsers } from "react-icons/fa";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";

type Service = {
  icon: IconType;
  title: string;
  desc: string;
  href: string;
};

const services: Array<Service> = [
  {
    icon: FaCalculator,
    title: 'Ingénierie financière',
    desc: "Structuration, émissions et placements primaires.",
    href: "/ingenieurie-financiere",
  },
  {
    icon: FaUsers,
    title: 'Marché des capitaux',
    desc: "Gestion sous-mandat, émissions primaires, placements.",
    href: "/marche-capitaux",
  },  
  {
    icon: FaFileAlt,
    title: 'Recherche & analyses',
    desc: "Veille, notes et tableaux de bord marchés.",
    href: "/recherche-analyses",
  },
];

const ServiceCard: React.FC<Service> = ({ icon: Icon, title, desc, href }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/20 bg-[var(--night)]/60 backdrop-blur-md p-8 transition-all glass-card-hover flex flex-col h-full">
      {/* Decorative gold glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic)]/10 blur-3xl group-hover:bg-[var(--gold-metallic)]/20 transition-all duration-700" />
      
      {/* Subtle border gradient */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-[var(--gold-metallic)]/30 transition-colors duration-500" pointer-events-none />

      <div className="flex flex-col flex-grow relative z-10">
        {/* Icon badge */}
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[var(--night)] to-[#1a1d24] border border-[var(--gold-metallic)]/30 shadow-[0_0_15px_rgba(202,148,47,0.1)] flex items-center justify-center shrink-0 group-hover:shadow-[0_0_25px_rgba(202,148,47,0.2)] transition-shadow duration-500">
          <Icon className="text-2xl text-[var(--gold-metallic)] transition-transform duration-500 group-hover:scale-110" />
        </div>

        <div>
          <div className="font-display text-xl mb-3 text-white tracking-wide">{title}</div>
          <p className="text-secondary-dark text-base leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Subtle divider and affordance */}
      <div className="mt-8 pt-6 border-t border-[var(--gold-metallic)]/10 relative z-10">
        <a href={href} className="text-sm font-medium tracking-wider uppercase text-[var(--gold-metallic)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-300 inline-flex items-center gap-2 group/link">
          En savoir plus
          <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const location = useLocation();
  
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Simple Intersection Observer for reveal effects
  useEffect(() => {
    const sectionElement = sectionRef.current;
    const gridElement = gridRef.current;
    
    if (!sectionElement || !gridElement) return;

    // Remove any existing classes
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
      className="reveal py-32 relative overflow-hidden bg-[var(--night)] border-t border-white/5" 
      id="services"
    >      
      {/* Background cinematic texture */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: 'url(/background-sol.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) contrast(120%)'
        }}
      />
      
      {/* Cinematic lighting gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-metallic)]/20 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-transparent to-[var(--night)]" />
      <div className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-[var(--gold-metallic)]/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="kicker text-[var(--gold-metallic)] tracking-[0.3em]">NOS EXPERTISES</span>
          <h2 className="luxury-heading-dark mt-4 mb-6">Des solutions sur-mesure pour chaque profil d'investisseur</h2>
          <p className="luxury-subheading-dark text-lg">De la structuration d'opérations complexes à la gestion de portefeuilles, nous couvrons l'intégralité du cycle de création de valeur sur les marchés de capitaux.</p>
        </div>

        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} href={s.href} />
          ))}
        </div>
      </div>
    </section>
  );
};


