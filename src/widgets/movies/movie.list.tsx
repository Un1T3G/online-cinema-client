import { MovieItem } from 'entities/movies'
import { MovieResponse } from 'shared/api'
import { Carousel, CarouselContent, CarouselItem } from 'shared/ui'

interface IProps {
  movies: MovieResponse[]
}

export const MoviesList = ({ movies }: IProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 2xl:basis-[14.2857%]"
          >
            <MovieItem movie={movie} className="w-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
