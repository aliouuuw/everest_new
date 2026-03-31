import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { useLenisContext } from '../Hooks/useLenisContext.tsx';
import { CloudFog } from './CloudFog';
import { MagneticButton } from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { lenis, isReady } = useLenisContext();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Sync Lenis with ScrollTrigger
  useEffect(() => {
    if (!lenis || !isReady) return;
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value as number, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });
    lenis.on('scroll', ScrollTrigger.update);
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis, isReady]);

  // ─── Entrance animation ───
  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      gsap.set('.reveal-text', { yPercent: 120 });
      gsap.set('.reveal-fade', { opacity: 0, y: 24 });
      gsap.set('.trust-marker', { opacity: 0, y: 12 });
      tl.to('.reveal-text', { yPercent: 0, duration: 1.4, stagger: 0.08, ease: 'expo.out' })
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power2.out' }, '-=0.9')
        .to('.trust-marker', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.5');
    }, heroRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // ─── Scroll-driven parallax (pinned) ───
  useEffect(() => {
    if (prefersReducedMotion || !isReady) return;
    const timer = setTimeout(() => {
      const hero = heroRef.current;
      if (!hero) return;
      const ctx = gsap.context(() => {
        const pinTrigger = {
          trigger: hero,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          pin: '.hero-pin-layer',
          pinSpacing: false,
          onUpdate: (self: ScrollTrigger) => {
            setScrollProgress(self.progress);
          },
        };
        const tl = gsap.timeline({ scrollTrigger: pinTrigger });

        // Purple mountain zooms in as it dissolves — feels like flying into it
        tl.to('.hero-mountain-img', {
          opacity: 0,
          scale: 1.6,
          duration: 0.35,
          ease: 'power2.in',
        }, 0);

        // Golden image fades in underneath
        tl.fromTo(
          '.hero-golden-img',
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'sine.inOut' },
          0.05,
        );

        // Gradient overlay dissolves in sync
        tl.to('.hero-gradient-overlay', {
          opacity: 0,
          duration: 0.3,
          ease: 'sine.inOut',
        }, 0.08);

        // Content fades out
        tl.to('.hero-content-layer', {
          opacity: 0,
          y: -40,
          duration: 0.2,
          ease: 'power2.in',
        }, 0.3);
      }, hero);
      return () => ctx.revert();
    }, 150);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, isReady]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden selection:bg-[var(--jaune-or-20)] selection:text-white"
      style={{ height: '250vh' }}
    >
      {/* Pinned viewport */}
      <div className="hero-pin-layer relative w-full h-[100svh] flex items-center justify-center overflow-hidden">

        {/* ═══ BACKGROUND LAYERS ═══ */}

        {/* 1. Dark base — warmer tones */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(180deg, #1c1224 0%, #120e18 100%)' }}
        />

        {/* 2. Golden mountain — fades in as purple dissolves */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <img
            src="/golden-mountain-at-sunrise.png"
            alt="Golden mountain at sunrise"
            className="hero-golden-img w-full h-full object-cover opacity-0 will-change-transform"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
        </div>

        {/* 3. Purple mountain — zooms in as it fades */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
        >
          <img
            src="/mountain-peak-purple.jpg"
            alt="Mountain peak in purple twilight"
            className="hero-mountain-img w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* 4. Gradient overlay — stronger contrast for text legibility */}
        <div
          className="hero-gradient-overlay absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: `
              linear-gradient(to top,
                rgba(12,10,18,0.95) 0%,
                rgba(12,10,18,0.7) 25%,
                rgba(20,15,28,0.4) 50%,
                rgba(30,20,40,0.15) 70%,
                transparent 85%
              ),
              radial-gradient(ellipse at 50% 60%, rgba(12,10,18,0.4) 0%, transparent 60%)
            `,
          }}
        />

        {/* 5. WebGL volumetric fog/haze — covers middle to bottom */}
        <CloudFog
          scrollProgress={scrollProgress}
          className="z-[4]"
        />

        {/* ═══ CONTENT — Centered, modern, approachable ═══ */}
        <div className="hero-content-layer relative z-[5] w-full max-w-[920px] mx-auto px-6 flex flex-col items-center text-center pointer-events-none">

          {/* Kicker pill */}
          <div className="reveal-fade pointer-events-auto mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] text-[11px] md:text-[12px] tracking-[0.1em] uppercase font-medium text-white/70"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" />
              Société de Gestion et d'Intermédiation
            </span>
          </div>

          {/* Headline — bold, clear, with text shadow for depth */}
          <h1 className="mb-6 md:mb-10 flex flex-col items-center">
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.1] tracking-[-0.02em] font-semibold text-white drop-shadow-lg"
                style={{ fontFamily: 'var(--font-primary)', textShadow: '0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)' }}
              >
                L'excellence
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.1] tracking-[-0.02em] font-semibold text-[var(--jaune-or)] drop-shadow-lg"
                style={{ fontFamily: 'var(--font-primary)', textShadow: '0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)' }}
              >
                au sommet
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.1] tracking-[-0.02em] font-semibold text-white drop-shadow-lg"
                style={{ fontFamily: 'var(--font-primary)', textShadow: '0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)' }}
              >
                du capital.
              </span>
            </span>
          </h1>

          {/* Subhead — better contrast */}
          <div className="reveal-fade max-w-[480px] mb-10 md:mb-12 pointer-events-auto">
            <p
              className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-white/75 font-normal drop-shadow-md"
              style={{ fontFamily: 'var(--font-primary)', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              Courtage BRVM, émissions primaires et ingénierie financière.
              La rigueur d'une institution, la précision d'un partenaire dédié.
            </p>
          </div>

          {/* CTAs — rounded pills, modern feel */}
          <div className="reveal-fade flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 md:mb-16 pointer-events-auto">
            <MagneticButton
              as="a"
              href="#services"
              className="group inline-flex items-center gap-2.5 px-7 py-3 bg-white text-[var(--night)] rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-white/20 active:scale-[0.98] focus:outline-none"
              strength={40}
            >
              <span
                className="text-[13px] font-semibold tracking-wide"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Découvrir nos services
              </span>
              <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/auth"
              className="group inline-flex items-center gap-2.5 px-7 py-3 bg-white/[0.08] backdrop-blur-sm text-white border border-white/[0.15] rounded-full transition-all duration-300 hover:bg-white/[0.15] hover:border-white/[0.25] active:scale-[0.98] focus:outline-none"
              strength={30}
            >
              <span
                className="text-[13px] font-semibold tracking-wide"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Accès Client
              </span>
            </MagneticButton>
          </div>

          {/* Trust markers — better visibility */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-2 mb-16 md:mb-0">
            {['Agrément CREPMF', "30+ années d'expertise", 'BRVM · UEMOA'].map((label) => (
              <div key={label} className="trust-marker flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" />
                <span
                  className="text-[11px] md:text-[12px] tracking-[0.05em] text-white/70 font-medium drop-shadow"
                  style={{ fontFamily: 'var(--font-primary)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[5] reveal-fade pointer-events-none">
          <span 
            className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Défilez
          </span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden rounded-full">
            <div 
              className="absolute top-0 left-0 w-full h-1/2 bg-white rounded-full"
              style={{ animation: 'scrollDown 2s ease-in-out infinite' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
