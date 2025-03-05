import { useIncreaseMovieViewsMutation } from 'entities/movies'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import { MoviePlayer, MoviesList } from 'widgets/movies'
import { IMoviePageProps } from '../movie.page.types'
import { MovieInfo } from './movie-info'
import { MovieReview } from './movie-review'

export const MoviePage = ({ movie, similarMovies }: IMoviePageProps) => {
  const { mutate } = useIncreaseMovieViewsMutation(movie.slug)

  useEffect(() => {
    mutate()
  }, [])

  return (
    <>
      <NextSeo title={movie.title} />
      <div className="space-y-4">
        <MovieInfo movie={movie} />
        <MoviePlayer url={movie.videoUrl} />
        {similarMovies.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-1">Похожие фильмы</h2>
            <MoviesList movies={similarMovies} />
          </div>
        )}
        <MovieReview movieId={movie.id} />
      </div>
    </>
  )
}
