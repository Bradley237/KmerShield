import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const AnalysisDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/analyses"
          className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          title="Retour aux analyses"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
            <Shield className="w-6 h-6 text-[var(--primary)]" />
            <span>{t('dashboard.breadcrumbs.detail', "Détail de l'analyse")}</span>
          </h1>
          <p className="text-xs text-[var(--text-subtle)] font-mono">ID: {id || 'N/A'}</p>
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-8 text-center text-[var(--text-muted)]">
        <p className="text-sm font-medium">Restitution détaillée des constats et recommandations (Tâche FE2-05).</p>
      </div>
    </div>
  )
}
