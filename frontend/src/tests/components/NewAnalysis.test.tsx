import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NewAnalysis } from '../../pages/dashboard/NewAnalysis'
import { analysisService } from '../../services/analysisService'
import i18n from '../../app/i18n'

vi.mock('../../services/analysisService')

describe('FE2-03 New Analysis Launch Form', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('fr')
    vi.clearAllMocks()
  })

  it('renders tab switchers and disables submit button when consent is unchecked', () => {
    render(
      <MemoryRouter>
        <NewAnalysis />
      </MemoryRouter>
    )

    // Tabs
    expect(screen.getByRole('tab', { name: /Lien suspect/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /SMS/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Transaction/i })).toBeInTheDocument()

    // Submit button disabled by default
    const submitBtn = screen.getByRole('button', { name: /Lancer l'analyse du risque/i })
    expect(submitBtn).toBeDisabled()
  })

  it('switches between URL, Message, and Transaction questionnaire tabs', () => {
    render(
      <MemoryRouter>
        <NewAnalysis />
      </MemoryRouter>
    )

    // Default: Message / SMS tab input
    expect(screen.getByLabelText(/Texte intégral du message ou SMS/i)).toBeInTheDocument()

    // Click URL tab
    fireEvent.click(screen.getByRole('tab', { name: /Lien suspect/i }))
    expect(screen.getByLabelText(/Lien ou URL suspecte à analyser/i)).toBeInTheDocument()

    // Click Transaction tab
    fireEvent.click(screen.getByRole('tab', { name: /Transaction/i }))
    expect(screen.getByText(/1\. L'autre partie peut-elle fournir/i)).toBeInTheDocument()
    expect(screen.getByText(/2\. Le paiement intégral est-il exigé/i)).toBeInTheDocument()
  })

  it('successfully submits a suspicious URL and renders instant evaluation result', async () => {
    const mockCreatedScan = {
      id: 'scn_test_url_99',
      type: 'url' as const,
      target: 'https://orange-money-recharge-cm.free.nf/auth',
      status: 'completed' as const,
      riskLevel: 'high' as const,
      findingsCount: 2,
      recommendation: 'Ne cliquez pas et ne saisissez aucun identifiant ni mot de passe.',
      findings: [
        {
          id: 'fnd_1',
          code: 'IMPERSONATION',
          title: 'Usurpation d\'identité probable',
          description: 'Sous-domaine non officiel.',
          severity: 'high' as const,
        },
      ],
      createdAt: '2026-10-24T20:00:00Z',
    }

    vi.mocked(analysisService.createAnalysis).mockResolvedValue(mockCreatedScan)

    render(
      <MemoryRouter>
        <NewAnalysis />
      </MemoryRouter>
    )

    // Switch to URL tab
    fireEvent.click(screen.getByRole('tab', { name: /Lien suspect/i }))

    // Fill URL
    const urlInput = screen.getByLabelText(/Lien ou URL suspecte à analyser/i)
    fireEvent.change(urlInput, { target: { value: 'https://orange-money-recharge-cm.free.nf/auth' } })

    // Check mandatory consent checkbox
    const consentCheckbox = screen.getByRole('checkbox')
    fireEvent.click(consentCheckbox)

    // Submit button should now be enabled
    const submitBtn = screen.getByRole('button', { name: /Lancer l'analyse du risque/i })
    expect(submitBtn).not.toBeDisabled()

    // Submit
    fireEvent.click(submitBtn)

    // Result card appears
    await waitFor(() => {
      expect(screen.getByText(/Évaluation KmerShield terminée/i)).toBeInTheDocument()
      expect(screen.getAllByText('Risque élevé').length).toBeGreaterThan(0)
      expect(screen.getByText(/Ne cliquez pas et ne saisissez aucun identifiant/i)).toBeInTheDocument()
      expect(screen.getByText(/Consulter le rapport complet/i)).toBeInTheDocument()
    })
  })
})
