import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

type Service = {
  id: string;
  number: string;
  title: string;
  desc: string;
  href: string;
  detail: string[];
};

const services: Service[] = [
  {
    id: 'ing-fin',
    number: '01',
    title: 'Ingénierie financière',
    desc: "Structuration d'opérations complexes, levées de fonds et émissions obligataires sur le marché régional UEMOA.",
    detail: ['Émissions primaires', 'Levée de fonds', 'Obligations structurées'],
    href: '/ingenieurie-financiere',
  },
  {
    id: 'marche-cap',
    number: '02',
    title: 'Marché des capitaux',
    desc: 'Courtage actions et obligations BRVM, gestion sous-mandat et placements institutionnels avec une exécution de précision.',
    detail: ['Courtage BRVM', 'Gestion sous mandat', 'Placements institutionnels'],
    href: '/marche-capitaux',
  },
  {
    id: 'rech-ana',
    number: '03',
    title: 'Recherche & analyses',
    desc: 'Veille macroéconomique, notes sectorielles et tableaux de bord des marchés UEMOA pour des décisions éclairées.',
    detail: ['Macroéconomie', 'Notes sectorielles', 'Marchés UEMOA'],
    href: '/recherche-analyses',
  },
];

// Per-service color palette — explicit, no string manipulation
const SERVICE_COLORS = [
  { ghost: 'rgba(202,148,47,0.09)',  bloom: 'rgba(202,148,47,0.07)',  pillBg: 'rgba(202,148,47,0.07)',  pillBorder: 'rgba(202,148,47,0.18)', pillText: 'rgba(202,148,47,0.75)' },
  { ghost: 'rgba(70,29,76,0.4)',     bloom: 'rgba(70,29,76,0.22)',    pillBg: 'rgba(70,29,76,0.25)',    pillBorder: 'rgba(120,60,140,0.35)', pillText: 'rgba(190,145,210,0.85)' },
  { ghost: 'rgba(95,55,115,0.28)',   bloom: 'rgba(85,45,105,0.16)',   pillBg: 'rgba(85,45,105,0.2)',    pillBorder: 'rgba(110,65,135,0.3)',  pillText: 'rgba(165,125,195,0.8)'  },
];

// ── Mobile item ──────────────────────────────────────────────────────────────
const ServiceMobileItem: React.FC<{ svc: Service; index: number }> = ({ svc, index }) => {
  const c = SERVICE_COLORS[index];
  return (
    <a
      href={svc.href}
      className="svc-mobile-item group flex flex-col gap-4 py-8 border-b border-white/[0.07] last:border-0"
    >
      <div className="flex items-center justify-between">
        <span style={{
          fontFamily: 'var(--font-primary)', fontWeight: 800,
          fontSize: '0.7rem', letterSpacing: '0.12em',
          color: index === 0 ? 'var(--jaune-or)' : 'rgba(202,148,47,0.4)',
        }}>
          {svc.number}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(202,148,47,0.12)]"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <FiArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--jaune-or)] transition-colors duration-300" />
        </div>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-primary)', fontWeight: 700,
        fontSize: '1.35rem', lineHeight: 1.2, letterSpacing: '-0.02em',
        color: 'var(--pure-white)',
      }}>
        {svc.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-primary)', fontWeight: 300,
        fontSize: '0.9rem', lineHeight: 1.7,
        color: 'rgba(255,255,255,0.45)',
      }}>
        {svc.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-1">
        {svc.detail.map(d => (
          <span key={d} style={{
            fontFamily: 'var(--font-primary)', fontWeight: 400,
            fontSize: '0.7rem', letterSpacing: '0.06em',
            color: c.pillText, textTransform: 'uppercase',
            padding: '0.3rem 0.75rem',
            border: `1px solid ${c.pillBorder}`,
            borderRadius: '999px',
            background: c.pillBg,
          }}>
            {d}
          </span>
        ))}
      </div>
    </a>
  );
};

