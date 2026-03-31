import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

type Capability = {
  id: string;
  number: string;
  title: string;
  desc: string;
  href: string;
  tags: string[];
};

const capabilities: Array<Capability> = [
  {
    id: "ing-fin",
    number: "01",
    title: 'Ingénierie financière',
    desc: "Structuration d'opérations, levées de fonds, émissions obligataires et placements primaires sur le marché régional. Nous concevons des solutions de financement sur-mesure pour accompagner votre croissance stratégique.",
    href: "/ingenieurie-financiere",
    tags: ["Structuration", "Levée de fonds", "Obligations"]
  },
  {
    id: "marche-cap",
    number: "02",
    title: 'Marché des capitaux',
    desc: "Gestion sous-mandat, courtage actions et obligations BRVM, émissions primaires et placements institutionnels. Une exécution précise sur les marchés financiers pour optimiser vos rendements.",
    href: "/marche-capitaux",
    tags: ["Courtage BRVM", "Gestion sous mandat", "Placements"]
  },
  {
    id: "rech-ana",
    number: "03",
    title: 'Recherche & analyses',
    desc: "Veille macroéconomique, notes sectorielles, analyses de valeurs et tableaux de bord des marchés UEMOA. Une intelligence de marché approfondie pour guider vos décisions d'investissement.",
    href: "/recherche-analyses",
    tags: ["Macroéconomie", "Notes sectorielles", "Marchés UEMOA"]
  },
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Subtle parallax on the background elements
    gsap.to('.service-bg-glow', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Reveal animations for capability panels
    const panels = gsap.utils.toArray('.capability-panel');
    panels.forEach((panel: any) => {
      gsap.fromTo(panel, 
        { 
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section || t.trigger && panels.includes(t.trigger)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: '#0a0a0c', // Deep almost black
        paddingTop: 'clamp(6rem, 15vw, 10rem)',
        paddingBottom: 'clamp(6rem, 15vw, 10rem)',
      }}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="service-bg-glow absolute top-0 left-[10%] w-[800px] h-[800px] rounded-full mix-blend-screen opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, rgba(218,165,32,1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="service-bg-glow absolute bottom-0 right-[-10%] w-[1000px] h-[1000px] rounded-full mix-blend-screen opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Subtle noise grain */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noise\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"4\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noise)\\"/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08] pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" />
              <span 
                className="text-[11px] tracking-[0.2em] uppercase text-white/60 font-medium"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Pôles d'Expertise
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'white',
              }}
            >
              Maîtriser la <em style={{ color: 'var(--jaune-or)', fontStyle: 'italic', paddingRight: '0.2em' }}>complexité</em><br/>
              du capital.
            </h2>
          </div>
          <div className="max-w-xs pb-2">
            <p 
              className="text-white/50 text-[15px] leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Nous déployons une ingénierie financière de pointe pour structurer, protéger et faire croître vos actifs sur les marchés de l'UEMOA.
            </p>
          </div>
        </div>

        {/* Capability Panels */}
        <div ref={containerRef} className="flex flex-col gap-4">
          {capabilities.map((cap) => (
            <a
              key={cap.id}
              href={cap.href}
              className="capability-panel group relative flex flex-col lg:flex-row justify-between lg:items-center gap-8 lg:gap-16 p-8 lg:p-12 rounded-[2rem] overflow-hidden transition-all duration-700 bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08]"
            >
              {/* Hover Light Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(218,165,32,0.06), transparent 40%)'
                }}
              />

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 lg:items-center relative z-10 w-full">
                {/* Number & Title */}
                <div className="flex flex-col gap-6 lg:w-1/3">
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      fontSize: 'clamp(2rem, 3vw, 3rem)',
                      lineHeight: 1,
                      color: 'var(--jaune-or)',
                      opacity: 0.4,
                    }}
                    className="group-hover:opacity-80 transition-opacity duration-500"
                  >
                    {cap.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                      color: 'white',
                    }}
                    className="group-hover:translate-x-2 transition-transform duration-500"
                  >
                    {cap.title}
                  </h3>
                </div>

                {/* Description & Tags */}
                <div className="flex flex-col gap-8 lg:w-1/2">
                  <p
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 300,
                      fontSize: 'clamp(1rem, 1.1vw, 1.125rem)',
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.5)',
                    }}
                    className="group-hover:text-white/80 transition-colors duration-500"
                  >
                    {cap.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cap.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-4 py-1.5 rounded-full border border-white/10 text-white/40 text-[12px] uppercase tracking-wider group-hover:border-white/20 group-hover:text-white/70 transition-colors duration-500"
                        style={{ fontFamily: 'var(--font-primary)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Icon */}
                <div className="lg:w-1/6 flex lg:justify-end mt-4 lg:mt-0">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[var(--jaune-or)] group-hover:border-[var(--jaune-or)] group-hover:text-[#0a0a0c] transition-all duration-500 group-hover:scale-110">
                    <FiArrowRight className="text-xl group-hover:-rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};



