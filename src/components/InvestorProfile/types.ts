export type InvestorProfileType = 'conservative' | 'balanced' | 'growth' | 'aggressive'

export type QuestionOption = {
  label: string
  value: number
}

export type Question = {
  id: string
  category: 'behavioral' | 'financial' | 'horizon' | 'knowledge'
  title: string
  subtitle?: string
  options: QuestionOption[]
}

export type ProfileResult = {
  type: InvestorProfileType
  title: string
  subtitle: string
  description: string
  color: string
  colorLight: string
  riskLevel: number // 1–4
  allocation: {
    label: string
    percentage: number
    color: string
  }[]
  traits: string[]
  recommendation: string
}

export type UserAnswers = Record<string, number>

export type LeadData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
}
