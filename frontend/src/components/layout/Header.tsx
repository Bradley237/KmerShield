import React, { useState, useEffect } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)

      if (isHomePage) {
        const sections = ['fonctionnement', 'limites', 'faq']
        const scrollPosition = window.scrollY + 80

        let current = ''
        for (const id of sections) {
          const el = document.getElementById(id)
          if (el) {
            const top = el.offsetTop
            const height = el.offsetHeight
            if (scrollPosition >= top && scrollPosition < top + height) {
              current = id
              break
            }
          }
        }
        setActiveSection(current)
      } else {
        setActiveSection('')
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

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
      className={`sticky top-0 z-50 w-full transition-all duration-200 animate-header-fade ${
        !isHomePage || isScrolled
          ? 'bg-[var(--bg-surface)]/85 backdrop-blur-md border-b border-[var(--border-color)] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#fonctionnement"
            onClick={(e) => handleAnchorClick(e, '#fonctionnement')}
            className={`nav-hover-link text-sm font-medium transition-colors ${
              activeSection === 'fonctionnement'
                ? 'text-[var(--primary)] font-semibold active'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            {t('nav.howItWorks')}
          </a>
          <a
            href="#limites"
            onClick={(e) => handleAnchorClick(e, '#limites')}
            className={`nav-hover-link text-sm font-medium transition-colors ${
              activeSection === 'limites'
                ? 'text-[var(--primary)] font-semibold active'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            {t('nav.limits')}
          </a>
          <a
            href="#faq"
            onClick={(e) => handleAnchorClick(e, '#faq')}
            className={`nav-hover-link text-sm font-medium transition-colors ${
              activeSection === 'faq'
                ? 'text-[var(--primary)] font-semibold active'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            {t('nav.faq')}
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitch />
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm font-medium flex items-center gap-1.5 text-[var(--text-main)]">
                <UserIcon size={16} strokeWidth={1.5} />
                {user?.name}
              </span>
              <button
                type="button"
                onClick={() => logout()}
                className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
              >
                {t('nav.signOut')}
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/connexion"
                className="text-sm font-medium text-[var(--text-main)] hover:text-[var(--primary)] transition-colors px-2 py-1.5"
              >
                {t('nav.signIn')}
              </Link>
              <Link
                to="/inscription"
                className="btn-motion inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] rounded-lg transition-colors cursor-pointer select-none"
              >
                {t('nav.signUp')}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-4 space-y-4 shadow-lg animate-fade1">
          <nav className="flex flex-col space-y-2">
            <a
              href="#fonctionnement"
              onClick={(e) => handleAnchorClick(e, '#fonctionnement')}
              className={`text-base font-medium py-2 transition-colors ${
                activeSection === 'fonctionnement'
                  ? 'text-[var(--primary)] font-semibold'
                  : 'text-[var(--text-main)] hover:text-[var(--primary)]'
              }`}
            >
              {t('nav.howItWorks')}
            </a>
            <a
              href="#limites"
              onClick={(e) => handleAnchorClick(e, '#limites')}
              className={`text-base font-medium py-2 transition-colors ${
                activeSection === 'limites'
                  ? 'text-[var(--primary)] font-semibold'
                  : 'text-[var(--text-main)] hover:text-[var(--primary)]'
              }`}
            >
              {t('nav.limits')}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleAnchorClick(e, '#faq')}
              className={`text-base font-medium py-2 transition-colors ${
                activeSection === 'faq'
                  ? 'text-[var(--primary)] font-semibold'
                  : 'text-[var(--text-main)] hover:text-[var(--primary)]'
              }`}
            >
              {t('nav.faq')}
            </a>
          </nav>

          <div className="pt-3 border-t border-[var(--border-color)] flex flex-col gap-2.5">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="w-full text-center py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {t('nav.signOut')}
              </button>
            ) : (
              <>
                <Link
                  to="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-medium rounded-lg border border-[var(--border-color)] text-[var(--text-main)]"
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/inscription"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors"
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
