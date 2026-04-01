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

  // ─── Entrance animation with character stagger ───
  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      
      // Split each headline line into characters
      const headlineLines = document.querySelectorAll('.hero-headline-line');
      headlineLines.forEach((line) => {
        const text = line.textContent || '';
        const chars = text.split('').map((char) => 
          char === ' ' ? '<span class="char-space">&nbsp;</span>' : `<span class="char">${char}</span>`
        ).join('');
        line.innerHTML = chars;
      });

      // Set initial states
      gsap.set('.char', { opacity: 0, y: 30, rotationX: -90 });
      gsap.set('.char-space', { opacity: 0 });
      gsap.set('.reveal-fade', { opacity: 0, y: 24 });
      gsap.set('.trust-marker', { opacity: 0, y: 12 });

      // Animate characters with stagger
      tl.to('.char, .char-space', { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 0.8, 
        stagger: 0.02,
        ease: 'back.out(1.2)'
      })
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power2.out' }, '-=0.5')
        .to('.trust-marker', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.6');
    }, heroRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // ─── Scroll-driven parallax (pinned) with per-layer depth ───
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
          scrub: 0.6,
          pin: '.hero-pin-layer',
          pinSpacing: false,
          onUpdate: (self: ScrollTrigger) => {
            setScrollProgress(self.progress);
          },
        };
        const tl = gsap.timeline({ scrollTrigger: pinTrigger });

        // Purple mountain zooms in on scroll (no fade-out)
        tl.to('.hero-mountain-img', {
          scale: 1.3,
          duration: 0.5,
          ease: 'power2.in',
        }, 0);

        // Gradient overlay dissolves in sync
        tl.to('.hero-gradient-overlay', {
          opacity: 0,
          duration: 0.4,
          ease: 'sine.inOut',
        }, 0.1);

        // Per-layer parallax: each element drifts up at its own speed
        const parallaxLayers = hero.querySelectorAll('.hero-parallax-layer');
        parallaxLayers.forEach((layer) => {
          const speed = parseFloat((layer as HTMLElement).dataset.parallaxSpeed || '1');
          tl.to(layer, {
            y: -60 * speed,
            duration: 0.4,
            ease: 'power2.in',
          }, 0.15);
        });
      }, hero);
      return () => ctx.revert();
    }, 150);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, isReady]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden selection:bg-[var(--jaune-or-20)] selection:text-white"
      style={{ height: '120vh' }}
    >
      {/* Pinned viewport */}
      <div className="hero-pin-layer relative w-full h-[100svh] flex items-center justify-center overflow-hidden">

        {/* ═══ BACKGROUND LAYERS ═══ */}

        {/* 1. Dark base — warmer tones */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(180deg, #1c1224 0%, #120e18 100%)' }}
        />

        {/* 2. Purple mountain — zooms in and fades out on scroll */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
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

        {/* 5. Film grain texture overlay */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px',
          }}
        />

        {/* 6. WebGL volumetric fog/haze — covers middle to bottom */}
        <CloudFog
          scrollProgress={scrollProgress}
          className="z-[5]"
        />

        {/* ═══ CONTENT — Centered, modern, approachable ═══ */}
        <div className="hero-content-layer relative z-[6] w-full max-w-[920px] mx-auto px-6 flex flex-col items-center text-center pointer-events-none">

          {/* Atmospheric light bloom behind headline — dual purple + gold */}
          <div
            className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(70,29,76,0.25) 0%, rgba(70,29,76,0.12) 25%, rgba(218,165,32,0.08) 50%, transparent 75%)',
              filter: 'blur(80px)',
              opacity: 0.8,
            }}
          />

          {/* Kicker pill — parallax layer (fastest, drifts up first) */}
          <div
            className="reveal-fade pointer-events-auto mb-8 hero-parallax-layer"
            data-parallax-speed="1.8"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] text-[11px] md:text-[12px] tracking-[0.1em] uppercase font-medium text-white/70"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" />
              Dakar · BRVM · UEMOA
            </span>
          </div>

          {/* Headline — bold, each line at different parallax speed */}
          <h1 className="hero-headline mb-6 md:mb-10 flex flex-col items-center relative">
            <span className="block overflow-hidden pb-1 hero-parallax-layer" data-parallax-speed="1.4">
              <span
                className="hero-headline-line block text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.08] tracking-[-0.03em] font-bold text-white"
                style={{ 
                  fontFamily: 'var(--font-primary)', 
                  textShadow: '0 0 40px rgba(218,165,32,0.3), 0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                L'excellence
              </span>
            </span>
            <span className="block overflow-hidden pb-1 hero-parallax-layer" data-parallax-speed="1.0">
              <span
                className="hero-headline-line block text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.08] tracking-[-0.03em] font-bold text-[var(--jaune-or)]"
                style={{ 
                  fontFamily: 'var(--font-primary)', 
                  textShadow: '0 0 60px rgba(218,165,32,0.5), 0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                au sommet
              </span>
            </span>
            <span className="block overflow-hidden pb-1 hero-parallax-layer" data-parallax-speed="0.6">
              <span
                className="hero-headline-line block text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.08] tracking-[-0.03em] font-bold text-white"
                style={{ 
                  fontFamily: 'var(--font-primary)', 
                  textShadow: '0 0 40px rgba(218,165,32,0.3), 0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                du capital.
              </span>
            </span>
          </h1>

          {/* Subhead — parallax layer */}
          <div
            className="reveal-fade max-w-[480px] mb-10 md:mb-12 pointer-events-auto hero-parallax-layer"
            data-parallax-speed="0.4"
          >
            <p
              className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-white/75 font-normal drop-shadow-md"
              style={{ fontFamily: 'var(--font-primary)', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              Courtage BRVM, émissions primaires et ingénierie financière.
              La rigueur d'une institution au service de vos ambitions.
            </p>
          </div>

          {/* CTAs — rounded pills, modern feel */}
          <div className="reveal-fade flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 md:mb-16 pointer-events-auto hero-parallax-layer" data-parallax-speed="0.2">
            <MagneticButton
              as="a"
              href="#services"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl active:scale-[0.98] focus:outline-none"
              style={{
                background: 'var(--mauve)',
                color: 'var(--pure-white)',
                boxShadow: '0 4px 24px rgba(70,29,76,0.4)',
              }}
              strength={40}
            >
              <span
                className="text-[13px] font-semibold tracking-wide"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Voir nos services
              </span>
              <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/auth"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/[0.08] backdrop-blur-sm text-white border border-white/[0.15] rounded-full transition-all duration-300 hover:bg-white/[0.15] hover:border-white/[0.25] active:scale-[0.98] focus:outline-none"
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

          {/* Trust markers — purple-tinted glass pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16 md:mb-0">
            {['Agrément CREPMF', "30+ années d'expertise", 'BRVM · UEMOA'].map((label) => (
              <div
                key={label}
                className="trust-marker flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
                style={{
                  background: 'rgba(70,29,76,0.2)',
                  border: '1px solid rgba(70,29,76,0.3)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" style={{ boxShadow: '0 0 6px rgba(202,148,47,0.5)' }} />
                <span
                  className="text-[11px] md:text-[12px] tracking-[0.04em] text-white/80 font-medium"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[7] reveal-fade pointer-events-none">
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
