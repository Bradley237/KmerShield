import React from 'react'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, FileText } from 'lucide-react'

export const Privacy: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium"
             style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}>
          <FileText size={14} strokeWidth={1.5} />
          {t('common.draftNotice')}
        </div>

        <h1 className="title-2" style={{ color: 'var(--text-main)' }}>
          {t('footer.privacy')}
        </h1>

        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          {t('common.draftDescription')}
        </p>

        <div className="p-6 rounded-2xl border space-y-4"
             style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
            1. Principes de confidentialité citoyenne
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            KmerShield a été conçu selon le principe de minimisation stricte des données. Aucune information bancaire, identifiant de compte, numéro de carte ou code secret de mobile money n’est stocké sur nos serveurs.
          </p>

          <h2 className="text-xl font-bold pt-4" style={{ color: 'var(--text-main)' }}>
            2. Traitement éphémère des éléments soumis
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Les textes, messages ou liens soumis pour évaluation font l’objet d’un traitement automatisé immédiat destiné à extraire les signaux de risque, sans association persistante à l’identité de l’utilisateur.
          </p>

          <div className="flex items-center gap-3 p-4 rounded-xl mt-6"
               style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--text-main)' }}>
            <ShieldCheck size={20} strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
            <span className="text-sm font-medium">
              Engagement KmerShield : Zéro conservation de données de paiement.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
