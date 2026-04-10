import type { InvestorProfileType, ProfileResult, UserAnswers } from './types'

export function calculateProfile(answers: UserAnswers): ProfileResult {
  const values = Object.values(answers)
  const total = values.reduce((sum, v) => sum + v, 0)
  const maxScore = values.length * 4
  const ratio = total / maxScore

  let type: InvestorProfileType
  if (ratio <= 0.35) type = 'conservative'
  else if (ratio <= 0.55) type = 'balanced'
  else if (ratio <= 0.75) type = 'growth'
  else type = 'aggressive'

  return PROFILES[type]
}

export const PROFILES: Record<InvestorProfileType, ProfileResult> = {
  conservative: {
    type: 'conservative',
    title: 'Conservateur',
    subtitle: "Stabilité et préservation du capital",
    description: "Vous privilégiez la sécurité de votre capital avant tout. Vous préférez des rendements modérés mais réguliers, avec un risque minimal. Les obligations d\u2019État et les comptes d\u2019épargne sont au c\u0153ur de votre stratégie.",
    color: '#2563eb',
    colorLight: 'rgba(37, 99, 235, 0.1)',
    riskLevel: 1,
    allocation: [
      { label: 'Obligations', percentage: 60, color: '#2563eb' },
      { label: 'Monétaire', percentage: 25, color: '#60a5fa' },
      { label: 'Actions', percentage: 10, color: '#93c5fd' },
      { label: 'Alternatif', percentage: 5, color: '#bfdbfe' },
    ],
    traits: [
      "Aversion au risque élevée",
      "Horizon court à moyen terme",
      "Priorité : préservation du capital",
      "Revenu régulier recherché",
    ],
    recommendation: "Nous recommandons une gestion sous mandat \u00ab Prudent \u00bb, orientée vers les obligations souveraines UEMOA et les instruments monétaires de qualité.",
  },
  balanced: {
    type: 'balanced',
    title: 'Équilibré',
    subtitle: "Croissance modérée avec protection",
    description: "Vous cherchez un équilibre entre croissance et sécurité. Vous acceptez une volatilité modérée en échange d\u2019un meilleur rendement à moyen terme. La diversification est votre meilleur allié.",
    color: '#7c3aed',
    colorLight: 'rgba(124, 58, 237, 0.1)',
    riskLevel: 2,
    allocation: [
      { label: 'Obligations', percentage: 40, color: '#7c3aed' },
      { label: 'Actions', percentage: 35, color: '#a78bfa' },
      { label: 'Monétaire', percentage: 15, color: '#c4b5fd' },
      { label: 'Alternatif', percentage: 10, color: '#ddd6fe' },
    ],
    traits: [
      "Tolérance au risque modérée",
      "Horizon moyen terme (3\u20135 ans)",
      "Objectif : croissance régulière",
      "Diversification privilégiée",
    ],
    recommendation: "Nous recommandons une gestion sous mandat \u00ab Équilibré \u00bb, combinant obligations d\u2019entreprise et actions BRVM sélectionnées pour optimiser le couple rendement/risque.",
  },
  growth: {
    type: 'growth',
    title: 'Croissance',
    subtitle: "Performance à long terme",
    description: "Vous visez une croissance significative de votre patrimoine et acceptez une volatilité importante. Vous avez un horizon long et une bonne connaissance des marchés financiers.",
    color: '#ca942f',
    colorLight: 'rgba(202, 148, 47, 0.1)',
    riskLevel: 3,
    allocation: [
      { label: 'Actions', percentage: 55, color: '#ca942f' },
      { label: 'Obligations', percentage: 25, color: '#d4a94a' },
      { label: 'Alternatif', percentage: 15, color: '#e0c06b' },
      { label: 'Monétaire', percentage: 5, color: '#ebd58c' },
    ],
    traits: [
      "Tolérance au risque élevée",
      "Horizon long terme (5\u201310 ans)",
      "Objectif : appréciation du capital",
      "Expérience des marchés",
    ],
    recommendation: "Nous recommandons une gestion sous mandat \u00ab Dynamique \u00bb, avec une allocation forte en actions BRVM et une exposition aux marchés de croissance régionaux.",
  },
  aggressive: {
    type: 'aggressive',
    title: 'Dynamique',
    subtitle: 'Rendement maximal',
    description: "Vous recherchez la performance maximale et êtes prêt à supporter des fluctuations importantes. Vous avez une solide expérience des marchés et un horizon très long.",
    color: '#dc2626',
    colorLight: 'rgba(220, 38, 38, 0.1)',
    riskLevel: 4,
    allocation: [
      { label: 'Actions', percentage: 70, color: '#dc2626' },
      { label: 'Alternatif', percentage: 15, color: '#ef4444' },
      { label: 'Obligations', percentage: 10, color: '#f87171' },
      { label: 'Monétaire', percentage: 5, color: '#fca5a5' },
    ],
    traits: [
      "Forte appétence au risque",
      "Horizon très long terme (10+ ans)",
      "Objectif : rendement maximal",
      "Expertise financière avancée",
    ],
    recommendation: "Nous recommandons une gestion sous mandat \u00ab Offensif \u00bb avec concentration en actions de croissance, produits structurés et exposition aux marchés frontaliers de l\u2019UEMOA.",
  },
}
