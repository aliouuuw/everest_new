import { useState, useCallback, useEffect } from 'react'
import { FiArrowRight, FiArrowLeft, FiCheck, FiShield, FiTrendingUp, FiTarget, FiZap, FiAnchor, FiBriefcase, FiPhone, FiZap as FiLightning, FiUser, FiMail } from 'react-icons/fi'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { QUESTIONS } from './questions'
import { calculateProfile } from './scoring'
import { ProfileReport } from './ProfileReport'
import type { UserAnswers, ProfileResult, LeadData, Question } from './types'

type Step = 'intro' | 'personal' | 'quiz' | 'result'

const PROFILE_ICONS = {
  conservative: FiShield,
  moderate: FiAnchor,
  balanced: FiTarget,
  growth: FiTrendingUp,
  aggressive: FiZap,
}

const STEP_ICONS = [
  { icon: '🧠', label: 'Comportement' },
  { icon: '💰', label: 'Finances' },
  { icon: '📅', label: 'Horizon' },
  { icon: '📊', label: 'Expérience' },
]

export const InvestorProfileInline: React.FC = () => {
  const [step, setStep] = useState<Step>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [result, setResult] = useState<ProfileResult | null>(null)
  const [lead, setLead] = useState<LeadData>({ firstName: '', lastName: '', email: '' })
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createLead = useMutation(api.investorProfiles.createLead)

  // Reset when component mounts
  useEffect(() => {
    setStep('intro')
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
    setLead({ firstName: '', lastName: '', email: '' })
  }, [])

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setIsAnimating(true)
    setDirection('forward')
    setAnswers(prev => ({ ...prev, [questionId]: value }))

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        const finalAnswers = { ...answers, [questionId]: value }
        const profile = calculateProfile(finalAnswers)
        setResult(profile)
        // Submit lead automatically since we already collected personal data
        submitLead(profile, finalAnswers)
      }
      setIsAnimating(false)
    }, 350)
  }, [currentQuestion, answers])

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection('back')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1)
        setIsAnimating(false)
      }, 250)
    } else {
      setStep('personal')
    }
  }, [currentQuestion])

  const submitLead = useCallback(async (profile: ProfileResult, finalAnswers: UserAnswers) => {
    setIsSubmitting(true)
    try {
      const answersArray = Object.entries(finalAnswers).map(([questionId, value]) => ({
        questionId,
        value,
      }))
      const investmentAmount = finalAnswers['investment_amount']

      await createLead({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        profileType: profile.type,
        profileTitle: profile.title,
        riskLevel: profile.riskLevel,
        answers: answersArray,
        investmentAmount,
        source: 'outils-investisseur',
        userAgent: navigator.userAgent,
      })
    } catch (error) {
      console.error('Failed to submit lead:', error)
    } finally {
      setIsSubmitting(false)
      setStep('result')
    }
  }, [lead, createLead])

  const handlePersonalSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setStep('quiz')
  }, [])

  const progress = step === 'quiz' ? ((currentQuestion) / QUESTIONS.length) * 100 : step === 'result' ? 100 : 0
  const currentCategoryIdx = step === 'quiz' ? Math.floor(currentQuestion / Math.ceil(QUESTIONS.length / 4)) : step === 'result' ? 4 : -1

  const question = QUESTIONS[currentQuestion]

  return (
    <div className="w-full">
      {/* Progress bar */}
      {step === 'quiz' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[var(--night-60)] uppercase tracking-wider" style={{ fontFamily: 'var(--font-primary)' }}>
              {step === 'quiz' ? `Question ${currentQuestion + 1} sur ${QUESTIONS.length}` : 'Presque terminé'}
            </span>
            <span className="text-xs font-bold text-[var(--mauve)]" style={{ fontFamily: 'var(--font-primary)' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-[var(--mauve-10)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--mauve)] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="min-h-[400px]">
        {step === 'intro' && <IntroStep onStart={() => setStep('personal')} />}
        {step === 'personal' && (
          <PersonalStep
            lead={lead}
            setLead={setLead}
            onSubmit={handlePersonalSubmit}
          />
        )}
        {step === 'quiz' && question && (
          <QuizStep
            question={question}
            questionIndex={currentQuestion}
            totalQuestions={QUESTIONS.length}
            selectedValue={answers[question.id]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            isAnimating={isAnimating}
            direction={direction}
            currentCategoryIdx={currentCategoryIdx}
          />
        )}
        {step === 'result' && result && (
          <ResultStep result={result} lead={lead} isSubmitting={isSubmitting} />
        )}
      </div>
    </div>
  )
}

/* ───────────── Intro Step ───────────── */
const IntroStep: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="text-center py-8">
    <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[var(--mauve-10)] flex items-center justify-center">
      <FiTarget size={32} className="text-[var(--mauve)]" />
    </div>
    <h3 className="font-bold text-xl text-[var(--night)] mb-3" style={{ fontFamily: 'var(--font-primary)' }}>
      Découvrez votre profil d'investisseur
    </h3>
    <p className="text-[var(--night-60)] mb-8 max-w-md mx-auto" style={{ fontFamily: 'var(--font-primary)' }}>
      Un profil d'investisseur adapté est la clé d'une stratégie patrimoniale réussie. Répondez à ces {QUESTIONS.length} questions rapides.
    </p>

    <div className="flex justify-center gap-6 mb-8">
      {[
        { label: `${QUESTIONS.length} Questions`, icon: <FiBriefcase /> },
        { label: '2 Minutes', icon: <FiPhone /> },
        { label: 'Résultat direct', icon: <FiLightning /> },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col items-center">
          <div className="text-[var(--mauve)] mb-1 opacity-70">{stat.icon}</div>
          <span className="text-xs font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{stat.label}</span>
        </div>
      ))}
    </div>

    <button
      onClick={onStart}
      className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] text-white transition-all duration-300 font-semibold text-sm"
      style={{ fontFamily: 'var(--font-primary)' }}
    >
      Démarrer le test <FiArrowRight size={16} />
    </button>
  </div>
)

