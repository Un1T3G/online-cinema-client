import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MovieResponse } from 'shared/api'

interface IProps {
  movies: MovieResponse[]
  isLoading: boolean
}

export const MoviesList = ({ movies, isLoading }: IProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-white flex justify-center">Фильмы не найдены</div>
    )
  }

  return (
    <div className="space-y-2">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`movie/${movie.slug}`}
          className="flex space-x-2"
        >
          <div className="relative w-[60px] h-[80px] rounded-lg overflow-hidden border border-divider">
            <Image
              alt={movie.title}
              src={movie.poster}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg text-white font-bold">{movie.title}</h1>
            <span className="block text-sm text-foreground">
              {movie.genres.map((genre) => genre.name).join(', ')}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
