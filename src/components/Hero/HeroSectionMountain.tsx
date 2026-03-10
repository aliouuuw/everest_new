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
      className="relative min-h-[100svh] w-full flex items-end overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
      style={{ background: 'linear-gradient(160deg, #f7f4fb 0%, #faf6ef 45%, #f5f5f5 100%)' }}
    >
      {/* ─── Light Glassy Background Architecture ─── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        
        {/* 1. Base: soft mauve-tinted warm white */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #f0eaf5 0%, #faf6ef 50%, #f5f5f5 100%)' }} />

        {/* 2. Mauve depth orb — upper left, dominant brand anchor */}
        <div
          className="hero-glass-veil-1 absolute top-[-15%] left-[-8%] w-[55%] h-[65%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(70,29,76,0.18) 0%, rgba(70,29,76,0.06) 55%, transparent 80%)', filter: 'blur(80px)' }}
        />

        {/* 3. Gold warmth orb — lower right, accent anchor */}
        <div
          className="hero-glass-veil-2 absolute bottom-[5%] right-[-8%] w-[50%] h-[60%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(202,148,47,0.14) 0%, rgba(202,148,47,0.05) 50%, transparent 75%)', filter: 'blur(90px)' }}
        />

        {/* 4. Mountain Plate — layered abstract ridgelines */}
        <div className="hero-mountain-plate absolute bottom-0 left-0 w-full" style={{ height: '60%' }}>
          <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
            {/* Far ridge — deep mauve */}
            <path fill="rgba(70,29,76,0.10)" d="M0,180L80,162C160,144,320,108,480,108C640,108,800,144,960,153C1120,162,1280,144,1360,135L1440,126L1440,400L1360,400C1280,400,1120,400,960,400C800,400,640,400,480,400C320,400,160,400,80,400L0,400Z" />
            {/* Mid ridge — mauve lighter */}
            <path fill="rgba(70,29,76,0.07)" d="M0,230L60,218C120,206,240,182,360,179C480,176,600,194,720,208C840,222,960,232,1080,220C1200,208,1320,174,1380,157L1440,140L1440,400L1380,400C1320,400,1200,400,1080,400C960,400,840,400,720,400C600,400,480,400,360,400C240,400,120,400,60,400L0,400Z" />
            {/* Near ridge — timberwolf */}
            <path fill="rgba(220,218,210,0.45)" d="M0,290L80,275C160,260,320,230,480,228C640,226,800,252,960,258C1120,264,1280,250,1360,243L1440,236L1440,400L1360,400C1280,400,1120,400,960,400C800,400,640,400,480,400C320,400,160,400,80,400L0,400Z" />
            {/* Foreground — gold-tinted base */}
            <path fill="rgba(202,148,47,0.06)" d="M0,330L80,322C160,314,320,298,480,298C640,298,800,314,960,318C1120,322,1280,314,1360,310L1440,306L1440,400L1360,400C1280,400,1120,400,960,400C800,400,640,400,480,400C320,400,160,400,80,400L0,400Z" />
          </svg>
        </div>

        {/* 5. Atmospheric fade — bottom white lift for content readability */}
        <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-t from-white/70 to-transparent" />

        {/* 6. Noise / Grain — premium texture */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─── Editorial Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-32 md:pb-40 pt-40">
        <div className="max-w-[1400px] mx-auto flex flex-col items-start text-left">

          {/* Kicker */}
          <div className="hero-kicker mb-8 flex items-center gap-3">
            <span
              className="inline-block w-6 h-[2px]"
              style={{ background: 'linear-gradient(90deg, var(--mauve), var(--jaune-or))' }}
            />
            <span
              className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase"
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
          <div className="hero-rule mb-8 flex items-center gap-3">
            <div
              className="h-[3px] w-12"
              style={{ background: 'var(--mauve)' }}
            />
            <div
              className="h-[3px] w-6"
              style={{ background: 'var(--jaune-or)' }}
            />
            <div
              className="h-[1px] w-8"
              style={{ background: 'var(--timberwolf)' }}
            />
          </div>

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

          {/* CTA row */}
          <div className="hero-cta flex items-center gap-5">
            {/* Primary CTA — gold-filled */}
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-6 py-3.5 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, var(--mauve) 0%, #5a2462 100%)',
                boxShadow: '0 8px 32px rgba(70,29,76,0.25), 0 2px 8px rgba(70,29,76,0.15)',
              }}
            >
              <span
                className="text-[11px] tracking-[0.22em] uppercase text-white font-semibold"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Découvrir notre expertise
              </span>
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:bg-white/25">
                <FiArrowRight className="text-sm text-white" />
              </span>
            </a>
            {/* Secondary CTA — gold outline */}
            <a
              href="#services"
              className="group inline-flex items-center gap-2 transition-all duration-500 hover:gap-3"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              <span
                className="relative text-[11px] tracking-[0.18em] uppercase font-semibold"
                style={{ color: 'var(--jaune-or)' }}
              >
                Nos offres
                <span
                  className="absolute bottom-0 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                  style={{ background: 'var(--jaune-or)' }}
                />
              </span>
              <FiArrowRight className="text-xs transition-transform duration-500 group-hover:translate-x-1" style={{ color: 'var(--jaune-or)' }} />
            </a>
          </div>

        </div>
      </div>

      {/* ─── Metrics Bar ─── */}
      <div className="absolute bottom-0 left-0 w-full z-20 border-t border-[var(--mauve-15)]" style={{ background: 'rgba(247,244,251,0.85)', backdropFilter: 'blur(20px) saturate(160%)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Metric 1 */}
            <div className="hero-metric py-5 md:pr-12 border-b md:border-b-0 md:border-r border-[var(--mauve-15)] flex items-center gap-4">
              <div
                className="w-1 h-8 flex-shrink-0 rounded-full"
                style={{ background: 'linear-gradient(180deg, var(--mauve) 0%, var(--jaune-or) 100%)' }}
              />
              <div>
                <span
                  className="block text-3xl lg:text-4xl"
                  style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--mauve)' }}
                >
                  08
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--night-60)' }}>
                  Années d'expérience
                </span>
              </div>
            </div>

            {/* Metric 2 — Licence */}
            <div className="hero-metric py-5 md:px-12 border-b md:border-b-0 md:border-r border-[var(--mauve-15)] flex items-center gap-3">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(202,148,47,0.12)', border: '1px solid rgba(202,148,47,0.3)' }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--jaune-or)] animate-pulse" />
              </span>
              <div>
                <span className="block text-[10px] tracking-[0.18em] uppercase mb-0.5 font-semibold" style={{ color: 'var(--jaune-or)' }}>
                  Agrément CREPMF
                </span>
                <span className="text-xs font-mono tracking-wider" style={{ color: 'var(--night-60)' }}>
                  SGI/DA/2016/60
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="hero-metric py-5 md:pl-12 flex items-center gap-4">
              <div
                className="w-1 h-8 flex-shrink-0 rounded-full"
                style={{ background: 'linear-gradient(180deg, var(--jaune-or) 0%, var(--mauve) 100%)' }}
              />
              <div>
                <span
                  className="block text-3xl lg:text-4xl"
                  style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--mauve)' }}
                >
                  30<span style={{ color: 'var(--jaune-or)' }}>+</span>
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--night-60)' }}>
                  Années d'expertise
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

