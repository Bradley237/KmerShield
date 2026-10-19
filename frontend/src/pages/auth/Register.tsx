import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { POST_LOGIN_REDIRECT } from '../../services/authService'

export const Register: React.FC = () => {
  const { t } = useTranslation()
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Live password requirements
  const hasLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const isPasswordValid = hasLength && hasNumber && hasSpecial

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) return
    if (!isPasswordValid) return

    setLoading(true)
    setError(null)

    try {
      await register({ name, email, password, consent })
      navigate(POST_LOGIN_REDIRECT)
    } catch (err: any) {
      setError(err.message || t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          {t('auth.register.title')}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('auth.register.subtitle')}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
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
          <label htmlFor="register-name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
            {t('auth.register.nameLabel')}
          </label>
          <input
            id="register-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('auth.register.namePlaceholder')}
            className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        <div>
          <label htmlFor="register-email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
            {t('auth.register.emailLabel')}
          </label>
          <input
            id="register-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.register.emailPlaceholder')}
            className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        <div>
          <label htmlFor="register-password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
            {t('auth.register.passwordLabel')}
          </label>
          <input
            id="register-password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.register.passwordPlaceholder')}
            className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
          />

          {/* Live Requirement Rows Turning Primary When Met */}
          <div className="mt-3 space-y-1.5 text-xs">
            <div
              className="flex items-center gap-2 transition-colors font-medium"
              style={{ color: hasLength ? 'var(--primary)' : 'var(--text-muted)' }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] border transition-colors"
                style={{
                  borderColor: hasLength ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: hasLength ? 'var(--primary)' : 'transparent',
                  color: hasLength ? 'var(--on-primary)' : 'transparent',
                }}
              >
                <Check size={10} strokeWidth={2.5} />
              </div>
              <span>{t('auth.register.reqLength')}</span>
            </div>

            <div
              className="flex items-center gap-2 transition-colors font-medium"
              style={{ color: hasNumber ? 'var(--primary)' : 'var(--text-muted)' }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] border transition-colors"
                style={{
                  borderColor: hasNumber ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: hasNumber ? 'var(--primary)' : 'transparent',
                  color: hasNumber ? 'var(--on-primary)' : 'transparent',
                }}
              >
                <Check size={10} strokeWidth={2.5} />
              </div>
              <span>{t('auth.register.reqNumber')}</span>
            </div>

            <div
              className="flex items-center gap-2 transition-colors font-medium"
              style={{ color: hasSpecial ? 'var(--primary)' : 'var(--text-muted)' }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] border transition-colors"
                style={{
                  borderColor: hasSpecial ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: hasSpecial ? 'var(--primary)' : 'transparent',
                  color: hasSpecial ? 'var(--on-primary)' : 'transparent',
                }}
              >
                <Check size={10} strokeWidth={2.5} />
              </div>
              <span>{t('auth.register.reqSpecial')}</span>
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border transition-colors cursor-pointer accent-[var(--primary)]"
              style={{ borderColor: 'var(--border-color)' }}
            />
            <span className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('auth.register.consentLabel')}
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !consent || !isPasswordValid}
          className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-95 shadow-sm disabled:opacity-50 cursor-pointer min-h-[44px] flex items-center justify-center gap-2 mt-4"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--on-primary)',
          }}
        >
          {loading ? t('auth.register.submitting') : t('auth.register.submitButton')}
        </button>
      </form>

      <div className="text-center text-sm pt-2" style={{ color: 'var(--text-muted)' }}>
        {t('auth.register.hasAccount')}{' '}
        <Link to="/connexion" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
          {t('auth.register.signInLink')}
        </Link>
      </div>
    </div>
  )
}
