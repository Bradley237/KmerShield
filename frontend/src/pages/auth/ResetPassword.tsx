import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import { authService } from '../../services/authService'

export const ResetPassword: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [expired, setExpired] = useState(!token)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      setExpired(true)
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await authService.resetPassword({ token, password, confirmPassword })
      setSuccess(true)
    } catch (err: any) {
      if (err.message?.includes('expired') || err.message?.includes('invalid')) {
        setExpired(true)
      } else {
        setError(err.message || t('common.error'))
      }
    } finally {
      setLoading(false)
    }
  }

  if (expired) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
               style={{ backgroundColor: 'var(--feedback-error-soft)', color: 'var(--feedback-error)' }}>
            <AlertTriangle size={24} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
            {t('auth.resetPassword.expiredTitle')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('auth.resetPassword.expiredMessage')}
          </p>
        </div>

        <Link
          to="/mot-de-passe-oublie"
          className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-95 shadow-sm min-h-[44px] flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-solid)] focus-visible:ring-offset-2"
          style={{ backgroundColor: 'var(--primary-solid)', color: 'var(--on-primary-solid)' }}
        >
          {t('auth.resetPassword.requestNewLink')}
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
               style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}>
            <CheckCircle2 size={24} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
            {t('auth.resetPassword.successTitle')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('auth.resetPassword.successMessage')}
          </p>
        </div>

        <Link
          to="/connexion"
          className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-95 shadow-sm min-h-[44px] flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-solid)] focus-visible:ring-offset-2"
          style={{ backgroundColor: 'var(--primary-solid)', color: 'var(--on-primary-solid)' }}
        >
          {t('auth.login.submitButton')}
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          {t('auth.resetPassword.title')}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('auth.resetPassword.subtitle')}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="p-3.5 rounded-xl border text-sm"
          style={{
            backgroundColor: 'var(--feedback-error-soft)',
            borderColor: 'var(--feedback-error)',
            color: 'var(--feedback-error)',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
            {t('auth.resetPassword.passwordLabel')}
          </label>
          <input
            id="new-password"
            type="password"
            required
            autoComplete="new-password"
            spellCheck={false}
            autoCorrect="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.resetPassword.passwordPlaceholder')}
            className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
            {t('auth.resetPassword.confirmPasswordLabel')}
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            autoComplete="new-password"
            spellCheck={false}
            autoCorrect="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
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
          {loading ? t('auth.resetPassword.submitting') : t('auth.resetPassword.submitButton')}
        </button>
      </form>
    </div>
  )
}
