import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';

export const HeroSectionPro: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a sophisticated, staggered entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state
      gsap.set('.hero-reveal', { y: 40, opacity: 0, filter: 'blur(10px)' });
      gsap.set('.hero-line', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.hero-badge', { scale: 0.9, opacity: 0 });
      gsap.set('.hero-bg-element', { scale: 1.1, opacity: 0 });

      // Background elements fade in slowly
      tl.to('.hero-bg-element', {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.2
      })
      
      // Lines extend
      .to('.hero-line', {
        scaleX: 1,
        duration: 1.2,
        stagger: 0.1
      }, '-=1.5')

      // Content reveals sequentially
      .to('.hero-reveal', {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.15
      }, '-=1.2')

      // Badges pop in
      .to('.hero-badge', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      }, '-=1');

      // Continuous subtle motion for atmospheric background
      gsap.to('.hero-ambient-gradient', {
        backgroundPosition: '100% 100%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[100svh] w-full flex items-end pb-20 pt-40 bg-[var(--pure-white)] text-[var(--night)] font-primary overflow-hidden"
    >
      {/* ─── Sophisticated Background Atmosphere ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle textural noise */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />
        
        {/* Ambient gradient orbs (replacing toyish mountains with pure abstraction) */}
        <div 
          className="hero-bg-element hero-ambient-gradient absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-40 mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle, var(--jaune-or-light) 0%, transparent 70%)',
            backgroundSize: '200% 200%'
          }}
        />
        <div 
          className="hero-bg-element hero-ambient-gradient absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-[0.15] mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle, var(--mauve) 0%, transparent 70%)',
            backgroundSize: '200% 200%'
          }}
        />

        {/* Structural architectural lines */}
        <div className="absolute top-0 right-[20%] w-px h-[60vh] bg-gradient-to-b from-black/10 to-transparent" />
        <div className="absolute bottom-0 left-[30%] w-px h-[40vh] bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* ─── Editorial Layout Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
          
          {/* Main Headline Area (Col 1-8) */}
          <div className="md:col-span-8 relative">
            <div className="hero-reveal flex items-center gap-4 mb-12">
              <div className="hero-line w-12 h-px bg-[var(--jaune-or)]" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
                Société de Gestion et d'Intermédiation
              </span>
            </div>
            
            <h1 className="hero-reveal font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.92] tracking-tight mb-8">
              Élevez vos ambitions vers de nouveaux <i className="font-serif italic text-[var(--jaune-or)] pr-2">sommets.</i>
            </h1>
          </div>
          
          {/* Subtitle & CTA Area (Col 9-12) */}
          <div className="md:col-span-4 pb-4">
            <div className="relative">
              {/* Structural accent */}
              <div className="hero-line absolute left-0 top-0 w-full h-px bg-black/10" />
              <div className="hero-line absolute left-0 top-0 w-px h-full bg-black/10" />
              
              <div className="pl-8 pt-8">
                <p className="hero-reveal text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.8)] font-light mb-10">
                  Votre partenaire d'excellence pour le courtage BRVM, les émissions primaires 
                  et l'ingénierie financière structurée en Afrique de l'Ouest.
                </p>
                
                <div className="hero-reveal flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="group inline-flex items-center justify-center gap-4 px-8 py-4 bg-[var(--night)] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-[var(--jaune-or)]"
                  >
                    <span>Nous contacter</span>
                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="group inline-flex items-center justify-center gap-4 px-8 py-4 border border-black/10 text-[var(--night)] text-xs font-bold tracking-[0.2em] uppercase transition-all hover:border-[var(--jaune-or)]"
                  >
                    <span>Nos services</span>
                    <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* ─── Metric Badges (Bottom Area) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-black/10 pt-12">
          {[
            { value: '08', suffix: '+', label: "Années d'expérience" },
            { value: '30', suffix: '+', label: "Années d'expertise cumulée" },
            { value: 'UEMOA', suffix: '', label: "Zone réglementée (SGI/DA/2016/60)" }
          ].map((stat, i) => (
            <div key={i} className="hero-badge flex flex-col justify-end">
              <div className="flex items-baseline gap-2 mb-2">
                <div className="font-display text-4xl md:text-5xl tracking-tighter text-[var(--night)]">
                  {stat.value}
                </div>
                {stat.suffix && (
                  <div className="text-sm font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase">
                    {stat.suffix}
                  </div>
                )}
              </div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-[rgba(10, 10, 10, 0.8)] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
