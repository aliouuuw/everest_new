import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MountainWireframe } from './MountainWireframe';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading text into spans for per-character animation
      const headingEl = headingRef.current;
      let originalHeadingText: string | null = null;
      if (headingEl) {
        originalHeadingText = headingEl.textContent || '';
        headingEl.setAttribute('data-original', originalHeadingText);
        headingEl.innerHTML = '';
        for (const ch of originalHeadingText) {
          const span = document.createElement('span');
          span.className = 'char';
          span.style.display = 'inline-block';
          span.style.willChange = 'transform, opacity, filter';
          if (ch === ' ') {
            span.textContent = '\u00A0';
          } else {
            span.textContent = ch;
          }
          headingEl.appendChild(span);
        }
      }

      // Elements to animate (excluding heading, which uses char-level animation)
      const elements = [kickerRef.current, subheadingRef.current, buttonsRef.current];
      const headingChars = headingEl?.querySelectorAll<HTMLSpanElement>('span.char') || [];

      // Initial states with subtle blur
      gsap.set(elements, { opacity: 0, y: 24, filter: 'blur(10px)' });
      gsap.set(headingChars, { opacity: 0, y: 24, filter: 'blur(10px)' });

      // Timeline: kicker -> heading chars -> subheading -> buttons
      const tl = gsap.timeline({ delay: 0.35 });
      tl.to(kickerRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'filter'
      })
      .to(headingChars, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: { each: 0.03, from: 'start' },
        ease: 'power3.out',
        clearProps: 'filter'
      }, '-=0.3')
      .to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'filter'
      }, '-=0.2')
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'filter'
      }, '-=0.2');

    }, heroRef);

    return () => {
      ctx.revert();
      const headingEl = headingRef.current;
      const original = headingEl?.getAttribute('data-original');
      if (headingEl && original !== null) {
        headingEl.textContent = original || '';
        headingEl.removeAttribute('data-original');
      }
    }; // cleanup
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden" style={{ background: 'var(--pure-white)' }}>
      {/* Background wireframe animation */}
      <div className="absolute inset-0 top-[50%]" style={{ opacity: 0.22 }}>
        <MountainWireframe
          color={0x0f1115}
          opacity={0.28}
          elevationScale={1.5}
        />
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
            <button className="btn-primary font-display tracking-wide">
              Nous contacter
            </button>

            <button className="btn-secondary font-display tracking-wide">
              Découvrir nos services
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
        <span>Licenciée CREPMF SGI/DA/2016/60</span>
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
