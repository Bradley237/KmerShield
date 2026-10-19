import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../../components/layout/ThemeToggle'
import { LanguageSwitch } from '../../components/layout/LanguageSwitch'
import { ArrowLeft } from 'lucide-react'

export const DesignSystemPage: React.FC = () => {
  return (
    <div className="min-h-screen p-6 sm:p-12 space-y-12" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-2" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={16} strokeWidth={1.5} />
            Retour à l'application
          </Link>
          <h1 className="text-3xl font-bold">KmerShield Design System (Dev Route /_design)</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Documentation visuelle de l'ensemble des tokens, composants, états et thèmes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>

      {/* 1. Tokens: Color Palette */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">1. Palette des Tokens CSS (styles/tokens.css)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <div className="w-full h-12 rounded-lg" style={{ backgroundColor: 'var(--primary)' }} />
            <p className="text-xs font-mono font-semibold">--primary</p>
          </div>
          <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <div className="w-full h-12 rounded-lg" style={{ backgroundColor: 'var(--primary-soft)' }} />
            <p className="text-xs font-mono font-semibold">--primary-soft</p>
          </div>
          <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <div className="w-full h-12 rounded-lg" style={{ backgroundColor: 'var(--risk-success)' }} />
            <p className="text-xs font-mono font-semibold">--risk-success</p>
          </div>
          <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <div className="w-full h-12 rounded-lg" style={{ backgroundColor: 'var(--risk-warning)' }} />
            <p className="text-xs font-mono font-semibold">--risk-warning</p>
          </div>
          <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <div className="w-full h-12 rounded-lg" style={{ backgroundColor: 'var(--risk-danger)' }} />
            <p className="text-xs font-mono font-semibold">--risk-danger</p>
          </div>
          <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
            <div className="w-full h-12 rounded-lg" style={{ backgroundColor: 'var(--feedback-error)' }} />
            <p className="text-xs font-mono font-semibold">--feedback-error</p>
          </div>
        </div>
      </section>

      {/* 2. Dark Surface Scope Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">2. Portée de surface sombre ([data-surface="dark"])</h2>
        <div data-surface="dark" className="p-8 rounded-2xl border space-y-3"
             style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}>
          <h3 className="text-lg font-bold">Cette section est toujours sombre, quel que soit le thème global</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Utilisé pour la section "Limites" et le panneau d'authentification.
          </p>
          <div className="flex gap-3 pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary)' }}>
              Primary Soft
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--risk-danger-soft)', color: 'var(--risk-danger)' }}>
              Risque Élevé
            </span>
          </div>
        </div>
      </section>

      {/* 3. Typography Scale */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">3. Typographie (Inter Variable)</h2>
        <div className="p-6 rounded-2xl border space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <div>
            <p className="text-xs font-mono text-[var(--text-muted)]">Title 1 (60-68px desktop / 36px mobile)</p>
            <h1 className="title-1">Avant de payer ou de cliquer, vérifiez.</h1>
          </div>
          <div>
            <p className="text-xs font-mono text-[var(--text-muted)]">Title 2 (40-44px desktop / 28px mobile)</p>
            <h2 className="title-2">Comment fonctionne l'analyse</h2>
          </div>
          <div>
            <p className="text-xs font-mono text-[var(--text-muted)]">Title 3 (20px / 600)</p>
            <h3 className="title-3">Examen heuristique et signaux d'alerte</h3>
          </div>
          <div>
            <p className="text-xs font-mono text-[var(--text-muted)]">Body (16px / 26px line height)</p>
            <p style={{ color: 'var(--text-muted)' }}>
              KmerShield est une initiative citoyenne d'aide à la décision face aux sollicitations numériques et transactions informelles.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
