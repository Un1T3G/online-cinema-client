import { ActorResponse } from '../actors'
import { GenreResponse } from '../genres'
import { ReviewResponse } from '../reviews'

export interface MovieUpdateDto {
  slug: string
  title: string
  poster: string
  bigPoster: string
  videoUrl: string
  country: string
  year: number
  duration: number
  genres: string[]
  actors: string[]
}

export interface MovieResponse {
  id: string
  title: string
  slug: string
  poster: string
  bigPoster: string
  videoUrl: string
  views: string
  country: string
  year: number
  duration: number
  reviews: ReviewResponse[]
  actors: ActorResponse[]
  genres: GenreResponse[]
  createdAt: string
}
