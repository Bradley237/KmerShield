import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../hooks/useTheme'

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, cycleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`p-2 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center min-w-[36px] min-h-[36px] ${className}`}
      style={{
        backgroundColor: 'transparent',
        color: 'var(--text-muted)',
      }}
      title={`Thème: ${t(`common.theme.${theme}`)} (Cliquer pour changer)`}
      aria-label={`Changer de thème (actuel: ${t(`common.theme.${theme}`)})`}
    >
      {theme === 'light' && <Sun size={18} strokeWidth={1.5} />}
      {theme === 'dark' && <Moon size={18} strokeWidth={1.5} />}
      {theme === 'auto' && <Monitor size={18} strokeWidth={1.5} />}
    </button>
  )
}
