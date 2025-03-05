import { ActorItem } from 'entities/actors'

import { ActorResponse } from 'shared/api'
import { Carousel, CarouselContent, CarouselItem } from 'shared/ui'

interface IProps {
  actors: ActorResponse[]
}

export const ActorsList = ({ actors }: IProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {actors.map((actor) => (
          <CarouselItem
            key={actor.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 2xl:basis-[14.2857%]"
          >
            <ActorItem actor={actor} className="w-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
