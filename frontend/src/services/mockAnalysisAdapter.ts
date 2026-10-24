import type { DashboardStats, ScanJob } from '../types/analysis'

const MOCK_SCANS: ScanJob[] = [
  {
    id: 'scn_momo_8921',
    type: 'message',
    target: 'SMS MoMo: "Vous avez reçu 125 000 FCFA de K. Paul. Ref: MP261024.1843..."',
    status: 'completed',
    riskLevel: 'high',
    findingsCount: 3,
    recommendation: 'Ne livrez aucun bien. Vérifiez le solde réel sur votre application officielle MTN MoMo (*126#).',
    createdAt: '2026-10-24T18:43:00Z',
    completedAt: '2026-10-24T18:43:04Z',
  },
  {
    id: 'scn_url_7734',
    type: 'url',
    target: 'https://orange-money-deblocage-cameroun.free.nf/auth',
    status: 'completed',
    riskLevel: 'high',
    findingsCount: 4,
    recommendation: 'Ne saisissez aucun code secret. Ce domaine tente d\'usurper l\'identité d\'Orange Money.',
    createdAt: '2026-10-24T15:12:00Z',
    completedAt: '2026-10-24T15:12:03Z',
  },
  {
    id: 'scn_trx_6620',
    type: 'transaction',
    target: 'Achat ordinateur portable HP (Marketplace Douala - Vendeur informel)',
    status: 'completed',
    riskLevel: 'moderate',
    findingsCount: 2,
    recommendation: 'Exigez une remise en main propre dans un lieu public sécurisé. Évitez tout acompte.',
    createdAt: '2026-10-24T11:05:00Z',
    completedAt: '2026-10-24T11:05:02Z',
  },
  {
    id: 'scn_url_5511',
    type: 'url',
    target: 'https://www.campost.cm/services-financiers',
    status: 'completed',
    riskLevel: 'low',
    findingsCount: 0,
    recommendation: 'Domaine institutionnel officiel reconnu. Aucun signal d\'usurpation détecté.',
    createdAt: '2026-10-23T16:40:00Z',
    completedAt: '2026-10-23T16:40:02Z',
  },
  {
    id: 'scn_msg_4490',
    type: 'message',
    target: 'WhatsApp: "Félicitations vous avez gagné 500 000 FCFA. Payez 15 000 FCFA de frais..."',
    status: 'completed',
    riskLevel: 'high',
    findingsCount: 3,
    recommendation: 'Arnaque classique aux frais préalables. Ne transférez aucun fond.',
    createdAt: '2026-10-23T09:20:00Z',
    completedAt: '2026-10-23T09:20:04Z',
  },
]

