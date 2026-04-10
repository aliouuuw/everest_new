import { useState, useCallback, useEffect, useRef } from 'react'
import { FiArrowRight, FiArrowLeft, FiX, FiCheck, FiShield, FiTrendingUp, FiTarget, FiZap, FiMail, FiUser, FiPhone, FiLock } from 'react-icons/fi'
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

const STEP_ICONS = [
  { icon: '🧠', label: 'Comportement' },
  { icon: '💰', label: 'Finances' },
  { icon: '📅', label: 'Horizon' },
  { icon: '📊', label: 'Expérience' },
]

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
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setStep('intro')
      setCurrentQuestion(0)
      setAnswers({})
      setResult(null)
      setLead({ firstName: '', lastName: '', email: '' })
      setDirection('forward')
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

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
        setStep('lead')
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
      setStep('intro')
    }
  }, [currentQuestion])

  const handleLeadSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    console.log('Lead submitted:', lead, 'Answers:', answers, 'Profile:', result?.type)
    setStep('result')
  }, [lead, answers, result])

  const progress = step === 'quiz' ? ((currentQuestion + 1) / QUESTIONS.length) * 100 : 0
  const currentCategoryIdx = step === 'quiz' ? Math.floor(currentQuestion / 2) : -1

  if (!isOpen) return null

  const question = QUESTIONS[currentQuestion]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--night)]/70 backdrop-blur-md ip-fade-in" />

      {/* Modal Panel */}
      <div className="relative w-full max-w-[580px] max-h-[92vh] bg-white rounded-[28px] shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col ip-slide-up">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-[var(--mauve)]/10 hover:text-[var(--mauve)] transition-all duration-200"
          aria-label="Fermer"
        >
          <FiX size={16} />
        </button>

        {/* Progress bar — quiz step */}
        {step === 'quiz' && (
          <div className="relative">
            {/* Track */}
            <div className="h-1 bg-[var(--summit-ivory)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--mauve)] to-[var(--jaune-or)] transition-all duration-600 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Step indicators */}
            <div className="flex items-center justify-between px-8 py-3 bg-[var(--summit-ivory)]/50">
              {STEP_ICONS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-1.5 transition-all duration-300 ${
                    i === currentCategoryIdx
                      ? 'opacity-100 scale-105'
                      : i < currentCategoryIdx
                        ? 'opacity-60'
                        : 'opacity-30'
                  }`}
                >
                  <span className="text-sm">{s.icon}</span>
                  <span
                    className={`text-[9px] tracking-[0.08em] uppercase font-bold hidden sm:inline ${
                      i === currentCategoryIdx ? 'text-[var(--mauve)]' : 'text-[var(--night)]'
                    }`}
                    style={{ fontFamily: 'var(--font-primary)' }}
                  >
                    {s.label}
                  </span>
                  {i < currentCategoryIdx && (
                    <FiCheck size={10} className="text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content area — scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
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
              direction={direction}
            />
          )}
          {step === 'lead' && result && (
            <LeadStep
              lead={lead}
              setLead={setLead}
              onSubmit={handleLeadSubmit}
              profileTitle={result.title}
              profileColor={result.color}
            />
          )}
          {step === 'result' && result && (
            <ResultStep result={result} onClose={onClose} />
          )}
        </div>
      </div>

      <style>{`
        .ip-fade-in { animation: ipFadeIn 250ms ease-out both }
        .ip-slide-up { animation: ipSlideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) both }
        .ip-scale-in { animation: ipScaleIn 500ms cubic-bezier(0.16, 1, 0.3, 1) both }
        .ip-check-draw { animation: ipCheckDraw 600ms cubic-bezier(0.16, 1, 0.3, 1) both }

        @keyframes ipFadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes ipSlideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.96) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes ipScaleIn {
          from { opacity: 0; transform: scale(0.92) }
          to { opacity: 1; transform: scale(1) }
        }
        @keyframes ipCheckDraw {
          0% { stroke-dashoffset: 24 }
          100% { stroke-dashoffset: 0 }
        }
        @keyframes ipPulse {
          0%, 100% { transform: scale(1) }
          50% { transform: scale(1.05) }
        }
        @keyframes ipBarGrow {
          from { width: 0% }
        }
      `}</style>
    </div>
  )
}

/* ───────────── Intro Step ───────────── */
const IntroStep: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="px-8 py-12 md:px-10 md:py-14 text-center">
    {/* Animated icon */}
    <div
      className="mx-auto mb-7 w-[72px] h-[72px] rounded-2xl flex items-center justify-center relative"
      style={{ background: 'linear-gradient(135deg, var(--mauve-10), var(--jaune-or-10))' }}
    >
      <FiTarget size={30} className="text-[var(--mauve)]" />
      <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--mauve-10), var(--jaune-or-10))', animation: 'ipPulse 3s ease-in-out infinite' }} />
      <FiTarget size={30} className="text-[var(--mauve)] relative z-10" />
    </div>

    <h2
      className="mb-3"
      style={{
        fontFamily: 'var(--font-primary)',
        fontWeight: 700,
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        lineHeight: 1.15,
        color: 'var(--mauve)',
      }}
    >
      {"Découvrez votre profil d'investisseur"}
    </h2>
    <p
      className="mb-8 max-w-sm mx-auto"
      style={{
        fontFamily: 'var(--font-primary)',
        fontWeight: 300,
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--night-60)',
      }}
    >
      {"Répondez à 8 questions pour déterminer votre tolérance au risque et recevoir une recommandation personnalisée."}
    </p>

    {/* Stats row */}
    <div className="flex items-center justify-center gap-3 mb-9">
      {[
        { label: 'Questions', value: '8', icon: '📝' },
        { label: 'Durée', value: '2 min', icon: '⏱️' },
        { label: 'Résultat', value: 'Immédiat', icon: '⚡' },
      ].map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[var(--summit-ivory)] border border-black/5"
        >
          <span className="text-base">{stat.icon}</span>
          <div className="text-left">
            <div className="text-[13px] font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{stat.value}</div>
            <div className="text-[9px] tracking-[0.06em] uppercase text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={onStart}
      className="group inline-flex items-center justify-center gap-4 pl-7 pr-3 py-3.5 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] transition-all duration-500 hover:shadow-[0_8px_24px_rgba(70,29,76,0.3)] active:scale-[0.98]"
    >
      <span className="text-[12px] tracking-[0.12em] font-bold text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
        Commencer le test
      </span>
      <span className="bg-white rounded-full p-2 group-hover:translate-x-[3px] transition-transform duration-300">
        <FiArrowRight className="text-[var(--mauve)]" size={15} />
      </span>
    </button>

    <p className="mt-6 text-[10px] text-[var(--night-20)] flex items-center justify-center gap-1.5" style={{ fontFamily: 'var(--font-primary)' }}>
      <FiLock size={10} /> Vos données restent confidentielles
    </p>
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
}> = ({ question, questionIndex, totalQuestions, selectedValue, onAnswer, onBack, isAnimating, direction }) => {
  const categoryLabel = CATEGORY_LABELS[question.category]
  const translateDir = direction === 'forward' ? 'translateX(30px)' : 'translateX(-30px)'

  return (
    <div
      className="px-8 py-8 md:px-10 md:py-10"
      style={{
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? translateDir : 'translateX(0)',
        transition: 'opacity 250ms ease, transform 250ms ease',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] text-[var(--night-60)] hover:text-[var(--mauve)] transition-colors active:scale-95"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          <FiArrowLeft size={15} />
          Retour
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[11px] tracking-[0.08em] font-bold text-[var(--mauve)]" style={{ fontFamily: 'var(--font-primary)' }}>
            {questionIndex + 1}
          </span>
          <span className="text-[11px] text-[var(--night-20)]">/</span>
          <span className="text-[11px] text-[var(--night-20)]">{totalQuestions}</span>
        </div>
      </div>

      {/* Category badge */}
      <span
        className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase mb-4"
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
        className="mb-2"
        style={{
          fontFamily: 'var(--font-primary)',
          fontWeight: 700,
          fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
          lineHeight: 1.35,
          color: 'var(--night)',
        }}
      >
        {question.title}
      </h3>
      {question.subtitle && (
        <p className="mb-6 text-[13px] text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300 }}>
          {question.subtitle}
        </p>
      )}

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((option, idx) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={`group relative w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] ${
                isSelected
                  ? 'border-[var(--mauve)] bg-[var(--mauve-05)] shadow-[0_0_0_1px_var(--mauve-20)]'
                  : 'border-transparent bg-[var(--summit-ivory)] hover:border-[var(--mauve)]/20 hover:bg-[var(--mauve-05)] hover:shadow-sm'
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Radio indicator */}
                <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isSelected
                    ? 'border-[var(--mauve)] bg-[var(--mauve)] scale-110'
                    : 'border-black/15 group-hover:border-[var(--mauve)]/40'
                }`}>
                  {isSelected && <FiCheck size={10} className="text-white" strokeWidth={3} />}
                </div>
                <span
                  className={`text-[13px] leading-snug transition-colors duration-200 ${
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
  profileColor: string
}> = ({ lead, setLead, onSubmit, profileTitle, profileColor }) => (
  <div className="px-8 py-10 md:px-10 md:py-12">
    <div className="text-center mb-8">
      {/* Animated checkmark */}
      <div className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${profileColor}15` }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={profileColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" strokeDasharray="24" className="ip-check-draw" />
        </svg>
      </div>
      <h3
        className="mb-2"
        style={{
          fontFamily: 'var(--font-primary)',
          fontWeight: 700,
          fontSize: '1.4rem',
          color: 'var(--mauve)',
        }}
      >
        {"Questionnaire terminé !"}
      </h3>
      <p className="text-[13px] text-[var(--night-60)] max-w-xs mx-auto" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, lineHeight: 1.65 }}>
        {"Votre profil "}
        <strong style={{ color: profileColor }}>{profileTitle}</strong>
        {" est prêt. Entrez vos coordonnées pour recevoir votre rapport personnalisé."}
      </p>
    </div>

    <form onSubmit={onSubmit} className="space-y-3 max-w-sm mx-auto">
      <div className="grid grid-cols-2 gap-2.5">
        <div className="relative">
          <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mauve)]/30" size={15} />
          <input
            type="text"
            required
            placeholder="Prénom"
            value={lead.firstName}
            onChange={(e) => setLead(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 bg-[var(--summit-ivory)] border border-black/6 rounded-xl text-[13px] focus:outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve)]/10 transition-all"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <div className="relative">
          <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mauve)]/30" size={15} />
          <input
            type="text"
            required
            placeholder="Nom"
            value={lead.lastName}
            onChange={(e) => setLead(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 bg-[var(--summit-ivory)] border border-black/6 rounded-xl text-[13px] focus:outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve)]/10 transition-all"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>
      </div>
      <div className="relative">
        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mauve)]/30" size={15} />
        <input
          type="email"
          required
          placeholder="Adresse email"
          value={lead.email}
          onChange={(e) => setLead(prev => ({ ...prev, email: e.target.value }))}
          className="w-full pl-10 pr-4 py-3 bg-[var(--summit-ivory)] border border-black/6 rounded-xl text-[13px] focus:outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve)]/10 transition-all"
          style={{ fontFamily: 'var(--font-primary)' }}
        />
      </div>
      <div className="relative">
        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mauve)]/30" size={15} />
        <input
          type="tel"
          placeholder="Téléphone (optionnel)"
          value={lead.phone || ''}
          onChange={(e) => setLead(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full pl-10 pr-4 py-3 bg-[var(--summit-ivory)] border border-black/6 rounded-xl text-[13px] focus:outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve)]/10 transition-all"
          style={{ fontFamily: 'var(--font-primary)' }}
        />
      </div>

      <button
        type="submit"
        className="group w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] transition-all duration-500 hover:shadow-[0_8px_24px_rgba(70,29,76,0.3)] active:scale-[0.98] mt-1"
      >
        <span className="text-[12px] tracking-[0.12em] font-bold text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
          Voir mon profil
        </span>
        <FiArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={15} />
      </button>

      <p className="text-[10px] text-center text-[var(--night-20)] mt-2 flex items-center justify-center gap-1.5" style={{ fontFamily: 'var(--font-primary)' }}>
        <FiLock size={9} /> {"Vos données sont protégées et ne seront jamais partagées."}
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
    <div className="px-8 py-10 md:px-10 md:py-12 ip-scale-in">
      {/* Profile header */}
      <div className="text-center mb-8">
        <div
          className="mx-auto mb-5 w-[72px] h-[72px] rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: `linear-gradient(135deg, ${result.color}20, ${result.color}08)`, border: `1px solid ${result.color}25` }}
        >
          <Icon size={30} style={{ color: result.color }} />
        </div>
        <span
          className="inline-block px-3.5 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase mb-3"
          style={{ color: result.color, background: result.colorLight, fontFamily: 'var(--font-primary)' }}
        >
          Votre profil
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
            lineHeight: 1.15,
            color: result.color,
          }}
        >
          {result.title}
        </h3>
        <p className="text-[13px] text-[var(--night-60)] mt-1" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300 }}>
          {result.subtitle}
        </p>
      </div>

      {/* Description */}
      <p
        className="text-[13px] text-[var(--night-60)] mb-7 text-center max-w-md mx-auto"
        style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, lineHeight: 1.7 }}
      >
        {result.description}
      </p>

      {/* Risk meter */}
      <div className="mb-7 p-4 rounded-2xl bg-[var(--summit-ivory)]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
            Niveau de risque
          </span>
          <span className="text-[10px] tracking-[0.1em] uppercase font-bold" style={{ color: result.color, fontFamily: 'var(--font-primary)' }}>
            {result.riskLevel} / 4
          </span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="h-2 flex-1 rounded-full transition-all duration-700"
              style={{
                background: level <= result.riskLevel ? result.color : 'rgba(0,0,0,0.06)',
                animationDelay: `${level * 150}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Allocation chart */}
      <div className="mb-7">
        <h4 className="text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--night)] mb-3" style={{ fontFamily: 'var(--font-primary)' }}>
          Allocation recommandée
        </h4>
        <div className="flex h-3 rounded-full overflow-hidden mb-3 bg-black/5">
          {result.allocation.map((a, i) => (
            <div
              key={a.label}
              style={{
                width: `${a.percentage}%`,
                background: a.color,
                animation: `ipBarGrow 800ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms both`,
              }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {result.allocation.map((a) => (
            <div key={a.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
              <span className="text-[11px] text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                {a.label} <strong className="text-[var(--night)]">{a.percentage}%</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Traits */}
      <div className="mb-7">
        <h4 className="text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--night)] mb-3" style={{ fontFamily: 'var(--font-primary)' }}>
          {"Caractéristiques"}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {result.traits.map((trait) => (
            <div
              key={trait}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--summit-ivory)]"
            >
              <FiCheck size={12} style={{ color: result.color }} className="shrink-0" strokeWidth={3} />
              <span className="text-[11px] text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{trait}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div
        className="p-4 rounded-2xl mb-7"
        style={{ background: result.colorLight, borderLeft: `3px solid ${result.color}` }}
      >
        <h4 className="text-[10px] tracking-[0.1em] uppercase font-bold mb-1.5" style={{ color: result.color, fontFamily: 'var(--font-primary)' }}>
          Notre recommandation
        </h4>
        <p className="text-[13px] leading-relaxed text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)', fontWeight: 400 }}>
          {result.recommendation}
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <a
          href="/contact"
          className="group flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] transition-all duration-500 hover:shadow-[0_8px_24px_rgba(70,29,76,0.3)] active:scale-[0.98]"
        >
          <span className="text-[11px] tracking-[0.1em] font-bold text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
            Prendre rendez-vous
          </span>
          <FiArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={13} />
        </a>
        <button
          onClick={onClose}
          className="flex-1 inline-flex items-center justify-center px-5 py-3.5 rounded-full border-2 border-black/8 hover:border-[var(--mauve)]/25 hover:bg-[var(--mauve-05)] transition-all duration-300 active:scale-[0.98]"
        >
          <span className="text-[11px] tracking-[0.1em] font-bold text-[var(--night)] uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
            Fermer
          </span>
        </button>
      </div>
    </div>
  )
}
