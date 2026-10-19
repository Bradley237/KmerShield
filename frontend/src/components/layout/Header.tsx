import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, User as UserIcon } from 'lucide-react'
import { Logo } from './Logo'
import { LanguageSwitch } from './LanguageSwitch'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '../../hooks/useAuth'

export const Header: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isHomePage = location.pathname === '/'

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHomePage) {
      e.preventDefault()
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
      }
    }
  }

  return (
    <header
      className="sticky top-0 z-40 w-full transition-colors border-b backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(var(--bg-surface), 0.85)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            <a
              href="#fonctionnement"
              onClick={(e) => handleAnchorClick(e, '#fonctionnement')}
              className="hover:text-[var(--text-main)] transition-colors py-2"
            >
              {t('nav.howItWorks')}
            </a>
            <a
              href="#limites"
              onClick={(e) => handleAnchorClick(e, '#limites')}
              className="hover:text-[var(--text-main)] transition-colors py-2"
            >
              {t('nav.limits')}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleAnchorClick(e, '#faq')}
              className="hover:text-[var(--text-main)] transition-colors py-2"
            >
              {t('nav.faq')}
            </a>
          </nav>
        </div>

        {/* Right Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitch />
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
                <UserIcon size={16} strokeWidth={1.5} />
                {user?.name}
              </span>
              <button
                type="button"
                onClick={() => logout()}
                className="text-sm font-medium hover:underline cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
              >
                {t('nav.signOut')}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/connexion"
                className="text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-[var(--bg-surface-secondary)] min-h-[44px] inline-flex items-center"
                style={{ color: 'var(--text-main)' }}
              >
                {t('nav.signIn')}
              </Link>
              <Link
                to="/inscription"
                className="text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:opacity-95 active:scale-[0.98] min-h-[44px] inline-flex items-center"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                  boxShadow: 'var(--shadow-soft-sm)',
                }}
              >
                {t('nav.signUp')}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitch />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ color: 'var(--text-main)' }}
            aria-expanded={mobileMenuOpen}
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b px-4 pt-3 pb-6 space-y-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
        >
          <nav className="flex flex-col space-y-2 text-base font-medium" style={{ color: 'var(--text-muted)' }}>
            <a
              href="#fonctionnement"
              onClick={(e) => handleAnchorClick(e, '#fonctionnement')}
              className="py-2.5 px-3 rounded-lg hover:bg-[var(--bg-surface-secondary)]"
            >
              {t('nav.howItWorks')}
            </a>
            <a
              href="#limites"
              onClick={(e) => handleAnchorClick(e, '#limites')}
              className="py-2.5 px-3 rounded-lg hover:bg-[var(--bg-surface-secondary)]"
            >
              {t('nav.limits')}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleAnchorClick(e, '#faq')}
              className="py-2.5 px-3 rounded-lg hover:bg-[var(--bg-surface-secondary)]"
            >
              {t('nav.faq')}
            </a>
          </nav>

          <div className="pt-4 border-t flex flex-col gap-3" style={{ borderColor: 'var(--border-color)' }}>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="w-full text-center py-2.5 font-medium rounded-lg"
                style={{ backgroundColor: 'var(--bg-surface-secondary)', color: 'var(--text-main)' }}
              >
                {t('nav.signOut')}
              </button>
            ) : (
              <>
                <Link
                  to="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-medium rounded-lg"
                  style={{ backgroundColor: 'var(--bg-surface-secondary)', color: 'var(--text-main)' }}
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/inscription"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-semibold rounded-lg"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--on-primary)',
                  }}
                >
                  {t('nav.signUp')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
