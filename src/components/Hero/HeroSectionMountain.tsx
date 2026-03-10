import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiActivity, FiShield } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
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
      // Cinematic, slow, deliberate reveals
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set('.bg-image', { scale: 1.05 });
      gsap.set('.reveal-text', { yPercent: 110 });
      gsap.set('.reveal-fade', { opacity: 0, y: 15 });
      gsap.set('.data-bar', { yPercent: 100 });
      gsap.set('.data-item', { opacity: 0, x: -10 });

      tl.to('.bg-image', { scale: 1, duration: 4, ease: 'sine.out' })
        .to('.reveal-text', { yPercent: 0, duration: 1.5, stagger: 0.1 }, '-=3.5')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, '-=3')
        .to('.data-bar', { yPercent: 0, duration: 1.2, ease: 'expo.out' }, '-=3')
        .to('.data-item', { opacity: 1, x: 0, duration: 1, stagger: 0.1 }, '-=2.2');

    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col bg-[#Fbfafc] text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
    >
      {/* ─── Full-Bleed Cinematic Canvas ─── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[var(--night)]/5">
        <div 
          className="bg-image absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/generated_bg_2.jpg)' }}
        />
        {/* Precise gradients for text contrast only, no heavy fog */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#Fbfafc]/90 via-[#Fbfafc]/40 to-transparent w-[80%] md:w-[60%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#Fbfafc]/60 via-transparent to-transparent h-[40%]" />
      </div>

      {/* ─── Typography in the Sky ─── */}
      <div className="relative z-10 w-full flex-grow flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 pt-32 pb-32">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="max-w-3xl">
            
            {/* Kicker */}
            <div className="reveal-fade flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[var(--mauve)]" />
              <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-bold text-[var(--mauve)]">
                SGI — Dakar, Sénégal
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-8">
              <span className="block overflow-hidden pb-1">
                <span className="reveal-text block text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                  L'excellence
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="reveal-text block text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.03em] italic text-[var(--mauve)]" style={{ fontFamily: 'var(--font-display)' }}>
                  au sommet
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="reveal-text block text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                  du capital.
                </span>
              </span>
            </h1>

            {/* Subhead */}
            <div className="reveal-fade max-w-lg mb-10 border-l-[3px] border-[var(--jaune-or)] pl-5">
              <p className="text-[1.05rem] md:text-[1.125rem] leading-[1.6] text-[var(--night-70)] font-medium">
                Partenaire institutionnel de référence. Nous orchestrons le courtage BRVM, les émissions primaires et l'ingénierie financière avec une précision chirurgicale.
              </p>
            </div>

            {/* CTA */}
            <div className="reveal-fade flex items-center gap-6">
              <a
                href="#services"
                onMouseEnter={() => setIsHoveringPrimary(true)}
                onMouseLeave={() => setIsHoveringPrimary(false)}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[var(--night)] text-white overflow-hidden transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
              >
                <div 
                  className="absolute inset-0 bg-[var(--mauve)] transition-transform duration-500 ease-out origin-left"
                  style={{ transform: isHoveringPrimary ? 'scaleX(1)' : 'scaleX(0)' }}
                />
                <span className="relative z-10 text-[11px] tracking-[0.2em] uppercase font-bold">
                  Découvrir l'expertise
                </span>
                <FiArrowRight 
                  className="relative z-10 text-sm transition-transform duration-500 ease-out"
                  style={{ transform: isHoveringPrimary ? 'translateX(4px)' : 'translateX(0)' }}
                />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Institutional Data Bar ─── */}
      <div className="data-bar relative z-20 w-full bg-white/95 backdrop-blur-md border-t border-[var(--night)]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--night)]/10">
            
            {/* Agrément */}
            <div className="data-item py-6 md:py-8 md:pr-12 flex flex-col justify-center group cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-50)] group-hover:text-[var(--mauve)] transition-colors duration-300">Agrément CREPMF</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-[1.25rem] font-mono tracking-tight text-[var(--night)]">SGI/DA/2016/60</div>
                <FiShield className="text-[var(--night-20)] group-hover:text-[var(--mauve)] transition-colors duration-300" />
              </div>
            </div>

            {/* Track Record */}
            <div className="data-item py-6 md:py-8 md:px-12 flex flex-col justify-center group cursor-default">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-50)] group-hover:text-[var(--mauve)] transition-colors duration-300">Track Record</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[2rem] leading-none text-[var(--night)] font-medium" style={{ fontFamily: 'var(--font-display-aptos)' }}>08</span>
                <span className="text-[var(--night-60)] text-[12px] font-bold uppercase tracking-wider">ans d'excellence</span>
              </div>
            </div>

            {/* Expertise */}
            <div className="data-item py-6 md:py-8 md:pl-12 flex flex-col justify-center group cursor-default">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-50)] group-hover:text-[var(--mauve)] transition-colors duration-300">Expertise Cumulée</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[2rem] leading-none text-[var(--night)] font-medium" style={{ fontFamily: 'var(--font-display-aptos)' }}>30</span>
                  <span className="text-[1.25rem] text-[var(--jaune-or)] leading-none">+</span>
                  <span className="text-[var(--night-60)] text-[12px] font-bold uppercase tracking-wider ml-1">ans</span>
                </div>
                <FiActivity className="text-[var(--night-20)] group-hover:text-[var(--mauve)] transition-colors duration-300" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};


