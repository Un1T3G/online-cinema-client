import { useMoviesByGenreInfinityQuery } from 'entities/movies'
import { MovieCatalog, MovieFeed } from 'widgets/movies'
import { IMoviesByGenrePageProps } from './movies-by-genre.page.types'

export const MoviesByGenrePage = ({ genre }: IMoviesByGenrePageProps) => {
  console.log(genre)

  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useMoviesByGenreInfinityQuery([genre.id])

  return (
    <MovieCatalog
      title={genre.name}
      description={genre.description}
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
