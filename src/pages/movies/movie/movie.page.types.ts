import { MovieResponse } from 'shared/api'

export interface IMoviePageProps {
  movie: MovieResponse
  similarMovies: MovieResponse[]
}
