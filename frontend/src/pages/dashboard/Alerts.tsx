import React from 'react'
import { Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Alerts: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--border-color)] pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
          <Bell className="w-6 h-6 text-[var(--primary)]" />
          <span>{t('dashboard.nav.alerts', 'Alertes & Sécurité')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Notifications et alertes prioritaires sur vos activités suspectes récentes.
        </p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-8 text-center text-[var(--text-muted)]">
        <p className="text-sm font-medium">Centre d'alertes avec marquage comme lu (Tâche FE2-06).</p>
      </div>
    </div>
  )
}
