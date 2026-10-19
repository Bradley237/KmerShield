import React from 'react'
import { useTranslation } from 'react-i18next'

export const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language.startsWith('en') ? 'en' : 'fr'

  const changeLanguage = (lang: 'fr' | 'en') => {
    i18n.changeLanguage(lang)
  }

  return (
    <div
      role="group"
      aria-label="Sélection de langue / Language selector"
      className="inline-flex items-center bg-[var(--bg-surface-secondary)] p-0.5 rounded-full border border-[var(--border-color)]"
    >
      <button
        type="button"
        onClick={() => changeLanguage('fr')}
        aria-pressed={currentLang === 'fr'}
        className={`px-2.5 py-1 text-xs transition-all cursor-pointer rounded-full ${
          currentLang === 'fr'
            ? 'font-semibold text-[var(--text-main)] bg-[var(--bg-surface)] shadow-xs'
            : 'font-medium text-[var(--text-muted)] hover:text-[var(--text-main)]'
        }`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        aria-pressed={currentLang === 'en'}
        className={`px-2.5 py-1 text-xs transition-all cursor-pointer rounded-full ${
          currentLang === 'en'
            ? 'font-semibold text-[var(--text-main)] bg-[var(--bg-surface)] shadow-xs'
            : 'font-medium text-[var(--text-muted)] hover:text-[var(--text-main)]'
        }`}
      >
        EN
      </button>
    </div>
  )
}
