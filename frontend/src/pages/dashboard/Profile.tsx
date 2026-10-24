import React from 'react'
import { User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'

export const Profile: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--border-color)] pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
          <User className="w-6 h-6 text-[var(--primary)]" />
          <span>{t('dashboard.nav.profile', 'Mon Profil')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Gérez vos informations personnelles et identifiants de compte.
        </p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 max-w-xl space-y-4">
        <div>
          <label className="text-xs font-semibold text-[var(--text-muted)]">Nom complet</label>
          <p className="text-sm font-medium text-[var(--text-main)] mt-0.5">{user?.name || 'Utilisateur'}</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--text-muted)]">Adresse email</label>
          <p className="text-sm font-medium text-[var(--text-main)] mt-0.5">{user?.email || 'compte@kmershield.cm'}</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--text-muted)]">Rôle</label>
          <p className="text-sm font-medium text-[var(--primary)] mt-0.5">Particulier (Vérification informelle)</p>
        </div>
      </div>
    </div>
  )
}
