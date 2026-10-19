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
      className="w-full bg-[#101116] text-[#F2F3F7] py-24 lg:py-32 border-t border-[#2A2C37] relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#F2F3F7] leading-tight mb-4">
            {t('home.limits.title')}
          </h2>
          <p className="text-base sm:text-lg text-[#A0A4B2] leading-relaxed font-normal">
            {t('home.limits.subtitle')}
          </p>
        </div>

        {/* Two Columns: Ce que fait / Ce qu'il ne fait pas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Left Card: Ce que fait KmerShield */}
          <div className="bg-[#17181F] border border-[#2A2C37] rounded-2xl p-7 sm:p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-[#F2F3F7] mb-6">
              {t('home.limits.whatWeDoTitle')}
            </h3>
            <div className="flex flex-col">
              {whatWeDoList.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3.5 py-4 ${
                    index < whatWeDoList.length - 1 ? 'border-b border-[#2A2C37]' : ''
                  }`}
                >
                  <Check size={18} strokeWidth={2.5} className="text-[#818CF8] flex-shrink-0" />
                  <span className="text-[15px] text-[#F2F3F7] leading-relaxed font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Ce qu'il ne fait pas */}
          <div className="bg-[#17181F] border border-[#2A2C37] rounded-2xl p-7 sm:p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-[#F2F3F7] mb-6">
              {t('home.limits.whatWeDontDoTitle')}
            </h3>
            <div className="flex flex-col">
              {whatWeDontDoList.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3.5 py-4 ${
                    index < whatWeDontDoList.length - 1 ? 'border-b border-[#2A2C37]' : ''
                  }`}
                >
                  <Minus size={18} strokeWidth={2} className="text-[#A0A4B2] flex-shrink-0" />
                  <span className="text-[15px] text-[#F2F3F7] leading-relaxed font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Three Commitments */}
        <div className="border-t border-[#2A2C37] pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 mb-1">
              <Lock size={18} strokeWidth={1.75} className="text-[#818CF8] flex-shrink-0" />
              <span className="text-base font-semibold text-[#F2F3F7]">
                {t('home.limits.commitments.com1Title')}
              </span>
            </div>
            <p className="text-sm text-[#A0A4B2] leading-relaxed">
              {t('home.limits.commitments.com1Desc')}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:border-l md:border-[#2A2C37] md:pl-8">
            <div className="flex items-center gap-2.5 mb-1">
              <Shield size={18} strokeWidth={1.75} className="text-[#818CF8] flex-shrink-0" />
              <span className="text-base font-semibold text-[#F2F3F7]">
                {t('home.limits.commitments.com2Title')}
              </span>
            </div>
            <p className="text-sm text-[#A0A4B2] leading-relaxed">
              {t('home.limits.commitments.com2Desc')}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:border-l md:border-[#2A2C37] md:pl-8">
            <div className="flex items-center gap-2.5 mb-1">
              <Info size={18} strokeWidth={1.75} className="text-[#818CF8] flex-shrink-0" />
              <span className="text-base font-semibold text-[#F2F3F7]">
                {t('home.limits.commitments.com3Title')}
              </span>
            </div>
            <p className="text-sm text-[#A0A4B2] leading-relaxed">
              {t('home.limits.commitments.com3Desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
