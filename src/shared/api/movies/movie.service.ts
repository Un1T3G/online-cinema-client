import { fetchAuth, fetchClassic } from '../fetch'
import {
  PaginationResult,
  PaginatorQuery,
  PaginatorWithSearchTermQuery,
} from '../query.types'
import { MovieResponse, MovieUpdateDto } from './movie.types'

class MovieService {
  async getAll(query?: PaginatorWithSearchTermQuery) {
    return fetchClassic.get<PaginationResult<MovieResponse>>('movies', {
      params: query,
    })
  }

  async getMostPopularMovies(query?: PaginatorQuery) {
    return fetchClassic.get<PaginationResult<MovieResponse>>(
      'movies/most-popular',
      {
        params: query,
      }
    )
  }

  async getById(id: string, accessToken?: string) {
    return fetchAuth.get<MovieResponse>(`movies/by-id/${id}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
  }

  async getBySlug(slug: string) {
    return fetchClassic.get<MovieResponse>(`movies/by-slug/${slug}`)
  }

  async getFavorites() {
    return fetchAuth.get<MovieResponse[]>('movies/favorites')
  }

  async getByActor(actorsId: string, query?: PaginatorQuery) {
    return fetchClassic.get<PaginationResult<MovieResponse>>(
      `movies/by-actor/${actorsId}`,
      {
        params: query,
      }
    )
  }

  async getByGenres(genreIds: string[], query?: PaginatorQuery) {
    return fetchClassic.post<PaginationResult<MovieResponse>>(
      'movies/by-genres',
      {
        genreIds,
      },
      {
        params: query,
      }
    )
  }

  async updateCountViews(slug: string) {
    return fetchClassic.put<string>('movies/update-count-views', {
      slug,
    })
  }

  async create() {
    return fetchAuth.post<string>('movies', {})
  }

  async update(id: string, dto: MovieUpdateDto) {
    return fetchAuth.put<string>(`movies/${id}`, dto)
  }

  async delete(id: string) {
    return fetchAuth.delete<string>(`movies/${id}`)
  }
}

export const movieService = new MovieService()
