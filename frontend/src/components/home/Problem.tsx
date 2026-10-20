import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  MessageSquare,
  Search,
  FileText,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import { useReveal } from '../../hooks/useReveal'

export const Problem: React.FC = () => {
  const { t } = useTranslation()
  const revealRef = useReveal()

  return (
    <section ref={revealRef} className="w-full bg-[var(--bg-app)] border-t border-[var(--border-color)] py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* 1. Section Header */}
        <div className="reveal-item text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[var(--text-main)] tracking-tight leading-[1.12] mb-5">
            {t('home.problem.title')}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-[560px] mx-auto leading-relaxed">
            {t('home.problem.subtitle')}
          </p>
        </div>

        {/* 2. Three Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 01 */}
          <div className="reveal-item reveal-stagger-1 card-interactive bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(20,21,26,0.03)] group">
            <div>
              {/* Illustration: SMS */}
              <div className="h-[180px] bg-gradient-to-r from-[var(--primary-soft)]/50 to-[var(--bg-surface-secondary)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col justify-center items-center mb-6 relative overflow-hidden">
                <div className="w-full max-w-[280px] bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] p-3.5 shadow-md group-hover:shadow-lg transition-shadow duration-300 relative z-10">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-color)]/60">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center font-bold text-[10px]">
                        <MessageSquare size={12} strokeWidth={2} />
                      </div>
                      <span className="text-[11px] font-semibold text-[var(--text-main)] tracking-tight">
                        {t('home.problem.card1.mockSender')}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] font-medium">
                      {t('home.problem.card1.mockTime')}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-main)] leading-relaxed">
                    {t('home.problem.card1.mockPrefix')}
                    <span className="mark-highlight-danger font-medium text-[var(--text-main)] inline-flex items-center gap-1 mx-0.5">
                      <span>{t('home.problem.card1.mockLink')}</span>
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[var(--risk-danger)] text-white text-[9px] font-bold leading-none shrink-0" aria-label="Lien suspect">!</span>
                    </span>
                  </p>
                </div>
              </div>

              {/* Step Badge & Texts */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[var(--primary-soft)] border border-[var(--border-color)] text-[var(--primary)] font-semibold text-xs mb-3 shadow-2xs">
                {t('home.problem.card1.step')}
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-main)] tracking-tight mb-2 group-hover:text-[var(--primary)] transition-colors duration-200">
                {t('home.problem.card1.title')}
              </h3>
              <p className="text-[15px] text-[var(--text-muted)] leading-relaxed mb-6 font-normal">
                {t('home.problem.card1.description')}
              </p>
            </div>

            {/* Bottom Pill Action */}
            <div className="pt-2 border-t border-[var(--border-color)]/60">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--primary-soft)] border border-[var(--primary)]/20 text-xs font-semibold text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-200 shadow-2xs cursor-pointer">
                <Search size={14} strokeWidth={2} className="flex-shrink-0" />
                {t('home.problem.card1.action')}
              </span>
            </div>
          </div>

          {/* CARD 02 */}
          <div className="reveal-item reveal-stagger-2 card-interactive bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(20,21,26,0.03)] group">
            <div>
              {/* Illustration: Urgent Chat */}
              <div className="h-[180px] bg-gradient-to-r from-[var(--primary-soft)]/50 to-[var(--bg-surface-secondary)] border border-[var(--border-color)] rounded-xl p-3 flex flex-col justify-center items-center gap-2 mb-6 relative overflow-hidden">
                <div className="w-full max-w-[270px] bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] p-3 shadow-md group-hover:shadow-lg transition-shadow duration-300 relative z-10">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[var(--border-color)]/60">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center text-[9px] font-bold">
                        C
                      </div>
                      <span className="text-[11px] font-medium text-[var(--text-main)]">
                        {t('home.problem.card2.mockSender')}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {t('home.problem.card2.mockTime')}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-main)] leading-relaxed font-normal">
                    {t('home.problem.card2.mockText')}
                  </p>
                </div>
                <div className="self-end mr-3 relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-main)] bg-[var(--bg-surface)] px-2.5 py-1 rounded-md border border-[var(--border-color)] shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                    {t('home.problem.card2.mockBadge')}
                  </span>
                </div>
              </div>

              {/* Step Badge & Texts */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[var(--primary-soft)] border border-[var(--border-color)] text-[var(--primary)] font-semibold text-xs mb-3 shadow-2xs">
                {t('home.problem.card2.step')}
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-main)] tracking-tight mb-2 group-hover:text-[var(--primary)] transition-colors duration-200">
                {t('home.problem.card2.title')}
              </h3>
              <p className="text-[15px] text-[var(--text-muted)] leading-relaxed mb-6 font-normal">
                {t('home.problem.card2.description')}
              </p>
            </div>

            {/* Bottom Pill Action */}
            <div className="pt-2 border-t border-[var(--border-color)]/60">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--primary-soft)] border border-[var(--primary)]/20 text-xs font-semibold text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-200 shadow-2xs cursor-pointer">
                <FileText size={14} strokeWidth={2} className="flex-shrink-0" />
                {t('home.problem.card2.action')}
              </span>
            </div>
          </div>

          {/* CARD 03 */}
          <div className="reveal-item reveal-stagger-3 card-interactive bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(20,21,26,0.03)] group">
            <div>
              {/* Illustration: Receipt Skeleton */}
              <div className="h-[180px] bg-gradient-to-r from-[var(--primary-soft)]/50 to-[var(--bg-surface-secondary)] border border-[var(--border-color)] rounded-xl p-4 flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="w-[210px] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300 p-3.5 flex flex-col gap-2.5 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-main)] bg-[var(--primary-soft)] border border-[var(--border-color)] px-2 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                      {t('home.problem.card3.mockBadge')}
                    </span>
                    <HelpCircle size={14} className="text-[var(--text-muted)] flex-shrink-0" strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1.5 py-1">
                    <div className="h-2 bg-[var(--primary-soft)] rounded-full w-3/4" />
                    <div className="h-2 bg-[var(--bg-surface-secondary)] rounded-full w-1/2" />
                  </div>
                  <div className="pt-1 border-t border-[var(--border-color)]/60 flex justify-between items-center">
                    <div className="h-2 bg-[var(--primary-soft)] rounded-full w-12" />
                    <div className="h-2 bg-[var(--bg-surface-secondary)] rounded-full w-8" />
                  </div>
                </div>
              </div>

              {/* Step Badge & Texts */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[var(--primary-soft)] border border-[var(--border-color)] text-[var(--primary)] font-semibold text-xs mb-3 shadow-2xs">
                {t('home.problem.card3.step')}
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-main)] tracking-tight mb-2 group-hover:text-[var(--primary)] transition-colors duration-200">
                {t('home.problem.card3.title')}
              </h3>
              <p className="text-[15px] text-[var(--text-muted)] leading-relaxed mb-6 font-normal">
                {t('home.problem.card3.description')}
              </p>
            </div>

            {/* Bottom Pill Action */}
            <div className="pt-2 border-t border-[var(--border-color)]/60">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--primary-soft)] border border-[var(--primary)]/20 text-xs font-semibold text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-200 shadow-2xs cursor-pointer">
                <ShieldCheck size={14} strokeWidth={2} className="flex-shrink-0" />
                {t('home.problem.card3.action')}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Closing Banner with elegant gradient divider lines */}
        <div className="reveal-item reveal-stagger-4 flex items-center justify-center gap-6 mt-16 max-w-[840px] mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-[var(--border-color)]" />
          <div className="text-center px-4">
            <p className="text-[15px] sm:text-base text-[var(--text-main)] font-medium">
              {t('home.problem.closingQuestion')}
            </p>
            <a
              href="#fonctionnement"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--primary)] font-semibold mt-1.5 hover:underline group cursor-pointer"
            >
              <span>{t('home.problem.closingCta')}</span>
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-[3px]"
              />
            </a>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--border-color)] to-[var(--border-color)]" />
        </div>
      </div>
    </section>
  )
}
