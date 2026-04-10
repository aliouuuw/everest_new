import { useState, useCallback, useEffect, useRef } from 'react'
import { FiArrowRight, FiArrowLeft, FiX, FiCheck, FiShield, FiTrendingUp, FiTarget, FiZap, FiMail, FiUser, FiPhone, FiLock, FiAnchor, FiBriefcase } from 'react-icons/fi'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { QUESTIONS } from './questions'
import { calculateProfile } from './scoring'
import { ProfileReport } from './ProfileReport'
import type { UserAnswers, ProfileResult, LeadData, Question } from './types'

type ModalStep = 'intro' | 'quiz' | 'lead' | 'result'

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

export const InvestorProfileModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  source?: string
}> = ({ isOpen, onClose, source = 'website' }) => {
  const [step, setStep] = useState<ModalStep>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [result, setResult] = useState<ProfileResult | null>(null)
  const [lead, setLead] = useState<LeadData>({ firstName: '', lastName: '', email: '' })
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const createLead = useMutation(api.investorProfiles.createLead)

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

  const handleLeadSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!result) return

    setIsSubmitting(true)

    try {
      const answersArray = Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value,
      }))
      const investmentAmount = answers['investment_amount']

      await createLead({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        profileType: result.type,
        profileTitle: result.title,
        riskLevel: result.riskLevel,
        answers: answersArray,
        investmentAmount,
        source,
        userAgent: navigator.userAgent,
      })

      setStep('result')
    } catch (error) {
      console.error('Failed to submit lead:', error)
      setStep('result')
    } finally {
      setIsSubmitting(false)
    }
  }, [lead, answers, result, createLead, source])

  const progress = step === 'quiz' ? ((currentQuestion) / QUESTIONS.length) * 100 : (step === 'lead' || step === 'result') ? 100 : 0
  const currentCategoryIdx = step === 'quiz' ? Math.floor(currentQuestion / Math.ceil(QUESTIONS.length / 4)) : (step === 'lead' || step === 'result') ? 4 : -1

  if (!isOpen) return null

  const question = QUESTIONS[currentQuestion]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center sm:p-4 md:p-8"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--night)]/70 backdrop-blur-xl ip-fade-in" />

      {/* Modal Panel - Full screen on mobile, max-w-5xl on desktop */}
      <div className="relative w-full h-[100dvh] sm:h-[auto] sm:max-h-[92vh] max-w-5xl sm:rounded-[2rem] bg-[var(--pure-white)] shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col md:flex-row ip-slide-up">

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-[var(--night)] bg-[var(--summit-ivory)] shadow-sm transition-all duration-200"
          aria-label="Fermer"
        >
          <FiX size={20} />
        </button>

        {/* Desktop Close Button */}
        <button
          onClick={onClose}
          className="hidden md:flex absolute top-6 right-6 z-[60] w-10 h-10 items-center justify-center rounded-full bg-[var(--night-05)] hover:bg-[var(--mauve-10)] text-[var(--night-60)] hover:text-[var(--mauve)] transition-all duration-200"
          aria-label="Fermer"
        >
          <FiX size={20} />
        </button>

        {/* Left Sidebar (Dark theme) */}
        <div className="hidden md:flex w-[35%] relative bg-[var(--mauve)] text-white overflow-hidden flex-col justify-between p-10">
          {/* Subtle gradient orbs */}
          <div className="absolute top-0 left-0 w-[150%] h-[100%] pointer-events-none opacity-40" style={{ background: 'radial-gradient(ellipse at top left, var(--jaune-or-30) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[100%] h-[80%] pointer-events-none opacity-30" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(255,255,255,0.15) 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                <FiTarget size={16} className="text-[var(--jaune-or)]" />
              </div>
              <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-white/80" style={{ fontFamily: 'var(--font-primary)' }}>
                Everest Profiler
              </span>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold leading-tight" style={{ fontFamily: 'var(--font-primary)' }}>
                {step === 'intro' ? "Découvrez votre profil d'investisseur" : 
                 step === 'result' ? "Votre profil est prêt" :
                 step === 'lead' ? "Presque terminé" :
                 "Évaluation en cours"}
              </h2>
              <p className="text-[15px] leading-relaxed text-white/60 font-light" style={{ fontFamily: 'var(--font-primary)' }}>
                {step === 'intro' ? "Identifiez votre tolérance au risque et vos objectifs pour recevoir une recommandation d'allocation sur-mesure." :
                 step === 'quiz' ? "Ces informations nous permettent de définir précisément le niveau de risque qui correspond à votre situation." :
                 "L'expertise d'Everest Finance à votre service pour optimiser vos rendements."}
              </p>
            </div>
          </div>

          <div className="relative z-10">
            {/* Desktop Progress Tracker */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] uppercase tracking-[0.1em] font-bold text-[var(--jaune-or)]" style={{ fontFamily: 'var(--font-primary)' }}>
                  Progression
                </span>
                <span className="text-[13px] font-bold" style={{ fontFamily: 'var(--font-primary)' }}>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--jaune-or)] transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
              </div>

              {/* Step indicator labels */}
              {step === 'quiz' && (
                <div className="pt-6 space-y-4">
                  {STEP_ICONS.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex items-center gap-4 transition-all duration-300 ${
                        i === currentCategoryIdx
                          ? 'opacity-100 translate-x-1'
                          : i < currentCategoryIdx
                            ? 'opacity-50'
                            : 'opacity-30'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                        i < currentCategoryIdx ? 'bg-[var(--jaune-or)] border-[var(--jaune-or)] text-[var(--mauve)]' : i === currentCategoryIdx ? 'border-white/50 bg-white/10 text-white' : 'border-white/20 text-white/50'
                      }`}>
                        {i < currentCategoryIdx ? <FiCheck size={12} strokeWidth={3} /> : <span className="text-[10px]">{i + 1}</span>}
                      </div>
                      <span className="text-[13px] font-semibold" style={{ fontFamily: 'var(--font-primary)' }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col relative h-[100dvh] sm:h-[85vh] bg-[var(--pure-white)] overflow-y-auto overscroll-contain pb-10">
          
          {/* Mobile Header (Progress Bar) */}
          <div className="md:hidden sticky top-0 z-50 bg-[var(--pure-white)]/90 backdrop-blur-md border-b border-[var(--night-05)]">
            {step === 'quiz' && (
              <div className="px-6 py-4 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--summit-ivory)] text-[var(--night-60)]"
                >
                  <FiArrowLeft size={16} />
                </button>
                <div className="flex-1 px-4">
                  <div className="h-1.5 bg-[var(--summit-ivory)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--mauve)] transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <span className="text-[12px] font-bold text-[var(--mauve)]" style={{ fontFamily: 'var(--font-primary)' }}>
                  {currentQuestion + 1}/{QUESTIONS.length}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center min-h-full">
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
                isSubmitting={isSubmitting}
              />
            )}
            {step === 'result' && result && (
              <ResultStep result={result} onClose={onClose} lead={lead} />
            )}
          </div>
        </div>
      </div>

      <style>{`
        .ip-fade-in { animation: ipFadeIn 300ms ease-out both }
        .ip-slide-up { animation: ipSlideUp 500ms cubic-bezier(0.16, 1, 0.3, 1) both }
        .ip-scale-in { animation: ipScaleIn 400ms cubic-bezier(0.16, 1, 0.3, 1) both }
        .ip-check-draw { animation: ipCheckDraw 600ms cubic-bezier(0.16, 1, 0.3, 1) both }

        @keyframes ipFadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes ipSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes ipScaleIn {
          from { opacity: 0; transform: scale(0.94) }
          to { opacity: 1; transform: scale(1) }
        }
        @keyframes ipCheckDraw {
          0% { stroke-dashoffset: 24 }
          100% { stroke-dashoffset: 0 }
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
  <div className="px-6 py-12 md:px-16 md:py-16 text-center md:text-left max-w-xl mx-auto md:mx-0 w-full ip-scale-in">
    {/* Mobile only icon */}
    <div className="md:hidden mx-auto mb-6 w-16 h-16 rounded-2xl bg-[var(--mauve-05)] flex items-center justify-center">
      <FiTarget size={28} className="text-[var(--mauve)]" />
    </div>

    <h2 className="mb-4 font-bold text-3xl md:text-4xl text-[var(--night)] leading-tight" style={{ fontFamily: 'var(--font-primary)' }}>
      Comprendre votre profil d'investisseur
    </h2>
    <p className="mb-10 text-[15px] md:text-[16px] text-[var(--night-60)] leading-relaxed" style={{ fontFamily: 'var(--font-primary)' }}>
      Un profil d'investisseur adapté est la clé d'une stratégie patrimoniale réussie. Répondez à ces 9 questions rapides pour définir votre allocation idéale.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {[
        { label: '9 Questions', icon: <FiBriefcase /> },
        { label: '2 Minutes', icon: <FiPhone /> },
        { label: 'Résultat direct', icon: <FiZap /> },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col items-center md:items-start p-4 rounded-2xl bg-[var(--summit-ivory)] border border-[var(--night-05)]">
          <div className="text-[var(--mauve)] mb-2 opacity-70">{stat.icon}</div>
          <span className="text-[13px] font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{stat.label}</span>
        </div>
      ))}
    </div>

    <button
      onClick={onStart}
      className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 rounded-full bg-[var(--mauve)] hover:bg-[var(--night)] text-white transition-all duration-300 hover:shadow-[0_8px_24px_rgba(70,29,76,0.3)] active:scale-[0.98]"
    >
      <span className="text-[14px] tracking-[0.1em] font-bold uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
        Démarrer le test
      </span>
      <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
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
}> = ({ question, questionIndex, totalQuestions, selectedValue, onAnswer, onBack, isAnimating, direction }) => {
  const translateDir = direction === 'forward' ? 'translateX(40px)' : 'translateX(-40px)'

  return (
    <div
      className="px-6 py-8 md:px-16 md:py-12 w-full max-w-2xl mx-auto md:mx-0"
      style={{
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? translateDir : 'translateX(0)',
        transition: 'opacity 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Desktop Header/Back button */}
      <div className="hidden md:flex items-center justify-between mb-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[14px] font-semibold text-[var(--night-40)] hover:text-[var(--mauve)] transition-colors"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          <FiArrowLeft size={18} /> Retour
        </button>
        <span className="text-[13px] font-bold text-[var(--night-40)]" style={{ fontFamily: 'var(--font-primary)' }}>
          {questionIndex + 1} sur {totalQuestions}
        </span>
      </div>

      <h3 className="mb-3 font-bold text-2xl md:text-3xl text-[var(--night)] leading-tight" style={{ fontFamily: 'var(--font-primary)' }}>
        {question.title}
      </h3>
      {question.subtitle && (
        <p className="mb-8 text-[15px] text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
          {question.subtitle}
        </p>
      )}

      <div className="flex flex-col gap-3 md:gap-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={`group relative w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 active:scale-[0.99] ${
                isSelected
                  ? 'border-[var(--mauve)] bg-[var(--mauve-05)] shadow-[0_4px_20px_rgba(70,29,76,0.08)] z-10'
                  : 'border-[var(--night-10)] bg-white hover:border-[var(--mauve-30)] hover:bg-[var(--summit-ivory)] hover:shadow-sm'
              }`}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center gap-4 md:gap-5">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isSelected ? 'border-[var(--mauve)] bg-[var(--mauve)]' : 'border-black/20 group-hover:border-[var(--mauve-40)]'
                }`}>
                  {isSelected && <FiCheck size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className={`text-[15px] md:text-[16px] leading-snug transition-colors duration-300 ${
                  isSelected ? 'text-[var(--mauve)] font-semibold' : 'text-[var(--night-80)] font-medium'
                }`} style={{ fontFamily: 'var(--font-primary)' }}>
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
  isSubmitting?: boolean
}> = ({ lead, setLead, onSubmit, profileTitle, profileColor, isSubmitting = false }) => (
  <div className="px-6 py-12 md:px-16 md:py-16 max-w-xl mx-auto w-full ip-scale-in">
    <div className="text-center mb-10">
      <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ background: `${profileColor}15`, border: `1px solid ${profileColor}30` }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={profileColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" strokeDasharray="24" className="ip-check-draw" />
        </svg>
      </div>
      <h3 className="mb-3 font-bold text-3xl text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>
        Félicitations !
      </h3>
      <p className="text-[16px] text-[var(--night-60)] leading-relaxed" style={{ fontFamily: 'var(--font-primary)' }}>
        Votre profil <strong style={{ color: profileColor }}>{profileTitle}</strong> est prêt. Indiquez vos coordonnées pour recevoir votre rapport détaillé par email.
      </p>
    </div>

    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-40)]" size={18} />
          <input
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Prénom"
            value={lead.firstName}
            onChange={(e) => setLead(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full pl-12 pr-4 py-4 bg-[var(--summit-ivory)] border border-[var(--night-10)] rounded-xl text-[15px] focus:outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve)]/10 transition-all disabled:opacity-50"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-40)]" size={18} />
          <input
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Nom"
            value={lead.lastName}
            onChange={(e) => setLead(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full pl-12 pr-4 py-4 bg-[var(--summit-ivory)] border border-[var(--night-10)] rounded-xl text-[15px] focus:outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve)]/10 transition-all disabled:opacity-50"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>
      </div>
      <div className="relative">
        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-40)]" size={18} />
        <input
          type="email"
          required
          disabled={isSubmitting}
          placeholder="Adresse email professionnelle ou personnelle"
          value={lead.email}
          onChange={(e) => setLead(prev => ({ ...prev, email: e.target.value }))}
          className="w-full pl-12 pr-4 py-4 bg-[var(--summit-ivory)] border border-[var(--night-10)] rounded-xl text-[15px] focus:outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve)]/10 transition-all disabled:opacity-50"
          style={{ fontFamily: 'var(--font-primary)' }}
        />
      </div>
      <div className="relative">
        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-40)]" size={18} />
        <input
          type="tel"
          disabled={isSubmitting}
          placeholder="Téléphone (optionnel)"
          value={lead.phone || ''}
          onChange={(e) => setLead(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full pl-12 pr-4 py-4 bg-[var(--summit-ivory)] border border-[var(--night-10)] rounded-xl text-[15px] focus:outline-none focus:border-[var(--mauve)] focus:ring-2 focus:ring-[var(--mauve)]/10 transition-all disabled:opacity-50"
          style={{ fontFamily: 'var(--font-primary)' }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--mauve)] hover:bg-[var(--night)] text-white transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span className="text-[14px] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
          {isSubmitting ? 'Génération du rapport...' : 'Découvrir mon profil'}
        </span>
        {!isSubmitting && <FiArrowRight size={18} />}
        {isSubmitting && (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
      </button>

      <p className="text-[11px] text-center text-[var(--night-40)] mt-4 flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-primary)' }}>
        <FiLock size={12} /> Vos données sont protégées et resteront confidentielles.
      </p>
    </form>
  </div>
)

/* ───────────── Result Step ───────────── */
const ResultStep: React.FC<{
  result: ProfileResult
  onClose: () => void
  lead: LeadData
}> = ({ result, onClose, lead }) => {
  const Icon = PROFILE_ICONS[result.type]
  const generatedAt = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="px-6 py-12 md:px-16 md:py-16 ip-scale-in w-full max-w-4xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
        <div className="w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${result.color}20, ${result.color}08)`, border: `1px solid ${result.color}30` }}>
          <Icon size={36} style={{ color: result.color }} />
        </div>
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: result.color, background: result.colorLight, fontFamily: 'var(--font-primary)' }}>
            Votre Profil
          </span>
          <h3 className="font-bold text-4xl md:text-5xl leading-none" style={{ fontFamily: 'var(--font-primary)', color: result.color }}>
            {result.title}
          </h3>
          <p className="text-[16px] text-[var(--night-60)] mt-3" style={{ fontFamily: 'var(--font-primary)' }}>
            {result.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-[var(--summit-ivory)] border border-[var(--night-05)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] tracking-[0.1em] uppercase font-bold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>Niveau de risque</span>
            <span className="text-[13px] font-bold" style={{ color: result.color, fontFamily: 'var(--font-primary)' }}>{result.riskLevel} / 5</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="h-2.5 flex-1 rounded-full transition-all duration-700" style={{ background: level <= result.riskLevel ? result.color : 'rgba(0,0,0,0.06)', animationDelay: `${level * 100}ms` }} />
            ))}
          </div>
          <p className="text-[14px] mt-5 leading-relaxed text-[var(--night-80)]" style={{ fontFamily: 'var(--font-primary)' }}>{result.description}</p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--summit-ivory)] border border-[var(--night-05)] flex flex-col justify-between">
          <div>
            <span className="text-[11px] tracking-[0.1em] uppercase font-bold text-[var(--night-60)] block mb-4" style={{ fontFamily: 'var(--font-primary)' }}>Allocation recommandée</span>
            <div className="flex h-4 rounded-full overflow-hidden mb-5 bg-black/5">
              {result.allocation.map((a, i) => (
                <div key={a.label} style={{ width: `${a.percentage}%`, background: a.color, animation: `ipBarGrow 800ms ease-out ${i * 100}ms both` }} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {result.allocation.map((a) => (
                <div key={a.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: a.color }} />
                  <span className="text-[13px] font-medium text-[var(--night-80)]" style={{ fontFamily: 'var(--font-primary)' }}>{a.label} <span className="font-bold ml-1">{a.percentage}%</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl mb-8 border" style={{ background: result.colorLight, borderColor: `${result.color}20`, borderLeftWidth: '4px', borderLeftColor: result.color }}>
        <h4 className="text-[11px] tracking-[0.1em] uppercase font-bold mb-2" style={{ color: result.color, fontFamily: 'var(--font-primary)' }}>Notre recommandation</h4>
        <p className="text-[15px] leading-relaxed text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{result.recommendation}</p>
      </div>

      <div className="mb-10">
        <ProfileReport result={result} firstName={lead.firstName} lastName={lead.lastName} email={lead.email} generatedAt={generatedAt} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/contact" className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[var(--mauve)] hover:bg-[var(--night)] text-white transition-all hover:shadow-lg">
          <span className="text-[13px] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-primary)' }}>Prendre rendez-vous</span>
          <FiArrowRight size={16} />
        </a>
        <button onClick={onClose} className="sm:w-auto px-8 py-4 rounded-xl border-2 border-[var(--night-10)] hover:bg-[var(--summit-ivory)] hover:border-[var(--night-20)] text-[var(--night)] transition-all">
          <span className="text-[13px] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-primary)' }}>Fermer</span>
        </button>
      </div>
    </div>
  )
}
