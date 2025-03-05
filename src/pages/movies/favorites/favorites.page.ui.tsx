import { useFavoritesQuery } from 'entities/movies'

import { ErrorCard } from 'shared/ui'
import { MovieCatalog, MovieGrid } from 'widgets/movies'

export const FavoritesPage = () => {
  const { data, isLoading, isError, error } = useFavoritesQuery()

  return (
    <MovieCatalog
      title="Избранные фильмы"
      moviesSlot={
        isError ? (
          <ErrorCard error={error} />
        ) : (
          <MovieGrid movies={data!} isLoading={isLoading} />
        )
      }
    />
  )
}
