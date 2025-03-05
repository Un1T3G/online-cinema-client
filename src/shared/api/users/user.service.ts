import { fetchAuth } from '../fetch'
import { PaginationResult, PaginatorWithSearchTermQuery } from '../query.types'
import {
  UserChangeRoleDto,
  UserResponse,
  UserToggleFavoriteDto,
  UserUpdateDto,
} from './user.types'

class UserService {
  async getProfile(accessToken?: string) {
    return fetchAuth.get<UserResponse>('users/profile', {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
  }

  async getAll(query?: PaginatorWithSearchTermQuery) {
    return fetchAuth.get<PaginationResult<UserResponse>>('users', {
      params: query,
    })
  }

  async getById(id: string) {
    return fetchAuth.get<UserResponse>(`users/${id}`)
  }

  async update(dto: UserUpdateDto) {
    return fetchAuth.put<string>(`users`, dto)
  }

  async delete(id: string) {
    return fetchAuth.delete<string>(`users/${id}`)
  }

  async toggleFavorite(dto: UserToggleFavoriteDto) {
    return fetchAuth.post<boolean>(`users/profile/favorites`, dto)
  }

  async changeRole(id: string, dto: UserChangeRoleDto) {
    return fetchAuth.post<string>(`users/change-role/${id}`, dto)
  }
}

export const userService = new UserService()
