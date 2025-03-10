import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { MovieResponse } from 'shared/api'
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'shared/ui'

interface IProps {
  slides: MovieResponse[]
}

export const Hero = ({ slides }: IProps) => {
  return (
    <Carousel
      className="w-full rounded-lg overflow-hidden space-x-4"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="ml-0 space-x-4">
        {slides.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="relative rounded-lg overflow-hidden pl-0"
          >
            <Image
              src={movie.bigPoster}
              alt={movie.title}
              fill
              className="object-cover rounded-lg z-0 pointer-events-none"
            />
            <div className="relative z-[1] h-[350px] flex items-center pl-8 bg-fade-gradient">
              <div className="space-y-2">
                <h1 className="font-extrabold text-6xl">{movie.title}</h1>
                <span className="block text-foreground text-2xl">
                  {movie.genres.map((genre) => genre.name).join(', ')}
                </span>
                <Button asChild>
                  <Link href={`movie/${movie.slug}`}>Смотреть</Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-1 right-1 flex space-x-2">
        <CarouselPrevious className="static translate-x-0 translate-y-0" />
        <CarouselNext className="static translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  )
}
