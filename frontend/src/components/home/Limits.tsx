import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Minus, Lock, Shield, Info } from 'lucide-react'

export const Limits: React.FC = () => {
  const { t } = useTranslation()

  const whatWeDoList = t('home.limits.whatWeDoList', { returnObjects: true }) as string[]
  const whatWeDontDoList = t('home.limits.whatWeDontDoList', { returnObjects: true }) as string[]

  return (
    <section
      id="limites"
      data-surface="dark"
      className="w-full bg-[var(--bg-app)] text-[var(--text-main)] py-24 lg:py-32 border-t border-[var(--border-color)] relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[var(--text-main)] leading-tight mb-4">
            {t('home.limits.title')}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
            {t('home.limits.subtitle')}
          </p>
        </div>

        {/* Two Columns: Ce que fait / Ce qu'il ne fait pas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Left Card: Ce que fait KmerShield */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-7 sm:p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-6">
              {t('home.limits.whatWeDoTitle')}
            </h3>
            <div className="flex flex-col">
              {whatWeDoList.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3.5 py-4 ${
                    index < whatWeDoList.length - 1 ? 'border-b border-[var(--border-color)]' : ''
                  }`}
                >
                  <Check size={18} strokeWidth={2.5} className="text-[var(--primary)] flex-shrink-0" />
                  <span className="text-[15px] text-[var(--text-main)] leading-relaxed font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Ce qu'il ne fait pas */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-7 sm:p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-6">
              {t('home.limits.whatWeDontDoTitle')}
            </h3>
            <div className="flex flex-col">
              {whatWeDontDoList.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3.5 py-4 ${
                    index < whatWeDontDoList.length - 1 ? 'border-b border-[var(--border-color)]' : ''
                  }`}
                >
                  <Minus size={18} strokeWidth={2} className="text-[var(--text-muted)] flex-shrink-0" />
                  <span className="text-[15px] text-[var(--text-main)] leading-relaxed font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Three Commitments */}
        <div className="border-t border-[var(--border-color)] pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 mb-1">
              <Lock size={18} strokeWidth={1.75} className="text-[var(--primary)] flex-shrink-0" />
              <span className="text-base font-semibold text-[var(--text-main)]">
                {t('home.limits.commitments.com1Title')}
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {t('home.limits.commitments.com1Desc')}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:border-l md:border-[var(--border-color)] md:pl-8">
            <div className="flex items-center gap-2.5 mb-1">
              <Shield size={18} strokeWidth={1.75} className="text-[var(--primary)] flex-shrink-0" />
              <span className="text-base font-semibold text-[var(--text-main)]">
                {t('home.limits.commitments.com2Title')}
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {t('home.limits.commitments.com2Desc')}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:border-l md:border-[var(--border-color)] md:pl-8">
            <div className="flex items-center gap-2.5 mb-1">
              <Info size={18} strokeWidth={1.75} className="text-[var(--primary)] flex-shrink-0" />
              <span className="text-base font-semibold text-[var(--text-main)]">
                {t('home.limits.commitments.com3Title')}
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {t('home.limits.commitments.com3Desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
