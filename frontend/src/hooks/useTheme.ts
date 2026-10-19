import { useState, useEffect, useCallback } from 'react'
import type { ThemeMode } from '../types/common'

const STORAGE_KEY = 'kmershield_theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'auto'
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (saved && ['light', 'dark', 'auto'].includes(saved)) {
      return saved
    }
  } catch {
    // ignore storage access error
  }
  return 'auto'
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme)

  const applyThemeToDOM = useCallback((mode: ThemeMode) => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (mode === 'dark' || (mode === 'auto' && prefersDark)) {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
  }, [])

  const triggerThemeTransition = () => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 200)
  }

  const setTheme = useCallback((newTheme: ThemeMode) => {
    triggerThemeTransition()
    setThemeState(newTheme)
    try {
      localStorage.setItem(STORAGE_KEY, newTheme)
    } catch {
      // storage unavailable
    }
    applyThemeToDOM(newTheme)
  }, [applyThemeToDOM])

  const cycleTheme = useCallback(() => {
    const next: Record<ThemeMode, ThemeMode> = {
      light: 'dark',
      dark: 'auto',
      auto: 'light',
    }
    setTheme(next[theme])
  }, [theme, setTheme])

  useEffect(() => {
    applyThemeToDOM(theme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'auto') {
        applyThemeToDOM('auto')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyThemeToDOM])

  return { theme, setTheme, cycleTheme }
}
