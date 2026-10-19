import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

export const FinalCta: React.FC = () => {
  const { t } = useTranslation()
  const revealRef = useReveal()

  return (
    <section ref={revealRef} className="w-full bg-[var(--bg-app)] px-6">
      <div className="reveal-item max-w-[1200px] mx-auto my-0 px-6 sm:px-12 py-[80px] rounded-[24px] bg-[var(--primary-solid)] relative overflow-hidden text-center text-white shadow-xl mb-24">
        {/* Faint dotted pattern background */}
        <div className="absolute inset-0 bg-dotted-pattern-cta pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white max-w-2xl mx-auto mb-4 leading-tight">
            {t('home.finalCta.title')}
          </h2>
          <p className="text-base sm:text-[18px] text-white/80 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            {t('home.finalCta.subtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/inscription"
              className="btn-motion h-[52px] px-8 rounded-lg bg-white text-[var(--primary-solid)] font-semibold text-[15px] hover:bg-slate-50 transition-all shadow-sm inline-flex items-center justify-center select-none cursor-pointer"
            >
              {t('home.finalCta.button')}
            </Link>
            <Link
              to="/connexion"
              className="btn-motion h-[52px] px-8 rounded-lg bg-transparent text-white border border-white font-medium text-[15px] hover:bg-white/10 transition-all inline-flex items-center justify-center select-none cursor-pointer"
            >
              {t('home.finalCta.secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
