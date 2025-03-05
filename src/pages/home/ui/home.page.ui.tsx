import { ActorsList } from 'widgets/actors'
import { MoviesList } from 'widgets/movies'
import { HomePageProps } from '../home.page.types'
import { Hero } from './hero'

export const HomePage = ({
  slides,
  trendingMovies,
  bestActors,
}: HomePageProps) => {
  return (
    <div className="space-y-4">
      <Hero slides={slides} />
      <div>
        <h1 className="text-xl font-bold mb-2">В тренде</h1>
        <MoviesList movies={trendingMovies} />
      </div>
      <div>
        <h1 className="text-xl font-bold mb-2">Лучшие актёры</h1>
        <ActorsList actors={bestActors} />
      </div>
    </div>
  )
}
