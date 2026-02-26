import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // GSAP UI Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set('.hero-reveal', { y: 40, opacity: 0 });
      gsap.set('.hero-canvas', { opacity: 0 });
      gsap.set('.hero-line', { scaleY: 0, transformOrigin: 'top' });

      tl.to('.hero-canvas', { opacity: 1, duration: 3, ease: 'power2.inOut' })
        .to('.hero-line', { scaleY: 1, duration: 1.5, ease: 'power4.inOut' }, '-=2')
        .to('.hero-reveal', { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }, '-=1.2');

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[100svh] w-full flex items-center bg-[var(--night)] text-white font-primary overflow-hidden selection:bg-[var(--gold-metallic)] selection:text-[var(--night)]"
    >
      {/* ─── Cinematic Video Background ─── */}
      <div className="hero-canvas absolute inset-0 w-full h-full z-0">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        >
          <source src="/kling_video.mp4" type="video/mp4" />
        </video>
        {/* Multi-layer gradient overlay for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/70 to-[var(--night)]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--night)]/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ─── Editorial Layout Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px] mt-16 md:mt-24 lg:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 pt-12 pb-24 relative">
            {/* Structural vertical line */}
            <div className="hero-line absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--gold-metallic)] via-white/10 to-transparent hidden md:block" />
            
            <div className="md:pl-12">
              <div className="hero-reveal flex items-center gap-4 mb-6">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--gold-metallic)]">
                  Société de Gestion et d'Intermédiation
                </span>
              </div>
              
              <h1 className="hero-reveal font-display text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6rem] leading-[0.95] tracking-tight mb-8 text-white">
                Élevez vos ambitions<br />
                <span className="font-serif italic font-light text-[var(--gold-light)]">vers les sommets.</span>
              </h1>
              
              <p className="hero-reveal text-base md:text-lg leading-relaxed text-white/60 font-light max-w-xl mb-10">
                Votre partenaire d'excellence pour le courtage BRVM, les émissions primaires 
                et l'ingénierie financière en Afrique de l'Ouest.
              </p>
              
              <div className="hero-reveal">
                <a 
                  href="#solutions"
                  className="group inline-flex items-center justify-center gap-6 px-0 py-2 text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-[var(--gold-metallic)] transition-colors"
                >
                  <span className="relative overflow-hidden">
                    Découvrir notre expertise
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--gold-metallic)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--gold-metallic)] transition-colors">
                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Stark Metrics Bar ─── */}
      <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-[var(--night)]/80 backdrop-blur-md">
        <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto">
          
          <div className="hero-reveal flex-1 py-6 px-6 md:px-12 border-b md:border-b-0 md:border-r border-white/10 flex items-baseline gap-4">
            <div className="font-display text-3xl lg:text-4xl tracking-tighter text-white">08</div>
            <div className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Années d'expérience</div>
          </div>

          <div className="hero-reveal flex-1 py-6 px-6 md:px-12 border-b md:border-b-0 md:border-r border-white/10 flex items-center gap-4">
            <div className="w-2 h-2 bg-[var(--gold-metallic)] rounded-full animate-pulse" />
            <div>
              <div className="text-[9px] font-bold tracking-[0.2em] text-[var(--gold-metallic)] uppercase mb-1">Agrément CREPMF</div>
              <div className="font-mono text-xs text-white/60">SGI/DA/2016/60</div>
            </div>
          </div>

          <div className="hero-reveal flex-1 py-6 px-6 md:px-12 flex items-baseline gap-4">
            <div className="font-display text-3xl lg:text-4xl tracking-tighter text-white">30<span className="text-[var(--gold-metallic)]">+</span></div>
            <div className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Années d'expertise</div>
          </div>

        </div>
      </div>

    </section>
  );
};
