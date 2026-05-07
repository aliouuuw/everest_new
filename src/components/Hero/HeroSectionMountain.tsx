import { useEffect, useId, useRef, useState } from 'react';
import { useCloudShader } from './useCloudShader';
import { Link } from '@tanstack/react-router';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';
import { EditableText } from '../../cms';

export const HeroSectionMountain: React.FC = () => {
  const heroRef   = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const headingId  = useId();
  const [cloudVisible, setCloudVisible] = useState(false);
  const { start: startCloud } = useCloudShader(canvasRef);

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
        gsap.set('.hero-rule', { scaleX: 0, transformOrigin: 'right' });

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
      className="relative min-h-[100dvh] w-full flex items-end bg-[var(--night)] text-white overflow-hidden selection:bg-[var(--jaune-or)] selection:text-[var(--night)]"
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
          className="h-full w-full min-h-full min-w-full object-cover [object-position:0%_50%] md:[object-position:0%_48%] motion-reduce:object-center"
          style={{ display: 'block' }}
          onEnded={() => { setCloudVisible(true); startCloud(); }}
        >
          <source src="/ai-hero-bg-1.mp4" type="video/mp4" />
        </video>
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            opacity: cloudVisible ? 0.6 : 0,
            transition: 'opacity 2500ms ease-in-out',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[color-mix(in_srgb,var(--everest-green)_38%,transparent)] from-[45%] via-[color-mix(in_srgb,var(--everest-green)_12%,transparent)] to-transparent"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_srgb,var(--everest-green)_58%,black_42%)] via-[color-mix(in_srgb,var(--everest-green)_20%,transparent)] to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 30% at 100% 100%, rgb(0, 0, 0) 0%, rgba(10, 10, 10, 0.98) 0% 30%, transparent 80%)',
          }}
        />
        <div className="absolute inset-0 bg-[var(--everest-green)]/[0.04] mix-blend-soft-light pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div
        className="relative z-10 w-full page-container pb-32 sm:pb-40 md:pb-44 pt-28 sm:pt-32"
        style={{ paddingBottom: 'max(7.5rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="flex w-full max-w-[min(52rem,100%)] flex-col items-start text-left">
          <h1 id={headingId} className="text-balance mb-6 sm:mb-7 w-full max-w-4xl">
            <span className="block overflow-hidden">
              <EditableText
                id="home.hero.title"
                as="span"
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 4.25rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.03em',
                  color: 'var(--pure-white)',
                }}
              >
                Accès stratégique aux marchés financiers de l&apos;UEMOA
              </EditableText>
            </span>
          </h1>

          <div
            className="hero-rule h-px w-20 sm:w-32 md:w-40 mb-7 sm:mb-8"
            style={{
              background:
                'linear-gradient(90deg, transparent, color-mix(in srgb, var(--jaune-or) 85%, var(--mauve) 15%) 50%, transparent)',
            }}
          />

          <EditableText
            id="home.hero.subtitle"
            as="p"
            className="hero-body mb-9 sm:mb-10 max-w-[60ch] text-pretty"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 500,
              fontSize: 'clamp(1.0625rem, 0.4vw + 0.95rem, 1.2rem)',
              lineHeight: 1.65,
              color: 'var(--pure-white)',
            }}
          >
            EVEREST Finance est une plateforme d&apos;ingénierie et d&apos;intermédiation financière opérant au
            cœur du marché financier régional (SGI agréée AMF-UMOA, n° SGI/DA/2016/60). Nous structurons et
            facilitons l&apos;accès aux opportunités d&apos;investissement et de financement à travers une
            approche rigoureuse, sélective et orientée performance.
          </EditableText>

          <div className="hero-cta flex w-full max-w-4xl flex-col flex-wrap items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-5">
            <Link
              to="/offres"
              className="btn-primary-dark inline-flex min-h-[3.75rem] min-w-[min(100%,14rem)] sm:min-w-0 items-center justify-center pl-9 pr-3 py-3.5 text-base w-full sm:w-fit group touch-manipulation transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--jaune-or)]"
            >
              <EditableText id="home.hero.ctaPrimary" as="span" className="text-base font-semibold tracking-tight">
                Accéder aux opportunités
              </EditableText>
              <div className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--night)]/15 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-[var(--night)]/25 sm:ml-5">
                <FiArrowRight className="text-base shrink-0" aria-hidden />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
