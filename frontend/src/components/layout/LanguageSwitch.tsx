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
      className="inline-flex items-center rounded-lg p-0.5 text-xs font-semibold"
      style={{
        backgroundColor: 'var(--bg-surface-secondary)',
        border: '1px solid var(--border-color)',
      }}
    >
      <button
        type="button"
        onClick={() => changeLanguage('fr')}
        aria-pressed={currentLang === 'fr'}
        className="px-2 py-1 rounded-md transition-all cursor-pointer min-w-[28px] text-center"
        style={{
          backgroundColor: currentLang === 'fr' ? 'var(--bg-surface)' : 'transparent',
          color: currentLang === 'fr' ? 'var(--text-main)' : 'var(--text-muted)',
          boxShadow: currentLang === 'fr' ? 'var(--shadow-soft-sm)' : 'none',
        }}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        aria-pressed={currentLang === 'en'}
        className="px-2 py-1 rounded-md transition-all cursor-pointer min-w-[28px] text-center"
        style={{
          backgroundColor: currentLang === 'en' ? 'var(--bg-surface)' : 'transparent',
          color: currentLang === 'en' ? 'var(--text-main)' : 'var(--text-muted)',
          boxShadow: currentLang === 'en' ? 'var(--shadow-soft-sm)' : 'none',
        }}
      >
        EN
      </button>
    </div>
  )
}
