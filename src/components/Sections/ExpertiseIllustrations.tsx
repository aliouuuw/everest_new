/**
 * The four expertises, drawn for the home index and the Expertises hub (one frame, swapped per row).
 * House style: forest field, gold-light line work at 1.5px, square caps, straight segments only
 * (the logo's summit line), white hairlines for secondary structure. No curves, no rising lines,
 * no text. Decorative: the row beside the frame carries the meaning.
 */
import type { ReactNode } from 'react';
import type { ExpertiseKey } from '../../content/expertises';

const INK = '#0E2826';
const GOLD = '#B68A3E';
const GOLD_LIGHT = '#D4B26C';
const HAIR = 'rgba(255,255,255,0.22)';
const FAINT = 'rgba(255,255,255,0.12)';

const Frame = ({ children }: { children: ReactNode }) => (
  <svg
    className="expertise-illustration"
    viewBox="40 50 400 500"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
    fill="none"
    strokeWidth={1.5}
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <rect width="480" height="600" fill={INK} />
    {children}
  </svg>
);

/** Marché des Titres Publics: a bond certificate and its coupon sheet; one coupon is detached, paid. */
const Bond = () => {
  const x = 84, w = 300, cols = 4, cw = w / cols, ch = 56, top = 372;
  return (
    <Frame>
      {/* certificate */}
      <rect x={x} y={104} width={w} height={240} stroke={GOLD_LIGHT} />
      <rect x={x + 12} y={116} width={w - 24} height={216} stroke={HAIR} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={x + 36} y1={170 + i * 22} x2={x + 36 + [196, 150, 176][i]} y2={170 + i * 22} stroke={HAIR} />
      ))}
      <rect x={x + 36} y={262} width={64} height={1} fill={HAIR} />
      <rect x={x + w - 76} y={258} width={40} height={40} stroke={GOLD_LIGHT} />
      <rect x={x + w - 64} y={270} width={16} height={16} fill={GOLD} />
      {/* coupon sheet: two rows, perforated */}
      <rect x={x} y={top} width={w} height={ch * 2} stroke={GOLD_LIGHT} />
      <line x1={x} y1={top + ch} x2={x + w} y2={top + ch} stroke={HAIR} strokeDasharray="3 5" />
      {[1, 2, 3].map((i) => (
        <line key={i} x1={x + i * cw} y1={top} x2={x + i * cw} y2={top + ch * 2} stroke={HAIR} strokeDasharray="3 5" />
      ))}
      {Array.from({ length: cols * 2 - 1 }, (_, i) => (
        <rect key={i} x={x + (i % cols) * cw + cw / 2 - 9} y={top + Math.floor(i / cols) * ch + ch / 2 - 9} width={18} height={18} stroke={FAINT} />
      ))}
      {/* the detached coupon */}
      <rect x={x + 3 * cw} y={top + ch} width={cw} height={ch} fill={INK} stroke={HAIR} strokeDasharray="3 5" />
      <g transform={`translate(${x + w + 12} ${top + ch * 2 + 14}) rotate(-8)`}>
        <rect x={-cw + 6} y={-ch + 6} width={cw - 4} height={ch - 4} fill={GOLD} />
        <rect x={-cw / 2 - 5} y={-ch / 2 - 3} width={18} height={18} stroke={INK} />
      </g>
    </Frame>
  );
};

/** Marché Financier Régional (BRVM): eight markets on one ring, each tied to one exchange. */
const Exchange = () => {
  const cx = 240, cy = 300, r = 168;
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });
  return (
    <Frame>
      <polygon points={nodes.map((n) => n.join(',')).join(' ')} stroke={FAINT} />
      {nodes.map(([nx, ny], i) => (
        <line key={i} x1={nx} y1={ny} x2={cx} y2={cy} stroke={GOLD} />
      ))}
      <rect x={cx - 32} y={cy - 32} width={64} height={64} fill={INK} stroke={GOLD_LIGHT} />
      <rect x={cx - 10} y={cy - 10} width={20} height={20} fill={GOLD_LIGHT} />
      {nodes.map(([nx, ny], i) => (
        <rect key={i} x={nx - 7} y={ny - 7} width={14} height={14} fill={INK} stroke={GOLD_LIGHT} />
      ))}
    </Frame>
  );
};

