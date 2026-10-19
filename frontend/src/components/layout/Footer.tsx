import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Shield } from 'lucide-react'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-app)] py-8 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--text-muted)]">
        {/* Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center">
              <Shield size={14} strokeWidth={2} />
            </div>
            <span className="font-bold text-[var(--text-main)] text-sm">
              {t('brand.name')}
            </span>
          </div>
          <span className="hidden sm:inline text-[var(--text-subtle)]">•</span>
          <span>{t('brand.footerDescription')}</span>
        </div>

        {/* Links & Legal */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link to="/conditions" className="hover:text-[var(--text-main)] transition-colors">
            {t('footer.legal')}
          </Link>
          <Link to="/confidentialite" className="hover:text-[var(--text-main)] transition-colors">
            {t('footer.privacy')}
          </Link>
          <Link to="/conditions" className="hover:text-[var(--text-main)] transition-colors">
            {t('footer.terms')}
          </Link>
          <Link to="/contact" className="hover:text-[var(--text-main)] transition-colors">
            {t('footer.contact')}
          </Link>
          <span className="text-[var(--text-subtle)]">{t('footer.copyright')}</span>
        </div>
      </div>
    </footer>
  )
}
