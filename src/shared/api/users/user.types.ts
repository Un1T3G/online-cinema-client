export type UserRole = 'USER' | 'ADMIN'

export interface UserUpdateDto {
  name?: string
  avatarUrl?: string
  email?: string
}

export interface UserToggleFavoriteDto {
  movieId: string
}

export interface UserChangeRoleDto {
  role: UserRole
}

export interface UserResponse {
  id: string
  name: string
  email: string
  avatarUrl: string
  role: UserRole
  hasPremium: boolean
  authByOAuth: boolean
  createdAt: string
}
