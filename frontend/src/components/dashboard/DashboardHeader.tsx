import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Menu,
  Bell,
  ShieldPlus,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from './Breadcrumbs'
import { LanguageSwitch } from '../layout/LanguageSwitch'
import { ThemeToggle } from '../layout/ThemeToggle'
import { useAuth } from '../../hooks/useAuth'

interface DashboardHeaderProps {
  onOpenMobileMenu: () => void
  unreadAlertsCount?: number
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenMobileMenu,
  unreadAlertsCount = 2,
}) => {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsUserMenuOpen(false)
    try {
      await logout()
      navigate('/connexion')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <header className="sticky top-0 z-20 h-16 bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          aria-label={t('dashboard.nav.mainMenu', 'Menu principal')}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <Breadcrumbs />
        </div>
      </div>

      {/* Right: Actions, Notifications, i18n, Theme & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick Launch Button */}
        <Link
          to="/dashboard/analyses/nouveau"
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        >
          <ShieldPlus className="w-4 h-4" />
          <span>{t('dashboard.nav.quickNew', 'Lancer une analyse')}</span>
        </Link>

        {/* Notifications Bell */}
        <Link
          to="/dashboard/alertes"
          className="relative p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          title={t('dashboard.nav.notifications', 'Notifications')}
          aria-label={t('dashboard.nav.notifications', 'Notifications')}
        >
          <Bell className="w-4.5 h-4.5" strokeWidth={1.75} />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--risk-warning)] ring-2 ring-[var(--bg-surface)]" />
          )}
        </Link>

        {/* Language & Theme switches */}
        <div className="hidden lg:flex items-center gap-1.5 border-l border-r border-[var(--border-subtle)] px-2">
          <LanguageSwitch />
          <ThemeToggle />
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--bg-surface-secondary)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
            aria-label={t('dashboard.nav.userMenu', 'Menu utilisateur')}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-[var(--primary)] shadow-xs"
              style={{
                backgroundColor: 'var(--primary-soft)',
                border: '1px solid var(--border-color)',
              }}
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
            </div>
            <span className="hidden md:inline-block text-xs font-semibold text-[var(--text-main)] max-w-28 truncate">
              {user?.name || 'Utilisateur'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[var(--text-subtle)] transition-transform duration-200 ${
                isUserMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-lg py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
            >
              <div className="px-3.5 py-2 border-b border-[var(--border-subtle)]">
                <p className="text-xs font-semibold text-[var(--text-main)] truncate">
                  {user?.name || 'Utilisateur'}
                </p>
                <p className="text-[11px] text-[var(--text-subtle)] truncate">
                  {user?.email || 'compte@kmershield.cm'}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--primary-soft)] text-[var(--primary)]">
                  {t('dashboard.user.defaultRole', 'Particulier')}
                </span>
              </div>

              {/* Mobile controls inside dropdown */}
              <div className="lg:hidden px-3.5 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <LanguageSwitch />
                <ThemeToggle />
              </div>

              <div className="py-1">
                <Link
                  to="/dashboard/profil"
                  onClick={() => setIsUserMenuOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors"
                >
                  <User className="w-4 h-4 text-[var(--text-subtle)]" />
                  <span>{t('dashboard.nav.profile', 'Mon Profil')}</span>
                </Link>

                <Link
                  to="/dashboard/parametres"
                  onClick={() => setIsUserMenuOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors"
                >
                  <Settings className="w-4 h-4 text-[var(--text-subtle)]" />
                  <span>{t('dashboard.nav.settings', 'Paramètres')}</span>
                </Link>

                <Link
                  to="/"
                  onClick={() => setIsUserMenuOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[var(--text-subtle)]" />
                  <span>{t('dashboard.nav.backToHome', 'Retour au site public')}</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={handleLogout}
                  role="menuitem"
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[var(--feedback-error)] hover:bg-[var(--feedback-error-soft)] transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('dashboard.nav.logout', 'Déconnexion')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
