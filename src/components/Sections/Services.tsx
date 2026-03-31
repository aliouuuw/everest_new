import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

type Service = {
  id: string;
  title: string;
  desc: string;
  href: string;
  tags: string[];
  icon: React.ReactNode;
};

const services: Array<Service> = [
  {
    id: "ing-fin",
    title: 'Ingénierie financière',
    desc: "Structuration d'opérations, levées de fonds, émissions obligataires et placements primaires sur le marché régional.",
    href: "/ingenieurie-financiere",
    tags: ["Structuration", "Levée de fonds", "Obligations"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
  },
  {
    id: "marche-cap",
    title: 'Marché des capitaux',
    desc: "Courtage actions et obligations BRVM, gestion sous-mandat, émissions primaires et placements institutionnels.",
    href: "/marche-capitaux",
    tags: ["Courtage BRVM", "Gestion sous mandat", "Placements"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: "rech-ana",
    title: 'Recherche & analyses',
    desc: "Veille macroéconomique, notes sectorielles, analyses de valeurs et tableaux de bord des marchés UEMOA.",
    href: "/recherche-analyses",
    tags: ["Macroéconomie", "Notes sectorielles", "Marchés UEMOA"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
];

// Card component with spotlight effect
const ServiceCard: React.FC<{ svc: Service }> = ({ svc }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      ref={cardRef}
      href={svc.href}
      className="svc-card group relative p-8 md:p-10 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (cardRef.current) {
          cardRef.current.style.transform = 'translateY(0)';
          cardRef.current.style.borderColor = 'rgba(255,255,255,0.08)';
        }
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'rgba(202,148,47,0.4)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(202,148,47,0.1), transparent 40%)`,
          zIndex: 0,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(70,29,76,0.2), transparent 40%)`,
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-[rgba(202,148,47,0.15)] group-hover:shadow-[0_0_20px_rgba(202,148,47,0.2)]"
          style={{ background: 'rgba(202,148,47,0.08)', color: 'var(--jaune-or)' }}
        >
          {svc.icon}
        </div>

        <h3
          className="mb-3"
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.3,
            color: 'var(--pure-white)',
          }}
        >
          {svc.title}
        </h3>
        <p
          className="mb-6"
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 400,
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {svc.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {svc.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[10px] tracking-[0.06em] uppercase transition-colors duration-300 group-hover:bg-[rgba(255,255,255,0.05)] group-hover:text-[rgba(255,255,255,0.7)]"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <span
          className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 500,
            fontSize: '0.85rem',
            color: 'var(--jaune-or)',
          }}
        >
          En savoir plus
          <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
};

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Header reveal
    const headerTween = gsap.fromTo('.svc-header',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
    if (headerTween.scrollTrigger) triggers.push(headerTween.scrollTrigger);

    // Cards stagger
    const cards = gsap.utils.toArray('.svc-card');
    cards.forEach((card: any, i: number) => {
      const tween = gsap.fromTo(card,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' }
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #2a1435 0%, #1e1028 40%, #150e1c 100%)',
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      {/* Background Atmosphere — purple dominant */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[20%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(70,29,76,0.25) 0%, transparent 60%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(202,148,47,0.06) 0%, transparent 60%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header — centered, modern */}
        <div className="svc-header text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium transition-transform hover:scale-105 duration-300"
            style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--jaune-or)',
              background: 'rgba(202,148,47,0.08)',
              border: '1px solid rgba(202,148,47,0.15)',
            }}
          >
            Nos métiers
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--pure-white)',
            }}
          >
            Solutions pour chaque{' '}
            <span style={{ color: 'var(--jaune-or)' }}>profil investisseur.</span>
          </h2>
          <p
            className="mt-5 mx-auto"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '32rem',
            }}
          >
            Nous déployons une ingénierie de pointe pour structurer, protéger et faire croître vos actifs sur les marchés de l'UEMOA.
          </p>
        </div>

        {/* Service cards — modern grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} />
          ))}
        </div>
      </div>
    </section>
  );
};



