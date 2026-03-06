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
      className="relative min-h-[100svh] w-full flex items-end text-white overflow-hidden selection:bg-[var(--jaune-or)] selection:text-[var(--night)]"
      style={{ background: 'var(--mauve)' }}
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
        {/* Radial vignette — deep mauve edges, preserving video center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, rgba(50,18,56,0.5) 60%, rgba(30,8,35,0.95) 100%)',
          }}
        />
        {/* Bottom fade — structural base */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, var(--mauve) 0%, rgba(70,29,76,0.85) 25%, transparent 60%)',
          }}
        />
        {/* Left editorial fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(70,29,76,0.9) 0%, rgba(70,29,76,0.4) 40%, transparent 75%)',
          }}
        />
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─── Editorial Content ─── */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-32 md:pb-40 pt-32 flex flex-col md:flex-row justify-between items-end">
        <div className="max-w-[800px]">

          {/* Kicker */}
          <div className="hero-kicker mb-10">
            <span
              className="inline-block text-[11px] tracking-[0.35em] uppercase font-medium text-[var(--jaune-or)]"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Société de Gestion et d'Intermédiation — Dakar
            </span>
          </div>

          {/* Headline — oversized serif, no gradients */}
          <h1 className="mb-10">
            <span className="block overflow-hidden">
              <span
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
                  color: 'var(--pure-white)',
                }}
              >
                Élevez vos
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span
                className="hero-title-line block"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
                  color: 'var(--jaune-or)',
                }}
              >
                ambitions.
              </span>
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="hero-body max-w-lg mb-14"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 300,
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Votre partenaire d'excellence pour le courtage BRVM, les émissions primaires
            et l'ingénierie financière en Afrique de l'Ouest.
          </p>

          {/* CTA */}
          <div className="hero-cta flex gap-6 items-center">
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 transition-all duration-300 bg-[var(--jaune-or)] text-white hover:bg-white hover:text-[var(--night)]"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, letterSpacing: '0.05em' }}
            >
              Découvrir notre expertise
            </a>
            
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 text-white/80 hover:text-[var(--jaune-or)] transition-colors group"
            >
              <span className="text-sm font-medium tracking-wide">Nous contacter</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        {/* Right side contextual metrics - replaces the bottom bar */}
        <div className="hidden md:flex flex-col gap-10 text-right">
          <div className="hero-metric">
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--jaune-or)] mb-2 font-medium" style={{ fontFamily: 'var(--font-primary)' }}>
              Agrément CREPMF
            </div>
            <div className="text-white/70 font-mono text-sm tracking-wider">
              SGI/DA/2016/60
            </div>
          </div>
          
          <div className="hero-metric">
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--jaune-or)] mb-2 font-medium" style={{ fontFamily: 'var(--font-primary)' }}>
              Expertise Cumulée
            </div>
            <div className="text-white text-3xl" style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300 }}>
              30+ <span className="text-white/40 text-lg">ans</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
