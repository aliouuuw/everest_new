import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiActivity, FiShield, FiTrendingUp } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // High-end motion language: slow, deliberate, elegant
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Initial states
      gsap.set('.reveal-text', { yPercent: 120 });
      gsap.set('.reveal-fade', { opacity: 0, y: 30 });
      gsap.set('.glass-panel', { opacity: 0, y: 40, scale: 0.98 });
      gsap.set('.bg-haze', { opacity: 0 });
      gsap.set('.hero-line', { scaleX: 0, transformOrigin: 'left' });

      tl.to('.bg-haze', { opacity: 1, duration: 3, ease: 'power2.inOut' })
        .to('.reveal-text', { yPercent: 0, duration: 1.6, stagger: 0.1 }, '-=2.0')
        .to('.hero-line', { scaleX: 1, duration: 1.5, ease: 'power4.inOut' }, '-=1.4')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, '-=1.2')
        .to('.glass-panel', { opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.15 }, '-=1.0');

      // Ambient floating for hazy gradients
      gsap.to('.haze-1', {
        x: '+=30',
        y: '-=20',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      gsap.to('.haze-2', {
        x: '-=40',
        y: '+=20',
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-center bg-[#Fbfafc] text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
    >
      {/* ─── Base Background Image ─── */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-90 mix-blend-multiply"
        style={{ backgroundImage: 'url(/generated_bg_2.jpg)' }}
      />

      {/* ─── Glass & Haze Overlay Layers ─── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Base Ivory/Fog tint to soften the image and ensure readability */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

        {/* Slow-moving luminous haze (Mauve & Gold) */}
        <div className="bg-haze haze-1 absolute top-[-10%] left-[-10%] w-[60%] h-[70%] rounded-full blur-[140px]"
             style={{ background: 'radial-gradient(circle, rgba(70,29,76,0.15) 0%, transparent 70%)' }} />
        <div className="bg-haze haze-2 absolute bottom-[-10%] right-[-5%] w-[70%] h-[80%] rounded-full blur-[150px]"
             style={{ background: 'radial-gradient(circle, rgba(202,148,47,0.12) 0%, transparent 70%)' }} />
        
        {/* Fog gradient rising from bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#Fbfafc] via-[#Fbfafc]/80 to-transparent" />

        {/* Animated Grain Texture for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Storytelling & Typography */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-start">
            
            {/* Kicker */}
            <div className="reveal-fade flex items-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-gradient-to-r from-[var(--mauve)] to-transparent" />
              <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-semibold text-[var(--mauve)]">
                SGI — Dakar, Sénégal
              </span>
            </div>

            {/* Headline - High contrast, sophisticated scale */}
            <h1 className="mb-8">
              <span className="block overflow-hidden pb-2">
                <span className="reveal-text block text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                  L'excellence
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="reveal-text block text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] italic text-[var(--mauve)]" style={{ fontFamily: 'var(--font-display)' }}>
                  au sommet
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="reveal-text block text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                  du capital.
                </span>
              </span>
            </h1>

            {/* Subhead - Breathable whitespace */}
            <div className="reveal-fade max-w-xl mb-12 border-l-2 border-[var(--jaune-or)]/30 pl-6">
              <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-[var(--night-80)] font-medium">
                Partenaire institutionnel de référence. Nous orchestrons le courtage BRVM, les émissions primaires et l'ingénierie financière avec une précision chirurgicale.
              </p>
            </div>

            {/* CTA Group */}
            <div className="reveal-fade flex flex-wrap items-center gap-6">
              <a
                href="#services"
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[var(--night)] text-white overflow-hidden rounded-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--mauve)]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--mauve)] to-[#3A1440] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 text-[11px] tracking-[0.2em] uppercase font-semibold">
                  Découvrir l'expertise
                </span>
                <FiArrowRight className="relative z-10 text-sm transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              
              <a
                href="/auth"
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--night)] hover:text-[var(--mauve)] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-[var(--night-20)] group-hover:border-[var(--mauve-30)] flex items-center justify-center transition-colors duration-300">
                  <FiTrendingUp className="text-sm" />
                </div>
                <span>Accès Client</span>
              </a>
            </div>
          </div>

          {/* Right Column: Performance & Trust Cards (Glassmorphism) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 w-full max-w-md mx-auto lg:ml-auto">
            
            {/* Card 1: Trust / Agrément */}
            <div className="glass-panel p-8 rounded-xl bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(70,29,76,0.04)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <FiShield className="w-24 h-24 text-[var(--mauve)]" />
              </div>
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--jaune-or)] animate-pulse" />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--mauve)]">
                    Agrément CREPMF
                  </span>
                </div>
                <div className="text-[2rem] font-mono tracking-tight text-[var(--night)]">
                  SGI/DA/2016/60
                </div>
                <p className="text-sm text-[var(--night-60)] mt-2">
                  Institution financière régulée et auditée, garantissant la sécurité absolue de vos actifs.
                </p>
              </div>
            </div>

            {/* Grid for smaller metrics */}
            <div className="grid grid-cols-2 gap-6">
              {/* Card 2: Experience */}
              <div className="glass-panel p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(70,29,76,0.03)]">
                <div className="text-[2.5rem] leading-none mb-2 text-[var(--night)] font-medium" style={{ fontFamily: 'var(--font-display-aptos)' }}>
                  08
                </div>
                <div className="text-[9px] tracking-[0.15em] uppercase font-semibold text-[var(--night-60)]">
                  Années d'excellence
                </div>
                <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-[var(--jaune-or)] to-transparent opacity-50" />
              </div>

              {/* Card 3: Performance */}
              <div className="glass-panel p-6 rounded-xl bg-[var(--mauve)] text-white shadow-xl shadow-[var(--mauve)]/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-[2.5rem] leading-none text-white font-medium" style={{ fontFamily: 'var(--font-display-aptos)' }}>
                      30<span className="text-[var(--jaune-or)]">+</span>
                    </div>
                  </div>
                  <div className="text-[9px] tracking-[0.15em] uppercase font-semibold text-white/80">
                    Années d'expertise
                  </div>
                  <div className="mt-4 flex items-center justify-between text-white/60 group-hover:text-white transition-colors duration-300">
                    <span className="text-[10px] uppercase tracking-wider">Cumulées</span>
                    <FiActivity className="w-4 h-4" />
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


