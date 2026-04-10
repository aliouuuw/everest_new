import type { Question } from './types'

export const QUESTIONS: Question[] = [
  // ─── Behavioral ───
  {
    id: 'risk_reaction',
    category: 'behavioral',
    title: "Si votre portefeuille perdait 20% de sa valeur en un mois, que feriez-vous ?",
    subtitle: "Votre réaction face à la volatilité",
    options: [
      { label: "Je vends immédiatement pour limiter les pertes", value: 1 },
      { label: "Je suis inquiet mais j\u2019attends la reprise", value: 2 },
      { label: "Je ne change rien, c\u2019est normal sur les marchés", value: 3 },
      { label: "J\u2019investis davantage pour profiter des prix bas", value: 4 },
    ],
  },
  {
    id: 'volatility_comfort',
    category: 'behavioral',
    title: "Quel niveau de fluctuation annuelle acceptez-vous sur votre capital ?",
    subtitle: "Votre tolérance à la volatilité",
    options: [
      { label: "Aucune fluctuation — je veux préserver mon capital", value: 1 },
      { label: "Jusqu\u2019à -5% — des variations modérées", value: 2 },
      { label: "Jusqu\u2019à -15% — si le potentiel de gain est élevé", value: 3 },
      { label: "Plus de -20% — je vise la performance maximale", value: 4 },
    ],
  },
  // ─── Financial Preferences ───
  {
    id: 'investment_goal',
    category: 'financial',
    title: "Quel est votre objectif principal d\u2019investissement ?",
    subtitle: "Votre priorité financière",
    options: [
      { label: "Protéger mon capital contre l\u2019inflation", value: 1 },
      { label: "Générer un revenu régulier (dividendes, coupons)", value: 2 },
      { label: "Faire croître mon patrimoine progressivement", value: 3 },
      { label: "Maximiser la performance à long terme", value: 4 },
    ],
  },
  {
    id: 'income_stability',
    category: 'financial',
    title: "Comment décririez-vous la stabilité de vos revenus ?",
    subtitle: "Votre situation financière actuelle",
    options: [
      { label: "Revenus irréguliers — je dois être prudent", value: 1 },
      { label: "Revenus stables mais limités", value: 2 },
      { label: "Revenus stables et confortables", value: 3 },
      { label: "Revenus élevés avec une forte capacité d\u2019épargne", value: 4 },
    ],
  },
  // ─── Investment Horizon ───
  {
    id: 'time_horizon',
    category: 'horizon',
    title: "Sur quel horizon comptez-vous investir ?",
    subtitle: "Votre horizon de placement",
    options: [
      { label: "Moins de 2 ans", value: 1 },
      { label: "2 à 5 ans", value: 2 },
      { label: "5 à 10 ans", value: 3 },
      { label: "Plus de 10 ans", value: 4 },
    ],
  },
  {
    id: 'liquidity_need',
    category: 'horizon',
    title: "Aurez-vous besoin d\u2019accéder rapidement à cet argent ?",
    subtitle: "Votre besoin de liquidité",
    options: [
      { label: "Oui, je pourrais en avoir besoin à tout moment", value: 1 },
      { label: "Peut-être dans les 2 prochaines années", value: 2 },
      { label: "Non, pas avant 5 ans minimum", value: 3 },
      { label: "Cet argent est entièrement dédié au long terme", value: 4 },
    ],
  },
  // ─── Knowledge & Experience ───
  {
    id: 'market_experience',
    category: 'knowledge',
    title: "Quelle est votre expérience des marchés financiers ?",
    subtitle: "Votre niveau de connaissance",
    options: [
      { label: "Aucune — je débute complètement", value: 1 },
      { label: "Basique — j\u2019ai déjà un compte d\u2019épargne ou un PEA", value: 2 },
      { label: "Intermédiaire — j\u2019investis depuis quelques années", value: 3 },
      { label: "Avancé — je gère activement mes placements", value: 4 },
    ],
  },
  {
    id: 'product_preference',
    category: 'knowledge',
    title: "Quels types de produits financiers vous intéressent ?",
    subtitle: "Vos préférences de placement",
    options: [
      { label: "Comptes d\u2019épargne et obligations d\u2019État", value: 1 },
      { label: "Obligations d\u2019entreprise et fonds diversifiés", value: 2 },
      { label: "Actions cotées et ETF", value: 3 },
      { label: "Actions, produits structurés et marchés émergents", value: 4 },
    ],
  },
]

export const CATEGORY_LABELS: Record<Question['category'], string> = {
  behavioral: 'Comportement',
  financial: 'Objectifs financiers',
  horizon: 'Horizon de placement',
  knowledge: 'Expérience',
}
