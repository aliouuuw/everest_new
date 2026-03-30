import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { useLenisContext } from '../Hooks/useLenisContext.tsx';

gsap.registerPlugin(ScrollTrigger);

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
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
      gsap.set('.reveal-fade', { opacity: 0, y: 20 });
      gsap.set('.hero-line', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.trust-marker', { opacity: 0, y: 10 });
      tl.to('.reveal-text', { yPercent: 0, duration: 1.4, stagger: 0.06, ease: 'expo.out' })
        .to('.hero-line', { scaleX: 1, duration: 1, ease: 'power3.inOut' }, '-=1')
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power2.out' }, '-=0.8')
        .to('.trust-marker', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.6');
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
        };
        const tl = gsap.timeline({ scrollTrigger: pinTrigger });

        // Golden image fades in at full scale (0% → 35%)
        tl.fromTo(
          '.hero-golden-img',
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'sine.inOut' },
          0,
        );
        // Mountain dissolves — screen blend lets the golden image glow through
        tl.to('.hero-mountain-img', {
          opacity: 0,
          scale: 1.12,
          duration: 0.3,
          ease: 'sine.inOut',
        }, 0.05);
        // Gradient overlay dissolves in sync
        tl.to('.hero-gradient-overlay', {
          opacity: 0,
          duration: 0.3,
          ease: 'sine.inOut',
        }, 0.08);
        // Left cloud — dramatic expansion
        tl.to('.hero-cloud-left', {
          scale: 3,
          x: '-25vw',
          y: '-12vh',
          opacity: 0.85,
          duration: 0.4,
          ease: 'power2.out',
        }, 0);
        // Right cloud — mirror
        tl.to('.hero-cloud-right', {
          scale: 3,
          x: '25vw',
          y: '-12vh',
          opacity: 0.85,
          duration: 0.4,
          ease: 'power2.out',
        }, 0);
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
      <div className="hero-pin-layer relative w-full h-[100svh] flex items-end overflow-hidden">

        {/* ═══ BACKGROUND LAYERS ═══ */}

        {/* 1. Dark base — matches the deep tones of the purple mountain */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(180deg, #1a0f20 0%, #0d0a10 100%)' }}
        />

        {/* 2. Golden mountain — starts invisible, morphs in as purple mountain dissolves */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <img
            src="/golden-mountain-at-sunrise.png"
            alt="Golden mountain at sunrise"
            className="hero-golden-img w-full h-full object-cover opacity-0 will-change-transform"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              imageRendering: 'crisp-edges',
            }}
          />
        </div>

        {/* 3. Mountain photograph — screen blend lets logo glow through during crossfade */}
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

        {/* 4. Gradient overlay — dark bottom for text legibility on the moody image */}
        <div
          className="hero-gradient-overlay absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: `
              linear-gradient(to top,
                rgba(13,10,16,0.92) 0%,
                rgba(26,15,32,0.5) 35%,
                rgba(70,29,76,0.1) 60%,
                transparent 80%
              )
            `,
          }}
        />

        {/* 5. Cloud elements — mauve-tinted to match the purple palette */}
        {/* Left cloud */}
        <div
          className="hero-cloud-left absolute z-[4] pointer-events-none will-change-transform"
          style={{ left: '-2vw', bottom: '8%', width: 'clamp(200px, 30vw, 500px)', opacity: 0.4 }}
        >
          <svg viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <ellipse cx="300" cy="180" rx="280" ry="80" fill="url(#cloudGradL)" />
            <ellipse cx="200" cy="140" rx="160" ry="90" fill="url(#cloudGradL)" />
            <ellipse cx="380" cy="130" rx="180" ry="100" fill="url(#cloudGradL)" />
            <ellipse cx="260" cy="110" rx="140" ry="80" fill="url(#cloudGradL2)" />
            <defs>
              <radialGradient id="cloudGradL" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#2a1530" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1a0f20" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cloudGradL2" cx="0.5" cy="0.4" r="0.5">
                <stop offset="0%" stopColor="#3d1f45" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#1a0f20" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Right cloud */}
        <div
          className="hero-cloud-right absolute z-[4] pointer-events-none will-change-transform"
          style={{ right: '-2vw', bottom: '10%', width: 'clamp(200px, 28vw, 480px)', opacity: 0.4 }}
        >
          <svg viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <ellipse cx="300" cy="180" rx="280" ry="80" fill="url(#cloudGradR)" />
            <ellipse cx="400" cy="140" rx="160" ry="90" fill="url(#cloudGradR)" />
            <ellipse cx="220" cy="130" rx="180" ry="100" fill="url(#cloudGradR)" />
            <ellipse cx="340" cy="110" rx="140" ry="80" fill="url(#cloudGradR2)" />
            <defs>
              <radialGradient id="cloudGradR" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#2a1530" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1a0f20" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cloudGradR2" cx="0.5" cy="0.4" r="0.5">
                <stop offset="0%" stopColor="#3d1f45" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#1a0f20" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* ═══ CONTENT — light-on-dark treatment ═══ */}
        <div className="hero-content-layer relative z-[5] w-full px-6 md:px-12 lg:px-16 xl:px-24 pb-[clamp(3rem,8vh,6rem)] pt-[clamp(8rem,20vh,14rem)] pointer-events-none">
          <div className="max-w-[1100px] pointer-events-auto">

            {/* Kicker */}
            <div className="reveal-fade flex items-center gap-3 mb-6 md:mb-8">
              <div className="hero-line h-[1.5px] w-6 bg-[var(--jaune-or)]" />
              <span
                className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ fontFamily: 'var(--font-primary)', color: 'rgba(202,148,47,0.7)' }}
              >
                Société de Gestion et d'Intermédiation — Dakar
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 md:mb-8">
              <span className="block overflow-hidden pb-1">
                <span
                  className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--pure-white)' }}
                >
                  L'excellence
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.02em] italic"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--jaune-or)' }}
                >
                  au sommet
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--pure-white)' }}
                >
                  du capital.
                </span>
              </span>
            </h1>

            {/* Subhead */}
            <div className="reveal-fade max-w-[480px] mb-8 md:mb-10">
              <p
                className="text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-[1.7]"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.55)' }}
              >
                Courtage BRVM, émissions primaires et ingénierie financière.
                Nous opérons avec la rigueur d'une institution et la précision d'un partenaire dédié.
              </p>
            </div>

            {/* CTAs */}
            <div className="reveal-fade flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-12 md:mb-14">
              <a
                href="#services"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--jaune-or)] text-[var(--night)] overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[var(--jaune-or)]/30 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jaune-or)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a10]"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 text-[11px] tracking-[0.15em] uppercase font-semibold">
                  Découvrir nos services
                </span>
                <FiArrowRight className="relative z-10 text-sm transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="/auth"
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-semibold transition-colors duration-200 py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jaune-or)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a10]"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <span className="relative group-hover:text-white transition-colors duration-200">
                  Accès Client
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[var(--jaune-or)] group-hover:w-full transition-all duration-200" />
                </span>
                <span className="text-[var(--jaune-or)] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Trust markers */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {['Agrément CREPMF', '30+ années d\'expertise', 'BRVM · UEMOA'].map((label) => (
                <div key={label} className="trust-marker group flex items-center gap-2 cursor-default">
                  <span className="w-1 h-1 rounded-full bg-[var(--jaune-or)] transition-all duration-200 group-hover:scale-125 group-hover:bg-white" />
                  <span
                    className="text-[10px] tracking-[0.08em] uppercase transition-colors duration-200 group-hover:text-white/70"
                    style={{ fontFamily: 'var(--font-primary)', color: 'rgba(255,255,255,0.35)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      {/* end hero-pin-layer */}
      </div>
    </section>
  );
};
