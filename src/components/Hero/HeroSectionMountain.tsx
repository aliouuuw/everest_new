import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set('.hero-video-wrap', { scale: 1.1, opacity: 0 });
      gsap.set('.hero-kicker', { y: 20, opacity: 0 });
      gsap.set('.hero-title-line', { y: '110%' });
      gsap.set('.hero-body', { y: 30, opacity: 0 });
      gsap.set('.hero-cta', { y: 20, opacity: 0 });
      gsap.set('.hero-rule', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.hero-metric', { y: 30, opacity: 0 });

      tl
        .to('.hero-video-wrap', { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' })
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
      className="relative min-h-[100svh] w-full flex items-end bg-[var(--night)] text-white overflow-hidden selection:bg-[var(--jaune-or)] selection:text-[var(--night)]"
    >
      {/* ─── Cinematic Video Background ─── */}
      <div className="hero-video-wrap absolute inset-0 w-full h-full z-0">
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
        {/* Radial vignette — darker edges, luminous center for the gold sculpture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 55% 45%, transparent 0%, rgba(15,17,21,0.55) 60%, rgba(15,17,21,0.92) 100%)',
          }}
        />
        {/* Bottom fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/60 to-transparent pointer-events-none" />
        {/* Left editorial fade with subtle mauve hint */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--night)]/80 via-[var(--mauve-10)]/30 to-transparent pointer-events-none" />
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
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
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--jaune-or)' }}
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
                  color: 'var(--pure-white)',
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
            className="hero-rule h-[1px] w-24 md:w-40 mb-8"
            style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
          />

          {/* Subhead */}
          <p
            className="hero-body max-w-lg mb-10"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.55)',
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
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}
              >
                Découvrir notre expertise
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--jaune-or)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
              </span>
              <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[var(--jaune-or)]/60 group-hover:bg-[var(--jaune-or)]/10 transition-all duration-500">
                <FiArrowRight className="text-base text-white/70 group-hover:text-[var(--jaune-or)] group-hover:translate-x-0.5 transition-all duration-500" />
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* ─── Metrics Bar ─── */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div
            className="border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3"
          >
            {/* Metric 1 */}
            <div className="hero-metric py-7 md:pr-12 border-b md:border-b-0 md:border-r border-white/[0.06] flex items-baseline gap-4">
              <span
                className="text-3xl lg:text-4xl"
                style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--pure-white)' }}
              >
                08
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}
              >
                Années d'expérience
              </span>
            </div>

            {/* Metric 2 — Licence */}
            <div className="hero-metric py-7 md:px-12 border-b md:border-b-0 md:border-r border-white/[0.06] flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)] animate-pulse flex-shrink-0" />
              <div>
                <span
                  className="block text-[9px] tracking-[0.2em] uppercase mb-0.5"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
                >
                  Agrément CREPMF
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 400, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}
                >
                  SGI/DA/2016/60
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="hero-metric py-7 md:pl-12 flex items-baseline gap-4">
              <span
                className="text-3xl lg:text-4xl"
                style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--pure-white)' }}
              >
                30<span style={{ color: 'var(--jaune-or)' }}>+</span>
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}
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
