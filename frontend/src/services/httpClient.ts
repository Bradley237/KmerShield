import type { AuthError, AuthErrorCode } from '../types/auth'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
  return match ? decodeURIComponent(match[3]) : null
}

export async function httpClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`

  const headers = new Headers(options.headers || {})
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  // Automatically read Django csrftoken and send in header
  const csrfToken = getCookie('csrftoken')
  if (csrfToken) {
    headers.set('X-CSRFToken', csrfToken)
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // essential for Django session cookies
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      let errorData: any = null
      try {
        errorData = await response.json()
      } catch {
        // response body not JSON
      }

      let code: AuthErrorCode = 'UNKNOWN_ERROR'
      if (response.status === 400) code = 'VALIDATION_ERROR'
      else if (response.status === 401) code = 'INVALID_CREDENTIALS'
      else if (response.status === 429) code = 'TOO_MANY_REQUESTS'

      const authError: AuthError = {
        code,
        status: response.status,
        message: errorData?.message || errorData?.detail || response.statusText,
        fieldErrors: errorData?.fieldErrors || errorData?.errors,
      }
      throw authError
    }

    if (response.status === 204) {
      return {} as T
    }

    return (await response.json()) as T
  } catch (err: any) {
    if (err.code && err.status) {
      throw err // already formatted AuthError
    }

    const networkError: AuthError = {
      code: 'NETWORK_ERROR',
      status: 0,
      message: err.message || 'Network error occurred',
    }
    throw networkError
  }
}
