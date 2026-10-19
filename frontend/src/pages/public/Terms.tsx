import React from 'react'
import { useTranslation } from 'react-i18next'
import { FileText, AlertCircle } from 'lucide-react'

export const Terms: React.FC = () => {
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
          {t('footer.terms')}
        </h1>

        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          {t('common.draftDescription')}
        </p>

        <div className="p-6 rounded-2xl border space-y-4"
             style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
            1. Nature du service d'évaluation
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            KmerShield est un service d'aide à la décision et de sensibilisation civique. Les évaluations fournies constituent des indications de vigilance contextuelles et ne valent en aucun cas preuve juridique de fraude ni garantie d'innocuité.
          </p>

          <h2 className="text-xl font-bold pt-4" style={{ color: 'var(--text-main)' }}>
            2. Responsabilité de l'utilisateur
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            L'utilisateur demeure seul responsable des transactions, paiements et transferts qu'il choisit d'exécuter. KmerShield ne réalise aucun virement et ne bloque aucune transaction sur les réseaux d'opérateurs.
          </p>

          <div className="flex items-center gap-3 p-4 rounded-xl mt-6 border"
               style={{ backgroundColor: 'var(--bg-surface-secondary)', borderColor: 'var(--border-color)' }}>
            <AlertCircle size={20} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>
              Aucune évaluation automatisée ne saurait remplacer la vigilance personnelle et les vérifications d'usage.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
