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
      // High-end motion language: slow, deliberate, elegant
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Initial states
      gsap.set('.reveal-text', { yPercent: 120 });
      gsap.set('.reveal-fade', { opacity: 0, y: 24 });
      gsap.set('.glass-panel', { opacity: 0, y: 32, scale: 0.98 });
      gsap.set('.bg-haze', { opacity: 0 });
      gsap.set('.hero-line', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.grain-texture', { opacity: 0 });

      tl.to('.bg-haze', { opacity: 1, duration: 2.5, ease: 'power2.inOut' })
        .to('.grain-texture', { opacity: 0.04, duration: 1.5 }, '<')
        .to('.reveal-text', { yPercent: 0, duration: 1.4, stagger: 0.08 }, '-=1.8')
        .to('.hero-line', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=1.2')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power2.out' }, '-=1')
        .to('.glass-panel', { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.1, ease: 'power2.out' }, '-=0.8');

      // Ambient floating for hazy gradients - slower, more elegant
      gsap.to('.haze-1', {
        x: '+=30',
        y: '-=20',
        scale: 1.1,
        opacity: 0.8,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      gsap.to('.haze-2', {
        x: '-=40',
        y: '+=25',
        scale: 1.15,
        opacity: 0.7,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.haze-3', {
        x: '+=20',
        y: '+=30',
        scale: 1.05,
        opacity: 0.9,
        duration: 28,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Mountain subtle reveal/breathe
      gsap.to('.mountain-plate', {
        scale: 1.05,
        opacity: 0.85,
        duration: 40,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      // Subtle grain animation for premium feel
      gsap.to('.grain-texture', {
        backgroundPosition: '100px 100px',
        duration: 8,
        repeat: -1,
        ease: 'none'
      });

      // Shimmer light band
      gsap.to('.highlight-shimmer', {
        x: '200%',
        duration: 15,
        repeat: -1,
        ease: 'power1.inOut',
        delay: 5
      });

    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-center bg-[#Fbfafc] text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
    >
      {/* ─── Base Background Image (Mountain Plate) ─── */}
      <div 
        className="mountain-plate absolute inset-0 w-full h-full z-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-[0.75] mix-blend-multiply grayscale-[30%]"
        style={{ backgroundImage: 'url(/generated_bg_2.jpg)', transformOrigin: 'center center' }}
      />

      {/* ─── Glass & Haze Overlay Layers ─── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        {/* Atmospheric Tint: Ivory to Pale Mauve with Gold Horizon */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9FA]/80 via-[#F5F3F6]/60 to-[rgba(70,29,76,0.05)] backdrop-blur-[2px]" />
        
        {/* Faint gold horizon */}
        <div className="absolute bottom-[20%] left-0 w-full h-[40%] bg-gradient-to-t from-[rgba(202,148,47,0.08)] to-transparent mix-blend-overlay" />

        {/* Glass Veils: Oversized translucent blurred shapes */}
        <div className="bg-haze haze-1 absolute top-[-15%] left-[-15%] w-[75%] h-[85%] rounded-[100%] blur-[130px]"
             style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(250,249,250,0.2) 50%, transparent 80%)', transform: 'rotate(-15deg)' }} />
        
        <div className="bg-haze haze-2 absolute bottom-[-10%] right-[-10%] w-[85%] h-[95%] rounded-[100%] blur-[150px]"
             style={{ background: 'radial-gradient(ellipse at center, rgba(70,29,76,0.08) 0%, rgba(202,148,47,0.04) 40%, transparent 75%)', transform: 'rotate(20deg)' }} />
             
        <div className="bg-haze haze-3 absolute top-[20%] right-[10%] w-[50%] h-[60%] rounded-full blur-[100px]"
             style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, transparent 70%)' }} />
             
        {/* Highlight Shimmer: Imperceptible moving light band */}
        <div className="highlight-shimmer absolute top-[-50%] left-[-100%] w-[50%] h-[200%] rotate-[35deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[30px]" />
        
        {/* Fog gradient rising from bottom - extended for better coverage */}
        <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-[#Fbfafc] via-[#Fbfafc]/95 to-transparent" />

        {/* Animated Grain Texture for premium feel - warm neutral */}
        <div
          className="grain-texture absolute inset-0 opacity-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0.9 0 1 0 0 0.85 0 0 1 0 0.8 0 0 0 0.5 0' in='noise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-24 pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Storytelling & Typography */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-start pt-4 lg:pt-8">
            
            {/* Kicker - refined spacing and visual treatment */}
            <div className="reveal-fade flex items-center gap-3 mb-6 md:mb-8">
              <div className="h-[2px] w-6 bg-gradient-to-r from-[var(--mauve)] to-[var(--jaune-or)]" />
              <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-semibold text-[var(--mauve)]">
                SGI — Dakar, Sénégal
              </span>
            </div>

            {/* Headline - refined scale and spacing for better hierarchy */}
            <h1 className="mb-6 md:mb-8">
              <span className="block overflow-hidden pb-1">
                <span className="reveal-text block text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] tracking-[-0.02em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                  L'excellence
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="reveal-text block text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] tracking-[-0.02em] italic text-[var(--mauve)]" style={{ fontFamily: 'var(--font-display)' }}>
                  au sommet
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="reveal-text block text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] tracking-[-0.02em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                  du capital.
                </span>
              </span>
            </h1>

            {/* Subhead - improved readability with better contrast */}
            <div className="reveal-fade max-w-lg mb-8 md:mb-10 border-l-[3px] border-[var(--jaune-or)]/40 pl-5">
              <p className="text-[1rem] md:text-[1.125rem] leading-[1.7] text-[var(--night-70)]">
                Partenaire institutionnel de référence. Nous orchestrons le courtage BRVM, les émissions primaires et l'ingénierie financière avec une précision chirurgicale.
              </p>
            </div>

            {/* CTA Group - refined with better interaction states */}
            <div className="reveal-fade flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 md:gap-6">
              {/* Primary CTA - sophisticated micro-interactions */}
              <a
                href="#services"
                onMouseEnter={() => setIsHoveringPrimary(true)}
                onMouseLeave={() => setIsHoveringPrimary(false)}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--night)] text-white overflow-hidden rounded-sm transition-all duration-500 ease-out hover:shadow-xl hover:shadow-[var(--mauve)]/15 active:scale-[0.98] active:duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
                aria-label="Découvrir nos services d'expertise financière"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[var(--mauve)] to-[#3A1440] transition-transform duration-500 ease-out"
                  style={{ transform: isHoveringPrimary ? 'translateY(0)' : 'translateY(100%)' }}
                />
                <span className="relative z-10 text-[11px] tracking-[0.18em] uppercase font-semibold">
                  Découvrir l'expertise
                </span>
                <FiArrowRight 
                  className="relative z-10 text-sm transition-transform duration-300 ease-out"
                  style={{ transform: isHoveringPrimary ? 'translateX(4px)' : 'translateX(0)' }}
                />
              </a>
              
              {/* Secondary CTA - refined hover treatment */}
              <a
                href="/auth"
                onMouseEnter={() => setIsHoveringSecondary(true)}
                onMouseLeave={() => setIsHoveringSecondary(false)}
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.12em] uppercase font-semibold text-[var(--night-80)] hover:text-[var(--mauve)] transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2 rounded-sm"
                aria-label="Accéder à l'espace client sécurisé"
              >
                <div 
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ease-out"
                  style={{ 
                    borderColor: isHoveringSecondary ? 'var(--mauve-40)' : 'var(--night-20)',
                    transform: isHoveringSecondary ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <FiTrendingUp 
                    className="text-sm transition-transform duration-300"
                    style={{ transform: isHoveringSecondary ? 'scale(1.1)' : 'scale(1)' }}
                  />
                </div>
                <span>Accès Client</span>
              </a>
            </div>
          </div>

          {/* Right Column: Performance & Trust Cards - refined glassmorphism */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-5 w-full max-w-md mx-auto lg:ml-auto lg:mr-0 mt-8 lg:mt-0">
            
            {/* Card 1: Trust / Agrément - enhanced with sophisticated hover */}
            <div className="glass-panel p-6 md:p-8 rounded-lg bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_4px_20px_rgba(70,29,76,0.06)] relative overflow-hidden group transition-all duration-500 ease-out hover:shadow-[0_8px_30px_rgba(70,29,76,0.1)] hover:bg-white/80">
              <div className="absolute top-0 right-0 p-5 opacity-5 group-hover:opacity-10 transition-opacity duration-700 ease-out">
                <FiShield className="w-20 h-20 text-[var(--mauve)]" />
              </div>
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)] animate-pulse" />
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--mauve)]">
                    Agrément CREPMF
                  </span>
                </div>
                <div className="text-[1.75rem] md:text-[2rem] font-mono tracking-tight text-[var(--night)]">
                  SGI/DA/2016/60
                </div>
                <p className="text-sm text-[var(--night-60)] mt-1 leading-relaxed">
                  Institution financière régulée et auditée, garantissant la sécurité absolue de vos actifs.
                </p>
              </div>
            </div>

            {/* Grid for smaller metrics - refined spacing */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {/* Card 2: Experience - refined glass effect */}
              <div className="glass-panel p-5 md:p-6 rounded-lg bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-xl border border-white/70 shadow-[0_4px_16px_rgba(70,29,76,0.04)] transition-all duration-500 ease-out hover:shadow-[0_6px_24px_rgba(70,29,76,0.08)] hover:from-white/90 hover:to-white/60">
                <div className="text-[2rem] md:text-[2.25rem] leading-none mb-1.5 text-[var(--night)] font-medium" style={{ fontFamily: 'var(--font-display-aptos)' }}>
                  08
                </div>
                <div className="text-[9px] tracking-[0.12em] uppercase font-semibold text-[var(--night-60)] leading-tight">
                  Années d'excellence
                </div>
                <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-[var(--jaune-or)]/60 to-transparent" />
              </div>

              {/* Card 3: Performance - refined with subtle pattern */}
              <div className="glass-panel p-5 md:p-6 rounded-lg bg-[var(--mauve)] text-white shadow-lg shadow-[var(--mauve)]/15 relative overflow-hidden group transition-all duration-500 ease-out hover:shadow-xl hover:shadow-[var(--mauve)]/25 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-40" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-[2rem] md:text-[2.25rem] leading-none text-white font-medium" style={{ fontFamily: 'var(--font-display-aptos)' }}>
                      30<span className="text-[var(--jaune-or)]">+</span>
                    </div>
                  </div>
                  <div className="text-[9px] tracking-[0.12em] uppercase font-semibold text-white/70 leading-tight">
                    Années d'expertise
                  </div>
                  <div className="mt-3 flex items-center justify-between text-white/50 group-hover:text-white/70 transition-colors duration-300">
                    <span className="text-[9px] uppercase tracking-wider">Cumulées</span>
                    <FiActivity className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};


