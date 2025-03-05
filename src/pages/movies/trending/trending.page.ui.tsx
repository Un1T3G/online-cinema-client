import { useTrendingMoviesInfinityQuery } from 'entities/movies'
import { MovieCatalog, MovieFeed } from 'widgets/movies'

export const TrendingPage = () => {
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useTrendingMoviesInfinityQuery()

  return (
    <MovieCatalog
      title="Популярные фильмы"
      description="Актуальные фильмы в отличном качестве: легально, безопасно, без рекламы."
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
