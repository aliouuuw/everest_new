import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';
import { EditableText } from '../../cms';

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

      tl
        .to('.hero-video-wrap', { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' })
        .to('.hero-kicker', { y: 0, opacity: 1, duration: 0.8 }, '-=1.4')
        .to('.hero-title-line', { y: '0%', duration: 1.4, stagger: 0.12, ease: 'power4.out' }, '-=1.0')
        .to('.hero-rule', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, '-=0.8')
        .to('.hero-body', { y: 0, opacity: 1, duration: 1.0 }, '-=0.6')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');

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
          playsInline
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        >
          <source src="/kling_video_1.mp4" type="video/mp4" />
        </video>
        {/* Radial vignette — darker edges, luminous center for the gold sculpture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 55% 45%, transparent 0%, rgba(15,17,21,0.10) 60%, rgba(15,17,21,0.05) 100%)',
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
            <EditableText
              id="home.hero.kicker"
              as="span"
              className="inline-block text-[10px] md:text-[11px] tracking-[0.35em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--jaune-or)' }}
            >
              Société de Gestion et d'Intermédiation — Dakar
            </EditableText>
          </div>

          {/* Headline — brand sans (--font-primary), matches section luxury-heading scale */}
          <h1 className="mb-6 max-w-4xl">
            <span className="block overflow-hidden">
              <EditableText
                id="home.hero.title"
                as="span"
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.1rem, 5.5vw, 3.75rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--pure-white)',
                }}
              >
                Accès stratégique aux marchés financiers
              </EditableText>
            </span>
            <span className="block overflow-hidden">
              <EditableText
                id="home.hero.titleAccent"
                as="span"
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.1rem, 5.5vw, 3.75rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--jaune-or)',
                }}
              >
                de l'UEMOA
              </EditableText>
            </span>
          </h1>

          {/* Gold horizontal rule */}
          <div
            className="hero-rule h-[1px] w-24 md:w-40 mb-8"
            style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
          />

          {/* Subhead */}
          <EditableText
            id="home.hero.subtitle"
            as="p"
            className="hero-body max-w-2xl mb-10"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            EVEREST Finance est une plateforme d'ingénierie et d'intermédiation financière opérant au cœur
            du marché financier régional (SGI agréée CREPMF, n° SGI/DA/2016/60). Nous structurons et facilitons
            l'accès aux opportunités d'investissement et de financement à travers une approche rigoureuse,
            sélective et orientée performance.
          </EditableText>

          <div className="hero-cta flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-center">
            <Link
              to="/offres"
              className="btn-primary-dark inline-flex items-center justify-center pl-7 pr-2 py-2 text-sm w-fit group"
            >
              <EditableText id="home.hero.ctaPrimary" as="span">Accéder aux opportunités</EditableText>
              <div className="w-9 h-9 rounded-full bg-[var(--night)]/15 flex items-center justify-center ml-4 group-hover:bg-[var(--night)]/25 transition-colors">
                <FiArrowRight className="text-sm shrink-0" />
              </div>
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center py-3.5 text-sm font-medium text-white/80 hover:text-white transition-colors relative group w-fit"
            >
              <EditableText id="home.hero.ctaSecondary" as="span">Nous contacter</EditableText>
              <span className="absolute bottom-2 left-0 right-0 h-[1px] bg-white/30 group-hover:bg-white transition-colors" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
