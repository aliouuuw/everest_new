import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';
import EverestBackground from '../EverestBackground';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Initial states
      gsap.set('.reveal-text', { yPercent: 120 });
      gsap.set('.reveal-fade', { opacity: 0, y: 20 });
      gsap.set('.hero-line', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.trust-marker', { opacity: 0, y: 10 });

      // ─── Entrance choreography ───
      tl.to('.reveal-text', { yPercent: 0, duration: 1.4, stagger: 0.06, ease: 'expo.out' })
        .to('.hero-line', { scaleX: 1, duration: 1, ease: 'power3.inOut' }, '-=1')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power2.out' }, '-=0.8')
        .to('.trust-marker', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.6');

    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-end text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
    >
      {/* Animated WebGL Background */}
      <EverestBackground intensity={1.5} speed={0.4} colorTheme="lightSummit" />

      {/* Main Content */}
      {/* ══════════════════════════════════════════════
          CONTENT — Monumental, single-column, generous space.
      ══════════════════════════════════════════════ */}
      <div className="relative z-[1] w-full px-6 md:px-12 lg:px-16 xl:px-24 pb-[clamp(3rem,8vh,6rem)] pt-[clamp(8rem,20vh,14rem)] pointer-events-none">
        <div className="max-w-[1100px] pointer-events-auto">
          
          {/* Kicker — polished spacing and alignment */}
          <div className="reveal-fade flex items-center gap-3 mb-6 md:mb-8">
            <div className="hero-line h-[1.5px] w-6 bg-[var(--mauve)]" />
            <span
              className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium text-[var(--mauve-60)]"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Société de Gestion et d'Intermédiation — Dakar
            </span>
          </div>

          {/* Headline — refined tracking and spacing */}
          <h1 className="mb-6 md:mb-8">
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.02em] text-[var(--night)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                L'excellence
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.02em] italic text-[var(--mauve)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                au sommet
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.02em] text-[var(--night)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                du capital.
              </span>
            </span>
          </h1>

          {/* Subhead */}
          <div className="reveal-fade max-w-[480px] mb-8 md:mb-10">
            <p
              className="text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-[1.7] text-[var(--night-50)]"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400 }}
            >
              Courtage BRVM, émissions primaires et ingénierie financière.
              Nous opérons avec la rigueur d'une institution et la précision d'un partenaire dédié.
            </p>
          </div>

          {/* CTAs — with delight: refined hover states and transitions */}
          <div className="reveal-fade flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-12 md:mb-14">
            <a
              href="#services"
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--night)] text-[var(--ivory)] overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[white]/20 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)] focus-visible:ring-offset-2"
            >
              <div className="absolute inset-0 bg-[var(--mauve)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-[11px] tracking-[0.15em] uppercase font-semibold">
                Découvrir nos services
              </span>
              <FiArrowRight className="relative z-10 text-sm transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            
            <a
              href="/auth"
              className="group inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-semibold text-[var(--night-50)] hover:text-[var(--mauve)] transition-colors duration-200 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)] focus-visible:ring-offset-2"
            >
              <span className="relative">
                Accès Client
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[var(--jaune-or)] group-hover:w-full transition-all duration-200" />
              </span>
              <span className="text-[var(--jaune-or)] transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Trust markers — subtle inline with delight hover */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="trust-marker group flex items-center gap-2 cursor-default">
              <span className="w-1 h-1 rounded-full bg-[var(--jaune-or)] transition-all duration-200 group-hover:scale-125 group-hover:bg-[var(--mauve)]" />
              <span className="text-[10px] tracking-[0.08em] uppercase text-[var(--night-50)] transition-colors duration-200 group-hover:text-[var(--night-70)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Agrément CREPMF
              </span>
            </div>
            <div className="trust-marker group flex items-center gap-2 cursor-default">
              <span className="w-1 h-1 rounded-full bg-[var(--jaune-or)] transition-all duration-200 group-hover:scale-125 group-hover:bg-[var(--mauve)]" />
              <span className="text-[10px] tracking-[0.08em] uppercase text-[var(--night-50)] transition-colors duration-200 group-hover:text-[var(--night-70)]" style={{ fontFamily: 'var(--font-primary)' }}>
                30+ années d'expertise
              </span>
            </div>
            <div className="trust-marker group flex items-center gap-2 cursor-default">
              <span className="w-1 h-1 rounded-full bg-[var(--jaune-or)] transition-all duration-200 group-hover:scale-125 group-hover:bg-[var(--mauve)]" />
              <span className="text-[10px] tracking-[0.08em] uppercase text-[var(--night-50)] transition-colors duration-200 group-hover:text-[var(--night-70)]" style={{ fontFamily: 'var(--font-primary)' }}>
                BRVM · UEMOA
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
