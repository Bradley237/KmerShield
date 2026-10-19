import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShieldAlert } from 'lucide-react'

export const NotFound: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
      >
        <ShieldAlert size={32} strokeWidth={1.5} />
      </div>
      <h1 className="title-2" style={{ color: 'var(--text-main)' }}>
        404 — {t('notFound.title')}
      </h1>
      <p className="text-base max-w-md mt-3 mb-8" style={{ color: 'var(--text-muted)' }}>
        {t('notFound.subtitle')}
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-95 shadow-sm min-h-[44px] inline-flex items-center active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-solid)] focus-visible:ring-offset-2"
        style={{ backgroundColor: 'var(--primary-solid)', color: 'var(--on-primary-solid)' }}
      >
        {t('notFound.button')}
      </Link>
    </div>
  )
}
