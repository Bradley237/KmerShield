import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Overview } from '../../pages/dashboard/Overview'
import { AuthContext } from '../../hooks/useAuth'
import { analysisService } from '../../services/analysisService'
import i18n from '../../app/i18n'

vi.mock('../../services/analysisService')

const mockUser = {
  id: 'usr_test',
  name: 'Alexandre K.',
  email: 'alex@example.cm',
}

const mockStats = {
  totalAnalyses: 14,
  lowRiskCount: 6,
  cautionRiskCount: 3,
  highRiskCount: 5,
  activeAlertsCount: 2,
  systemStatus: 'operational' as const,
  lastAnalysisDate: '2026-10-24T18:43:00Z',
}

const mockRecent = [
  {
    id: 'scn_1',
    type: 'message' as const,
    target: 'SMS MoMo: Fake Transfer',
    status: 'completed' as const,
    riskLevel: 'high' as const,
    recommendation: 'Ne livrez aucun bien.',
    createdAt: '2026-10-24T18:43:00Z',
  },
]

describe('FE2-02 Overview Page', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('fr')
    vi.clearAllMocks()
    sessionStorage.clear()
  })

  it('renders success state with KPIs, engine status and recent analyses', async () => {
    vi.mocked(analysisService.getDashboardStats).mockResolvedValue(mockStats)
    vi.mocked(analysisService.getRecentAnalyses).mockResolvedValue(mockRecent)

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
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      // Welcome header
      expect(screen.getByText(/Bonjour, Alexandre K./i)).toBeInTheDocument()
      // System operational badge
      expect(screen.getByText(/Opérationnel & Actif/i)).toBeInTheDocument()
      // KPI values
      expect(screen.getByText('14')).toBeInTheDocument() // Total
      expect(screen.getByText('6')).toBeInTheDocument()  // Low
      expect(screen.getByText('3')).toBeInTheDocument()  // Caution
      expect(screen.getByText('5')).toBeInTheDocument()  // High
      // Recent table item
      expect(screen.getByText('SMS MoMo: Fake Transfer')).toBeInTheDocument()
    })
  })

  it('renders empty onboarding state when user has 0 analyses', async () => {
    vi.mocked(analysisService.getDashboardStats).mockResolvedValue({
      totalAnalyses: 0,
      lowRiskCount: 0,
      cautionRiskCount: 0,
      highRiskCount: 0,
      activeAlertsCount: 0,
      systemStatus: 'operational',
    })
    vi.mocked(analysisService.getRecentAnalyses).mockResolvedValue([])

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
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Aucune analyse effectuée pour le moment/i)).toBeInTheDocument()
      expect(screen.getByText(/Lancer ma première analyse/i)).toBeInTheDocument()
    })
  })

  it('renders error state with retry button on service failure', async () => {
    vi.mocked(analysisService.getDashboardStats).mockRejectedValue(new Error('Erreur réseau 500'))
    vi.mocked(analysisService.getRecentAnalyses).mockRejectedValue(new Error('Erreur réseau 500'))

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
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText('Erreur réseau 500')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Réessayer/i })).toBeInTheDocument()
    })
  })
})
