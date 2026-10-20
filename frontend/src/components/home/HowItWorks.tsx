import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Shield,
  AlertTriangle,
  OctagonAlert,
  CreditCard,
  Clock,
  Info,
} from 'lucide-react'
import { useReveal } from '../../hooks/useReveal'

export const HowItWorks: React.FC = () => {
  const { t } = useTranslation()
  const part1Ref = useReveal<HTMLDivElement>()
  const part2Ref = useReveal<HTMLDivElement>()

  return (
    <section className="w-full border-t border-[var(--border-color)]" id="fonctionnement">
      {/* PART 1: Comment ça marche */}
      <div ref={part1Ref} className="bg-[var(--bg-app)] py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Top Centered Header with Pill Label */}
          <div className="reveal-item flex flex-col items-center text-center">
            <span className="inline-flex items-center text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider bg-[var(--primary-soft)] px-3 py-1 rounded-full border border-[var(--primary)]/20 mb-4">
              {t('home.howItWorks.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[var(--text-main)] leading-tight">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-[560px] mx-auto mt-4 leading-relaxed font-normal">
              {t('home.howItWorks.subtitle')}
            </p>
          </div>

          {/* Three Steps with Connecting Line */}
          <div className="mt-16 relative">
            {/* Segment 1: Step 1 to Step 2 (stops 8px before each numbered circle) */}
            <div className="hidden md:block absolute top-5 left-[calc(16.666%+28px)] right-[calc(50%+28px)] h-2 z-0 pointer-events-none overflow-hidden">
              <svg className="w-full h-2 dotted-line-draw line-draw" width="100%" height="8" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="4"
                  x2="100%"
                  y2="4"
                  stroke="var(--border-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 8"
                />
              </svg>
            </div>

            {/* Segment 2: Step 2 to Step 3 (stops 8px before each numbered circle) */}
            <div className="hidden md:block absolute top-5 left-[calc(50%+28px)] right-[calc(16.666%+28px)] h-2 z-0 pointer-events-none overflow-hidden">
              <svg className="w-full h-2 dotted-line-draw line-draw" width="100%" height="8" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="4"
                  x2="100%"
                  y2="4"
                  stroke="var(--border-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 8"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="reveal-item reveal-stagger-1 flex flex-col">
                <div className="circle-pop-1 w-10 h-10 rounded-full border-2 border-[var(--primary)] bg-[var(--bg-surface)] text-[var(--primary)] font-semibold text-base flex items-center justify-center mx-auto mb-6 shadow-sm relative z-10">
                  {t('home.howItWorks.step1.number')}
                </div>
                <div className="card-interactive bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-main)]">
                      {t('home.howItWorks.step1.title')}
                    </h3>
                    <p className="text-[15px] text-[var(--text-muted)] mt-2 mb-6 font-normal leading-relaxed">
                      {t('home.howItWorks.step1.description')}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] p-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--text-muted)] truncate">
                      {t('home.howItWorks.step1.inputPlaceholder')}
                    </span>
                    <span className="bg-[var(--primary-solid)] text-white text-xs px-3 py-1.5 rounded-lg font-medium flex-shrink-0 cursor-default shadow-xs">
                      {t('home.howItWorks.step1.action')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="reveal-item reveal-stagger-2 flex flex-col">
                <div className="circle-pop-2 w-10 h-10 rounded-full border-2 border-[var(--primary)] bg-[var(--bg-surface)] text-[var(--primary)] font-semibold text-base flex items-center justify-center mx-auto mb-6 shadow-sm relative z-10">
                  {t('home.howItWorks.step2.number')}
                </div>
                <div className="card-interactive bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-main)]">
                      {t('home.howItWorks.step2.title')}
                    </h3>
                    <p className="text-[15px] text-[var(--text-muted)] mt-2 mb-6 font-normal leading-relaxed">
                      {t('home.howItWorks.step2.description')}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[var(--text-muted)] flex-shrink-0" strokeWidth={1.75} />
                      <span className="text-xs text-[var(--text-main)] font-medium">
                        {t('home.howItWorks.step2.signal1')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-[var(--text-muted)] flex-shrink-0" strokeWidth={1.75} />
                      <span className="text-xs text-[var(--text-main)] font-medium">
                        {t('home.howItWorks.step2.signal2')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="reveal-item reveal-stagger-3 flex flex-col">
                <div className="circle-pop-3 w-10 h-10 rounded-full border-2 border-[var(--primary)] bg-[var(--bg-surface)] text-[var(--primary)] font-semibold text-base flex items-center justify-center mx-auto mb-6 shadow-sm relative z-10">
                  {t('home.howItWorks.step3.number')}
                </div>
                <div className="card-interactive bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] p-6 shadow-sm flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-main)]">
                      {t('home.howItWorks.step3.title')}
                    </h3>
                    <p className="text-[15px] text-[var(--text-muted)] mt-2 mb-6 font-normal leading-relaxed">
                      {t('home.howItWorks.step3.description')}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[var(--primary-soft)] border border-[var(--primary)]/20 p-3.5 flex items-start gap-2.5">
                    <Info size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-xs text-[var(--text-main)] leading-relaxed font-medium">
                      {t('home.howItWorks.step3.advice')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: Trois niveaux, jamais de pourcentage (Risk-Level Cards) */}
      <div ref={part2Ref} className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-color)] py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Centered Header */}
          <div className="reveal-item text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[var(--text-main)] tracking-tight leading-tight">
              {t('home.riskLevels.title')}
            </h3>
            <p className="text-base text-[var(--text-muted)] mt-3 font-normal leading-relaxed">
              {t('home.riskLevels.subtitle')}
            </p>
          </div>

          {/* Three Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Risque faible (Green) */}
            <div className="reveal-item reveal-stagger-1 card-interactive rounded-2xl border border-[var(--border-color)] p-6 bg-[var(--bg-surface)] flex flex-col justify-between shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold text-[var(--risk-success)] bg-[var(--risk-success-soft)] self-start">
                  <Shield size={16} strokeWidth={2} className="flex-shrink-0" />
                  <span>{t('home.riskLevels.low.label')}</span>
                </div>
                <p className="text-[15px] font-medium text-[var(--text-main)] mt-4 leading-relaxed">
                  {t('home.riskLevels.low.headline')}
                </p>
              </div>
              <div>
                <div className="border-t border-[var(--border-color)] my-4" />
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  {t('home.riskLevels.whatToDo')}
                </span>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {t('home.riskLevels.low.action')}
                </p>
              </div>
            </div>

            {/* Card 2: Vigilance (Amber) */}
            <div className="reveal-item reveal-stagger-2 card-interactive rounded-2xl border border-[var(--border-color)] p-6 bg-[var(--bg-surface)] flex flex-col justify-between shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold text-[var(--risk-warning)] bg-[var(--risk-warning-soft)] self-start">
                  <AlertTriangle size={16} strokeWidth={2} className="flex-shrink-0" />
                  <span>{t('home.riskLevels.moderate.label')}</span>
                </div>
                <p className="text-[15px] font-medium text-[var(--text-main)] mt-4 leading-relaxed">
                  {t('home.riskLevels.moderate.headline')}
                </p>
              </div>
              <div>
                <div className="border-t border-[var(--border-color)] my-4" />
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  {t('home.riskLevels.whatToDo')}
                </span>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {t('home.riskLevels.moderate.action')}
                </p>
              </div>
            </div>

            {/* Card 3: Risque élevé (Red) */}
            <div className="reveal-item reveal-stagger-3 card-interactive rounded-2xl border border-[var(--border-color)] p-6 bg-[var(--bg-surface)] flex flex-col justify-between shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold text-[var(--risk-danger)] bg-[var(--risk-danger-soft)] self-start">
                  <OctagonAlert size={16} strokeWidth={2} className="flex-shrink-0" />
                  <span>{t('home.riskLevels.high.label')}</span>
                </div>
                <p className="text-[15px] font-medium text-[var(--text-main)] mt-4 leading-relaxed">
                  {t('home.riskLevels.high.headline')}
                </p>
              </div>
              <div>
                <div className="border-t border-[var(--border-color)] my-4" />
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  {t('home.riskLevels.whatToDo')}
                </span>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {t('home.riskLevels.high.action')}
                </p>
              </div>
            </div>
          </div>

          {/* Centered Note */}
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <Info size={16} strokeWidth={1.75} className="flex-shrink-0 text-[var(--text-muted)]" />
            <span>{t('home.riskLevels.note')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
