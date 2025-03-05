import { fetchAuth, fetchClassic } from '../fetch'
import { PaginationResult, PaginatorWithSearchTermQuery } from '../query.types'
import { GenreResponse } from './genre.types'

class GenreService {
  async getAll(query?: PaginatorWithSearchTermQuery) {
    return fetchClassic.get<PaginationResult<GenreResponse>>('genres', {
      params: query,
    })
  }

  async getById(id: string, accessToken?: string) {
    return fetchAuth.get<GenreResponse>(`genres/by-id/${id}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
  }

  async getBySlug(slug: string) {
    return fetchClassic.get<GenreResponse>(`genres/by-slug/${slug}`)
  }

  async create() {
    return fetchAuth.post<string>('genres', {})
  }

  async update(id: string, dto: any) {
    return fetchAuth.put<string>(`genres/${id}`, dto)
  }

  async delete(id: string) {
    return fetchAuth.delete<string>(`genres/${id}`)
  }
}

export const genreService = new GenreService()