/* ───────────── Quiz Step ───────────── */
const QuizStep: React.FC<{
  question: Question
  questionIndex: number
  totalQuestions: number
  selectedValue?: number
  onAnswer: (id: string, value: number) => void
  onBack: () => void
  isAnimating: boolean
  direction: 'forward' | 'back'
  currentCategoryIdx: number
}> = ({ question, questionIndex, totalQuestions: _totalQuestions, selectedValue, onAnswer, onBack, isAnimating, direction, currentCategoryIdx }) => {
  const translateDir = direction === 'forward' ? 'translateX(40px)' : 'translateX(-40px)'

  return (
    <div
      style={{
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? translateDir : 'translateX(0)',
        transition: 'opacity 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Category indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-semibold text-[var(--mauve)] bg-[var(--mauve-10)] px-3 py-1 rounded-full" style={{ fontFamily: 'var(--font-primary)' }}>
          {STEP_ICONS[currentCategoryIdx]?.label || 'Profil'}
        </span>
      </div>

      <h3 className="font-bold text-lg text-[var(--night)] mb-2" style={{ fontFamily: 'var(--font-primary)' }}>
        {question.title}
      </h3>
      {question.subtitle && (
        <p className="text-sm text-[var(--night-60)] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
          {question.subtitle}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={`group relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[var(--mauve)] bg-[var(--mauve-05)]'
                  : 'border-[var(--mauve-10)] bg-white hover:border-[var(--mauve-30)] hover:bg-[var(--summit-ivory)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? 'border-[var(--mauve)] bg-[var(--mauve)]' : 'border-[var(--night-20)]'
                }`}>
                  {isSelected && <FiCheck size={12} className="text-white" />}
                </div>
                <span className={`text-sm leading-snug ${
                  isSelected ? 'text-[var(--mauve)] font-semibold' : 'text-[var(--night-80)]'
                }`} style={{ fontFamily: 'var(--font-primary)' }}>
                  {option.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {questionIndex > 0 && (
        <button
          onClick={onBack}
          className="mt-6 flex items-center gap-2 text-sm text-[var(--night-60)] hover:text-[var(--mauve)] transition-colors"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          <FiArrowLeft size={16} /> Retour
        </button>
      )}
    </div>
  )
}

/* ───────────── Personal Data Step (before quiz) ───────────── */
const PersonalStep: React.FC<{
  lead: LeadData
  setLead: React.Dispatch<React.SetStateAction<LeadData>>
  onSubmit: (e: React.FormEvent) => void
}> = ({ lead, setLead, onSubmit }) => (
  <div className="py-4">
    <div className="text-center mb-8">
      <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-[var(--mauve-10)] flex items-center justify-center">
        <FiUser size={28} className="text-[var(--mauve)]" />
      </div>
      <h3 className="font-bold text-xl text-[var(--night)] mb-2" style={{ fontFamily: 'var(--font-primary)' }}>
        Vos informations personnelles
      </h3>
      <p className="text-sm text-[var(--night-60)] max-w-md mx-auto" style={{ fontFamily: 'var(--font-primary)' }}>
        Entrez vos données personnelles avant de continuer le formulaire profil d'investisseur.
      </p>
    </div>

    <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--night-60)] mb-1.5" style={{ fontFamily: 'var(--font-primary)' }}>Prénom *</label>
          <input
            type="text"
            required
            placeholder="Jean"
            value={lead.firstName}
            onChange={(e) => setLead(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full px-4 py-3 bg-[var(--summit-ivory)] border border-[var(--mauve-10)] rounded-xl text-sm focus:outline-none focus:border-[var(--mauve)] transition-all"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--night-60)] mb-1.5" style={{ fontFamily: 'var(--font-primary)' }}>Nom *</label>
          <input
            type="text"
            required
            placeholder="Dupont"
            value={lead.lastName}
            onChange={(e) => setLead(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full px-4 py-3 bg-[var(--summit-ivory)] border border-[var(--mauve-10)] rounded-xl text-sm focus:outline-none focus:border-[var(--mauve)] transition-all"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--night-60)] mb-1.5" style={{ fontFamily: 'var(--font-primary)' }}>
          <FiMail size={12} className="inline mr-1" />Email *
        </label>
        <input
          type="email"
          required
          placeholder="jean.dupont@email.com"
          value={lead.email}
          onChange={(e) => setLead(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 bg-[var(--summit-ivory)] border border-[var(--mauve-10)] rounded-xl text-sm focus:outline-none focus:border-[var(--mauve)] transition-all"
          style={{ fontFamily: 'var(--font-primary)' }}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--night-60)] mb-1.5" style={{ fontFamily: 'var(--font-primary)' }}>
          <FiPhone size={12} className="inline mr-1" />Téléphone
        </label>
        <input
          type="tel"
          placeholder="+221 77 000 00 00"
          value={lead.phone || ''}
          onChange={(e) => setLead(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-3 bg-[var(--summit-ivory)] border border-[var(--mauve-10)] rounded-xl text-sm focus:outline-none focus:border-[var(--mauve)] transition-all"
          style={{ fontFamily: 'var(--font-primary)' }}
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--mauve)] hover:bg-[var(--night)] text-white transition-all font-semibold text-sm"
        style={{ fontFamily: 'var(--font-primary)' }}
      >
        Continuer le questionnaire <FiArrowRight size={16} />
      </button>

      <p className="text-[10px] text-[var(--night-40)] text-center leading-relaxed" style={{ fontFamily: 'var(--font-primary)' }}>
        Vos données sont traitées de manière confidentielle et ne seront jamais partagées avec des tiers.
      </p>
    </form>
  </div>
)

/* ───────────── Result Step ───────────── */
const ResultStep: React.FC<{
  result: ProfileResult
  lead: LeadData
  isSubmitting?: boolean
}> = ({ result, lead, isSubmitting = false }) => {
  const Icon = PROFILE_ICONS[result.type]
  const generatedAt = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="py-4">
      {isSubmitting && (
        <div className="flex items-center justify-center gap-2 mb-4 py-2 px-4 rounded-lg bg-[var(--mauve-05)] border border-[var(--mauve-10)]">
          <span className="w-4 h-4 border-2 border-[var(--mauve-30)] border-t-[var(--mauve)] rounded-full animate-spin" />
          <span className="text-xs text-[var(--mauve)] font-medium" style={{ fontFamily: 'var(--font-primary)' }}>Enregistrement en cours...</span>
        </div>
      )}
      <div className="mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${result.color}20, ${result.color}08)`, border: `1px solid ${result.color}30` }}>
          <Icon size={28} style={{ color: result.color }} />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ color: result.color, background: result.colorLight, fontFamily: 'var(--font-primary)' }}>
            Votre Profil
          </span>
          <h3 className="font-bold text-2xl mt-1" style={{ fontFamily: 'var(--font-primary)', color: result.color }}>
            {result.title}
          </h3>
        </div>
      </div>

      <p className="text-sm text-[var(--night-60)] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
        {result.subtitle}
      </p>

      {/* Risk level */}
      <div className="mb-6 p-4 rounded-xl bg-[var(--summit-ivory)] border border-[var(--mauve-10)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>Niveau de risque</span>
          <span className="text-sm font-bold" style={{ color: result.color, fontFamily: 'var(--font-primary)' }}>{result.riskLevel} / 5</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="h-2 flex-1 rounded-full" style={{ background: level <= result.riskLevel ? result.color : 'var(--mauve-10)' }} />
          ))}
        </div>
        <p className="text-xs text-[var(--night-80)] mt-3" style={{ fontFamily: 'var(--font-primary)' }}>{result.description}</p>
      </div>

      {/* Allocation */}
      <div className="mb-6 p-4 rounded-xl bg-[var(--summit-ivory)] border border-[var(--mauve-10)]">
        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--night-60)] block mb-3" style={{ fontFamily: 'var(--font-primary)' }}>Allocation recommandée</span>
        <div className="flex h-3 rounded-full overflow-hidden mb-4 bg-[var(--mauve-10)]">
          {result.allocation.map((a) => (
            <div key={a.label} style={{ width: `${a.percentage}%`, background: a.color }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {result.allocation.map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: a.color }} />
              <span className="text-xs text-[var(--night-80)]" style={{ fontFamily: 'var(--font-primary)' }}>{a.label} <strong>{a.percentage}%</strong></span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-4 rounded-xl mb-6" style={{ background: result.colorLight, border: `1px solid ${result.color}20`, borderLeftWidth: '3px', borderLeftColor: result.color }}>
        <span className="text-xs uppercase tracking-wider font-bold block mb-1" style={{ color: result.color, fontFamily: 'var(--font-primary)' }}>Notre recommandation</span>
        <p className="text-sm text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{result.recommendation}</p>
      </div>

      {/* PDF Report */}
      <ProfileReport result={result} firstName={lead.firstName} lastName={lead.lastName} email={lead.email} generatedAt={generatedAt} />

      <a href="/contact" className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--mauve)] hover:bg-[var(--night)] text-white transition-all font-semibold text-sm w-full" style={{ fontFamily: 'var(--font-primary)' }}>
        Prendre rendez-vous <FiArrowRight size={16} />
      </a>
    </div>
  )
}
