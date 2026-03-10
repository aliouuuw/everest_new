import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set('.hero-bg-mountain', { scale: 1.08, opacity: 0 });
      gsap.set('.hero-glass-veil', { opacity: 0 });
      gsap.set('.hero-kicker', { y: 20, opacity: 0 });
      gsap.set('.hero-title-line', { y: '110%' });
      gsap.set('.hero-body', { y: 30, opacity: 0 });
      gsap.set('.hero-cta', { y: 20, opacity: 0 });
      gsap.set('.hero-rule', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.hero-metric', { y: 24, opacity: 0 });

      tl
        .to('.hero-bg-mountain', { scale: 1, opacity: 1, duration: 2.8, ease: 'power2.out' })
        .to('.hero-glass-veil', { opacity: 1, duration: 2.0, ease: 'power2.out' }, '-=2.2')
        .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.9 }, '-=1.6')
        .to('.hero-title-line', { y: '0%', duration: 1.5, stagger: 0.14, ease: 'power4.out' }, '-=1.2')
        .to('.hero-rule', { scaleX: 1, duration: 1.0, ease: 'power3.inOut' }, '-=0.7')
        .to('.hero-body', { y: 0, opacity: 1, duration: 1.0 }, '-=0.5')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
        .to('.hero-metric', { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.5');

      // Slow breathing animation on glass veils
      gsap.to('.hero-glass-veil-1', {
        x: 15, y: -8, duration: 12, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });
      gsap.to('.hero-glass-veil-2', {
        x: -10, y: 12, duration: 16, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });
      gsap.to('.hero-glass-veil-3', {
        x: 8, y: -6, duration: 20, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden selection:bg-[var(--mauve)] selection:text-white"
      style={{ background: 'var(--summit-ivory)' }}
    >
      {/* ─── Layer 1: Mountain Plate ─── */}
      <div className="hero-bg-mountain absolute inset-0 w-full h-full z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, 
                var(--summit-ivory) 0%, 
                transparent 25%,
                transparent 55%,
                rgba(220, 218, 210, 0.4) 75%,
                var(--summit-ivory) 100%
              )
            `,
            zIndex: 2,
          }}
        />
        {/* Abstract mountain silhouette via CSS gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 45% at 65% 70%, rgba(70, 29, 76, 0.07) 0%, transparent 70%),
              radial-gradient(ellipse 80% 35% at 40% 75%, rgba(70, 29, 76, 0.05) 0%, transparent 60%),
              radial-gradient(ellipse 60% 30% at 75% 65%, rgba(202, 148, 47, 0.04) 0%, transparent 50%),
              linear-gradient(180deg, var(--summit-ivory) 0%, var(--summit-fog) 40%, var(--summit-ivory) 100%)
            `,
            zIndex: 1,
          }}
        />
      </div>

      {/* ─── Layer 2: Atmospheric Tint ─── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            linear-gradient(170deg, 
              var(--summit-ivory) 0%, 
              rgba(70, 29, 76, 0.03) 40%, 
              rgba(202, 148, 47, 0.05) 70%, 
              var(--summit-ivory) 100%
            )
          `,
        }}
      />

      {/* ─── Layer 3: Glass Veils ─── */}
      <div className="hero-glass-veil absolute inset-0 pointer-events-none z-[2]">
        <div
          className="hero-glass-veil-1 absolute rounded-full"
          style={{
            width: '60vw', height: '50vh',
            top: '10%', left: '-10%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, rgba(250,248,244,0.3) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="hero-glass-veil-2 absolute rounded-full"
          style={{
            width: '45vw', height: '40vh',
            top: '30%', right: '-5%',
            background: 'radial-gradient(ellipse, rgba(70,29,76,0.04) 0%, rgba(202,148,47,0.03) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="hero-glass-veil-3 absolute rounded-full"
          style={{
            width: '35vw', height: '30vh',
            bottom: '20%', left: '20%',
            background: 'radial-gradient(ellipse, rgba(202,148,47,0.05) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />
      </div>

      {/* ─── Layer 4: Subtle Grain ─── */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-0 pt-[clamp(8rem,14vh,12rem)]">
        <div className="max-w-[1400px] mx-auto">

          {/* Kicker */}
          <div className="hero-kicker mb-8">
            <span
              className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
            >
              <span
                className="inline-block w-6 h-[1px]"
                style={{ background: 'var(--mauve)', opacity: 0.4 }}
              />
              Société de Gestion et d'Intermédiation
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-7">
            <span className="block overflow-hidden">
              <span
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
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
                  fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  color: 'var(--mauve)',
                }}
              >
                ambitions.
              </span>
            </span>
          </h1>

          {/* Rule */}
          <div
            className="hero-rule h-[1px] w-20 md:w-32 mb-7"
            style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
          />

          {/* Subhead */}
          <p
            className="hero-body max-w-md mb-10"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
              lineHeight: 1.8,
              color: 'var(--night-60)',
            }}
          >
            Courtage BRVM, ingénierie financière et conseil en investissement.
            Votre partenaire d'excellence en Afrique de l'Ouest.
          </p>

          {/* CTA */}
          <div className="hero-cta mb-20 md:mb-0">
            <a
              href="#services"
              className="group inline-flex items-center gap-5"
            >
              <span
                className="relative overflow-hidden text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}
              >
                Découvrir notre expertise
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--jaune-or)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
              </span>
              <span className="w-10 h-10 rounded-full border border-[var(--night)]/10 flex items-center justify-center group-hover:border-[var(--mauve)]/40 group-hover:bg-[var(--mauve)]/5 transition-all duration-500">
                <FiArrowRight className="text-sm text-[var(--night)]/50 group-hover:text-[var(--mauve)] group-hover:translate-x-0.5 transition-all duration-500" />
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* ─── Trust Metrics Bar ─── */}
      <div className="relative z-10 w-full mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div
            className="grid grid-cols-1 md:grid-cols-3 py-1"
            style={{ borderTop: '1px solid var(--command-border)' }}
          >
            {/* Metric 1 */}
            <div className="hero-metric py-6 md:pr-10 border-b md:border-b-0 md:border-r flex items-baseline gap-4" style={{ borderColor: 'var(--command-border)' }}>
              <span
                className="text-2xl lg:text-3xl"
                style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--night)' }}
              >
                08
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
              >
                Années d'expérience
              </span>
            </div>

            {/* Metric 2 — Licence */}
            <div className="hero-metric py-6 md:px-10 border-b md:border-b-0 md:border-r flex items-center gap-4" style={{ borderColor: 'var(--command-border)' }}>
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--jaune-or)' }}
              />
              <div>
                <span
                  className="block text-[9px] tracking-[0.2em] uppercase mb-0.5"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
                >
                  Agrément CREPMF
                </span>
                <span
                  className="text-[11px]"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)', letterSpacing: '0.05em' }}
                >
                  SGI/DA/2016/60
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="hero-metric py-6 md:pl-10 flex items-baseline gap-4">
              <span
                className="text-2xl lg:text-3xl"
                style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--night)' }}
              >
                30<span style={{ color: 'var(--jaune-or)' }}>+</span>
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
              >
                Années d'expertise cumulée
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
