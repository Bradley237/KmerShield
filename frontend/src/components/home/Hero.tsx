import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Shield,
  ArrowRight,
  Lock,
  Info,
  Link2Off,
  AlertTriangle,
  Check,
  CheckCheck,
  User,
} from 'lucide-react'

export const Hero: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative flex-1 flex items-center justify-center overflow-hidden py-12 lg:py-16">
      {/* Dotted Background Grid Layer */}
      <div className="absolute inset-0 bg-dotted-pattern pointer-events-none opacity-80" />

      <div className="relative max-w-[1200px] w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT COLUMN (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            {/* Hero Headline */}
            <h1 className="hero-enter-headline text-5xl lg:text-[64px] font-bold tracking-tight text-[var(--text-main)] leading-[1.08] mb-6">
              {t('home.hero.headlinePrefix')}
              <span className="text-[var(--primary)]">{t('home.hero.headlineHighlight')}</span>
            </h1>

            {/* Hero Subtitle */}
            <p className="hero-enter-subhead text-lg lg:text-[20px] text-[var(--text-muted)] leading-relaxed max-w-[520px] mb-8 font-normal">
              {t('home.hero.subtitle')}
            </p>

            {/* Buttons Row */}
            <div className="hero-enter-buttons flex flex-col sm:flex-row items-center gap-5 mb-10 w-full sm:w-auto">
              <Link
                to="/inscription"
                className="btn-motion h-[52px] px-8 rounded-lg bg-[var(--primary-solid)] hover:bg-[var(--primary-solid-hover)] active:bg-[var(--primary-solid-active)] text-[var(--on-primary-solid)] font-medium text-base shadow-sm inline-flex items-center justify-center transition w-full sm:w-auto shrink-0 select-none"
              >
                {t('home.hero.ctaPrimary')}
              </Link>
              <a
                href="#fonctionnement"
                className="h-[52px] px-4 text-[var(--text-main)] font-medium text-base hover:text-[var(--primary)] inline-flex items-center justify-center gap-2 transition group w-full sm:w-auto"
              >
                <span>{t('home.hero.ctaSecondary')}</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-[3px] transition-transform"
                />
              </a>
            </div>

            {/* Reassurance Row */}
            <div className="hero-enter-reassurance w-full pt-6 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <Link2Off size={16} strokeWidth={1.5} className="text-[var(--text-muted)] flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--text-muted)] leading-tight">
                  {t('home.hero.reassurance1')}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock size={16} strokeWidth={1.5} className="text-[var(--text-muted)] flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--text-muted)] leading-tight">
                  {t('home.hero.reassurance2')}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Info size={16} strokeWidth={1.5} className="text-[var(--text-muted)] flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--text-muted)] leading-tight">
                  {t('home.hero.reassurance3')}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 cols, Layered Narrative Visual) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
            {/* Soft Indigo Glow with subtle breathing animation */}
            <div className="absolute -inset-4 bg-indigo-500/8 dark:bg-indigo-500/10 blur-3xl rounded-full pointer-events-none transform -translate-y-4 animate-glow-breathe" />

            {/* Subtle Context Pill (top-left of composition, aligned with bubble left edge) */}
            <div className="w-full max-w-[540px] flex justify-start mb-2.5 pl-4">
              <span className="inline-flex items-center text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-surface)]/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[var(--border-color)]">
                {t('home.hero.examplePill')}
              </span>
            </div>

            <div className="relative w-full max-w-[540px]">
              {/* Layer 1: WhatsApp-style Incoming Message (Back Layer, slight rotation -2deg) */}
              <div className="animate-chat-bubble relative -rotate-2 -mb-5 ml-4 mr-8 p-4 pb-9 bg-[var(--bg-surface)]/95 backdrop-blur-sm rounded-2xl rounded-bl-sm border border-[var(--border-color)] shadow-md z-0 transition-transform duration-300 hover:rotate-0">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]/50 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[var(--bg-surface-raised)] border border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center">
                      <User size={12} strokeWidth={2} className="text-[var(--text-muted)]" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-main)]">
                      {t('home.hero.bubble.sender')}
                    </span>
                  </div>
                  <span className="text-[11px] text-[var(--text-subtle)]">
                    {t('home.hero.bubble.time')}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
                  {t('home.hero.bubble.greeting')}
                  <span className="mark-highlight-danger animate-sweep-1 font-semibold text-[var(--text-main)] inline-flex items-center gap-1 mx-0.5">
                    <span>{t('home.hero.bubble.alert1')}</span>
                    <span
                      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[11px] font-semibold leading-none shrink-0"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--risk-danger) 20%, transparent)',
                        color: 'var(--risk-danger)',
                      }}
                      aria-label="Signal 1"
                    >
                      1
                    </span>
                  </span>
                  {t('home.hero.bubble.middle')}
                  <span className="mark-highlight-danger animate-sweep-2 font-semibold text-[var(--text-main)] inline-flex items-center gap-1 mx-0.5">
                    <span>{t('home.hero.bubble.alert2')}</span>
                    <span
                      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[11px] font-semibold leading-none shrink-0"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--risk-danger) 20%, transparent)',
                        color: 'var(--risk-danger)',
                      }}
                      aria-label="Signal 2"
                    >
                      2
                    </span>
                  </span>
                  {t('home.hero.bubble.period')}
                </p>
                <div className="flex justify-end mt-1.5 items-center gap-1 text-[10px] text-[var(--text-subtle)]">
                  <span>{t('home.hero.bubble.time')}</span>
                  <CheckCheck size={14} className="text-sky-500" strokeWidth={2} />
                </div>
              </div>

              {/* Layer 2: Main Evaluation Card (Front layer) */}
              <div className="animate-analysis-card relative z-10 bg-[var(--bg-surface)] rounded-2xl p-7 sm:p-8 border border-[var(--border-color)] shadow-[0_20px_50px_rgba(20,21,26,0.06),0_1px_3px_rgba(20,21,26,0.04)]">
                {/* Card Header */}
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-[var(--border-color)]/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center">
                      <Shield size={16} strokeWidth={2} />
                    </div>
                    <span className="font-semibold text-sm text-[var(--text-main)]">
                      {t('home.hero.card.analysisTitle')}
                    </span>
                  </div>

                  {/* Risk Badge strictly categorical (Danger at 14% opacity) */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--risk-danger) 14%, transparent)',
                      color: 'var(--risk-danger)',
                      border: '1px solid color-mix(in srgb, var(--risk-danger) 24%, transparent)',
                    }}
                  >
                    <AlertTriangle size={14} strokeWidth={2} style={{ color: 'var(--risk-danger)' }} />
                    <span>{t('home.hero.card.riskBadge')}</span>
                  </div>
                </div>

                {/* Three-segment Risk Level Visual Indicator */}
                <div className="mt-5 mb-6">
                  {/* Three segments of exactly equal width (flex: 1) with an 8px gap */}
                  <div className="flex gap-2 overflow-hidden">
                    <div className="flex-1 h-2 rounded-full bg-[var(--bg-surface-secondary)]" />
                    <div className="flex-1 h-2 rounded-full bg-[var(--bg-surface-secondary)]" />
                    <div
                      className="flex-1 h-2 rounded-full animate-segment-fill"
                      style={{
                        backgroundColor: 'var(--risk-danger)',
                        boxShadow: '0 0 6px color-mix(in srgb, var(--risk-danger) 25%, transparent)',
                      }}
                    />
                  </div>
                  {/* Each label centered under its own segment */}
                  <div className="flex gap-2 mt-2">
                    <span className="flex-1 text-center text-xs font-medium text-[var(--text-muted)]">
                      {t('home.hero.card.levelLow')}
                    </span>
                    <span className="flex-1 text-center text-xs font-medium text-[var(--text-muted)]">
                      {t('home.hero.card.levelMedium')}
                    </span>
                    <span className="flex-1 text-center text-xs font-semibold text-[var(--risk-danger)]">
                      {t('home.hero.card.levelHigh')}
                    </span>
                  </div>
                </div>

                {/* Breakdown of Reasons (Staggered Animation) */}
                <div className="space-y-3">
                  {/* Reason 1 */}
                  <div className="animate-reason-1 flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
                    <div className="w-5 h-5 rounded-full bg-[var(--risk-danger-soft)] text-[var(--risk-danger)] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--text-main)] leading-snug">
                        {t('home.hero.card.reason1Title')}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {t('home.hero.card.reason1Desc')}
                      </p>
                    </div>
                  </div>

                  {/* Reason 2 */}
                  <div className="animate-reason-2 flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
                    <div className="w-5 h-5 rounded-full bg-[var(--risk-danger-soft)] text-[var(--risk-danger)] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--text-main)] leading-snug">
                        {t('home.hero.card.reason2Title')}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {t('home.hero.card.reason2Desc')}
                      </p>
                    </div>
                  </div>

                  {/* Reason 3 */}
                  <div className="animate-reason-3 flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)]">
                    <div className="w-5 h-5 rounded-full bg-[var(--risk-danger-soft)] text-[var(--risk-danger)] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--text-main)] leading-snug">
                        {t('home.hero.card.reason3Title')}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {t('home.hero.card.reason3Desc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendation Action Box */}
                <div className="mt-5 p-4 rounded-xl bg-[var(--primary-soft)] border border-[var(--primary)]/20 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Info size={12} strokeWidth={2.5} />
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--primary-active)] dark:text-indigo-200 font-medium leading-relaxed">
                    {t('home.hero.card.recommendation')}
                  </p>
                </div>
              </div>

              {/* Layer 3: Floating Guarantee Chip (overlapping bottom-right corner of card) */}
              <div className="absolute -bottom-4 right-4 sm:-bottom-4 sm:right-6 z-20 animate-chip-interactive bg-[var(--bg-surface)] border border-[var(--border-color)] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 select-none">
                <div className="w-4 h-4 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center">
                  <Check size={12} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-semibold text-[var(--text-main)] tracking-tight">
                  {t('home.hero.card.floatingChip')}
                </span>
              </div>
            </div>

            {/* Muted context disclaimer underneath */}
            <p className="text-xs text-[var(--text-muted)] text-center mt-4 italic max-w-md">
              {t('home.hero.card.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