/** Structuration & Ingénierie Financière: a three-tranche structure, drawn as an engineering plate. */
const Structure = () => {
  const cx = 240, base = 430, h = 70;
  const tiers = [300, 216, 132];
  return (
    <Frame>
      {/* centre axis, dash-dot */}
      <line x1={cx} y1={150} x2={cx} y2={480} stroke={FAINT} strokeDasharray="14 5 2 5" />
      {tiers.map((w, i) => (
        <rect
          key={i}
          x={cx - w / 2}
          y={base - h * (i + 1)}
          width={w}
          height={h}
          stroke={GOLD_LIGHT}
          fill={i === tiers.length - 1 ? GOLD : INK}
        />
      ))}
      {/* vertical dimension, right: one tick per tranche */}
      <line x1={420} y1={base - h * 3} x2={420} y2={base} stroke={HAIR} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={412} y1={base - h * i} x2={428} y2={base - h * i} stroke={HAIR} />
      ))}
      {[0, 1, 2].map((i) => (
        <line key={i} x1={cx + tiers[i] / 2 + 6} y1={base - h * (i + 1)} x2={404} y2={base - h * (i + 1)} stroke={FAINT} />
      ))}
      {/* horizontal dimension under the base, with 45-degree ticks */}
      <line x1={cx - 150} y1={472} x2={cx + 150} y2={472} stroke={HAIR} />
      <line x1={cx - 150} y1={base + 6} x2={cx - 150} y2={480} stroke={HAIR} />
      <line x1={cx + 150} y1={base + 6} x2={cx + 150} y2={480} stroke={HAIR} />
      <line x1={cx - 156} y1={478} x2={cx - 144} y2={466} stroke={GOLD_LIGHT} />
      <line x1={cx + 144} y1={478} x2={cx + 156} y2={466} stroke={GOLD_LIGHT} />
    </Frame>
  );
};

/** Private Office: a patrimony set out as one allocation, held inside the frame of a mandate. */
const Mandate = () => {
  const x = 90, y = 150, s = 300;
  const bracket = (px: number, py: number, dx: number, dy: number) => `M${px + dx * 34} ${py}H${px}V${py + dy * 34}`;
  const o = 22;
  return (
    <Frame>
      {/* the mandate: corner brackets around the whole */}
      <path d={bracket(x - o, y - o, 1, 1)} stroke={GOLD_LIGHT} />
      <path d={bracket(x + s + o, y - o, -1, 1)} stroke={GOLD_LIGHT} />
      <path d={bracket(x - o, y + s + o, 1, -1)} stroke={GOLD_LIGHT} />
      <path d={bracket(x + s + o, y + s + o, -1, -1)} stroke={GOLD_LIGHT} />
      {/* the allocation */}
      <rect x={x} y={y} width={s} height={s} stroke={GOLD_LIGHT} />
      <rect x={x} y={y} width={176} height={176} fill={GOLD} />
      <line x1={x + 176} y1={y} x2={x + 176} y2={y + s} stroke={HAIR} />
      <line x1={x} y1={y + 176} x2={x + 176} y2={y + 176} stroke={HAIR} />
      <line x1={x + 88} y1={y + 176} x2={x + 88} y2={y + s} stroke={HAIR} />
      <line x1={x + 176} y1={y + 120} x2={x + s} y2={y + 120} stroke={HAIR} />
      <line x1={x + 176} y1={y + 214} x2={x + s} y2={y + 214} stroke={HAIR} />
      <line x1={x + 238} y1={y + 120} x2={x + 238} y2={y + 214} stroke={HAIR} />
    </Frame>
  );
};

const DRAWINGS: Record<ExpertiseKey, () => ReactNode> = {
  mtp: Bond,
  brvm: Exchange,
  structuration: Structure,
  privateOffice: Mandate,
};

export const ExpertiseIllustration = ({ expertise }: { expertise: ExpertiseKey }) => <>{DRAWINGS[expertise]()}</>;
