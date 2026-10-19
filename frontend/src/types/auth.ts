export interface User {
  id: string
  name: string
  email: string
  createdAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  consent: boolean
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  message?: string
}

export type AuthErrorCode = 'VALIDATION_ERROR' | 'INVALID_CREDENTIALS' | 'TOO_MANY_REQUESTS' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR'

export interface AuthError {
  code: AuthErrorCode
  status: number
  message: string
  fieldErrors?: Record<string, string>
}
