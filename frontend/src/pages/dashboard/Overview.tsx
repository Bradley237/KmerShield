import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ShieldPlus,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Link as LinkIcon,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import { analysisService } from '../../services/analysisService'
import { RiskBadge } from '../../components/risk/RiskBadge'
import { StatusBadge } from '../../components/dashboard/StatusBadge'
import type { DashboardStats, ScanJob, ScanType } from '../../types/analysis'

export const Overview: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentAnalyses, setRecentAnalyses] = useState<ScanJob[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Simulation mode in development to showcase all 4 required states
  const [simMode, setSimMode] = useState<'normal' | 'empty' | 'error'>(() => {
    if (sessionStorage.getItem('kmershield_mock_empty') === 'true') return 'empty'
    if (sessionStorage.getItem('kmershield_mock_error') === 'true') return 'error'
    return 'normal'
  })

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [statsData, recentData] = await Promise.all([
        analysisService.getDashboardStats(),
        analysisService.getRecentAnalyses(5),
      ])
      setStats(statsData)
      setRecentAnalyses(recentData)
    } catch (err: any) {
      setError(err.message || t('dashboard.overview.error.description'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => {
    let ignore = false

    Promise.all([
      analysisService.getDashboardStats(),
      analysisService.getRecentAnalyses(5),
    ])
      .then(([statsData, recentData]) => {
        if (!ignore) {
          setStats(statsData)
          setRecentAnalyses(recentData)
        }
      })
      .catch((err: any) => {
        if (!ignore) {
          setError(err.message || t('dashboard.overview.error.description'))
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [t])

  const handleSimModeChange = (mode: 'normal' | 'empty' | 'error') => {
    setSimMode(mode)
    if (mode === 'empty') {
      sessionStorage.setItem('kmershield_mock_empty', 'true')
      sessionStorage.removeItem('kmershield_mock_error')
    } else if (mode === 'error') {
      sessionStorage.setItem('kmershield_mock_error', 'true')
      sessionStorage.removeItem('kmershield_mock_empty')
    } else {
      sessionStorage.removeItem('kmershield_mock_empty')
      sessionStorage.removeItem('kmershield_mock_error')
    }
    loadDashboardData()
  }

  const getTypeIcon = (type: ScanType) => {
    switch (type) {
      case 'url':
        return <LinkIcon className="w-4 h-4 text-[var(--primary)]" />
      case 'message':
        return <MessageSquare className="w-4 h-4 text-[var(--risk-warning)]" />
      case 'transaction':
        return <ShoppingCart className="w-4 h-4 text-[var(--risk-danger)]" />
      case 'payment':
        return <CreditCard className="w-4 h-4 text-[var(--risk-success)]" />
    }
  }

  const getTypeLabel = (type: ScanType) => {
    return t(`dashboard.overview.typeLabel.${type}`, type)
  }

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString)
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d)
    } catch {
      return dateString
    }
  }

  // 1. STATE: LOADING
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Chargement du tableau de bord">
        {/* Banner Skeleton */}
        <div className="h-44 rounded-2xl bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)]" />

        {/* KPI Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-5 space-y-3"
            >
              <div className="w-24 h-3 rounded bg-[var(--bg-surface-secondary)]" />
              <div className="w-16 h-7 rounded bg-[var(--bg-surface-secondary)]" />
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="h-64 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-5" />
      </div>
    )
  }

  // 2. STATE: ERROR
  if (error) {
    return (
      <div className="space-y-6">
        <div
          role="alert"
          className="bg-[var(--bg-surface)] border border-[var(--feedback-error)] rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-soft-sm space-y-4"
        >
          <div
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
            style={{
              backgroundColor: 'var(--feedback-error-soft)',
              color: 'var(--feedback-error)',
            }}
          >
            <AlertTriangle className="w-7 h-7" strokeWidth={2} />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-[var(--text-main)]">
              {t('dashboard.overview.error.title', 'Impossible de charger le tableau de bord')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {error}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={loadDashboardData}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t('dashboard.overview.error.retry', 'Réessayer')}</span>
            </button>

            {/* In dev mode, allow resetting error simulation */}
            {simMode === 'error' && (
              <button
                type="button"
                onClick={() => handleSimModeChange('normal')}
                className="w-full sm:w-auto text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] underline cursor-pointer"
              >
                Désactiver la simulation d'erreur
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 3. STATE: EMPTY (ONBOARDING)
  const isDashboardEmpty = stats?.totalAnalyses === 0 || recentAnalyses.length === 0

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary)] to-[var(--primary-hover)] rounded-2xl p-6 sm:p-8 text-[var(--on-primary)] shadow-soft-md relative overflow-hidden transition-all">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-white/20 backdrop-blur-xs text-white">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('dashboard.overview.welcomeBadge', 'Espace de Sécurité Numérique')}</span>
            </span>

            {/* Operational Engine Indicator */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full bg-black/20 backdrop-blur-xs text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t('dashboard.overview.systemStatus.operational', 'Moteur heuristique opérationnel')}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('dashboard.overview.welcomeTitle', { name: user?.name || 'Vérificateur' })}
          </h1>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl">
            {t(
              'dashboard.overview.welcomeSubtitle',
              'Évaluez vos transactions, messages et liens suspects avant de vous engager. Vos données restent confidentielles.'
            )}
          </p>

          <div className="pt-2">
            <Link
              to="/dashboard/analyses/nouveau"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[var(--primary)] font-bold text-xs sm:text-sm hover:bg-white/95 transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ShieldPlus className="w-4.5 h-4.5" />
              <span>{t('dashboard.nav.quickNew', 'Lancer une analyse')}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Analyses */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-soft-sm flex items-center justify-between transition-all hover:border-[var(--primary)]">
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              {t('dashboard.overview.kpi.total', 'Analyses effectuées')}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] mt-1 tracking-tight">
              {stats?.totalAnalyses ?? 0}
            </p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--primary-soft)',
              color: 'var(--primary)',
            }}
          >
            <Activity className="w-5 h-5" strokeWidth={2} />
          </div>
        </div>

        {/* Low Risk */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-soft-sm flex items-center justify-between transition-all">
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              {t('dashboard.overview.kpi.low', 'Risque faible')}
            </p>
            <p
              className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight"
              style={{ color: 'var(--risk-success)' }}
            >
              {stats?.lowRiskCount ?? 0}
            </p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--risk-success-soft)',
              color: 'var(--risk-success)',
            }}
          >
            <ShieldCheck className="w-5 h-5" strokeWidth={2} />
          </div>
        </div>

        {/* Caution */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-soft-sm flex items-center justify-between transition-all">
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              {t('dashboard.overview.kpi.caution', 'Vigilance requise')}
            </p>
            <p
              className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight"
              style={{ color: 'var(--risk-warning)' }}
            >
              {stats?.cautionRiskCount ?? 0}
            </p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--risk-warning-soft)',
              color: 'var(--risk-warning)',
            }}
          >
            <AlertTriangle className="w-5 h-5" strokeWidth={2} />
          </div>
        </div>

        {/* High Risk */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-soft-sm flex items-center justify-between transition-all">
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              {t('dashboard.overview.kpi.high', 'Risque élevé')}
            </p>
            <p
              className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight"
              style={{ color: 'var(--risk-danger)' }}
            >
              {stats?.highRiskCount ?? 0}
            </p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--risk-danger-soft)',
              color: 'var(--risk-danger)',
            }}
          >
            <ShieldAlert className="w-5 h-5" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Main Section: Empty State OR Recent Analyses Table */}
      {isDashboardEmpty ? (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-8 sm:p-12 text-center shadow-soft-sm space-y-4">
          <div
            className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
            style={{
              backgroundColor: 'var(--primary-soft)',
              color: 'var(--primary)',
            }}
          >
            <ShieldCheck className="w-8 h-8" strokeWidth={1.75} />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-lg font-bold text-[var(--text-main)]">
              {t('dashboard.overview.empty.title', 'Aucune analyse effectuée pour le moment')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {t(
                'dashboard.overview.empty.description',
                "Vous n'avez pas encore vérifié de message, de lien ou de transaction. Démarrez dès maintenant pour sécuriser vos échanges !"
              )}
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/dashboard/analyses/nouveau"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <ShieldPlus className="w-4 h-4" />
              <span>{t('dashboard.overview.empty.action', 'Lancer ma première analyse')}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-soft-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-5 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-[var(--text-main)]">
                {t('dashboard.overview.recentSection.title', 'Dernières analyses')}
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                {t('dashboard.overview.recentSection.subtitle', 'Vos vérifications les plus récentes')}
              </p>
            </div>

            <Link
              to="/dashboard/historique"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline"
            >
              <span>{t('dashboard.overview.recentSection.viewAll', "Voir tout l'historique")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)]/50 text-[var(--text-muted)] font-semibold">
                  <th scope="col" className="py-3 px-4">
                    {t('dashboard.overview.recentSection.thType', 'Type')}
                  </th>
                  <th scope="col" className="py-3 px-4">
                    {t('dashboard.overview.recentSection.thTarget', 'Ressource analysée')}
                  </th>
                  <th scope="col" className="py-3 px-4">
                    {t('dashboard.overview.recentSection.thRisk', 'Niveau de risque')}
                  </th>
                  <th scope="col" className="py-3 px-4 hidden md:table-cell">
                    Statut
                  </th>
                  <th scope="col" className="py-3 px-4 hidden sm:table-cell">
                    {t('dashboard.overview.recentSection.thDate', 'Date')}
                  </th>
                  <th scope="col" className="py-3 px-4 text-right">
                    {t('dashboard.overview.recentSection.thAction', 'Action')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {recentAnalyses.map((scan) => (
                  <tr
                    key={scan.id}
                    className="hover:bg-[var(--bg-surface-secondary)]/40 transition-colors group"
                  >
                    {/* Type */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)]">
                          {getTypeIcon(scan.type)}
                        </div>
                        <span className="font-medium text-[var(--text-main)]">
                          {getTypeLabel(scan.type)}
                        </span>
                      </div>
                    </td>

                    {/* Target (Safe preview) */}
                    <td className="py-3 px-4 max-w-xs md:max-w-md">
                      <p className="truncate font-mono text-[11px] text-[var(--text-main)]" title={scan.target}>
                        {scan.target}
                      </p>
                      {scan.recommendation && (
                        <p className="truncate text-[11px] text-[var(--text-muted)] mt-0.5">
                          {scan.recommendation}
                        </p>
                      )}
                    </td>

                    {/* Risk Badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {scan.riskLevel ? (
                        <RiskBadge level={scan.riskLevel} size="sm" />
                      ) : (
                        <span className="text-[var(--text-subtle)]">—</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4 whitespace-nowrap hidden md:table-cell">
                      <StatusBadge status={scan.status} size="sm" />
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 whitespace-nowrap text-[var(--text-muted)] hidden sm:table-cell">
                      {formatDate(scan.createdAt)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 whitespace-nowrap text-right">
                      <Link
                        to={`/dashboard/analyses/${scan.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[var(--primary)] hover:bg-[var(--primary-soft)] transition-colors"
                        title={t('dashboard.overview.recentSection.detailsBtn', 'Consulter le rapport')}
                      >
                        <span>Détails</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cameroonian Context Tip: F04 Payment Verification Reminder */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft-sm">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{
              backgroundColor: 'var(--primary-soft)',
              color: 'var(--primary)',
            }}
          >
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
              Règle d'or KmerShield : Un SMS ou une capture d'écran ne prouve jamais un paiement
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5 max-w-2xl leading-relaxed">
              Avant de remettre un produit ou de faire une livraison, vérifiez toujours votre solde réel via l'application officielle MTN MoMo, Orange Money ou via code USSD (*126# / #150#).
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/analyses/nouveau"
          className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors"
        >
          Guide de vérification
        </Link>
      </div>

      {/* Dev-Only State Switcher Bar (Discreet helper to evaluate loading / empty / error states) */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-[var(--text-subtle)] border-t border-[var(--border-subtle)]">
        <span>Mode d'évaluation des états (Test FE2-02) :</span>
        <div className="inline-flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleSimModeChange('normal')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              simMode === 'normal'
                ? 'font-bold bg-[var(--primary)] text-white'
                : 'bg-[var(--bg-surface-secondary)] hover:text-[var(--text-main)]'
            }`}
          >
            Normal (Succès)
          </button>
          <button
            type="button"
            onClick={() => handleSimModeChange('empty')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              simMode === 'empty'
                ? 'font-bold bg-[var(--primary)] text-white'
                : 'bg-[var(--bg-surface-secondary)] hover:text-[var(--text-main)]'
            }`}
          >
            État Vide (0 analyse)
          </button>
          <button
            type="button"
            onClick={() => handleSimModeChange('error')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              simMode === 'error'
                ? 'font-bold bg-[var(--feedback-error)] text-white'
                : 'bg-[var(--bg-surface-secondary)] hover:text-[var(--text-main)]'
            }`}
          >
            État Erreur
          </button>
        </div>
      </div>
    </div>
  )
}
