import React from 'react'
import { Activity } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Analyses: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--border-color)] pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
          <Activity className="w-6 h-6 text-[var(--primary)]" />
          <span>{t('dashboard.nav.analyses', 'Analyses & Suivi')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Suivi en temps réel des analyses en cours et terminées.
        </p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-8 text-center text-[var(--text-muted)]">
        <p className="text-sm font-medium">Module de suivi des analyses en cours (Tâche FE2-04).</p>
      </div>
    </div>
  )
}
