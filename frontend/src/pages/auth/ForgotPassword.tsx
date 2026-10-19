import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import { authService } from '../../services/authService'

export const ForgotPassword: React.FC = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await authService.requestPasswordReset({ email })
    } finally {
      setLoading(false)
      // Always show neutral confirmation state regardless of account existence
      setSubmitted(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          {t('auth.forgotPassword.title')}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('auth.forgotPassword.subtitle')}
        </p>
      </div>

      {submitted ? (
        <div
          role="status"
          className="p-6 rounded-2xl border space-y-3"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex items-center gap-3" style={{ color: 'var(--primary)' }}>
            <CheckCircle2 size={24} strokeWidth={1.5} />
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-main)' }}>
              {t('auth.forgotPassword.confirmationTitle')}
            </h2>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('auth.forgotPassword.confirmationMessage')}
          </p>
          <div className="pt-3">
            <Link
              to="/connexion"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
              style={{ color: 'var(--primary)' }}
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              {t('auth.forgotPassword.backToLogin')}
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
              {t('auth.forgotPassword.emailLabel')}
            </label>
            <input
              id="reset-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.forgotPassword.emailPlaceholder')}
              className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-95 shadow-sm disabled:opacity-50 cursor-pointer min-h-[44px] flex items-center justify-center gap-2 mt-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-solid)] focus-visible:ring-offset-2"
            style={{
              backgroundColor: 'var(--primary-solid)',
              color: 'var(--on-primary-solid)',
            }}
          >
            {loading ? t('auth.forgotPassword.submitting') : t('auth.forgotPassword.submitButton')}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/connexion"
              className="text-sm font-medium hover:underline inline-flex items-center gap-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              {t('auth.forgotPassword.backToLogin')}
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
