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
      className={`p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors cursor-pointer inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${className}`}
      title={`Thème: ${t(`common.theme.${theme}`)}`}
      aria-label={`Changer de thème (actuel: ${t(`common.theme.${theme}`)})`}
    >
      {theme === 'light' && <Sun className="w-4 h-4" strokeWidth={1.5} />}
      {theme === 'dark' && <Moon className="w-4 h-4" strokeWidth={1.5} />}
      {theme === 'auto' && <Monitor className="w-4 h-4" strokeWidth={1.5} />}
    </button>
  )
}
