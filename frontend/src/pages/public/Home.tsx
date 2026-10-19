import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Shield, ArrowRight } from 'lucide-react'

export const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-24 py-12 md:py-20">
      {/* Hero Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase"
                 style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
              {t('home.hero.eyebrow')}
            </div>

            <h1 className="title-1" style={{ color: 'var(--text-main)' }}>
              {t('home.hero.headlinePrefix')}
              <span style={{ color: 'var(--primary)' }}>{t('home.hero.headlineHighlight')}</span>
            </h1>

            <p className="text-lg md:text-xl max-w-xl" style={{ color: 'var(--text-muted)' }}>
              {t('home.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/inscription"
                className="inline-flex items-center justify-center font-semibold px-6 py-3.5 rounded-xl transition-all hover:opacity-95 shadow-md min-h-[48px]"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
              >
                {t('home.hero.ctaPrimary')}
              </Link>
              <a
                href="#fonctionnement"
                className="inline-flex items-center justify-center font-medium gap-2 px-5 py-3.5 rounded-xl transition-colors hover:bg-[var(--bg-surface-secondary)] min-h-[48px]"
                style={{ color: 'var(--text-main)' }}
              >
                {t('home.hero.ctaSecondary')}
                <ArrowRight size={18} strokeWidth={1.5} />
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm pt-2" style={{ color: 'var(--text-muted)' }}>
              <Shield size={16} strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
              <span>{t('home.hero.reassurance')}</span>
            </div>

            {/* 3-Column Reassurance Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t('home.hero.metaScopeTitle')}
                </p>
                <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-main)' }}>
                  {t('home.hero.metaScopeValue')}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t('home.hero.metaMethodTitle')}
                </p>
                <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-main)' }}>
                  {t('home.hero.metaMethodValue')}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t('home.hero.metaPrivacyTitle')}
                </p>
                <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-main)' }}>
                  {t('home.hero.metaPrivacyValue')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Composition Card (Matching Stitch Screenshot) */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-6 sm:p-7 border transition-all"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow-soft-md)',
              }}
            >
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-mono px-2.5 py-1 rounded font-medium"
                      style={{ backgroundColor: 'var(--bg-surface-secondary)', color: 'var(--text-muted)' }}>
                  {t('home.hero.card.chip')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--risk-danger-soft)', color: 'var(--risk-danger)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--risk-danger)' }} />
                  {t('risk.levelHigh')}
                </span>
              </div>

              <div className="mt-4">
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  {t('home.hero.card.label')}
                </span>
                <h3 className="text-lg font-bold mt-0.5" style={{ color: 'var(--text-main)' }}>
                  {t('home.hero.card.title')}
                </h3>
              </div>

              {/* Signal Rows */}
              <div className="space-y-3 mt-5">
                <div className="p-3 rounded-xl flex items-start gap-3" style={{ backgroundColor: 'var(--bg-surface-secondary)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                        style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-main)' }}>!</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>
                      {t('home.hero.card.signal1Title')}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {t('home.hero.card.signal1Desc')}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl flex items-start gap-3" style={{ backgroundColor: 'var(--bg-surface-secondary)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
                        style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-main)' }}>⏱</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>
                      {t('home.hero.card.signal2Title')}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {t('home.hero.card.signal2Desc')}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl flex items-start gap-3" style={{ backgroundColor: 'var(--bg-surface-secondary)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
                        style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-main)' }}>⊘</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>
                      {t('home.hero.card.signal3Title')}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {t('home.hero.card.signal3Desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="p-4 rounded-xl mt-5 border" style={{ backgroundColor: 'var(--primary-soft)', borderColor: 'var(--border-color)' }}>
                <p className="text-xs font-bold" style={{ color: 'var(--primary)' }}>
                  {t('home.hero.card.recTitle')}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-main)' }}>
                  {t('home.hero.card.recDesc')}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono mt-4 pt-3 border-t"
                   style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                <span>{t('home.hero.card.ref')}</span>
                <span>{t('home.hero.card.index')}</span>
              </div>
            </div>

            <p className="text-xs italic text-center mt-3" style={{ color: 'var(--text-muted)' }}>
              {t('home.hero.card.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      {/* Anchor targets for subsequent sections */}
      <section id="fonctionnement" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="title-2">{t('home.howItWorks.title')}</h2>
        <p className="text-base mt-2" style={{ color: 'var(--text-muted)' }}>{t('home.howItWorks.subtitle')}</p>
      </section>

      <section id="limites" data-surface="dark" className="scroll-mt-24 p-12 rounded-3xl max-w-7xl mx-auto"
               style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}>
        <h2 className="title-2">{t('home.limits.title')}</h2>
        <p className="text-base mt-2" style={{ color: 'var(--text-muted)' }}>{t('home.limits.subtitle')}</p>
      </section>

      <section id="faq" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="title-2">{t('home.faq.title')}</h2>
        <p className="text-base mt-2" style={{ color: 'var(--text-muted)' }}>{t('home.faq.subtitle')}</p>
      </section>
    </div>
  )
}
