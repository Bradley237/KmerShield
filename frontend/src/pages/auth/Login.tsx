import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import { POST_LOGIN_REDIRECT } from '../../services/authService'

export const Login: React.FC = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await login({ email, password })
      const redirectTarget = searchParams.get('redirect') || POST_LOGIN_REDIRECT
      navigate(redirectTarget)
    } catch (err: any) {
      if (err.code === 'INVALID_CREDENTIALS') {
        setError(t('auth.login.invalidCredentials'))
      } else if (err.code === 'TOO_MANY_REQUESTS') {
        setError(t('auth.login.tooManyRequests'))
      } else {
        setError(err.message || t('common.error'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          {t('auth.login.title')}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('auth.login.subtitle')}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-3.5 rounded-xl border text-sm flex items-start gap-3"
          style={{
            backgroundColor: 'var(--feedback-error-soft)',
            borderColor: 'var(--feedback-error)',
            color: 'var(--feedback-error)',
          }}
        >
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
            {t('auth.login.emailLabel')}
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            autoCorrect="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.login.emailPlaceholder')}
            className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-sm font-medium" style={{ color: 'var(--text-main)' }}>
              {t('auth.login.passwordLabel')}
            </label>
            <Link
              to="/mot-de-passe-oublie"
              className="text-xs font-medium hover:underline"
              style={{ color: 'var(--primary)' }}
            >
              {t('auth.login.forgotPassword')}
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            spellCheck={false}
            autoCorrect="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.login.passwordPlaceholder')}
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
          {loading ? t('auth.login.submitting') : t('auth.login.submitButton')}
        </button>
      </form>

      <div className="text-center text-sm pt-2" style={{ color: 'var(--text-muted)' }}>
        {t('auth.login.noAccount')}{' '}
        <Link to="/inscription" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
          {t('auth.login.signUpLink')}
        </Link>
      </div>
    </div>
  )
}
