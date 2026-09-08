import type { LeadSubmitPayload } from '@/components/InvestorProfile/types'

const PROFILE_TYPES = new Set([
  'conservative',
  'moderate',
  'balanced',
  'growth',
  'aggressive',
])

export function payloadUrl(): string {
  return import.meta.env.PUBLIC_PAYLOAD_URL || 'http://localhost:3001'
}

/** Trust boundary: drop incomplete quiz payloads before they hit Payload. */
export function toInvestorLeadBody(payload: LeadSubmitPayload) {
  const firstName = payload.firstName.trim()
  const lastName = payload.lastName.trim()
  const email = payload.email.trim()
  if (!firstName || !lastName) throw new Error('Nom requis')
  if (!email.includes('@')) throw new Error('Email invalide')
  if (!PROFILE_TYPES.has(payload.profileType)) throw new Error('Profil invalide')
  if (!payload.profileTitle.trim()) throw new Error('Titre de profil requis')
  if (!Array.isArray(payload.answers) || payload.answers.length === 0) {
    throw new Error('Reponses requises')
  }

  return {
    firstName,
    lastName,
    email,
    phone: payload.phone?.trim() || undefined,
    profileType: payload.profileType,
    profileTitle: payload.profileTitle.trim(),
    riskLevel: payload.riskLevel,
    answers: payload.answers.map((answer) => ({
      questionId: String(answer.questionId),
      value: Number(answer.value),
    })),
    investmentAmount: payload.investmentAmount,
    source: payload.source ?? 'outils-investisseur',
    userAgent: payload.userAgent,
  }
}

export async function submitInvestorLead(payload: LeadSubmitPayload): Promise<void> {
  const body = toInvestorLeadBody(payload)
  const response = await fetch(`${payloadUrl()}/api/investor-leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(`Lead submit failed (${response.status})`)
  }
}
