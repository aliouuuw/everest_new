import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set('.hero-bg-layer', { scale: 1.05, opacity: 0 });
      gsap.set('.hero-kicker', { y: 20, opacity: 0 });
      gsap.set('.hero-title-line', { y: '110%' });
      gsap.set('.hero-body', { y: 30, opacity: 0 });
      gsap.set('.hero-cta', { y: 20, opacity: 0 });
      gsap.set('.hero-rule', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.hero-metric', { y: 30, opacity: 0 });

      tl
        .to('.hero-bg-layer', { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' })
        .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.8 }, '-=1.4')
        .to('.hero-title-line', { y: '0%', duration: 1.4, stagger: 0.12, ease: 'power4.out' }, '-=1.0')
        .to('.hero-rule', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=0.8')
        .to('.hero-body', { y: 0, opacity: 1, duration: 1.0 }, '-=0.6')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .to('.hero-metric', { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, '-=0.6');

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-end bg-[#f5f5f5] text-[var(--night)] overflow-hidden selection:bg-[var(--jaune-or)] selection:text-white"
    >
      {/* ─── Light Glassy Mountain Background ─── */}
      <div className="hero-bg-layer absolute inset-0 w-full h-full z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
          style={{ backgroundImage: 'url("/background-sol.jpg")' }}
        />
        {/* Ivory to mauve gradient wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.7) 50%, rgba(70,29,76,0.08) 100%)',
          }}
        />
        {/* Soft champagne gold near horizon */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-20"
          style={{
            background: 'linear-gradient(to top, #ca942f 0%, transparent 100%)',
          }}
        />
        {/* Glass veil blur */}
        <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none" />
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─── Editorial Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-40 md:pb-44 pt-32">
        <div className="max-w-[1400px] mx-auto">

          {/* Kicker */}
          <div className="hero-kicker mb-8">
            <span
              className="inline-block text-[10px] md:text-[11px] tracking-[0.35em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
            >
              Société de Gestion et d'Intermédiation — Dakar
            </span>
          </div>

          {/* Headline — oversized serif */}
          <h1 className="mb-6">
            <span className="block overflow-hidden">
              <span
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(3rem, 9vw, 7.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  color: 'var(--night)',
                }}
              >
                Élevez vos
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: 'clamp(3rem, 9vw, 7.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  color: 'var(--jaune-or)',
                }}
              >
                ambitions.
              </span>
            </span>
          </h1>

          {/* Gold horizontal rule */}
          <div
            className="hero-rule h-[1px] w-24 md:w-40 mb-8 bg-[var(--jaune-or)]"
          />

          {/* Subhead */}
          <p
            className="hero-body max-w-lg mb-10 text-[var(--night)]/70"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              lineHeight: 1.75,
            }}
          >
            Votre partenaire d'excellence pour le courtage BRVM, les émissions primaires
            et l'ingénierie financière en Afrique de l'Ouest.
          </p>

          {/* CTA */}
          <div className="hero-cta">
            <a
              href="#services"
              className="group inline-flex items-center gap-5"
            >
              <span
                className="relative overflow-hidden text-[11px] tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--night)' }}
              >
                Découvrir notre expertise
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--night)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
              </span>
              <span className="w-11 h-11 rounded-full border border-[var(--night)]/15 flex items-center justify-center group-hover:border-[var(--night)]/40 bg-white/50 backdrop-blur-sm transition-all duration-500">
                <FiArrowRight className="text-base text-[var(--night)]/70 group-hover:text-[var(--night)] group-hover:translate-x-0.5 transition-all duration-500" />
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
