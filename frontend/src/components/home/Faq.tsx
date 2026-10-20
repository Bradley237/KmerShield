import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useReveal } from '../../hooks/useReveal'

interface FaqItem {
  question: string
  answer: string
}

export const Faq: React.FC = () => {
  const { t } = useTranslation()
  const revealRef = useReveal()
  // First item open by default matching Stitch reference
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const items = t('home.faq.items', { returnObjects: true }) as FaqItem[]

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section ref={revealRef} className="w-full bg-[var(--bg-app)] py-24 lg:py-28 border-t border-[var(--border-color)]" id="faq">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Title & Contact Link */}
          <div className="reveal-item col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[var(--text-main)] tracking-tight leading-tight mb-4">
              {t('home.faq.title')}
            </h2>
            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              {t('home.faq.subtitle')}
              <Link to="/contact" className="text-[var(--primary)] font-medium hover:underline ml-1.5 inline-flex items-center">
                {t('home.faq.contactLink')}
              </Link>
            </p>
          </div>

          {/* Right Column: Accessible Interactive Accordion */}
          <div className="col-span-12 lg:col-span-8">
            <div className="divide-y divide-[var(--border-color)]">
              {items.map((item, idx) => {
                const isOpen = openIndices.includes(idx)
                const staggerClass = idx === 0 ? 'reveal-stagger-1' : idx === 1 ? 'reveal-stagger-2' : idx === 2 ? 'reveal-stagger-3' : idx === 3 ? 'reveal-stagger-4' : 'reveal-stagger-5'
                return (
                  <div key={idx} className={`reveal-item ${staggerClass} border-b border-[var(--border-color)]`}>
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="flex items-center justify-between w-full py-5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-solid)] focus-visible:ring-offset-2 rounded-lg"
                    >
                      <span className="text-[17px] font-semibold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors pr-4">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        strokeWidth={1.75}
                        className={`text-[var(--text-muted)] group-hover:text-[var(--primary)] flex-shrink-0 transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      id={`faq-answer-${idx}`}
                      role="region"
                      className={`overflow-hidden transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-[15px] text-[var(--text-muted)] leading-[26px] max-w-[620px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
