import React from 'react'
import { Clock, Loader2, CheckCircle2, XCircle, Ban } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ScanStatus } from '../../types/analysis'

interface StatusBadgeProps {
  status: ScanStatus
  size?: 'sm' | 'md'
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const { t } = useTranslation()

  const config = {
    queued: {
      label: t('dashboard.status.queued', 'En attente'),
      icon: Clock,
      color: 'var(--text-muted)',
      bg: 'var(--bg-surface-secondary)',
      border: 'var(--border-color)',
      isSpinning: false,
    },
    running: {
      label: t('dashboard.status.running', 'En cours...'),
      icon: Loader2,
      color: 'var(--primary)',
      bg: 'var(--primary-soft)',
      border: 'rgba(79, 70, 229, 0.25)',
      isSpinning: true,
    },
    completed: {
      label: t('dashboard.status.completed', 'Terminé'),
      icon: CheckCircle2,
      color: 'var(--text-main)',
      bg: 'var(--bg-surface-secondary)',
      border: 'var(--border-color)',
      isSpinning: false,
    },
    failed: {
      label: t('dashboard.status.failed', 'Échec'),
      icon: XCircle,
      color: 'var(--feedback-error)',
      bg: 'var(--feedback-error-soft)',
      border: 'rgba(190, 18, 60, 0.25)',
      isSpinning: false,
    },
    cancelled: {
      label: t('dashboard.status.cancelled', 'Annulé'),
      icon: Ban,
      color: 'var(--text-subtle)',
      bg: 'var(--bg-surface-secondary)',
      border: 'var(--border-subtle)',
      isSpinning: false,
    },
  }[status]

  const Icon = config.icon
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5 gap-1' : 'text-xs px-2.5 py-1 gap-1.5'
  const iconSize = size === 'sm' ? 12 : 13

  return (
    <span
      role="status"
      aria-label={config.label}
      className={`inline-flex items-center rounded-full font-medium border select-none ${sizeClasses} ${className}`}
      style={{
        color: config.color,
        backgroundColor: config.bg,
        borderColor: config.border,
      }}
    >
      <Icon
        size={iconSize}
        className={`shrink-0 ${config.isSpinning ? 'animate-spin' : ''}`}
      />
      <span>{config.label}</span>
    </span>
  )
}
