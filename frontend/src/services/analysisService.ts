import { httpClient } from './httpClient'
import { ENDPOINTS } from './endpoints'
import { mockAnalysisAdapter } from './mockAnalysisAdapter'
import type { DashboardStats, ScanJob, CreateAnalysisPayload } from '../types/analysis'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

export const analysisService = {
  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCK) return mockAnalysisAdapter.getDashboardStats()
    return httpClient<DashboardStats>(ENDPOINTS.DASHBOARD.STATS, {
      method: 'GET',
    })
  },

  async getRecentAnalyses(limit: number = 5): Promise<ScanJob[]> {
    if (USE_MOCK) return mockAnalysisAdapter.getRecentAnalyses(limit)
    return httpClient<ScanJob[]>(`${ENDPOINTS.DASHBOARD.RECENT_ANALYSES}?limit=${limit}`, {
      method: 'GET',
    })
  },

  async getAnalysisById(id: string): Promise<ScanJob | null> {
    if (USE_MOCK) return mockAnalysisAdapter.getAnalysisById(id)
    return httpClient<ScanJob>(ENDPOINTS.ANALYSES.DETAIL(id), {
      method: 'GET',
    })
  },

  async createAnalysis(payload: CreateAnalysisPayload): Promise<ScanJob> {
    if (USE_MOCK) return mockAnalysisAdapter.createAnalysis(payload)
    return httpClient<ScanJob>(ENDPOINTS.ANALYSES.CREATE, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
