import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiActivity, FiShield, FiTrendingUp } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
  const [isHoveringSecondary, setIsHoveringSecondary] = useState(false);
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
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial states
      gsap.set('.reveal-text', { yPercent: 110 });
      gsap.set('.reveal-fade', { opacity: 0, y: 20 });
      gsap.set('.image-mask', { clipPath: 'inset(0 0 0 100%)' });
      gsap.set('.image-inner', { scale: 1.1, transformOrigin: 'center' });
      gsap.set('.struct-line-h', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.struct-line-v', { scaleY: 0, transformOrigin: 'top' });

      tl.to('.struct-line-h', { scaleX: 1, duration: 1.5, ease: 'expo.inOut' })
        .to('.struct-line-v', { scaleY: 1, duration: 1.5, ease: 'expo.inOut' }, '<')
        .to('.image-mask', { clipPath: 'inset(0 0 0 0%)', duration: 1.8, ease: 'power3.inOut' }, '-=1.0')
        .to('.image-inner', { scale: 1, duration: 2.5, ease: 'power2.out' }, '<')
        .to('.reveal-text', { yPercent: 0, duration: 1.2, stagger: 0.1 }, '-=2.0')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, '-=1.5');

    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] w-full flex bg-[#Fbfafc] text-[var(--night)] overflow-hidden">
      
      {/* ─── Left Pillar: Pure Typography & Data ─── */}
      <div className="w-full lg:w-[55%] relative z-10 flex flex-col justify-center px-6 md:px-16 xl:px-24 pt-32 pb-20 lg:border-r border-[var(--night)]/10">
        <div className="max-w-2xl mx-auto lg:mx-0 w-full relative">

          {/* Top Structural Line */}
          <div className="struct-line-h absolute -top-12 left-0 w-16 h-[1px] bg-[var(--mauve)] hidden md:block" />

          {/* Kicker */}
          <div className="reveal-fade flex items-center gap-4 mb-8 md:mb-10">
            <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold text-[var(--night-50)]">
              SGI — Dakar, Sénégal
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-8 md:mb-10">
            <span className="block overflow-hidden pb-1">
              <span className="reveal-text block text-[clamp(3.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                L'excellence
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="reveal-text block text-[clamp(3.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] italic text-[var(--mauve)]" style={{ fontFamily: 'var(--font-display)' }}>
                au sommet
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="reveal-text block text-[clamp(3.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] text-[var(--night)]" style={{ fontFamily: 'var(--font-display)' }}>
                du capital.
              </span>
            </span>
          </h1>

          {/* Subhead & Structural Line */}
          <div className="reveal-fade flex gap-5 md:gap-6 mb-10 md:mb-12">
            <div className="struct-line-v w-[2px] bg-[var(--jaune-or)] shrink-0" />
            <p className="text-[1.05rem] md:text-[1.125rem] leading-[1.6] text-[var(--night-70)] font-medium max-w-lg">
              Partenaire institutionnel de référence. Nous orchestrons le courtage BRVM, les émissions primaires et l'ingénierie financière avec une précision chirurgicale.
            </p>
          </div>

          {/* Integrated Data Readouts */}
          <div className="reveal-fade grid grid-cols-2 gap-8 mb-10 md:mb-12 py-6 md:py-8 border-y border-[var(--night)]/5">
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-40)] mb-2 flex items-center gap-2">
                <FiShield className="text-[var(--mauve)] w-3.5 h-3.5" />
                Agrément CREPMF
              </div>
              <div className="text-[1.25rem] font-mono tracking-tight text-[var(--night)]">SGI/DA/2016/60</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-40)] mb-2 flex items-center gap-2">
                <FiActivity className="text-[var(--jaune-or)] w-3.5 h-3.5" />
                Expertise Cumulée
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[1.75rem] leading-none text-[var(--night)] font-medium" style={{ fontFamily: 'var(--font-display-aptos)' }}>30</span>
                <span className="text-[1.25rem] text-[var(--jaune-or)] leading-none">+</span>
                <span className="text-[var(--night-60)] text-[11px] font-bold uppercase tracking-wider ml-1">ans</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="reveal-fade flex flex-wrap items-center gap-6">
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

            <a
              href="/auth"
              onMouseEnter={() => setIsHoveringSecondary(true)}
              onMouseLeave={() => setIsHoveringSecondary(false)}
              className="group inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-bold text-[var(--night)] hover:text-[var(--mauve)] transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
            >
              <span className="relative overflow-hidden flex items-center justify-center w-10 h-10 border border-[var(--night-20)] group-hover:border-[var(--mauve)] transition-colors duration-300 bg-white">
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

      {/* ─── Right Monolith: Uncompromised Image Canvas ─── */}
      <div className="hidden lg:block lg:w-[45%] relative h-[100svh] bg-[var(--night)]">
        <div className="image-mask absolute inset-0 w-full h-full overflow-hidden">
          <div 
            className="image-inner absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/generated_bg_2.jpg)' }}
          />
          {/* Extremely subtle grain overlay for texture, but ZERO fading or fog gradients */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>
      </div>

    </section>
  );
};


