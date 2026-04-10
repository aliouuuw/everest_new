import { useState, useCallback, useEffect, useRef } from 'react'
import { FiArrowRight, FiArrowLeft, FiX, FiCheck, FiShield, FiTrendingUp, FiTarget, FiZap, FiMail, FiUser, FiPhone } from 'react-icons/fi'
import { QUESTIONS, CATEGORY_LABELS } from './questions'
import { calculateProfile } from './scoring'
import type { UserAnswers, ProfileResult, LeadData, Question } from './types'

type ModalStep = 'intro' | 'quiz' | 'lead' | 'result'

const PROFILE_ICONS = {
  conservative: FiShield,
  balanced: FiTarget,
  growth: FiTrendingUp,
  aggressive: FiZap,
}

export const InvestorProfileModal: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ModalStep>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [result, setResult] = useState<ProfileResult | null>(null)
  const [lead, setLead] = useState<LeadData>({ firstName: '', lastName: '', email: '' })
  const [isAnimating, setIsAnimating] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep('intro')
      setCurrentQuestion(0)
      setAnswers({})
      setResult(null)
      setLead({ firstName: '', lastName: '', email: '' })
    }
  }, [isOpen])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setIsAnimating(true)
    setAnswers(prev => ({ ...prev, [questionId]: value }))

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        // All questions answered — calculate and go to lead capture
        const finalAnswers = { ...answers, [questionId]: value }
        const profile = calculateProfile(finalAnswers)
        setResult(profile)
        setStep('lead')
      }
      setIsAnimating(false)
    }, 400)
  }, [currentQuestion, answers])

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    } else {
      setStep('intro')
    }
  }, [currentQuestion])

  const handleLeadSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // In production, send lead + answers to CRM/database here
    console.log('Lead submitted:', lead, 'Answers:', answers, 'Profile:', result?.type)
    setStep('result')
  }, [lead, answers, result])

  const progress = step === 'quiz' ? ((currentQuestion + 1) / QUESTIONS.length) * 100 : 0

  if (!isOpen) return null

  const question = QUESTIONS[currentQuestion]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ animation: 'fadeIn 300ms ease-out' }}
      />

      {/* Modal Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ animation: 'slideUp 400ms var(--ease-out-expo)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
        >
          <FiX size={18} className="text-[var(--night)]" />
        </button>

        {/* Progress bar — quiz step only */}
        {step === 'quiz' && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/5 z-10">
            <div
              className="h-full bg-[var(--mauve)] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Content area — scrollable */}
        <div className="flex-1 overflow-y-auto">
          {step === 'intro' && <IntroStep onStart={() => setStep('quiz')} />}
          {step === 'quiz' && question && (
            <QuizStep
              question={question}
              questionIndex={currentQuestion}
              totalQuestions={QUESTIONS.length}
              selectedValue={answers[question.id]}
              onAnswer={handleAnswer}
              onBack={handleBack}
              isAnimating={isAnimating}
            />
          )}
          {step === 'lead' && result && (
            <LeadStep
              lead={lead}
              setLead={setLead}
              onSubmit={handleLeadSubmit}
              profileTitle={result.title}
            />
          )}
          {step === 'result' && result && (
            <ResultStep result={result} onClose={onClose} />
          )}
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) }
          to { opacity: 1; transform: scale(1) }
        }
      `}</style>
    </div>
  )
}

/* ───────────── Intro Step ───────────── */
const IntroStep: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="px-8 py-12 md:px-12 md:py-16 text-center">
    {/* Decorative icon */}
    <div className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'var(--mauve-10)' }}>
      <FiTarget size={32} className="text-[var(--mauve)]" />
    </div>

    <h2
      className="mb-4"
      style={{
        fontFamily: 'var(--font-primary)',
        fontWeight: 700,
        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
        lineHeight: 1.15,
        color: 'var(--mauve)',
      }}
    >
      D\u00e9couvrez votre profil d\u2019investisseur
    </h2>
    <p
      className="mb-10 max-w-md mx-auto"
      style={{
        fontFamily: 'var(--font-primary)',
        fontWeight: 300,
        fontSize: '1rem',
        lineHeight: 1.7,
        color: 'var(--night-60)',
      }}
    >
      R\u00e9pondez \u00e0 8 questions pour d\u00e9terminer votre tol\u00e9rance au risque et recevoir une recommandation personnalis\u00e9e.
    </p>

    {/* Stats */}
    <div className="flex items-center justify-center gap-8 mb-10">
      {[
        { label: 'Questions', value: '8' },
        { label: 'Dur\u00e9e', value: '2 min' },
        { label: 'R\u00e9sultat', value: 'Imm\u00e9diat' },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-lg font-bold text-[var(--mauve)]" style={{ fontFamily: 'var(--font-primary)' }}>{stat.value}</div>
          <div className="text-[11px] tracking-[0.08em] uppercase text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>{stat.label}</div>
        </div>
      ))}
    </div>

    <button
      onClick={onStart}
      className="group inline-flex items-center justify-center gap-4 pl-8 pr-4 py-4 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] transition-all duration-500"
    >
      <span className="text-[13px] tracking-[0.1em] font-bold text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
        Commencer le test
      </span>
      <span className="bg-white rounded-full p-2 group-hover:translate-x-[2px] transition-transform duration-300">
        <FiArrowRight className="text-[var(--mauve)]" size={16} />
      </span>
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
}> = ({ question, questionIndex, totalQuestions, selectedValue, onAnswer, onBack, isAnimating }) => {
  const categoryLabel = CATEGORY_LABELS[question.category]

  return (
    <div
      className="px-8 py-10 md:px-12 md:py-14"
      style={{
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? 'translateX(20px)' : 'translateX(0)',
        transition: 'opacity 300ms ease, transform 300ms ease',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[var(--night-60)] hover:text-[var(--mauve)] transition-colors"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          <FiArrowLeft size={16} />
          Retour
        </button>
        <span className="text-[11px] tracking-[0.1em] uppercase font-bold text-[var(--mauve)]" style={{ fontFamily: 'var(--font-primary)' }}>
          {questionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Category badge */}
      <span
        className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-5"
        style={{
          fontFamily: 'var(--font-primary)',
          color: 'var(--mauve)',
          background: 'var(--mauve-10)',
        }}
      >
        {categoryLabel}
      </span>

      {/* Question */}
      <h3
        className="mb-3"
        style={{
          fontFamily: 'var(--font-primary)',
          fontWeight: 700,
          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
          lineHeight: 1.3,
          color: 'var(--night)',
        }}
      >
        {question.title}
      </h3>
      {question.subtitle && (
        <p className="mb-8 text-sm text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300 }}>
          {question.subtitle}
        </p>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={`group relative w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[var(--mauve)] bg-[var(--mauve-05)]'
                  : 'border-black/8 hover:border-[var(--mauve)]/30 hover:bg-[var(--mauve-05)]'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isSelected
                    ? 'border-[var(--mauve)] bg-[var(--mauve)]'
                    : 'border-black/20 group-hover:border-[var(--mauve)]/50'
                }`}>
                  {isSelected && <FiCheck size={12} className="text-white" />}
                </div>
                <span
                  className={`text-sm leading-snug transition-colors duration-300 ${
                    isSelected ? 'text-[var(--mauve)] font-semibold' : 'text-[var(--night)] font-normal'
                  }`}
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {option.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ───────────── Lead Capture Step ───────────── */
const LeadStep: React.FC<{
  lead: LeadData
  setLead: React.Dispatch<React.SetStateAction<LeadData>>
  onSubmit: (e: React.FormEvent) => void
  profileTitle: string
}> = ({ lead, setLead, onSubmit, profileTitle }) => (
  <div className="px-8 py-10 md:px-12 md:py-14">
    <div className="text-center mb-10">
      {/* Success check */}
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
        <FiCheck size={28} className="text-green-600" />
      </div>
      <h3
        className="mb-2"
        style={{
          fontFamily: 'var(--font-primary)',
          fontWeight: 700,
          fontSize: '1.5rem',
          color: 'var(--mauve)',
        }}
      >
        Questionnaire termin\u00e9 !
      </h3>
      <p className="text-sm text-[var(--night-60)] max-w-sm mx-auto" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, lineHeight: 1.7 }}>
        Votre profil <strong className="text-[var(--mauve)]">{profileTitle}</strong> est pr\u00eat. Entrez vos coordonn\u00e9es pour recevoir votre rapport personnalis\u00e9.
      </p>
    </div>

    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-20)]" size={16} />
          <input
            type="text"
            required
            placeholder="Pr\u00e9nom"
            value={lead.firstName}
            onChange={(e) => setLead(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full pl-10 pr-4 py-3.5 bg-[var(--summit-ivory)] border border-black/8 rounded-xl text-sm focus:outline-none focus:border-[var(--mauve)] transition-colors"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-20)]" size={16} />
          <input
            type="text"
            required
            placeholder="Nom"
            value={lead.lastName}
            onChange={(e) => setLead(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full pl-10 pr-4 py-3.5 bg-[var(--summit-ivory)] border border-black/8 rounded-xl text-sm focus:outline-none focus:border-[var(--mauve)] transition-colors"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>
      </div>
      <div className="relative">
        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-20)]" size={16} />
        <input
          type="email"
          required
          placeholder="Adresse email"
          value={lead.email}
          onChange={(e) => setLead(prev => ({ ...prev, email: e.target.value }))}
          className="w-full pl-10 pr-4 py-3.5 bg-[var(--summit-ivory)] border border-black/8 rounded-xl text-sm focus:outline-none focus:border-[var(--mauve)] transition-colors"
          style={{ fontFamily: 'var(--font-primary)' }}
        />
      </div>
      <div className="relative">
        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-20)]" size={16} />
        <input
          type="tel"
          placeholder="T\u00e9l\u00e9phone (optionnel)"
          value={lead.phone || ''}
          onChange={(e) => setLead(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full pl-10 pr-4 py-3.5 bg-[var(--summit-ivory)] border border-black/8 rounded-xl text-sm focus:outline-none focus:border-[var(--mauve)] transition-colors"
          style={{ fontFamily: 'var(--font-primary)' }}
        />
      </div>

      <button
        type="submit"
        className="group w-full inline-flex items-center justify-center gap-4 px-6 py-4 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] transition-all duration-500 mt-2"
      >
        <span className="text-[13px] tracking-[0.1em] font-bold text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
          Voir mon profil
        </span>
        <FiArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={16} />
      </button>

      <p className="text-[10px] text-center text-[var(--night-20)] mt-3" style={{ fontFamily: 'var(--font-primary)' }}>
        Vos donn\u00e9es sont prot\u00e9g\u00e9es et ne seront jamais partag\u00e9es.
      </p>
    </form>
  </div>
)

/* ───────────── Result Step ───────────── */
const ResultStep: React.FC<{
  result: ProfileResult
  onClose: () => void
}> = ({ result, onClose }) => {
  const Icon = PROFILE_ICONS[result.type]

  return (
    <div className="px-8 py-10 md:px-12 md:py-14" style={{ animation: 'scaleIn 500ms var(--ease-out-expo)' }}>
      {/* Profile header */}
      <div className="text-center mb-10">
        <div
          className="mx-auto mb-6 w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: result.colorLight }}
        >
          <Icon size={32} style={{ color: result.color }} />
        </div>
        <span
          className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
          style={{ color: result.color, background: result.colorLight, fontFamily: 'var(--font-primary)' }}
        >
          Votre profil
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 4vw, 2rem)',
            lineHeight: 1.15,
            color: result.color,
          }}
        >
          {result.title}
        </h3>
        <p className="text-sm text-[var(--night-60)] mt-1" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300 }}>
          {result.subtitle}
        </p>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed text-[var(--night-60)] mb-8 text-center max-w-lg mx-auto"
        style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, lineHeight: 1.7 }}
      >
        {result.description}
      </p>

      {/* Risk meter */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
            Niveau de risque
          </span>
          <span className="text-[10px] tracking-[0.1em] uppercase font-bold" style={{ color: result.color, fontFamily: 'var(--font-primary)' }}>
            {result.riskLevel} / 4
          </span>
        </div>
        <div className="h-2 bg-black/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(result.riskLevel / 4) * 100}%`, background: result.color }}
          />
        </div>
      </div>

      {/* Allocation chart */}
      <div className="mb-8">
        <h4 className="text-[11px] tracking-[0.1em] uppercase font-bold text-[var(--night)] mb-4" style={{ fontFamily: 'var(--font-primary)' }}>
          Allocation recommand\u00e9e
        </h4>
        {/* Bar chart */}
        <div className="flex h-3 rounded-full overflow-hidden mb-3">
          {result.allocation.map((a) => (
            <div
              key={a.label}
              style={{ width: `${a.percentage}%`, background: a.color }}
              className="transition-all duration-700"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {result.allocation.map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: a.color }} />
              <span className="text-xs text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                {a.label} <strong className="text-[var(--night)]">{a.percentage}%</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Traits */}
      <div className="mb-8">
        <h4 className="text-[11px] tracking-[0.1em] uppercase font-bold text-[var(--night)] mb-3" style={{ fontFamily: 'var(--font-primary)' }}>
          Caract\u00e9ristiques
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {result.traits.map((trait) => (
            <div
              key={trait}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--summit-ivory)]"
            >
              <FiCheck size={14} style={{ color: result.color }} className="shrink-0" />
              <span className="text-xs text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{trait}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div
        className="p-5 rounded-2xl mb-8"
        style={{ background: result.colorLight, borderLeft: `3px solid ${result.color}` }}
      >
        <h4 className="text-[11px] tracking-[0.1em] uppercase font-bold mb-2" style={{ color: result.color, fontFamily: 'var(--font-primary)' }}>
          Notre recommandation
        </h4>
        <p className="text-sm leading-relaxed text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)', fontWeight: 400 }}>
          {result.recommendation}
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="/contact"
          className="group flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] transition-all duration-500"
        >
          <span className="text-[12px] tracking-[0.1em] font-bold text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
            Prendre rendez-vous
          </span>
          <FiArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={14} />
        </a>
        <button
          onClick={onClose}
          className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-full border-2 border-black/10 hover:border-[var(--mauve)]/30 transition-all duration-300"
        >
          <span className="text-[12px] tracking-[0.1em] font-bold text-[var(--night)] uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
            Fermer
          </span>
        </button>
      </div>
    </div>
  )
}
