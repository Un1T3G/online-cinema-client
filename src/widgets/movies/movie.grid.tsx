import { MovieItem } from 'entities/movies'
import { MovieResponse } from 'shared/api'
import { arrayRange } from 'shared/lib'
import { Skeleton } from 'shared/ui'

interface IProps {
  movies: MovieResponse[]
  isLoading: boolean
}

export const MovieGrid = ({ movies, isLoading }: IProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {arrayRange(6).map((x) => (
          <Skeleton key={x} className="h-44 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          className="h-44"
          showBigPoster={true}
        />
      ))}
    </div>
  )
}
