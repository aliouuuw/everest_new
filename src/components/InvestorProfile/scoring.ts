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
    subtitle: 'Stabilit\u00e9 et pr\u00e9servation du capital',
    description: "Vous privil\u00e9giez la s\u00e9curit\u00e9 de votre capital avant tout. Vous pr\u00e9f\u00e9rez des rendements mod\u00e9r\u00e9s mais r\u00e9guliers, avec un risque minimal. Les obligations d\u2019\u00c9tat et les comptes d\u2019\u00e9pargne sont au c\u0153ur de votre strat\u00e9gie.",
    color: '#2563eb',
    colorLight: 'rgba(37, 99, 235, 0.1)',
    riskLevel: 1,
    allocation: [
      { label: 'Obligations', percentage: 60, color: '#2563eb' },
      { label: 'Mon\u00e9taire', percentage: 25, color: '#60a5fa' },
      { label: 'Actions', percentage: 10, color: '#93c5fd' },
      { label: 'Alternatif', percentage: 5, color: '#bfdbfe' },
    ],
    traits: [
      'Aversion au risque \u00e9lev\u00e9e',
      'Horizon court \u00e0 moyen terme',
      'Priorit\u00e9 : pr\u00e9servation du capital',
      'Revenu r\u00e9gulier recherch\u00e9',
    ],
    recommendation: "Nous recommandons une gestion sous mandat \u00ab Prudent \u00bb, orient\u00e9e vers les obligations souveraines UEMOA et les instruments mon\u00e9taires de qualit\u00e9.",
  },
  balanced: {
    type: 'balanced',
    title: '\u00c9quilibr\u00e9',
    subtitle: 'Croissance mod\u00e9r\u00e9e avec protection',
    description: "Vous cherchez un \u00e9quilibre entre croissance et s\u00e9curit\u00e9. Vous acceptez une volatilit\u00e9 mod\u00e9r\u00e9e en \u00e9change d\u2019un meilleur rendement \u00e0 moyen terme. La diversification est votre meilleur alli\u00e9.",
    color: '#7c3aed',
    colorLight: 'rgba(124, 58, 237, 0.1)',
    riskLevel: 2,
    allocation: [
      { label: 'Obligations', percentage: 40, color: '#7c3aed' },
      { label: 'Actions', percentage: 35, color: '#a78bfa' },
      { label: 'Mon\u00e9taire', percentage: 15, color: '#c4b5fd' },
      { label: 'Alternatif', percentage: 10, color: '#ddd6fe' },
    ],
    traits: [
      'Tol\u00e9rance au risque mod\u00e9r\u00e9e',
      'Horizon moyen terme (3\u20135 ans)',
      'Objectif : croissance r\u00e9guli\u00e8re',
      'Diversification privil\u00e9gi\u00e9e',
    ],
    recommendation: "Nous recommandons une gestion sous mandat \u00ab \u00c9quilibr\u00e9 \u00bb, combinant obligations d\u2019entreprise et actions BRVM s\u00e9lectionn\u00e9es pour optimiser le couple rendement/risque.",
  },
  growth: {
    type: 'growth',
    title: 'Croissance',
    subtitle: 'Performance \u00e0 long terme',
    description: "Vous visez une croissance significative de votre patrimoine et acceptez une volatilit\u00e9 importante. Vous avez un horizon long et une bonne connaissance des march\u00e9s financiers.",
    color: '#ca942f',
    colorLight: 'rgba(202, 148, 47, 0.1)',
    riskLevel: 3,
    allocation: [
      { label: 'Actions', percentage: 55, color: '#ca942f' },
      { label: 'Obligations', percentage: 25, color: '#d4a94a' },
      { label: 'Alternatif', percentage: 15, color: '#e0c06b' },
      { label: 'Mon\u00e9taire', percentage: 5, color: '#ebd58c' },
    ],
    traits: [
      'Tol\u00e9rance au risque \u00e9lev\u00e9e',
      'Horizon long terme (5\u201310 ans)',
      'Objectif : appr\u00e9ciation du capital',
      'Exp\u00e9rience des march\u00e9s',
    ],
    recommendation: "Nous recommandons une gestion sous mandat \u00ab Dynamique \u00bb, avec une allocation forte en actions BRVM et une exposition aux march\u00e9s de croissance r\u00e9gionaux.",
  },
  aggressive: {
    type: 'aggressive',
    title: 'Dynamique',
    subtitle: 'Rendement maximal',
    description: "Vous recherchez la performance maximale et \u00eates pr\u00eat \u00e0 supporter des fluctuations importantes. Vous avez une solide exp\u00e9rience des march\u00e9s et un horizon tr\u00e8s long.",
    color: '#dc2626',
    colorLight: 'rgba(220, 38, 38, 0.1)',
    riskLevel: 4,
    allocation: [
      { label: 'Actions', percentage: 70, color: '#dc2626' },
      { label: 'Alternatif', percentage: 15, color: '#ef4444' },
      { label: 'Obligations', percentage: 10, color: '#f87171' },
      { label: 'Mon\u00e9taire', percentage: 5, color: '#fca5a5' },
    ],
    traits: [
      'Forte app\u00e9tence au risque',
      'Horizon tr\u00e8s long terme (10+ ans)',
      'Objectif : rendement maximal',
      'Expertise financi\u00e8re avanc\u00e9e',
    ],
    recommendation: "Nous recommandons une gestion sous mandat \u00ab Offensif \u00bb avec concentration en actions de croissance, produits structur\u00e9s et exposition aux march\u00e9s frontaliers de l\u2019UEMOA.",
  },
}
