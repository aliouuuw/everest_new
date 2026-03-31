import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  number: string;
  title: string;
  description: string;
};

const features: Array<Feature> = [
  { number: "01", title: "Sécurité", description: "Conformité réglementaire rigoureuse et garde sécurisée de vos actifs sous agrément CREPMF." },
  { number: "02", title: "Accompagnement", description: "Un conseiller dédié, une écoute permanente et une transparence totale sur chaque opération." },
  { number: "03", title: "Performance", description: "Allocation stratégique, exécution précise et recherche indépendante au service de vos rendements." },
];

export const ValueProps: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Headline reveal
    gsap.fromTo('.vp-headline-word',
      { y: 50, opacity: 0, rotateX: 20 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Features stagger reveal
    const featureRows = gsap.utils.toArray('.vp-feature-row');
    featureRows.forEach((row: any, i: number) => {
      gsap.fromTo(row,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || t.trigger === listRef.current) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ 
        background: '#ffffff', // Crisp white for contrast after dark hero
        paddingTop: 'clamp(8rem, 20vw, 12rem)', 
        paddingBottom: 'clamp(8rem, 20vw, 12rem)' 
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">

        {/* Structured two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left — heading block */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <span
              className="inline-flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase mb-8"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--night-60)' }}
            >
              <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--night-40)' }} />
              Notre Approche
            </span>
            
            <h2
              className="flex flex-col gap-1 perspective-[1000px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--night)',
              }}
            >
              <span className="block overflow-hidden pb-2"><span className="vp-headline-word block origin-bottom">Exécution rigoureuse,</span></span>
              <em className="block overflow-hidden pb-2"><span className="vp-headline-word block origin-bottom font-light italic text-[var(--jaune-or)]">confiance durable.</span></em>
            </h2>

            <div
              className="h-[1px] w-24 mt-10 mb-8"
              style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
            />

            <p
              className="max-w-md text-lg"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'var(--night-60)',
              }}
            >
              Nous allions discipline de marché, ingénierie financière et accompagnement client
              pour créer de la valeur sur le long terme.
            </p>

            {/* Embedded Trust Marker */}
            <div className="mt-12 flex items-center gap-6 p-6 rounded-2xl bg-[var(--night)]/[0.02] border border-[var(--night)]/[0.04]">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--jaune-or)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--night-40)] font-semibold mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Agrément Officiel</p>
                <p className="text-sm font-medium text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>Régulé par le CREPMF</p>
              </div>
            </div>
          </div>

          {/* Right — feature rows */}
          <div ref={listRef} className="lg:col-span-7 flex flex-col pt-4 lg:pt-0">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="vp-feature-row group flex flex-col md:flex-row items-start gap-6 md:gap-12 relative"
                style={{
                  paddingTop: i === 0 ? '0' : 'clamp(2.5rem, 5vw, 4rem)',
                  paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
                }}
              >
                {/* Border line */}
                <div 
                  className="absolute bottom-0 left-0 h-[1px] bg-[var(--night)]/[0.08] transition-all duration-700 group-hover:bg-[var(--jaune-or)]"
                  style={{ width: '100%' }}
                />

                {/* Number */}
                <span
                  className="shrink-0 mt-2 transition-colors duration-500 group-hover:text-[var(--jaune-or)]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                    lineHeight: 1,
                    color: 'var(--night)',
                    opacity: 0.2,
                  }}
                >
                  {f.number}
                </span>

                <div className="flex-1">
                  <h3
                    className="mb-4 text-2xl transition-transform duration-500 group-hover:translate-x-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      color: 'var(--night)',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-base md:text-lg transition-colors duration-500 group-hover:text-[var(--night-80)]"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: 'var(--night-60)',
                      maxWidth: '32rem',
                    }}
                  >
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};