// ── Desktop: scroll-pinned reveal ────────────────────────────────────────────
export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIdxRef = useRef(0);

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Stable callback — only updates React state when index actually changes
  const updateActiveIndex = useCallback((idx: number) => {
    if (idx !== lastIdxRef.current) {
      lastIdxRef.current = idx;
      setActiveIndex(idx);
    }
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const mm = gsap.matchMedia();

    // Defer GSAP initialization to the next frame so the DOM is fully painted,
    // avoiding the _getComputedProperty recursion in CSSPlugin.
    const rafId = requestAnimationFrame(() => {
      mm.add('(min-width: 768px)', (ctx) => {
        // Scope all queries to the section to avoid global collisions
        const panels = gsap.utils.toArray<HTMLElement>('.svc-panel', section);
        const bar    = section.querySelector<HTMLElement>('.svc-progress-bar');

        const count = services.length;
        const vh = window.innerHeight;

        // NOTE: Initial panel states are now set via inline styles in JSX
        // to avoid gsap.set() triggering _getComputedTransformMatrixAsArray
        // recursion in CSSPlugin.

        // ── Single scrubbed master timeline ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${vh * (count - 1)}`,
            pin: pin,
            pinSpacing: true,
            scrub: 0.8,
            onUpdate(self) {
              const raw = self.progress * (count - 1);
              updateActiveIndex(Math.min(Math.round(raw), count - 1));
            },
          },
        });

        // Progress bar — scrubs from 0 to 1 across the full timeline
        if (bar) tl.to(bar, { scaleY: 1, ease: 'none' }, 0);

        // Panel cross-fades — each transition occupies 1 unit
        for (let i = 1; i < count; i++) {
          const prev = panels[i - 1];
          const curr = panels[i];
          const start = i - 1;
          const mid   = i - 0.5;

          // Outgoing: fade + slide up
          tl.to(prev, { opacity: 0, y: -32, ease: 'power2.inOut' }, start);
          // Incoming: fade + slide up from below
          tl.fromTo(curr,
            { opacity: 0, y: 48 },
            { opacity: 1, y: 0, ease: 'power2.out' },
            mid - 0.3
          );
        }

        // ── Resize refresh ──
        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', onResize);

        // Header entrance (no filter animation — avoids CSSPlugin recursion)
        gsap.fromTo('.svc-header',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        return () => {
          window.removeEventListener('resize', onResize);
          ctx.revert();
        };
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      mm.revert();
    };
  }, [prefersReduced, updateActiveIndex]);

  // Mobile entrance
  useEffect(() => {
    if (prefersReduced) return;
    const items = gsap.utils.toArray<HTMLElement>('.svc-mobile-item');
    items.forEach((el, i) => {
      gsap.fromTo(el,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, delay: i * 0.07, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }
      );
    });
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #2a1636 0%, #1a0e24 50%, #110b18 100%)' }}
    >
      {/* Global atmospheric depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[10%] w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(70,29,76,0.28) 0%, transparent 60%)', filter: 'blur(120px)' }} />
        <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(202,148,47,0.06) 0%, transparent 65%)', filter: 'blur(90px)' }} />
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden relative z-10 mx-auto max-w-[600px] px-6 py-16">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[11px] tracking-[0.08em] uppercase font-medium"
            style={{ fontFamily: 'var(--font-primary)', color: 'var(--jaune-or)', background: 'rgba(202,148,47,0.08)', border: '1px solid rgba(202,148,47,0.15)' }}>
            Ce que nous faisons
          </span>
          <h2 style={{
            fontFamily: 'var(--font-primary)', fontWeight: 800,
            fontSize: 'clamp(2rem, 7vw, 2.8rem)', lineHeight: 1.08, letterSpacing: '-0.03em',
            color: 'var(--pure-white)',
          }}>
            Une offre complète pour chaque{' '}
            <span style={{ color: 'var(--jaune-or)' }}>profil d'investisseur.</span>
          </h2>
        </div>
        {services.map((svc, i) => <ServiceMobileItem key={svc.id} svc={svc} index={i} />)}
      </div>

      {/* ── DESKTOP pinned ── */}
      <div ref={pinRef} className="hidden md:flex w-full h-screen relative z-10">

        {/* Left panel — warm mauve identity */}
        <div
          className="flex flex-col justify-between w-[42%] h-full px-12 lg:px-16 py-16 shrink-0 relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, rgba(70,29,76,0.55) 0%, rgba(50,18,58,0.45) 60%, rgba(30,10,40,0.3) 100%)' }}
        >
          <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(circle at 0% 0%, rgba(70,29,76,0.5) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 left-[20%] w-[300px] h-[200px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(202,148,47,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

          {/* Section identity */}
          <div className="svc-header relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[11px] tracking-[0.08em] uppercase font-medium"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--jaune-or)', background: 'rgba(202,148,47,0.08)', border: '1px solid rgba(202,148,47,0.15)' }}>
              Ce que nous faisons
            </span>
            <h2 style={{
              fontFamily: 'var(--font-primary)', fontWeight: 800,
              fontSize: 'clamp(2rem, 3vw, 2.8rem)', lineHeight: 1.08, letterSpacing: '-0.03em',
              color: 'var(--pure-white)', maxWidth: '18rem',
            }}>
              Une offre complète pour chaque{' '}
              <span style={{ color: 'var(--jaune-or)' }}>profil d'investisseur.</span>
            </h2>
            <p className="mt-5" style={{
              fontFamily: 'var(--font-primary)', fontWeight: 300,
              fontSize: '0.95rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.4)', maxWidth: '22rem',
            }}>
              Structuration, exécution, recherche — l'ensemble du cycle d'investissement sur les marchés de l'UEMOA.
            </p>
          </div>

          {/* Progress nav */}
          <div className="flex items-center gap-6 relative z-10">
            <div className="relative w-[2px] h-20 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="svc-progress-bar absolute top-0 left-0 w-full h-full origin-top"
                style={{ background: 'linear-gradient(180deg, var(--mauve) 0%, var(--jaune-or) 100%)', transform: 'scaleY(0)' }}
              />
            </div>
            <div className="flex flex-col gap-4">
              {services.map((svc, i) => (
                <button
                  key={svc.id}
                  className="flex items-center gap-3 text-left group/dot"
                  onClick={() => {
                    // Allow clicking dots to jump to that service
                    const section = sectionRef.current;
                    if (!section) return;
                    const vh = window.innerHeight;
                    const top = section.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: top + vh * i, behavior: 'smooth' });
                  }}
                >
                  <div
                    className="svc-dot rounded-full transition-all duration-400"
                    style={{
                      width: i === activeIndex ? '8px' : '6px',
                      height: i === activeIndex ? '8px' : '6px',
                      background: i === activeIndex ? 'var(--jaune-or)' : 'rgba(255,255,255,0.2)',
                      boxShadow: i === activeIndex ? '0 0 8px rgba(202,148,47,0.5)' : 'none',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                  <span
                    className="svc-dot-label"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: i === activeIndex ? 500 : 400,
                      fontSize: '0.75rem',
                      letterSpacing: '0.04em',
                      color: i === activeIndex ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
                      transition: 'color 0.35s ease, font-weight 0.35s ease',
                    }}
                  >
                    {svc.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="w-[1px] h-full shrink-0" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(70,29,76,0.6) 25%, rgba(202,148,47,0.35) 65%, transparent 100%)',
        }} />

        {/* Right panel — deep stage */}
        <div
          className="relative flex-1 h-full overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f0a14 0%, #0c0810 60%, #110b18 100%)' }}
        >
          {services.map((svc, i) => {
            const c = SERVICE_COLORS[i];
            return (
              <div
                key={svc.id}
                className="svc-panel absolute inset-0 flex flex-col justify-center px-12 lg:px-16"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0px)' : 'translateY(48px)',
                  willChange: 'opacity, transform',
                }}
              >
                {/* Per-service atmospheric bloom */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 80% 40%, ${c.bloom} 0%, transparent 55%)`, filter: 'blur(60px)' }} />

                {/* Ghost number */}
                <div
                  className="absolute top-10 right-8 select-none pointer-events-none"
                  style={{
                    fontFamily: 'var(--font-primary)', fontWeight: 900,
                    fontSize: 'clamp(7rem, 13vw, 10rem)', lineHeight: 1,
                    letterSpacing: '-0.05em', color: c.ghost,
                  }}
                >
                  {svc.number}
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-[480px]">
                  {/* Number + rule */}
                  <div className="flex items-center gap-4 mb-8">
                    <span style={{
                      fontFamily: 'var(--font-primary)', fontWeight: 800,
                      fontSize: '0.7rem', letterSpacing: '0.14em',
                      color: 'var(--jaune-or)',
                    }}>
                      {svc.number}
                    </span>
                    <div style={{ width: '2.5rem', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-primary)', fontWeight: 700,
                    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', lineHeight: 1.15,
                    letterSpacing: '-0.025em', color: 'var(--pure-white)',
                    marginBottom: '1.25rem',
                  }}>
                    {svc.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-primary)', fontWeight: 300,
                    fontSize: '1.05rem', lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: '2.5rem',
                  }}>
                    {svc.desc}
                  </p>

                  {/* Detail pills */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {svc.detail.map(d => (
                      <span key={d} style={{
                        fontFamily: 'var(--font-primary)', fontWeight: 400,
                        fontSize: '0.7rem', letterSpacing: '0.07em',
                        color: c.pillText, textTransform: 'uppercase',
                        padding: '0.35rem 0.9rem',
                        border: `1px solid ${c.pillBorder}`,
                        borderRadius: '999px',
                        background: c.pillBg,
                      }}>
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={svc.href}
                    className="group/cta inline-flex items-center gap-3 transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-primary)', fontWeight: 600,
                      fontSize: '0.875rem', color: 'var(--jaune-or)',
                      padding: '0.75rem 1.5rem',
                      border: '1px solid rgba(202,148,47,0.28)',
                      borderRadius: '999px',
                      background: 'rgba(202,148,47,0.05)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(202,148,47,0.13)';
                      e.currentTarget.style.borderColor = 'rgba(202,148,47,0.5)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(202,148,47,0.12)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(202,148,47,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(202,148,47,0.28)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Explorer ce service
                    <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reduced motion: show all panels statically */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .svc-panel {
            position: relative !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
