import { fetchAuth, fetchClassic } from '../fetch'
import { PaginationResult, PaginatorQuery } from '../query.types'
import { ReviewLeaveDto, ReviewResponse } from './review.types'

class ReviewService {
  async getAll(query?: PaginatorQuery) {
    return fetchAuth.get<PaginationResult<ReviewResponse>>('reviews', {
      params: query,
    })
  }

  async getByMovieId(movieId: string) {
    return fetchClassic.get<ReviewResponse[]>(`reviews/${movieId}`)
  }

  async leave(movieId: string, dto: ReviewLeaveDto) {
    return fetchAuth.post<string>(`reviews/leave/${movieId}`, dto)
  }

  async delete(id: string) {
    return fetchAuth.delete<string>(`reviews/${id}`)
  }
}

export const reviewService = new ReviewService()
