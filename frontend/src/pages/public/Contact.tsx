import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, CheckCircle2 } from 'lucide-react'

export const Contact: React.FC = () => {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-6">
        <h1 className="title-2" style={{ color: 'var(--text-main)' }}>
          {t('footer.contact')}
        </h1>
        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          Une question sur KmerShield ou une suggestion pour améliorer nos repères civiques ? Contactez l'équipe.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl border flex items-center gap-4"
               style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <CheckCircle2 size={24} style={{ color: 'var(--primary)' }} />
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-main)' }}>Message envoyé</p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Merci pour votre contribution civique. Nous reviendrons vers vous sous peu.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl border space-y-5"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
                {t('auth.login.emailLabel')}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                spellCheck={false}
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2"
                style={{
                  backgroundColor: 'var(--bg-app)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message ou retour d'expérience..."
                className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:ring-2"
                style={{
                  backgroundColor: 'var(--bg-app)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-95 shadow-sm cursor-pointer min-h-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-solid)] focus-visible:ring-offset-2"
              style={{ backgroundColor: 'var(--primary-solid)', color: 'var(--on-primary-solid)' }}
            >
              <Send size={16} strokeWidth={1.5} />
              Envoyer le message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
