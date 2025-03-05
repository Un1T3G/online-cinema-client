import { useFavoritesQuery } from 'entities/movies'
import { useUserToggleFavoriteMutation } from 'entities/users'
import { Heart, HeartOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { errorCatch } from 'shared/api'
import { cn } from 'shared/lib'
import { Button } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  movieId: string
  className?: string
}

export const MovieFavoriteButton = ({ movieId, className }: IProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const { data: favoriteMovies, isLoading } = useFavoritesQuery()
  const { mutateAsync, isPending } = useUserToggleFavoriteMutation()

  const handleOnClick = async () => {
    if (isPending && isLoading) {
      return
    }

    const isFavorite = await mutateAsync({ movieId }).catch((error) =>
      toast.error(errorCatch(error))
    )

    if (typeof isFavorite === 'boolean') {
      setIsFavorite(isFavorite)
    }
  }

  useEffect(() => {
    if (favoriteMovies) {
      setIsFavorite(favoriteMovies.some((movie) => movie.id === movieId))
    }
  }, [favoriteMovies, isLoading])

  return (
    <Button onClick={handleOnClick} className={cn(className)} size="icon">
      {isFavorite ? <HeartOff /> : <Heart />}
    </Button>
  )
}
