import Image from 'next/image'
import Link from 'next/link'
import { MovieResponse } from 'shared/api'
import { cn } from 'shared/lib'

interface IProps {
  movie: MovieResponse
  showBigPoster?: boolean
  className?: string
}

export const MovieItem = ({
  movie,
  showBigPoster = false,
  className,
}: IProps) => {
  return (
    <Link
      href={`movie/${movie.slug}`}
      className={cn(
        'block relative h-[280px] rounded-lg overflow-hidden',
        className
      )}
    >
      <Image
        src={showBigPoster ? movie.bigPoster : movie.poster}
        alt={movie.title}
        fill
        className="object-cover z-0"
      />
      <div className="relative z-[1] w-full h-full flex flex-col items-center justify-end p-2 bg-fade-gradient-90">
        <h2 className="text-xl font-bold">{movie.title}</h2>
        <span className="block text-base text-foreground">
          {movie.genres.map((genre) => genre.name).join(', ')}
        </span>
      </div>
    </Link>
  )
}
