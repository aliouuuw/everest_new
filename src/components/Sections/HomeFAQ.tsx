import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

type QA = { q: string; a: string };

// Curated selection from FAQPage — most relevant for a landing page visitor
const QAS: QA[] = [
  {
    q: 'Comment ouvrir un compte ?',
    a: 'Remplissez le formulaire en ligne, notre équipe vous accompagne pour la suite.',
  },
  {
    q: 'Offrez-vous la gestion sous mandat ?',
    a: 'Oui, plusieurs profils sont disponibles selon vos objectifs et contraintes de risque.',
  },
  {
    q: 'Puis-je recevoir des recommandations ?',
    a: 'Oui, via la gestion assistée et nos publications de recherche hebdomadaires et mensuelles.',
  },
  {
    q: 'Comment contacter un conseiller ?',
    a: 'Par le formulaire de contact ou WhatsApp — réponse sous 24h ouvrées.',
  },
];

const FAQItem: React.FC<{ item: QA; index: number; isOpen: boolean; onToggle: () => void }> = ({
  item, index, isOpen, onToggle,
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div
      className="faq-item border-b"
      style={{ borderColor: 'var(--command-border)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span style={{
            fontFamily: 'var(--font-primary)', fontWeight: 700,
            fontSize: '0.65rem', letterSpacing: '0.12em',
            color: isOpen ? 'var(--jaune-or)' : 'var(--night-40)',
            transition: 'color 0.2s ease',
            minWidth: '1.5rem',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily: 'var(--font-primary)', fontWeight: 600,
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', lineHeight: 1.3,
            color: isOpen ? 'var(--mauve)' : 'var(--night)',
            transition: 'color 0.2s ease',
          }}>
            {item.q}
          </span>
        </div>
        <div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? 'var(--mauve)' : 'transparent',
            border: `1px solid ${isOpen ? 'var(--mauve)' : 'var(--command-border)'}`,
            color: isOpen ? 'white' : 'var(--night-40)',
          }}
        >
          {isOpen
            ? <FiMinus className="w-3 h-3" />
            : <FiPlus className="w-3 h-3" />
          }
        </div>
      </button>

      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p style={{
          fontFamily: 'var(--font-primary)', fontWeight: 400,
          fontSize: '0.95rem', lineHeight: 1.7,
          color: 'var(--night-60)',
          paddingBottom: '1.25rem',
          paddingLeft: 'calc(1.5rem + 1rem)', // align with question text
        }}>
          {item.a}
        </p>
      </div>
    </div>
  );
};

export const HomeFAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo('.faq-header',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out',
        scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'play none none reverse' } }
    );
    gsap.utils.toArray<HTMLElement>('.faq-item').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: i * 0.06, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--summit-ivory)',
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">

          {/* Left — label + heading + link */}
          <div className="faq-header md:pt-2">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--pure-white)', background: 'var(--mauve)' }}
            >
              Questions fréquentes
            </span>
            <h2 style={{
              fontFamily: 'var(--font-primary)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.1,
              letterSpacing: '-0.03em', color: 'var(--night)',
              marginBottom: '1rem',
            }}>
              Vous avez des{' '}
              <span style={{ color: 'var(--mauve)' }}>questions ?</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-primary)', fontWeight: 400,
              fontSize: '0.95rem', lineHeight: 1.7,
              color: 'var(--night-60)', maxWidth: '22rem',
              marginBottom: '2rem',
            }}>
              Retrouvez les réponses aux questions les plus fréquentes, ou consultez notre FAQ complète.
            </p>
            <a
              href="/faq"
              className="group inline-flex items-center gap-2 transition-all duration-200"
              style={{
                fontFamily: 'var(--font-primary)', fontWeight: 500,
                fontSize: '0.875rem', color: 'var(--mauve)',
              }}
              onMouseEnter={e => { e.currentTarget.style.gap = '0.625rem'; }}
              onMouseLeave={e => { e.currentTarget.style.gap = '0.5rem'; }}
            >
              Voir toutes les questions
              <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right — accordion */}
          <div className="border-t" style={{ borderColor: 'var(--command-border)' }}>
            {QAS.map((item, i) => (
              <FAQItem
                key={item.q}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
