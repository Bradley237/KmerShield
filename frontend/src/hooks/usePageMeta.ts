import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface MetaConfig {
  title: string
  description: string
}

const META_MAP: Record<string, { fr: MetaConfig; en: MetaConfig }> = {
  '/': {
    fr: {
      title: 'KmerShield — Évaluation du risque de liens et transactions',
      description: "KmerShield aide les citoyens au Cameroun à évaluer le risque d'un lien, d'un message ou d'une transaction financière informelle (Orange Money, MTN Mobile Money).",
    },
    en: {
      title: 'KmerShield — Link & Transaction Risk Assessment',
      description: 'KmerShield helps citizens in Cameroon evaluate the risk of links, messages, or informal financial transactions.',
    },
  },
  '/connexion': {
    fr: {
      title: 'Connexion — KmerShield',
      description: 'Connectez-vous à KmerShield pour évaluer la sécurité de vos liens et transactions financières.',
    },
    en: {
      title: 'Sign in — KmerShield',
      description: 'Sign in to KmerShield to evaluate link and transaction safety.',
    },
  },
  '/inscription': {
    fr: {
      title: 'Créer un compte — KmerShield',
      description: 'Rejoignez KmerShield pour analyser vos transactions et bénéficier de conseils civiques.',
    },
    en: {
      title: 'Create account — KmerShield',
      description: 'Join KmerShield to assess transactions and receive civic security advice.',
    },
  },
  '/mot-de-passe-oublie': {
    fr: {
      title: 'Mot de passe oublié — KmerShield',
      description: 'Réinitialisez votre mot de passe pour sécuriser votre compte KmerShield.',
    },
    en: {
      title: 'Forgot password — KmerShield',
      description: 'Reset your password to secure your KmerShield account.',
    },
  },
  '/reinitialisation': {
    fr: {
      title: 'Nouveau mot de passe — KmerShield',
      description: 'Définissez un mot de passe robuste pour votre compte KmerShield.',
    },
    en: {
      title: 'New password — KmerShield',
      description: 'Set a strong password for your KmerShield account.',
    },
  },
  '/confidentialite': {
    fr: {
      title: 'Politique de confidentialité — KmerShield',
      description: 'Principes de protection des données et de confidentialité de KmerShield.',
    },
    en: {
      title: 'Privacy policy — KmerShield',
      description: 'Data protection and privacy principles of KmerShield.',
    },
  },
  '/conditions': {
    fr: {
      title: "Conditions d'utilisation — KmerShield",
      description: "Conditions générales d'utilisation du service civique KmerShield.",
    },
    en: {
      title: 'Terms of service — KmerShield',
      description: 'Terms and conditions for using the KmerShield civic service.',
    },
  },
  '/contact': {
    fr: {
      title: 'Contact & Assistance — KmerShield',
      description: "Contactez l'équipe KmerShield pour toute question ou signalement civique.",
    },
    en: {
      title: 'Contact & support — KmerShield',
      description: 'Contact the KmerShield team for inquiries or civic reporting.',
    },
  },
  '/_design': {
    fr: {
      title: 'Design System — KmerShield',
      description: 'Spécifications et composants visuels de la plateforme KmerShield.',
    },
    en: {
      title: 'Design system — KmerShield',
      description: 'Visual system specifications and components of KmerShield.',
    },
  },
}

export function usePageMeta() {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language?.startsWith('en') ? 'en' : 'fr'
    document.documentElement.lang = lang

    const config = META_MAP[location.pathname]?.[lang] || {
      title: lang === 'en' ? 'Page not found — KmerShield' : 'Page introuvable — KmerShield',
      description:
        lang === 'en'
          ? 'The requested page does not exist.'
          : "La page demandée n'existe pas ou a été déplacée.",
    }

    document.title = config.title

    let descMeta = document.querySelector('meta[name="description"]')
    if (!descMeta) {
      descMeta = document.createElement('meta')
      descMeta.setAttribute('name', 'description')
      document.head.appendChild(descMeta)
    }
    descMeta.setAttribute('content', config.description)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', config.title)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', config.description)

    const twTitle = document.querySelector('meta[name="twitter:title"]')
    if (twTitle) twTitle.setAttribute('content', config.title)

    const twDesc = document.querySelector('meta[name="twitter:description"]')
    if (twDesc) twDesc.setAttribute('content', config.description)
  }, [location.pathname, i18n.language])
}
