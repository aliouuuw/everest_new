import { Suspense, lazy, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenisContext } from '../Hooks/useLenisContext.tsx';

// Lazy load the heavy Three.js component
const MountainWireframe = lazy(() => import('./MountainWireframe').then(m => ({ default: m.MountainWireframe })));

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const { lenis, scrollTo, isReady } = useLenisContext();
  const heroRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configure ScrollTrigger to work with Lenis only when ready
    if (lenis && isReady) {
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length && value !== undefined
            ? lenis.scrollTo(value, { duration: 0 })
            : lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        }
      });

      // Update ScrollTrigger when Lenis scrolls
      lenis.on('scroll', ScrollTrigger.update);

      // Refresh ScrollTrigger on resize
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        lenis.off('scroll', ScrollTrigger.update);
      };
    }
  }, [lenis, isReady]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elements to animate with simpler animations
      const elements = [kickerRef.current, headingRef.current, subheadingRef.current, buttonsRef.current];

      // Initial states with subtle blur
      gsap.set(elements, { opacity: 0, y: 30, filter: 'blur(8px)' });

      // Timeline with staggered entrance - much more performant
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(kickerRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'filter'
      })
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'filter'
      }, '-=0.4')
      .to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'filter'
      }, '-=0.3')
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'filter'
      }, '-=0.3');

    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden" style={{ background: 'var(--pure-white)' }}>
      {/* Background wireframe animation */}
      <div className="absolute inset-0 top-[50%]" style={{ opacity: 0.25 }}>
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />}>
          <MountainWireframe
            color={0x0f1115}
            opacity={0.35}
            elevationScale={1.8}
            rotateSpeed={0.003}
            parallaxStrength={0.1}
          />
        </Suspense>
      </div>

      {/* Subtle gradient for depth */}
      <div className="absolute inset-0 gradient-gold-subtle opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen justify-center items-center">
        <div className="text-center px-6 max-w-3xl mx-auto">
          <span ref={kickerRef} className="kicker opacity-70 text-gradient-gold">Société de Gestion et d'Intermédiation</span>
          <h1 ref={headingRef} className="luxury-heading mt-4 mb-6">
            Élevez vos ambitions vers de nouveaux sommets
          </h1>

          <p ref={subheadingRef} className="luxury-subheading mb-10">
            Votre partenaire de confiance pour le courtage BRVM, les émissions primaires et l'ingénierie financière.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
            <button
              className="btn-primary font-display tracking-wide"
              onClick={() => {
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  scrollTo(contactElement, { offset: -80 });
                }
              }}
            >
              Nous contacter
            </button>

            <button
              className="btn-secondary font-display tracking-wide"
              onClick={() => {
                const servicesElement = document.getElementById('services');
                if (servicesElement) {
                  scrollTo(servicesElement, { offset: -80 });
                }
              }}
            >
              Découvrir nos offres
            </button>
          </div>
        </div>
      </div>

      {/* Light grid overlay */}
      <div className="absolute inset-0" style={{ opacity: 0.06 }}>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`,
            backgroundSize: '88px 88px'
          }}
        />
      </div>

      {/* Remove floating elements for a cleaner composition */}

      {/* License information - bottom left */}
      <div className="absolute bottom-8 left-8 text-xs text-[var(--night-80)] opacity-60 z-10">
        <span>Agrément n° SGI /DA/2016/60</span>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" style={{ color: 'var(--gold-dark)' }}>
        <div className="flex flex-col items-center px-3 py-2 rounded-full border border-current/20 bg-white/60 backdrop-blur">
          <div className="w-5 h-8 border border-current rounded-full flex justify-center opacity-70">
            <div className="w-0.5 h-2 bg-current rounded-full mt-1.5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
