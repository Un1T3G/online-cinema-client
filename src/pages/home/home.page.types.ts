import { ActorResponse, MovieResponse } from 'shared/api'

export interface HomePageProps {
  slides: MovieResponse[]
  trendingMovies: MovieResponse[]
  bestActors: ActorResponse[]
}
