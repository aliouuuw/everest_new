import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

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
      gsap.set('.granient-layer', { opacity: 0 });
      gsap.set('.shimmer-band', { opacity: 0, x: '-110%' });
      gsap.set('.trust-marker', { opacity: 0, y: 10 });

      // ─── Entrance choreography ───
      tl.to('.granient-layer', { opacity: 1, duration: 3, stagger: 0.2, ease: 'power2.out' })
        .to('.reveal-text', { yPercent: 0, duration: 1.4, stagger: 0.06, ease: 'expo.out' }, '-=2')
        .to('.hero-line', { scaleX: 1, duration: 1, ease: 'power3.inOut' }, '-=1')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power2.out' }, '-=0.8')
        .to('.trust-marker', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.6')
        .to('.shimmer-band', { opacity: 0.12, x: '110%', duration: 2.5, ease: 'power2.inOut' }, '-=0.5');

      // ─── Abstract Mountain Animations ───
      gsap.to('.mesh-mauve', {
        scale: 1.05, rotation: 2, x: '-2%', y: '3%',
        duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });

      gsap.to('.mesh-gold', {
        scale: 1.08, rotation: -3, x: '3%', y: '-2%',
        duration: 24, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
      
      gsap.to('.mesh-dark-mauve', {
        scale: 1.03, y: '-4%',
        duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });

      gsap.to('.mesh-white', {
        x: '5%', y: '5%', scale: 1.1,
        duration: 30, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });

      gsap.to('.grain-mask', {
        opacity: 0.9,
        duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });

      gsap.to('.shimmer-band', {
        x: '110%', duration: 6, repeat: -1, repeatDelay: 12,
        ease: 'power1.inOut',
        onRepeat: function() {
          gsap.set('.shimmer-band', { x: '-110%' });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-end bg-[#faf9f7] text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
    >
      {/* ══════════════════════════════════════════════
          GRANIENT BACKGROUND — Abstract Mountain Forms
          Using highly blurred CSS shapes + SVG noise
      ══════════════════════════════════════════════ */}
      
      {/* Base Canvas */}
      <div className="absolute inset-0 bg-[#Fbfafc] overflow-hidden">
        
        {/* SVG Noise Filter Definition */}
        <svg className="hidden">
          <filter id="granient-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.12 0" />
          </filter>
        </svg>

      {/* 1. Deep Valley */}
        <div 
          className="granient-layer mesh-dark-mauve absolute -bottom-[30%] -left-[10%] w-[120%] h-[80%] rounded-[100%]"
          style={{
            background: 'radial-gradient(ellipse at top, #3A1440 0%, transparent 70%)',
            filter: 'blur(120px)',
            opacity: 0.12,
            willChange: 'transform',
          }}
        />

        {/* 2. The Gold Ridge */}
        <div 
          className="granient-layer mesh-gold absolute top-[10%] -left-[20%] w-[80%] h-[120%] rounded-[100%]"
          style={{
            background: 'radial-gradient(ellipse at center, var(--jaune-or) 0%, rgba(202,148,47,0.4) 40%, transparent 70%)',
            filter: 'blur(140px)',
            opacity: 0.1,
            willChange: 'transform',
            transformOrigin: 'bottom right',
          }}
        />

        {/* 3. The Mauve Peak */}
        <div 
          className="granient-layer mesh-mauve absolute top-[5%] -right-[15%] w-[85%] h-[130%] rounded-[100%]"
          style={{
            background: 'radial-gradient(ellipse at center, var(--mauve) 0%, rgba(70,29,76,0.3) 40%, transparent 70%)',
            filter: 'blur(130px)',
            opacity: 0.12,
            willChange: 'transform',
            transformOrigin: 'bottom left',
          }}
        />

        {/* 4. The Light Mist */}
        <div 
          className="granient-layer mesh-white absolute -top-[10%] left-[10%] w-[80%] h-[60%] rounded-[100%]"
          style={{
            background: 'radial-gradient(ellipse at center, #FFFFFF 0%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: 0.75,
            willChange: 'transform',
          }}
        />

        {/* 5. Hard Noise Layer */}
        <div 
          className="grain-mask absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ 
            filter: 'url(#granient-noise)',
            opacity: 1,
            willChange: 'opacity',
          }}
        />
        
        {/* Fine grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Shimmer Band */}
      <div className="shimmer-band absolute inset-y-0 w-[30%] pointer-events-none z-0 will-change-transform"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(202,148,47,0.04), transparent)',
          filter: 'blur(40px)',
        }}
      />

      {/* Bottom fog */}
      <div className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to top, rgba(251,250,252,1) 0%, rgba(251,250,252,0.85) 35%, transparent 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════
          CONTENT — Monumental, single-column, generous space.
      ══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-24 pb-[clamp(3rem,8vh,6rem)] pt-[clamp(8rem,20vh,14rem)]">
        <div className="max-w-[1100px]">
          
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
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--night)] text-white overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[var(--night)]/20 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mauve)] focus-visible:ring-offset-2"
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
