import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';

export const HeroSectionMountain: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Initial states
      gsap.set('.reveal-text', { yPercent: 120 });
      gsap.set('.reveal-fade', { opacity: 0, y: 20 });
      gsap.set('.hero-line', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.mountain-plate', { opacity: 0, scale: 1.06 });
      gsap.set('.glass-veil', { opacity: 0 });
      gsap.set('.grain-layer', { opacity: 0 });
      gsap.set('.shimmer-band', { opacity: 0, x: '-110%' });
      gsap.set('.trust-marker', { opacity: 0 });

      // ─── Entrance choreography ───
      // 1. Mountain fades in with subtle scale
      tl.to('.mountain-plate', { opacity: 1, scale: 1.02, duration: 3, ease: 'power2.out' })
        // 2. Glass veils emerge
        .to('.glass-veil', { opacity: 1, duration: 2.5, stagger: 0.3, ease: 'power2.inOut' }, '-=2.5')
        // 3. Grain fades in
        .to('.grain-layer', { opacity: 0.035, duration: 2 }, '-=2')
        // 4. Typography reveals
        .to('.reveal-text', { yPercent: 0, duration: 1.4, stagger: 0.06, ease: 'expo.out' }, '-=1.5')
        // 5. Decorative line
        .to('.hero-line', { scaleX: 1, duration: 1, ease: 'power3.inOut' }, '-=0.8')
        // 6. Fade elements (subhead, CTAs)
        .to('.reveal-fade', { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power2.out' }, '-=0.6')
        // 7. Trust markers
        .to('.trust-marker', { opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.4')
        // 8. Shimmer sweep across (delight moment)
        .to('.shimmer-band', { opacity: 0.15, x: '110%', duration: 2.5, ease: 'power2.inOut' }, '-=0.5');

      // ─── Ambient breathing ───
      // Glass veils drift almost imperceptibly
      gsap.to('.veil-1', {
        x: '+=15', y: '-=10',
        duration: 22, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
      gsap.to('.veil-2', {
        x: '-=18', y: '+=12',
        duration: 28, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
      gsap.to('.veil-3', {
        x: '+=10', y: '+=8',
        duration: 25, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });

      // Veils breathe: opacity softly pulsing
      gsap.to('.veil-1', {
        opacity: 0.7, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
      gsap.to('.veil-2', {
        opacity: 0.6, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });

      // Mountain plate: occasionally slightly more/less visible
      gsap.to('.mountain-plate', {
        opacity: 0.85, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3
      });

      // Grain drifts slowly
      gsap.to('.grain-layer', {
        backgroundPosition: '20px 20px',
        duration: 8, repeat: -1, ease: 'none'
      });

      // Shimmer band repeats slowly
      gsap.to('.shimmer-band', {
        x: '110%', duration: 6, repeat: -1, repeatDelay: 12,
        ease: 'power1.inOut',
        onRepeat: function() {
          gsap.set('.shimmer-band', { x: '-110%' });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex items-end bg-[#faf9f7] text-[var(--night)] overflow-hidden selection:bg-[var(--mauve-20)] selection:text-[var(--night)]"
    >
      {/* ══════════════════════════════════════════════
          LAYER 1 — Mountain Plate
          Light image, desaturated, subtle scale-up.
          NO mix-blend-multiply — keeps it light & airy.
      ══════════════════════════════════════════════ */}
      <div 
        className="mountain-plate absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'url(/generated_bg_2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          filter: 'saturate(0.4) brightness(1.1)',
          willChange: 'transform, opacity',
        }}
      />

      {/* ══════════════════════════════════════════════
          LAYER 2 — Atmospheric Tint
          Ivory → pale mauve wash with faint gold horizon.
          Creates the "looking through frosted glass" base.
      ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(250,249,247,0.35) 0%,
              rgba(220,218,210,0.25) 30%,
              rgba(202,148,47,0.06) 55%,
              rgba(70,29,76,0.05) 70%,
              rgba(250,249,247,0.85) 100%
            )
          `,
        }}
      />

      {/* ══════════════════════════════════════════════
          LAYER 3 — Glass Veils
          2-4 oversized translucent blurred shapes.
          Slow drift, material feel. Breathing opacity.
      ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Veil 1 — Mauve, upper-left */}
        <div className="glass-veil veil-1 absolute -top-[15%] -left-[10%] w-[55%] h-[65%] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse, rgba(70,29,76,0.09) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Veil 2 — Gold, lower-right horizon area */}
        <div className="glass-veil veil-2 absolute -bottom-[10%] -right-[8%] w-[60%] h-[55%] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse, rgba(202,148,47,0.08) 0%, transparent 60%)',
            filter: 'blur(110px)',
          }}
        />
        {/* Veil 3 — Timberwolf, center-right */}
        <div className="glass-veil veil-3 absolute top-[20%] right-[5%] w-[40%] h-[50%] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse, rgba(220,218,210,0.35) 0%, transparent 60%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          LAYER 4 — Noise / Grain
          Subtle warm-neutral grain, animated slowly.
      ══════════════════════════════════════════════ */}
      <div
        className="grain-layer absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* ══════════════════════════════════════════════
          LAYER 5 — Shimmer Band
          Imperceptible moving light band, repeats slowly.
      ══════════════════════════════════════════════ */}
      <div className="shimmer-band absolute inset-y-0 w-[30%] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(202,148,47,0.08), transparent)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />

      {/* ══════════════════════════════════════════════
          Bottom fog — ensures text area is always readable.
          Soft gradient, not a hard cutoff.
      ══════════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(250,249,247,0.95) 0%, rgba(250,249,247,0.6) 40%, transparent 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════
          CONTENT — Monumental, single-column, generous space.
          No cards. No grids of metrics. Just typography + air.
      ══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-24 pb-[clamp(3rem,8vh,6rem)] pt-[clamp(8rem,20vh,14rem)]">
        <div className="max-w-[1100px]">
          
          {/* Kicker */}
          <div className="reveal-fade flex items-center gap-3 mb-8 md:mb-10">
            <div className="hero-line h-[1.5px] w-8 bg-[var(--mauve)]" />
            <span
              className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium text-[var(--mauve-60)]"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Société de Gestion et d'Intermédiation — Dakar
            </span>
          </div>

          {/* Headline — monumental scale, left-aligned */}
          <h1 className="mb-8 md:mb-10">
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.025em] text-[var(--night)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                L'excellence
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.025em] italic text-[var(--mauve)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                au sommet
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                className="reveal-text block text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.025em] text-[var(--night)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                du capital.
              </span>
            </span>
          </h1>

          {/* Subhead — no border-left card, just clean text */}
          <div className="reveal-fade max-w-[520px] mb-10 md:mb-12">
            <p
              className="text-[clamp(0.95rem,1.2vw,1.125rem)] leading-[1.75] text-[var(--night-60)]"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400 }}
            >
              Courtage BRVM, émissions primaires et ingénierie financière.
              Nous opérons avec la rigueur d'une institution et la précision d'un partenaire dédié.
            </p>
          </div>

          {/* CTAs — clean, no bloat */}
          <div className="reveal-fade flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-14 md:mb-16">
            <a
              href="#services"
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--night)] text-white overflow-hidden transition-all duration-400 ease-out hover:shadow-lg hover:shadow-[var(--night)]/20 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
            >
              <div className="absolute inset-0 bg-[var(--mauve)] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
              <span className="relative z-10 text-[11px] tracking-[0.18em] uppercase font-semibold">
                Découvrir nos services
              </span>
              <FiArrowRight className="relative z-10 text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a
              href="/auth"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase font-semibold text-[var(--night-60)] hover:text-[var(--mauve)] transition-colors duration-300 py-3.5"
            >
              <span>Accès Client</span>
              <span className="text-[var(--jaune-or)]">→</span>
            </a>
          </div>

          {/* Trust markers — subtle inline text, NOT cards */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="trust-marker flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--jaune-or)]" />
              <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Agrément CREPMF
              </span>
            </div>
            <div className="trust-marker flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--jaune-or)]" />
              <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                30+ années d'expertise cumulées
              </span>
            </div>
            <div className="trust-marker flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--jaune-or)]" />
              <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                BRVM · UEMOA
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
