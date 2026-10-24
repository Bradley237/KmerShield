import React, { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { Sidebar } from '../components/dashboard/Sidebar'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'

export const PrivateLayout: React.FC = () => {
  const { t } = useTranslation()
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('kmershield_sidebar_collapsed') === 'true'
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('kmershield_sidebar_collapsed', String(next))
      return next
    })
  }

  // 1. Loading Authentication State
  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="min-h-screen bg-[var(--bg-app)] flex flex-col items-center justify-center p-4 transition-colors"
      >
        <div className="flex flex-col items-center space-y-4 max-w-sm text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse shadow-soft-md"
            style={{
              backgroundColor: 'var(--primary-soft)',
              border: '1px solid var(--border-color)',
            }}
          >
            <Shield className="w-7 h-7 text-[var(--primary)]" strokeWidth={2} />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-[var(--text-main)]">
              {t('dashboard.authGuard.verifying', 'Vérification de la session en cours...')}
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              {t('dashboard.authGuard.pleaseWait', 'Connexion sécurisée à votre espace membre...')}
            </p>
          </div>

          {/* Accessible Spinner */}
          <div className="w-6 h-6 border-2 border-[var(--primary-soft)] border-t-[var(--primary)] rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  // 2. Redirect to Login if unauthenticated
  if (!isAuthenticated) {
    const targetUrl = location.pathname + location.search
    return (
      <Navigate
        to={`/connexion?redirect=${encodeURIComponent(targetUrl)}`}
        replace
      />
    )
  }

  // 3. Render Private Shell
  return (
    <div className="min-h-screen bg-[var(--bg-app)] flex text-[var(--text-main)] transition-colors">
      {/* Sidebar (Desktop + Mobile Drawer) */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        unreadAlertsCount={2}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <DashboardHeader
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          unreadAlertsCount={2}
        />

        {/* Scrollable Page Body */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto focus:outline-none"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
