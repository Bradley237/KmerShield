import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ShieldCheck, Eye, Lock } from 'lucide-react'
import { Logo } from '../components/layout/Logo'
import { LanguageSwitch } from '../components/layout/LanguageSwitch'
import { ThemeToggle } from '../components/layout/ThemeToggle'

export const AuthLayout: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2" style={{ backgroundColor: 'var(--bg-app)' }}>
      {/* Left Form Container */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 min-h-screen">
        {/* Top Controls */}
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>

        {/* Form Body (Centered) */}
        <div className="w-full max-w-md mx-auto my-8">
          <Outlet />
        </div>

        {/* Bottom Back Link */}
        <div className="text-center sm:text-left">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--text-main)] min-h-[44px]"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            {t('common.backHome')}
          </Link>
        </div>
      </div>

      {/* Right Side Panel (Always Dark Scope via [data-surface="dark"], hidden under 768px) */}
      <div
        data-surface="dark"
        className="hidden md:flex flex-col justify-between p-12 lg:p-16 border-l"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-main)',
        }}
      >
        <div className="flex justify-end">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase"
            style={{
              backgroundColor: 'var(--primary-soft)',
              color: 'var(--primary)',
            }}
          >
            CIVIC SECURITY
          </span>
        </div>

        <div className="max-w-md space-y-8 my-auto">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
              {t('auth.sidePanel.title')}
            </h2>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>
              {t('brand.tagline')}
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
              >
                <Eye size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                  {t('auth.sidePanel.point1')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
              >
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                  {t('auth.sidePanel.point2')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}
              >
                <Lock size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                  {t('auth.sidePanel.point3')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          KmerShield © 2026 — Plateforme d'autoévaluation citoyenne.
        </div>
      </div>
    </div>
  )
}
