import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import { PillBadge } from '../ui';

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
        <div className="absolute top-0 right-[20%] w-px h-[60vh] bg-gradient-to-b from-[var(--mauve-15)] to-transparent" />
        <div className="absolute bottom-0 left-[30%] w-px h-[40vh] bg-gradient-to-t from-[var(--mauve-15)] to-transparent" />
      </div>

      {/* ─── Editorial Layout Content ─── */}
      <div className="relative z-10 w-full page-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
          
          {/* Main Headline Area (Col 1-8) */}
          <div className="md:col-span-8 relative z-10 pr-4 lg:pr-12">
            <div className="hero-reveal mb-10 md:mb-16">
              <PillBadge>Société de Gestion et d'Intermédiation</PillBadge>
            </div>
            
            <h1 className="hero-reveal luxury-heading mb-10 md:mb-0">
              Élevez vos ambitions vers de nouveaux sommets.
            </h1>
          </div>
          
          {/* Subtitle & CTA Area (Col 9-12) */}
          <div className="md:col-span-4 pb-2 md:pb-6 relative z-10">
            <div className="relative">
              {/* Structural accent - refined */}
              <div className="hero-line absolute left-0 top-0 w-full h-[1px] bg-[var(--mauve-15)]" />
              <div className="hero-line hidden md:block absolute left-0 top-0 w-[1px] h-full bg-[var(--mauve-15)]" />
              
              <div className="pt-8 md:pl-10 md:pt-10">
                <p className="hero-reveal luxury-subheading-left mb-10">
                  Votre partenaire d'excellence pour accéder aux opportunités de marché
                  et réussir vos opérations en Afrique de l'Ouest.
                </p>
                
                <div className="hero-reveal flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="btn-primary group"
                  >
                    <span>Nous contacter</span>
                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform ml-2" />
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="btn-secondary group"
                  >
                    <span>Nos services</span>
                    <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* ─── Metric Badges (Bottom Area) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-[var(--mauve-15)] pt-12 relative z-10">
          {[
            { value: '08', suffix: '+', label: "Années d'expérience" },
            { value: '30', suffix: '+', label: "Années d'expertise cumulée" },
            { value: 'UEMOA', suffix: '', label: "Zone réglementée (SGI/DA/2016/60)" }
          ].map((stat, i) => (
            <div key={i} className="hero-badge flex flex-col justify-end">
              <div className="flex items-baseline gap-2 mb-3">
                <div className="font-primary font-bold text-5xl lg:text-6xl tracking-tighter text-[var(--mauve)] numeric-tabular">
                  {stat.value}
                </div>
                {stat.suffix && (
                  <div className="text-xl lg:text-2xl font-light text-[var(--jaune-or)]">
                    {stat.suffix}
                  </div>
                )}
              </div>
              <div className="kicker text-[var(--night-60)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
