import { httpClient } from './httpClient'
import { ENDPOINTS } from './endpoints'
import { mockAuthAdapter } from './mockAuthAdapter'
import type {
  User,
  LoginCredentials,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
} from '../types/auth'

export const POST_LOGIN_REDIRECT = '/dashboard'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK) return mockAuthAdapter.login(credentials)
    return httpClient<AuthResponse>(ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    if (USE_MOCK) return mockAuthAdapter.register(payload)
    return httpClient<AuthResponse>(ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async logout(): Promise<void> {
    if (USE_MOCK) return mockAuthAdapter.logout()
    return httpClient<void>(ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    })
  },

  async getCurrentUser(): Promise<User | null> {
    if (USE_MOCK) return mockAuthAdapter.getCurrentUser()
    try {
      return await httpClient<User>(ENDPOINTS.AUTH.ME, {
        method: 'GET',
      })
    } catch {
      return null
    }
  },

  async requestPasswordReset(payload: ForgotPasswordPayload): Promise<{ message: string }> {
    if (USE_MOCK) return mockAuthAdapter.requestPasswordReset(payload)
    return httpClient<{ message: string }>(ENDPOINTS.AUTH.REQUEST_PASSWORD_RESET, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    if (USE_MOCK) return mockAuthAdapter.resetPassword(payload)
    return httpClient<{ message: string }>(ENDPOINTS.AUTH.CONFIRM_PASSWORD_RESET, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
