import React from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitch } from '../../components/layout/LanguageSwitch'
import { ThemeToggle } from '../../components/layout/ThemeToggle'

export const Settings: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--border-color)] pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-[var(--primary)]" />
          <span>{t('dashboard.nav.settings', 'Paramètres & Préférences')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Personnalisez votre affichage, vos langues et vos sessions actives.
        </p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 max-w-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text-main)]">Langue de l'interface</p>
            <p className="text-xs text-[var(--text-muted)]">Français ou Anglais</p>
          </div>
          <LanguageSwitch />
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          <div>
            <p className="text-sm font-semibold text-[var(--text-main)]">Apparence / Thème</p>
            <p className="text-xs text-[var(--text-muted)]">Thème clair, sombre ou automatique</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
