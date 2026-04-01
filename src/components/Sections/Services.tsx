import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { TiltCard } from '../ui/TiltCard';

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

// Card component with 3D tilt effect
const ServiceCard: React.FC<{ svc: Service }> = ({ svc }) => {
  return (
    <TiltCard
      as="a"
      href={svc.href}
      className="svc-card group relative p-8 md:p-10 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      maxTilt={10}
      glareIntensity={0.12}
      hoverScale={1.03}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(202,148,47,0.4)';
        el.style.boxShadow = '0 25px 50px -12px rgba(70,29,76,0.25), 0 0 30px rgba(202,148,47,0.08)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.boxShadow = 'none';
      }}
    >
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
    </TiltCard>
  );
};

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  // Ambient cursor light — soft glow follows mouse across section
  React.useEffect(() => {
    const section = sectionRef.current;
    const ambient = ambientRef.current;
    if (!section || !ambient) return;

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ambient.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(70,29,76,0.15), rgba(202,148,47,0.04) 40%, transparent 60%)`;
        ambient.style.opacity = '1';
      });
    };
    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      ambient.style.opacity = '0';
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Header — blur-to-sharp reveal with scale
    const headerTween = gsap.fromTo('.svc-header',
      { y: 60, opacity: 0, scale: 0.95, filter: 'blur(8px)' },
      { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
    if (headerTween.scrollTrigger) triggers.push(headerTween.scrollTrigger);

    // Cards — horizontal stagger (alternating directions) with depth
    const cards = gsap.utils.toArray('.svc-card');
    cards.forEach((card: any, i: number) => {
      const xOffset = i === 0 ? -80 : i === 2 ? 80 : 0;
      const tween = gsap.fromTo(card,
        { x: xOffset, y: 40, opacity: 0, scale: 0.92, filter: 'blur(6px)', rotateY: i === 0 ? -5 : i === 2 ? 5 : 0 },
        { x: 0, y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', rotateY: 0,
          duration: 1, delay: i * 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: section, start: 'top 55%', toggleActions: 'play none none reverse' }
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

      {/* Ambient cursor light overlay */}
      <div
        ref={ambientRef}
        className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500"
        style={{ opacity: 0 }}
      />

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
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--pure-white)',
            }}
          >
            Solutions pour chaque{' '}
            <span style={{ color: 'var(--jaune-or)' }}>profil investisseur.</span>
          </h2>
          <p
            className="mt-6 mx-auto"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 300,
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.45)',
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



