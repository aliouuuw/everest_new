import { useEffect, useId, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingId = useId();

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        /* autoplay may need user gesture; ignore */
      });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.hero-video-wrap', { scale: 1, opacity: 1 });
        gsap.set('.hero-kicker', { y: 0, opacity: 1 });
        gsap.set('.hero-title-line', { y: '0%' });
        gsap.set('.hero-body', { y: 0, opacity: 1 });
        gsap.set('.hero-cta', { y: 0, opacity: 1 });
        gsap.set('.hero-rule', { scaleX: 1, transformOrigin: 'center' });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set('.hero-video-wrap', { scale: 1.1, opacity: 0 });
      gsap.set('.hero-kicker', { y: 20, opacity: 0 });
      gsap.set('.hero-title-line', { y: '110%' });
      gsap.set('.hero-body', { y: 30, opacity: 0 });
      gsap.set('.hero-cta', { y: 20, opacity: 0 });
      gsap.set('.hero-rule', { scaleX: 0, transformOrigin: 'center' });

      tl
        .to('.hero-video-wrap', { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' })
        .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.8 }, '-=1.4')
        .to(
          '.hero-title-line',
          { y: '0%', duration: 1.4, stagger: 0.12, ease: 'power4.out' },
          '-=1.0',
        )
        .to('.hero-rule', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=0.8')
        .to('.hero-body', { y: 0, opacity: 1, duration: 1.0 }, '-=0.6')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby={headingId}
      className="relative min-h-[100dvh] w-full flex items-end justify-center bg-[var(--night)] text-white overflow-hidden selection:bg-[var(--jaune-or)] selection:text-[var(--night)]"
    >
      {/* ─── Cinematic Video Background (mountain left — open center for type) ─── */}
      <div className="hero-video-wrap absolute inset-0 w-full h-full z-0" aria-hidden>
        <video
          ref={videoRef}
          autoPlay
          loop={false}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          className="h-full w-full min-h-full min-w-full object-cover [object-position:32%_50%] md:[object-position:30%_48%] motion-reduce:object-center"
          style={{ display: 'block' }}
        >
          <source src="/ai-hero-bg-2.mp4" type="video/mp4" />
        </video>
        {/* Radial vignette — subtle mauve only (light center → soft dark edge) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              'radial-gradient(ellipse 82% 72% at 50% 44%,',
              'color-mix(in srgb, var(--mauve) 0%, transparent) 0%,',
              'color-mix(in srgb, var(--mauve) 0%, transparent) 32%,',
              'color-mix(in srgb, var(--mauve) 5%, transparent) 58%,',
              'color-mix(in srgb, var(--mauve) 11%, transparent) 82%,',
              'color-mix(in srgb, var(--mauve) 16%, transparent) 100%)',
            ].join(' '),
          }}
        />
        {/* Bottom fade — mauve dark → light, for legibility */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[color-mix(in_srgb,var(--mauve)_38%,transparent)] from-[45%] via-[color-mix(in_srgb,var(--mauve)_12%,transparent)] to-transparent"
        />
        {/* Left edge — darker, more pronounced mauve falloff */}
        <div className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_srgb,var(--mauve)_58%,black_42%)] via-[color-mix(in_srgb,var(--mauve)_20%,transparent)] to-transparent pointer-events-none" />
        {/* Very subtle read-through scrim for type contrast without crushing the image */}
        <div className="absolute inset-0 bg-[var(--mauve)]/[0.04] mix-blend-soft-light pointer-events-none" />
        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─── Editorial Content (centered — balances left-weighted background) ─── */}
      <div
        className="relative z-10 w-full px-5 sm:px-6 md:px-16 lg:px-24 pb-32 sm:pb-40 md:pb-44 pt-28 sm:pt-32"
        style={{ paddingBottom: 'max(7.5rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="max-w-[52rem] mx-auto flex flex-col items-center text-center">

          <h1 id={headingId} className="text-balance mb-6 sm:mb-7 max-w-4xl mx-auto">
            <span className="block overflow-hidden">
              <span
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.125rem, 4.2vw + 1.1rem, 3.85rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.03em',
                  color: 'var(--pure-white)',
                }}
              >
                Accès stratégique aux marchés financiers
              </span>
            </span>
            <span className="mt-1 block overflow-hidden sm:mt-0.5">
              <span
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.125rem, 4.2vw + 1.1rem, 3.85rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.03em',
                  color: 'var(--jaune-or)',
                }}
              >
                de l&apos;UEMOA
              </span>
            </span>
          </h1>

          <div
            className="hero-rule h-px w-20 sm:w-32 md:w-40 mb-7 sm:mb-8 mx-auto"
            style={{
              background:
                'linear-gradient(90deg, transparent, color-mix(in srgb, var(--jaune-or) 85%, var(--mauve) 15%) 50%, transparent)',
            }}
          />

          <p
            className="hero-body mb-9 sm:mb-10 mx-auto max-w-[60ch] text-pretty"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 0.35vw + 0.9rem, 1.125rem)',
              lineHeight: 1.7,
              color: 'color-mix(in srgb, var(--pure-white) 78%, var(--mauve) 22%)',
            }}
          >
            EVEREST Finance est une plateforme d&apos;ingénierie et d&apos;intermédiation financière opérant au cœur
            du marché financier régional (SGI agréée CREPMF, n° SGI/DA/2016/60). Nous structurons et facilitons
            l&apos;accès aux opportunités d&apos;investissement et de financement à travers une approche rigoureuse,
            sélective et orientée performance.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 items-stretch sm:items-center justify-center w-full sm:w-auto">
            <Link
              to="/offres"
              className="btn-primary-dark inline-flex min-h-[3rem] min-w-[min(100%,12rem)] sm:min-w-0 items-center justify-center pl-7 pr-2 py-2.5 text-sm w-full sm:w-fit group touch-manipulation transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--jaune-or)]"
            >
              <span className="font-medium tracking-tight">Accéder aux opportunités</span>
              <div className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--night)]/15 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-[var(--night)]/25 sm:ml-4">
                <FiArrowRight className="text-sm shrink-0" aria-hidden />
              </div>
            </Link>
            <a
              href="#contact"
              className="group inline-flex min-h-[3rem] items-center justify-center py-3 text-sm font-medium sm:min-h-0 sm:py-3.5 touch-manipulation transition-colors duration-200 text-[color-mix(in_srgb,var(--pure-white)_90%,var(--mauve)_10%)] hover:text-white relative w-full sm:w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50 rounded-sm"
            >
              Nous contacter
              <span
                className="pointer-events-none absolute bottom-2.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent group-hover:via-white/90"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
