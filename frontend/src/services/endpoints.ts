/**
 * API Endpoints Catalog
 * NOTE: Marked as "TO VALIDATE with Back-end 1" for contract agreement.
 */

export const ENDPOINTS = {
  // Authentication & Session Endpoints (Django)
  AUTH: {
    LOGIN: '/api/auth/login/',                     // TO VALIDATE with Back-end 1
    REGISTER: '/api/auth/register/',               // TO VALIDATE with Back-end 1
    LOGOUT: '/api/auth/logout/',                   // TO VALIDATE with Back-end 1
    ME: '/api/auth/me/',                           // TO VALIDATE with Back-end 1
    REQUEST_PASSWORD_RESET: '/api/auth/password-reset/',        // TO VALIDATE with Back-end 1
    CONFIRM_PASSWORD_RESET: '/api/auth/password-reset-confirm/', // TO VALIDATE with Back-end 1
    CSRF: '/api/auth/csrf/',                       // TO VALIDATE with Back-end 1
  },
  // Risk & Public Evaluation Endpoints
  EVALUATION: {
    ASSESS_LINK: '/api/eval/link/',                // TO VALIDATE with Back-end 1
    ASSESS_TEXT: '/api/eval/text/',                // TO VALIDATE with Back-end 1
  },
  // Dashboard & Private Space Endpoints (TO VALIDATE with Back-end 2)
  DASHBOARD: {
    STATS: '/api/dashboard/stats/',
    RECENT_ANALYSES: '/api/dashboard/recent/',
    SYSTEM_STATUS: '/api/dashboard/system-status/',
  },
  ANALYSES: {
    LIST: '/api/analyses/',
    CREATE: '/api/analyses/',
    DETAIL: (id: string) => `/api/analyses/${id}/`,
    CANCEL: (id: string) => `/api/analyses/${id}/cancel/`,
  },
  ALERTS: {
    LIST: '/api/alerts/',
    MARK_READ: (id: string) => `/api/alerts/${id}/read/`,
    MARK_ALL_READ: '/api/alerts/read-all/',
  },
} as const
