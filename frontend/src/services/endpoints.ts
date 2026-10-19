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
} as const
