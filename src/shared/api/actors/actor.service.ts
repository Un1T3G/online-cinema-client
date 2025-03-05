import { fetchAuth, fetchClassic } from '../fetch'
import { PaginationResult, PaginatorWithSearchTermQuery } from '../query.types'
import { ActorResponse, ActorUpdateDto } from './actor.types'

class ActorService {
  async getAll(query?: PaginatorWithSearchTermQuery) {
    return fetchAuth.get<PaginationResult<ActorResponse>>('actors', {
      params: query,
    })
  }

  async getById(id: string, accessToken?: string) {
    return fetchAuth.get<ActorResponse>(`actors/by-id/${id}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
  }

  async getBySlug(slug: string) {
    return fetchClassic.get<ActorResponse>(`actors/by-slug/${slug}`)
  }

  async create() {
    return fetchAuth.post<string>('actors', {})
  }

  async update(id: string, dto: ActorUpdateDto) {
    return fetchAuth.put<string>(`actors/${id}`, dto)
  }

  async delete(id: string) {
    return fetchAuth.delete<string>(`actors/${id}`)
  }
}

export const actorService = new ActorService()
