import Image from 'next/image'
import Link from 'next/link'
import { ActorResponse } from 'shared/api'
import { cn } from 'shared/lib'

interface IProps {
  actor: ActorResponse
  className?: string
}

export const ActorItem = ({ actor, className }: IProps) => {
  return (
    <Link
      href={`actor/${actor.slug}`}
      className={cn(
        'block relative h-[280px] rounded-lg overflow-hidden',
        className
      )}
    >
      <Image
        src={actor.photoUrl}
        alt={actor.name}
        fill
        className="object-cover z-0"
      />
      <div className="relative z-[1] w-full h-full flex flex-col items-center justify-end p-2 bg-fade-gradient-90">
        <h2 className="text-xl font-bold">{actor.name}</h2>
        <span className="block text-base text-foreground">1 Фильм</span>
      </div>
    </Link>
  )
}
