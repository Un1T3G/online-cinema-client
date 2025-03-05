import { UserResponse } from '../users'

export interface AuthLoginDto {
  email: string
  password: string
}

export interface AuthGetNewTokensDto {
  refreshToken: string
}

export interface AuthRegisterDto {
  name?: string
  email: string
  password: string
  avatarUrl?: string
}

export interface AuthResponse {
  user: UserResponse
  tokens: TokenResponse
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}
