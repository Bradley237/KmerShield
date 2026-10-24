import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../hooks/useAuth'
import { PrivateLayout } from '../../layouts/PrivateLayout'
import { Overview } from '../../pages/dashboard/Overview'
import { Forbidden } from '../../pages/dashboard/Forbidden'
import { DashboardNotFound } from '../../pages/dashboard/DashboardNotFound'
import i18n from '../../app/i18n'

describe('FE2-01 Dashboard Structure & Guards', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('fr')
  })
  it('redirects unauthenticated users to /connexion with redirect parameter', () => {
    render(
      <AuthContext.Provider
        value={{
          user: null,
          isLoading: false,
          isAuthenticated: false,
          login: async () => {},
          register: async () => {},
          logout: async () => {},
        }}
      >
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<PrivateLayout />}>
              <Route index element={<Overview />} />
            </Route>
            <Route path="/connexion" element={<div>Page de connexion</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    // Should redirect to /connexion
    expect(screen.getByText('Page de connexion')).toBeInTheDocument()
  })

  it('renders dashboard shell with sidebar, header, breadcrumbs and overview when authenticated', async () => {
    const mockUser = {
      id: 'usr_test_1',
      name: 'Christian N.',
      email: 'christian@test.cm',
    }

    render(
      <AuthContext.Provider
        value={{
          user: mockUser,
          isLoading: false,
          isAuthenticated: true,
          login: async () => {},
          register: async () => {},
          logout: async () => {},
        }}
      >
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<PrivateLayout />}>
              <Route index element={<Overview />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    // Breadcrumbs presence
    expect(screen.getByLabelText(/Fil d'Ariane/i)).toBeInTheDocument()

    // Sidebar navigation items
    expect(screen.getByRole('navigation', { name: /Menu principal/i })).toBeInTheDocument()
    expect(screen.getByText(/Analyses & Suivi/i)).toBeInTheDocument()
    expect(screen.getByText(/Historique/i)).toBeInTheDocument()

    // User greeting in Overview (loaded asynchronously)
    await waitFor(() => {
      expect(screen.getByText(/Bonjour, Christian N./i)).toBeInTheDocument()
    })

    // Sidebar navigation items
    expect(screen.getAllByText(/Historique/i).length).toBeGreaterThan(0)
  })

  it('renders 403 Forbidden error page with back to dashboard button', () => {
    render(
      <MemoryRouter>
        <Forbidden />
      </MemoryRouter>
    )

    expect(screen.getByText(/403 - Accès restreint/i)).toBeInTheDocument()
    expect(screen.getByText(/Retour au tableau de bord/i)).toBeInTheDocument()
  })

  it('renders 404 DashboardNotFound error page', () => {
    render(
      <MemoryRouter>
        <DashboardNotFound />
      </MemoryRouter>
    )

    expect(screen.getByText(/404 - Page introuvable/i)).toBeInTheDocument()
  })
})
