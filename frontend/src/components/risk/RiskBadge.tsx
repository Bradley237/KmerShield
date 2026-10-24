import React from 'react'
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { RiskLevel } from '../../types/analysis'

interface RiskBadgeProps {
  level: RiskLevel
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const { t } = useTranslation()

  const config = {
    low: {
      label: t('risk.levelLow', 'Risque faible'),
      icon: ShieldCheck,
      color: 'var(--risk-success)',
      backgroundColor: 'var(--risk-success-soft)',
      borderColor: 'rgba(21, 128, 61, 0.25)',
    },
    moderate: {
      label: t('risk.levelModerate', 'Vigilance'),
      icon: AlertTriangle,
      color: 'var(--risk-warning)',
      backgroundColor: 'var(--risk-warning-soft)',
      borderColor: 'rgba(180, 83, 9, 0.25)',
    },
    high: {
      label: t('risk.levelHigh', 'Risque élevé'),
      icon: ShieldAlert,
      color: 'var(--risk-danger)',
      backgroundColor: 'var(--risk-danger-soft)',
      borderColor: 'rgba(185, 28, 28, 0.3)',
    },
  }[level]

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  }[size]

  const Icon = config.icon
  const iconSize = { sm: 12, md: 14, lg: 16 }[size]

  return (
    <span
      role="status"
      aria-label={config.label}
      className={`inline-flex items-center rounded-full font-semibold border transition-all select-none shadow-2xs ${sizeClasses} ${className}`}
      style={{
        color: config.color,
        backgroundColor: config.backgroundColor,
        borderColor: config.borderColor,
      }}
    >
      {showIcon && <Icon size={iconSize} strokeWidth={2.2} className="shrink-0" />}
      <span>{config.label}</span>
    </span>
  )
}
