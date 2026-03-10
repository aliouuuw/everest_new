import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiActivity, FiShield, FiTrendingUp } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
  const [isHoveringSecondary, setIsHoveringSecondary] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
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
      // High-end motion language: sharp, precise, architectural
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial states
      gsap.set('.reveal-text', { yPercent: 120 });
      gsap.set('.reveal-fade', { opacity: 0, y: 20 });
      gsap.set('.metric-block', { opacity: 0, y: 30 });
      gsap.set('.structural-line', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.structural-line-v', { scaleY: 0, transformOrigin: 'top' });
      gsap.set('.bg-layer', { opacity: 0 });
      gsap.set('.grain-texture', { opacity: 0 });

      tl.to('.bg-layer', { opacity: 1, duration: 2.5, ease: 'power2.inOut', stagger: 0.2 })
        .to('.grain-texture', { opacity: 0.03, duration: 1.5 }, '<')
        .to('.structural-line', { scaleX: 1, duration: 1.5, ease: 'expo.inOut' }, '-=1.5')
        .to('.reveal-text', { yPercent: 0, duration: 1.4, stagger: 0.1 }, '-=1.2')
        .to('.structural-line-v', { scaleY: 1, duration: 1.2, ease: 'expo.inOut' }, '-=1')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, '-=0.8')
        .to('.metric-block', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' }, '-=0.8');

      // Subtle grain animation for premium feel
      gsap.to('.grain-texture', {
        backgroundPosition: '10px 10px',
        duration: 0.4,
        repeat: -1,
        ease: 'none'
      });

    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#Fbfafc] text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
    >
      {/* ─── Architectural Atmosphere Background ─── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* 1. Base Image - Desaturated, highly legible */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-[0.80] mix-blend-multiply"
          style={{ backgroundImage: 'url(/generated_bg_2.jpg)' }}
        />
        
        {/* 2. Ivory/White Smoke Dominance (70%) */}
        <div className="absolute inset-0 bg-[#Fbfafc]/60 backdrop-blur-[6px]" />
        
        {/* 3. Neutral Transitions (Timberwolf) */}
        <div className="bg-layer absolute inset-0 bg-gradient-to-br from-[#dcdad2]/30 via-transparent to-[#dcdad2]/10" />
        
        {/* 4. Atmospheric Depth (Pale Mauve - Linear, precise) */}
        <div className="bg-layer absolute top-0 left-0 w-[60%] h-full bg-gradient-to-r from-[rgba(70,29,76,0.12)] to-transparent mix-blend-multiply" />
        
        {/* 5. Warm Accent (Champagne Gold near horizon) */}
        <div className="bg-layer absolute bottom-[20%] right-0 w-[70%] h-[60%] bg-gradient-to-tl from-[rgba(202,148,47,0.12)] to-transparent mix-blend-overlay" />
        
        {/* 6. Structural Fog gradient rising from bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#Fbfafc] via-[#Fbfafc]/80 to-transparent" />

        {/* 7. Animated Grain Texture */}
        <div
          className="grain-texture absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─── Main Typography Region ─── */}
      <div className="relative z-10 w-full flex-grow flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 pt-32 lg:pt-40 pb-16">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="max-w-4xl">
            
            {/* Kicker */}
            <div className="reveal-fade flex items-center gap-4 mb-8">
              <div className="structural-line h-[2px] w-10 bg-[var(--mauve)]" />
              <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold text-[var(--night)]">
                SGI — Dakar, Sénégal
              </span>
            </div>

            {/* Headline - Unconstrained, editorial scale */}
            <h1 className="mb-8">
              <span className="block overflow-hidden pb-2">
                <span className="reveal-text block text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                  L'excellence
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="reveal-text block text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] italic text-[var(--mauve)]" style={{ fontFamily: 'var(--font-display)' }}>
                  au sommet
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="reveal-text block text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                  du capital.
                </span>
              </span>
            </h1>

            {/* Subhead - Structural alignment */}
            <div className="reveal-fade max-w-xl mb-12 flex">
              <div className="structural-line-v w-[2px] bg-[var(--jaune-or)] mr-6 shrink-0" />
              <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-[var(--night-70)] font-medium">
                Partenaire institutionnel de référence. Nous orchestrons le courtage BRVM, les émissions primaires et l'ingénierie financière avec une précision chirurgicale.
              </p>
            </div>

            {/* CTA Group - Sharp & Structural with Delight Micro-interactions */}
            <div className="reveal-fade flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Primary CTA */}
              <a
                href="#services"
                onMouseEnter={() => setIsHoveringPrimary(true)}
                onMouseLeave={() => setIsHoveringPrimary(false)}
                className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-[var(--night)] text-white overflow-hidden transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:shadow-[var(--mauve)]/20 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
                aria-label="Découvrir l'expertise Everest Finance"
              >
                <div 
                  className="absolute inset-0 bg-[var(--mauve)] transition-transform duration-500 ease-out origin-bottom"
                  style={{ transform: isHoveringPrimary ? 'scaleY(1)' : 'scaleY(0)' }}
                />
                <span className="relative z-10 text-[11px] tracking-[0.2em] uppercase font-bold">
                  Découvrir l'expertise
                </span>
                <FiArrowRight 
                  className="relative z-10 text-sm transition-transform duration-500 ease-out"
                  style={{ transform: isHoveringPrimary ? 'translateX(4px)' : 'translateX(0)' }}
                />
              </a>
              
              {/* Secondary CTA - Rolling Icon Delight */}
              <a
                href="/auth"
                onMouseEnter={() => setIsHoveringSecondary(true)}
                onMouseLeave={() => setIsHoveringSecondary(false)}
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-bold text-[var(--night)] hover:text-[var(--mauve)] transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
                aria-label="Accéder à l'espace client"
              >
                <span className="relative overflow-hidden flex items-center justify-center w-10 h-10 border border-[var(--night-20)] group-hover:border-[var(--mauve)] transition-colors duration-300 bg-white/50 backdrop-blur-sm">
                  <FiTrendingUp 
                    className="text-sm transition-transform duration-500 ease-out"
                    style={{ transform: isHoveringSecondary ? 'translateY(-25px)' : 'translateY(0)' }}
                  />
                  <FiTrendingUp 
                    className="absolute text-sm transition-transform duration-500 ease-out"
                    style={{ transform: isHoveringSecondary ? 'translateY(0)' : 'translateY(25px)' }}
                  />
                </span>
                <span>Accès Client</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Structural Metrics Footer ─── */}
      <div className="relative z-10 w-full border-t border-[var(--night)]/10 bg-white/50 backdrop-blur-xl">
        <div className="structural-line absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[var(--night)]/10 via-[var(--night)]/10 to-transparent" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--night)]/10">
          
          {/* Metric 1: Agrément */}
          <div className="metric-block group relative py-8 md:py-10 md:pr-10 flex flex-col justify-between transition-colors duration-500 hover:bg-white/40 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)] animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-50)] group-hover:text-[var(--mauve)] transition-colors duration-300">Agrément CREPMF</span>
              </div>
              <FiShield className="text-[var(--night-20)] group-hover:text-[var(--jaune-or)] transition-colors duration-500 w-5 h-5" />
            </div>
            <div>
              <div className="text-[1.5rem] lg:text-[1.75rem] font-mono tracking-tight text-[var(--night)] mb-2">SGI/DA/2016/60</div>
              <div className="text-[13px] leading-relaxed text-[var(--night-60)] font-medium max-w-[250px]">Sécurité absolue et régulation institutionnelle.</div>
            </div>
          </div>

          {/* Metric 2: Experience */}
          <div className="metric-block group relative py-8 md:py-10 md:px-10 flex flex-col justify-between transition-colors duration-500 hover:bg-white/40 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-50)] group-hover:text-[var(--mauve)] transition-colors duration-300">Track Record</span>
              <div className="text-[10px] font-mono tracking-wider text-[var(--night-40)] group-hover:text-[var(--night-60)] transition-colors">2016—2024</div>
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-[2.5rem] lg:text-[3rem] leading-none text-[var(--night)] font-medium" style={{ fontFamily: 'var(--font-display-aptos)' }}>08</span>
                <span className="text-[var(--night-60)] text-[13px] font-bold uppercase tracking-wider">ans</span>
              </div>
              <div className="text-[13px] leading-relaxed text-[var(--night-60)] font-medium max-w-[250px]">D'excellence sur le marché de l'UEMOA.</div>
            </div>
          </div>

          {/* Metric 3: Expertise (Highlight) */}
          <div className="metric-block group relative py-8 md:py-10 md:pl-10 flex flex-col justify-between transition-all duration-500 -mx-6 px-6 md:mx-0 md:px-0 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--mauve)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
            
            <div className="relative z-10 flex items-center justify-between mb-8 md:mb-12">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-50)] group-hover:text-white/80 transition-colors duration-300">Expertise Cumulée</span>
              <FiActivity className="text-[var(--night-20)] group-hover:text-[var(--jaune-or)] transition-colors duration-500 w-5 h-5" />
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-[2.5rem] lg:text-[3rem] leading-none text-[var(--night)] group-hover:text-white font-medium transition-colors duration-300" style={{ fontFamily: 'var(--font-display-aptos)' }}>30</span>
                <span className="text-[1.5rem] text-[var(--jaune-or)] leading-none">+</span>
                <span className="text-[var(--night-60)] group-hover:text-white/80 text-[13px] font-bold uppercase tracking-wider transition-colors duration-300 ml-1">ans</span>
              </div>
              <div className="text-[13px] leading-relaxed text-[var(--night-60)] group-hover:text-white/80 font-medium transition-colors duration-300 max-w-[250px]">De maîtrise totale des marchés financiers.</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


