import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer
      className="w-full border-t py-10 transition-colors"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-muted)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          {/* Brand & Purpose */}
          <div className="text-center md:text-left">
            <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
              KmerShield
            </span>{' '}
            — {t('brand.footerDescription')}
          </div>

          {/* Legal and Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/conditions"
              className="hover:text-[var(--text-main)] transition-colors"
            >
              {t('footer.terms')}
            </Link>
            <span aria-hidden="true" className="opacity-40">·</span>
            <Link
              to="/confidentialite"
              className="hover:text-[var(--text-main)] transition-colors"
            >
              {t('footer.privacy')}
            </Link>
            <span aria-hidden="true" className="opacity-40">·</span>
            <Link
              to="/contact"
              className="hover:text-[var(--text-main)] transition-colors"
            >
              {t('footer.contact')}
            </Link>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>{t('footer.copyright')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
