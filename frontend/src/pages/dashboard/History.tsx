import React from 'react'
import { History as HistoryIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const History: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--border-color)] pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
          <HistoryIcon className="w-6 h-6 text-[var(--primary)]" />
          <span>{t('dashboard.nav.history', 'Historique des analyses')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Consultez et filtrez l'ensemble de vos analyses passées.
        </p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-8 text-center text-[var(--text-muted)]">
        <p className="text-sm font-medium">Table paginée et filtres de recherche (Tâche FE2-06).</p>
      </div>
    </div>
  )
}
