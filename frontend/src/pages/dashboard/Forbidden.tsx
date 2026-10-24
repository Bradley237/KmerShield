import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Forbidden: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-8 text-center shadow-soft-sm">
        <div
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5"
          style={{
            backgroundColor: 'var(--feedback-error-soft)',
            color: 'var(--feedback-error)',
          }}
        >
          <ShieldAlert className="w-8 h-8" strokeWidth={1.75} />
        </div>

        <h1 className="text-xl font-bold text-[var(--text-main)] mb-2">
          {t('dashboard.forbidden.title', '403 - Accès restreint')}
        </h1>

        <p className="text-sm font-medium text-[var(--text-muted)] mb-3">
          {t(
            'dashboard.forbidden.subtitle',
            "Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource ou effectuer cette action."
          )}
        </p>

        <p className="text-xs text-[var(--text-subtle)] mb-6 leading-relaxed">
          {t(
            'dashboard.forbidden.description',
            "Si vous pensez qu'il s'agit d'une anomalie, veuillez vérifier votre type de compte ou contacter le support technique."
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('dashboard.forbidden.backDashboard', 'Retour au tableau de bord')}</span>
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            <Mail className="w-4 h-4 text-[var(--text-muted)]" />
            <span>{t('dashboard.forbidden.contactSupport', "Contacter l'assistance")}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
