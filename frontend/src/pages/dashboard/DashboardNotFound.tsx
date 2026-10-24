import React from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const DashboardNotFound: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-8 text-center shadow-soft-sm">
        <div
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5"
          style={{
            backgroundColor: 'var(--primary-soft)',
            color: 'var(--primary)',
          }}
        >
          <FileQuestion className="w-8 h-8" strokeWidth={1.75} />
        </div>

        <h1 className="text-xl font-bold text-[var(--text-main)] mb-2">
          {t('dashboard.notFound.title', '404 - Section introuvable')}
        </h1>

        <p className="text-sm text-[var(--text-muted)] mb-6">
          {t(
            'dashboard.notFound.subtitle',
            "La section du tableau de bord demandée n'existe pas ou a été déplacée."
          )}
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('dashboard.notFound.backDashboard', "Retour à la vue d'ensemble")}</span>
        </Link>
      </div>
    </div>
  )
}
