import type { User, LoginCredentials, RegisterPayload, ForgotPasswordPayload, ResetPasswordPayload, AuthResponse } from '../types/auth'

const FAKE_USER: User = {
  id: 'usr_mock_123',
  name: 'Alexandre K.',
  email: 'alex@example.cm',
  createdAt: '2026-01-15T10:00:00Z',
}

function delay(ms: number = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const mockAuthAdapter = {
  async login(creds: LoginCredentials): Promise<AuthResponse> {
    await delay()
    if (creds.password === 'error') {
      throw {
        code: 'INVALID_CREDENTIALS',
        status: 401,
        message: 'Invalid credentials provided in mock test.',
      }
    }
    return {
      user: {
        ...FAKE_USER,
        email: creds.email,
      },
      message: '[MOCK] Connexion réussie (environnement de test local)',
    }
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    await delay()
    if (payload.email === 'taken@example.cm') {
      throw {
        code: 'VALIDATION_ERROR',
        status: 400,
        message: 'This email is already in use.',
        fieldErrors: { email: 'Cet email est déjà utilisé.' },
      }
    }
    return {
      user: {
        id: `usr_mock_${Date.now()}`,
        name: payload.name,
        email: payload.email,
        createdAt: new Date().toISOString(),
      },
      message: '[MOCK] Compte créé avec succès (simulation)',
    }
  },

  async logout(): Promise<void> {
    await delay(300)
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(300)
    // By default, start unauthenticated in mock mode unless specified
    return null
  },

  async requestPasswordReset(_payload: ForgotPasswordPayload): Promise<{ message: string }> {
    await delay()
    // Always neutral message: never reveals whether an account exists
    return {
      message: '[MOCK] Demande prise en compte. Aucun détail de compte n’est révélé.',
    }
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    await delay()
    if (payload.token === 'expired') {
      throw {
        code: 'VALIDATION_ERROR',
        status: 400,
        message: 'Expired or invalid token',
      }
    }
    return {
      message: '[MOCK] Mot de passe mis à jour avec succès.',
    }
  },
}