function delay(ms: number = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const mockAnalysisAdapter = {
  async getDashboardStats(): Promise<DashboardStats> {
    await delay()
    const isMockEmpty = sessionStorage.getItem('kmershield_mock_empty') === 'true'
    const isMockError = sessionStorage.getItem('kmershield_mock_error') === 'true'

    if (isMockError) {
      throw new Error('Erreur de connexion au serveur d\'évaluation (simulation d\'erreur).')
    }

    if (isMockEmpty) {
      return {
        totalAnalyses: 0,
        lowRiskCount: 0,
        cautionRiskCount: 0,
        highRiskCount: 0,
        activeAlertsCount: 0,
        systemStatus: 'operational',
      }
    }

    return {
      totalAnalyses: 14,
      lowRiskCount: 6,
      cautionRiskCount: 3,
      highRiskCount: 5,
      activeAlertsCount: 2,
      systemStatus: 'operational',
      lastAnalysisDate: '2026-10-24T18:43:00Z',
    }
  },

  async getRecentAnalyses(limit: number = 5): Promise<ScanJob[]> {
    await delay()
    const isMockEmpty = sessionStorage.getItem('kmershield_mock_empty') === 'true'
    const isMockError = sessionStorage.getItem('kmershield_mock_error') === 'true'

    if (isMockError) {
      throw new Error('Impossible de récupérer l\'historique récent.')
    }

    if (isMockEmpty) {
      return []
    }

    return MOCK_SCANS.slice(0, limit)
  },

  async getAnalysisById(id: string): Promise<ScanJob | null> {
    await delay()
    const scan = MOCK_SCANS.find((s) => s.id === id)
    return scan || null
  },

  async createAnalysis(payload: import('../types/analysis').CreateAnalysisPayload): Promise<ScanJob> {
    await delay(700)

    let riskLevel: import('../types/analysis').RiskLevel = 'low'
    const findings: import('../types/analysis').Finding[] = []
    let recommendation = 'Aucun signal d\'alarme critique détecté. Restez vigilant.'

    if (payload.type === 'url') {
      const lower = payload.content.toLowerCase()
      const isSuspiciousDomain =
        lower.includes('free.nf') ||
        lower.includes('deblocage') ||
        lower.includes('recharge') ||
        lower.includes('bonus') ||
        lower.includes('orange-money') ||
        lower.includes('mtn-momo') ||
        lower.includes('cadeau')

      if (isSuspiciousDomain) {
        riskLevel = 'high'
        findings.push(
          {
            id: 'fnd_url_1',
            code: 'IMPERSONATION_SUBDOMAIN',
            title: 'Usurpation d\'identité probable',
            description: 'Ce lien utilise des termes officiels (MTN/Orange) sur un hébergement tiers non officiel.',
            severity: 'high',
          },
          {
            id: 'fnd_url_2',
            code: 'NO_OFFICIAL_REGISTRY',
            title: 'Domaine non certifié',
            description: 'Le nom de domaine n\'appartient pas aux registres déclarés des opérateurs agréés.',
            severity: 'high',
          }
        )
        recommendation = 'Ne cliquez pas et ne saisissez aucun identifiant ni mot de passe sur ce lien.'
      } else if (!lower.startsWith('https://')) {
        riskLevel = 'moderate'
        findings.push({
          id: 'fnd_url_3',
          code: 'UNENCRYPTED_HTTP',
          title: 'Protocole non sécurisé',
          description: 'Le lien ne dispose pas de chiffrement SSL/TLS standard (http au lieu de https).',
          severity: 'moderate',
        })
        recommendation = 'Évitez de transmettre la moindre information personnelle.'
      } else {
        riskLevel = 'low'
        recommendation = 'Le domaine semble standard, mais continuez de vérifier les certificats.'
      }
    } else if (payload.type === 'message') {
      const lower = payload.content.toLowerCase()
      let alertScore = 0

      if (lower.includes('reçu') && (lower.includes('fcfa') || lower.includes('xaf')) && lower.includes('ref')) {
        alertScore += 3
        findings.push({
          id: 'fnd_msg_1',
          code: 'FAKE_SMS_PATTERN',
          title: 'Structure typique de faux SMS Mobile Money',
          description: 'Le message imite un reçu de transfert officiel. Les escrocs falsifient souvent le numéro émetteur.',
          severity: 'high',
        })
      }

      if (lower.includes('gagné') || lower.includes('loterie') || lower.includes('frais') || lower.includes('déblocage')) {
        alertScore += 3
        findings.push({
          id: 'fnd_msg_2',
          code: 'ADVANCE_FEE_SCAM',
          title: 'Demande de frais préalables',
          description: 'Exigence d\'un paiement préalable pour prétendre débloquer un lot ou un gain.',
          severity: 'high',
        })
      }

      if (lower.includes('urgent') || lower.includes('immédiat') || lower.includes('dépêchez') || lower.includes('secret')) {
        alertScore += 2
        findings.push({
          id: 'fnd_msg_3',
          code: 'ARTIFICIAL_URGENCY',
          title: 'Pression temporelle artificielle',
          description: 'Technique de manipulation visant à vous faire agir avant vérification rationnelle.',
          severity: 'moderate',
        })
      }

      if (alertScore >= 5) {
        riskLevel = 'high'
        recommendation = 'Tentative d\'escroquerie probable. Ne versez aucun fond et vérifiez votre compte officiel.'
      } else if (alertScore >= 2) {
        riskLevel = 'moderate'
        recommendation = 'Incohérences notables. Exigez un appel direct ou une vérification officielle.'
      } else {
        riskLevel = 'low'
        recommendation = 'Peu de signaux d\'alerte. Conservez les précautions habituelles.'
      }
    } else if (payload.type === 'transaction') {
      const q = payload.context?.questionnaire
      let score = 0

      if (q?.fullAdvancePayment === 'yes') {
        score += 3
        findings.push({
          id: 'fnd_trx_1',
          code: 'FULL_ADVANCE_DEMAND',
          title: 'Paiement intégral exigé à l\'avance',
          description: 'Exigence d\'un transfert total avant remise du bien sans garantie vérifiable.',
          severity: 'high',
        })
      }
      if (q?.urgencyOrSecrecy === 'yes') {
        score += 3
        findings.push({
          id: 'fnd_trx_2',
          code: 'SECRECY_OR_PRESSURE',
          title: 'Pression ou confidentialité suspecte',
          description: 'L\'interlocuteur vous pousse à agir vite ou à ne pas en parler à vos proches.',
          severity: 'high',
        })
      }
      if (q?.verificationPossible === 'no') {
        score += 2
        findings.push({
          id: 'fnd_trx_3',
          code: 'IDENTITY_REFUSAL',
          title: 'Refus de vérification d\'identité',
          description: 'L\'autre partie refuse toute preuve vérifiable d\'existence ou d\'état du produit.',
          severity: 'moderate',
        })
      }
      if (q?.officialChannelConfirmed === 'unconfirmed') {
        score += 2
        findings.push({
          id: 'fnd_trx_4',
          code: 'UNCONFIRMED_CHANNEL',
          title: 'Canal officiel non vérifié',
          description: 'Aucune confirmation dans l\'application officielle du prestataire de paiement.',
          severity: 'moderate',
        })
      }
      if (q?.documentedConditions === 'no') {
        score += 1
        findings.push({
          id: 'fnd_trx_5',
          code: 'VAGUE_TERMS',
          title: 'Conditions d\'achat floues',
          description: 'Absence de clauses claires de livraison ou de remboursement.',
          severity: 'moderate',
        })
      }

      if (score >= 6) {
        riskLevel = 'high'
        recommendation = 'Risque élevé. Ne précipitez aucun versement et privilégiez une rencontre en lieu public.'
      } else if (score >= 3) {
        riskLevel = 'moderate'
        recommendation = 'Vigilance requise. Plusieurs incertitudes constatées. Demandez des garanties supplémentaires.'
      } else {
        riskLevel = 'low'
        recommendation = 'Risque faible. Continuez néanmoins à vérifier les registres officiels.'
      }
    }

    const newScan: ScanJob = {
      id: `scn_${Date.now()}`,
      type: payload.type,
      target: payload.content.slice(0, 100),
      status: 'completed',
      riskLevel,
      findingsCount: findings.length,
      findings,
      recommendation,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    }

    // Prepend to recent mock scans so it is immediately visible
    MOCK_SCANS.unshift(newScan)

    return newScan
  },
}
