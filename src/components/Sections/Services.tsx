import React, { useRef, useEffect } from 'react';
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
  detail: string;
};

const services: Service[] = [
  {
    id: 'ing-fin',
    number: '01',
    title: 'Ingénierie financière',
    desc: "Structuration d'opérations complexes, levées de fonds et émissions obligataires sur le marché régional UEMOA.",
    detail: 'Émissions primaires · Levée de fonds · Obligations',
    href: '/ingenieurie-financiere',
  },
  {
    id: 'marche-cap',
    number: '02',
    title: 'Marché des capitaux',
    desc: 'Courtage actions et obligations BRVM, gestion sous-mandat et placements institutionnels.',
    detail: 'Courtage BRVM · Gestion sous mandat',
    href: '/marche-capitaux',
  },
  {
    id: 'rech-ana',
    number: '03',
    title: 'Recherche & analyses',
    desc: 'Veille macroéconomique, notes sectorielles et tableaux de bord des marchés UEMOA.',
    detail: 'Macroéconomie · Notes sectorielles',
    href: '/recherche-analyses',
  },
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  // Ambient cursor light
  useEffect(() => {
    const section = sectionRef.current;
    const ambient = ambientRef.current;
    if (!section || !ambient) return;
    let rafId: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ambient.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(202,148,47,0.07), rgba(70,29,76,0.1) 40%, transparent 65%)`;
        ambient.style.opacity = '1';
      });
    };
    const onLeave = () => { if (rafId) cancelAnimationFrame(rafId); ambient.style.opacity = '0'; };
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll reveals
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const triggers: ScrollTrigger[] = [];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const header = gsap.fromTo('.svc-header',
      { y: 40, opacity: 0, filter: 'blur(6px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none reverse' } }
    );
    if (header.scrollTrigger) triggers.push(header.scrollTrigger);

    // Featured card
    const featured = gsap.fromTo('.svc-featured',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.svc-featured', start: 'top 82%', toggleActions: 'play none none reverse' } }
    );
    if (featured.scrollTrigger) triggers.push(featured.scrollTrigger);

    // Secondary cards stagger
    gsap.utils.toArray('.svc-secondary').forEach((el: any, i: number) => {
      const t = gsap.fromTo(el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  const [featured, ...secondary] = services;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #2e1a3a 0%, #1e1028 45%, #130c1a 100%)',
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      {/* Static atmospheric depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[15%] w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(70,29,76,0.3) 0%, transparent 55%)', filter: 'blur(130px)' }} />
        <div className="absolute bottom-[-5%] right-[5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(202,148,47,0.05) 0%, transparent 60%)', filter: 'blur(100px)' }} />
      </div>

      {/* Ambient cursor overlay */}
      <div ref={ambientRef} className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500" style={{ opacity: 0 }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="svc-header mb-14 md:mb-16">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium"
            style={{ fontFamily: 'var(--font-primary)', color: 'var(--jaune-or)', background: 'rgba(202,148,47,0.08)', border: '1px solid rgba(202,148,47,0.15)' }}
          >
            Ce que nous faisons
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                color: 'var(--pure-white)',
                maxWidth: '22rem',
              }}
            >
              Une offre complète pour chaque{' '}
              <span style={{ color: 'var(--jaune-or)' }}>profil d'investisseur.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.45)',
                maxWidth: '26rem',
              }}
            >
              Structuration, exécution, recherche — nous couvrons l'ensemble du cycle d'investissement sur les marchés de l'UEMOA.
            </p>
          </div>
        </div>

        {/* ── ASYMMETRIC LAYOUT ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 md:gap-5">

          {/* Featured — left, full height */}
          <a
            href={featured.href}
            className="svc-featured group relative flex flex-col justify-between rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 'clamp(2rem, 4vw, 2.75rem)',
              minHeight: '420px',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(202,148,47,0.25)';
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 800,
                fontSize: 'clamp(4rem, 8vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: 'rgba(202,148,47,0.12)',
                display: 'block',
                marginBottom: '1rem',
                transition: 'color 0.4s ease',
              }}
              className="group-hover:!text-[rgba(202,148,47,0.2)]"
            >
              {featured.number}
            </span>

            {/* Content */}
            <div>
              {/* Gold accent line */}
              <div
                className="mb-6 transition-all duration-500 group-hover:w-16"
                style={{ width: '2.5rem', height: '2px', background: 'var(--jaune-or)', opacity: 0.7 }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--pure-white)',
                  marginBottom: '1rem',
                }}
              >
                {featured.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 300,
                  fontSize: '0.975rem',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '1.5rem',
                  maxWidth: '28rem',
                }}
              >
                {featured.desc}
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 400,
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.25)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '2rem',
                }}
              >
                {featured.detail}
              </span>
              <span
                className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.875rem', color: 'var(--jaune-or)' }}
              >
                Explorer
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </a>

          {/* Secondary — right column, stacked */}
          <div className="flex flex-col gap-4 md:gap-5">
            {secondary.map((svc) => (
              <a
                key={svc.id}
                href={svc.href}
                className="svc-secondary group relative flex flex-col justify-between rounded-2xl overflow-hidden flex-1"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(202,148,47,0.2)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Number + accent line inline */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        style={{
                          fontFamily: 'var(--font-primary)',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          letterSpacing: '0.1em',
                          color: 'rgba(202,148,47,0.5)',
                        }}
                      >
                        {svc.number}
                      </span>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 600,
                        fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                        lineHeight: 1.25,
                        letterSpacing: '-0.01em',
                        color: 'var(--pure-white)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 300,
                        fontSize: '0.9rem',
                        lineHeight: 1.65,
                        color: 'rgba(255,255,255,0.45)',
                        marginBottom: '1.25rem',
                      }}
                    >
                      {svc.desc}
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 400,
                        fontSize: '0.7rem',
                        letterSpacing: '0.06em',
                        color: 'rgba(255,255,255,0.2)',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '1.25rem',
                      }}
                    >
                      {svc.detail}
                    </span>
                  </div>
                  {/* Arrow — top right */}
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(202,148,47,0.15)] group-hover:scale-110"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                  >
                    <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--jaune-or)]" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
