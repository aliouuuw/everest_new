import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial states
      gsap.set('.hero-glass-veil-1', { xPercent: -10, yPercent: 10, scale: 1.1 });
      gsap.set('.hero-glass-veil-2', { xPercent: 10, yPercent: -10, scale: 1.1 });
      gsap.set('.hero-mountain-plate', { scale: 1.05, opacity: 0 });
      gsap.set('.hero-kicker', { y: 20, opacity: 0 });
      gsap.set('.hero-title-line', { y: '110%' });
      gsap.set('.hero-body', { y: 30, opacity: 0 });
      gsap.set('.hero-cta', { y: 20, opacity: 0 });
      gsap.set('.hero-rule', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.hero-metric', { y: 30, opacity: 0 });

      // Entrance animation
      tl
        .to('.hero-mountain-plate', { scale: 1, opacity: 0.8, duration: 3, ease: 'power2.out' })
        .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.8 }, '-=2.0')
        .to('.hero-title-line', { y: '0%', duration: 1.4, stagger: 0.12, ease: 'power4.out' }, '-=1.6')
        .to('.hero-rule', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=1.4')
        .to('.hero-body', { y: 0, opacity: 1, duration: 1.0 }, '-=1.2')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.8 }, '-=1.1')
        .to('.hero-metric', { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, '-=1.2');

      // Continuous ambient animations for glass veils
      gsap.to('.hero-glass-veil-1', {
        xPercent: 5,
        yPercent: -5,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      gsap.to('.hero-glass-veil-2', {
        xPercent: -5,
        yPercent: 5,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-end bg-[var(--pure-white)] text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
    >
      {/* ─── Light Glassy Background Architecture ─── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[var(--pure-white)]">
        
        {/* 1. Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--white-smoke)] to-[var(--pure-white)]" />

        {/* 2. Mountain Plate (Abstract SVG) */}
        <div className="hero-mountain-plate absolute bottom-0 left-0 w-full h-[65%] opacity-80 flex items-end translate-y-[10%]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path fill="var(--mauve-05)" d="M0,160L48,170.7C96,181,192,192,288,181.3C384,171,480,139,576,138.7C672,139,768,171,864,186.7C960,203,1056,192,1152,165.3C1248,139,1344,96,1392,74.7L1440,53.3L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="var(--timberwolf)" fillOpacity="0.3" d="M0,224L60,202.7C120,181,240,139,360,138.7C480,139,600,181,720,202.7C840,224,960,224,1080,202.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            <path fill="var(--jaune-or-05)" d="M0,256L80,245.3C160,235,320,213,480,213.3C640,213,800,235,960,234.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

        {/* 3. Atmospheric Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--white-smoke)] via-[var(--mauve-05)] to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[var(--pure-white)] to-transparent" />

        {/* 4. Glass Veils */}
        <div className="hero-glass-veil-1 absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--mauve-10)] blur-[100px]" />
        <div className="hero-glass-veil-2 absolute bottom-[10%] right-[-5%] w-[50%] h-[70%] rounded-full bg-[var(--jaune-or-10)] blur-[120px]" />

        {/* 5. Noise / Grain */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Frost / Glass layer over mountain */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-white/20" />
      </div>

      {/* ─── Editorial Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-32 md:pb-40 pt-40">
        <div className="max-w-[1400px] mx-auto flex flex-col items-start text-left">

          {/* Kicker */}
          <div className="hero-kicker mb-8">
            <span
              className="inline-block px-3 py-1 rounded-full border border-[var(--mauve-15)] bg-[var(--white-smoke)] text-[10px] md:text-[11px] tracking-[0.25em] uppercase shadow-sm"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--mauve)' }}
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
                  fontWeight: 400,
                  fontSize: 'clamp(3rem, 8vw, 6.5rem)',
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
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  color: 'var(--jaune-or)',
                }}
              >
                ambitions.
              </span>
            </span>
          </h1>

          {/* Mauve/Gold horizontal rule */}
          <div
            className="hero-rule h-[2px] w-24 md:w-32 mb-8"
            style={{ background: 'linear-gradient(90deg, var(--mauve), var(--jaune-or))' }}
          />

          {/* Subhead */}
          <p
            className="hero-body max-w-lg mb-10"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              lineHeight: 1.75,
              color: 'var(--night-80)',
            }}
          >
            Votre partenaire d'excellence pour le courtage BRVM, les émissions primaires
            et l'ingénierie financière en Afrique de l'Ouest.
          </p>

          {/* CTA */}
          <div className="hero-cta">
            <a
              href="#services"
              className="group inline-flex items-center gap-5 btn-primary shadow-xl shadow-[var(--mauve-15)]"
            >
              <span
                className="relative overflow-hidden text-[12px] tracking-[0.2em] uppercase font-semibold text-white"
              >
                Découvrir notre expertise
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1">
                <FiArrowRight className="text-base text-white" />
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* ─── Metrics Bar ─── */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-white/60 backdrop-blur-xl border-t border-[var(--mauve-10)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Metric 1 */}
            <div className="hero-metric py-6 md:pr-12 border-b md:border-b-0 md:border-r border-[var(--mauve-10)] flex items-baseline gap-4">
              <span
                className="text-3xl lg:text-4xl text-[var(--mauve)]"
                style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, letterSpacing: '-0.02em' }}
              >
                08
              </span>
              <span
                className="text-[10px] tracking-[0.15em] uppercase font-medium text-[var(--night-60)]"
              >
                Années d'expérience
              </span>
            </div>

            {/* Metric 2 — Licence */}
            <div className="hero-metric py-6 md:px-12 border-b md:border-b-0 md:border-r border-[var(--mauve-10)] flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-[var(--jaune-or)] animate-pulse flex-shrink-0" />
              <div>
                <span
                  className="block text-[10px] tracking-[0.15em] uppercase mb-0.5 font-medium text-[var(--night-80)]"
                >
                  Agrément CREPMF
                </span>
                <span
                  className="text-xs font-mono text-[var(--night-60)] tracking-wider"
                >
                  SGI/DA/2016/60
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="hero-metric py-6 md:pl-12 flex items-baseline gap-4">
              <span
                className="text-3xl lg:text-4xl text-[var(--mauve)]"
                style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, letterSpacing: '-0.02em' }}
              >
                30<span className="text-[var(--jaune-or)]">+</span>
              </span>
              <span
                className="text-[10px] tracking-[0.15em] uppercase font-medium text-[var(--night-60)]"
              >
                Années d'expertise
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

