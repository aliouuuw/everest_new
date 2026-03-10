import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

const heroCapabilities = [
  {
    label: 'Marchés régionaux',
    value: 'Courtage BRVM et accès au marché UEMOA.',
  },
  {
    label: 'Structuration',
    value: 'Émissions, levées de fonds et ingénierie financière.',
  },
  {
    label: 'Gestion',
    value: 'Mandats, allocation et accompagnement patrimonial.',
  },
];

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([
          '.hero-bg-image',
          '.hero-bg-haze',
          '.hero-glass-veil',
          '.hero-kicker',
          '.hero-title-line',
          '.hero-body',
          '.hero-cta',
          '.hero-rule',
          '.hero-dossier',
          '.hero-chip',
          '.hero-panel-row',
          '.hero-metric',
        ], { clearProps: 'all' });

        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set('.hero-bg-image', { scale: 1.06, opacity: 0 });
      gsap.set('.hero-bg-haze', { opacity: 0 });
      gsap.set('.hero-glass-veil', { opacity: 0 });
      gsap.set('.hero-kicker', { y: 20, opacity: 0 });
      gsap.set('.hero-title-line', { y: '108%' });
      gsap.set('.hero-body', { y: 24, opacity: 0 });
      gsap.set('.hero-cta', { y: 18, opacity: 0 });
      gsap.set('.hero-rule', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.hero-dossier', { y: 36, opacity: 0, rotateX: 4 });
      gsap.set('.hero-chip', { y: 16, opacity: 0 });
      gsap.set('.hero-panel-row', { y: 16, opacity: 0 });
      gsap.set('.hero-metric', { y: 24, opacity: 0 });

      tl
        .to('.hero-bg-image', { scale: 1, opacity: 1, duration: 2.6, ease: 'power2.out' })
        .to('.hero-bg-haze', { opacity: 1, duration: 1.8, ease: 'power2.out' }, '-=2.0')
        .to('.hero-glass-veil', { opacity: 1, duration: 1.8, ease: 'power2.out' }, '-=1.6')
        .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.8 }, '-=1.3')
        .to('.hero-title-line', { y: '0%', duration: 1.35, stagger: 0.12, ease: 'power4.out' }, '-=1.0')
        .to('.hero-rule', { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.7')
        .to('.hero-body', { y: 0, opacity: 1, duration: 0.9 }, '-=0.55')
        .to('.hero-chip', { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.45')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .to('.hero-dossier', { y: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: 'power3.out' }, '-=0.8')
        .to('.hero-panel-row', { y: 0, opacity: 1, duration: 0.75, stagger: 0.08 }, '-=0.55')
        .to('.hero-metric', { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 }, '-=0.5');

      gsap.to('.hero-glass-veil-1', {
        x: 18,
        y: -10,
        duration: 14,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.to('.hero-glass-veil-2', {
        x: -12,
        y: 14,
        duration: 18,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.to('.hero-bg-image-asset', {
        scale: 1.05,
        duration: 20,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.to('.hero-dossier', {
        y: -6,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.2,
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
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div
          className="hero-bg-image absolute inset-y-0 right-0 w-full lg:w-[64%]"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 16%, rgba(0,0,0,0.95) 35%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 16%, rgba(0,0,0,0.95) 35%)',
          }}
        >
          <img
            src="/generated_bg.jpg"
            alt=""
            aria-hidden="true"
            className="hero-bg-image-asset h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 38%, rgba(22,18,28,0.18) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 88px)',
              opacity: 0.18,
            }}
          />
        </div>
      </div>

      {/* ─── Layer 2: Atmospheric Tint ─── */}
      <div
        className="hero-bg-haze absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(19,15,27,0.45) 0%, rgba(19,15,27,0.18) 7rem, rgba(250,248,244,0.82) 11rem, rgba(250,248,244,0.94) 36%, rgba(250,248,244,0.82) 58%, rgba(250,248,244,0.55) 74%, rgba(250,248,244,0.9) 100%), linear-gradient(90deg, var(--summit-ivory) 0%, rgba(250,248,244,0.98) 28%, rgba(250,248,244,0.84) 46%, rgba(250,248,244,0.32) 72%, transparent 100%)',
        }}
      />

      {/* ─── Layer 3: Glass Veils ─── */}
      <div className="hero-glass-veil absolute inset-0 pointer-events-none z-[2]">
        <div
          className="hero-glass-veil-1 absolute rounded-full"
          style={{
            width: '54vw',
            height: '42vh',
            top: '10%',
            left: '-8%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.58) 0%, rgba(250,248,244,0.24) 42%, transparent 72%)',
            filter: 'blur(68px)',
          }}
        />
        <div
          className="hero-glass-veil-2 absolute rounded-full"
          style={{
            width: '42vw',
            height: '34vh',
            top: '34%',
            right: '-4%',
            background: 'radial-gradient(ellipse, rgba(70,29,76,0.06) 0%, rgba(202,148,47,0.05) 38%, transparent 72%)',
            filter: 'blur(56px)',
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
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-[clamp(8rem,14vh,12rem)] pb-10 md:pb-14">
        <div className="max-w-[1400px] mx-auto grid items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:gap-16">

          <div className="max-w-[46rem] pb-4 lg:pb-10">
            {/* Kicker */}
            <div className="hero-kicker mb-8 flex flex-wrap items-center gap-3">
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
              <span
                className="hero-chip inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em]"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500,
                  color: 'var(--mauve)',
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(70,29,76,0.08)',
                }}
              >
                Dakar · BRVM · UEMOA
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
                    fontSize: 'clamp(3.2rem, 8.4vw, 7rem)',
                    lineHeight: 0.92,
                    letterSpacing: '-0.03em',
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
                    fontSize: 'clamp(3.2rem, 8.4vw, 7rem)',
                    lineHeight: 0.92,
                    letterSpacing: '-0.03em',
                    color: 'var(--mauve)',
                  }}
                >
                  ambitions.
                </span>
              </span>
            </h1>

            {/* Rule */}
            <div
              className="hero-rule h-[1px] w-24 md:w-36 mb-7"
              style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
            />

            {/* Subhead */}
            <p
              className="hero-body max-w-xl mb-8"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 300,
                fontSize: 'clamp(1rem, 1.35vw, 1.12rem)',
                lineHeight: 1.8,
                color: 'var(--night-60)',
              }}
            >
              Une maison de marché conçue pour structurer le capital, piloter le patrimoine
              et exécuter avec clarté sur la BRVM.
            </p>

            <div className="mb-10 flex flex-wrap gap-2.5">
              <span
                className="hero-chip inline-flex items-center rounded-full px-3.5 py-2 text-[10px] uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)', background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(10,10,10,0.08)' }}
              >
                Courtage BRVM
              </span>
              <span
                className="hero-chip inline-flex items-center rounded-full px-3.5 py-2 text-[10px] uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)', background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(10,10,10,0.08)' }}
              >
                Ingénierie financière
              </span>
              <span
                className="hero-chip inline-flex items-center rounded-full px-3.5 py-2 text-[10px] uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)', background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(10,10,10,0.08)' }}
              >
                Gestion conseillée
              </span>
            </div>

            {/* CTA */}
            <div className="hero-cta flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5"
                style={{
                  background: 'var(--night)',
                  color: 'var(--pure-white)',
                  boxShadow: '0 14px 34px rgba(10,10,10,0.10)',
                }}
              >
                <span
                  className="text-[11px] tracking-[0.18em] uppercase"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500 }}
                >
                  Découvrir notre expertise
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 transition-transform duration-500 group-hover:translate-x-1">
                  <FiArrowRight className="text-sm" />
                </span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-4"
              >
                <span
                  className="relative overflow-hidden text-[11px] tracking-[0.18em] uppercase"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}
                >
                  Planifier un échange
                  <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[var(--jaune-or)] translate-x-[-101%] transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-0" />
                </span>
              </a>
            </div>
          </div>

          <div className="hero-dossier w-full lg:ml-auto lg:max-w-[30rem]">
            <div
              className="overflow-hidden rounded-[2rem] p-4 md:p-5"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.58) 100%)',
                backdropFilter: 'blur(18px) saturate(140%)',
                WebkitBackdropFilter: 'blur(18px) saturate(140%)',
                border: '1px solid rgba(70,29,76,0.08)',
                boxShadow: '0 30px 70px rgba(70,29,76,0.10), 0 12px 30px rgba(10,10,10,0.04)',
              }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className="text-[10px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
                >
                  Panorama de décision
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)', background: 'rgba(255,255,255,0.55)' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--jaune-or)]" />
                  En veille
                </span>
              </div>

              <div className="mb-5 overflow-hidden rounded-[1.6rem]">
                <div className="relative aspect-[5/6] overflow-hidden">
                  <img
                    src="/generated_bg.jpg"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.0) 35%, rgba(17,13,22,0.28) 100%)',
                    }}
                  />
                  <div
                    className="absolute inset-x-0 top-[18%] h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)' }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-[24%] h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
                  />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <span
                        className="mb-1 block text-[10px] uppercase tracking-[0.16em]"
                        style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}
                      >
                        Horizon Everest
                      </span>
                      <span
                        style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1rem', lineHeight: 1.2, color: 'var(--pure-white)' }}
                      >
                        Perspective, clarté, exécution.
                      </span>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em]"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--pure-white)', background: 'rgba(18,16,26,0.35)', border: '1px solid rgba(255,255,255,0.18)' }}
                    >
                      BRVM / UEMOA
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {heroCapabilities.map((capability) => (
                  <div
                    key={capability.label}
                    className="hero-panel-row flex items-start justify-between gap-4 rounded-[1.2rem] px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.42)', border: '1px solid rgba(10,10,10,0.04)' }}
                  >
                    <div>
                      <div
                        className="mb-1 text-[10px] uppercase tracking-[0.16em]"
                        style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
                      >
                        {capability.label}
                      </div>
                      <div
                        style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.88rem', lineHeight: 1.55, color: 'var(--night-60)' }}
                      >
                        {capability.value}
                      </div>
                    </div>
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: 'rgba(202,148,47,0.7)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Trust Metrics Bar ─── */}
      <div className="relative z-10 w-full mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 py-1"
            style={{ borderTop: '1px solid var(--command-border)' }}
          >
            {/* Metric 1 */}
            <div className="hero-metric py-6 pr-6 border-b lg:border-b-0 lg:border-r flex items-baseline gap-4" style={{ borderColor: 'var(--command-border)' }}>
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
            <div className="hero-metric py-6 lg:px-8 border-b lg:border-b-0 lg:border-r flex items-center gap-4" style={{ borderColor: 'var(--command-border)' }}>
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
            <div className="hero-metric py-6 pr-6 lg:px-8 border-r flex items-baseline gap-4" style={{ borderColor: 'var(--command-border)' }}>
              <span
                className="text-2xl lg:text-3xl"
                style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--night)' }}
              >
                BRVM
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
              >
                Accès marché régional
              </span>
            </div>

            {/* Metric 4 */}
            <div className="hero-metric py-6 lg:pl-8 flex items-baseline gap-4">
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
