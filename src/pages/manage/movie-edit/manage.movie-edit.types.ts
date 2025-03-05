import { ActorResponse, GenreResponse, MovieResponse } from 'shared/api'

export interface ManageMovieEditPageProps {
  movie: MovieResponse
  actors: ActorResponse[]
  genres: GenreResponse[]
}
