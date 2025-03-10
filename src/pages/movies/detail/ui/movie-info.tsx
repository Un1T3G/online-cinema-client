import { useSessionStore } from 'entities/session'
import { MovieFavoriteButton } from 'features/movies'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MovieResponse } from 'shared/api'

interface IProps {
  movie: MovieResponse
}

export const MovieInfo = ({ movie }: IProps) => {
  const isAuth = useSessionStore((state) => state.isAuth)

  return (
    <div className="relative h-[320px] rounded-lg overflow-hidden">
      <Image
        src={movie.bigPoster}
        alt={movie.title}
        fill
        className="object-cover z-0"
      />
      <div className="relative flex w-full h-full bg-fade-gradient z-[1] p-4">
        <div className="flex-2 sm:flex-1 min-h-full flex flex-col justify-end">
          <h1 className="text-5xl sm:text-6xl font-black mb-4">
            {movie.title}
          </h1>
          <span className="block text-muted-foreground mb-2">
            {[movie.year, movie.country, `${movie.duration} мин`].join(' • ')}
          </span>
          <span className="flex text-muted-foreground">
            <span className="mr-1">Жанры:</span>
            <div className="space-x-2">
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.slug}`}
                  className="text-white"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </span>
          <span className="flex text-muted-foreground">
            <span className="mr-1">Актёры:</span>
            <div className="space-x-2">
              {movie.actors.map((actor) => (
                <Link
                  key={actor.id}
                  href={`/actor/${actor.slug}`}
                  className="text-white"
                >
                  {actor.name}
                </Link>
              ))}
            </div>
          </span>
        </div>
        <div className="flex-1 flex flex-col items-end justify-between">
          {isAuth ? <MovieFavoriteButton movieId={movie.id} /> : <div />}
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-500" />
            <span>{movie.rating?.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
