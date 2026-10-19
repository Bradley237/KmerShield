import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from '../locales/fr.json'
import en from '../locales/en.json'

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('kmershield_lang') : null

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: savedLanguage || undefined,
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'kmershield_lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

// Sync <html lang="..."> attribute on change
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'fr'
  i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng.startsWith('en') ? 'en' : 'fr'
    try {
      localStorage.setItem('kmershield_lang', lng)
    } catch {
      // ignore storage errors
    }
  })
}

export default i18n
