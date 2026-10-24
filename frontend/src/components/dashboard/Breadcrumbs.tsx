import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Breadcrumbs: React.FC<{ className?: string }> = ({ className = '' }) => {
  const location = useLocation()
  const { t } = useTranslation()

  const segments = location.pathname.split('/').filter(Boolean)

  // Map segments to translation keys
  const getSegmentLabel = (segment: string): string => {
    switch (segment) {
      case 'dashboard':
        return t('dashboard.breadcrumbs.dashboard', 'Tableau de bord')
      case 'analyses':
        return t('dashboard.breadcrumbs.analyses', 'Analyses')
      case 'nouveau':
        return t('dashboard.breadcrumbs.new', 'Nouvelle analyse')
      case 'historique':
        return t('dashboard.breadcrumbs.history', 'Historique')
      case 'alertes':
        return t('dashboard.breadcrumbs.alerts', 'Alertes')
      case 'profil':
        return t('dashboard.breadcrumbs.profile', 'Profil')
      case 'parametres':
        return t('dashboard.breadcrumbs.settings', 'Paramètres')
      default:
        // If it looks like an ID or parameter
        if (segment.length > 12) {
          return t('dashboard.breadcrumbs.detail', 'Détail')
        }
        return segment.charAt(0).toUpperCase() + segment.slice(1)
    }
  }

  // Build breadcrumb items
  const breadcrumbItems = segments.map((seg, idx) => {
    const path = `/${segments.slice(0, idx + 1).join('/')}`
    const isLast = idx === segments.length - 1
    const label = getSegmentLabel(seg)

    return {
      path,
      label,
      isLast,
    }
  })

  // If we are right at /dashboard, show "Tableau de bord > Vue d'ensemble"
  const isRootDashboard = location.pathname === '/dashboard' || location.pathname === '/dashboard/'

  return (
    <nav
      aria-label="Fil d'Ariane / Breadcrumbs"
      className={`flex items-center text-xs text-[var(--text-muted)] font-medium overflow-x-auto py-1 scrollbar-none ${className}`}
    >
      <ol className="flex items-center space-x-1.5 whitespace-nowrap">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            title={t('dashboard.breadcrumbs.dashboard', 'Tableau de bord')}
            aria-label={t('dashboard.breadcrumbs.dashboard', 'Tableau de bord')}
          >
            <Home className="w-3.5 h-3.5" strokeWidth={1.75} />
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => {
          // If on root /dashboard, item[0] is dashboard, we replace display with "Vue d'ensemble"
          const isDashboardRoot = index === 0 && item.label === t('dashboard.breadcrumbs.dashboard', 'Tableau de bord')
          const displayLabel = isDashboardRoot && isRootDashboard ? t('dashboard.breadcrumbs.overview', "Vue d'ensemble") : item.label

          return (
            <React.Fragment key={item.path}>
              <li aria-hidden="true" className="text-[var(--border-color)] select-none">
                <ChevronRight className="w-3 h-3 text-[var(--text-subtle)]" strokeWidth={1.5} />
              </li>
              <li>
                {item.isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-[var(--text-main)] px-1 py-0.5 rounded-sm"
                  >
                    {displayLabel}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-[var(--text-main)] transition-colors px-1 py-0.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  >
                    {displayLabel}
                  </Link>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
