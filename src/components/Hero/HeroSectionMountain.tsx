import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiActivity, FiShield } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
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
      // High-end motion language: sharp, precise, editorial
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial states
      gsap.set('.reveal-text', { yPercent: 120 });
      gsap.set('.reveal-fade', { opacity: 0, y: 20 });
      gsap.set('.image-canvas', { clipPath: 'inset(100% 0 0 0)' });
      gsap.set('.image-inner', { scale: 1.15 });
      gsap.set('.marginalia', { opacity: 0, x: -20 });

      tl.to('.image-canvas', { clipPath: 'inset(0% 0 0 0)', duration: 1.8, ease: 'expo.inOut' })
        .to('.image-inner', { scale: 1, duration: 2.2, ease: 'power3.out' }, '<')
        .to('.reveal-text', { yPercent: 0, duration: 1.4, stagger: 0.1 }, '-=1.4')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, '-=1')
        .to('.marginalia', { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }, '-=0.8');

    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-center bg-[#Fbfafc] text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)] pt-24 pb-12"
    >
      <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 px-6 md:px-12 lg:px-16 xl:px-24 h-full items-stretch">
        
        {/* Left Column: Typography & Storytelling */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center py-12 lg:py-24 relative z-10 lg:pr-12">
          
          <div className="marginalia flex items-center gap-4 mb-10 md:mb-12">
            <div className="w-1.5 h-1.5 bg-[var(--mauve)]" />
            <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold text-[var(--night-60)]">
              SGI — Dakar, Sénégal
            </span>
          </div>

          <h1 className="mb-10">
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

          <div className="reveal-fade max-w-md mb-12">
            <p className="text-[1.05rem] md:text-[1.125rem] leading-[1.7] text-[var(--night-70)] font-medium">
              Partenaire institutionnel de référence. Nous orchestrons le courtage BRVM, les émissions primaires et l'ingénierie financière avec une précision chirurgicale.
            </p>
          </div>

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

        {/* Right Column: Editorial Image Canvas & Marginalia */}
        <div className="col-span-1 lg:col-span-6 relative min-h-[500px] lg:min-h-[700px] w-full flex flex-col justify-end mt-8 lg:mt-0">
          
          {/* The Main Canvas - Sharp edges, no blur, bleeds right */}
          <div className="image-canvas absolute inset-0 w-full h-full lg:w-[120vw] overflow-hidden bg-[var(--night)]/5">
            <div 
              className="image-inner absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/generated_bg_2.jpg)' }}
            />
            {/* Subtle gradient purely to ground the brutalist card, no full-screen haze */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Brutalist Data Readouts (Overlapping the image edge) */}
          <div className="relative z-10 w-full max-w-md ml-auto bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] -mb-8 lg:mb-12 lg:-ml-12 border-l-4 border-[var(--mauve)] reveal-fade">
            
            <div className="flex justify-between items-end mb-8 pb-8 border-b border-[var(--night)]/10 group">
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--mauve)] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--jaune-or)]" />
                  Agrément CREPMF
                </div>
                <div className="text-[1.5rem] font-mono tracking-tight text-[var(--night)] transition-colors duration-300 group-hover:text-[var(--mauve)]">SGI/DA/2016/60</div>
              </div>
              <FiShield className="text-[var(--night-20)] w-6 h-6 transition-colors duration-300 group-hover:text-[var(--jaune-or)]" />
            </div>

            <div className="flex justify-between items-end group">
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--night-50)] mb-2">
                  Expertise Cumulée
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[2.5rem] leading-none text-[var(--night)] font-medium transition-colors duration-300 group-hover:text-[var(--mauve)]" style={{ fontFamily: 'var(--font-display-aptos)' }}>30</span>
                  <span className="text-[1.5rem] text-[var(--jaune-or)] leading-none">+</span>
                  <span className="text-[var(--night-60)] text-[12px] font-bold uppercase tracking-wider ml-1">ans</span>
                </div>
              </div>
              <FiActivity className="text-[var(--night-20)] w-6 h-6 transition-colors duration-300 group-hover:text-[var(--jaune-or)]" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


