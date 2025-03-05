import { fetchClassic } from '../fetch'
import {
  AuthGetNewTokensDto,
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponse,
  TokenResponse,
} from './auth.types'

class AuthService {
  async login(dto: AuthLoginDto) {
    return fetchClassic.post<AuthResponse>('auth/login', dto)
  }

  async getNewTokens(dto: AuthGetNewTokensDto) {
    return fetchClassic.post<TokenResponse>('auth/login/refresh-token', dto)
  }

  async register(dto: AuthRegisterDto) {
    return fetchClassic.post<AuthResponse>('auth/register', dto)
  }

  async google() {
    return fetchClassic.get<void>('auth/google')
  }
}

export const authService = new AuthService()
