import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from '../ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const features: Array<Feature> = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Sécurité réglementaire",
    description: "Conformité rigoureuse et garde sécurisée de vos actifs sous agrément CREPMF. Vos investissements sont protégés par les normes les plus strictes."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Accompagnement dédié",
    description: "Un conseiller personnel, une écoute permanente et une transparence totale sur chaque opération. Nous sommes à vos côtés."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Performance optimisée",
    description: "Allocation stratégique, exécution précise et recherche indépendante au service de vos rendements sur les marchés de l'UEMOA."
  },
];

export const ValueProps: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Section header — cinematic scale-up from depth
    const headerTween = gsap.fromTo('.vp-header',
      { y: 50, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
      {
        y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.3, ease: 'expo.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
      }
    );
    if (headerTween.scrollTrigger) triggers.push(headerTween.scrollTrigger);

    // Cards — scale from depth with staggered timing (feels like emerging from fog)
    const cards = gsap.utils.toArray('.vp-card');
    cards.forEach((card: any, i: number) => {
      const tween = gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.85, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1.1, delay: i * 0.18, ease: 'expo.out',
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
      className="relative overflow-hidden"
      style={{
        background: 'var(--pure-white)',
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">

        {/* Header — centered, modern */}
        <div className="vp-header text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium transition-transform hover:scale-105 duration-300"
            style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--mauve)',
              background: 'var(--mauve-05)',
              border: '1px solid var(--mauve-border)',
            }}
          >
            Pourquoi Everest Finance
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--night)',
            }}
          >
            Exécution rigoureuse,{' '}
            <span style={{ color: 'var(--mauve)' }}>confiance durable.</span>
          </h2>
          <p
            className="mt-6 mx-auto"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 300,
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--night-60)',
              maxWidth: '32rem',
            }}
          >
            Nous allions discipline de marché, ingénierie financière et accompagnement client pour créer de la valeur sur le long terme.
          </p>
        </div>

        {/* Feature cards — modern 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((f) => (
            <TiltCard
              key={f.title}
              className="vp-card group relative p-8 md:p-10 rounded-2xl overflow-hidden"
              style={{
                background: 'var(--summit-ivory)',
                border: '1px solid var(--command-border)',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
              maxTilt={8}
              glareIntensity={0.08}
              hoverScale={1.02}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--mauve-border-strong)';
                el.style.boxShadow = '0 25px 50px -12px rgba(70,29,76,0.12), 0 0 30px rgba(70,29,76,0.04)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--command-border)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Icon Container with Floating Delight Animation */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[rgba(70,29,76,0.15)] group-hover:text-[var(--mauve)]"
                style={{ background: 'var(--mauve-10)', color: 'var(--mauve)', boxShadow: '0 4px 12px rgba(70,29,76,0)' }}
              >
                <div className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1">
                  {f.icon}
                </div>
              </div>

              <h3
                className="mb-3 transition-colors duration-300 group-hover:text-[var(--mauve)]"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  lineHeight: 1.3,
                  color: 'var(--night)',
                }}
              >
                {f.title}
              </h3>
              <p
                className="transition-colors duration-300 group-hover:text-[var(--night-80)]"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'var(--night-60)',
                }}
              >
                {f.description}
              </p>
            </TiltCard>
          ))}
        </div>

        {/* Trust bar — with subtle hover pulses */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {['Agrément CREPMF', "30+ années d'expertise", 'BRVM · UEMOA'].map((label) => (
            <div 
              key={label} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-[var(--summit-ivory)] cursor-default"
            >
              <span 
                className="w-1.5 h-1.5 rounded-full transition-transform duration-300 hover:scale-150" 
                style={{ background: 'var(--jaune-or)', boxShadow: '0 0 8px var(--jaune-or-30)' }} 
              />
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  color: 'var(--night-60)',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



