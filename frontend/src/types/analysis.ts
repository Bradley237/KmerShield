export type RiskLevel = 'low' | 'moderate' | 'high'

export type ScanStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'

export type ScanType = 'url' | 'message' | 'transaction' | 'payment'

export interface Finding {
  id: string
  code: string
  title: string
  description: string
  severity: RiskLevel
  recommendation?: string
}

export interface ScanJob {
  id: string
  type: ScanType
  target: string // Redacted or sanitized preview of URL, message or transaction reference
  status: ScanStatus
  riskLevel?: RiskLevel
  findingsCount?: number
  findings?: Finding[]
  recommendation?: string
  createdAt: string
  completedAt?: string
}

export interface DashboardStats {
  totalAnalyses: number
  lowRiskCount: number
  cautionRiskCount: number
  highRiskCount: number
  activeAlertsCount: number
  systemStatus: 'operational' | 'degraded' | 'maintenance'
  lastAnalysisDate?: string
}

export interface TransactionQuestionnaireData {
  verificationPossible: 'yes' | 'no' | 'not_yet'
  fullAdvancePayment: 'yes' | 'no' | 'partial'
  urgencyOrSecrecy: 'yes' | 'no'
  officialChannelConfirmed: 'confirmed' | 'unconfirmed' | 'na'
  documentedConditions: 'yes' | 'no' | 'partially'
  saferOptionExists: 'yes' | 'no' | 'unknown'
  productDescription?: string
  amountFCFA?: number
}

export interface CreateAnalysisPayload {
  type: ScanType
  content: string
  consent: boolean
  context?: {
    platform?: 'whatsapp' | 'facebook' | 'sms' | 'other'
    claimedAmount?: number
    senderPhone?: string
    questionnaire?: TransactionQuestionnaireData
  }
}
