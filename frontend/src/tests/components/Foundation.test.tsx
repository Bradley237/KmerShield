import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'
import { router } from '../../app/router'
import { AppProviders } from '../../app/providers'
import i18n from '../../app/i18n'

describe('KmerShield Foundation', () => {
  it('renders application with brand name and supports bilingual navigation', async () => {
    // Switch explicitly to French first
    await act(async () => {
      await i18n.changeLanguage('fr')
    })

    render(
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    )

    // Check brand logo presence
    const brandElements = screen.getAllByText('KmerShield')
    expect(brandElements.length).toBeGreaterThan(0)

    // Check French navigation anchors
    expect(screen.getByText('Fonctionnement')).toBeInTheDocument()
    expect(screen.getByText('Limites')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()

    // Test English switch
    await act(async () => {
      await i18n.changeLanguage('en')
    })

    expect(screen.getByText('How it works')).toBeInTheDocument()
    expect(screen.getByText('Limits')).toBeInTheDocument()
  })
})
