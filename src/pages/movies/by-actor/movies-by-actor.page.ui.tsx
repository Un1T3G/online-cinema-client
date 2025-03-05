import { useMoviesByActorInfinityQuery } from 'entities/movies'
import { MovieCatalog, MovieFeed } from 'widgets/movies'
import { IMoviesByActorPageProps } from './movies-by-actor.page.types'

export const MoviesByActorPage = ({ actor }: IMoviesByActorPageProps) => {
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useMoviesByActorInfinityQuery(actor.id)

  return (
    <MovieCatalog
      title={actor.name}
      moviesSlot={
        <MovieFeed
          data={data}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      }
    />
  )
}
