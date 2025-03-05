import { useMoviesInfinityQuery } from 'entities/movies'
import { MovieCatalog, MovieFeed } from 'widgets/movies'

export const ExplorerPage = () => {
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useMoviesInfinityQuery()

  return (
    <MovieCatalog
      title="Новые фильмы"
      description="Новые фильмы и сериалы в отличном качестве: легально, безопасно, без рекламы."
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
