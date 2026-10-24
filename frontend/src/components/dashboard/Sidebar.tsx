import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ShieldPlus,
  Activity,
  History,
  Bell,
  User as UserIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onCloseMobile: () => void
  unreadAlertsCount?: number
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  unreadAlertsCount = 2,
}) => {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/connexion')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const navItems = [
    {
      to: '/dashboard',
      end: true,
      label: t('dashboard.nav.overview', "Vue d'ensemble"),
      icon: LayoutDashboard,
    },
    {
      to: '/dashboard/analyses/nouveau',
      label: t('dashboard.nav.newAnalysis', 'Nouvelle analyse'),
      icon: ShieldPlus,
      highlight: true,
    },
    {
      to: '/dashboard/analyses',
      end: true,
      label: t('dashboard.nav.analyses', 'Analyses & Suivi'),
      icon: Activity,
    },
    {
      to: '/dashboard/historique',
      label: t('dashboard.nav.history', 'Historique'),
      icon: History,
    },
    {
      to: '/dashboard/alertes',
      label: t('dashboard.nav.alerts', 'Alertes & Sécurité'),
      icon: Bell,
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined,
    },
    {
      to: '/dashboard/profil',
      label: t('dashboard.nav.profile', 'Mon Profil'),
      icon: UserIcon,
    },
    {
      to: '/dashboard/parametres',
      label: t('dashboard.nav.settings', 'Paramètres'),
      icon: Settings,
    },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--bg-surface)] border-r border-[var(--border-color)] transition-all duration-300">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)]">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg p-1"
          title="KmerShield Dashboard"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-xs"
            style={{
              backgroundColor: 'var(--primary-soft)',
              border: '1px solid var(--border-color)',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--primary)' }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base tracking-tight text-[var(--text-main)] truncate">
                KmerShield
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--primary)] truncate">
                Espace Vérification
              </span>
            </div>
          )}
        </NavLink>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="md:hidden p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          aria-label={t('common.close', 'Fermer')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          aria-label={isCollapsed ? t('dashboard.nav.expand', 'Développer le menu') : t('dashboard.nav.collapse', 'Réduire le menu')}
          title={isCollapsed ? t('dashboard.nav.expand', 'Développer le menu') : t('dashboard.nav.collapse', 'Réduire le menu')}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav
        aria-label={t('dashboard.nav.mainMenu', 'Menu principal')}
        className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto scrollbar-none"
      >
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => {
                if (isMobileOpen) onCloseMobile()
              }}
              title={isCollapsed && !isMobileOpen ? item.label : undefined}
              className={({ isActive }) => {
                const baseClasses =
                  'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]'
                if (isActive) {
                  return `${baseClasses} bg-[var(--primary-soft)] text-[var(--primary)] font-semibold shadow-xs`
                }
                if (item.highlight) {
                  return `${baseClasses} text-[var(--primary)] hover:bg-[var(--bg-surface-secondary)] font-medium`
                }
                return `${baseClasses} text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)]`
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive
                        ? 'text-[var(--primary)]'
                        : item.highlight
                        ? 'text-[var(--primary)]'
                        : 'text-[var(--text-subtle)] group-hover:text-[var(--text-main)]'
                    }`}
                    strokeWidth={isActive ? 2 : 1.75}
                  />

                  {(!isCollapsed || isMobileOpen) && (
                    <span className="truncate flex-1">{item.label}</span>
                  )}

                  {item.badge && (!isCollapsed || isMobileOpen) && (
                    <span
                      className="px-2 py-0.5 text-xs font-bold rounded-full bg-[var(--risk-warning)] text-white shadow-xs shrink-0"
                      aria-label={`${item.badge} notifications non lues`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.badge && isCollapsed && !isMobileOpen && (
                    <span
                      className="w-2 h-2 rounded-full bg-[var(--risk-warning)] absolute top-2 right-2 ring-2 ring-[var(--bg-surface)]"
                      aria-label="Nouvelles notifications"
                    />
                  )}
                </>
              )}
            </NavLink>
          )
        })}

        {/* Public website external link */}
        <div className="pt-2 border-t border-[var(--border-subtle)]">
          <NavLink
            to="/"
            className="group flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            title={isCollapsed && !isMobileOpen ? t('dashboard.nav.backToHome', 'Retour au site public') : undefined}
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-[var(--text-subtle)] group-hover:text-[var(--text-main)]" />
            {(!isCollapsed || isMobileOpen) && (
              <span className="truncate">{t('dashboard.nav.backToHome', 'Retour au site public')}</span>
            )}
          </NavLink>
        </div>
      </nav>

      {/* User Session Footer */}
      <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div
          className={`flex items-center gap-3 p-2 rounded-lg ${
            isCollapsed && !isMobileOpen ? 'justify-center' : 'justify-between'
          }`}
        >
          {(!isCollapsed || isMobileOpen) ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-[var(--primary)] shrink-0 shadow-xs"
                style={{
                  backgroundColor: 'var(--primary-soft)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[var(--text-main)] truncate">
                  {user?.name || 'Utilisateur'}
                </span>
                <span className="text-[11px] text-[var(--text-subtle)] truncate">
                  {user?.email || 'compte@kmershield.cm'}
                </span>
              </div>
            </div>
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-[var(--primary)] shadow-xs"
              style={{
                backgroundColor: 'var(--primary-soft)',
                border: '1px solid var(--border-color)',
              }}
              title={user?.name || 'Utilisateur'}
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
            </div>
          )}

          {(!isCollapsed || isMobileOpen) && (
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[var(--text-subtle)] hover:text-[var(--feedback-error)] hover:bg-[var(--feedback-error-soft)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--feedback-error)]"
              title={t('dashboard.nav.logout', 'Déconnexion')}
              aria-label={t('dashboard.nav.logout', 'Déconnexion')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-300 z-30 sticky top-0 h-screen ${
          isCollapsed ? 'w-18' : 'w-64'
        }`}
        aria-label="Navigation principale"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation mobile"
          className="fixed inset-0 z-50 md:hidden flex"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Slide-out drawer */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
