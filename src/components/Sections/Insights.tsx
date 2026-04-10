import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { PillBadge } from '../ui';

/* ─── Types ─── */
type Frequency = 'hebdomadaire' | 'mensuelle' | 'semestrielle';

type Publication = {
  id: string;
  title: string;
  desc: string;
  frequency: Frequency;
  date: string;
  fileUrl: string;
  fileSize: string;
  pages?: number;
};

const FREQUENCY_LABELS: Record<Frequency, string> = {
  hebdomadaire: 'Hebdomadaire',
  mensuelle: 'Mensuelle',
  semestrielle: 'Semestrielle',
};

const FREQUENCY_COLORS: Record<Frequency, string> = {
  hebdomadaire: 'var(--jaune-or)',
  mensuelle: 'var(--jaune-or)',
  semestrielle: '#5ce0a0',
};

/* ─── Static data (mirrors PublicationsPage catalogue) ─── */
const PUBLICATIONS: Publication[] = [
  {
    id: 'revue-hebdo-example',
    title: 'Revue Hebdomadaire — Marchés BRVM',
    desc: "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire',
    date: '2025-04-04',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '13.2 MB',
    pages: 12,
  },
  {
    id: 'revue-semestrielle-sep-26',
    title: 'Revue Semestrielle — S1 2024',
    desc: "Bilan semestriel complet : analyse macro-économique UEMOA, performances des indices, faits marquants et perspectives.",
    frequency: 'semestrielle',
    date: '2024-09-26',
    fileUrl: '/publications/Revue-semestrielle-20.09.26-1.pdf',
    fileSize: '10.5 MB',
    pages: 28,
  },
];

export const Insights: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  const featured = PUBLICATIONS[0];
  const secondary = PUBLICATIONS.slice(1, 3);

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden section-bg-light"
    >

      {/* Section header strip */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between px-8 md:px-16 lg:px-24 pt-20 md:pt-28 pb-12 md:pb-16 border-b border-black/10 gap-6">
        <div className="flex flex-col gap-6">
          <div>
            <PillBadge variant="gold">Publications</PillBadge>
          </div>
          
          <h2 className="luxury-heading-dark">
            Nos revues{' '}
            <span style={{ color: 'var(--jaune-or)' }}>&amp; analyses.</span>
          </h2>
        </div>

        <a
          href="/publications"
          className="hidden md:inline-flex items-center gap-3 group"
        >
          <span className="kicker text-[var(--night-60)] group-hover:text-[var(--mauve)] transition-colors relative overflow-hidden pb-1">
            Toutes les publications
            <span className="absolute bottom-0 left-0 w-full h-px bg-[var(--jaune-or)] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
          </span>
          <FiArrowRight className="text-lg text-[var(--night-60)] group-hover:text-[var(--jaune-or)] transition-colors duration-500" />
        </a>
      </div>

      {/* Editorial split — featured left, secondary right */}
      <div className="relative z-10 flex flex-col lg:flex-row" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>

        {/* FEATURED — left, large */}
        <div
          className="group lg:w-[58%] flex flex-col justify-between px-8 md:px-16 lg:px-24 py-16 md:py-20"
          style={{ borderRight: '1px solid rgba(0,0,0,0.08)' }}
        >
          <div>
            {/* Frequency badge */}
            <span
              className="inline-block mb-10 px-4 py-1.5 kicker border rounded-full"
              style={{
                color: FREQUENCY_COLORS[featured.frequency],
                borderColor: `color-mix(in srgb, ${FREQUENCY_COLORS[featured.frequency]} 30%, transparent)`,
                background: `color-mix(in srgb, ${FREQUENCY_COLORS[featured.frequency]} 5%, transparent)`,
              }}
            >
              {FREQUENCY_LABELS[featured.frequency]}
            </span>

            {/* Large display title */}
            <h3 className="font-primary font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight text-[var(--mauve)] mb-6">
              {featured.title}
            </h3>

            <p className="text-secondary-dark text-base md:text-lg mb-8 max-w-2xl">
              {featured.desc}
            </p>
          </div>

          {/* Bottom row — meta + actions */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-[var(--night-40)] font-primary font-light tracking-wider">
              <span>{new Date(featured.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {featured.pages && <span>· {featured.pages} pages</span>}
              <span>· {featured.fileSize}</span>
            </div>
            <a
              href={featured.fileUrl}
              download
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:opacity-90"
              style={{ background: 'var(--jaune-or)', color: 'var(--pure-white)' }}
            >
              <FiDownload size={14} />
              Télécharger le PDF
            </a>
          </div>
        </div>

        {/* SECONDARY — right, stacked */}
        <div className="lg:w-[42%] flex flex-col">
          {secondary.map((it, i) => (
            <div
              key={it.id}
              className="group flex flex-col justify-between px-8 md:px-12 lg:px-16 py-12 flex-1"
              style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)' }}
            >
              <div>
                <span
                  className="block mb-5 kicker"
                  style={{ color: `color-mix(in srgb, ${FREQUENCY_COLORS[it.frequency]} 80%, transparent)` }}
                >
                  {FREQUENCY_LABELS[it.frequency]}
                </span>
                <h3 className="font-primary font-bold text-xl md:text-2xl text-[var(--mauve)] mb-4 leading-snug">
                  {it.title}
                </h3>
                <p className="text-secondary-dark text-sm md:text-base line-clamp-3">
                  {it.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[var(--night-40)] font-primary font-light tracking-wider">
                  <span>{new Date(it.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>· {it.fileSize}</span>
                </div>
                <a
                  href={it.fileUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[var(--mauve-08)]"
                  style={{ color: 'var(--jaune-or)', borderColor: 'var(--jaune-or-30)' }}
                >
                  <FiDownload size={13} />
                  PDF
                </a>
              </div>
            </div>
          ))}

          {/* View all — bottom of right column */}
          <a
            href="/publications"
            className="md:hidden flex items-center justify-between px-8 py-8 group hover:bg-[var(--mauve-08)] transition-colors"
            style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
          >
            <span className="kicker text-[var(--night-60)] group-hover:text-[var(--jaune-or)] transition-colors">
              Toutes les publications
            </span>
            <FiArrowRight className="text-lg text-[var(--night-60)] group-hover:text-[var(--jaune-or)] transition-colors duration-500 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
