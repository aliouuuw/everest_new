import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Waypoint = {
  number: string;
  title: string;
  description: string;
  altitude: string;
};

const waypoints: Waypoint[] = [
  {
    number: '01',
    title: 'Sécurité réglementaire',
    description: 'Garde sécurisée de vos actifs sous agrément CREPMF et conformité aux normes les plus strictes.',
    altitude: 'Base',
  },
  {
    number: '02',
    title: 'Accompagnement dédié',
    description: 'Un conseiller personnel, une écoute permanente et une transparence totale.',
    altitude: 'Ascension',
  },
  {
    number: '03',
    title: 'Performance optimisée',
    description: 'Allocation stratégique, exécution précise et recherche indépendante.',
    altitude: 'Sommet',
  },
];

export const ValueProps: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dur = prefersReduced ? 0 : 1;

      // Header fade in with blur-to-sharp reveal
      gsap.fromTo('.vp-header',
        { y: prefersReduced ? 0 : 24, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: dur * 0.5, ease: 'expo.out',
          scrollTrigger: { trigger: '.vp-header', start: 'top 88%', toggleActions: 'play none none reverse' } }
      );

      // Desktop Timeline Animation
      const tlDesktop = gsap.timeline({
        scrollTrigger: { trigger: '.vp-desktop-graph', start: 'top 80%', toggleActions: 'play none none reverse' }
      });

      // Line draw — fast and snappy
      if (pathRef.current) {
        tlDesktop.fromTo(pathRef.current,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: dur * 0.9, ease: 'expo.out' }, 0
        );
      }

      // Nodes pop-in — tight stagger
      gsap.utils.toArray('.vp-node-d').forEach((el: any, i: number) => {
        tlDesktop.fromTo(el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: dur * 0.35, ease: 'back.out(2.5)' },
          dur * (0.2 + i * 0.2)
        );
      });

      // Text fade-up — tight stagger right behind nodes
      gsap.utils.toArray('.vp-text-d').forEach((el: any, i: number) => {
        tlDesktop.fromTo(el,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: dur * 0.4, ease: 'power3.out' },
          dur * (0.25 + i * 0.2)
        );
      });

      // Mobile Timeline Animation
      gsap.utils.toArray('.vp-mobile-step').forEach((el: any, i: number) => {
        gsap.fromTo(el,
          { x: prefersReduced ? 0 : -20, opacity: 0 },
          { x: 0, opacity: 1, duration: dur * 0.4, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'var(--summit-ivory)',
        paddingTop: 'clamp(3.5rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 5rem)',
      }}
    >
      {/* Gradient mesh background with atmospheric depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right: large mauve bloom */}
        <div
          className="absolute top-[-15%] right-[-5%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(70,29,76,0.18) 0%, rgba(70,29,76,0.08) 40%, transparent 65%)',
            filter: 'blur(72px)',
          }}
        />
        {/* Bottom-left: gold warmth */}
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(202,148,47,0.14) 0%, rgba(202,148,47,0.06) 40%, transparent 65%)',
            filter: 'blur(64px)',
          }}
        />
        {/* Center: soft mauve depth */}
        <div
          className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(70,29,76,0.08) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Fine grain texture overlay — premium feel */}
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            opacity: 0.06,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-12 lg:px-16">
        
        {/* Header Block — Modern Professional Triple Pattern */}
        <div className="vp-header text-center mb-10 md:mb-12">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium transition-transform hover:scale-105 duration-300"
            style={{ fontFamily: 'var(--font-primary)', color: 'var(--pure-white)', background: 'var(--mauve)' }}
          >
            Notre approche
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--night)',
              marginBottom: '1.25rem',
            }}
          >
            Construire. Protéger.{' '}
            <span style={{ color: 'var(--mauve)' }}>Faire croître.</span>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--night-60)',
              maxWidth: '34rem',
            }}
          >
            Sécurité réglementaire, accompagnement personnalisé, performance durable — 
            trois engagements qui guident chaque décision.
          </p>
        </div>

        {/* =========================================
            DESKTOP LAYOUT: CLEAN ASCENDING GRAPH
            ========================================= */}
        <div className="hidden md:block vp-desktop-graph w-full relative">
          
          {/* 1. The Graph Container */}
          <div className="relative w-full h-[200px] mb-4">
            {/* SVG Curve — cleaner, more precise */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 900 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="curveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--mauve)" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="var(--mauve)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="var(--jaune-or)" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 150 160 C 300 160, 300 90, 450 90 C 600 90, 600 30, 750 30"
                fill="none"
                stroke="rgba(70,29,76,0.08)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                ref={pathRef}
                d="M 150 160 C 300 160, 300 90, 450 90 C 600 90, 600 30, 750 30"
                fill="none"
                stroke="url(#curveGrad)"
                strokeWidth="3.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                filter="url(#glow)"
              />
            </svg>

            {/* Nodes precisely positioned */}
            {[160, 90, 30].map((topPos, i) => {
              const isSummit = i === 2;
              return (
                <div
                  key={i}
                  className="vp-node-d absolute flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${(i * 33.33) + 16.66}%`,
                    top: `${topPos}px`,
                    transform: 'translate(-50%, -50%)',
                    width: isSummit ? '48px' : '44px',
                    height: isSummit ? '48px' : '44px',
                    background: isSummit 
                      ? 'linear-gradient(135deg, var(--mauve) 0%, var(--jaune-or) 100%)' 
                      : 'var(--mauve)',
                    boxShadow: isSummit 
                      ? '0 8px 24px rgba(202,148,47,0.3), 0 0 40px rgba(202,148,47,0.2)' 
                      : '0 6px 16px rgba(70,29,76,0.25)',
                    zIndex: 20,
                    cursor: 'pointer',
                  }}
                >
                  <span 
                    className="text-[13px] font-bold text-white" 
                    style={{ fontFamily: 'var(--font-primary)' }}
                  >
                    {waypoints[i].number}
                  </span>
                  {/* Summit glow pulse — CSS keyframe, not animate-ping */}
                  {isSummit && (
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-[var(--jaune-or)]" 
                      style={{ 
                        animation: 'summitPulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite',
                        opacity: 0.4,
                      }} 
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* 2. The Text Grid — robust flexbox layout */}
          <div className="grid grid-cols-3 gap-8 text-center">
            {waypoints.map((wp, i) => {
              const isSummit = i === 2;
              return (
                <div 
                  key={wp.number} 
                  className="vp-text-d flex flex-col items-center px-4"
                  style={{
                    // Offset text vertically to align with node heights
                    marginTop: i === 0 ? '0px' : i === 1 ? '-44px' : '-88px',
                  }}
                >
                  <div 
                    className="text-[11px] font-bold tracking-[0.1em] uppercase mb-3" 
                    style={{ 
                      fontFamily: 'var(--font-primary)', 
                      color: isSummit ? 'var(--jaune-or)' : 'var(--mauve)' 
                    }}
                  >
                    {wp.altitude}
                  </div>
                  <h3 
                    className="mb-3 transition-colors duration-300 hover:text-[var(--mauve)]" 
                    style={{ 
                      fontFamily: 'var(--font-primary)', 
                      fontWeight: 700, 
                      fontSize: '1.3rem', 
                      lineHeight: 1.25, 
                      letterSpacing: '-0.01em', 
                      color: 'var(--night)',
                      cursor: 'default',
                    }}
                  >
                    {wp.title}
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-primary)', 
                      fontWeight: 400, 
                      fontSize: '0.95rem', 
                      lineHeight: 1.65, 
                      color: 'var(--night-60)', 
                      maxWidth: '280px' 
                    }}
                  >
                    {wp.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================
            MOBILE LAYOUT: VERTICAL TIMELINE
            ========================================= */}
        <div className="md:hidden flex flex-col gap-12 relative ml-2 py-4">
          {/* Vertical connecting line — gradient */}
          <div 
            className="absolute left-[21px] top-0 bottom-0 w-[3px] rounded-full" 
            style={{ 
              background: 'linear-gradient(180deg, rgba(70,29,76,0.3) 0%, var(--mauve) 40%, var(--jaune-or) 100%)',
            }} 
          />
          
          {waypoints.map((wp, i) => {
            const isSummit = i === 2;
            return (
              <div key={wp.number} className="vp-mobile-step relative pl-16">
                {/* Node */}
                <div
                  className="absolute left-0 top-1 rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-300 hover:scale-110"
                  style={{
                    width: isSummit ? '44px' : '42px',
                    height: isSummit ? '44px' : '42px',
                    background: isSummit 
                      ? 'linear-gradient(135deg, var(--mauve) 0%, var(--jaune-or) 100%)' 
                      : 'var(--mauve)',
                    boxShadow: isSummit 
                      ? '0 6px 20px rgba(202,148,47,0.3)' 
                      : '0 4px 12px rgba(70,29,76,0.2)',
                  }}
                >
                  <span 
                    className="text-[13px] font-bold text-white" 
                    style={{ fontFamily: 'var(--font-primary)' }}
                  >
                    {wp.number}
                  </span>
                  {isSummit && (
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-[var(--jaune-or)]" 
                      style={{ 
                        animation: 'summitPulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite',
                        opacity: 0.4,
                      }} 
                    />
                  )}
                </div>

                {/* Text */}
                <div 
                  className="text-[10px] font-bold tracking-[0.1em] uppercase mb-2" 
                  style={{ 
                    fontFamily: 'var(--font-primary)', 
                    color: isSummit ? 'var(--jaune-or)' : 'var(--mauve)' 
                  }}
                >
                  {wp.altitude}
                </div>
                <h3 
                  className="mb-2" 
                  style={{ 
                    fontFamily: 'var(--font-primary)', 
                    fontWeight: 700, 
                    fontSize: '1.25rem', 
                    lineHeight: 1.25, 
                    color: 'var(--night)' 
                  }}
                >
                  {wp.title}
                </h3>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-primary)', 
                    fontWeight: 400, 
                    fontSize: '0.95rem', 
                    lineHeight: 1.65, 
                    color: 'var(--night-60)' 
                  }}
                >
                  {wp.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* CSS Keyframe for summit pulse — smooth, not jarring */}
      <style>{`
        @keyframes summitPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.1;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .vp-node-d,
          .vp-node-d > div {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};
